import generateReducer from '../utils/generateReducer';
import { FETCHED_TEAM } from '../actions/teams';


function handleFetchedTeam(state, action) {
    let { team } = action;

    return {
        ...state,
        byId: {
            ...state.byId,
            [team.id]: {
                ...state.byId[team.id],
                ...team
            }
        }
    };
}


export default generateReducer({
    byId: {}
}, {
    [FETCHED_TEAM]: handleFetchedTeam
});
