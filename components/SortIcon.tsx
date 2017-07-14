import React from 'react';
import PropTypes from 'prop-types';


export default class SortIcon extends React.PureComponent {
    render() {
        let { sortField, sortReverse, field } = this.props;
        if (sortField !== field) {
            return <i className="fa fa-sort"></i>;
        }
        if (sortReverse) {
            return <i className="fa fa-sort-desc"></i>;
        }
        return <i className="fa fa-sort-asc"></i>;
    }
}

SortIcon.propTypes = {
    sortField: PropTypes.string.isRequired,
    sortReverse: PropTypes.bool.isRequired,
    field: PropTypes.string.isRequired
};
