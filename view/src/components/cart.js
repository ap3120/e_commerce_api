import {addToCart, removeFromCart, deleteCart} from '../app/cartSlice.js';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';

import '../App.css';

export const Cart = () => {
    const cart = useSelector(state => state.cart);
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const result = cart.products_list.reduce((finalArr, current) => {
        let obj = finalArr.find(item => item.product_id === current.product_id);
        if (obj) {
            let index = 0;
            while (finalArr[index].product_id !== obj.product_id && index < finalArr.length) {
                index += 1;
            }
            finalArr[index].q += 1;
            return finalArr;
        } else {
            return finalArr.concat([{name: current.name, category: current.category, price: current.price, description: current.description, product_id: current.product_id, image_url: current.image_url, q: 1}]);
        }
    }, []);


    const resetCart = () => {
        dispatch(deleteCart());
    }

    const handleAdd = (item) => {
        const product = {
            name: item.name,
            category: item.category,
            price: item.price,
            description: item.description,
            product_id: item.product_id,
            image_url: item.image_url
        };
        dispatch(addToCart({product: product, price: item.price}));
    }

    const handleRemove = (item) => {
        const product = {
            name: item.name,
            category: item.category,
            price: item.price,
            description: item.description,
            product_id: item.product_id,
            image_url: item.image_url
        };
        dispatch(removeFromCart({product: product, price: item.price}));
    }

    const confirmCart = () => {
        if (isLoggedIn) {
            window.alert('confirm');
        } else {
            navigate('/login');
        }
    }

    if (cart.products_list.length === 0) {
        return (
            <div className='center-container'>
                <h1>Your cart is empty.</h1>
            </div>
        )
    }
    return (
        <div className='cart-container'>
            <ul>
                {result.map((item, index) => (
                    <li key={index}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {item.name}
                            <div style={{backgroundColor: '#aaa', color: '#fff', borderRadius: '50%', height: 30, width: 30, marginLeft: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {item.q}
                            </div>
                        </div>
                        $ {item.price * item.q}
                        <div style={{display: 'flex'}}>
                            <Button onClick={() => handleAdd(item)} variant='contained'>+</Button>
                            <Button onClick={() => handleRemove(item)} variant='contained' sx={{marginLeft: 2}}>-</Button>
                        </div>
                    </li>
                ))}
            </ul>
            <Typography variant='h4'>Total {Math.ceil(cart.total_price * 100)/100}</Typography>
            <div style={{display: 'flex'}}>
                <Button onClick={resetCart} variant='contained'>Reset</Button>
                <Button onClick={confirmCart} variant='contained' sx={{marginLeft: 5}}>Checkout</Button>
            </div>
        </div>
    )
}
