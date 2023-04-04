import SearchBar from "../SearchBar/SearchBar";

export default function FindATutor() {
    return (
        <>
        <SearchBar/>
            <div className="backgroundFindTutor">
                <table>
                    <div className="styling">
                            <input type="checkbox" id="" name="" value="" /> Math
                    </div>
                    <div className="styling">
                        <input type="checkbox" id="" name="" value="" /> Science
                    </div>
                    <div className="styling">
                        <input type="checkbox" id="" name="" value="" /> History
                    </div>
                </table>
                    <div className="">
                        <p align="center">
                            List of tutors below, also filter by category
                        </p>
                    </div>
            </div>
        </>
    )
}