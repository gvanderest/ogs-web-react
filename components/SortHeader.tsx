import React from 'react';
import PropTypes from 'prop-types';


export default class SortHeader extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.field !== this.props.field ||
            nextProps.sortField !== this.props.sortField ||
            nextProps.sortReverse !== this.props.sortReverse ||
            nextProps.className !== this.props.className ||
            nextProps.label !== this.props.label;
    }
    render() {
        let iconClasses = ['fa'];
        if (this.props.sortField === this.props.field) {
            iconClasses.push(this.props.sortReverse ? 'fa-sort-desc' : 'fa-sort-asc');
        } else {
            iconClasses.push('fa-sort');
        }
        return (
            <th
                className={ this.props.className }
                onClick={ this.props.onSort.bind(this, this.props.field) }
                >
                { this.props.label }
                { ' ' }
                <i className={ iconClasses.join(' ') } />
            </th>
        );
    }

}


SortHeader.propTypes = {
    sortField: PropTypes.string,
    field: PropTypes.string,
    sortReverse: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    onSort: PropTypes.func
};
