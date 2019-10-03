import React, {Component, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/MailOutline';
import PasswodrdlinedIcon from '@material-ui/icons/Https';
import UserIcon from '@material-ui/icons/PermIdentityTwoTone';
import PhoneIcon from "@material-ui/icons/PermPhoneMsgTwoTone";
import LocationIcon from "@material-ui/icons/AddLocationTwoTone"
import NICIcon from "@material-ui/icons/CardMembershipTwoTone"
import PostalIcon from "@material-ui/icons/Code"
import {makeStyles} from '@material-ui/core/styles';
import "bootstrap/dist/css/bootstrap.min.css";
import Input from '@material-ui/core/Input';
import DefaultImg from '../assets/default-img.png';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Fab from '@material-ui/core/Fab';
import {withRouter} from 'react-router';
import axios from 'axios';
import {createBrowserHistory} from "history";
import swal from 'sweetalert';
import Link from '@material-ui/core/Link';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
        margin: theme.spacing(2, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.light,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    responsive: {
        width: '100%',
        maxWidth: '1000px',
        height: '100%',
        objectFit: 'cover',
    },
    imageCropper: {
        width: '50vmin',
        height: '50vmin',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '50%',
        padding: '0vmin'
    },
    inputImage: {
        width: '1vmin',
        height: '1vmin',
        zIndex: 1,
        position: 'relative',
        marginLeft: '0vmin',
        marginRight: 'auto',
        borderRadius: '50%',
        marginTop: "5vmin"
    },
    inputContainer: {
        paddingTop: '4vmin',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50vmin',
        height: '50vmin',
        position: 'relative'
    },
    roundedButton: {
        width: '10vmin',
        height: '10vmin',
        borderRadius: '50%',
        backgroundColor: 'red',
        textAlign: 'center',
        backgroundImage: LockOutlinedIcon
    },
    button: {
        marginLeft: '35vmin',
        marginTop: '40vmin',
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    header: {
        fontSize: 32, fontFamily: 'Sans-serif', fontStyle: 'normal',
        fontWeight: 'bold', paddingLeft: '2vmin', color: 'white'
    }
}));


function SignUp() {
    const [email, SetEmail] = useState('');
    const [validEmail, SetValidEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [validPassword, SetValidPassword] = useState('');
    const [verifiedPw, SetPwVerified] = useState('');
    const [name, SetName] = useState('');
    const [mobileNo, SetMobileNo] = useState('');
    const [validMobileNo, SetValidMobileNo] = useState('');
    const [district, SetDistrict] = useState('');
    const [province, SetProvince] = useState('');
    const [nic, SetNIC] = useState('');
    const [postalCode, SetPostalCode] = useState('');
    const [image, SetImage] = useState(DefaultImg);
    const [file, Setfile] = useState('');
    const [type,SetType] = useState('Passenger')
    const isActive = true;
    const [disableButton, setDisableButton] = useState(true); //!(validEmail && verifiedPw && validMobileNo)
    const history = createBrowserHistory();

    const handleTYpeChange = event => {
        SetType(event.target.value);

    };
    function ValidateEmail(mail) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email || email === "") {
           return("Invalid Email Address");
        } else {
            if (reg.test(email) === false) {
                return ("Invalid Email Address")
            }
            else{
                return "";
            }
        }
        return (false)
    }

    const _handleSubmit = e => {
        let data = new FormData();
        data.append("photo", file);
        data.append('email', email);
        data.append('name', name);
        data.append('password', password);
        data.append('mobileNo', mobileNo);
        data.append('district', district);
        data.append('province', province);
        data.append('nic', nic);
        data.append('postalCode', postalCode)
        data.append('type',type);
        axios.post('http://localhost:4000/user/register', data).then(
            (res) => {
                console.log(res)
                swal({
                    title: "Success",
                    text: "User Registration Successful! A confirmation email has been sent to your email",
                    icon: "success",
                }).then((value => {
                    console.log(value);
                    e.preventDefault();
                    history.push('/login');
                    window.location.reload();
                }))

            }
        ).catch((error) => {
            console.log(error);
            swal({
                title: "Error!",
                text: "Enter valid data to register!",
                icon: "error",
            }).then(
                (value => {
                    console.log(value);
                    e.preventDefault();
                    history.push('/register');
                    window.location.reload();
                })
            );
        });

    };
    const agreementHandler = (e) => {
        var checked = e.target.checked;
        setDisableButton(!checked);
    }
    const _handleImageChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            Setfile(file);
        }

        reader.onload = (e) => {
            SetImage(e.target.result);
        }

        reader.readAsDataURL(file)
    };

    const classes = useStyles();
    let $imagePreview = (
        <div className={classes.inputContainer}>
            <div className={classes.header}>
                <h className={classes.header} >
                    Registration Form
                </h>

            </div>
            <div className={classes.inputImage}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={_handleImageChange}
                />
                <label htmlFor="contained-button-file">
                    <Fab variant="contained" component="span" className={classes.button}>
                        <CameraAltIcon color=""/>
                    </Fab>
                </label>
            </div>
            <div className={classes.imageCropper}>
                <img className={classes.responsive} src={image}/>
            </div>

            <FormControlLabel
                style={{color:'white'}}
                control={<Checkbox onChange={agreementHandler} value="accept" color="primary"/>}
                label="By clicking you accept our terms and conditions."
            />

            <Button onClick={_handleSubmit}
                    style={{marginTop: '5vmin'}}
                    disabled={disableButton}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={useStyles.submit}
            >
                Register
            </Button>
            <Link href="login" variant="body2"     style={{color:'white'}}>
                {"Don't have an account? Sign Up"}
            </Link>
        </div>
    );


    const emailChangeHandler = (e) => {
        console.log(e.target.value);
        SetEmail(e.target.value);
        SetValidEmail(ValidateEmail(email))
    }

    const passwordChangeHandler = (e) => {
        SetPassword(e.target.value)
        if (e.target.value.length < 6) {
            SetValidPassword("Password should contain at least 6 characters!");
        } else {
            SetValidPassword('');
        }

    }

    const passwordConfirmChangeHandler = (e) => {
        console.log(e.target.value)
        if (e.target.value == password) {
            SetPwVerified("")
        } else {
            SetPwVerified("Passwords do not match!")
        }

    }

    const nameChangeHandler = (e) => {
        SetName(e.target.value)
    }

    const mobielNoChangeHandler = (e) => {
        SetMobileNo(e.target.value)
        if (!isNaN(mobileNo) && mobileNo.length == 9) {
            SetValidMobileNo('');
        } else {
            SetValidMobileNo("Should be a 10 digit number! ");
        }
    }

    const districtChangeHandler = (e) => {
        SetDistrict(e.target.value)
    }
    const provinceChangeHandler = (e) => {
        SetProvince(e.target.value)
    }

    const nicChangeHandler = (e) => {
        SetNIC(e.target.value)
    }
    const postalCodeChangeHandler = (e) => {
        SetPostalCode(e.target.value)
    }

    return (
        <Grid container component="main" className={classes.root} component={Paper} elevation={6} square>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={5} style={{background:'#525252'}}>
                <div>
                    <div> {$imagePreview}</div>
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={7} style={{background:'#1e1c22'}}>
                <div className={classes.paper}>
                    <form className={classes.form}>
                        <Input
                            autoFocus={true}
                            id="input-with-icon-adornment"
                            fullWidth
                            style={{color:'white'}}
                            placeholder="Email"
                            name='email'
                            onChange={emailChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon/>
                                </Avatar>
                            }
                        />

                        {validEmail.toString() &&(<label style={{color: 'red', paddingLeft: 5,alignItems:'left'}}> {validEmail.toString()} </label>)}


                        <Input
                            name='password'
                            type='password'
                            id="input-with-icon-adornment"
                            fullWidth
                            style={{color:'white'}}
                            placeholder="Password"
                            onChange={passwordChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />
                        {validPassword.toString() &&(<label style={{color: 'red', paddingLeft: 5}}> {validPassword.toString()} </label>)}

                        <Input
                            name='password'
                            type='password'
                            id="input-with-icon-adornment"
                            fullWidth
                            style={{color:'white'}}
                            placeholder="Confirm Password"
                            onChange={passwordConfirmChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PasswodrdlinedIcon/>
                                </Avatar>
                            }
                        />
                        {verifiedPw.toString() &&(<label style={{color: 'red', paddingLeft: 5}}> {verifiedPw.toString()} </label>)}
                        <Input
                            name='name'
                            id="input-with-icon-adornment"
                            fullWidth
                            style={{color:'white'}}
                            placeholder="Name"
                            onChange={nameChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <UserIcon/>
                                </Avatar>
                            }
                        />

                        <Input
                            name='mobileNo'
                            type='number'
                            id="input-with-icon-adornment"
                            fullWidth
                            style={{color:'white'}}
                            placeholder="Mobile No"
                            onChange={mobielNoChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PhoneIcon/>
                                </Avatar>
                            }
                        />
                        {validMobileNo.toString() &&(<label style={{color: 'red', paddingLeft: 5}}> {validMobileNo.toString()} </label>)}
                        <Input
                            name='password'
                            id="input-with-icon-adornment"
                            fullWidth
                            style={{color:'white'}}
                            placeholder="District"
                            onChange={districtChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <LocationIcon/>
                                </Avatar>
                            }
                        />

                        <Input
                            name='password'
                            id="input-with-icon-adornment"
                            fullWidth
                            style={{color:'white'}}
                            placeholder="Province"
                            onChange={provinceChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <LocationIcon/>
                                </Avatar>
                            }
                        />
                        <Input
                            name='password'
                            id="input-with-icon-adornment"
                            fullWidth
                            style={{color:'white'}}
                            placeholder="NIC number"
                            onChange={nicChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <NICIcon/>
                                </Avatar>
                            }
                        />
                        <Input
                            name='password'
                            id="input-with-icon-adornment"
                            style={{color:'white'}}
                            fullWidth
                            placeholder="Postal Code"
                            onChange={postalCodeChangeHandler}
                            startAdornment={
                                <Avatar className={classes.avatar}>
                                    <PostalIcon/>
                                </Avatar>
                            }
                        />
                        <div style={{paddingLeft:-100}}>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="position" name="position" value={type} onChange={handleTYpeChange} row>
                                <FormControlLabel
                                    value="Passenger"
                                    control={<Radio color="primary" />}
                                    label="Passenger"
                                    style={{color:'white'}}
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    style={{color:'white'}}
                                    value="Driver"
                                    control={<Radio color="primary" />}
                                    label="Driver"
                                    labelPlacement="start"
                                />
                            </RadioGroup>
                        </FormControl>
                        </div>
                    </form>
                </div>
            </Grid>
        </Grid>

    );

}

export default withRouter(SignUp);

