import StarRating from "./components/StarRating";
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import React, {useEffect, useMemo, useState} from 'react';
import {getId, getRole, getToken} from './components/auth';
import Axios from "axios";
import DataTable from "./components/datatable";
import {useNavigate} from "react-router-dom";
import {Paper} from "@mui/material";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Home(){
    const [pendingList,setPendingList] = useState([]);
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
    useEffect(() =>  {
        (async () => {
        Axios.post(URL,getUserBody)
        .then( (response) => {
            setPendingList(response.data);
            console.log(pendingList);
        }).catch((err) =>{
        console.log(err);
        })
        })();
    }, []);
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
        },
            {
                accessor:'request',
                Cell: ({ row}) => (
                    <Button onClick={ (e) => {
                        e.preventDefault();
                    }}>
                        Cancel
                    </Button>),
            },
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
                    <div>{row.original.status === 0 ? "Incomplete" : row.original.status === 1 ? "Complete" : "Canceled"}</div>
                )
            },
            {
                accessor:'request',
                Cell:(props) => {
                    //if apt is completed dont show button
                    if (props.row.original.status === 1 || props.row.original.status === 2 ){
                        return(<></>)
                    }
                    //else show the button
                    else {
                        return(
                        <Button onClick={ (e) => {
                            e.preventDefault();
                            let time = props.row.original.appointment_time;
                            time = time.replace(/:/g, "");
                            const removeBody = {
                                tutorID:props.row.original.tutor_id,
                                studentID:props.row.original.student_id,
                                tutorName:props.row.original.tutor_name,
                                expertise:props.row.original.appointment_subject,
                                time:time,
                                role:role
                            }
                            console.log(removeBody)
                            Axios.post(patchAptURL,removeBody)
                                .then( (response) => {
                                    navigate(0)
                                }).catch((err) =>{
                                alert(err);
                            })
                        }}>
                            Done
                        </Button>
                )}},
            },
        ],[]);
    return (
        <>
        {token ?
                <>
        {role === "user" ?
            <>
            <div className="">
                <div>
                    <h2>Pending appointment requests </h2>
                    <Stack spacing={{ xs: 1, sm: 2 }} sx={{ maxWidth:150 }} direction="column" useFlexGap flexWrap="wrap">
                        {pendingList.map((item) => <Item key={item.messageID}>Tutor:{item.tutor_name} Expertise:{item.expertise} Time: {item.message_time}</Item>)}
                    </Stack>
                    <h2>Appointments: </h2>
                    <DataTable data={data} columns={studentCol}/>
                </div>
            </div>{/*
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
                </div>*/}
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