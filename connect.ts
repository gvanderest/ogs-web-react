import actions from "./actions";
import ReduxStore from "./classes/ReduxStore";

import { connect as reactReduxConnect } from "react-redux";
import { bindActionCreators } from "redux";

interface IProps {
    actions: {
        [key: string]: any;
    };
    dispatch: any;
}

const connect = reactReduxConnect((store: ReduxStore, ownProps: any) => {
    return {
        store,
        ...ownProps,
    };
}, (dispatch: any) => {
    const props: IProps = {
        actions: {},
        dispatch,
    };

    Object.keys(actions).forEach((name: string) => {
        props.actions[name] = bindActionCreators(actions[name], dispatch);
    });

    return props;
});

export default connect;
