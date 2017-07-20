import React from "react";

export default class Tooltip extends React.Component {
    public static styled: boolean = true;
    constructor() {
        super();
        this.state = {
            visible: false,
        };
        this.element = null;
    }
    public componentDidMount() {
        this.refs.wrapper.onmouseover = this.show.bind(this);
        this.refs.wrapper.onmouseout = this.hide.bind(this);
        this.refs.wrapper.onclick = this.toggle.bind(this);
    }
    public shouldComponentUpdate(nextProps, nextState) {
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
        const tooltipElement: HTMLElement = this.refs.tooltip;
        if (!tooltip) {
            return;
        }
        const wrapperElement: HTMLElement = this.refs.wrapper;

        const wrapperBounding: any = wrapper.getBoundingClientRect();
        const wrapperWidth = wrapperBounding.width;
        const wrapperHeight = wrapperBounding.height;

        const tooltipBounding = tooltip.getBoundingClientRect();
        const tooltipWidth = tooltipBounding.width;
        const tooltipHeight = tooltipBounding.height;

        let [tooltipLeft, tooltipTop] = this.findPos(wrapper);

        const position = this.props.position || "top";

        const offsetLeft: number = 0;
        const offsetTop: number = 0;

        const padding = 10;
        const bigger;
        const smaller;
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

        tooltip.style.left = `${tooltipLeft}px`;
        tooltip.style.top = `${tooltipTop}px`;
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
    protected findPos(obj) {
        const curleft = 0;
        const curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curleft -= obj.scrollLeft;
                curtop += obj.offsetTop;
                curtop -= obj.scrollTop;
                obj = obj.offsetParent;
            } while (obj);
            return [curleft, curtop];
        }
    }
}

Tooltip.propTypes = {
    htmlOrText: (props) => {
        if (!props.text && !props.html) {
            throw new Error("Invalid prop: "message" or "text" prop must be provided");
        }
    },
};
