import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    PixelRatio,
    Text
} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

var buttonFontSize = 16;
if (PixelRatio.get() <= 2) {
    buttonFontSize = 12;
}

export default class GeneratedQRCodeScreen extends React.Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.sometimeHeader
        },
        headerTintColor: Colors.sometimeSecondaryText
    };

    render() {
        return (
            <View style={styles.container}>
                <QRCode
                    value={JSON.stringify(this.props.navigation.state.params)}
                    size={250}
                />
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                        style={{ ...styles.button, backgroundColor: Colors.sometimeTertiary }}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.sometimeBackground
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        height: (Layout.window.height / 15),
        width: (Layout.window.width / 3),
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    buttonText: {
        fontSize: buttonFontSize,
        fontWeight: "bold"
    }
})