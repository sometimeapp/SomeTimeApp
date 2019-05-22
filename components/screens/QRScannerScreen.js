import React from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Auth } from 'aws-amplify'

export default class QRScannerScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        userID: ''
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

        let userID = await this.getId();
        this.setState({
            userID: userID
        });
    }

    getId = async () => {
        try {
            let user = await Auth.currentAuthenticatedUser();
            userID = await user.attributes.sub;
            return userID;
        } catch (error) {
            console.log(error);
        }
    }

    parseAndValidateJSON = (str) => {
        //check for falsy input values
        if (!(!!str)) return false;
        //check that input is a string
        if (typeof (str) !== 'string') return false;

        let json;
        try {
            json = JSON.parse(str)
        } catch (e) {
            return false;
        }
        //once parsed, check that it is NOT an array
        if (json instanceof Array) {
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

        if (!data || (!data.screen && !data.promisorID)) {  //if data is invalid or it is not a valid promise
            title = 'Error!';
            message = 'Invalid QR Code'
            btn1Text = 'Scan again',
                btn2Text = 'Cancel'
            btn1PressAction = () => this.setState({ scanned: false });
        } else if (!data.terms) { //if the data is valid, but there are no promise terms specified
            title = 'Alert!'
            message = 'Pledge terms are blank -- cannot be accepted';
            btn1Text = 'Scan again',
                btn2Text = 'Cancel',
                btn1PressAction = () => this.setState({ scanned: false });
        } else if (data.screen) { //if the 'screen' attribute is present, this is a pledge submitted for resolution
            if (data.promiseeId !== this.state.userID) { //if this pledge doesn't belong to you....
                title = 'Alert!'
                message = 'It looks like this pledge does not belong to you!'
                btn1Text = 'Scan again';
                btn2Text = 'Cancel';
                btn1PressAction = () => this.setState({ scanned: false });
            } else {
                title = 'Resolve?'
                message = `${data.promisorFirstName} claims to have resolved a pledge.`
                btn1Text = 'Review';
                btn2Text = 'Dismiss';
                btn1PressAction = () => this.props.navigation.navigate('ResolveReview', data);
            }

        } else {
            title = 'Pledge Received'
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
            { cancelable: false },
        );
    }

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return (
                <View style={{
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}>
                    <ActivityIndicator
                        size='large'
                    />
                    <Text style={{
                        color: 'white',
                        fontSize: 20
                    }}> Waiting for camera...
                    </Text>
                </View>
            )
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        );
    }
}