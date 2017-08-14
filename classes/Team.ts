import Game from "./Game";

export default class Team {
    public alias: string;
    public city?: string;
    public conference?: string;
    public division?: string;
    public externalId?: string;
    public league: string;
    public provider?: string;
    public ranks?: {
        [key: string]: {
            alias: string;
            category: string;
            rank: number;
            stat: string;
        };
    };
    public season?: number;
    public settings?: string;
    public teamCodeGlobalId?: string;
    public id: string;
    public name: string;
    public playerIds?: string[];
    public gameId?: string;
    public game?: Game;
    public opponent?: Team;
}
