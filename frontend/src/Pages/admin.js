import React, {useEffect, useMemo, useState} from 'react';
import {getId, getRole, getToken} from './components/auth';
import Axios from "axios";
import DataTable from "./components/datatable";
import {useNavigate} from "react-router-dom";

export default function Admin(){
    const [data,setData] = useState([]);
    let navigate = useNavigate();
    let token = getToken();
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getUsers"
    let role = getRole();
    let ID = getId();
    let getUserBody = {
        ID: ID,
        role: role
    };
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
            Axios.post(URL).then((response) => {
                setData(response.data);
                console.log(response.data);
            });
        })();
    }, []);
    const userCol= useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id'
            },
            {
                Header: 'First Name',
                accessor: 'first_name'
            },
            {
                Header:'Last Name',
                accessor: 'last_name'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Role',
                accessor:'role',
            },
            {
                accessor:'request',
                Cell: ({ row}) => (
                    <button onClick={ (e) => {
                        e.preventDefault();
                        /*
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
                        })*/
                    }}>
                        Done{ row.original.status === 0 && "TEST"}
                    </button>),
            },
        ],[]);
    return (
        <>
            <div className="auth-form-container">
                <div>
                    <h2>List of users: </h2>
                    <DataTable data={data} columns={userCol}/>
                </div>
            </div>
            <div>
                <h1>Appointment List</h1>

            </div>
        </>

    )
}