import React, { Component, PropTypes } from 'react';
const Dialog = require('material-ui/lib/dialog');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const RaisedButton = require('material-ui/lib/raised-button');
const FlatButton = require('material-ui/lib/flat-button');

export default class PickDate extends Component {
    static propTypes = {
      handleChange: PropTypes.func.isRequired,
      show: PropTypes.func.isRequired
    }

    state = {
      date: false
    }

    handleChange() {
      this.props.handleChange(this.state.date);
    }

    handleDateChange(no, date) {
      this.setState({date: date});
    }

    render() {
      const actions = [
        <FlatButton
          label="Ok"
          primary={true}
          keyboardFocused={true}
          onTouchTap={::this.handleChange}
        />,
      ];

      return (
        <div>
          <Dialog
            title="Change Date"
            actions={actions}
            modal={false}
            open={this.props.show}
          >
            Click to select date.
            <DatePicker ref="datepicker" onChange={::this.handleDateChange} hintText="Select Date" />
          </Dialog>
        </div>
      );
    }
  }
