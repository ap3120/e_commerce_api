import React, {useState, useEffect} from 'react';
import {getProductsByCategory} from '../../api/products.js';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {addToCart} from '../../app/cartSlice.js';
import {useSelector, useDispatch} from 'react-redux';

export const Smartphones = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const getProducts = async () => {
        const response = await getProductsByCategory('smartphones');
        setProducts(response);
    }

    useEffect(() => {
        getProducts();
    }, []);
    
    const handleClick = (product) => {
        dispatch(addToCart({product: product, price: product.price}));
    }

    return (
        <div className='products-container'>
        {products.map(product => (
            <div key={product.product_id} className='product-card'>
                <img src={require(`../../images/${product.image_url}`)} />
                <div className='product-card-text'>
                    <Typography variant='h6' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography>
                        Description: {product.description}
                    </Typography>
                    <Typography variant='h5'>
                        {product.price} $
                    </Typography>
                    <Button variant='contained' onClick={() => {handleClick(product)}}>Add to Cart</Button>
                </div>
            </div>
        ))}
        </div>
    )
}
