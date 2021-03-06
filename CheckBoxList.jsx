/** @jsx React.DOM */
'use strict';
var React = require('react');

module.exports = React.createClass({
	displayName: 'CheckBoxList',

	propTypes: {
		id: React.PropTypes.number.isRequired,
		defaultData: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				label: React.PropTypes.string,
				value: React.PropTypes.string
			})
		),
		onChange: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			data: this.props.defaultData || []
		};
	},

	handleItemChange: function(e) {
		var selectedValues = [],
			newData = [];

		this.state.data.forEach(function(item) {
			if(item.value === e.target.value) {
				item.checked = e.target.checked;
			}
			if(item.checked) {
				selectedValues.push(item.value);
			}
			newData.push(item);
		});

		this.setState({data: newData});

		if(this.props.onChange) {
			this.props.onChange(this.props.id, selectedValues);
		}
	},

	// uncheck all items in the list
	reset: function() {
		var newData = [];
		this.state.data.forEach(function(item) {
			item.checked = false;
			newData.push(item);
		});

		this.setState({data: newData});
	},
	
	checkAll: function() {
		var newData = [];
		this.state.data.forEach(function(item) {
			item.checked = true;
			newData.push(item);
		});

		this.setState({data: newData});
	},
	
	render: function() {
		var options;

		options = this.state.data.map(function(item, index) {
			return (
				<div key={'chk-' + index} className="checkbox">
					<label>
						<input
							type="checkbox"
							value={item.value}
							onChange={this.handleItemChange}
							checked={item.checked ? true : false} /> {item.label}
					</label>
				</div>
			);
		}.bind(this));

		return (
			<div>
				{options}
			</div>
		);
	}
});
