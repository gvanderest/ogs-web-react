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
