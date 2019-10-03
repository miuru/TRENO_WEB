import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/MailOutline';
import PasswodrdlinedIcon from '@material-ui/icons/Https';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import "bootstrap/dist/css/bootstrap.min.css";
import Input from '@material-ui/core/Input';
import DefaultImg from "../assets/user-img.png";
import axios from 'axios';
import {withRouter} from 'react-router';
import {createBrowserHistory} from "history";
import Home from './Home'
import {BrowserRouter as Router, Route} from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center"   style={{color:'white'}}>
            {'Copyright © '}
            <Link color="inherit" href="">
                TRENO
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/search/collections)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        backgroundColor: 'red'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(7),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));


function SignIn() {
    const [file, Setfile] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [email, SetEmail] = useState('');
    const [validEmail, SetValidEmail] = useState(false);
    const [password, SetPassword] = useState('');
    const [verifiedPw, SetPwVerified] = useState(false);
    const history = createBrowserHistory();

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            console.log("Valid email")
            return (true)
        }
        return (false)
    }

    const emailChangeHandler = (e) => {
        console.log(e.target.value);
        SetEmail(e.target.value);
        SetValidEmail(ValidateEmail(email))
    }

    const passwordChangeHandler = (e) => {
        SetPassword(e.target.value)
    }

    const _handleSubmit = e => {
        e.preventDefault();

        const GuestUser = {
            email: email,
            password: password
        };

        axios.post("http://localhost:4000/user/login", GuestUser).then(res => {
            let resData = res.data;

            if (Object.keys(res.data).length) {
                sessionStorage.setItem('loggedIn', 'true');

                sessionStorage.setItem('UserID', resData[0]._id);
                sessionStorage.setItem('imageId', resData[0].imageId);
                sessionStorage.setItem('nic', resData[0].nic);
                sessionStorage.setItem('name',resData[0].name);
                sessionStorage.setItem('mobileNo', resData[0].mobileNo);
                sessionStorage.setItem('email', resData[0].email);
                sessionStorage.setItem('password', resData[0].password);
                // sessionStorage.setItem('UserType', resData[0].Type);
                sessionStorage.setItem('postalCode', resData[0].postalCode);
                sessionStorage.setItem('district',resData[0].district);
                sessionStorage.setItem('province',resData[0].province);


                // let {history} = this.props;
                if(resData[0].type === "Driver") {
                    history.push({
                        pathname: '/home'
                    });
                    window.location.reload();
                }
                else{
                    history.push({
                        pathname: '/myAccount'
                    });
                    window.location.reload();
                }
            } else {
                alert("User not found. Please register");
                history.push({
                    pathname: '/register'
                });
            }
        });
    };
    const _handleImageChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {

            Setfile(file);
            setImagePreviewUrl(reader.result);

        }

        reader.readAsDataURL(file)
    };

    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={6} style={{background:'#525252'}}>
                <div style={{ paddingTop: '60px',}}>
                    <img style={{height: '50%', width: '50%',borderRadius:"50%"}} src={DefaultImg}
                    />
                </div>
                <Button

                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    SignIn With faceBook
                </Button>
            </Grid>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square style={{background:'#1e1c22'}} >
                <div className={classes.paper}>
                    <Typography component="h3" variant="h3" style={{color:'#004dcf',fontFamily:'Stencil'}}>
                        LOGIN
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Input
                            id="input-with-icon-adornment"
                            fullWidth
                            type="email"
                            placeholder="Email"
                            style={{color:'white'}}
                            onChange={emailChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon/>
                                </Avatar>
                            }
                        />
                        <Input
                            id="input-with-icon-adornment"
                            fullWidth
                            type='password'
                            style={{color:'white'}}
                            placeholder="Password"
                            onChange={passwordChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />
                        <FormControlLabel
                            style={{color:'white'}}
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            onClick={_handleSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2"   style={{color:'white'}}>
                                    Forgot password?

                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/" variant="body2"   style={{color:'white'}}>
                                    {"Don't have an account? Sign Up"}

                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default withRouter(SignIn);
