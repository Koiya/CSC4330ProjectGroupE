import React, {useEffect, useMemo, useState} from 'react';
import Axios from "axios";
import DataTable from "./components/datatable";
import {getId,getName,getUser} from "./components/auth";

export default function Appointment() {
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getTutor"
    const createAptURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/createApt"
    const [expertise, setExpertise] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    let name = getName();
    let email = getUser();
    let ID = getId();

    /*Data format:
    const test = [
        { name: "Joe Smith", expertise: "Math", rating: 3},
        { name: "Megan Celica", expertise: "Biology", rating: 4},
        { name: "Bob Celica", expertise: "English", rating: 5}
    ];*/
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {
            ID:ID,
            name:name,
            email:email,
            expertise:expertise,
            time:time

        }
        Axios.post(createAptURL,requestBody)
            .then( (response) => {
                setMessage(response.data);
            }).catch((err) =>{
                setMessage(err.response.data);
        })
    }
    const [data,setData] = useState([]);
    /*useEffect(() =>  {
        (async () => {
            Axios.post(URL).then((response) => {
                setData(response.data);
                console.log(response.data);
            });
        })();
    }, []);
    */
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
                Header:'Availability',
                accessor:'tutorTime'
            },
            {
                accessor:'request',
                Cell: ({ row: { original } }) => (
                    <button>
                        Remove
                    </button>),
            },
        ],
        []
    );
    return (
        <>
            <div className="backgroundFindTutor">
                <div>
                    <h2> Create an appointment </h2>
                    {message && <p className="message"> {message}</p>}
                    <label>Set Time: </label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    <label>Set Expertise: </label>
                    <select value = {expertise} onChange={(e) =>  setExpertise(e.target.value)}>
                        <option value="English">English</option>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                    </select>
                    <button onClick={handleSubmit}>Create Appointment</button>
                </div>
                <div>
                    <h3>Your Appointments:</h3>
                    <DataTable data={data} columns={columns}/>
                </div>
            </div>
        </>
    )
}