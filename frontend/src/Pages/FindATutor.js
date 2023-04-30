import DataTable from "./components/datatable.jsx";
import React, {useMemo, useState,useEffect} from "react";
import {getUser,getId,getName,getRole} from "./components/auth.js";
import moment from "moment";
import Axios from "axios";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function FindATutor() {
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getTutor"
    const sendMessageURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/sendMessage"
    /*Data format:
    const test = [
        { name: "Joe Smith", expertise: "Math", rating: 3},
        { name: "Megan Celica", expertise: "Biology", rating: 4},
        { name: "Bob Celica", expertise: "English", rating: 5}
    ];
    */
    const errorNotify = () => toast.error("Error sending request",{
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
        theme: "light"
    });

    const aptRequestedToast = () => toast.success('Appointment request sent', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
        theme: "light",
    });
    let requestBody = {};
    let user = getUser();
    let ID = getId();
    let name = getName();
    let role = getRole();
    if (!user || user !== 'undefined') {
        let domain = user.split("@")[1];
        requestBody = {
            email: domain,
            role: role
        }
    }

    const [data,setData] = useState([]);
    useEffect(() =>  {
        (async () => {
            Axios.post(URL,requestBody).then((response) => {
                setData(response.data);
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
                Header: 'Study',
                accessor: 'tutorExpertise'
            },
            {
                Header:'Availability',
                accessor:'day',
                Cell:({row}) =>(
                    <div>
                        {row.original.day + " " +  moment(row.original.startTime, 'HH:mm:ss').format("hh:mm a") + "-" +moment(row.original.endTime, 'HH:mm:ss').format("hh:mm a")}
                    </div>
                )
            },
            {
                Header: 'Rating',
                accessor: 'tutorRating'
            },
            {
                accessor:'request',
                Cell: ({row}) =>
                    (
                    <button onClick={(e) => {
                        e.preventDefault();

                        if (role === "user") {
                            let messageTo = `${name} would like to request tutoring with ${row.original.tutorExpertise} on ${row.original.day} ${moment(row.original.startTime, 'HH:mm:ss').format("hh:mm a")}-${moment(row.original.endTime, 'HH:mm:ss').format("hh:mm a")}`
                            const sendAptBody = {
                                userID: ID,
                                studentName: name,
                                userRole: role,
                                tutorID: row.original.tutorID,
                                tutorName:row.original.tutorName,
                                expertise: row.original.tutorExpertise,
                                message: messageTo,
                                day:row.original.day,
                                startTime: row.original.startTime,
                                endTime: row.original.endTime,
                                status: "Pending"

                            }
                            console.log(sendAptBody)
                            Axios.post(sendMessageURL, sendAptBody)
                                .then((response) => {
                                    aptRequestedToast();
                                }).catch((err) => {
                                errorNotify();
                            })
                        } else {
                            errorNotify();
                        }
                    }}>
                        Request Appointment
                    </button>),
            },
        ],
        []
    );
    return (
        <>
            <div className="backgroundFindTutor">

                <DataTable data={data} columns={columns} enableSearchBar={true}/>
            </div>
            <ToastContainer limit={1}/>
        </>
    )
}