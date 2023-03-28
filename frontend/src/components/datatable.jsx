import React, {Component, useState,useCallback,useRef} from 'react';
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
    const gridRef = useRef();
    function nameGetter(params){
        return params.data.firstName + " " + params.data.lastName;
    }

    //Filter function for search box
    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
            document.getElementById('filter-text-box').value
        );
    }, []);

    //Filter function for checkbox
    let expertiseType = "All";
    const externalFilterChanged = useCallback((newValue) => {
        console.log(newValue);
        expertiseType = newValue;
        gridRef.current.api.onFilterChanged();
    }, []);
    const isExternalFilterPresent = useCallback(() => {
        return expertiseType !== "All";
    }, []);
    const doesExternalFilterPass = useCallback(
        (node) => {
            if (node.data) {
                if(expertiseType !== "All"){
                    return node.data.expertise == expertiseType;
                }
                else {
                    return true;
                }
            }
            return true;
        },
        [expertiseType]
    );
    const onFilterCheckboxChanged = useCallback(()=>{},[])


    const [rowData, setRowData] = useState([
        {firstName: "Joe", lastName: "Smith", expertise: "Math", rating: 3},
        {firstName: "Megan", lastName: "Celica", expertise: "Biology", rating: 4},
        {firstName: "Bob", lastName: "Celica", expertise: "English", rating: 5},
    ]);

    const [columnDefs, setColumnDefs] = useState([
        { field: 'name', headerName: 'Name', valueGetter:nameGetter },
        { field: 'expertise' },
        { field: 'availability'},
        { field: 'rating',width:100},
        {
            field: 'request',
            cellRenderer: BtnCellRenderer,
            cellRendererParams: {
                clicked: function(field) {
                    alert(`${field} was clicked`);}
            }
        }

    ])



    /*
    Implement this when using API

    const onGridReady = useCallback((params) => {
    fetch('')
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
    }, []);*/

    return(
        <div>
            <Filter searchInput={onFilterTextBoxChanged} boxInput={externalFilterChanged}/>
            <div id="table-component" className="ag-theme-alpine" style={{height:600, width:1150 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    isExternalFilterPresent={isExternalFilterPresent}
                    doesExternalFilterPass={doesExternalFilterPass}
                >
                </AgGridReact>
            </div>
        </div>

    )}
export default DataTable;