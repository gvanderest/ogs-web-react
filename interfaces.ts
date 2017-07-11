export interface IEvent {
    adminId: string;
    lobbyTab: string;
    id: string;
    externalId: string;
    description: string;
    payout: number;
    payoutCurrency: string;
    status: string;
    ticketCost: number;
    ticketCostCurrency: string;
    ticketMax: number;
    ticketCount: number;
    context: string;
    closeTimestamp: number;
    fetching?: boolean;
    failed?: boolean;
    ticketMaxPerUser: number;
    ticketMin: number;
}

export interface IEventGamesCollectionConfig {
    name: string;
    salaryCap: number;
    hidden: boolean;
}

export interface IEventGamesCollection {
    id: string;
    context: string;
    exportUrl: string;
    outcomeIds: string[];
    eventPositionIds: string[];
    gameIds: string[];
    closeTimestamp: number;
    createdOutcomes: boolean;
    homeTeamId: string;
    settings: string;
    config: IEventGamesCollectionConfig;
}

export interface IGame {
    id: string;
    homeTeamId?: string;
    homeTeamScore?: number;
    visitingTeamId?: string;
    visitingTeamScore?;
    gameInfo: {};
    externalId: string;
    finalized: boolean;
    gameCodeGlobalId: string;
    gameDay: string;
    gameStatus: string;
    gameTimestamp: number;
    gameUnit: string;
    league: string;
    playoffGameNumber: number;
    playoffInfo: string;
    playoffRound: number;
    timeUnitsRemaining: number;
    provider: string;
    scheduledTimestamp: number;
    season: number;
    settings: string;
    timeRemaining: string;
    week: number;
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
    closeTimestamp: number;
    pointsAvailable: number;
    pointsProjected: number;
    selectionCost: number;
    statsId: string;
    typeName: string;
}

export interface IEventPosition {
    id: string;
    name: string;
}

export interface IPlayer {
    id: string;
    name: string;
    teamId: string;
    externalId: string;
    batterHandedness: string;
    handedness: string;
    injuryStatus: string;
}

export interface ITeam {
    alias: string;
    city?: string;
    conference?: string;
    division: string;
    externalId: string;
    league: string;
    provider: string;
    ranks: string;
    season: number;
    settings: string;
    teamCodeGlobalId: string;
    id: string;
    name: string;
    playerIds?: string[];
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
        fetchTickets: (options: object) => Promise<ITicket[]>;
    };
    events: {
        fetchEvent: (options: object) => Promise<IEvent>;
        fetchEvents: (options: object) => Promise<IEvent[]>;
    };
}

export interface IReduxAction {
    type: string;
    [key: string]: any;
}

export interface IReduxState {
    [key: string]: any;
}

export interface IMinifiedGame {
    i: string;
    hti: number;
    hta: string;
    htn: string;
    hts: number;
    htrj: string;
    vti: number;
    vta: string;
    vtn: string;
    vts: number;
    vtrj: string;
    gi: string;
}

export type IReduxDispatch = (IReduxAction) => any;

export type IReduxGetState = () => IReduxState;

export type IReduxThunk = (dispatch: IReduxDispatch, getState: IReduxGetState) => any;

export interface IMinifiedFantasyEvent {
    i: number;
    adm: number;
    ct: number;
    ctx: string;
    d: string;
    eid: number;
    lt: string;
    p: number;
    pc: string;
    s: string;
    tc: number;
    tcc: string;
    max: number;
    maxu: number;
    co: boolean;
    min: number;
    evgcn: string;
}
