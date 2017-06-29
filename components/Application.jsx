import React from 'react';
import store from '../store';
import { Provider } from 'react-redux';


export default class Application extends React.PureComponent {
    render() {
        return (
            <Provider store={ store }>
                { this.props.children }
            </Provider>
        );
    }
}
