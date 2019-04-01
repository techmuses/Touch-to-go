import React from "react";
import ReactDOM from "react-dom";

import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import {ReactComponent as Logo} from "./icon.svg"


class DatePick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      focused: false,
      string: "test"
    };
  }

  render() {
    return (
      <div style={{  }}>
        <SingleDatePicker
        customInputIcon= {Logo}
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          numberOfMonths={1}
          displayFormat="YYYY-MM-DD"
          readOnly
        />
        Selected date is {this.state.date.format("YYYY-MM-DD")}
        
      </div>
    );
  }
}

export default DatePick
