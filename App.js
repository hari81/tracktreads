import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux';
import ConnectedRootContainer from './src/main';

const App = () => (
	<Provider store={store}>
		<ConnectedRootContainer />
	</Provider>
);

export default App;
