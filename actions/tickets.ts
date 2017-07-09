export const FETCHING_TICKET = 'FETCHING_TICKET';
export const FETCHED_TICKET = 'FETCHED_TICKET';
export const ERROR_FETCHING_TICKET = 'ERROR_FETCHING_TICKET';

export const FETCHING_TICKETS = 'FETCHING_TICKETS';
export const FETCHED_TICKETS = 'FETCHED_TICKETS';
export const ERROR_FETCHING_TICKETS = 'ERROR_FETCHING_TICKETS';


export function fetchTickets(options) {
    return (dispatch) => {
        let promise = new Promise((yes, no) => {

            fetch('https://qa7.fantasydraft.com/api/v1/tickets/', {
                credentials: 'include',
                method: 'GET',
                mode: 'cors'
            }).then((response) => {
                response.json().then(({ objects }) => {
                    return yes(objects);
                }, () => {
                    return no([{ type: 'JSON_ERROR' }]);
                });
            }, () => {
                return no([{ type: 'NOT_FOUND' }]);
            });
        });

        dispatch({ type: FETCHING_TICKETS, options });
        promise.then((tickets) => {
            dispatch({ type: FETCHED_TICKETS, options, tickets });
        }, (errors) => {
            dispatch({ type: ERROR_FETCHING_TICKETS, options, errors });
        });

        return promise;
    };
}


export function fetchTicket(options) {
    return (dispatch) => {
        let promise = new Promise((yes, no) => {
            let { id } = options;
            fetch(`https://qa7.fantasydraft.com/api/v1/tickets/${ id }/`, {
                credentials: 'include',
                method: 'GET',
                mode: 'cors'
            }).then((response) => {
                response.json().then((raw) => {
                    // FIXME Parse this information into normalized format
                    let ticket = { ...raw };
                    ticket.id = String(ticket.id);
                    ticket.eventId = String(ticket.event.id);
                    console.log('HYDRATED TICKET', ticket);
                    return yes(ticket);
                }, () => {
                    return no([{ type: 'JSON_ERROR' }]);
                });
            }, () => {
                return no([{ type: 'NOT_FOUND' }]);
            });
        });

        dispatch({ type: FETCHING_TICKET, options });
        promise.then((ticket) => {
            dispatch({ type: FETCHED_TICKET, options, ticket });
        }, (errors) => {
            dispatch({ type: ERROR_FETCHING_TICKET, options, errors });
        });

        return promise;
    };
}
