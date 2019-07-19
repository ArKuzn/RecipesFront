import React from 'react';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';

export default class EditButton extends React.Component {
  showPage = () => {
    if (this.props.active) {
      return (
        <button type="button" onClick={() => { this.props.onEdit(true); }}>Edit</button>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.showPage()}
      </div>
    );
  }
}
EditButton.propTypes = {
  onEdit: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};
