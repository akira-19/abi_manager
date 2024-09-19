import axios from 'axios';

const baseURL = 'http://localhost:8787/';

export const getData = async (path: string) => {
  try {
    const response = await axios.get(baseURL + path);
    return response.data;
  } catch (error) {
    console.error('GET Error:', error);
  }
};

export const postData = async (path: string, data: any) => {
  try {
    const response = await axios.post(baseURL + path, data);
    return response.data;
  } catch (error) {
    console.error('POST Error:', error);
  }
};

export const putData = async (path: string, data: any) => {
  try {
    const response = await axios.put(baseURL + path, data);
    return response.data;
  } catch (error) {
    console.error('POST Error:', error);
  }
};
