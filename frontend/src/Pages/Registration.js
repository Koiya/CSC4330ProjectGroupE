import React, { useState } from "react";
import {Link} from "react-router-dom";
import Axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Registration() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('');
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [message, setMessage] = useState('');
    const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/register";
    const handleSubmit = (e) => {
        e.preventDefault();
        if(firstName.trim() === '' || email.trim() === ''|| pass.trim() === '' || role === ''){
            setMessage('All fields are required');
            return;
        }
        const requestBody = {
            first_name:firstName,
            last_name:lastName,
            email:email,
            password:pass,
            role:role,
        }
        Axios.post(URL,requestBody)
            .then( (response) => {
            setMessage('Registration Successful')
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
            setMessage(error.response.data);
        });
    }

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirst(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLast(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    />
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item xs={5}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={role === "user"} onChange={(e) => setRole(e.target.checked ? "user" : "")} />}
                            label="Student"
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={role === "tutor"} onChange={(e) => setRole(e.target.checked ? "tutor" : "")} />}
                            label="Tutor"
                        />
                    </Grid>
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 2,
                    mb: 2,
                    backgroundColor: '#1976D2',
                    color: '#fff',
                    '&:hover': {
                    backgroundColor: '#115293',
                    },
                }}
                >
                Sign Up
                </Button>
                <Box sx={{ mt: 2, color: '#f44336' }}>
                    {message && <p>{message}</p>}
                </Box>
                <Grid container justifyContent="center">
                <Grid item>
                    <Link to="/login" variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
    </ThemeProvider>
    );
}