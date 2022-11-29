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
import {useSelector} from 'react-redux';

const pages = ['Products', 'Carts', 'Orders'];
const products = ['Laptops', 'Smartphones', 'Accessories'];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElProducts, setAnchorElProducts] = React.useState(null);
    const [settings, setSettings] = React.useState(['Register', 'Login']);
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const user = useSelector(state => state.authentication.user);

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

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}>
          <a href='/'><img src={require('../images/logo.png')} width={40} /></a>
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}>
          <a href='/'><img src={require('../images/logo.png')} width={40} /></a>
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
                <MenuItem key={product} onClick={handleCloseProductsMenu}>
                  <Typography textAlign="center">{product}</Typography>
                </MenuItem>
              ))}
            </Menu>
            </div>
            ) : (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
