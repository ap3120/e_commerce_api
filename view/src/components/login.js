import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import '../App.css';
import {loginUser} from '../api/users.js';
import {login} from '../app/authenticationSlice.js';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);

    useEffect(() => {
        console.log(isLoggedIn);
    }, [isLoggedIn]);

    const validate = () => {
        let temp = {};
        temp.email = email ? '' : 'Please fill in the email field.';
        temp.password = password ? '' : 'Please enter your password';
        setErrors(temp);
        return Object.values(temp).every(x => x === '');
    }

    const onLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            const response = await loginUser(email, password);
            if (response.user && response.session) {
                dispatch(login(response.user));
            } else {
                setOpen(true);
            }
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <div className='center-container'>
            <h1>Login</h1>
            <Card sx={{width: 400}}>
                <form onSubmit={onLogin} className='center-container'>
                    <Box
                        sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined"
                                label="Email *"
                                {...(errors.email && {error: true, helperText: errors.email})}
                                onChange={(e) => {setEmail(e.target.value)}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined"
                                label="Password *"
                                type='password'
                                {...(errors.password && {error: true, helperText: errors.password})}
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                        </div>
                    </Box>
                    <Button type='submit' variant='contained'>Login</Button>
                    <p>Don't have an account yet, register <NavLink to='/register'>here.</NavLink></p>
                </form>
            </Card>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert severity='error' onClose={handleClose}>
                    Invalid credentials.
                </Alert>
            </Snackbar>
        </div>
    );
}
