import axios, { AxiosResponse } from 'axios';
import API from './../api/api';
import request from '../../../configs/request';


class GameService {
   
     async GenerateLetters(boardSize) 
    {
        try
        {
            const res = await (await request()).get(API.GetLetters, {
                params: {
                    boardsize: boardSize
                }
            });
            const response = await res.data;
            return {
                Data: response.data,
                Message: response.msg,
                Code: response.code,
                loading: false
            }
        }
        catch(error)
        {
            console.log(error)
            return {
                Message: error.response.statusText,
                Code: error.response.status,
                Data: null,
                loading: false
            }
        }
    }
    async CheckWord(word) 
    {
        try
        {
            const res = await (await request()).get(API.CheckWord, {
                params: {
                    word: word
                }
            });
            const response = await res.data;
            return response
        }
        catch(error)
        {
            console.log(error)
            return error;
        }
    }
  
  
 
  
}


export default new GameService();