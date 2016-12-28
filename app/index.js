import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import PasswordGeneratorForm from './components/PasswordGeneratorForm';
import './styles/app.scss';

const App = props => (
	<MuiThemeProvider muiTheme={ getMuiTheme(lightBaseTheme) }>
		<div className="app-container container-fluid">
			<div className="row">
				<div className="col-xs-12">
					<PasswordGeneratorForm />
				</div>
			</div>
		</div>
	</MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));