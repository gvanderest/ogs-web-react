import reduceRecord from '../utils/reduceRecord';
import reduceRecords from '../utils/reduceRecords';
import generateReducer from '../utils/generateReducer';
import { FETCHED_TEAM, FETCHED_TEAMS } from '../actions/teams';


function handleFetchedTeams(state, action) {
    let { teams } = action;
    return reduceRecords(state, teams);
}


function handleFetchedTeam(state, action) {
    let { team } = action;
    return reduceRecord(state, team);
}


export default generateReducer({
    byId: {}
}, {
    [FETCHED_TEAM]: handleFetchedTeam,
    [FETCHED_TEAMS]: handleFetchedTeams
});
