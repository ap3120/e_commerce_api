import {useSelector} from 'react-redux';
import '../App.css';

export const Orders = () => {
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);

    if (! isLoggedIn) {
        return (
            <div className='center-container'>
                <h1>Please login to view your orders.</h1>
            </div>
        )
    }
    return (
        <div className='center-container'>
            <h1>My orders</h1>
        </div>
    )
}
