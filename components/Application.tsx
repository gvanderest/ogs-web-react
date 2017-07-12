import * as React from "react";

import { Provider } from "react-redux";
import store from "../store";

interface IProps {
    children: any;
}

export default class Application extends React.PureComponent<IProps> {
    public render() {
        return (
            <Provider store={ store }>
                { this.props.children }
            </Provider>
        );
    }
}
