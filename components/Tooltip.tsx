import * as React from "react";

interface IProps {
    html?: string;
    text?: string;
    position?: string;
}

interface IState {
    visible: boolean;
}

export default class Tooltip extends React.Component<IProps, IState> {
    public static styled: boolean = true;
    public static propTypes = {
        htmlOrText: (props: IProps) => {
            if (!props.text && !props.html) {
                throw new Error(`Invalid prop: "message" or "text" prop must be provided`);
            }
        },
    };
    constructor() {
        super();
        this.state = {
            visible: false,
        };
    }
    public componentDidMount() {
        const wrapper: HTMLElement = this.refs.wrapper as HTMLElement;
        wrapper.onmouseover = this.show.bind(this);
        wrapper.onmouseout = this.hide.bind(this);
        wrapper.onclick = this.toggle.bind(this);
    }
    public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        if (
            nextProps.text !== this.props.text ||
            nextProps.html !== this.props.html ||
            nextProps.position !== this.props.position ||
            nextState.visible !== this.state.visible
        ) {
            return true;
        }
        return false;
    }
    public componentDidUpdate() {
        if (!this.state.visible) {
            return;
        }
        const tooltipElement: HTMLElement = this.refs.tooltip as HTMLElement;
        if (!tooltipElement) {
            return;
        }
        const wrapperElement: HTMLElement = this.refs.wrapper as HTMLElement;

        const wrapperBounding: any = wrapperElement.getBoundingClientRect();
        const wrapperWidth = wrapperBounding.width;
        const wrapperHeight = wrapperBounding.height;

        const tooltipBounding = tooltipElement.getBoundingClientRect();
        const tooltipWidth = tooltipBounding.width;
        const tooltipHeight = tooltipBounding.height;

        let [tooltipLeft, tooltipTop] = this.findPos(wrapperElement);

        const position = this.props.position || "top";

        let offsetLeft: number = 0;
        let offsetTop: number = 0;

        const padding = 10;
        let bigger: number;
        let smaller: number;
        if (position === "top" || position === "bottom") {
            bigger = Math.max(tooltipWidth, wrapperWidth);
            smaller = Math.min(tooltipWidth, wrapperWidth);
            offsetLeft -= ((bigger - smaller) / 2);

            if (position === "top") {
                offsetTop -= (tooltipHeight + padding);
            } else if (position === "bottom") {
                offsetTop += (wrapperHeight + padding);
            }
        } else if (position === "left" || position === "right") {
            if (position === "left") {
                offsetLeft -= tooltipWidth + 10;
            } else if (position === "right") {
                offsetLeft += wrapperWidth + 10;
            }
            bigger = Math.max(tooltipHeight, wrapperHeight);
            smaller = Math.min(tooltipHeight, wrapperHeight);
            offsetTop -= ((bigger - smaller) / 2);
        }

        // Ensure tooltip fits in the window
        // let screenWidth = document.body.clientWidth;
        // let additionalOffscreenLeft = -1 * Math.floor(Math.min(0, screenWidth -
        //     (wrapperLeft + offsetLeft + tooltipWidth)));
        // if (additionalOffscreenLeft > 0) {
        //     offsetLeft -= additionalOffscreenLeft + 10;
        // }

        // Apply offsets and position tooltip
        tooltipLeft += offsetLeft;
        tooltipTop += offsetTop;

        tooltipElement.style.left = `${tooltipLeft}px`;
        tooltipElement.style.top = `${tooltipTop}px`;
    }
    public render() {
        const position = this.props.position || "top";
        return (
            <span className="tooltip-wrapper" ref="wrapper">
                { this.state.visible ? (
                    <span className={ "tooltip-container " + ("on-" + position) } ref="tooltip">
                        { this.props.html ? (
                            <span
                                className="tooltip-message"
                                dangerouslySetInnerHTML={ { __html: this.props.html } }
                            ></span>
                        ) : (
                            <span className="tooltip-message">{ this.props.text }</span>
                        ) }
                    </span>
                ) : null }
                { this.props.children }
            </span>
        );
    }
    protected show() {
        this.setState({ visible: true });
    }
    protected hide() {
        this.setState({ visible: false });
    }
    protected toggle() {
        this.setState({ visible: !this.state.visible });
    }
    protected findPos(obj: HTMLElement) {
        let curleft: number = 0;
        let curtop: number = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curleft -= obj.scrollLeft;
                curtop += obj.offsetTop;
                curtop -= obj.scrollTop;
                obj = obj.offsetParent as HTMLElement;
            } while (obj);
            return [curleft, curtop];
        }
    }
}
