import StarRating from "./components/StarRating";
import {useEffect, useMemo, useState} from 'react';
import {getId, getRole, getToken} from './components/auth';
import Axios from "axios";
import DataTable from "./components/datatable";

export default function Home(){
    const [num,setNum] = useState('');
    const [data,setData] = useState([]);
    let token = getToken();
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getmessage"
    const getAptURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getApt"
    let role = getRole();
    let ID = getId();
    let getUserBody = {
        ID: ID,
        role: role
    };
    Axios.post(URL,getUserBody)
        .then( (response) => {
            setNum(response.data.length);
        }).catch((err) =>{
        console.log(err);
    })
    /*Data format:
    const test = [
        { name: "Joe Smith", expertise: "Math"},
        { name: "Megan Celica", expertise: "Biology"},
        { name: "Bob Celica", expertise: "English"}
    ];*/
    //DATA
    const requestBody={
        role: role,
        ID:ID
    }
    useEffect(() =>  {
        (async () => {
            Axios.post(getAptURL,requestBody).then((response) => {
                setData(response.data);
                console.log(response.data);
            });
        })();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Student Name',
                accessor: 'student_name'
            },
            {
                Header: 'Tutor Name',
                accessor: 'tutor_name'
            },
            {
                Header: 'Expertise',
                accessor: 'appointment_subject'
            },
            {
                Header: 'Availability',
                accessor: 'appointment_time'
            },
        ],
        []
    );
    return (
        <>
        {token ?
                <>
            <div className="backgroundSize">
                <div>
                    <p>Pending appointments: {num} </p>
                    <h2> Upcoming Appointments: </h2>
                    <DataTable data={data} columns={columns}/>
                </div>
            </div>{role === "user" ?
                    <div className="backgroundRating">
                    <h2> Previous Tutor: </h2>
                    <div className="textAlign">
                        <p>
                            Displaying previous tutor's here
                        </p>
                        <div>
                            <StarRating/>
                        </div>
                    </div>
                </div>:<></>}

        </>:
        <>
        <div className="auth-form-container">
            <h1>Log in to see your appointment</h1>
        </div>
        </>
        }</>
    )
}