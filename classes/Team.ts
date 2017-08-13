import Game from "./Game";

export default class Team {
    alias: string;
    city?: string;
    conference?: string;
    division?: string;
    externalId?: string;
    league: string;
    provider?: string;
    ranks: object;
    season?: number;
    settings?: string;
    teamCodeGlobalId?: string;
    id: string;
    name: string;
    playerIds?: string[];
    gameId?: string;
    game?: Game;
    opponent?: Team;
}