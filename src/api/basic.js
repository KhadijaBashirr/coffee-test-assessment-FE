import axios from 'axios';

const request = async (method, apiUrl, data = null) => {
  const url = process.env.REACT_APP_API_URL + apiUrl;

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error with ${method.toUpperCase()} request to ${apiUrl}:`, error.message);

    if (error.response) {
      console.error('Response data:', error.response.data);
      throw new Error(`Request failed: ${error.response.data.message || error.response.statusText}`);
    } else {
      throw new Error(`Network error: ${error.message}`);
    }
  }
};

export const getRequest = async (url) => request('get', url);

export const postRequest = async (url, body) => request('post', url, body);

export const putRequest = async (url, body) => request('put', url, body);

export const patchRequest = async (url, body) => request('patch', url, body);

export const deleteRequest = async (url) => request('delete', url);