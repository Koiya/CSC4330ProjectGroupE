import SearchBar from "../SearchBar/SearchBar";
import StarRating from "../StarRating/StarRating";

export default function Home() {
    return (
        <>
            <SearchBar/>
            <div className="backgroundSize">
                <div>
                    <h2> Upcoming Appointments: </h2>
                </div>
                    <hr style={{
                        backgroundColor: "#282c34",
                        height: "3px",
                        border: "none",
                        display: "flex",
                        marginTop: "300px",
                        }}
                    />
                <div>
                    <h3> Previous Tutor: </h3>
                        <StarRating/>
                </div>
            </div>
        </>
    )
}