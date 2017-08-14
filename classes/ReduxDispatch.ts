import ReduxAction from "./ReduxAction";
import ReduxThunk from "./ReduxThunk";

type ReduxDispatch = (action: ReduxAction | ReduxThunk<any>) => any;
export default ReduxDispatch;
