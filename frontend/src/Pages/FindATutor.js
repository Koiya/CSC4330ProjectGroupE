import SearchBar from "./components/SearchBar";
import DataTable from "./components/datatable.jsx";
import {useMemo} from "react";

export default function FindATutor() {

    const data = [
        { name: 'John', age: 35, email: 'john@example.com' },
        { name: 'Jane', age: 27, email: 'jane@example.com' },
        { name: 'Bob', age: 44, email: 'bob@example.com' },
        { name: "Joe Smith", expertise: "Math", rating: 3},
        { name: "Megan Celica", expertise: "Biology", rating: 4},
        { name: "Bob Celica", expertise: "English", rating: 5}
    ];
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Expertise',
                accessor: 'expertise'
            },
            {
                Header: 'Rating',
                accessor: 'rating'
            },
            {
                Header:'Availability',
                accessor:'availability'
            },
            {
                accessor:'request',
                Cell: ({ row: { original } }) => (
                    <button>
                        Request Appointment
                    </button>),
            },
        ],
        []
    );
    return (
        <>
        <SearchBar/>
            <div className="backgroundFindTutor">
                <DataTable data={data} columns={columns}/>
            </div>
        </>
    )
}