import React from 'react';
import {
	TextInput, View, TouchableOpacity, StyleSheet, Text, Keyboard,
} from 'react-native';
import {
	CardItem, Body,
} from 'native-base';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import CommonStyles from '../../styles/Common';
import {
	updateLeftTrackSag, updateRightTrackSag, updateLeftDryJoints, updateRightDryJoints,
	updateLeftCannon, updateRightCannon, updateLeftScallop, updateRightScallop,
} from '../../redux/actions/Jobsite';
import Util from '../../config/Util';

const styles = StyleSheet.create({
	otherRow: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 15,
	},
	columnTitle: {
		flex: 1 / 5,
		flexDirection: 'row',
	},
	column: {
		flex: 2 / 5,
		flexDirection: 'row',
	},
	title: {
		fontSize: CommonStyles.FONT_SIZE_REGULAR,
	},
	chkText: {
		marginLeft: 15,
	},
	input: {
		backgroundColor: CommonStyles.COLOR_GREY,
		width: '70%',
		height: 42,
		paddingLeft: 5,
		borderRadius: 5,
		color: CommonStyles.COLOR_BLACK,
	},
});

const OtherMeasureClass = (props) => {
	const {
		jobsiteData, updateLeftTrackSag, _openPhotoModal, updateRightTrackSag,
		updateLeftDryJoints, updateRightDryJoints, updateLeftCannon,
		updateRightCannon, updateLeftScallop, updateRightScallop,
	} = props;
	return (
		<CardItem>
			<Body>
				<View style={styles.otherRow}>
					<View style={styles.columnTitle} />
					<View style={styles.column}>
						<Text style={styles.title}>Left</Text>
					</View>
					<View style={styles.column}>
						<Text>Right</Text>
					</View>
				</View>
				<View style={styles.otherRow}>
					<View style={styles.columnTitle}>
						<Text style={styles.title}>Track Sag</Text>
					</View>
					<View style={styles.column}>
						<TextInput
							style={styles.input}
  						keyboardType="numeric"
  						value={
								jobsiteData.track_sag_left !== null ? jobsiteData.track_sag_left.toString() : ''
              }
              returnKeyType='done'
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Enter') {
                    Keyboard.dismiss();
                }
              }}
							onChangeText={value => updateLeftTrackSag({
								input: value,
								// photoComment: jobsiteData.track_sag_left_comment,
								// photoPath: jobsiteData.track_sag_left_image,
							})
							}
						/>
						<TouchableOpacity
							onPress={() => {
								_openPhotoModal('left_track_sag');
							}}
						>
							{
								Util.Functions.validateString(jobsiteData.track_sag_left_image)
									? (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_GREEN }}
										/>
									)
									: (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_BLACK }}
										/>
									)
							}
						</TouchableOpacity>
					</View>
					<View style={styles.column}>
						<TextInput
							keyboardType="numeric"
							value={
								jobsiteData.track_sag_right !== null ? jobsiteData.track_sag_right.toString() : ''
							}
              style={styles.input}
              returnKeyType='done'
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Enter') {
                    Keyboard.dismiss();
                }
              }}
							onChangeText={value => updateRightTrackSag(
								{
									input: value,
									// photoComment: jobsiteData.track_sag_right_comment,
									// photoPath: jobsiteData.track_sag_right_image,
								},
							)
							}
						/>
						<TouchableOpacity
							onPress={() => {
								_openPhotoModal('right_track_sag');
							}}
						>
							{
								Util.Functions.validateString(jobsiteData.track_sag_right_image)
									? (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_GREEN }}
										/>
									)
									: (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_BLACK }}
										/>
									)
							}
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.otherRow}>
					<View style={styles.columnTitle}>
						<Text style={styles.title}>Dry Joints</Text>
					</View>
					<View style={styles.column}>
						<TextInput
							keyboardType="numeric"
							value={
								jobsiteData.dry_joints_left !== null ? jobsiteData.dry_joints_left.toString() : ''
							}
              style={styles.input}
              returnKeyType='done'
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Enter') {
                    Keyboard.dismiss();
                }
              }}
							onChangeText={value => updateLeftDryJoints(
								{
									input: value,
                	// photoComment: jobsiteData.dry_joints_left_comment,
									// photoPath: jobsiteData.dry_joints_left_image,
								},
							)
							}
						/>
						<TouchableOpacity
							onPress={() => {
								_openPhotoModal('left_dry_joints');
							}}
						>
							{
								Util.Functions.validateString(jobsiteData.dry_joints_left_image)
									? (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_GREEN }}
										/>
									)
									: (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_BLACK }}
										/>
									)
							}
						</TouchableOpacity>
					</View>
					<View style={styles.column}>
						<TextInput
              keyboardType="numeric"
              returnKeyType='done'
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Enter') {
                    Keyboard.dismiss();
                }
              }}
							value={
								jobsiteData.dry_joints_right !== null ? jobsiteData.dry_joints_right.toString() : ''
							}
							style={styles.input}
							onChangeText={value => updateRightDryJoints(
								{
									input: value,
									// photoComment: jobsiteData.dry_joints_right_comment,
									// photoPath: jobsiteData.dry_joints_right_image,
								}
							)
							}
						/>
						<TouchableOpacity
							onPress={() => {
								_openPhotoModal('right_dry_joints');
							}}
						>
							{
								Util.Functions.validateString(jobsiteData.dry_joints_right_image)
									? (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_GREEN }}
										/>
									)
									: (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_BLACK }}
										/>
									)
							}
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.otherRow}>
					<View style={styles.columnTitle}>
						<Text style={styles.title}>Ext.Cannon</Text>
					</View>
					<View style={styles.column}>
						<TextInput
              keyboardType="numeric"
              returnKeyType='done'
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Enter') {
                    Keyboard.dismiss();
                }
              }}
							value={
								jobsiteData.ext_cannon_left !== null ? jobsiteData.ext_cannon_left.toString() : ''
							}
							style={styles.input}
							onChangeText={value => updateLeftCannon(
								{
									input: value,
									// photoComment: jobsiteData.ext_cannon_left_comment,
									// photoPath: jobsiteData.ext_cannon_left_image,
								},
							)
							}
						/>
						<TouchableOpacity
							onPress={() => {
								_openPhotoModal('left_cannon');
							}}
						>
							{
								Util.Functions.validateString(jobsiteData.ext_cannon_left_image)
									? (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_GREEN }}
										/>
									)
									: (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_BLACK }}
										/>
									)
							}
						</TouchableOpacity>
					</View>
					<View style={styles.column}>
						<TextInput
              keyboardType="numeric"
              returnKeyType='done'
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Enter') {
                    Keyboard.dismiss();
                }
              }}
							value={
								jobsiteData.ext_cannon_right !== null ? jobsiteData.ext_cannon_right.toString() : ''
							}
							style={styles.input}
							onChangeText={value => updateRightCannon(
								{
									input: value,
									// photoComment: jobsiteData.ext_cannon_right_comment,
									// photoPath: jobsiteData.ext_cannon_right_image,
								},
							)
							}
						/>
						<TouchableOpacity
							onPress={() => {
								_openPhotoModal('right_cannon');
							}}
						>
							{
								Util.Functions.validateString(jobsiteData.ext_cannon_right_image)
									? (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_GREEN }}
										/>
									)
									: (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_BLACK }}
										/>
									)
							}
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.otherRow}>
					<View style={styles.columnTitle}>
						<Text style={styles.title}>Scallop Measurement</Text>
					</View>
					<View style={styles.column}>
						<TextInput
              keyboardType="numeric"
              returnKeyType='done'
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Enter') {
                    Keyboard.dismiss();
                }
              }}
							value={
								jobsiteData.scallop_left !== null ? jobsiteData.scallop_left.toString() : ''
							}
							style={styles.input}
							onChangeText={value => updateLeftScallop(
                { input: value,
                  // photoComment: jobsiteData.scallop_left_comment,
                  // photoPath: jobsiteData.scallop_left_image, 
                }
							)
							}
						/>
						<TouchableOpacity
							onPress={() => {
								_openPhotoModal('left_scallop_measurement');
							}}
						>
							{
								Util.Functions.validateString(jobsiteData.scallop_left_image)
									? (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_GREEN }}
										/>
									)
									: (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_BLACK }}
										/>
									)
							}
						</TouchableOpacity>
					</View>
					<View style={styles.column}>
						<TextInput
              keyboardType="numeric"
              returnKeyType='done'
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Enter') {
                    Keyboard.dismiss();
                }
              }}
							value={
								jobsiteData.scallop_right !== null ? jobsiteData.scallop_right.toString() : ''
							}
							style={styles.input}
							onChangeText={value => updateRightScallop(
                { input: value,
                  // photoComment: jobsiteData.scallop_right_comment,
                  // photoPath: jobsiteData.scallop_right_image,
                }
							)
							}
						/>
						<TouchableOpacity
							onPress={() => {
								_openPhotoModal('right_scallop_measurement');
							}}
						>
							{
								Util.Functions.validateString(jobsiteData.scallop_right_image)
									? (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_GREEN }}
										/>
									)
									: (
										<FontAwesome
											name="camera"
											style={{ fontSize: 35, marginLeft: 5, color: CommonStyles.COLOR_BLACK }}
										/>
									)
							}
						</TouchableOpacity>
					</View>
				</View>
			</Body>
		</CardItem>
	);
};


const mapStateToProps = state => ({
	jobsiteData: state.Jobsite,
});

const mapDispatchToProps = dispatch => ({
	updateLeftTrackSag: (value) => { dispatch(updateLeftTrackSag(value)); },
	updateRightTrackSag: (value) => { dispatch(updateRightTrackSag(value)); },
	updateLeftDryJoints: (value) => { dispatch(updateLeftDryJoints(value)); },
	updateRightDryJoints: (value) => { dispatch(updateRightDryJoints(value)); },
	updateLeftCannon: (value) => { dispatch(updateLeftCannon(value)); },
	updateRightCannon: (value) => { dispatch(updateRightCannon(value)); },
	updateLeftScallop: (value) => { dispatch(updateLeftScallop(value)); },
	updateRightScallop: (value) => { dispatch(updateRightScallop(value)); },
});

const OtherMeasure = connect(mapStateToProps, mapDispatchToProps)(OtherMeasureClass);
export { OtherMeasure };
