import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import '../App.css';

export const Login = () => {
    return (
        <div className='center-container'>
            <h1>Login</h1>
            <Card sx={{width: 400}}>
                <form className='center-container'>
                    <Box
                        sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                defaultValue=''
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Password"
                                defaultValue=''
                            />
                        </div>
                    </Box>
                    <Button variant='contained'>Login</Button>
                    <p>Don't have an account yet, register <a href='/register'>here.</a></p>
                </form>
            </Card>
        </div>
    );
}
