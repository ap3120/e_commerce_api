const API_ENDPOINT = 'http://localhost:3000';

export const getOrdersByUserId = async (id) => {
    const response = await fetch(`/orders/${id}`);
    const jsonResponse = await response.json();
    return jsonResponse;
}

export const createOrder = async (date, total_price, user_id, products) => {
    const response = await fetch(`/orders`, {
        method: 'POST',
        body: JSON.stringify({
            date: date,
            total_price: total_price,
            user_id: user_id,
            products: products
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}

export const getProductsByOrderId = async (id) => {
    const response = await fetch(`/orders/orders_products/${id}`);
    const jsonResponse = await response.json();
    return jsonResponse;
}
