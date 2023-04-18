import StarRating from "./components/StarRating";

export default function Home() {
    return (
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
        </>
    )
}