import axios from 'axios';
var jwtDecoder = require('jwt-decode');
const qs = require('qs');
export default class TokenManager{
    async GetToken()  
    {
        try
        {
            const res = await axios.post(`/token/get`, qs.stringify({
                'clientid': 'testclientid',
                'secretkey':'mysecretkey'
            }));;
            const response = await res.data;
            localStorage.setItem('token', response.data);
            return {
                access_token: response.data,
            }
        }
        catch(error) {
            throw error;
        }
    }
}


export async function getToken() {
  
    let token = localStorage.getItem('token')!=null?localStorage.getItem('token'):null;
    //console.log('token',token)
    const tokenManager = new TokenManager();
    if (token == null || token == ''|| token==undefined) {
        //first case
        var a = await tokenManager.GetToken();
        return a.access_token;
    } else {
        let decodedToken = jwtDecoder(token);
        //console.log('de',decodedToken,Date.now(),decodedToken.exp*1000)
        if (Date.now() >= decodedToken.exp*1000 ) {
            var a = await tokenManager.GetToken();
            return a.access_token;
        } else {
            return token;
        }

    }

}
export function setToken(token) {
    return localStorage.setItem('token', token);
}

export function isTokenExpired(token) {

}
