import ITeam from "./ITeam";

interface IPlayer {
    id: string;
    name?: string;
    teamId: string;
    externalId: string;
    batterHandedness: string;
    handedness: string;
    injuryStatus: string;
    team?: ITeam;
    league: string;
}
export default IPlayer;
