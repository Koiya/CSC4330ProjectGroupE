import DataTable from "./components/datatable.jsx";
import {useMemo, useState,useEffect} from "react";
import {getUser,getId,getName,getRole} from "./components/auth.js";
import Axios from "axios";

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
                Header: 'Rating',
                accessor: 'tutorRating'
            },
            {
                Header:'Availability',
                accessor:'tutorTime'
            },
            {
                accessor:'request',
                Cell: ({row}) =>
                    (
                    <button onClick={(e) => {
                        e.preventDefault();
                        if (role === "user") {
                            let messageTo = `${name} would like to request tutoring with ${row.original.tutorExpertise} at ${row.original.tutorTime}`
                            const sendAptBody = {
                                userID: ID,
                                studentName: name,
                                userRole: role,
                                tutorID: row.original.tutorID,
                                tutorName:row.original.tutorName,
                                expertise: row.original.tutorExpertise,
                                message: messageTo,
                                time: row.original.tutorTime,
                                status: "Pending"

                            }
                            console.log(sendAptBody)
                            Axios.post(sendMessageURL, sendAptBody)
                                .then((response) => {
                                    alert(`Appointment request with ${row.original.tutorName} at ${row.original.tutorTime}`)
                                }).catch((err) => {
                                alert(err.response.data);
                            })
                        } else {
                            alert("You cannot make an appointment")
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
        </>
    )
}