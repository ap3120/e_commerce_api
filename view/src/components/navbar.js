import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useSelector, useDispatch} from 'react-redux';
import '../App.css';
import {logoutUser} from '../api/users.js';
import {logout} from '../app/authenticationSlice.js';
import {NavLink} from 'react-router-dom';

const pages = ['Products', 'Cart', 'Orders'];
const products = ['Laptops', 'Smartphones', 'Accessories'];

export const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElProducts, setAnchorElProducts] = React.useState(null);
    const [settings, setSettings] = React.useState(['Register', 'Login']);
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isLoggedIn) {
            setSettings([user.first_name, 'Orders', 'Logout'])
        } else {
            setSettings(['Register', 'Login']);
        }
    }, [isLoggedIn])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenProductsMenu = (event) => {
        setAnchorElProducts(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCloseProductsMenu = () => {
        setAnchorElProducts(null);
    };
    const handleLogout = async () => {
        setAnchorElUser(null);
        const response = await logoutUser();
        console.log(`logout res: ${response.msg}`);
        if (response.msg === 'Successfully logged out.') {
            dispatch(logout());
        }
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}>
                        <NavLink to='/'><img src={require('../images/logo.png')} width={40} alt='logo'/></NavLink>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(page => 
                                <NavLink key={page} to={page === 'Products' ? '/' : `/${page.toLowerCase()}` } className='navlink'>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                </NavLink>
                            )}
                        </Menu>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}>
                        <NavLink to='/'><img src={require('../images/logo.png')} width={40} alt='logo'/></NavLink>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => page === 'Products' ? (
                            <div key={page}>
                                <Tooltip title="Open products">
                                    <Button onClick={handleOpenProductsMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                        <Typography>{page}</Typography>
                                    </Button>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElProducts}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElProducts)}
                                    onClose={handleCloseProductsMenu}
                                >
                                    {products.map((product) => (
                                        <NavLink key={product} to={`/${product.toLowerCase()}`} className='navlink'>
                                            <MenuItem onClick={handleCloseProductsMenu}>
                                                <Typography textAlign="center">{product}</Typography>
                                            </MenuItem>
                                        </NavLink>
                                    ))}
                                </Menu>
                            </div>
                        ) : (
                            <NavLink key={page} to={`/${page.toLowerCase()}`} className='navlink'>
                                <Button sx={{my: 2, color: 'white', display: 'block'}}>
                                    {page}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {isLoggedIn ? <Avatar>{user.first_name.slice(0,1).toUpperCase()}{user.last_name.slice(0,1).toUpperCase()}</Avatar> :
                                <Avatar src="/broken-image.jpg" />}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => setting === 'Logout' ? (
                                <MenuItem key={setting} onClick={handleLogout}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ): (
                                <NavLink
                                    key={setting}
                                    to={setting === 'Orders' || setting === 'Login' || setting === 'Register' ?
                                        `/${setting.toLowerCase()}` : '/profile' 
                                    }
                                    className='navlink'
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
