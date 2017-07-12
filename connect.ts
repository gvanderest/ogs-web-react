import { connect as reactReduxConnect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "./actions";
import { IReduxStore } from "./interfaces";

interface IProps {
    actions: {
        [key: string]: any;
    };
    dispatch: any;
}

const connect = reactReduxConnect((store: IReduxStore, ownProps: any) => {
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
