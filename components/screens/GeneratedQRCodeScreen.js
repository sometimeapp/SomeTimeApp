import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
    View,
    StyleSheet
} from 'react-native';
import { Auth } from 'aws-amplify';

export default class GeneratedQRCodeScreen extends React.Component {

    state = {
            promisorID: '',
            promisorFirstName: '',
            promisorLastName: '',
            status: 'pending',
            terms: 'Beer',
            date: new Date(), 
        }

    getId = async () => {
        try {
            let userInfo = {};
            let user = await Auth.currentAuthenticatedUser()
            userinfo.userID = await user.attributes.sub;
            userinfo.firstName = await user.attributes.name;
            userinfo.lastName = await user.attributes.family_name;
            //console.log(user);
            return userInfo;
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        let userInfo = await this.getId();
        this.setState({
            promisorID: userInfo.userID,
            promisorFirstName: userInfo.firstName,
            promisorLastName: userinfo.lastName,
            });
        //console.log('I should have been bound by now ' + this.state.promisorID)
    }   

    render() {
        console.log()
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