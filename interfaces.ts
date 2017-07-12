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
    id: string;
    name: string;
    salaryCap: number;
    hidden: boolean;
    settings: string;
}

export interface IEventGamesCollection {
    id: string;
    context: string;
    exportUrl: string;
    outcomeIds?: string[];
    eventPositionIds?: string[];
    createdGml: boolean;
    gameIds: string[];
    closeTimestamp: number;
    checkTimestamp: number;
    createdTimestamp: number;
    createdOutcomes: boolean;
    config: IEventGamesCollectionConfig;
    hidden: boolean;
}

export interface IGame {
    id: string;
    homeTeamId: string;
    homeTeamScore: number;
    visitingTeamId: string;
    visitingTeamScore: number;
    gameInfo: any; // FIXME
    externalId: string;
    finalized: boolean;
    gameCodeGlobalId?: string;
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
    outcomeTypeNames: string[];
    sortOrder: number;
    status: string;
}

export interface IPlayer {
    id: string;
    name?: string;
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
    division?: string;
    externalId?: string;
    league: string;
    provider: string;
    ranks: object;
    season: number;
    settings: string;
    teamCodeGlobalId: string;
    id: string;
    name: string;
    playerIds?: string[];
    gameId?: string;
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

export interface IMinifiedPlayer {
    ei: number;
    h: string;
    is: boolean;
    bh: string;
    t: number;
    inj: string;
}

export interface IMinifiedGame {
    f: boolean;
    i: string;
    hti: number;
    hta: string;
    htn: string;
    hts: number;
    vti: number;
    vta: string;
    vtn: string;
    vts: number;
    gu: string;
    gt: string;
    gs: string;
    gi: string;
    wdh: boolean;
    wc: string;
    s: string;
    wj: string;
    ws: string;
    d: string;
    l: string;
    p: {
        [key: string]: IMinifiedPlayer;
    };
    htstd: string;
    htrj: string;
    vtrj: string;
}

export interface IMinifiedOutcome {
    c: string;
    ei: string;
    i: number;
    pp: number;
    n: string;
    si: string;
    pa: number;
    t: string;
    sc: number;
}

export type IReduxDispatch = (action: IReduxAction) => any;

export type IReduxGetState = () => IReduxStore;

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
export interface IMinifiedEventPosition {
    i: number;
    s: string;
    o: string[];
    n: string;
    so: number;
}

export interface IMinifiedEventGamesCollection {
    c: string;
    cxt: string;
    i: number;
    cfg: string;
    evgsj: string;
    g: {
        [key: string]: IMinifiedGame;
    };
    o: {
        [key: string]: IMinifiedOutcome;
    };
    sc: number;
    exu: string;
    evp: {
        [key: string]: IMinifiedEventPosition;
    };
    co: boolean;
    evt: IMinifiedFantasyEvent;
}
