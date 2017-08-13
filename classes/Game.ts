import GameInfo from "./GameInfo";
import Team from "./Team";

export default class Game {
    public id: string;
    public homeTeam?: Team;
    public homeTeamId?: string;
    public homeTeamScore?: number;
    public visitingTeam?: Team;
    public visitingTeamId?: string;
    public visitingTeamScore?: number;
    public gameInfo?: GameInfo;
    public externalId?: string;
    public finalized: boolean;
    public startDay: string;
    public status: string;
    public startTimestamp: number;
    public periodUnit?: string;
    public label: string; // like "ABC @ XYZ"
    public league: string;
    public playoffGameNumber?: number;
    public playoffInfo?: string;
    public playoffRound?: number;
    public timeUnitsRemaining?: number;
    public provider?: string;
    public scheduledTimestamp?: number;
    public season?: number;
    public timeRemaining?: string;
    public week?: number;
}
