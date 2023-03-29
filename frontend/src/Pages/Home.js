import StarRating from "../StarRating/StarRating";

export default function Home() {
    return (
        <>
            <div className="backgroundSize">
                <div>
                    <h2> Upcoming Appointments: </h2>
                </div>
                    {/* <hr style={{
                        backgroundColor: "#282c34",
                        height: "3px",
                        border: "none",
                        display: "flex",
                        marginTop: "400px",
                        }}
                    /> */}
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
            <div className="backgroundNoty">
                    <h2> Notifications: </h2>
                    <div className="textAlign">
                        <p>
                            Going to display the recent notifications here
                        </p>
                        <div>
                           
                        </div>
                    </div>
            </div>
        </>
    )
}