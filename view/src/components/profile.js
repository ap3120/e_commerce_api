import {useSelector, useDispatch} from 'react-redux';
import Typography from '@mui/material/Typography';
import '../App.css';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {updatePassword, logoutUser, deleteUser} from '../api/users.js';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {logout} from '../app/authenticationSlice.js';

export const Profile = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPassword2, setCurrentPassword2] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordMatch, setNewPasswordMatch] = useState('');
    const [errors, setErrors] = useState({});
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openWrongPassword, setOpenWrongPassword] = useState(false);
    const [openError, setOpenError] = useState(false)
    const user = useSelector(state => state.authentication.user);
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const dispatch = useDispatch();

    const validate = () => {
        let temp = {};
        temp.currentPassword = currentPassword ? '' : 'Please enter your current password.';
        temp.newPassword = newPassword ? '' : 'Please enter your new password.';
        temp.newPasswordMatch = newPasswordMatch === newPassword ? '' : 'Password does not match.'
        setErrors(temp);
        return Object.values(temp).every(x => x === '');
    }

    const validateDeleteAccount = () => {
        let temp = {};
        temp.currentPassword2 = currentPassword2 ? '' : 'Please enter your password.';
        setErrors(temp);
        return Object.values(temp).every(x => x === '');
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (validate()) {
            const response = await updatePassword(user.id, currentPassword, newPassword);
            if (response.msg === 'Password successfully updated.') {
                setOpenSuccess(true);
            } else if (response.msg === 'Incorrect password') {
                setOpenWrongPassword(true);
            } else {
                setOpenError(true);
            }
        }
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        if (validateDeleteAccount()) {
            const response = await deleteUser(user.id, currentPassword2);
            if (response.msg === 'User successfully deleted.') {
                dispatch(logout());
            } else if (response.msg === 'Incorrect password.') {
                setOpenWrongPassword(true);
            } else {
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
    const handleCloseWrongPassword = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenWrongPassword(false);
    }
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    }

    if (! isLoggedIn) return (<Navigate to='/' />);

    return (
        <div className='center-container'>
            <h1>Profile</h1>
            <Typography variant='h4'>{user.first_name} {user.last_name}</Typography>
            <Typography variant='h6'>{user.email}</Typography>
            <form onSubmit={handleChangePassword}>
                <Typography>Change password</Typography>
                <Box
                    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="outlined"
                            label="Current password *"
                            type='password'
                            {...(errors.currentPassword && {error: true, helperText: errors.currentPassword})}
                            onChange={(e) => {setCurrentPassword(e.target.value)}}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined"
                            label="New password *"
                            type='password'
                            {...(errors.newPassword && {error: true, helperText: errors.newPassword})}
                            onChange={(e) => {setNewPassword(e.target.value)}}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined"
                            label="Confirm new password *"
                            type='password'
                            {...(errors.newPasswordMatch && {error: true, helperText: errors.newPasswordMatch})}
                            onChange={(e) => {setNewPasswordMatch(e.target.value)}}
                        />
                    </div>
                </Box>
                <Button type='submit' variant='contained'>Confirm</Button>
            </form>
            <form onSubmit={handleDeleteAccount}>
                <Typography>Permanently delete my account. Please enter your password to delete your account</Typography>
                <Box
                    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="outlined"
                            label="Password *"
                            type='password'
                            {...(errors.currentPassword2 && {error: true, helperText: errors.currentPassword2})}
                            onChange={(e) => {setCurrentPassword2(e.target.value)}}
                        />
                    </div>
                </Box>
                <Button type='submit' variant='outlined' color='error'>Delete Account</Button>
            </form>
            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert severity='success' onClose={handleCloseSuccess}>Password successfully updated.</Alert>
            </Snackbar>
            <Snackbar open={openWrongPassword} autoHideDuration={3000} onClose={handleCloseWrongPassword} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert severity='error' onClose={handleCloseWrongPassword}>Incorrect password.</Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert severity='error' onClose={handleCloseError}>Something went wrong.</Alert>
            </Snackbar>
        </div>
    )
}
