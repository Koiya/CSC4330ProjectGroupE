import SearchBar from "../SearchBar/SearchBar";
import {
    Box,
    Grid,
    Checkbox,
} from "@material-ui/core"

const subjects = [
    {id: 0, name: "Math"},
    {id: 0, name: "Science"},
    {id: 0, name: "English"},
    {id: 0, name: "History"},
]

export default function FindATutor() {
    return (
        <>
        <Box sx={{p: "200px"}}>
            <SearchBar/>
                <Box className="backgroundFindTutor">
                    <Grid container spacing={2}>
                        {subjects.map((item) => {
                            return(
                                <Grid item xs={2}>
                                    <Box sx={{display:"flex"}}>
                                        <Checkbox/>
                                        {item.name}
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                        <div className="">
                            <p align="center">
                                List of tutors below, also filter by category
                            </p>
                        </div>
                </Box>
        </Box>
        </>
    )
}