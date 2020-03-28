import { reducer } from '../userStore/userStore';
import { NEW_SCORE, CLEAR_SCORE, UPDATE_SCORE } from '../userStore/constants/constants';

describe(' reducer test', () => {



    it('should handle NEW_SCORE', () => {
        const newScore = {
            type: NEW_SCORE
        };

        expect(reducer({}, newScore)).toEqual({});
    });

    it('should handle UPDATE_SCORE', () => {

        let score = {
            points: 1,
            userName: "binod tamang",
            wordList: "",
            right: 0,
            wrong: 0
        }
        const action = {
            type: UPDATE_SCORE
            , status: score
        };

        expect(reducer({}, action)).toEqual({ status: score });
    });

    it('should handle NEW_SCORE', () => {
        const clearAction = {
            type: CLEAR_SCORE
        };

        expect(reducer({}, clearAction)).toEqual({status:{
            points: 0,
            userName: "",
            wordList: "",
            right: 0,
            wrong: 0
        }});
    });

});
