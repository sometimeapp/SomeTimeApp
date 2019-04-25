import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
    View,
    StyleSheet
} from 'react-native';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

export default class GeneratedQRCodeScreen extends React.Component {

    state = {
            promisorID: '',
            promiseeID: '567890987656789ghjkljhghjfd',
            status: 'pending',
            terms: 'Beer',
            date: new Date()
        }

    getId = async () => {
        let user = await Auth.currentAuthenticatedUser()
        let userID = await user.attributes.sub
        console.log(userID)
        return userID;
    }

    async componentDidMount() {
        let promisorID = await this.getId();
        this.setState({promisorID: promisorID});
        console.log('I should have been bound by now ' + this.state.promisorID)
    }   



    render() {
        return (
            <View style={styles.container}>
                <QRCode
                    value={JSON.stringify(this.state)}
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