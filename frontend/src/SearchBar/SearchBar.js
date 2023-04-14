import { 
    TextField,
    Button,
    Grid,
} from "@material-ui/core";

const SearchBar = () => (
    <form action="/" method="get">
        <Grid container spacing={10}>
            <Grid item xs={8}>
                <TextField
                    type="text"
                    placeholder="Look For Tutors"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={2}>
                <Button variant="outlined">Search</Button>
            </Grid>
        </Grid>
    </form>
);

export default SearchBar;