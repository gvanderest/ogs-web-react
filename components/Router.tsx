import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import history from '../history';


export default class Router extends React.PureComponent {
    render() {
        return (
            <ConnectedRouter history={ history }>
                { this.props.children }
            </ConnectedRouter>
        );
    }
}
