import React, { useEffect, useMemo, useState} from 'react';
import {getId, getRole, getToken} from './components/auth';
import Axios from "axios";
import DataTable from "./components/datatable";
import {useNavigate} from "react-router-dom";
import moment from "moment/moment";
import Button from "@mui/joy/Button";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";

export default function Admin(){
    const [userData,setUserData] = useState([]);
    const [count, setCount] = useState(0);
    const [aptData,setAptData] = useState([]);
    let role = getRole();
    let ID = getId();
    let navigate = useNavigate();
    const userURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getUsers"
    const aptURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getTutor"
    const updateUserURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/updateUser"
    const deleteUserURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/updateUser/delete"
    const updateUser = (props) => {
        Axios.put(updateUserURL +`?id=${props.id}`,props)
            .then( (response) => {
                console.log("Updated");
            }).catch((err) =>{
            alert(err);
        })
    }
    const deleteUser = (props) => {
        let requestBody ={
            role:role
        }
        Axios.put(deleteUserURL + `?id=${props.id}`, requestBody)
            .then((response) => {
                navigate(0)
            }).catch((err) => {
            alert(err);
        })
    }

    function TimePicker({props}) {
        const [hour, setHour] = useState('00');
        const [minute, setMinute] = useState('00');

        const handleHourChange = (event) => {
            setHour(event.target.value);
        };

        const handleMinuteChange = (event) => {
            setMinute(event.target.value);
        };
        props = `${hour}${minute}00`;
        return (
            <div>
                <select value={hour} onChange={handleHourChange}>
                    {Array.from(Array(24).keys()).map((index) => (
                        <option key={index} value={String(index).padStart(2, '0')}>
                            {String(index).padStart(2, '0')}
                        </option>
                    ))}
                </select>
                :
                <select value={minute} onChange={handleMinuteChange}>
                    {Array.from(Array(60).keys()).filter((index) => index % 30 === 0).map((index) => (
                        <option key={index} value={String(index).padStart(2, '0')}>
                            {String(index).padStart(2, '0')}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
    const userCol= useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id'
            },
            {
                Header: 'First Name',
                accessor: 'first_name',
                Cell: ({row}) => {
                return(
                    <input
                        name="first_name"
                        defaultValue={row.original.first_name}
                        type="text"
                        onChange={(e)=> row.original.first_name = e.target.value}
                    />
                )}
            },
            {
                Header:'Last Name',
                accessor: 'last_name',
                Cell: ({row}) => (
                    <input
                        name="last_name"
                        defaultValue={row.original.last_name}
                        type="text"
                        onChange={(e)=> row.original.last_name = e.target.value}
                    />
                )
            },
            {
                Header: 'Email',
                accessor: 'email',
                Cell: ({row}) => (
                    <input
                        name="email"
                        defaultValue={row.original.email}
                        type="text"
                        onChange={(e)=> row.original.email = e.target.value}
                    />
                )
            },
            {
                Header: 'Role',
                accessor:'role',
                Cell: ({row}) => (
                    <>
                        {row.original.role !== "admin" ?
                            <Select
                            defaultValue={row.original.role}
                            onChange={(e)=> row.original.role = e.target.value}
                            >
                                <MenuItem value='user'>User</MenuItem>
                                <MenuItem value='tutor'>Tutor</MenuItem>
                        </Select>:
                        <div>{row.original.role}</div>}
                    </>
                    )

            },
            {
                Header: 'Total Stars',
                accessor:'totalStar',
                Cell: ({row}) => (
                    <input
                        name="totalStar"
                        defaultValue={row.original.totalStar}
                        type="number"
                        onChange={(e)=> row.original.totalStar = e.target.value}
                    />
                )
            },
            {
                Header: 'Total Votes',
                accessor:'totalVotes',
                Cell: ({row}) => (
                    <input
                        name="totalStar"
                        defaultValue={row.original.totalVotes}
                        type="number"
                        onChange={(e)=> row.original.totalVotes = e.target.value}
                    />
                )
            },
            {
                accessor:'request',
                Cell: ({ row}) => (
                    <>
                        <Button onClick={ (e) => {
                            e.preventDefault();
                            row.original.userRole = getRole();
                            console.log(row.original);
                            updateUser(row.original);
                        }}>
                            Update
                        </Button>
                        <Button style={{marginLeft:20}}  onClick={() => {if (window.confirm('Are you sure you wish to delete this user?')) deleteUser(row.original)}}>Delete</Button>
                    </>),
            },
        ],[]);
    const aptCol= useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id'
            },
            {
                Header: 'Name',
                accessor: 'tutorName'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Subject',
                accessor: 'tutorExpertise'
            },
            {
                Header:'Day',
                accessor:'day',
                Cell:({row}) => {
                    const [day,setDay] = useState('Monday');
                    const weekList = [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday'
                    ]
                    return(
                        <div>
                            <Select value={day} onChange={(e) => row.original.day = e.target.value}>
                                {weekList.map((item)=>(
                                    <MenuItem value={item}>{item}</MenuItem>
                                ) )}
                            </Select>
                        </div>
                    )
                }

            },
            {
                Header:'Start Time',
                accessor:'startTime',
                Cell:({row}) =>(
                    <div>
                        <select value={0} >
                            {Array.from(Array(24).keys()).map((index) => (
                                <option key={index} value={String(index).padStart(2, '0')}>
                                    {String(index).padStart(2, '0')}
                                </option>
                            ))}
                        </select>
                        :
                        <select value={0}>
                            {Array.from(Array(60).keys()).filter((index) => index % 30 === 0).map((index) => (
                                <option key={index} value={String(index).padStart(2, '0')}>
                                    {String(index).padStart(2, '0')}
                                </option>
                            ))}
                        </select>
                    </div>
                )
            },
            {
                Header:'End Time',
                accessor:'endTime',
                Cell:({row}) =>(
                    <div>
                        { moment(row.original.endTime, 'HH:mm:ss').format("HH:mm")}
                    </div>
                )
            },
            {
                Header: 'Rating',
                accessor:'tutorRating',
            },
            {
                accessor:'request',
                Cell: ({ row}) => (
                    <>
                    <Button onClick={ (e) => {
                        e.preventDefault();

                        console.log(row.original)/*
                        Axios.post(patchAptURL,removeBody)
                            .then( (response) => {
                                console.log(response.data);
                                navigate(0)
                            }).catch((err) =>{
                            alert(err);
                        })*/
                    }}>
                        Update
                    </Button>
                        <Button style={{marginLeft:20}}  onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this appointment?')) this.onCancel()
                        }
                        }>Delete</Button>
                    </>),
            },
        ],[]);
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
    //user
    useEffect(() =>  {
        setCount((count)=> count+1);
        console.log(count);
        Axios.post(userURL).then((response) => {
            setUserData(response.data);
        });;
    }, [userCol]);
    //Apt
    useEffect(() =>  {
        (async () => {
            Axios.post(aptURL,requestBody).then((response) => {
                setAptData(response.data);
            });
        })();
    }, []);

    return (
        <>
            <div className="auth-form-container">
                <div>
                    <h2>List of users: </h2>
                    <DataTable data={userData} columns={userCol}/>
                </div>
            </div>
            <div>
                <h1>Appointment List</h1>
                <DataTable data={aptData} columns={aptCol}/>
            </div>
        </>

    )
}