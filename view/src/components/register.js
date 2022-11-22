import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import '../App.css';
import {registerUser} from '../api/users.js';


export const Register = () => {
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConf, setNewPasswordConf] = useState('');

    const onRegisterUser = async (e) => {
        e.preventDefault();
        const newUser = await registerUser(newFirstName, newLastName, newEmail, newPassword);
        console.log(`newUser: ${newUser}`);
        setNewFirstName('');
        setNewLastName('');
        setNewEmail('');
        setNewPassword('');
        setNewPasswordConf('');
    }

    return (
        <div className='center-container'>
        <h1>Register</h1>
        <Card sx={{width: 400}}>
        <form onSubmit={onRegisterUser} className='center-container'> {/*maybe dont need a form*/}
        <Box
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue=''
                    onChange={(e) => {setNewFirstName(e.target.value)}}
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue=''
                    onChange={(e) => {setNewLastName(e.target.value)}}
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    defaultValue=''
                    onChange={(e) => {setNewEmail(e.target.value)}}
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    type='password'
                    label="Password"
                    defaultValue=''
                    onChange={(e) => {setNewPassword(e.target.value)}}
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    type='password'
                    label="Confirm password"
                    defaultValue=''
                    onChange={(e) => {setNewPasswordConf(e.target.value)}}
                />
            </div>
        </Box>
        <Button type='submit' variant='contained'>Register Now</Button>
        <p>Already have an account, login <a href='/login'>here.</a></p>
        </form>
        </Card>
        </div>
    );
}
