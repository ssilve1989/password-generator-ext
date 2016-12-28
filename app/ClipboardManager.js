import React, { PropTypes } from 'react';
import Clipboard from 'clipboard';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ClipboardManager extends React.Component {

	static propTypes = {
		text : PropTypes.string.isRequired
	};

	constructor() {
		super();

		this.state = {
			copied : "",
			showDialog : true,
			actions: [
				<FlatButton
					className="copy-clipboard"
					label="Copy to Clipboard"
					data-clipboard-target="#securePassword"
					primary={ true }
				/>,
				<FlatButton
					label="Got It!"
					onTouchTap={ this.setState({ showDialog : false }) }
				/>
			]
		}
	}

	componentDidMount() {
		const cb = new Clipboard('.copy-clipboard');

		cb.on('success', () => this.setState({ copied: true }));
		cb.on('error', () => this.setState({ copied : "Unable to copy. Please copy manually"}));
	}

	render() {
		const { copied } = this.state;
		const { text } = this.props;
		return (
			<div>
				<Snackbar
					open={ !!copied }
					autoHideDuration={ 2000 }
					message={ typeof copied === 'boolean' ? 'Copied Secure Password!' : copied }
					onRequestClose={ () => this.setState({ copied : "" })}
				/>
				<ReactCSSTransitionGroup
					transitionAppear={ true }
					transitionAppearTimeout={ 500 }
					transitionEnter={ false }
					transitionLeave={ false }
					transitionName="fade">
					<form onSubmit={ () => null } className="cb-form">
						<label>
							<strong>Here is your Secure Password</strong>
							&nbsp;
							<TextField
								fullWidth={ true }
								id="securePassword"
								value={ text }
								readOnly={ true }
							/>
						</label>
						<div className="form-group">
							{ this.state.actions }
						</div>
					</form>
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}

export default ClipboardManager;