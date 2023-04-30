import React, {Component, useState,useCallback,useMemo} from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import TextField from '@mui/material/TextField';
import '../../Styles/datatable.css';

function DataTable({data, columns, enableSearchBar=false}) {
    const [filterInput, setFilterInput] = useState('');
    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useFilters,
        useGlobalFilter,
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;

    const { globalFilter } = state;

    const handleFilterChange = e => {
        const value = e.target.value || '';
        setFilterInput(value);
        setGlobalFilter(value);
    };

    return(
        <div>

            {enableSearchBar ? <TextField value={filterInput} onChange={handleFilterChange} placeholder="Search" />
                : <></>}
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>

    )
}
export default DataTable;