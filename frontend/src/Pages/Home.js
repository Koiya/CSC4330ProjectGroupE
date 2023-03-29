import StarRating from "../StarRating/StarRating";

export default function Home() {
    return (
        <>
            <div className="backgroundSize">
                <div>
                    <h2> Upcoming Appointments: </h2>
                </div>
            </div>
            <div className="backgroundRating">
                    <h2> Previous Tutor: </h2>
                    <div className="textAlign">
                        <p>
                            Going to display the previous tutor's information here
                        </p>
                        <div>
                            <StarRating/>
                        </div>
                    </div>
            </div>
        </>
    )
}