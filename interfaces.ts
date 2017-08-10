export interface IEvent {
    adminId: string;
    lobbyTabs: string[];
    denyGroups: string[];
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
    id?: string;
    name: string;
    salaryCap: number;
    hidden?: boolean;
    addOutcomesAfterOpen: boolean;
    hideSelections: boolean;
}

export interface IEventGamesCollectionScoring {
    pitcher_no_hitter?: number;
    batter_hit_by_pitch?: number;
    batter_home_runs?: number;
    batter_triples?: number;
    pitcher_innings_pitched?: number;
    pitcher_hit_batter?: number;
    batter_singles?: number;
    pitcher_walks_against?: number;
    batter_stolen_bases?: number;
    batter_runs_scored?: number;
    pitcher_wins?: number;
    pitcher_hits_against?: number;
    pitcher_earned_runs_allowed?: number;
    pitcher_complete_game_shutout?: number;
    pitcher_strike_outs?: number;
    batter_rbi?: number;
    batter_walks?: number;
    batter_doubles?: number;
    batter_caught_stealing?: number;
    pitcher_complete_game?: number;
}

export interface IEventGamesCollection {
    checkEventTimestamp?: number;
    closeEventTimestamp: number;
    createOutcomesTimestamp?: number;
    disableRecurrences?: boolean;
    finalizeEventTimestamp?: number;
    modifiedTimestamp?: number;
    openEventTimestamp?: number;
    resourceUri?: string;
    addOutcomesAfterOpen?: boolean;
    id: string;
    context: string;
    hideSelections: boolean;
    lineupsUrl: string;
    name?: string;
    prefix?: string;
    suffix?: string;
    scoring?: IEventGamesCollectionScoring;
    exportUrl: string;
    outcomeIds: string[];
    eventPositionIds: string[];
    createdGml?: boolean;
    gameIds: string[];
    checkTimestamp?: number;
    createdTimestamp?: number;
    createdOutcomes: boolean;
    config: IEventGamesCollectionConfig;
}

export interface IEventGamesCollectionConfigSettings {
    scoring: any;
    hide_selections: boolean;
    add_outcomes_after_open: boolean;
    lineups_url: string;
    export_url: string;
    task_ids: any;
}

// FIXME
export interface IGameInfo {
    [key: string]: any;
}

export interface IGame {
    id: string;
    homeTeam?: ITeam;
    homeTeamId?: string;
    homeTeamScore?: number;
    visitingTeam?: ITeam;
    visitingTeamId?: string;
    visitingTeamScore?: number;
    gameInfo?: IGameInfo;
    externalId?: string;
    finalized: boolean;
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
    availablePoints: number;
    plannedPoints: number;
    selectionCost: number;
    statsId: string;
    typeName: string;
    player?: IPlayer;
    injuryStatus?: string; // FIXME Move this to IPlayer exclusively
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
    team?: ITeam;
}

export interface ITeam {
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
    game?: IGame;
    opponent?: ITeam;
}

export interface IReduxStore {
    auth: {
        customerId: string;
    };
    customers: {
        byId: {
            [key: string]: ICustomer;
        };
    };
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
    transactions: {
        byId: {
            [key: string]: ITransaction;
        };
    };
}

export interface IReduxActions {
    auth: {
        login: (options: object) => Promise<ICustomer>;
    };
    eventGamesCollections: {
        fetchEventGamesCollection: (options: object) => Promise<IEventGamesCollection>;
        fetchFantasyEventGamesCollection: (options: object) => Promise<IEventGamesCollection>;
    };
    tickets: {
        fetchTicket: (options: object) => Promise<ITicket>;
        fetchTickets: (options?: object) => Promise<ITicket[]>;
    };
    events: {
        fetchEvent: (options: object) => Promise<IEvent>;
        fetchEvents: (options: object) => Promise<IEvent[]>;
    };
    routing: {
        push: (url: string) => void;
    };
    transactions: {
        fetchTransactions: (options?: object) => Promise<ITransaction[]>;
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
    htrj: object;
    vtrj: object;
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

export type IReduxDispatch = (action: IReduxAction | IReduxThunk) => any;

export type IReduxGetState = () => IReduxStore;

export type IReduxThunk = (dispatch: IReduxDispatch, getState: IReduxGetState) => any;

export interface IMinifiedFantasyEvent {
    i: number;
    adm: number;
    ct: number;
    ctx: string;
    d: string;
    eid: number;
    lt: string | string[];
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
    rg: any;
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

export interface IEventGamesCollectionSettings {
    add_outcomes_after_open: boolean;
    hide_selections: boolean;
    export_url: string;
    lineups_url: string;
    scoring: IEventGamesCollectionScoring;
}

export interface ICustomer {
    address1: string;
    address2: string;
    phone: string;
    id: string;
    user: IUser;
    experienceGroups: string[];
    account?: {
        balance: number;
        accounts: {
            [key: string]: number;
        };
        accountsMap: {
            [key: string]: string;
        }
    };
}

export interface IUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface IRawEvent {
    id: number;
    description: string;
}

export interface IRawTicket {
    id: number;
    event_id: number;
    event?: IRawEvent;
}

export interface IRawTransaction {
    amount: number;
    closed: boolean;
    created_ts: string;
    currency: string;
    description: string;
    external_id: string;
    id: number;
    name: string;
    paid: boolean;
}

export interface ITransaction {
    amount: number;
    closed: boolean;
    createdTimestamp: number;
    currency: string;
    description: string;
    externalId: string;
    id: string;
    name: string;
    paid: boolean;
}

export interface IRawSystemMessage {
    end_ts: string;
    id: number;
    message: string;
    settings: {
        [key: string]: string;
    };
    start_ts: string;
}

export interface ISystemMessage {
    endTimestamp: number;
    id: string;
    message: string;
    settings: {
        [key: string]: string;
    };
    startTimestamp: number;
}

export interface ITemplateTicket {
    id: string;
    externalId: string;
    closeTimestamp: number;
    selections?: ISelection[];
    selectionIds: string[];
    context: string;
    modifiedTimestamp: number;
}

export interface ISelection {
    id?: string;
    outcome?: IOutcome;
    outcomeId: string;
    eventPosition?: IEventPosition;
    eventPositionId: string;
    earnedPoints: number;
}
