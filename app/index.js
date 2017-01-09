import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import PasswordGeneratorForm from './components/PasswordGeneratorForm';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import './styles/app.scss';

injectTapEventPlugin();

class App extends React.Component {
	state = {};

	resetData = () => {
		chrome.storage.sync.clear(() => {
			this.setState({ cleared: true })
		});
	};

	render() {
		return (
			<MuiThemeProvider muiTheme={ getMuiTheme(lightBaseTheme) }>
				<div className="app-container container-fluid">
					<div className="row">
						<div className="col-xs-12">
							<Tabs>
								<Tab label="Main">
									<PasswordGeneratorForm />
								</Tab>
								<Tab label="Settings">
									<section className="settings-tab">
										<p>
											<strong>Warning!</strong> This will reset all data for the extension. That means the next time you enter a
											simple word
											you will receive a new generated password
										</p>
										<RaisedButton
											label="Reset Data"
											onClick={ this.resetData }
											secondary={ true }
										/>
									</section>
								</Tab>
							</Tabs>
						</div>
					</div>
					<Snackbar
						open={ this.state.cleared }
						onRequestClose={ () => this.setState({ cleared: false })}
						autoHideDuration={ 2000 }
						message="Data has been reset!"
					/>
				</div>
			</MuiThemeProvider>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));