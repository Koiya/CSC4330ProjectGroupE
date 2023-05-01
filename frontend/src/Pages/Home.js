import StarRating from "./components/StarRating";
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button'
import React, {useEffect, useMemo, useState} from 'react';
import {getId, getRole, getToken} from './components/auth';
import Axios from "axios";
import DataTable from "./components/datatable";
import {useNavigate} from "react-router-dom";
import {ListItemText, Paper, Typography} from "@mui/material";
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
    const [ratingList,setRatingList] = useState([]);
    const getRating = (data) => {
        console.log(data);
    };
    let navigate = useNavigate();
    let token = getToken();
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getmessage"
    const getAptURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getApt"
    const cancelURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/sendMessage/cancel";
    const patchAptURL = getAptURL + "/complete"
    let role = getRole();
    let ID = getId();
    let getUserBody = {
        ID: ID,
        role: role
    };
    //List of pending apt
    useEffect(() =>  {
        (async () => {
        Axios.post(URL,getUserBody)
        .then( (response) => {
            setPendingList(response.data);
            //console.log(pendingList);
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

    //Getting apt list for students

    useEffect(() =>  {
        (async () => {
            let requestBody={
                role: role,
                ID:ID,
                status: 0
            }
            Axios.post(getAptURL,requestBody).then((response) => {
                setData(response.data);
            });
        })();
    }, []);
    //Get list of completed
    useEffect(() =>  {
        (async () => {
            let ratingBody={
                role: role,
                ID:ID,
                status: 1
            }
            Axios.post(getAptURL,ratingBody).then((response) => {
                setRatingList(response.data);
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
            Header: 'Subject',
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
                    <Button onClick={(e) => {
                        e.preventDefault();
                        const requestBody = {
                            messageID:row.original.messageID,
                            status: "Cancelled"
                        }
                        Axios.post(cancelURL,requestBody)
                            .then((response) => {
                                navigate(0);
                            })
                    }}>
                        Cancel
                    </Button>),
            },
    ],[]);

    //TUTOR APPOINTMENT LIST
    const tutorCol= useMemo(
        () => [
            {
                Header: 'Student Name',
                accessor: 'student_name'
            },
            {
                Header: 'Subject',
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
                        <button onClick={ (e) => {
                            e.preventDefault();
                            const removeBody = {
                                ID:props.row.original.id,
                                role:role
                            }
                            Axios.post(patchAptURL,removeBody)
                                .then( (response) => {
                                    navigate(0)
                                }).catch((err) =>{
                                alert(err);
                            })
                        }}>
                            Done
                        </button>
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
                                <button onClick={(item) => {
                                    const requestBody = {
                                        messageID: item.messageID,
                                        status: "Cancelled"
                                    }
                                    Axios.post(cancelURL,requestBody)
                                        .then((response) => {
                                            navigate(0);
                                        })
                                }}>Cancel</button>
                                </List>
                            </Item>)}
                    </Stack>
                    <h2>Appointments: </h2>
                    <DataTable data={data} columns={studentCol}/>
                </div>
            </div>
            <div className="backgroundRating">
                <h2> Give rating on your previous Tutor: </h2>
                    <div className="textAlign">
                            {ratingList.map((item) =>
                                <div>
                                    <Typography>Tutor: {item.tutor_name}</Typography>
                                    <Typography>Study: {item.appointment_subject}</Typography>
                                    <StarRating props={item}/>
                                </div>
                            )}
                    </div>
                </div>
            </>
            :
            <div className="backgroundSize">
                <div>
                    <h1>Appointment management</h1>
                    {role === "admin"&&
                        <div>
                            <h1>Create Appointment</h1>
                            <div style={{overflow:"hidden", marginBottom:20}}>
                            <label style={{marginRight:20}}>
                                Tutor ID: <input style={{width:100}} type="number"/>
                            </label>
                            <label style={{marginRight:20}}>
                                Student ID: <input style={{width:100}} type="number"/>
                            </label>
                            <label>
                                Study: <input style={{width:100}} type="number"/>
                            </label>
                            </div>
                        </div>
                    }
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