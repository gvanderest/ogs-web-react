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
