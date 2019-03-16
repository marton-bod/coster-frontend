import React, {Component} from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class MonthPicker extends Component  {
    render() {
        let monthList = this.props.monthList.map(m => {
            return (<MenuItem value={m}>{m}</MenuItem>)
        });
        return (
            <FormControl className="time-window-dropdown">
                <InputLabel htmlFor="time-window">Selected month</InputLabel>
                <Select
                    onChange={this.props.onChange}
                    inputProps={{
                        name: 'date-range',
                        id: 'time-window',
                    }}
                    value={this.props.selectedMonth}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {monthList}
                </Select>
            </FormControl>
        )
    }
}

export default MonthPicker