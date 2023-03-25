import React, {Component, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import Filter from './filter';
import './datatable.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


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
export const DataTable = () => {
    const [rowData] = useState([
        {firstName: "Joe", lastName: "Smith", expertise: "Computer Science", rating: 4},
        {firstName: "Joe", lastName: "Celica", expertise: "Biology", rating: 4},
        {firstName: "Joe", lastName: "Celica", expertise: "English", rating: 4},
    ]);
    const [columnDefs] = useState([
        { field: 'firstName' },
        { field: 'lastName' },
        { field: 'expertise' },
        { field: 'availability'},
        { field: 'rating' },
        {
            field: 'request',
            cellRenderer: BtnCellRenderer,
            cellRendererParams: {
                clicked: function(field) {
                    alert(`${field} was clicked`);}
            }
        }

    ])
    /*<div className="filter" style = {{height:600, width:300}}>
                    {study.map(({name}, index) =>{
                        return(
                            <li key={index}>
                            <input
                                type="checkbox"
                            />
                            </li>
                        )
                    })}


                </div>*/

    return(
        <div>
            <Filter/>
        <div id="table-component" className="ag-theme-alpine" style={{height:600, width:1200 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
        </div>

    )}
export default DataTable;