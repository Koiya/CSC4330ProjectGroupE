import React, {useMemo, useState, useEffect,useRef} from 'react';
import Axios from "axios";
import DataTable from "./components/datatable";
import {getId,getName,getUser} from "./components/auth";
import {useNavigate} from "react-router-dom";
import {Select, SelectChangeEvent } from "@mui/material";
import {MenuItem} from "@mui/material";
import moment from "moment/moment";

export default function Appointment() {
    const tutorAptListURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getTutorApt"
    const removeURL = tutorAptListURL + "/remove"
    const createAptURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/createApt"
    const [expertise, setExpertise] = useState('English');
    const [message, setMessage] = useState('');
    const startTimeRef = useRef(0);
    const endTimeRef = useRef(0);
    const dayRef = useRef('Monday');
    const [data,setData] = useState([]);
    let name = getName();
    let email = getUser();
    let ID = getId();
    let navigate = useNavigate();
    /*Data format:
    const test = [
        { name: "Joe Smith", expertise: "Math", rating: 3},
        { name: "Megan Celica", expertise: "Biology", rating: 4},
        { name: "Bob Celica", expertise: "English", rating: 5}
    ];*/
    function DayPicker(){
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
        const handleDayChange = (event: SelectChangeEvent) =>{
            setDay(event.target.value);
        }
        dayRef.current = day;
        return(
            <div>
                <Select value={day} onChange={handleDayChange}>
                    {weekList.map((item)=>(
                        <MenuItem value={item}>{item}</MenuItem>
                    ) )}
                </Select>
            </div>
        )
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
        const pickTime = `${hour}${minute}00`;
        if (props === "start"){
            startTimeRef.current = pickTime;
        }
        if (props === "end"){
            endTimeRef.current = pickTime;
        }
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
    const handleSubmit = (e) => {
        let startTime = JSON.stringify(startTimeRef.current);
        let endTime = JSON.stringify(endTimeRef.current);
        let dayOfTheWeek = dayRef.current;
        startTime = startTime.replace(/\"/g, "");
        endTime = endTime.replace(/\"/g, "");
        e.preventDefault();
        const requestBody = {
            ID:ID,
            name:name,
            email:email,
            expertise:expertise,
            day:dayOfTheWeek,
            startTime:startTime,
            endTime:endTime
        }
        console.log(requestBody);

        Axios.post(createAptURL,requestBody)
            .then( (response) => {
                alert(response.data);
                navigate(0);
            }).catch((err) =>{
                setMessage(err.response.data);
        })
    }

    const requestBody = {
        ID: ID
    }
    useEffect(() =>  {
        (async () => {
            Axios.post(tutorAptListURL,requestBody).then((response) => {
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
                Header:'Availability',
                Cell:({row}) =>(
                    <div>
                        {row.original.day + " " +  moment(row.original.startTime, 'HH:mm:ss').format("hh:mm a") + "-" +moment(row.original.endTime, 'HH:mm:ss').format("hh:mm a")}
                    </div>
                )
            },
            {
                accessor:'request',
                Cell: ({ row}) => (
                    <button onClick={ (e) => {
                        e.preventDefault();
                        const removeBody = {
                            tutorID:ID,
                            aptID: row.original.id,
                        }
                        Axios.post(removeURL,removeBody)
                            .then( (response) => {
                                alert(response.data)
                                navigate(0)
                            }).catch((err) =>{
                            setMessage(err.response.data);
                        })
                    }}>
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
                    <label>Set Day: </label>
                        <DayPicker/>
                    <label>Set Time: </label>
                    <TimePicker props={"start"}/> to <TimePicker props={"end"}/>
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