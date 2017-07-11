import * as React from "react";

import { Provider } from "react-redux";
import store from "../store";

export default class Application extends React.PureComponent {
    public render() {
        return (
            <Provider store={ store }>
                { this.props.children }
            </Provider>
        );
    }
}
