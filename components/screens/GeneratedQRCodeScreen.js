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
        dummyData: {
            promiserID: '',
            promiseeID: '567890987656789ghjkljhghjfd',
            status: 'pending',
            terms: 'Beer',
            date: new Date()
        }
    }

    getId = async () => {
        let userID;
        Auth.currentAuthenticatedUser()
        .then(user => userID = user.CognitoUser.attributes.sub)
        return userID;
    }

    componentDidMount() {
        let promiserID = getId();
        this.setState({promiseeID: promiserID});
    }   



    render() {
        const { dummyData } = this.state;
        return (
            <View style={styles.container}>
                <QRCode
                    value={dummyData}
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