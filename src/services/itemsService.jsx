import { getRequest, postRequest } from '../api/basic';

export const getItemsGroupedByCategory = async () => {
  try {
    const response = await getRequest('/api/v1/items/index');
    console.log('respossee', response)
    return response;
  } catch (error) {
    console.error('Error fetching grouped items:', error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  return getRequest(`/api/v1/orders/${orderId}`);
};


export const getCustomerByEmail = async (email) => {
  return getRequest(`/api/v1/customers/populate_with_email?email=${encodeURIComponent(email)}`);
};

export const placeOrder = async (payload) => {
  return postRequest('/api/v1/orders/place_order', payload);
};