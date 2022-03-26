import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { TransactionHistory } from '../pages';

const AppNavigator= () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={
            <Navigate to={{ pathname: "transaction" }} />
        }/>
        <Route path="transaction" element={<TransactionHistory />} />
      </Routes>
    </div>
  );
};

export default AppNavigator;