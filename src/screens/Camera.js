import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FileSystem, Camera, Permissions } from 'expo';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { takePhoto /*, equipmentPhoto */ } from '../redux/actions/TakePhoto';
import CommonStyles from '../styles/Common'

// My components
import { Back, Flip, TakePhoto } from "../components/camera"

// My classes
import Util from "../config/Util";
import PhotoManager from "../business/PhotoManager";

class CameraScreen extends React.Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        photoPath: '',
    };

    componentDidMount() {
        // await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory 
        //     + Util.ConstantHelper.photo_save_folder)
        //     .then()
        //     .catch(
        //     (error)=>{}
        // )

        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory 
            + Util.ConstantHelper.photo_save_folder
            + '/'
            + this.props.currentInspection.id)
            .then()
            .catch(
                (error)=>{}
            )
    }

    async componentWillMount() {
        
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        // console.log('willmount ', status);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    // async componentDidUpdate() {
    //     console.log('willUpdate', this.state.hasCameraPermission);
    //     if(!this.state.hasCameraPermission) {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //     this.setState({ hasCameraPermission: status === 'granted' });
    //     }
    // }
    _onFlip = () => {
        // console.log('Flip camera...');
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
            });
    }

    _takePicture = () => {
        // console.log('Take picture');
        if (this.camera) {
            this.camera.takePictureAsync({ onPictureSaved: this._onSavePicture });
        }
    }

    _onSavePicture = (photo) => {
        // console.log('Saving picture...' + photo.uri);
        PhotoManager.savePhoto(this.props.currentInspection.id, photo)
        .then((response) => {
            
           // console.log(response);
            this.setState({
                photoPath:response
            });

            // Save redux
            this.props.takePhoto(response)
    
            this._navigateBack();
        });
    }

    _navigateBack = () => {
        // console.log('Navigating back...' + this.props.navigation.state.params.previousRoute);
        let previousRoute = this.props.navigation.state.params.previousRoute;
        let params = { 
            photoPath: this.state.photoPath,
        }
        // if(previousRoute === 'UCEquipDetail') {
        //   this.props.equipmentPhoto(this.state.photoPath);
        // }
        this.props.navigation.navigate(previousRoute, params)
    }

    _cancel = () => {
        let previousRoute = this.props.navigation.state.params.previousRoute;
        let params = { 
            photoPath: '',
        }
        this.props.navigation.navigate(previousRoute, params)
    }

    render() {

        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            // console.log('No permission');
            return <View />;
        } else if (hasCameraPermission === false) {
            // console.log('No permission');
            return (
            <View style={{marginTop: 50, alignItems: 'center' }}> 
              <Text style={{color: 'red', fontSize: 20, paddingBottom: 10}}>No access to camera</Text>
              <Text style={{ paddingHorizontal: 5 }}>If you want use camera make sure give a permission to Undercarriage app for access device camera to take a photos. So, please uninstall Undercarriage app and install back again to allow camera operation.</Text>
            
              <View style={{alignItems: 'center'}}>
                <Button 
                    style={styles.addBtn}
                    onPress={() => {this.props.navigation.popToTop()} }>
                    <Text style={styles.addText}>Back to previous screen</Text>
                                                
                </Button>
              </View>
            </View>);
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera 
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{ flex: 1 }} type={this.state.type}>
                    </Camera>
                    <View style={styles.bottomBar}>
                        <View style={styles.left}>
                            <Back onPress={this._cancel} />
                        </View>
                        <View style={styles.middle}>
                            <TakePhoto onPress={this._takePicture} />
                        </View>
                        <View style={styles.right}>
                            {/* <Flip onPress={this._onFlip} /> */}
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const modalWidth = 360;
const styles = StyleSheet.create({
    bottomBar: {
        width: '100%',
        height: 60,
        backgroundColor: CommonStyles.COLOR_WHITE,
        flexDirection: 'row',
    },
        left: {
            flex: 1/3,
        },
        middle: {
            flex: 1/3,
            alignItems: 'center',
            justifyContent: 'center',
        },
        right: {
            flex: 1/3,
        },
        addBtn: {
            backgroundColor: CommonStyles.COLOR_RED,
            justifyContent: 'center',
            marginTop: 50,
        },
        addText: {
            color: CommonStyles.COLOR_WHITE,
            // fontWeight: 'bold',
            fontSize: CommonStyles.FONT_SIZE_BIGGER_REGULAR,
            paddingHorizontal: 20,
        },
})

const mapStateToProps = (state, ownProps) => {
    return {
        currentInspection: state.InspectionList.currentInspection,
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        takePhoto: (filePath) => { dispatch(takePhoto(filePath)); },
       // equipmentPhoto: (filePath) => { dispatch(equipmentPhoto(filePath));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);