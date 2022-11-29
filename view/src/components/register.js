import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import '../App.css';
import {registerUser} from '../api/users.js';


export const Register = () => {
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConf, setNewPasswordConf] = useState('');
    const [errors, setErrors] = useState({});
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });
    const [existingEmail, setExistingEmail] = useState('');

    const validate = () => {
        let temp = {};
        temp.first_name = newFirstName ? '' : 'First name is required';
        temp.last_name = newLastName ? '' : 'Last name is required';
        temp.email = (/.+@.+..+/).test(newEmail) ? '' : 'Invalid email';
        temp.password = newPassword ? '' : 'Password is required';
        temp.passwordMatch = newPasswordConf===newPassword ? '' : 'Password doesnt match';
        setErrors(temp);
        return Object.values(temp).every(x => x === '');
    }

    const onRegisterUser = async (e) => {
        e.preventDefault();
        if (validate()) {
            const response = await registerUser(newFirstName, newLastName, newEmail, newPassword);
            if (response.email) {
                setNewUser({
                    first_name: response.first_name,
                    last_name: response.last_name,
                    email: response.email
                })
                setOpenSuccess(true);
            } else if (response.msg) {
                setExistingEmail(response.msg);
                setOpenError(true);
            }
        }
    }

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
    }

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    }
    return (
        <div className='center-container'>
            <h1>Register</h1>
            <Card sx={{width: 400}}>
                <form onSubmit={onRegisterUser} className='center-container'>
                    <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="outlined"
                                label="First Name *"
                                {...(errors.first_name && {error:true, helperText: errors.first_name})}
                                onChange={(e) => {setNewFirstName(e.target.value)}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined"
                                label="Last Name *"
                                {...(errors.last_name && {error: true, helperText: errors.last_name})}
                                onChange={(e) => {setNewLastName(e.target.value)}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined"
                                label="Email *"
                                {...(errors.email && {error: true, helperText: errors.email})}
                                onChange={(e) => {setNewEmail(e.target.value)}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined"
                                type='password'
                                label="Password *"
                                {...(errors.password && {error: true, helperText: errors.password})}
                                onChange={(e) => {setNewPassword(e.target.value)}}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined"
                                type='password'
                                label="Confirm password *"
                                {...(errors.passwordMatch && {error: true, helperText: errors.passwordMatch})}
                                onChange={(e) => {setNewPasswordConf(e.target.value)}}
                            />
                        </div>
                    </Box>
                    <Button type='submit' variant='contained'>Register Now</Button>
                    <p>Already have an account, login <a href='/login'>here.</a></p>
                </form>
            </Card>
            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert severity='success' onClose={handleCloseSuccess}>User {newUser.email} successfully created.</Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert severity='error' onClose={handleCloseError}>{existingEmail}.</Alert>
            </Snackbar>
        </div>
    );
}
