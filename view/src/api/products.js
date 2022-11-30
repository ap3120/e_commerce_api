const API_ENDPOINT = 'http://localhost:3000';

export const getProductsByCategory = async (category) => {
    const response = await fetch(`${API_ENDPOINT}/products/${category}`);
    const jsonResponse = await response.json();
    return jsonResponse;
}
