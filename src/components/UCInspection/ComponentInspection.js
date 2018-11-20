import React, {Component} from 'react'
import { TouchableOpacity, ScrollView, TextInput, Image, View, StyleSheet, Text, Keyboard, Dimensions } from 'react-native'
import Modal from "react-native-modal"
import { Body, Icon, Button, CheckBox } from "native-base";
import { fetchComponentList, selectComponent, getTestPoint, 
  selectTool, updateReading, updateComment, getLocalToolImg, changesComponentList } from '../../redux/actions/ComponentList';
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import calculateWorn from '../../business/WornCalculation'
import CommonStyles from '../../styles/Common'
import Common from '../../styles/Common'
import Styles from '../../styles/Styles'
import UCInspectionManager from '../../business/UCInspectionManager';
import UCMainManager from '../../business/UCMainManager';
import images from '../../resource'
import Util from "../../config/Util"
import {PhotoModal} from '../../components/UCInspection';
import { closePhotoModal, openPhotoModal } from '../../redux/actions/TakePhoto';
import AddrecModal from './AddRecommondModal';
import * as Firebase from '../../database/Firebase'

class ComponentInspection extends Component {

    //////////////
    // STATE
    constructor(props) {
        
				super(props);
				this.state = {
					addrecFlag: false,
					recmmondAction: [],
					eqUnitAuto: '',
					comment: '',
					rId: '',
          compartmentType: '',
          isPhotoModalVisible: false,
				};   
        this._renderToolImg(this.props.selectedComponent.tool)

        this.componentList = this.props.componentList
        .filter( (item, index, array) => (
            item.side === this.props.selectedComponent.side
        ))
    }

	componentDidMount () {
        // Re open component
        const { selectedComponent } = this.props;
		// this.subs = [
		// 	this.props.navigation.addListener('didFocus', () => {
				// this.componentList = this.props.componentList
				// 	.filter( (item, index, array) => (
				// 			item.side === this.props.selectedComponent.side
				// 	))
		// 	}),
    // ];
    if(this.props.currentInspection.unitno.slice(-5) !== '- NEW') {
		const compartmentType = !!this.props.selectedComponent.compartid ? this.props.selectedComponent.compartid.split(':')[0] : this.props.selectedComponent.compart;
        this.addRecommendations(compartmentType);
        this.setState({
            eqUnitAuto: selectedComponent.equnit_auto,
            comment: selectedComponent.recommendation_comment,
						rId: selectedComponent.recommendation_id,
						compartmentType
        });
      }
  }
   
  componentDidUpdate(){
    if(!this.props.navigation.state.params) {
      return;
    }
      // Open photo modal
      if (Util.Functions.validateString(this.props.navigation.state.params.photoPath))
      {
          // Reopen modal
          this.setState({isPhotoModalVisible: true});
          this.props.navigation.state.params.photoPath = ''
      }

  }
	componentWillUnmount() {
			// this.subs.forEach((sub) => {
			// 		sub.remove();
			// });
	}

	addRecommendations(compartmentType) {
		// const compartmentType = this.props.selectedComponent.compartid.split(':')[0];
		// console.log('compartmentType', compartmentType);
		UCMainManager.GetTrackActionType(compartmentType)
			.then(res => {
        this.setState({ recmmondAction: res,  });
      //  console.log(this.state.recmmondAction);
		});
	}
    _renderCheckbox = (tool) => {
        if (this.props.selectedComponent.tool === tool)
            return true
        else
            return false
    }

    _renderToolImg = async (tool) => {

        // Refresh selectedTool
        this.props.selectTool(tool)

        // Refresh tool image
        await UCInspectionManager.getTestPoint(
            this.props.selectedComponent.comparttype_auto,
            tool)
        .then(
            (response) => {
                if (response !== null) {
                    this.props.getTestPoint(response[0])
                } else {
                    let localToolImg = 'type_' 
                        + this.props.selectedComponent.comparttype_auto + '_' 
                        + tool.toLowerCase()
                    this.props.getLocalToolImg(localToolImg)                   
                }
            }
        )

        // Re-calculate worn percentage
        this._calculateReading(this.props.selectedComponent.reading)
    }

    _calculateReading = (reading) => {

      // new Equipments reading, no calculate worn
      if (!this.props.selectedComponent.method) {
        // Update Redux
        this.props.updateReading(reading, -1);
        return;
      }

        // Calculate worn
        calculateWorn(
            this.props.selectedComponent.method,
            this.props.selectedComponent.compartid_auto,
            this.props.selectedComponent.tool,
            reading,
            this.props.jobsiteData.impact,
            this.props.jobsiteData.uom
        ).then( (worn) => {

            // Update Redux
            this.props.updateReading(reading, worn)
        })
    }
    
    _renderBack = () => {
        // Save DB
        // UCInspectionManager.saveComponentDetail(
        //     this.props.currentInspection.id,
        //     this.props.selectedComponent.equnit_auto,
        //     this.props.selectedComponent)
        // .then(
        //     (response) => {

              // this.props.fetchComponentList(this.props.currentInspection.id)

                // this.componentList = this.props.componentList
                // .filter( (item, index, array) => (
                //     item.side === this.props.selectedComponent.side
                // ))
                this.props.changesComponentList(this.props.componentList, this.props.selectedComponent);
                const updatedComponentList = this.props.componentList
                  .filter( (item, index, array) => (
                      item.side === this.props.selectedComponent.side
                  ))
                // Render previous component
                let previousComponent = UCInspectionManager.getPreviousComponent(
                    this.props.selectedComponent, updatedComponentList);
										
                // Add recommandations
                // console.log('pre',previousComponent);
                if(this.state.addrecFlag) {
								const compartmentType = previousComponent.compartid.split(':')[0]
								this.addRecommendations(compartmentType);
                }
								
                if (previousComponent == null) return
        
                // Update redux
                this.props.selectComponent(previousComponent)

                // Update tool image
								this._renderToolImg(previousComponent.tool)
								if(this.state.addrecFlag) {
								this.setState({ 
									eqUnitAuto: previousComponent.equnit_auto, 
									comment: previousComponent.recommendation_comment,
									rId: !previousComponent.recommendation_id ? this.state.recmmondAction[0].action_type_auto : previousComponent.recommendation_id,
									compartmentType: previousComponent.compartid.split(':')[0],
                });
             }
								// console.log('previouscom', previousComponent.recommendation_id);
								// console.log('previousComponent', previousComponent);
								// console.log('state', this.state.recmmondAction);
        //     }
        // )  
    }

    _renderNext = () => {
		
        // Firebase.writeFirebaseLog('_renderNext')
        // Firebase.writeFirebaseLog(this.props.selectedComponent)
        // Firebase.writeFirebaseLog(this.componentList)
        this.props.changesComponentList(this.props.componentList, this.props.selectedComponent);
        // Save DB
        // UCInspectionManager.saveComponentDetail(
        //     this.props.currentInspection.id,
        //     this.props.selectedComponent.equnit_auto,
        //     this.props.selectedComponent)
        // .then(
        //     (response) => {

                // Refresh component list
                // this.props.fetchComponentList(this.props.currentInspection.id)

                // Render next component
                const updatedComponentList = this.props.componentList
                .filter( (item, index, array) => (
                    item.side === this.props.selectedComponent.side
                ))
                let nextComponent = UCInspectionManager.getNextComponent(
                    this.props.selectedComponent, 
                    updatedComponentList)
								if (nextComponent == null) return
								
                  // Add recommandations
                  // console.log('nextcomponent', nextComponent);
                  if(this.state.addrecFlag) {
									const compartmentType = nextComponent.compartid.split(':')[0];
                  this.addRecommendations(compartmentType);
                  
                  this.setState({ 
										eqUnitAuto: nextComponent.equnit_auto, 
										comment: nextComponent.recommendation_comment,
										rId: nextComponent.recommendation_id,
										compartmentType,
                  });
                }
                // Update redux
                this.props.selectComponent(nextComponent)

                // Update tool image
                this._renderToolImg(nextComponent.tool)
        //     }
        // )
    }
    addRecomends = () => {
			// const compartmentType = this.props.selectedComponent.compartid.split(':')[0];
      // 	this.addRecommendations(compartmentType);
      
        const { selectedComponent } = this.props;
        // console.log('selectedcomponent', selectedComponent);
        // console.log('recommondations', this.state.recmmondAction);
        this.setState({
            eqUnitAuto: selectedComponent.equnit_auto,
            comment: selectedComponent.recommendation_comment,
						rId: !selectedComponent.recommendation_id ? this.state.recmmondAction[0].action_type_auto : selectedComponent.recommendation_id,
						
        });
        this.setState({addrecFlag: true});
    }
    _onRequestCloseRecommondation =() => {
        this.setState({addrecFlag: false});
    }
    changesRecommondations = (com, id) => {
        this.setState({ comment: com, rId: id });
    }

     ////////////////////////////
    // Photo modal controllers
    _openPhotoModal = (inspectionImage) => {
   //   console.log( 'photo modal');
        // Open modal
        this.setState({ 
            isPhotoModalVisible: true,
        })

        // Update Redux
        let photoInfo = {
            type: '',
            path: inspectionImage,
            title: '',
            comment: '',
        }
        this.props.openPhotoModal(photoInfo)
    }

    _closePhotoModal = () => {

        // Save DB
        UCInspectionManager.saveComponentDetail(
            this.props.currentInspection.id,
            this.props.selectedComponent.equnit_auto,
            this.props.selectedComponent)
        .then(
            (response) => {

                // Close modal
                this.setState({ 
                    isPhotoModalVisible: false,
                })

                // Reset Redux TakePhoto
                this.props.closePhotoModal()
            }
        )
    }
    _openCamera = () => {
        
      // Close modal
      this.setState({ 
          isPhotoModalVisible: false,
      })

      // setTimeout(()=>{

      //     // Close component modal
      //     this.setState({
      //         isModalVisible: false
      //     })

          // setTimeout(()=>{
          //     // Open camera
          //     console.log('Opening camera...');
              let params = { 
                  previousRoute: 'ComponentInspection' //this.props.navigation.state.routeName,
              }
              this.props.navigation.navigate('Camera', params);
          // }, 600)
      // }, 600);
  }
  // _onRequestSave = () => {
  //   // Save DB
  //   UCInspectionManager.saveComponentDetail(
  //       this.props.currentInspection.id,
  //       this.props.selectedComponent.equnit_auto,
  //       this.props.selectedComponent)
  //   .then(
  //       (response) => {

  //           // Load component detail
  //            this.props.fetchComponentList(this.props.currentInspection.id)
           
  //           this.props.navigation.navigate('UCInspect');
           
  //       }
  //   )          
  // }

  _onRequestClose = () => {

    this.props.changesComponentList(this.props.componentList, this.props.selectedComponent);

    const updatedComponentList = this.props.componentList
    .filter( (item) => (
        item.side === this.props.selectedComponent.side
    ))
    
    const newList = updatedComponentList.map(item => {
      if(item.equnit_auto === this.props.selectedComponent.equnit_auto) {
        return this.props.selectedComponent;
      } 
      return item;
    })
    // Save DB
    UCInspectionManager.saveAllComponentsDetail(
        this.props.currentInspection.id,        
        newList)
    .then(
        (response) => {

            // Load component detail
            // this.props.fetchComponentList(this.props.currentInspection.id)
           
            this.props.navigation.navigate('UCInspect');
           
        }
    )          
  }
  render() {
   // const{ _onRequestSave } = this.props.navigation.state.params;
    return (
      <GestureRecognizer 
          onSwipeLeft={() => this._renderNext()}
          onSwipeRight={() => this._renderBack()}
          config={Util.ConstantHelper.SWIPE_CONFIG}
          style={{
              flex: 1,
          }}>
            
          <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: CommonStyles.COLOR_WHITE,
              height: '95%',
              width: modalWidth,
              borderRadius:10,
              paddingTop: 24 }}
            >
              {/************************************* Header */}
              <View style={styles.header}>
                <Image
                  style={styles.headerImg}
                  source={
                    this.props.selectedComponent.image !== undefined
                      ? {uri: `data:image/png;base64,${this.props.selectedComponent.image}`}
                      : null}
                />
                <View style={styles.headerDetail}>
                    <Text style={{fontWeight: 'bold'}}>{this.props.selectedComponent.side + ': '}{this.props.selectedComponent.compart}{' '}{this.props.selectedComponent.position}</Text>
                    <Text>{this.props.selectedComponent.compartid}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => { 
                        this._openPhotoModal(this.props.selectedComponent.inspection_image)
                    }}>
                    {Util.Functions.validateString(this.props.selectedComponent.inspection_image)
                        ? (<FontAwesome 
                                name='camera'
                                style={{fontSize: 35, marginLeft:25, alignSelf: 'center', color: CommonStyles.COLOR_GREEN}}
                        />)
                        : (<FontAwesome 
                                name='camera'
                                style={{fontSize: 35, marginLeft:25, alignSelf: 'center', color: CommonStyles.COLOR_BLACK}}
                        />)}
                </TouchableOpacity>
              </View>
              <View style={Styles.greyLine} />

              {/************************************* Detail */}
              <ScrollView style={{marginTop: 4, marginBottom: 4}}>
                <View style={styles.detail}>
                                    
                  {/* <Text style={{alignSelf: 'center'}}>Measure this component</Text> */}
                  
                  {/************************************* Reading */}
                  <View style={styles.readingDetail}>
                      <TextInput
                          keyboardType = 'numeric'
                          returnKeyType='done'
                          onKeyPress={(e) => {
                            if (e.nativeEvent.key === 'Enter') {
                                Keyboard.dismiss();
                            }
                          }}
                          value={this.props.selectedComponent.reading}
                          onChangeText = { (reading) => this._calculateReading(reading) }
                          style={styles.readingInput}/>
                      <TextInput
                          editable={false}
                          value={UCInspectionManager.displayWornPercentage(
                              this.props.selectedComponent.worn_percentage
                          )}
                          style={[{backgroundColor: UCInspectionManager.displayWornPercentageColor(
                              this.props.selectedComponent.worn_percentage,
                              this.props.dealershipLimits
                          )},
                              styles.percentageInput]}/>
                  </View>

                  {/************************************* Tool Image */}
                  {  (!Util.Functions.validateString(this.props.selectedTestPoint.image)
                      && !Util.Functions.validateString(images[this.props.localToolImg]))
                          ? (<Text style={styles.toolWarningText}>
                              {Util.ConstantHelper.TOOL_UNAVAILABLE}
                          </Text>)
                          : (<Image
                              style={styles.toolImg}
                              source={
                                  this.props.selectedTestPoint.image !== undefined
                                      ? {uri: `data:image/png;base64,${this.props.selectedTestPoint.image}`}
                                      : images[this.props.localToolImg]}
                          />)
                  }
                  {/************************************* Tool Checkbox */}
                  <View style={styles.tools}>

                      <TouchableOpacity
                          style={styles.radioGroup}
                          onPress={() => (this._renderToolImg('UT'))}>
                          <CheckBox
                              checked={this._renderCheckbox('UT')}
                              onPress={
                                  () => (this._renderToolImg('UT'))
                              }
                              style={styles.radioBtn}/>
                          <Text style={styles.radioText}>UT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={styles.radioGroup}
                          onPress={() => (this._renderToolImg('DG'))}>
                          <CheckBox
                              checked={this._renderCheckbox('DG')}
                              onPress={
                                  () => (this._renderToolImg('DG'))
                              }
                              style={styles.radioBtn}/>
                          <Text style={styles.radioText}>DG</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={styles.radioGroup}
                          onPress={() => (this._renderToolImg('C'))}>
                          <CheckBox
                              checked={this._renderCheckbox('C')}
                              onPress={
                                  () => (this._renderToolImg('C'))
                              }
                              style={styles.radioBtn}/>
                          <Text style={styles.radioText}>C</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={styles.radioGroup}
                          onPress={() => (this._renderToolImg('R'))}>
                          <CheckBox
                              checked={this._renderCheckbox('R')}
                              onPress={
                                  () => (this._renderToolImg('R'))
                              }
                              style={styles.radioBtn}/>
                          <Text style={styles.radioText}>R</Text>
                      </TouchableOpacity>
                  </View>
                  
                  <View style={styles.comment}>
                    <TextInput
                        placeholder = 'Comments'
                        multiline={true}
                        numberOfLines={3}
                        returnKeyType='done'
                        // onKeyPress={(e) => {
                        //  if (e.nativeEvent.key === 'Enter') {
                        //    Keyboard.dismiss();
                        //   }
                        //  }}
                          keyboardType="default"
                          blurOnSubmit={true}
                          onSubmitEditing={()=>{Keyboard.dismiss()}}
                        value={this.props.selectedComponent.comments}
                        onChangeText = { (value) => 
                            this.props.updateComment(value)
                        }
                        style={styles.commentInput}/>
                        {this.props.currentInspection.unitno.slice(-5) === '- NEW' ? null :
                    <TouchableOpacity onPress={this.addRecomends} >
                      <View style={styles.addRecomendsButton}>
                        <Text style={styles.addRecomendsText}>Add Recommendations</Text>
                        <Text style={styles.addRecomendsText}>+</Text>
                      </View>
                      </TouchableOpacity> }
                  </View>
                </View>
              </ScrollView>
              { this.state.addrecFlag 
                ? 
                  <AddrecModal
                    equnitAuto={this.state.eqUnitAuto}
                    comment={this.state.comment}
                    id={this.state.rId}
                    changesRec = {this.changesRecommondations}
                    actionType={this.state.recmmondAction}
                    isModalVisible={this.state.addrecFlag}
                    _onRequestClose={this._onRequestCloseRecommondation} 
                  /> 
                : null 
              }
              <View style={styles.footerGroup}>
                <View style={styles.footerLeft}>
                  <Button
                      style={
                          UCInspectionManager.getPreviousComponent(this.props.selectedComponent,this.componentList) === null
                              ? styles.hide
                              : styles.btnBack}
                      onPress={() => this._renderBack()}>
                      <FontAwesome 
                          name='angle-left'
                          style={{fontSize: 30, color: CommonStyles.COLOR_WHITE}}
                      />
                      <Text style={{marginLeft: 12, color: CommonStyles.COLOR_WHITE}}>Save & Back{'\n'}Component</Text>
                  </Button>
                </View>
                <View style={styles.footerRight}>
                  <Button
                      style={
                          UCInspectionManager.getNextComponent(this.props.selectedComponent,this.componentList) === null
                              ? styles.hide
                              : styles.btnNext}
                      onPress={() => this._renderNext()}>
                      <Text style={{marginRight: 12, color: CommonStyles.COLOR_WHITE}}>Save & Next{'\n'}Component</Text>
                      <FontAwesome 
                          name='angle-right'
                          style={{fontSize: 30, color: CommonStyles.COLOR_WHITE}}
                      />
                  </Button>
                </View>
              </View>

              <Button 
                  style={styles.closeBtn}
                  onPress={() => {this._onRequestClose()} }>
                  <Text style={styles.closeText}>CLOSE</Text>
              </Button>
            </View>
          </View>
          {/**************************************** Photo Modal */}
          <PhotoModal
              showPhotoModal={this.state.isPhotoModalVisible}
              _closePhotoModal={this._closePhotoModal}
              _openCamera={this._openCamera}
              navigation = {this.props.navigation} />
           
        </GestureRecognizer>
    )
  }
}

// const modalWidth = Dimensions.get('window').width - 50;
const modalWidth = 400
const styles = StyleSheet.create({
	closeIcon: {
			alignSelf: 'flex-end',
			marginTop: -2,
			position: 'absolute',
			zIndex: 99,
			paddingRight: 15,
	},
	header: {
			flexDirection: 'row',
	},
	headerImg: {
			width: 80,
			height: 50,
			alignSelf: 'center',
			resizeMode: Image.resizeMode.contain,
	},
	headerDetail: {
			marginLeft: 10,
			flexDirection: 'column',
	},
	headerPhoto: {

	},
	detail: {
			marginTop: 20,
			flexDirection: 'column',
	},
	readingDetail: {
			flexDirection: 'row',
			alignSelf: 'center',
	},
	readingInput: {
			width: 130,
			backgroundColor: CommonStyles.COLOR_GREY,
			height: 42,
			paddingLeft: 10,
			borderTopLeftRadius: 5,
			borderBottomLeftRadius: 5,
			textAlign: 'center',
			color: CommonStyles.COLOR_BLACK,
			fontSize: CommonStyles.FONT_SIZE_BIGGER_REGULAR,
	},
	percentageInput: {
			width: 70,
			//backgroundColor: CommonStyles.COLOR_GREEN,
			height: 42,
			borderTopRightRadius: 5,
			borderBottomRightRadius: 5,
			textAlign: 'center',
			color: CommonStyles.COLOR_BLACK,
			// fontWeight: 'bold',
			fontSize: CommonStyles.FONT_SIZE_BIGGER_REGULAR,
	},
	toolWarningText: {
			marginTop: 15,
			width: 270,
			height: 60,
			alignSelf: 'center',
	},
	toolImg: {
			marginTop: 15,
			width: 270,
			height: 100,
			alignSelf: 'center',
			resizeMode: Image.resizeMode.contain
	},
	tools: {
			marginTop: 15,
			flexDirection: 'row',
			alignSelf: 'center',
	},
	radioGroup: {
			flexDirection: 'row',
			marginRight: 10,
	},
	radioBtn: {
			
	},
	radioText: {
			marginLeft: 10,
			alignSelf: 'center',
	},
	comment: {
		width: '90%',
		marginTop: 15,
		alignSelf: 'center',
	},
	commentInput: {
		backgroundColor: CommonStyles.COLOR_GREY,
		height: 100,
		justifyContent: 'center',
		borderRadius: 5,
		color: CommonStyles.COLOR_BLACK
	},

	footerGroup: {
			flex: 1,
			width: '95%',
			flexDirection: 'row',
			marginBottom: 15,
			alignSelf: 'center',
	},
	hide: {
			width: 0,
			right: 0,
	},
	footerLeft: {
			flex: 1/2,
			flexDirection: 'row',
	},
			btnBack: {
					width: 145,
					// height: 50, 
					backgroundColor: CommonStyles.COLOR_RED,
					justifyContent: 'flex-start',
					paddingLeft: 15,
					alignSelf: 'center',
			},
	footerRight: {
			flex: 1/2,
			justifyContent: 'center',
	},
	btnNext: {
			width: 150,
			// height: 50,
			backgroundColor: CommonStyles.COLOR_RED,
			justifyContent: 'flex-end',
			paddingRight: 15,
			alignSelf: 'flex-end',
	},
	closeBtn: {
			marginTop: 5,
			marginBottom: 15,
			width: '95%',
			backgroundColor: CommonStyles.COLOR_DARK_GREY,
			justifyContent: 'center',
			alignSelf: 'center'
	},
	closeText: {
			color: CommonStyles.COLOR_WHITE,
			fontSize: Common.FONT_SIZE_BIGGER_REGULAR,
	},
	addRecomendsText: {
		alignSelf: 'center',
		paddingTop: 10,
		paddingBottom: 10
		},
	addRecomendsButton: {
		flex: 1,
		justifyContent: 'space-around',
		flexDirection: 'row',
		marginTop: 10,
		alignSelf: 'stretch',
		backgroundColor: CommonStyles.COLOR_GREY,
		borderRadius: 5,
	},
})

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.ComponentList.isFetching,
        currentInspection: state.InspectionList.currentInspection,
        componentList: state.ComponentList.componentList,
        selectedComponent: state.ComponentList.selectedComponent,
        selectedTestPoint: state.ComponentList.selectedTestPoint,
        localToolImg: state.ComponentList.localToolImg,
        jobsiteData: state.Jobsite,
        dealershipLimits: state.ComponentList.dealershipLimits,
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        fetchComponentList: (inspectionId) => { dispatch(fetchComponentList(inspectionId)); },
        selectTool: (value) => { dispatch(selectTool(value)); },
        updateComment: (value) => { dispatch(updateComment(value)); },
        updateReading: (reading, worn) => { dispatch(updateReading(reading, worn)); },
        getTestPoint: (value) => { dispatch(getTestPoint(value)); },
        getLocalToolImg: (value) => { dispatch(getLocalToolImg(value)); },
        selectComponent: (item) => { dispatch(selectComponent(item)); },
        closePhotoModal: () => { dispatch(closePhotoModal()); },
        openPhotoModal: (value) => { dispatch(openPhotoModal(value)); },
        changesComponentList: (old, sel) => { dispatch(changesComponentList(old, sel)); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentInspection)

