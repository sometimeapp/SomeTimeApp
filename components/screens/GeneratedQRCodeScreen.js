import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
    View,
    StyleSheet,
    Button
} from 'react-native';
import { Auth } from 'aws-amplify';

export default class GeneratedQRCodeScreen extends React.Component {

    render() {
        console.log()
        return (
            <View style={styles.container}>
                <QRCode
                    value={JSON.stringify(this.props.navigation.state.params)}
                    size={250}
                />
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Home"
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
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
    }
})