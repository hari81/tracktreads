import React from 'react';
import { createDrawerNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Login from '../screens/Login';
import SelectInspection from '../screens/SelectInspection';
import UCMain from '../screens/UCMain';
import UCEquipDetail from '../screens/UCEquipDetail';
import UCEquipCondition from '../screens/UCEquipCondition';
import UCInspect from '../screens/UCInspection';
import WSREMain from '../screens/WSRE/WSREMain';
import Camera from '../screens/Camera';
import UCSideBar from '../screens/UCSideBar';
import NewEquipment from '../screens/NewEquipment';
import ComponentSelect from '../components/NewEquipment/ComponentSelect';
import ComponentInspection from '../components/UCInspection/ComponentInspection';

// ////////////////////////////
// Undercarriage Inspection
export const UCInspection = createStackNavigator({
	UCMain: {
		screen: UCMain,
		navigationOptions: { header: null },
	},
	UCEquipDetail: {
		screen: UCEquipDetail,
		navigationOptions: { header: null },
	},
	UCEquipCondition: {
		screen: UCEquipCondition,
		navigationOptions: { header: null },
	},
	UCInspect: {
		screen: UCInspect,
		navigationOptions: { header: null },
	},
	Camera: {
		screen: Camera,
		navigationOptions: { header: null },
	},
	NewEquipment: {
		screen: NewEquipment,
	},
	ComponentSelect: {
		screen: ComponentSelect,
  },
  ComponentInspection: {
    screen: ComponentInspection,
    navigationOptions: { header: null },
  },
},
{
	initialRouteName: 'UCMain',
});

// ////////////////////////////
// WSRE Inspection
export const WSREInspection = createStackNavigator({
	WSREMain: {
		screen: WSREMain,
		navigationOptions: { header: null },
	},
});

// /////////////////////////
// After Logged In Stack
export const SignedIn = createStackNavigator({
	SelectInspection: {
		screen: SelectInspection,
		navigationOptions: { header: null },
	},
	UCMain: {
		screen: UCMain,
		navigationOptions: { header: null },
	},
	UCEquipDetail: {
		screen: UCEquipDetail,
		navigationOptions: { header: null },
	},
	UCEquipCondition: {
		screen: UCEquipCondition,
		navigationOptions: { header: null },
	},
	UCInspect: {
		screen: UCInspect,
		navigationOptions: { header: null },
	},
	Camera: {
		screen: Camera,
		navigationOptions: { header: null	},
  },
  ComponentInspection: {
    screen: ComponentInspection,
    navigationOptions: { header: null },
  },
});


// //////////////////////
// After Logged In
export const SignedInDrawer = createDrawerNavigator({
	Home: {
		screen: SignedIn,
		navigationOptions: { drawerLockMode: 'unlocked' },
	}, // Stack
},
{
	contentComponent: props => <UCSideBar {...props} />,
	drawerWidth: 200,
	drawerPosition: 'left',
});

// //////////////////////
// After Logged Out
export const SignedOut = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: { header: null	},
	},
});

// /////////////////////////////////
// Switch Login and Logout
export const MainNavigator = signedIn => (
	createSwitchNavigator({
		SignedIn: {
			screen: SignedIn,
		},
		SignedOut: {
			screen: SignedOut,
		},
	},
	{
    initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    // initialRouteName: 'SignedOut',
	})
);
