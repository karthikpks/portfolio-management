import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Loader } from '../atoms';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const css = {
    tableStyle: {height: 550, marginBottom: '100px', lineHeight: '25px', width: 1200, marginTop:'50px'},
    tableInnserStyle: { height: '100%', width: '100%', marginTop: '50px'},
}

const RecordListTable = (props: any) => {
    return (
       <>
        <div className="ag-theme-alpine" style={css.tableStyle}>
            <h1>{ props.title} </h1>
            <div style={css.tableInnserStyle}>
                { props.isLoading && (
                    <Loader />
                )}
                { !props.isLoading && (
                    <AgGridReact
                        rowData={props.listData}
                        columnDefs={props.columnDefs}
                        getRowNodeId={data => data.id} 
                        suppressRowHoverHighlight={false} 
                        columnHoverHighlight={true}
                        />
                )}
            </div>
        </div>
       </>
    );
};

export default RecordListTable;