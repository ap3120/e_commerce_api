import {useSelector} from 'react-redux';
import '../App.css';
import {useState, useEffect} from 'react';
import {getOrdersByUserId, getProductsByOrderId} from '../api/orders.js';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Orders = () => {
    const [expanded, setExpanded] = useState(false);
    const [orders, setOrders] = useState([]);
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const user = useSelector(state => state.authentication.user);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getOrders = async (id) => {
        const response = await getOrdersByUserId(id);
        response.forEach(async (order, i) => {
            const products = await getProductsByOrderId(order.order_id);
            setOrders(oldArray => [...oldArray, {
                order_id: order.order_id,
                date: order.date,
                total_price: order.total_price,
                user_id: order.user_id,
                products: products}
            ])
        })
    }
    useEffect(() => {
        if (isLoggedIn) {
            getOrders(user.id);
        }
    }, []);

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
            {orders.map((order, index) => (
                <Accordion key={index} sx={{width: '90%'}} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}bh-content`}
                            id={`panel${index}bh-header`}
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Order {order.order_id}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {JSON.stringify(order.date).slice(1,11)}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {order.products.map((item, i) => (
                            <div key={i} style={{marginBottom: 20}}>{item.name}</div>
                        ))}
                        <Typography variant='h5'>Total: {order.total_price} $</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
    
}
