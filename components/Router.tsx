import * as React from "react";
import { ConnectedRouter } from "react-router-redux";
import history from "../history";

interface IProps {
    children: any;
}

export default class Router extends React.PureComponent<IProps> {
    public props: IProps = {
        children: null,
    };
    public render() {
        return (
            <ConnectedRouter history={ history }>
                { this.props.children }
            </ConnectedRouter>
        );
    }
}
