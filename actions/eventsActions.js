export const FETCHING_EVENTS = 'FETCHING_EVENTS';
export const FETCHED_EVENTS = 'FETCHED_EVENTS';
export const ERROR_FETCHING_EVENTS = 'ERROR_FETCHING_EVENTS';


export const FETCHING_EVENT = 'FETCHING_EVENT';
export const FETCHED_EVENT = 'FETCHED_EVENT';
export const ERROR_FETCHING_EVENT = 'ERROR_FETCHING_EVENT';


const FAKE_EVENTS = {
    'abc123': { id: 'abc123', description: 'Example Event' }
};


export function fetchEvent(id) {
    return (dispatch) => {
        dispatch({ type: FETCHING_EVENT, id });
        return new Promise((yes, no) => {
            // FIXME Use real logic
            // FIXME Use real logic
            setTimeout(() => {
                let event = FAKE_EVENTS[id];
                if (event) {
                    dispatch({ type: FETCHED_EVENT, id, event});
                    yes(event);
                } else {
                    dispatch({ type: ERROR_FETCHING_EVENT, id, error: 'NOT_FOUND' });
                    no(event);
                }
            }, 1500);
            // FIXME Use real logic
            // FIXME Use real logic
        });
    };
}

export function fetchEvents(options) {
    return (dispatch) => {
        dispatch({ ...options, type: FETCHING_EVENTS });

        return new Promise((yes) => {
            // FIXME Do not leave this fake information in
            // FIXME Do not leave this fake information in
            setTimeout(() => {
                let events = Object.values(FAKE_EVENTS);
                dispatch({ ...options, type: FETCHED_EVENTS, events });
                yes(events);
            }, 1500);
            // FIXME Do not leave this fake information in
            // FIXME Do not leave this fake information in

            // fetch('https://qa7.fantasydraft.com/api/v1/fantasy/events/', {
            //     method: 'GET',
            //     credentials: 'include'
            // }).then((response) => {
            //     response.json().then((rawEvents) => {
            //         let events = rawEvents.objects.map((rawEvent) => {
            //             return {
            //                 id: String(rawEvent.i),
            //                 description: rawEvent.d
            //             };
            //         });
            //         dispatch({ ...options, type: FETCHED_EVENTS, events });
            //         yes(events);
            //     }, () => {
            //         dispatch({ ...options, type: ERROR_FETCHING_EVENTS, response });
            //         no();
            //     });
            // }, (response) => {
            //     dispatch({ ...options, type: ERROR_FETCHING_EVENTS, response });
            //     no();
            // });
        });
    };
}
