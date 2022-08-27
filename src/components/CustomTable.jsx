import React from 'react';
import MUIDataTable from "mui-datatables";
import {createTheme, ThemeProvider} from "@mui/material";


const CustomTable = ({data, columns, title}) => {
    const options = {
        filterType: 'multiselect',
        selection: false,
        filter: true,
        sort: true
    };


    return (
                <MUIDataTable
                    title={title}
                    data={data}
                    columns={columns}
                    options={options}
                />

    );
};

export default CustomTable;
