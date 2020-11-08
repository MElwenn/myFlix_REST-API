import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { setMovieFilter } from '../../actions/actions';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

function movieFilterDropdown(props) {
    const { movieFilter } = props;
    const dropdownTitle = 'Filter by';

    if (movieFilter && movieFilter !== '') {
        dropdownTitle = `Filter by ${movieFilter}`;
    }

    return (
        <ButtonToolbar>
            <DropdownButton
                className="container-box-text"
                variant="outline-secondary"
                title="dropdownTitle"
                onSelect={
                    (eventKey) => {
                        props.setMovieFilter(eventKey);
                    }
                }
            >
                <DropdownItem eventKey=''>Movie Title</DropdownItem>
                <Dropdown.Divider />
                <DropdownItem eventKey=''>Genre</DropdownItem>
            </DropdownButton>
        </ButtonToolbar>

    );

}

export default connect(null, { setMovieFilter })(movieFilterDropdown);
