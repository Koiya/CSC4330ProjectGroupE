import SearchBar from "../SearchBar/SearchBar";
import StarRating from "../StarRating/StarRating";

export default function Home() {
    return (
        <>
            <SearchBar/>
            <div className="backgroundSize">
                <div>
                    test
                </div>
                    <hr style={{
                        backgroundColor: "#282c34",
                        height: "3px",
                        border: "none",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        marginTop: "350px",
                        }}
                    />
                <div>
                    <h3> Previous Tutor: </h3>
                        <StarRating/>
                    <p>
                    
                    </p>
                </div>
            </div>
        </>
    )
}