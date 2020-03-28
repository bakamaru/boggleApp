import axios from 'axios';
import { getToken } from '../utils/token';
class RequestManager {
   
     async getRequest() {
        const request = axios.create();        
        const access_token = await getToken()
      // console.log('token',access_token)
        request.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        request.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
         request.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        return request;
    }

}
export  default  new RequestManager().getRequest;