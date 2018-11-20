import React from 'react';
import { Text } from 'react-native';

import { CheckBox, ListItem, Content } from 'native-base';

const Idler = (props) => {
	const {
		idlerFront, idlerRear,
		idlerFrontStatus,
		idlerRearStatus,
	} = props;
	return (
		<Content>
			<Text style={{ fontWeight: 'bold', paddingLeft: '10%' }}>Idler</Text>
			<ListItem style={{ paddingLeft: '20%', borderBottomWidth: 0 }}>
				<Text style={{ paddingRight: 10 }}>Front</Text>
				<CheckBox checked={idlerFront} onPress={idlerFrontStatus} />
			</ListItem>
			<ListItem style={{ paddingLeft: '20%' }}>
				<Text style={{ paddingRight: 10 }}>Rear</Text>
				<CheckBox checked={idlerRear} onPress={idlerRearStatus} />
			</ListItem>
		</Content>
	);
};

export default Idler;
