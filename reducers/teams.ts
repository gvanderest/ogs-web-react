import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import { FETCHED_TEAM, FETCHED_TEAMS } from "../actions/teams";

import { IReduxAction, IReduxState, ITeam } from "../interfaces";

const initialState: ITeamsState = {
    byId: {},
};

interface ITeamsState {
    byId: {
        [key: string]: ITeam;
    };
}

interface IHandleFetchedTeamsAction {
    type: string;
    teams: ITeam[];
}

function handleFetchedTeams(state: ITeamsState, action: IHandleFetchedTeamsAction) {
    const teams: ITeam[] = action.teams;
    return reduceRecords(state, teams);
}

interface IHandleFetchedTeamAction {
    type: string;
    team: ITeam;
}

function handleFetchedTeam(state: ITeamsState, action: IHandleFetchedTeamAction) {
    const { team } = action;
    return reduceRecord(state, team);
}

export default generateReducer(initialState, {
    [FETCHED_TEAM]: handleFetchedTeam,
    [FETCHED_TEAMS]: handleFetchedTeams,
});
