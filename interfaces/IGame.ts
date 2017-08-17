import IGameInfo from "./IGameInfo";
import ITeam from "./ITeam";

interface IGame {
    id: string;
    homeTeam?: ITeam;
    homeTeamId?: string;
    homeTeamScore?: number;
    visitingTeam?: ITeam;
    visitingTeamId?: string;
    visitingTeamScore?: number;
    gameInfo?: IGameInfo;
    externalId?: string;
    finalized?: boolean;
    startDay: string;
    status: string;
    startTimestamp: number;
    periodUnit?: string;
    label: string; // like "ABC @ XYZ"
    league: string;
    playoffGameNumber?: number;
    playoffInfo?: string;
    playoffRound?: number;
    timeUnitsRemaining?: number;
    provider?: string;
    scheduledTimestamp?: number;
    season?: number;
    timeRemaining?: string;
    week?: number;
}
export default IGame;
