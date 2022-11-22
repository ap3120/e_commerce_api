import {Navbar} from './components/navbar.js';
import {Home} from './components/home.js';
import {Register} from './components/register.js';
import {Login} from './components/login.js';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Route path='/'>
                <Navbar/>
            </Route>
            <Route path='/' exact>
                <Home />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
        </Router>
    );
}

export default App;
