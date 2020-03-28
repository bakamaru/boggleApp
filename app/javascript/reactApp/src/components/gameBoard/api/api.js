import { ApiEndPoints } from '../../../configs/apiconfig';

let API = {};

export default API = {
    GetLetters: ApiEndPoints.base + "boggle/generate",
    CheckWord: ApiEndPoints.base + "boggle/checkword",
   };

