
import * as ScoreStatus from './userStore/userStore';
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.

export const reducers = {
    scoreStatus: ScoreStatus.reducer
};


export let AppThunkAction = {
    dispatch: function (action) { action() },
    getState: function () { return reducers; }
};
