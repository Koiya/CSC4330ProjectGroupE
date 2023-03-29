import { useNavigate } from "react-router-dom";

export default function Notifications() {
    const navigate = useNavigate();

    const navigateToNotifications = () => {
      navigate('/Notifications');
    };

    return (
        <>
            <div className="messages">
                <p className="messageText">
                    Student's name
                </p>
                <p className="messageText">
                    Student's name would like to meet at this timeslot
                </p>
                <p className="messageText">
                    for this subject
                </p>
                <div>
                    <button className="messageTextSpace" onClick={navigateToNotifications}>
                        Accept
                    </button>
                    <button className="messageTextSpace" onClick={''}>
                        Decline
                    </button>
                </div>
            </div>
        </>
    )
}