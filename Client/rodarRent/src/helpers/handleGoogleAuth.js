import axios from 'axios'
import routesHelper from './routes' 

export const handleGoogleAuth = async () => {
    const response = await axios.get(`${routesHelper.baseBackUrl}/google/callback`)
    console.log(response);  
}

