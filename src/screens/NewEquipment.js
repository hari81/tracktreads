import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Icon, Container, Drawer, Content, Item, Input, Spinner, Card, Toast } from 'native-base';
import SQLiteManager from '../database/SQLiteManager';
import CommonStyles from '../styles/Common';


const styles = StyleSheet.create({
  btnAddEquipment: {
      marginTop: 50,
      height: 40,
      width: '90%',
      backgroundColor: CommonStyles.COLOR_RED,
      justifyContent: 'center',
      alignSelf: 'center',
  },
});

export default class NewEquipment extends Component {
  static navigationOptions = {
    title: 'New Equiptment Details',
    headerStyle: {
      backgroundColor: CommonStyles.COLOR_RED,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  state = {
    customer: '',
    jobSite: '',
    model: '',
    serialNo: '',
    unitNo: ''
  }

  addEquipment() {
    if(!this.state.unitNo) {
      Alert.alert('Please enter model');
      return;
    }
    SQLiteManager.selectSequence('EQUIPMENTS').then(res => {
      const newEquipObj = {
        id: res.length === 0 ? 1 : res[0].seq, // is coming from seq
        jobSiteAuto: 0,
        serialNo: this.state.serialNo,
        unitNo: this.state.unitNo,          
        model: this.state.model,
        customer: this.state.customer,
        jobSite: this.state.jobSite,
      };
      SQLiteManager.insertNewEquipmentRecord(newEquipObj);
      // console.log('adding new Equipment');
      // return Toast.show({
      //   text: 'Equipment Added, Please select Components',
      //   buttonText: 'Okay'
      // });
      this.props.navigation.navigate('ComponentSelect', { equipId: res.length === 0 ? 1 : res[0].seq });
    })
    .catch(e => {
      console.log(e);
    });
  }
	render() {
		return (
      <Container style={{backgroundColor: CommonStyles.COLOR_WHITE, padding: 10}}>
      
      <Content>
        <Item success>
          <Input placeholder='Customer' value={this.state.customer}
            onChangeText={(text) => this.setState({customer: text})}
            returnKeyType='done'
            onKeyPress={(e) => {
              if (e.nativeEvent.key === 'Enter') {
                  Keyboard.dismiss();
              }
            }}
          />
        </Item>
        <Item success>
          <Input placeholder='Jobsite' value={this.state.jobSite}
            onChangeText={(text) => this.setState({jobSite: text})}
            returnKeyType='done'
            onKeyPress={(e) => {
              if (e.nativeEvent.key === 'Enter') {
                  Keyboard.dismiss();
              }
            }}
        />
        </Item>
        <Item success>
          <Input placeholder='Model' value={this.state.model}
            onChangeText={(text) => this.setState({model: text})}
            returnKeyType='done'
            onKeyPress={(e) => {
              if (e.nativeEvent.key === 'Enter') {
                  Keyboard.dismiss();
              }
            }}
        />
        </Item>
        <Item success>
          <Input placeholder='Serial Number' value={this.state.serialNo}
            onChangeText={(text) => this.setState({serialNo: text})}
            returnKeyType='done'
            onKeyPress={(e) => {
              if (e.nativeEvent.key === 'Enter') {
                  Keyboard.dismiss();
              }
            }}
        />
        </Item>
        <Item success>
          <Input placeholder='Unit Number' value={this.state.unitNo}
            onChangeText={(text) => this.setState({unitNo: text})}
            returnKeyType='done'
            onKeyPress={(e) => {
              if (e.nativeEvent.key === 'Enter') {
                  Keyboard.dismiss();
              }
            }}
        />
        </Item>
        <Button
          style={styles.btnAddEquipment}
          onPress={() => this.addEquipment()}>
          <Text style={{color:CommonStyles.COLOR_WHITE, fontSize: 18}}>ADD EQUIPMENT</Text>
        </Button>
        <Text style={{color: 'red', fontSize: 25, textAlign: 'center', paddingTop: 30}}> NOTE! </Text>
        <Text style={{ color: CommonStyles.COLOR_DARK_GREY, fontSize: 18, textAlign: 'center' }}>
          Rope Shovels must be setup on the web application and cannot be setup here!
        </Text>
      </Content>
    </Container>
		);
	}
}
