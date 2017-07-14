import React from 'react';
import PropTypes from 'prop-types';


export default class HighlightChange extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value ||
            nextProps.highlightDuration !== this.props.highlightDuration;
    }
    getClasses() {
        let classes = this.refs.container.className.split(' ');
        return classes;
    }
    addClass(className) {
        let classes = this.getClasses();
        classes.push(className);
        this.refs.container.className = classes.join(' ');
    }
    removeClass(className) {
        let classes = this.getClasses();
        classes.splice(classes.indexOf(className), 1);
        this.refs.container.className = classes.join(' ');
    }
    componentWillReceiveProps(nextProps) {
        let changed = false;
        if (nextProps.value && this.props.value !== nextProps.value) {
            changed = true;
        } else if (this.props.children !== nextProps.children) {
            changed = true;
        }
        if (changed) {
            this.addClass('changed');
            setTimeout(() => {
                this.addClass('changed-active');
                setTimeout(() => {
                    this.removeClass('changed');
                    setTimeout(() => {
                        this.removeClass('changed-active');
                    });
                }, this.props.highlightDuration || 2000);
            })
        }
    }
    render() {
        return (
            <span className="highlight-change" ref="container">{ this.props.children }</span>
        );
    }
}


HighlightChange.propTypes = {
    value: PropTypes.string,
    highlightDuration: PropTypes.number,
    children: PropTypes.mixed
};
