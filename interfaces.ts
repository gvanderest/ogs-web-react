export interface IEvent {
    id: string;
    externalId: string;
    description: string;
    payout: number;
    ticketCost: number;
    ticketMax: number;
    ticketCount: number;
    context: string;
    closeTimestamp: number;
    fetching: boolean;
    failed: boolean;
    ticketMaxPerUser: number;
    ticketMin: number;
}

export interface IEventGamesCollection {
    id: string;
    outcomeIds: string[];
    eventPositionIds: string[];
    gameIds: string[];
}

export interface IGame {
    id: string;
    homeTeamId: string;
    visitingTeamId: string;
}

export interface ITicket {
    id: string;
    eventId: string;
    event: IEvent;
}

export interface IOutcome {
    id: string;
    name: string;
    externalId: string;
}

export interface IEventPosition {
    id: string;
    name: string;
}

export interface IPlayer {
    id: string;
    name: string;
    teamId: string;
}

export interface ITeam {
    id: string;
    name: string;
    alias: string;
    gameId?: string;
    playerIds: string[];
}

export interface IReduxStore {
    eventGamesCollections: {
        byId: {
            [key: string]: IEventGamesCollection;
        };
    };
    events: {
        byId: {
            [key: string]: IEvent;
        },
    };
    tickets: {
        byId: {
            [key: string]: ITicket;
        },
    };
    outcomes: {
        byId: {
            [key: string]: IOutcome;
        },
    };
    eventPositions: {
        byId: {
            [key: string]: IEventPosition;
        },
    };
    games: {
        byId: {
            [key: string]: IGame;
        },
    };
    teams: {
        byId: {
            [key: string]: ITeam;
        },
    };
    players: {
        byId: {
            [key: string]: IPlayer;
        },
    };
}

export interface IReduxActions {
    eventGamesCollections: {
        fetchEventGamesCollection: (options: object) => Promise<IEventGamesCollection>;
        fetchFantasyEventGamesCollection: (options: object) => Promise<IEventGamesCollection>;
    };
    tickets: {
        fetchTicket: (options: object) => Promise<ITicket>;
    };
    events: {
        fetchEvent: (options: object) => Promise<IEvent>;
    };
}
