import Team from "./Team";

export default class Player {
    id: string;
    name?: string;
    teamId: string;
    externalId: string;
    batterHandedness: string;
    handedness: string;
    injuryStatus: string;
    team?: Team;
    league: string;
}