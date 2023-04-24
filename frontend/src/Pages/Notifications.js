import { useNavigate } from "react-router-dom";
import Axios from 'axios';
export default function Notifications() {
    //const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/getmessage"
    const navigate = useNavigate();

    const navigateToNotificationMessage = () => {
      navigate('/NotificationMessage');
    };
    Axios.post();
    return (
        <>
        <h2> Notifications: </h2>
        <div className="backgroundNotyPage">
            <div className="textAlign">
                <div>
                    <table>
                        <button onClick={navigateToNotificationMessage}>
                            <div class="notificationList">
                                <div class="theBox">
                                    <h3>notification</h3>
                                    <p>This is a notification. Testing.</p>
                                </div>
                            </div>
                        </button>
                        <button onClick={navigateToNotificationMessage}>
                            <div class="notificationList">
                                <div class="theBox">
                                    <h3>notification</h3>
                                    <p>This is a notification.....</p>
                                </div>
                            </div>
                        </button>
                        <button onClick={navigateToNotificationMessage}>
                            <div class="notificationList">
                                <div class="theBox">
                                    <h3>notification</h3>
                                    <p>Example notification...</p>
                                </div>
                            </div>
                        </button>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}