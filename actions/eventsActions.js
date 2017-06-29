export const FETCHING_EVENT = 'FETCHING_EVENT';
export const FETCHED_EVENT = 'FETCHED_EVENT';
export const ERROR_FETCHING_EVENT = 'ERROR_FETCHING_EVENT';

export function fetchEvent(options) {
    return (dispatch, getState) => {
        let promise = new Promise((yes, no) => {
            let { id } = options;
            let state = getState();
            let existing = state.events.byId[id];
            if (existing && !existing.fetching) {
                return yes(existing);
            }

            dispatch({ type: FETCHING_EVENT, options });

            fetch(`https://qa7.fantasydraft.com/api/v1/events/${ id }/`, {
                method: 'GET',
                credentials: 'include'
            }).then((response) => {
                response.json().then((rawEvent) => {
                    let event = {
                        id: String(rawEvent.id),
                        description: rawEvent.description,
                        ticketCount: rawEvent.ticket_count,
                        ticketMax: rawEvent.ticket_max,
                        ticketMin: rawEvent.ticket_min,
                        externalId: String(rawEvent.external_id)
                    };
                    return yes(event);
                }, () => {
                    return no([{ type: 'JSON_ERROR' }]);
                });
            }, () => {
                return no([{ type: 'NOT_FOUND' }]);
            });
        });

        promise.then((event) => {
            dispatch({ type: FETCHED_EVENT, options, event });
        }, (errors) => {
            dispatch({ type: ERROR_FETCHING_EVENT, options, errors });
        });

        return promise;
    };
}


export const FETCHING_EVENTS = 'FETCHING_EVENTS';
export const FETCHED_EVENTS = 'FETCHED_EVENTS';
export const ERROR_FETCHING_EVENTS = 'ERROR_FETCHING_EVENTS';

export function fetchEvents(options) {
    return (dispatch) => {
        dispatch({ type: FETCHING_EVENTS, options });

        let promise = new Promise((yes, no) => {
            fetch('https://qa7.fantasydraft.com/api/v1/fantasy/events/', {
                method: 'GET',
                credentials: 'include'
            }).then((response) => {
                response.json().then((rawEvents) => {
                    let events = rawEvents.objects.map((rawEvent) => {
                        return {
                            id: String(rawEvent.i),
                            context: rawEvent.ctx,
                            closeTimestamp: rawEvent.ct,
                            description: rawEvent.d,
                            ticketMax: rawEvent.max,
                            ticketCount: rawEvent.tc,
                            externalId: String(rawEvent.eid),
                            ticketMaxPerUser: rawEvent.maxu,
                            ticketMin: rawEvent.min,
                            payoutCurrency: rawEvent.pc,
                            status: rawEvent.s,
                            ticketCost: rawEvent.tc,
                            ticketCostCurrency: rawEvent.tcc,
                            lobbyTab: rawEvent.lt,
                            adminId: rawEvent.adm
                        };
                    });
                    yes(events);
                }, () => {
                    return no([{ type: 'JSON_ERROR' }]);
                });
            }, () => {
                no([{ type: 'NOT_FOUND' }]);
            });
        });

        promise.then((events) => {
            dispatch({ type: FETCHED_EVENTS, options, events });
        }, (errors) => {
            dispatch({ type: ERROR_FETCHING_EVENTS, options, errors });
        });

        return promise;
    };
}
