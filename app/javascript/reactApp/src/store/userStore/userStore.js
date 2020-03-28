import { NEW_SCORE, CLEAR_SCORE, UPDATE_SCORE } from './constants/constants';

 const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
  };
  const clearState = () => {
    try {
     
      localStorage.removeItem('state');
    } catch {
      // ignore write errors
    }
  };
  const loadState = () => {      
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return {status: {
            points: 0,
            userName: "",
            wordList: "",
            right: 0,
            wrong: 0
        }};
      }
      return JSON.parse(serializedState);
    } catch (err) {
        return {status: {
            points: 0,
            userName: "",
            wordList: "",
            right: 0,
            wrong: 0
        }};
    }
  }; 
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const actionCreators = {
    newScore: (score) => async (dispatch, getState) => {       
       
        dispatch({ type: 'UPDATE_SCORE', status: score });
      
    },
    updateScore: (score) => async (dispatch, getState) => {       
       
        dispatch({ type: 'UPDATE_SCORE', status: score });
      
    }, 
    clearScore: () => ({ type: 'CLEAR_SCORE' })
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
export const reducer = (state = {
    status: {
        points: 0,
        userName: "",
        wordList: "",
        right: 0,
        wrong: 0
    }

}, incomingAction) => {
  
    const action = incomingAction;    
    switch (action.type) {
        case UPDATE_SCORE:
            saveState({
                status: action.status
            }) 
            return {
                status: action.status
            };
        case NEW_SCORE:
            saveState({
                status: action.status
            }) 
            return {
                status: action.status
            };
        case CLEAR_SCORE:
            clearState();
            state = {
                status: {
                    points: 0,
                    userName: "",
                    wordList: "",
                    right: 0,
                    wrong: 0
                }
            };
            return {
                status: state.status
            };       
    }
    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
   
    return loadState();
};
