import React, { Component } from 'react';
import {
	View, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import {
	CheckBox, Body, Icon, Button, Footer, CardItem,
} from 'native-base';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import CommonStyles from '../../styles/Common';
import {
	updateImpact, updateAbrasive, updateMoisture, updatePacking, updateMeasure,
} from '../../redux/actions/Jobsite';

class JobsiteMeasureClass extends Component {
	render() {
		return (
			<CardItem>
				<Body>
					<View style={styles.jobsiteRow}>
						<View style={styles.jobsiteColumn}>
							<Text style={styles.title}>Impact</Text>
						</View>
						<TouchableOpacity
							style={styles.jobsiteColumn}
							onPress={() => this.props.updateImpact(2)}
						>
							<CheckBox
                checked={this.props.jobsiteData.impact === 2}
								onPress={() => this.props.updateImpact(2)}
							/>
							<Text style={styles.chkText}>High</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.jobsiteColumn}
							onPress={() => this.props.updateImpact(1)}
						>
							<CheckBox
								checked={this.props.jobsiteData.impact === 1}
                onPress={() => this.props.updateImpact(1)}
							/>
							<Text style={styles.chkText}>Medium</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.jobsiteColumn}
							onPress={() => this.props.updateImpact(0)}
						>
							<CheckBox
								checked={this.props.jobsiteData.impact === 0}
                onPress={() => this.props.updateImpact(0)}
							/>
							<Text style={styles.chkText}>Low</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.jobsiteRow}>
						<View style={styles.jobsiteColumn}>
							<Text style={styles.title}>Abrasive</Text>
						</View>
						<TouchableOpacity
							style={styles.jobsiteColumn}
							onPress={() => this.props.updateAbrasive(2)}
						>
							<CheckBox
								checked={this.props.jobsiteData.abrasive === 2}
                onPress={() => this.props.updateAbrasive(2)}
							/>
							<Text style={styles.chkText}>High</Text>
						</TouchableOpacity>
						<TouchableOpacity
              style={styles.jobsiteColumn}
							onPress={() => this.props.updateAbrasive(1)}
						>
							<CheckBox
								checked={this.props.jobsiteData.abrasive === 1}
								onPress={() => this.props.updateAbrasive(1)}
							/>
							<Text style={styles.chkText}>Medium</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.jobsiteColumn}
							onPress={() => this.props.updateAbrasive(0)}
						>
							<CheckBox
								checked={this.props.jobsiteData.abrasive === 0}
								onPress={() => this.props.updateAbrasive(0)}
							/>
							<Text style={styles.chkText}>Low</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.jobsiteRow}>
						<View style={styles.jobsiteColumn}>
							<Text style={styles.title}>Moisture</Text>
						</View>
						<TouchableOpacity
							style={styles.jobsiteColumn}
							onPress={() => this.props.updateMoisture(2)}
						>
							<CheckBox
								checked={this.props.jobsiteData.moisture === 2}
                onPress={() => this.props.updateMoisture(2)}
							/>
							<Text style={styles.chkText}>High</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.jobsiteColumn}
							onPress={() => this.props.updateMoisture(1)}
						>
							<CheckBox
								checked={this.props.jobsiteData.moisture === 1}
								onPress={() => this.props.updateMoisture(1)}
							/>
							<Text style={styles.chkText}>Medium</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.jobsiteColumn}
							onPress={() => this.props.updateMoisture(0)}
						>
							<CheckBox
								checked={this.props.jobsiteData.moisture === 0}
								onPress={() => this.props.updateMoisture(0)}
							/>
							<Text style={styles.chkText}>Low</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.jobsiteRow}>
						<View style={styles.jobsiteColumn}>
							<Text style={styles.title}>Packing</Text>
						</View>
						<TouchableOpacity
							style={styles.jobsiteColumn}
              onPress={() => this.props.updatePacking(2)}
						>
							<CheckBox
								checked={this.props.jobsiteData.packing === 2}
								onPress={() => this.props.updatePacking(2)}
							/>
							<Text style={styles.chkText}>High</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.jobsiteColumn}
              onPress={() => this.props.updatePacking(1)}
						>
							<CheckBox
                checked={this.props.jobsiteData.packing === 1}
								onPress={() => this.props.updatePacking(1)}
							/>
							<Text style={styles.chkText}>Medium</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.jobsiteColumn}
              onPress={() => this.props.updatePacking(0)}
						>
							<CheckBox
								checked={this.props.jobsiteData.packing === 0}
								onPress={() => this.props.updatePacking(0)}
							/>
							<Text style={styles.chkText}>Low</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.jobsiteRow}>
						<View style={styles.jobsiteColumn}>
							<Text style={styles.title}>Measure</Text>
						</View>
						<TouchableOpacity
							style={styles.jobsiteColumn}
              onPress={() => this.props.updateMeasure(0)}
						>
							<CheckBox
                checked={this.props.jobsiteData.uom === 0}
								onPress={() => this.props.updateMeasure(0)}
							/>
							<Text style={styles.chkText}>Inches</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.jobsiteColumn}
							onPress={() => this.props.updateMeasure(1)}
						>
							<CheckBox
								checked={this.props.jobsiteData.uom === 1}
								onPress={() => this.props.updateMeasure(1)}
							/>
							<Text style={styles.chkText}>mm</Text>
						</TouchableOpacity>
						<View style={styles.jobsiteColumn} />
					</View>
				</Body>
			</CardItem>
		);
	}
}

const styles = StyleSheet.create({
	jobsiteRow: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 15,
	},
	jobsiteColumn: {
		flex: 1 / 4,
		flexDirection: 'row',
	},
	title: {
		fontSize: CommonStyles.FONT_SIZE_REGULAR,
	},
	chkText: {
		marginLeft: 15,
	},
});

const mapStateToProps = (state, ownProps) => ({
	jobsiteData: state.Jobsite,
});

const mapDispatchToProps = dispatch => ({
	updateImpact: (value) => { dispatch(updateImpact(value)); },
	updateAbrasive: (value) => { dispatch(updateAbrasive(value)); },
	updateMoisture: (value) => { dispatch(updateMoisture(value)); },
	updatePacking: (value) => { dispatch(updatePacking(value)); },
	updateMeasure: (value) => { dispatch(updateMeasure(value)); },
});

const JobsiteMeasure = connect(mapStateToProps, mapDispatchToProps)(JobsiteMeasureClass);
export { JobsiteMeasure };
