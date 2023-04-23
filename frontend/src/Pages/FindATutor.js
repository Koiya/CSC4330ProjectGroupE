import DataTable from "./components/datatable.jsx";
import {useMemo, useState,useEffect} from "react";
import Axios from "axios";

export default function FindATutor() {
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getTutor"

    /*Data format:
    const test = [
        { name: "Joe Smith", expertise: "Math", rating: 3},
        { name: "Megan Celica", expertise: "Biology", rating: 4},
        { name: "Bob Celica", expertise: "English", rating: 5}
    ];
    */
    const [data,setData] = useState([]);
    useEffect(() =>  {
        (async () => {
            Axios.post(URL).then((response) => {
                setData(response.data);
                console.log(response.data);
            });
        })();
        }, []);
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'tutorName'
            },
            {
                Header: 'Expertise',
                accessor: 'tutorExpertise'
            },
            {
                Header: 'Rating',
                accessor: 'tutorRating'
            },
            {
                Header:'Availability',
                accessor:'tutorTime'
            },
            {
                accessor:'request',
                Cell: ({row}) => (
                    <button onClick={() => {console.log(row.original.tutorName);}}>
                        Request Appointment
                    </button>),
            },
        ],
        []
    );
    return (
        <>
            <div className="backgroundFindTutor">
                <DataTable data={data} columns={columns}/>
            </div>
        </>
    )
}