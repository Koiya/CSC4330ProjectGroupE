import { useNavigate } from "react-router-dom";

export default function Notifications() {

    const navigate = useNavigate();

    const navigateToNotificationMessage = () => {
      navigate('/NotificationMessage');
    };

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