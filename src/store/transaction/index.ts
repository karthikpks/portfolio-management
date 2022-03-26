import { createSlice, PayloadAction , createAsyncThunk} from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { client } from '../../api';
import { Constants } from '../../utils';

export const fetchTransactionHistory = createAsyncThunk('transaction', async () => {
  const response = await client.get(Constants.API_PATH);
  return response;
})

export interface TransactionHistoryState {
  orderRefNo: string;
  securityName: string;
  transactionType:Number;
  orderStatus:Number;
  quantity:Number;
  orderValue: Number;
  createdAt: Date;
  id?:string;
}

const initialState: any = {
  loading: true,
  data: [],
  item: {}
}

export const TranscationHistorySlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    add : (state, action: PayloadAction<TransactionHistoryState>) => {
        let lastID = state.data[state.data.length - 1].id ? state.data[state.data.length - 1].id: 0;
        action.payload.id = +lastID + 1 + "";
        return {
          ...state,
          loading: false, 
          data : [...state.data, action.payload]
        };
      },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactionHistory.pending, (state, action) => {
        return {
          ...state,
          loading: true
        };
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false
        };
      })
  }
})

export const { add } = TranscationHistorySlice.actions

export const selectTransaction = (state: RootState) => state.transaction;

export default TranscationHistorySlice.reducer