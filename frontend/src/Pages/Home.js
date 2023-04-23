import StarRating from "./components/StarRating";
import {getToken} from './components/auth';

export default function Home(){
    let token = getToken();
    return (
        <>
        {token ?
                <>
            <div className="backgroundSize">
                <div>
                    <h2> Upcoming Appointments: </h2>
                    <p>
                        Displaying appointments here
                    </p>
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
        </>:
        <>
        <div className="auth-form-container">
            <h1>Log in to see your appointment</h1>
        </div>
        </>
        }</>
    )
}