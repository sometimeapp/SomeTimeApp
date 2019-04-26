import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Auth } from 'aws-amplify'


export default class QRScannerScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        promiseeID: ''
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        
        let promiseeID = await this.getId();
        this.setState({promiseeID: promiseeID});
        console.log('I should have been bound by now ' + this.state.promiseeID)
    }

    getId = async () => {
        try {
            let user = await Auth.currentAuthenticatedUser()
            let userID = await user.attributes.sub
            console.log(userID)
            return userID;
        } catch (error) {
            console.log(error);
        }
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

    handleBarCodeScanned = ({ type, data }) => {
        //alert(`Bar code with type ${type} and data is ${typeof data} `);
        data = JSON.parse(data);
        data.promiseeID = this.state.promiseeID;
        this.props.navigation.navigate('Review', data);
    }
}