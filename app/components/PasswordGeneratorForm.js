import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PasswordGenerator from '../utils/PasswordGenerator';
import ClipboardManager from './ClipboardManager';
import Lock from 'material-ui/svg-icons/action/lock';

class PasswordGeneratorForm extends React.Component {
	constructor() {
		super();

		this.state = {
			text: ""
		}
	}

	onChange = e => this.setState({ text: e.target.value });
	onSubmit = async e => {
		e.preventDefault();

		const securePassword = await PasswordGenerator.hash(this.state.text);
		this.setState({ securePassword });
	};

	render() {
		return (
			<section className="pg-component">
				<form className="pg-form" onSubmit={ this.onSubmit }>
					<legend>Simple Password Assistant</legend>
					<TextField
						fullWidth={ true }
						hintText="Enter Simple Password"
						value={ this.state.text }
						onChange={ this.onChange }
						required
					/>
					<div className="float-xs-right">
						<RaisedButton
							primary={ true }
							type="submit"
							label="Generate Password"
						/>
					</div>
				</form>
				{ this.state.securePassword && <ClipboardManager text={ this.state.securePassword } /> }
			</section>
		)
	}
}

export default PasswordGeneratorForm;