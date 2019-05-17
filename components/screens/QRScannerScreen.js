import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { BarCodeScanner, Permissions, Constants } from 'expo';
import { Auth } from 'aws-amplify'


export default class QRScannerScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <BarCodeScanner
                    onBarCodeScanned={ scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        );
    }

    parseAndValidateJSON = (str) => {
        //check for null input
        if (!(!!str)) return false;
        //check that input is a string
        if( typeof( str ) !== 'string' ) return false; 

        let json;
        try {
            json = JSON.parse(str)
        } catch (e) {
            return false;
        }
        //once parsed, check that it is NOT an array
        if( json instanceof Array ){
            console.log("array");
            return false;
        } 

        return json;
    }

    handleBarCodeScanned = ({ type, data }) => {
        //alert variables
        let title, message, btn1Text, btn2Text, btn1PressAction;
        
        //set scanned to 'true' to stop continuous scanning
        this.setState({ scanned: true });

        //parse scanned data to make sure its valid JSON
        data = this.parseAndValidateJSON(data);

        if(!data || !data.promisorID) {  //if data is invalid, or is not a promise object
            title = 'Error!';
            message = 'Invalid QR Code'
            btn1Text = 'Scan again',
            btn2Text = 'cancel'
            btn1PressAction = () => this.setState({scanned: false});
        } else if(!data.terms) { //if the data is valid, but there are no promise terms specified
            title = 'Alert!'
            message = 'Pledge terms are blank -- cannot be accepted';
            btn1Text = 'Scan again',
            btn2Text = 'cancel',
            btn1PressAction = () => this.setState({scanned: false});
        } else if(data.screen) { //if the 'screen' attribute is present, this is a pledge submitted for resolution
            title = 'Resolve?'
            message = `${data.promisorFirstName} claims to have resolved a pledge.`
            btn1Text = 'Review';
            btn2Text = 'Dismiss';
            btn1PressAction = () => this.props.navigation.navigate('ResolveReview', data);
        } else {
            title = 'Plege Received'
            message = `${data.promisorFirstName} has made a pledge.`
            btn1Text = 'Review terms';
            btn2Text = 'Dismiss';
            btn1PressAction = () => this.props.navigation.navigate('Review', data);
        }

        Alert.alert(
            title,
            message,
            [
              {
                text: btn1Text, 
                onPress: () => btn1PressAction()
              },
              {
                text: btn2Text,
                onPress: () => this.props.navigation.navigate('Home'),
                style: 'cancel',
              }
            ],
            {cancelable: false},
          );
    }
}