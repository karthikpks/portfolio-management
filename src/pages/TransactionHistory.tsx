import React, { useEffect, useState } from 'react';
import { ListTable } from '../components/molecules';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchTransactionHistory } from '../store/transaction';
import Container from '@material-ui/core/Container';
import { Constants } from '../utils';

import { makeStyles } from '@material-ui/core/styles';
import { CustomButton } from '../components/atoms';

const useStyles = makeStyles(() => ({
    editBtn: {
        margin: '5px',
        position: 'relative',
        width: '30%',
        fontSize: 'smaller',
       
    },
    addBtn: {
        float: 'right', 
        position: 'relative',
        width: '30%',
        fontSize: 'smaller',
        marginRight: '30px',
        backgroundColor: 'green'
    },
    deleteBtn: {
        margin: '5px',
        position: 'relative',
        width: '30%',
        fontSize: 'smaller',
        backgroundColor: 'red'
    }
}));


const TransactionHistory = () => {

    const storeData = useAppSelector(state => state.transaction);
    const dispatch = useAppDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (storeData.loading) {
         dispatch(fetchTransactionHistory());
        };
    }, [storeData.loading]);

    console.log('StoreData:', storeData);

    const [columnDefs] = useState([
        { headerName: Constants.LABEL_ID_NO, field: 'id' },
        { headerName: Constants.LABEL_ORDER_NO, field: 'orderRefNo' },
        { headerName: Constants.LABEL_SECURITY_NAME, field: 'securityName' },
        { headerName: Constants.LABEL_TRANSACTION_TYPE, cellRendererFramework: function(params: any) {
            return params.data.transactionType ? 'Sell' : 'Buy'
          },},
        { headerName: Constants.LABEL_ORDER_STATUS, cellRendererFramework: function(params: any) {
        return params.data.orderStatus ? 'Submitted' : 'Completed'
        },},
        { headerName: Constants.LABEL_ORDER_DATE, field: 'createdAt' },
        { headerName: Constants.LABEL_QUANTITY, field: 'quantity' },
        { headerName: Constants.LABEL_ACTION, cellRendererFramework: function(params: any) {
            return '$' + params.data.orderValue
          },},
        { headerName: Constants.LABEL_ACTION, cellRendererFramework: function(params: any) {
         return <CustomButton
                     name={Constants.LABEL_EDIT}
                     type='button'
                     style={classes.editBtn}
                />
       },},
       { headerName: Constants.LABEL_ACTION, cellRendererFramework: function(params:any) {
         return <CustomButton
                 name= {Constants.LABEL_DELETE}
                 type='button'
                 style={classes.deleteBtn}
             />
       },},
    ])

    return (
        <React.Fragment>
        <Container maxWidth="lg">  
            <ListTable
                title={Constants.LIST_PAGE_TITLE}
                listData={storeData.data.data} 
                onGoToAddPage={() => console.log('')} 
                btnStyle={""}
                columnDefs={columnDefs}
                isLoading = {storeData.loading}
            />
        </Container>
    </React.Fragment>
    )
};

export default TransactionHistory;