import React, { Component } from 'react';
import { connect } from 'react-redux';
import Expo from 'expo';

import TestableApp from '../cavy/testable-app';

import { MainNavigator } from './config/route';
import { Util } from './config/Util';
import LoginManager from './business/LoginManager';
import { login, /* loadActionType */ } from './redux/actions/auth';

class RootContainer extends Component {
	constructor(props) {
		super(props);
		// Check if user logged in and remembered
		LoginManager.getLoggedIn()
			.then((response) => {
			//	console.log(response);
				if (response !== null && response.remember_me === 1) {
					const { onLogin } = this.props;
					onLogin(response.userid, response.password);// save to redux
				}
			});
		// Expo bug
		this.state = {
			isReady: false,
		};
	}

	componentWillMount() {
		// Expo bug
		this.loadFonts();
	}

	async loadFonts() {
		await Expo.Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
		});
		this.setState({ isReady: true });
	}

	render() {
		// Expo bug
		const { isReady } = this.state;
		const { isLoggedIn } = this.props;
		if (!isReady) {
			return <Expo.AppLoading />;
		}
		// console.log(Util.Functions.getCurrentTimeStamp());
		const Layout = MainNavigator(isLoggedIn);
		if (Util.ConstantHelper.isTest) {
			return (
				<TestableApp>
					<Layout />
				</TestableApp>
			);
		}
		return <Layout />;
	}
}
// ////////////
// Redux
const mapStateToProps = state => ({
	isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
	onLogin: (username, password) => { dispatch(login(username, password)); },
});

const ConnectedRootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainer);

export default ConnectedRootContainer;
