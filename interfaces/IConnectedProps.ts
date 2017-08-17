import ReduxActions from "../classes/ReduxActions";
import ReduxStore from "../classes/ReduxStore";

interface IConnectedProps {
    actions: ReduxActions;
    store: ReduxStore;
}
export default IConnectedProps;
