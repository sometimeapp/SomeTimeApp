import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Auth } from 'aws-amplify'


export default class QRScannerScreen extends React.Component {
    state = {
        hasCameraPermission: null,
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                <BarCodeScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}
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
        //alert(`Bar code with type ${type} and data is ${typeof data} `);
        data = this.parseAndValidateJSON(data);
        if(!data || !data.promisorID) {
            this.props.navigation.navigate('Home');
            
        } else if(!data.terms) {
            alert("cannot accept a promise with empty terms");
            this.props.navigation.navigate('Home');
        } else if(data.screen) {
            this.props.navigation.navigate('ResolveReview', data);
        } else {
            this.props.navigation.navigate('Review', data);
        }
    }
}