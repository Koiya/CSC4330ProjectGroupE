import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Axios from "axios";
import { setUserSession } from './components/auth';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const URL = "https://32xcur57b2.execute-api.us-east-2.amazonaws.com/beta/login";

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      email: email,
      password: pass,
    }
    Axios.post(URL,requestBody)
      .then((response) => {
        setUserSession(response.data.email, response.data.token, response.data.role, response.data.name, response.data.id);
        setLoginStatus("Logged in");
        navigate('/');
      }).catch((err) =>{
        console.log(err);

        if (err.response.status === 404) {
          setLoginStatus(err.response.data);
        }
      })
  }
  
  return (
    <ThemeProvider theme={theme} loginStatus={loginStatus}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#1976D2',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              Sign In
            </Button>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}
export default Login;