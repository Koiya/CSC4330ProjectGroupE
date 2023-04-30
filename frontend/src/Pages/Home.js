import StarRating from "./components/StarRating";
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import React, {useEffect, useMemo, useState} from 'react';
import {getId, getRole, getToken} from './components/auth';
import Axios from "axios";
import DataTable from "./components/datatable";
import {useNavigate} from "react-router-dom";
import {ListItemText, Paper} from "@mui/material";
import { styled } from '@mui/material/styles';
import {List, ListItem} from "@mui/joy";
import moment from "moment";

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
    const cancelURL = "";
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
            Header: 'Appointment Time',
            Cell:({row}) =>(
                <div>
                    {row.original.day + " " +  moment(row.original.startTime, 'HH:mm:ss').format("hh:mm a") + "-" +moment(row.original.endTime, 'HH:mm:ss').format("hh:mm a")}
                </div>
            )
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
                Header: 'Appointment Time',
                Cell:({row}) =>(
                    <div>
                        {row.original.day + " " +  moment(row.original.startTime, 'HH:mm:ss').format("hh:mm a") + "-" +moment(row.original.endTime, 'HH:mm:ss').format("hh:mm a")}
                    </div>
                )
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
                            let startTime = props.row.original.startTime;
                            let endTime = props.row.original.endTime;
                            startTime = startTime.replace(/\"/g, "");
                            endTime = endTime.replace(/\"/g, "");
                            const removeBody = {
                                tutorID:props.row.original.tutor_id,
                                studentID:props.row.original.student_id,
                                tutorName:props.row.original.tutor_name,
                                expertise:props.row.original.appointment_subject,
                                startTime:startTime,
                                endTime:endTime,
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
            <div className="backgroundSize">
                <div>
                    <h2>Pending appointment requests </h2>
                    <Stack spacing={{ xs: 1, sm: 2 }}direction="row" >
                        {pendingList.map((item) =>
                            <Item key={item.messageID}>
                                <List dense={true}>
                                    <ListItem><ListItemText primary="Tutor Name" secondary={item.tutor_name}/></ListItem>
                                    <ListItem><ListItemText primary="Study" secondary={item.expertise}> </ListItemText></ListItem>
                                    <ListItem><ListItemText primary="Time" secondary={item.message_time}> </ListItemText></ListItem>
                                    <ListItem><ListItemText primary="Status" secondary={item.status}> </ListItemText></ListItem>
                                <Button>Cancel</Button>
                                </List>
                            </Item>)}
                    </Stack>
                    <h2>Appointments: </h2>
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