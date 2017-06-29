export const FETCHING_EVENT_GAMES_COLLECTION = 'FETCHING_EVENT_GAMES_COLLECTION';
export const FETCHED_EVENT_GAMES_COLLECTION = 'FETCHED_EVENT_GAMES_COLLECTION';
export const ERROR_FETCHING_EVENT_GAMES_COLLECTION = 'ERROR_FETCHING_EVENT_GAMES_COLLECTION';


export function fetchEventGamesCollection(options) {
    return (dispatch, getState) => {
        let promise = new Promise((yes, no) => {
            let state = getState();
            let { id } = options;
            let existing = state.eventGamesCollections.byId[id];
            if (existing && !existing.fetching) {
                return yes(existing);
            }

            dispatch({ type: FETCHING_EVENT_GAMES_COLLECTION, options });

            fetch(`https://qa7.fantasydraft.com/api/v1/eventgames/${ id }/`, {
                method: 'GET'
                // credentials: 'include'
            }).then((response) => {
                response.json().then((raw) => {
                    let eventGames = {
                        id: String(raw.id),
                        context: raw.context,
                        settings: JSON.parse(raw.settings_json),
                        config: {
                            id: String(raw.config.id),
                            hidden: raw.config.hidden,
                            name: raw.config.name,
                            salaryCap: raw.config.salary_cap,
                            settings: JSON.parse(raw.config.settings_json)
                        }
                    };
                    return yes(eventGames);
                }, () => {
                    return no({ type: 'JSON_ERROR' });
                });
            }, () => {
                return no({ type: 'NOT_FOUND' });
            });
        });

        promise.then((eventGamesCollection) => {
            dispatch({ type: FETCHED_EVENT_GAMES_COLLECTION, options, eventGamesCollection });
        }, (error) => {
            dispatch({ type: ERROR_FETCHING_EVENT_GAMES_COLLECTION, options, error });
        });

        return promise;
    };
}
