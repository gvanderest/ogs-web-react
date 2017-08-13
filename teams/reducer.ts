import Team from "../classes/Team";
import generateReducer from "../utils/generateReducer";
import reduceRecord from "../utils/reduceRecord";
import reduceRecords from "../utils/reduceRecords";

import { FETCHED_TEAM } from "./actions";
import { FETCHED_TEAMS } from "./actions";

const initialState: ITeamsState = {
    byId: {},
};

interface ITeamsState {
    byId: {
        [key: string]: Team;
    };
}

interface IHandleFetchedTeamsAction {
    type: string;
    teams: Team[];
}

function handleFetchedTeams(state: ITeamsState, action: IHandleFetchedTeamsAction) {
    const teams: Team[] = action.teams;
    return reduceRecords(state, teams);
}

interface IHandleFetchedTeamAction {
    type: string;
    team: Team;
}

function handleFetchedTeam(state: ITeamsState, action: IHandleFetchedTeamAction) {
    const { team } = action;
    return reduceRecord(state, team);
}

export default generateReducer(initialState, {
    [FETCHED_TEAM]: handleFetchedTeam,
    [FETCHED_TEAMS]: handleFetchedTeams,
});
