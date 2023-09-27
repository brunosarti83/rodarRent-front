import axios from 'axios';
import { API_BASE_URL } from './routes';


const revalidateCustomerData = async (customerData) => {
    const response = await axios.get(`${API_BASE_URL}/customers/filter?email=${customerData.email}`)
    const newData = response.data.data[0]
    return newData
}

export default revalidateCustomerData;