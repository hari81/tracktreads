import React from 'react';
import { Text } from 'react-native';
import { ListItem, Content } from 'native-base';
import { CheckBox } from 'react-native-elements';

const CarrierRoller = (props) => {
	const {
		carrier1, carrier2, carrier3, carrier1Status, carrier2Status, carrier3Status,
	} = props;
	return (
		<Content>
			<Text style={{ fontWeight: 'bold', paddingLeft: '10%' }}>Carrier Roller</Text>
			<ListItem style={{ paddingLeft: '15%', borderBottomWidth: 0 }}>
				<CheckBox iconRight checked={carrier1} onPress={carrier1Status} containerStyle={{ padding: 0, margin: 0 }} title="1" textStyle={{ paddingRight: 10 }} />

			</ListItem>
			<ListItem style={{ paddingLeft: '15%', borderBottomWidth: 0 }}>
				<CheckBox iconRight checked={carrier2} onPress={carrier2Status} containerStyle={{ padding: 0, margin: 0 }} title="2" textStyle={{ paddingRight: 10 }} />

			</ListItem>
			<ListItem style={{ paddingLeft: '15%', borderBottomWidth: 0 }}>
				<CheckBox iconRight checked={carrier3} onPress={carrier3Status} containerStyle={{ padding: 0, margin: 0 }} title="3" textStyle={{ paddingRight: 10 }} />

			</ListItem>
		</Content>
	);
};


export default CarrierRoller;
