import React, {Component, useState,useCallback,useMemo} from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import Filter from './filter.js';
import '../../Styles/datatable.css';



class BtnCellRenderer extends Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
        this.props.clicked(this.props.value);
    }
    render() {
        return (
            <button onClick={this.btnClickedHandler}>Request Appointment</button>
        )
    }
}
function DataTable({data, columns}) {
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
            <input value={filterInput} onChange={handleFilterChange} placeholder="Search" />

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