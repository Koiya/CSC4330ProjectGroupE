import { useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import {getRole, getId, getName} from './components/auth';
import Axios from 'axios';
export default function Notifications() {
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getmessage"
    const replyURL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/sendMessage"
    const navigate = useNavigate();
    const [getList,setList] = useState([]);
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
                    setList(response.data);
                    console.log(response.data);
                }).catch((err) =>{
                console.log(err);
            });
        })();
    }, []);

    function CreateNoti({items}){
        return (
            <div>
                {items.map((item, index) =>
                        <div className="theBox" key={index}>
                            <h3>{item.message}</h3>
                            <p>{item.status}</p>
                            {item.status === "Pending" ? <>
                                <button onClick={(e)=>{
                                    const requestBody = {
                                        messageID:item.messageID,
                                        studentID:item.sender_id,
                                        studentName: item.student_name,
                                        tutorID:item.receiver_id,
                                        tutorName: item.tutor_name,
                                        expertise:item.expertise,
                                        role:role,
                                        status:"Accepted"
                                    }
                                    console.log(requestBody);
                                    Axios.post(replyURL,requestBody)
                                        .then( (response) => {
                                            navigate(0);
                                            console.log(response.data);
                                        })
                                }}>Accept</button>
                                <button onClick={(e)=>{
                                    const requestBody = {
                                        messageID:item.messageID,
                                        studentID:item.sender_id,
                                        studentName: item.student_name,
                                        tutorID:item.receiver_id,
                                        tutorName: item.tutor_name,
                                        expertise:item.expertise,
                                        role:role,
                                        status:"Declined"
                                    }
                                    Axios.post(replyURL,requestBody)
                                        .then( (response) => {
                                            navigate(0);
                                            console.log(response.data);
                                        })
                                    console.log(requestBody);
                                }}>Decline</button>
                            </>
                                : <></>}
                        </div>
                    )}
            </div>
        )
    }
    return (
        <>
        <h2> Notifications: </h2>
        <div className="backgroundNotyPage">
            <div className="textAlign">
                <div>
                    <table>
                        <div className="notificationList">
                            <CreateNoti items={getList}/>
                        </div>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}