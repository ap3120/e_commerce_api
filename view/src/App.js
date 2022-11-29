import {Navbar} from './components/navbar.js';
import {Home} from './components/home.js';
import {Register} from './components/register.js';
import {Login} from './components/login.js';
import {Cart} from './components/cart.js';
import {Orders} from './components/orders.js';
import {Accessories} from './components/products/accessories.js';
import {Laptops} from './components/products/laptops.js';
import {Smartphones} from './components/products/smartphones.js';
import {Profile} from './components/profile.js';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/accessories' element={<Accessories />} />
                <Route path='/laptops' element={<Laptops />} />
                <Route path='/smartphones' element={<Smartphones />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
