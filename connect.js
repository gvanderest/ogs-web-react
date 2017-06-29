import { bindActionCreators } from 'redux';
import { connect as reactReduxConnect } from 'react-redux';
import actions from './actions';


const connect = reactReduxConnect((store, ownProps) => {
    return {
        store: store,
        ...ownProps
    };
}, (dispatch) => {
    let props = {
        dispatch,
        actions: {}
    };

    Object.keys(actions).forEach((name) => {
        props.actions[name] = bindActionCreators(actions[name], dispatch);
    });

    return props;
});

export default connect;
