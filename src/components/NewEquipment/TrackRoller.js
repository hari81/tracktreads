import React from 'react';
import { Text } from 'react-native';

import {
	ListItem, Content,
} from 'native-base';

import { CheckBox } from 'react-native-elements';
import Common from '../../styles/Common';

const TrackRoller = ({ checkStatus, 
  checkpress,
  sfStatus,
  sfpress,
  dfStatus,
  dfpress, title }) => {
  
	return (
		<ListItem style={{ paddingLeft: '15%', borderBottomWidth: 0 }}>
			<CheckBox iconRight checked={checkStatus} onPress={checkpress} containerStyle={{ padding: 0, margin: 0 }} title={title} textStyle={{ paddingRight: 10 }} />
			<CheckBox
				containerStyle={{ padding: 0, margin: 0 }}
				textStyle={{ fontWeight: 'normal', padding: 0 }}
				wrapperStyle={{ backgroundColor: 'none' }}
				iconLeft
        title="SF"
        checkedIcon="dot-circle-o"
				uncheckedIcon="circle-o"
				checkedColor={Common.COLOR_RED}
				uncheckedColor={Common.COLOR_DARK_GREY}
        checked={sfStatus}
        onPress={sfpress}
			/>
			<CheckBox
				containerStyle={{ padding: 0, margin: 0 }}
        textStyle={{ fontWeight: 'normal', padding: 0 }}
				wrapperStyle={{ backgroundColor: 'none' }}
				iconLeft
				title="DF"
				checkedIcon="dot-circle-o"
				uncheckedIcon="circle-o"
				checkedColor={Common.COLOR_ORANGE}
				uncheckedColor={Common.COLOR_DARK_GREY}
        checked={dfStatus}
        onPress={dfpress}
			/>
		</ListItem>
	);
};

// const TrackRoller = (props) => {
// 	const { trackState, trackRollerCheck } = props;
// 	return (
// 		<Content>
// 			<Text style={{ fontWeight: 'bold', paddingLeft: '10%' }}>Track Roller</Text>
// 			<TrackRollerItem sfdfState={trackState[0]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[1]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[2]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[3]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[4]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[5]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[6]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[7]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[8]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[9]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[10]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[11]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[12]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[13]} checkStatus={trackRollerCheck} />
// 			<TrackRollerItem sfdfState={trackState[14]} checkStatus={trackRollerCheck} />
// 		</Content>
// 	);
// };


export default TrackRoller;
