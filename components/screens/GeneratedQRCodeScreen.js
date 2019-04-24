import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
    View,
    StyleSheet
} from 'react-native';

export default class GeneratedQRCodeScreen extends React.Component {
    state = {
        dummyData: {
            promiserID: '67890876567890ghjklkjhgfyui',
            promiseeID: '567890987656789ghjkljhghjfd',
            status: 'pending',
            terms: 'Beer',
            date: new Date()
        }
    }

    render() {
        const { dummyData } = this.state;
        return (
            <View style={styles.container}>
                <QRCode
                    value={JSON.stringify(dummyData)}
                    size={250}
                />
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
    },
})