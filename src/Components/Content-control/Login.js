import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux'
import { signIn } from '../../Store/Actions/AuthActions';
import { Redirect } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Lotarynska
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


class SignIn extends Component {
  state = {
      email: "",
      password: ""
  }
  handleChange = (e) => {
      this.setState({
          [e.target.id] : e.target.value
      });
  };
  handleSubmit = (e) => {
      e.preventDefault();
      //console.log(this.state);
      this.props.signIn(this.state);
  }
  render() {
      const { authError, auth, authLoading } = this.props;
      if(auth.uid) return <Redirect to='/content-control' />
      return (
        <ThemeProvider theme={theme}>
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={authLoading}
              >
                {authLoading ? "Loading" : 'Sign In'}
              </Button>
            </Box>
            {authError ? 
              <Alert severity="error">{authError}</Alert> : null
            }
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      )
  }
}

const mapStateToProps = (state) => {
  return {
      authLoading: state.Auth.loading,
      authError: state.Auth.authError,
      auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      signIn : (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)