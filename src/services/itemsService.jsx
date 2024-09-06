import { getRequest } from '../api/basic';

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