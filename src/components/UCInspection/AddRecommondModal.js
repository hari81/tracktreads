import React, { Component } from 'react';
import { ActivityIndicator,TextInput, View, StyleSheet, Text } from 'react-native';
import { Icon, Spinner, Picker, Button } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { addRecommondsSave } from '../../redux/actions/ComponentList';

// My classes
import APIManager from '../../business/APIManager';
import UCInspectionManager from '../../business/UCInspectionManager';
import CommonStyles from '../../styles/Common';
import Common from '../../styles/Common';
import Util from '../../config/Util';

class AddrecModal extends Component {
	// ////////////
	// STATE
	constructor(props) {
		super(props);
		this.state = {
			actionDescription: props.actionType || [],
			comments: this.props.comment,
			recommendId: this.props.id,
			loading: false,
		};
	}

	componentDidMount() {
	
    }
  
    ////////////////////
    // ADD Recommendations
    _addRecommends = () => {
        // Insert to Compoents database
        const addrecoms = {
            comment: this.state.comments,
            recId: this.state.recommendId
        }
        // console.log('addrecoms', addrecoms);
        // console.log('equnitAuto', this.props.equnitAuto);
        // UCInspectionManager.saveAddRecommendationComponentDetail(
        //     this.props.equnitAuto,
        //     addrecoms)
        // .then((response) => {

            // console.log('Saved recommendation data into components')

            // Save into Redux
           this.props.addRecommondsSave(this.props.equnitAuto, addrecoms, this.props.selectedComponent);

            // Close Modal
            this.props._onRequestClose()
        // } )
        // .catch() {

		// 		}
    }
	picker() {
		const { actionDescription } = this.state;
		if (actionDescription.length === 0) {
			return null;
		}
		const pickerValues = actionDescription.map(item => (
			<Picker.Item
				key={item.action_type_auto}
				label={item.action_description}
				value={item.action_type_auto}
			/>
		));
		return pickerValues;
	}

	// ///////////////
	// RENDER UI

	render() {
		return (
			<Modal
				transparent
				animationType={"fade"}
				isVisible={this.props.isModalVisible}
			>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View style={styles.ModalInsideView}>
						<View style={styles.header}>
							<Text style={styles.headerText}>Add Recommondations</Text>
						</View>
						{/* ********************************************** Track Action Type */}
						<View style={styles.jobsiteContainer}>
							<Picker
								iosHeader='Select Recommandations'
								iosIcon={<Icon name='arrow-down' style={{ color: 'blue', fontSize: 18 }} />}
								selectedValue={!this.state.recommendId 
									? this.state.actionDescription[0].action_type_auto 
									: this.state.recommendId}
								style={styles.jobsite}
								onValueChange={
									(itemValue, itemIndex) => {
                                        this.setState({recommendId: itemValue});
                                        this.props.changesRec(this.state.comments, itemValue);
                                        // console.log('id', this.state.recommendId);
									}}
							>
								{ this.picker() }
                    </Picker>
            </View>
						<View style={styles.autocompleteWrapper}>
								<TextInput style={{ height: 100 }}
									placeholder='Comments'
									value={this.state.comments}
									multiline
									numberOfLines={3}
									onChangeText={(text) => { 
										this.setState({ comments: text });
										this.props.changesRec(text, this.state.recommendId);
									}}
								/>
						</View>
						{/* ************************************************ SAVE BUTTON */}
						<View style={styles.addBtnContainer}>
							<Button iconRight
											style={styles.addBtn}
											disabled={this.state.loading || this.props.isFetching 
													? true
													: false}
											onPress={() => {this._addRecommends()} }>
											{this.state.loading || this.props.isFetching
													? (<Spinner color={CommonStyles.COLOR_WHITE} />)
													: (<Text style={styles.addText}>Save</Text>)}
							</Button>
						</View>

						{/* **************************************** BUTTONS */}
						<View style={styles.bottomContainer}>
							<Button 
								style={styles.closeBtn}
								onPress={() => {this.props._onRequestClose()} }
							>
								<Text style={styles.closeText}>CLOSE</Text>
							</Button>
						</View>
          </View>
        </View>
      </Modal>
    )
  }
}

const modalWidth = 360
const styles = StyleSheet.create({
    ModalInsideView:{
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: CommonStyles.COLOR_WHITE,
        height: '60%',
        width: modalWidth,
        borderRadius: 10,
        paddingTop: 24,
    },
        header: {
            height: 50,
            marginLeft: -20,
            marginRight: -20,
            marginTop: -24,
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            backgroundColor: CommonStyles.COLOR_RED,
            justifyContent: 'center',
            alignItems: 'center'
        },
            headerText: {
                color: CommonStyles.COLOR_WHITE,
                fontSize: CommonStyles.FONT_SIZE_MEDIUM,
                fontWeight: 'bold'
            },
        autocompleteWrapper: {
            marginBottom: 20,
						marginTop: 30,
						backgroundColor: CommonStyles.COLOR_GREY,
        },
            autocompleteContainer: {
                backgroundColor: CommonStyles.COLOR_GREY,
                height: 40,
                fontSize: 17,
                padding: 7,
            }, 
                inputCustomer: {
                    paddingLeft: 5,
                    width: 500,
                    height: 42,
                    backgroundColor: CommonStyles.COLOR_GREY,
                },
                TextStyle:{       
                    fontSize: 20, 
                    marginBottom: 20, 
                    color: CommonStyles.COLOR_WHITE,
                    padding: 20,
                    textAlign: 'center'       
                },
        jobsiteContainer: {
            backgroundColor: CommonStyles.COLOR_WHITE,
            marginTop: 20,
        },
            jobsite: {
                backgroundColor: CommonStyles.COLOR_GREY,
                width: '100%',
                height: 42,
            },
        modelContainer: {
            backgroundColor: CommonStyles.COLOR_WHITE,
            marginTop: 3,
        },
            model: {
                backgroundColor: CommonStyles.COLOR_GREY,
                width: '100%',
                height: 42,
            },
        equipmentContainer: {
            backgroundColor: CommonStyles.COLOR_WHITE,
            marginTop: 3,
        },
            serialNo: {
                // color: CommonStyles.COLOR_WHITE,
                fontSize: Common.FONT_SIZE_BIGGER_REGULAR
            },
            checkBox: {
            },
        addBtnContainer: {
            backgroundColor: CommonStyles.COLOR_WHITE,
            marginTop: 3,
            alignSelf:'center'
        },
            addBtn: {
                width: modalWidth - 40,
                backgroundColor: CommonStyles.COLOR_RED,
                justifyContent: 'center'
            },
            addText: {
                color: CommonStyles.COLOR_WHITE,
                // fontWeight: 'bold',
                fontSize: Common.FONT_SIZE_BIGGER_REGULAR,
            },
        bottomContainer: {
            backgroundColor: CommonStyles.COLOR_WHITE,
            marginTop: 3,
            marginBottom: 20,
            alignSelf:'center',
            justifyContent: 'center'
        },
            closeBtn: {
                width: modalWidth - 40,
                backgroundColor: CommonStyles.COLOR_DARK_GREY,
                justifyContent: 'center'
            },
            closeText: {
                color: CommonStyles.COLOR_WHITE,
                // fontWeight: 'bold',
                fontSize: Common.FONT_SIZE_BIGGER_REGULAR,
            }
});

const mapStateToProps = (state) => {
  return {
      currentInspection: state.InspectionList.currentInspection,
      selectedComponent: state.ComponentList.selectedComponent,
  }
}

export default connect(mapStateToProps, {addRecommondsSave})(AddrecModal);
