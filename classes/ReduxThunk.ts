import ReduxDispatch from "./ReduxDispatch";

type ReduxThunk<R> = (dispatch: ReduxDispatch) => R;
export default ReduxThunk;
