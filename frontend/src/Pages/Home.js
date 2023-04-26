import StarRating from "./components/StarRating";
import React, {useEffect, useMemo, useState} from 'react';
import {getId, getRole, getToken} from './components/auth';
import Axios from "axios";
import DataTable from "./components/datatable";
import {useNavigate} from "react-router-dom";

export default function Home(){
    const [num,setNum] = useState('');
    const [data,setData] = useState([]);
    let navigate = useNavigate();
    let token = getToken();
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getmessage"
    const getAptURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getApt"
    const patchAptURL = getAptURL + "/complete"
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
    const studentCol = useMemo(
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
        }
    ],[]);
    const tutorCol= useMemo(
        () => [
            {
                Header: 'Student Name',
                accessor: 'student_name'
            },
            {
                Header: 'Expertise',
                accessor: 'appointment_subject'
            },
            {
                Header: 'Availability',
                accessor: 'appointment_time'
            },
            {
                Header: 'Status',
                accessor:'status',
                Cell: ({row}) => (
                    <div>{row.original.status === 0 ? "Incomplete" : "Complete" }</div>
                )
            },
            {
                accessor:'request',
                Cell: ({ row}) => (
                    <button onClick={ (e) => {
                        e.preventDefault();
                        let time = row.original.appointment_time;
                        time = time.replace(/:/g, "");
                        const removeBody = {
                            tutorID:row.original.tutor_id,
                            studentID:row.original.student_id,
                            tutorName:row.original.tutor_name,
                            expertise:row.original.appointment_subject,
                            time:time,
                            role:role
                        }
                        console.log(removeBody)
                        Axios.post(patchAptURL,removeBody)
                            .then( (response) => {
                                console.log(response.data);
                                navigate(0)
                            }).catch((err) =>{
                            alert(err);
                        })
                    }}>
                        Done{ row.original.status === 0 && "TEST"}
                    </button>),
            },
        ],[]);
    return (
        <>
        {token ?
                <>
        {role === "user" ?
            <>
            <div className="backgroundSize">
                <div>
                    <p>Pending appointments: {num} </p>
                    <h2> Upcoming Appointments: </h2>
                    <DataTable data={data} columns={studentCol}/>
                </div>
            </div>
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
                </div>
            </>
            :
            <div className="backgroundSize">
                <div>
                    <h1>Appointment management</h1>
                    <DataTable data={data} columns={tutorCol}/>
                </div>
            </div>
            }
        </>
            :
        <>
        <div className="auth-form-container">
            <h1>Log in to see your appointment</h1>
        </div>
        </>
        }</>
    )
}