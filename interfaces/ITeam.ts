import IGame from "./IGame";
import ITeamRanks from "./ITeamRanks";

interface ITeam {
    alias: string;
    city?: string;
    conference?: string;
    division?: string;
    externalId?: string;
    league: string;
    provider?: string;
    ranks?: ITeamRanks;
    season?: number;
    settings?: string;
    teamCodeGlobalId?: string;
    id: string;
    name: string;
    playerIds?: string[];
    gameId?: string;
    game?: IGame;
    opponent?: ITeam;
}
export default ITeam;
