import React from 'react';
import PropTypes from 'prop-types';


export default class Tooltip extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
        this.element = null;
    }
    shouldComponentUpdate(nextProps, nextState) {
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
    show() {
        this.setState({ visible: true });
    }
    hide() {
        this.setState({ visible: false });
    }
    toggle() {
        this.setState({ visible: !this.state.visible });
    }
    componentDidMount() {
        this.refs.wrapper.onmouseover = this.show.bind(this);
        this.refs.wrapper.onmouseout = this.hide.bind(this);
        this.refs.wrapper.onclick = this.toggle.bind(this);
    }
    findPos(obj) {
        let curleft = 0, curtop = 0;
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
    componentDidUpdate() {
        if (!this.state.visible) {
            return;
        }
        let tooltip = this.refs.tooltip;
        if (!tooltip) {
            return;
        }
        let wrapper = this.refs.wrapper;

        let wrapperBounding = wrapper.getBoundingClientRect();
        let wrapperWidth = wrapperBounding.width;
        let wrapperHeight = wrapperBounding.height;

        let tooltipBounding = tooltip.getBoundingClientRect();
        let tooltipWidth = tooltipBounding.width;
        let tooltipHeight = tooltipBounding.height;

        let [tooltipLeft, tooltipTop] = this.findPos(wrapper);

        let position = this.props.position || 'top';

        let offsetLeft = 0, offsetTop = 0;

        let padding = 10;
        let bigger, smaller;
        if (position === 'top' || position === 'bottom') {
            bigger = Math.max(tooltipWidth, wrapperWidth);
            smaller = Math.min(tooltipWidth, wrapperWidth);
            offsetLeft -= ((bigger - smaller) / 2);

            if (position === 'top') {
                offsetTop -= (tooltipHeight + padding);
            } else if (position === 'bottom') {
                offsetTop += (wrapperHeight + padding);
            }
        } else if (position === 'left' || position === 'right') {
            if (position === 'left') {
                offsetLeft -= tooltipWidth + 10;
            } else if (position === 'right') {
                offsetLeft += wrapperWidth + 10;
            }
            bigger = Math.max(tooltipHeight, wrapperHeight);
            smaller = Math.min(tooltipHeight, wrapperHeight);
            offsetTop -= ((bigger - smaller) / 2);
        }

        // Ensure tooltip fits in the window
        // let screenWidth = document.body.clientWidth;
        // let additionalOffscreenLeft = -1 * Math.floor(Math.min(0, screenWidth - (wrapperLeft + offsetLeft + tooltipWidth)));
        // if (additionalOffscreenLeft > 0) {
        //     offsetLeft -= additionalOffscreenLeft + 10;
        // }

        // Apply offsets and position tooltip
        tooltipLeft += offsetLeft;
        tooltipTop += offsetTop;

        tooltip.style.left = `${tooltipLeft}px`
        tooltip.style.top = `${tooltipTop}px`
    }
    render() {
        let position = this.props.position || 'top';
        return (
            <span className="tooltip-wrapper" ref="wrapper">
                { this.state.visible ? (
                    <span className={ 'tooltip-container ' + ('on-' + position) } ref="tooltip">
                        { this.props.html ? (
                            <span className="tooltip-message" dangerouslySetInnerHTML={ { __html: this.props.html } }></span>
                        ) : (
                            <span className="tooltip-message">{ this.props.text }</span>
                        ) }
                    </span>
                ) : null }
                { this.props.children }
            </span>
        );
    }
}

Tooltip.propTypes = {
    html: PropTypes.string,
    text: PropTypes.string,
    htmlOrText: (props) => {
        if (!props.text && !props.html) {
            throw new Error('Invalid prop: "message" or "text" prop must be provided');
        }
    },

    position: PropTypes.string,

    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ])
};
