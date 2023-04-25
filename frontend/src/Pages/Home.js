import StarRating from "./components/StarRating";
import React, {useEffect, useMemo, useState} from 'react';
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
                accessor:'request',
                Cell: ({ row}) => (
                    <button onClick={ (e) => {
                        e.preventDefault();
                        const removeBody = {
                            tutorID:row.original.tutor_id,
                            studentID:row.original.student_id,
                            tutorName:row.original.tutor_name,
                            time:row.original.appointment_time
                        }
                        console.log(removeBody)/*
                        Axios.post(removeURL,removeBody)
                            .then( (response) => {
                                alert(response.data)
                                navigate(0)
                            }).catch((err) =>{
                            setMessage(err.response.data);
                        })*/
                    }}>
                        Done
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
                    <DataTable data={data} columns={columns}/>
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