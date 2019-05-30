import React from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Auth } from 'aws-amplify';

import Layout from '../../constants/Layout';

export default class QRScannerScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        scannerIsVisible: false,
        scanned: false,
        userID: ''
    };

    static navigationOptions = {
        header: null,
    };

    //flag to ensure loading screen renders before camera opens -- see additional comments in render
    openedOnce = false;

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

    //set opendedOnce back to false when leaving the screen
    componentWillUnmount() {
        this.openedOnce = false;
    }

    render() {
        /*
            When the screen first renders, openedOnce flag is false, and so this.state.scannerIsVisible.
            Wait 800ms, then set scannerIsVisible to true.  This allows the 'waiting for camera' view to
            render before the laggy request to open the camera is made.  Toggle openedOnce to 'true' afterward
            to prevent constant re-renders.
        */
        if (!this.openedOnce) {
            setTimeout(() => {
                this.setState({ scannerIsVisible: true });
                this.openedOnce = true;
            }, 800);
        }

        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null || !this.state.scannerIsVisible) {
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
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.topOverlay} />
                <View style={styles.leftOverlay} />
                <View style={styles.rightOverlay} />
                <View style={styles.bottomOverlay} />
                <View style={styles.topLeftCorner} />
                <View style={styles.topRightCorner} />
                <View style={styles.bottomLeftCorner} />
                <View style={styles.bottomRightCorner} />

                <View style={styles.header}>
                    <Text style={styles.headerText}>Scan Pledge Code</Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        hitSlop={{ top: 40, bottom: 40, right: 40, left: 40 }}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const BOX_MARGIN = 30;
const BOX_SIZE = Layout.window.width - BOX_MARGIN * 2;
const BOX_TOP = Layout.window.height / 2 - BOX_SIZE / 2;
const BOX_BOTTOM = BOX_TOP + BOX_SIZE;
const BOX_LEFT = BOX_MARGIN;
const BOX_RIGHT = Layout.window.width - BOX_MARGIN;

const overlayBaseStyle = {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
};

const cornerBaseStyle = {
    position: 'absolute',
    borderColor: '#fff',
    backgroundColor: 'transparent',
    borderWidth: 2,
    width: 10,
    height: 10,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    topLeftCorner: {
        ...cornerBaseStyle,
        top: BOX_TOP - 1,
        left: BOX_MARGIN - 1,
        borderBottomWidth: 0,
        borderRightWidth: 0,
    },
    topRightCorner: {
        ...cornerBaseStyle,
        top: BOX_TOP - 1,
        right: BOX_MARGIN - 1,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
    },
    bottomLeftCorner: {
        ...cornerBaseStyle,
        bottom: Layout.window.height - BOX_BOTTOM - 1,
        left: BOX_MARGIN - 1,
        borderTopWidth: 0,
        borderRightWidth: 0,
    },
    bottomRightCorner: {
        ...cornerBaseStyle,
        bottom: Layout.window.height - BOX_BOTTOM - 1,
        right: BOX_MARGIN - 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
    topOverlay: {
        ...overlayBaseStyle,
        top: 0,
        left: 0,
        right: 0,
        bottom: Layout.window.height - BOX_TOP,
    },
    leftOverlay: {
        ...overlayBaseStyle,
        top: BOX_TOP,
        left: 0,
        right: BOX_RIGHT,
        bottom: Layout.window.height - BOX_BOTTOM,
    },
    rightOverlay: {
        ...overlayBaseStyle,
        top: BOX_TOP,
        left: BOX_RIGHT,
        right: 0,
        bottom: Layout.window.height - BOX_BOTTOM,
    },
    bottomOverlay: {
        ...overlayBaseStyle,
        top: BOX_BOTTOM,
        left: 0,
        right: 0,
        bottom: 0,
    },
    header: {
        position: 'absolute',
        top: 40,
        right: 0,
        alignItems: 'flex-start',
        left: 25,
    },
    headerText: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontSize: 22,
        fontWeight: '400',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    cancelText: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center',
    },
});