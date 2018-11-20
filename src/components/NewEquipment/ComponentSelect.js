import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, ListItem, Container, Left, Right, Content, CheckBox, Spinner } from 'native-base';
import Idler from './Idler';
import CarrierRoller from './CarrierRoller';
import TrackRoller from './TrackRoller';
import SQLiteManager from '../../database/SQLiteManager';
import CommonStyles from '../../styles/Common';


const styles = StyleSheet.create({
  btnAddComponent: {
      marginTop: 20,
      height: 40,
      width: '90%',
      backgroundColor: CommonStyles.COLOR_RED,
      justifyContent: 'center',
      alignSelf: 'center',
  },
});

export default class ComponentSelect extends Component {
  static navigationOptions = {
    title: 'Adding new Component Details',
    headerLeft: null,
    headerStyle: {
      backgroundColor: CommonStyles.COLOR_RED,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  state = {
   link: true,
   bushing: true,
   shoe: true,
   idler: { front: true, rear: false },
   sprocket: true,
   carrierRoller: {first: true, second: false, third: false},
   trackRoller1: {sf: true, df: false, check: true},
   trackRoller2: {sf: true, df: false, check: true},
   trackRoller3: {sf: true, df: false, check: true},
   trackRoller4: {sf: true, df: false, check: true},
   trackRoller5: {sf: true, df: false, check: true},
   trackRoller6: {sf: true, df: false, check: true},
   trackRoller7: {sf: true, df: false, check: true},
   trackRoller8: {sf: false, df: false, check: false},
   trackRoller9: {sf: false, df: false, check: false},
   trackRoller10: {sf: false, df: false, check: false},
   trackRoller11: {sf: false, df: false, check: false},
   trackRoller12: {sf: false, df: false, check: false},
   trackRoller13: {sf: false, df: false, check: false},
   trackRoller14: {sf: false, df: false, check: false},
   trackRoller15: {sf: false, df: false, check: false},
   guard: false,
   trackElongation: false,
   inspectionId: '',
   eqNo: '',
  }
  componentDidMount() {
    SQLiteManager.selectNewEquipmentById(this.props.navigation.getParam('equipId'))
    .then(res => {

      if (res._array.length > 0) {
      this.setState({inspectionId: res._array[0].id});
      }
    });
    SQLiteManager.selectSequence('COMPONENTS').then(res => {
      const eqno = res.length > 0 ? res[0].seq : 1;
      this.setState({eqNo: eqno});
    });
  }
  addComponents() {
    // Object.values(this.state).find(key => {
    //   object[key] === value)
    // if(this.state.values.find()) {
    //   Alert.alert('Please select few components');
    //   return;
    // }
   
    // this.props.navigation.navigate('componentSelect');
    let newComp = {};
    let eqno = this.state.eqNo;
    if(this.state.link) {
      // console.log('equid ', this.props.navigation.getParam('equipId'));
      // Left side component
      newComp = {
        equipmentId: this.props.navigation.getParam('equipId'),
        tool: 'UT',
        pos: 0,
        side:'Left',
        name: 'Link',
        new: 1,
        compType: 1,
        eqNo: eqno,
      };
      SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
      // Right side component
      newComp = {
        equipmentId: this.props.navigation.getParam('equipId'),
        tool: 'UT',
        pos: 0,
        side:'Right',
        name: 'Link',
        new: 1,
        compType: 1,
        eqNo: ++eqno,
      };
      // console.log('inspectionId', this.state.inspectionId);
      SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
      // console.log('adding new left and right component');
    }
    // bushing
    if(this.state.bushing) {
      if(!this.state.link) {
        --eqno;
        console.log('inside link bush', eqno);
      }      
      // Bushing - Left side component
      // console.log('bush eqno', eqno);
      newComp = {
        equipmentId: this.props.navigation.getParam('equipId'),
        tool: 'UT',
        pos: 0,
        side:'Left',
        name: 'Bushing',
        new: 1,
        compType: 1,
        eqNo: ++eqno,
      };
      SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);

      // Right side component
      newComp = {
        equipmentId: this.props.navigation.getParam('equipId'),
        tool: 'UT',
        pos: 0,
        side:'Right',
        name: 'Bushing',
        new: 1,
        compType: 1,
        eqNo: ++eqno,
      };
      SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
      // console.log('adding new left and right component');
  }
  // shoe
  if(this.state.shoe) {
   if(!this.state.link && !this.state.bushing) {
     --eqno;
   }
    // Shoe Left side component
    newComp = {
      equipmentId: this.props.navigation.getParam('equipId'),
      tool: 'UT',
      pos: 0,
      side:'Left',
      name: 'Shoe',
      new: 1,
      compType: 1,
      eqNo: ++eqno,
    };
    SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);

    // Shoe Right side component
    newComp = {
      equipmentId: this.props.navigation.getParam('equipId'),
      tool: 'UT',
      pos: 0,
      side:'Right',
      name: 'Shoe',
      new: 1,
      compType: 1,
      eqNo: ++eqno,
    };
    SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
    // console.log('adding new left and right component');
  }
  // Idler
  if(this.state.idler.front) {
    if(!this.state.link && !this.state.bushing && !this.state.shoe) {
      --eqno;
    }
     // Idler front Left side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'DG',
       pos: 1,
       side:'Left',
       name: 'Idler Front',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
 
     // Idler front Right side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'DG',
       pos: 1,
       side:'Right',
       name: 'Idler Front',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
     // console.log('adding new left and right component');
   }
   if(this.state.idler.rear) {
    if(!this.state.link && !this.state.bushing && !this.state.shoe && !this.state.idler.front) {
      --eqno;
    }
     // Idler rear Left side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'DG',
       pos: 2,
       side:'Left',
       name: 'Idler Rear',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
 
     // Idler rear Right side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'DG',
       pos: 2,
       side:'Right',
       name: 'Idler Rear',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
     // console.log('adding new left and right component');
   }
   // Sprocket component check
   if(this.state.sprocket) {
    if(!this.state.link && !this.state.bushing && !this.state.shoe && !this.state.idler.front && !this.state.idler.rear) {
      --eqno;
    }
     // Sprocket Left side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'R',
       pos: 0,
       side: 'Left',
       name: 'Sprocket',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
 
     // Sprocket Right side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'R',
       pos: 0,
       side: 'Right',
       name: 'Sprocket',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
     // console.log('adding new Sprocket left and right component');
   }

   // Carrier Roller Components
   // first carrier roller check
   if(this.state.carrierRoller.first) {
    if(!this.state.link && !this.state.bushing && !this.state.shoe 
      && !this.state.idler.front && !this.state.idler.rear && !this.state.sprocket) {
      --eqno;
    }
     // Carrier Roller 1 Left side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'UT',
       pos: 1,
       side: 'Left',
       name: 'Carrier Roller',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
 
     // Carrier Roller 1 Right side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'UT',
       pos: 1,
       side: 'Right',
       name: 'Carrier Roller',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
     // console.log('adding new Carrier Roller 1 left and right component');
   }

   // second  carrier roller
   if(this.state.carrierRoller.second) {
    if(!this.state.link && !this.state.bushing && !this.state.shoe 
      && !this.state.idler.front && !this.state.idler.rear 
      && !this.state.sprocket && !this.state.carrierRoller.first) {
      --eqno;
    }
     // Carrier Roller 2 Left side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'UT',
       pos: 2,
       side: 'Left',
       name: 'Carrier Roller',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
 
     // Carrier Roller 2 Right side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'UT',
       pos: 2,
       side: 'Right',
       name: 'Carrier Roller',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
     // console.log('adding new Carrier Roller 2 left and right component');
   }

   // Carrier Roller 3 check
   if(this.state.carrierRoller.third) {
    if(!this.state.link && !this.state.bushing && !this.state.shoe 
      && !this.state.idler.front && !this.state.idler.rear 
      && !this.state.sprocket && !this.state.carrierRoller.first 
      && !this.state.carrierRoller.second) {
      --eqno;
    }
     // Carrier Roller 3 Left side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'UT',
       pos: 3,
       side: 'Left',
       name: 'Carrier Roller',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
 
     // Carrier Roller 3 Right side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'UT',
       pos: 3,
       side: 'Right',
       name: 'Carrier Roller',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
     // console.log('adding new Carrier Roller 3 left and right component');
   }

    // Track Roller 1 check
    if(this.state.trackRoller1.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // Track Roller 1 Left side component

       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller1.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 1,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 1 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 1,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 1 left and right component');
     }
     // Track Roller 2 check
    if(this.state.trackRoller2.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller2.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 2 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 2,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 2 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 2,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 2 left and right component');
     }
      // Track Roller 3 check
    if(this.state.trackRoller3.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller3.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 3 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 3,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 3 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 3,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 3 left and right component');
     }
      // Track Roller 4 check
    if(this.state.trackRoller4.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller4.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 4 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 4,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 4 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 4,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 4 left and right component');
     }
      // Track Roller 2 check
    if(this.state.trackRoller5.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller5.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 5 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 5,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 5 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 5,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 5 left and right component');
     }
      // Track Roller 6 check
    if(this.state.trackRoller6.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller6.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 6 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 6,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 6 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 6,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 6 left and right component');
     }
      // Track Roller 7 check
    if(this.state.trackRoller7.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller7.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 7 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 7,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 7 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 7,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 7 left and right component');
     }
      // Track Roller 8 check
    if(this.state.trackRoller8.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller8.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 8 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 8,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 8 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 8,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 8 left and right component');
     }
      // Track Roller 9 check
    if(this.state.trackRoller9.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller9.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 9 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 9,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 9 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 9,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 9 left and right component');
     }
      // Track Roller 10 check
    if(this.state.trackRoller10.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller10.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 10 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 10,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 10 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 10,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 10 left and right component');
     }
      // Track Roller 11 check
    if(this.state.trackRoller11.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller11.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 11 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 11,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 11 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 11,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 11 left and right component');
     }
      // Track Roller 12 check
    if(this.state.trackRoller12.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller12.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 12 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 12,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 12 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 12,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 12 left and right component');
     }
      // Track Roller 13 check
    if(this.state.trackRoller13.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller13.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 13 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 13,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 13 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 13,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 13 left and right component');
     }
      // Track Roller 14 check
    if(this.state.trackRoller14.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller14.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 14 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 14,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 14 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 14,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 14 left and right component');
     }
      // Track Roller 15 check
    if(this.state.trackRoller15.check) {
      if(!this.state.link && !this.state.bushing && !this.state.shoe 
        && !this.state.idler.front && !this.state.idler.rear 
        && !this.state.sprocket && !this.state.carrierRoller.first 
        && !this.state.carrierRoller.second && !this.state.carrierRoller.third) {
        --eqno;
      }
       // To find selected sf or df
       const flangeType = '';
       if(this.state.trackRoller15.sf) {
        flangeType = 'SF';
       } else {
        flangeType = 'DF';
       }
       // Track Roller 15 Left side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 15,
         side: 'Left',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
   
       // Track Roller 15 Right side component
       newComp = {
         equipmentId: this.props.navigation.getParam('equipId'),
         tool: 'UT',
         pos: 15,
         side: 'Right',
         name: 'Track Roller',
         new: 1,
         compType: 1,
         eqNo: ++eqno,
         flangeType,
       };
       SQLiteManager.insertNewTrackRollerComponent(this.state.inspectionId, newComp);
       // console.log('adding new Track Roller 15 left and right component');
     }

     // Guard component check
   if(this.state.guard) {
    if(!this.state.link && !this.state.bushing && !this.state.shoe && !this.state.idler.front && !this.state.idler.rear) {
      --eqno;
    }
     // Guard Left side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'R',
       pos: 0,
       side: 'Left',
       name: 'Guard',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
 
     // Guard Right side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'R',
       pos: 0,
       side: 'Right',
       name: 'Guard',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
     // console.log('adding new Guard left and right component');
   }

   // Track Elongation component check
   if(this.state.trackElongation) {
    if(!this.state.link && !this.state.bushing && !this.state.shoe && !this.state.idler.front && !this.state.idler.rear) {
      --eqno;
    }
     // Track Elongation Left side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'R',
       pos: 0,
       side: 'Left',
       name: 'Track Elongation',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
 
     // Track Elongation Right side component
     newComp = {
       equipmentId: this.props.navigation.getParam('equipId'),
       tool: 'R',
       pos: 0,
       side: 'Right',
       name: 'Track Elongation',
       new: 1,
       compType: 1,
       eqNo: ++eqno,
     };
     SQLiteManager.insertNewComponent(this.state.inspectionId, newComp);
     // console.log('adding new Track Elongation left and right component');
   }
   this.props.navigation.navigate('UCMain');
  }
  chPress = (rollerNo) => {
    if( rollerNo === 'trackRoller1') {
    if(this.state.trackRoller1.check) {
      this.setState({trackRoller1: { ...this.state.trackRoller1, check: !this.state.trackRoller1.check, sf: false, df: false }})
    } else {
      this.setState({trackRoller1: { ...this.state.trackRoller1, check: !this.state.trackRoller1.check, sf: true, df: false }})
    }
  }
  }
	render() {
    const {link, bushing, shoe, sprocket, guard, trackElongation } = this.state;
		return (
      <Container style={{ backgroundColor: CommonStyles.COLOR_WHITE, padding: 10}}>
        <Content>
          <ListItem style={{ paddingLeft: '20%', borderBottomWidth: 0, }}>
          <View style={{width: '40%'}}>
          <Text style={{paddingRight: 10, fontWeight: 'bold' }}>Link</Text>
          </View>
          <CheckBox checked={link} onPress={() => this.setState({link: !link})} />
          </ListItem>
          <ListItem style={{ paddingLeft: '20%', borderBottomWidth: 0, }}>
          <View style={{width: '40%'}}>
            <Text style={{ paddingRight: 10, fontWeight: 'bold' }}>Bushing</Text>
            </View>
            <CheckBox checked={bushing} onPress={() => this.setState({bushing: !bushing})} />
          </ListItem>
          <ListItem style={{ paddingLeft: '20%' }}>
          <View style={{width: '40%'}}>
            <Text style={{ paddingRight: 10, fontWeight: 'bold' }}>Shoe</Text>
            </View>
            <CheckBox checked={shoe} onPress={() => this.setState({shoe: !shoe})}/>
           
          </ListItem>
          <Idler 
            idlerFront={this.state.idler.front}
            idlerRear={this.state.idler.rear}
            idlerFrontStatus={() => this.setState({idler: { ...this.state.idler, front: !this.state.idler.front } })}
            idlerRearStatus={() => this.setState({idler: { ...this.state.idler, rear: !this.state.idler.rear } })}
          />
          <ListItem style={{ paddingLeft: '20%', borderBottomWidth: 0 }}>
            <View style={{width: '40%'}}>
            <Text style={{ paddingRight: 10, fontWeight: 'bold' }}>Sprocket</Text>
            </View>
              <CheckBox checked={sprocket} onPress={() => this.setState({sprocket: !sprocket})}/>
          </ListItem>
          <CarrierRoller
            carrier1={this.state.carrierRoller.first}
            carrier1Status={() => this.setState({carrierRoller: { ...this.state.carrierRoller, first: !this.state.carrierRoller.first }})}
            carrier2={this.state.carrierRoller.second}
            carrier2Status={() => this.setState({carrierRoller: { ...this.state.carrierRoller, second: !this.state.carrierRoller.second }})}
            carrier3={this.state.carrierRoller.third}
            carrier3Status={() => this.setState({carrierRoller: { ...this.state.carrierRoller, third: !this.state.carrierRoller.third }})}
          />
        <Content>
			    <Text style={{ fontWeight: 'bold', paddingLeft: '10%' }}>Track Roller</Text>
          <TrackRoller
            checkStatus={this.state.trackRoller1.check}
            checkpress={() => {
              if(this.state.trackRoller1.check) {
                this.setState({trackRoller1: { ...this.state.trackRoller1, check: !this.state.trackRoller1.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller1: { ...this.state.trackRoller1, check: !this.state.trackRoller1.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller1.sf}
            sfpress={() => {
              if(this.state.trackRoller1.sf === false && this.state.trackRoller1.check) {
              this.setState({trackRoller1: { ...this.state.trackRoller1, sf: !this.state.trackRoller1.sf, df: this.state.trackRoller1.sf }});
            }}
            }
            dfStatus={this.state.trackRoller1.df}
            dfpress={() => {
              if(this.state.trackRoller1.df === false && this.state.trackRoller1.check) {
              this.setState({trackRoller1: { ...this.state.trackRoller1, df: !this.state.trackRoller1.df, sf: this.state.trackRoller1.df }})
            }}
            }
            title="1"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller2.check}
            checkpress={() => {
              if(this.state.trackRoller2.check) {
                this.setState({trackRoller2: { ...this.state.trackRoller2, check: !this.state.trackRoller2.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller2: { ...this.state.trackRoller2, check: !this.state.trackRoller2.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller2.sf}
            sfpress={() => {
              if(this.state.trackRoller2.sf === false && this.state.trackRoller2.check) {
              this.setState({trackRoller2: { ...this.state.trackRoller2, sf: !this.state.trackRoller2.sf, df: this.state.trackRoller2.sf }});
            }}
            }
            dfStatus={this.state.trackRoller2.df}
            dfpress={() => {
              if(this.state.trackRoller2.df === false && this.state.trackRoller2.check) {
              this.setState({trackRoller2: { ...this.state.trackRoller2, df: !this.state.trackRoller2.df, sf: this.state.trackRoller2.df }})
            }}
            }
            title="2"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller3.check}
            checkpress={() => {
              if(this.state.trackRoller3.check) {
                this.setState({trackRoller3: { ...this.state.trackRoller3, check: !this.state.trackRoller3.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller3: { ...this.state.trackRoller3, check: !this.state.trackRoller3.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller3.sf}
            sfpress={() => {
              if(this.state.trackRoller3.sf === false && this.state.trackRoller3.check ) {
              this.setState({trackRoller3: { ...this.state.trackRoller3, sf: !this.state.trackRoller3.sf, df: this.state.trackRoller3.sf }});
            }}
            }
            dfStatus={this.state.trackRoller3.df}
            dfpress={() => {
              if(this.state.trackRoller3.df === false && this.state.trackRoller3.check) {
              this.setState({trackRoller3: { ...this.state.trackRoller3, df: !this.state.trackRoller3.df, sf: this.state.trackRoller3.df }})
            }}
            }
            title="3"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller4.check}
            checkpress={() => {
              if(this.state.trackRoller4.check) {
                this.setState({trackRoller4: { ...this.state.trackRoller4, check: !this.state.trackRoller4.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller4: { ...this.state.trackRoller4, check: !this.state.trackRoller4.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller4.sf}
            sfpress={() => {
              if(this.state.trackRoller4.sf === false && this.state.trackRoller4.check ) {
              this.setState({trackRoller4: { ...this.state.trackRoller4, sf: !this.state.trackRoller4.sf, df: this.state.trackRoller4.sf }});
            }}
            }
            dfStatus={this.state.trackRoller4.df}
            dfpress={() => {
              if(this.state.trackRoller4.df === false && this.state.trackRoller4.check) {
              this.setState({trackRoller4: { ...this.state.trackRoller4, df: !this.state.trackRoller4.df, sf: this.state.trackRoller4.df }})
            }}
            }
            title="4"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller5.check}
            checkpress={() => {
              if(this.state.trackRoller5.check) {
                this.setState({trackRoller5: { ...this.state.trackRoller5, check: !this.state.trackRoller5.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller5: { ...this.state.trackRoller5, check: !this.state.trackRoller5.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller5.sf}
            sfpress={() => {
              if(this.state.trackRoller5.sf === false && this.state.trackRoller5.check) {
              this.setState({trackRoller5: { ...this.state.trackRoller5, sf: !this.state.trackRoller5.sf, df: this.state.trackRoller5.sf }});
            }}
            }
            dfStatus={this.state.trackRoller5.df}
            dfpress={() => {
              if(this.state.trackRoller5.df === false && this.state.trackRoller5.check) {
              this.setState({trackRoller5: { ...this.state.trackRoller5, df: !this.state.trackRoller5.df, sf: this.state.trackRoller5.df }})
            }}
            }
            title="5"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller6.check}
            checkpress={() => {
              if(this.state.trackRoller6.check) {
                this.setState({trackRoller6: { ...this.state.trackRoller6, check: !this.state.trackRoller6.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller6: { ...this.state.trackRoller6, check: !this.state.trackRoller6.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller6.sf}
            sfpress={() => {
              if(this.state.trackRoller6.sf === false && this.state.trackRoller6.check) {
              this.setState({trackRoller6: { ...this.state.trackRoller6, sf: !this.state.trackRoller6.sf, df: this.state.trackRoller6.sf }});
            }}
            }
            dfStatus={this.state.trackRoller6.df}
            dfpress={() => {
              if(this.state.trackRoller6.df === false && this.state.trackRoller6.check) {
              this.setState({trackRoller6: { ...this.state.trackRoller6, df: !this.state.trackRoller6.df, sf: this.state.trackRoller6.df }})
            }}
            }
            title="6"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller7.check}
            checkpress={() => {
              if(this.state.trackRoller7.check) {
                this.setState({trackRoller7: { ...this.state.trackRoller7, check: !this.state.trackRoller7.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller7: { ...this.state.trackRoller7, check: !this.state.trackRoller7.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller7.sf}
            sfpress={() => {
              if(this.state.trackRoller7.sf === false && this.state.trackRoller7.check) {
              this.setState({trackRoller7: { ...this.state.trackRoller7, sf: !this.state.trackRoller7.sf, df: this.state.trackRoller7.sf }});
            }}
            }
            dfStatus={this.state.trackRoller7.df}
            dfpress={() => {
              if(this.state.trackRoller7.df === false && this.state.trackRoller7.check) {
              this.setState({trackRoller7: { ...this.state.trackRoller7, df: !this.state.trackRoller7.df, sf: this.state.trackRoller7.df }})
            }}
            }
            title="7"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller8.check}
            checkpress={() => {
              if(this.state.trackRoller8.check) {
                this.setState({trackRoller8: { ...this.state.trackRoller8, check: !this.state.trackRoller8.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller8: { ...this.state.trackRoller8, check: !this.state.trackRoller8.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller8.sf}
            sfpress={() => {
              if(this.state.trackRoller8.sf === false && this.state.trackRoller8.check ) {
              this.setState({trackRoller8: { ...this.state.trackRoller8, sf: !this.state.trackRoller8.sf, df: this.state.trackRoller8.sf }});
            }}
            }
            dfStatus={this.state.trackRoller8.df}
            dfpress={() => {
              if(this.state.trackRoller8.df === false && this.state.trackRoller8.check) {
              this.setState({trackRoller8: { ...this.state.trackRoller8, df: !this.state.trackRoller8.df, sf: this.state.trackRoller8.df }})
            }}
            }
            title="8"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller9.check}
            checkpress={() => {
              if(this.state.trackRoller9.check) {
                this.setState({trackRoller9: { ...this.state.trackRoller9, check: !this.state.trackRoller9.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller9: { ...this.state.trackRoller9, check: !this.state.trackRoller9.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller9.sf}
            sfpress={() => {
              if(this.state.trackRoller9.sf === false && this.state.trackRoller9.check) {
              this.setState({trackRoller9: { ...this.state.trackRoller9, sf: !this.state.trackRoller9.sf, df: this.state.trackRoller9.sf }});
            }}
            }
            dfStatus={this.state.trackRoller9.df}
            dfpress={() => {
              if(this.state.trackRoller9.df === false && this.state.trackRoller9.check) {
              this.setState({trackRoller9: { ...this.state.trackRoller9, df: !this.state.trackRoller9.df, sf: this.state.trackRoller9.df }})
            }}
            }
            title="9"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller10.check}
            checkpress={() => {
              if(this.state.trackRoller10.check) {
                this.setState({trackRoller10: { ...this.state.trackRoller10, check: !this.state.trackRoller10.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller10: { ...this.state.trackRoller10, check: !this.state.trackRoller10.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller10.sf}
            sfpress={() => {
              if(this.state.trackRoller10.sf === false && this.state.trackRoller10.check ) {
              this.setState({trackRoller10: { ...this.state.trackRoller10, sf: !this.state.trackRoller10.sf, df: this.state.trackRoller10.sf }});
            }}
            }
            dfStatus={this.state.trackRoller10.df}
            dfpress={() => {
              if(this.state.trackRoller10.df === false && this.state.trackRoller10.check) {
              this.setState({trackRoller10: { ...this.state.trackRoller10, df: !this.state.trackRoller10.df, sf: this.state.trackRoller10.df }})
            }}
            }
            title="10"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller11.check}
            checkpress={() => {
              if(this.state.trackRoller11.check) {
                this.setState({trackRoller11: { ...this.state.trackRoller11, check: !this.state.trackRoller11.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller11: { ...this.state.trackRoller11, check: !this.state.trackRoller11.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller11.sf}
            sfpress={() => {
              if(this.state.trackRoller11.sf === false && this.state.trackRoller11.check) {
              this.setState({trackRoller11: { ...this.state.trackRoller11, sf: !this.state.trackRoller11.sf, df: this.state.trackRoller11.sf }});
            }}
            }
            dfStatus={this.state.trackRoller11.df}
            dfpress={() => {
              if(this.state.trackRoller11.df === false && this.state.trackRoller11.check) {
              this.setState({trackRoller11: { ...this.state.trackRoller11, df: !this.state.trackRoller11.df, sf: this.state.trackRoller11.df }})
            }}
            }
            title="11"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller12.check}
            checkpress={() => {
              if(this.state.trackRoller12.check) {
                this.setState({trackRoller12: { ...this.state.trackRoller12, check: !this.state.trackRoller12.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller12: { ...this.state.trackRoller12, check: !this.state.trackRoller12.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller12.sf}
            sfpress={() => {
              if(this.state.trackRoller12.sf === false && this.state.trackRoller12.check) {
              this.setState({trackRoller12: { ...this.state.trackRoller12, sf: !this.state.trackRoller12.sf, df: this.state.trackRoller12.sf }});
            }}
            }
            dfStatus={this.state.trackRoller12.df}
            dfpress={() => {
              if(this.state.trackRoller12.df === false && this.state.trackRoller12.check) {
              this.setState({trackRoller12: { ...this.state.trackRoller12, df: !this.state.trackRoller12.df, sf: this.state.trackRoller12.df }})
            }}
            }
            title="12"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller13.check}
            checkpress={() => {
              if(this.state.trackRoller13.check) {
                this.setState({trackRoller13: { ...this.state.trackRoller13, check: !this.state.trackRoller13.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller13: { ...this.state.trackRoller13, check: !this.state.trackRoller13.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller13.sf}
            sfpress={() => {
              if(this.state.trackRoller13.sf === false && this.state.trackRoller13.check) {
              this.setState({trackRoller13: { ...this.state.trackRoller13, sf: !this.state.trackRoller13.sf, df: this.state.trackRoller13.sf }});
            }}
            }
            dfStatus={this.state.trackRoller13.df}
            dfpress={() => {
              if(this.state.trackRoller13.df === false && this.state.trackRoller13.check) {
              this.setState({trackRoller13: { ...this.state.trackRoller13, df: !this.state.trackRoller13.df, sf: this.state.trackRoller13.df }})
            }}
            }
            title="13"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller14.check}
            checkpress={() => {
              if(this.state.trackRoller14.check) {
                this.setState({trackRoller14: { ...this.state.trackRoller14, check: !this.state.trackRoller14.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller14: { ...this.state.trackRoller14, check: !this.state.trackRoller14.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller14.sf}
            sfpress={() => {
              if(this.state.trackRoller14.sf === false && this.state.trackRoller14.check) {
              this.setState({trackRoller14: { ...this.state.trackRoller14, sf: !this.state.trackRoller14.sf, df: this.state.trackRoller14.sf }});
            }}
            }
            dfStatus={this.state.trackRoller14.df}
            dfpress={() => {
              if(this.state.trackRoller14.df === false && this.state.trackRoller14.check) {
              this.setState({trackRoller14: { ...this.state.trackRoller14, df: !this.state.trackRoller14.df, sf: this.state.trackRoller14.df }})
            }}
            }
            title="14"
          />
          <TrackRoller
            checkStatus={this.state.trackRoller15.check}
            checkpress={() => {
              if(this.state.trackRoller15.check) {
                this.setState({trackRoller15: { ...this.state.trackRoller15, check: !this.state.trackRoller15.check, sf: false, df: false }})
              } else {
                this.setState({trackRoller15: { ...this.state.trackRoller15, check: !this.state.trackRoller15.check, sf: true, df: false }})
              }
            }}
            sfStatus={this.state.trackRoller15.sf}
            sfpress={() => {
              if(this.state.trackRoller15.sf === false && this.state.trackRoller15.check) {
              this.setState({trackRoller15: { ...this.state.trackRoller15, sf: !this.state.trackRoller15.sf, df: this.state.trackRoller15.sf }});
            }}
            }
            dfStatus={this.state.trackRoller15.df}
            dfpress={() => {
              if(this.state.trackRoller15.df === false && this.state.trackRoller15.check) {
              this.setState({trackRoller15: { ...this.state.trackRoller15, df: !this.state.trackRoller15.df, sf: this.state.trackRoller15.df }})
            }}
            }
            title="15"
          />
          </Content>
          
          <ListItem style={{ paddingLeft: '20%', borderBottomWidth: 0 }}>
            <View style={{width: '40%'}}>
            <Text style={{ paddingRight: 10, fontWeight: 'bold' }}>Guard</Text>
            </View>
              <CheckBox checked={guard} onPress={() => this.setState({guard: !guard})}/>
          </ListItem>
          <ListItem style={{ paddingLeft: '20%', borderBottomWidth: 0 }}>
            <View style={{width: '40%'}}>
            <Text style={{ paddingRight: 10, fontWeight: 'bold' }}>Track Elongation</Text>
            </View>
              <CheckBox checked={trackElongation} onPress={() => this.setState({trackElongation: !trackElongation})}/>
          </ListItem>
          <Button
            style={styles.btnAddComponent}
            onPress={() => this.addComponents()}>
            <Text style={{color:CommonStyles.COLOR_WHITE, fontSize: 18}}>SAVE/UPDATE</Text>
          </Button>
        </Content>
      </Container>
		);
	}
}
