import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import { Input } from 'native-base';
import { Auth } from 'aws-amplify';

export default class DefineTermsScreen extends React.Component {
    state = {
        promisorID: '',
        promisorFirstName: '',
        promisorLastName: '',
        date: new Date(),
        terms: '',
    }

    static navigationOptions = {
        headerTitle: 'Terms',
    }; 

    async componentDidMount() {
        let userInfo = await this.getId();
        this.setState({
            promisorID: userInfo.userID,
            promisorFirstName: userInfo.firstName,
            promisorLastName: userInfo.lastName,
        });
        //console.log('I should have been bound by now ' + this.state.promisorID)
    }

    getId = async () => {
        try {
            let userInfo = {};
            let user = await Auth.currentAuthenticatedUser()
            userInfo.userID = await user.attributes.sub;
            userInfo.firstName = await user.attributes.name;
            userInfo.lastName = await user.attributes.family_name;
            //console.log(user);
            return userInfo;
        } catch (error) {
            console.log(error);
        }
    }


    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to the Terms screen</Text>
                <Input
                    style={styles.input}
                    placeholder='I promise...'
                    onChangeText={value => this.onChangeText('terms', value)}
                />
                <View style={{ margin: 5 }}>
                    <Button
                        style={styles.button}
                        title="Cancel"
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                </View>
                <View style={{ margin: 5 }}>
                    <Button
                        style={styles.button}
                        title="Seal the Deal"
                        onPress={() => this.props.navigation.navigate('QR', this.state)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    input: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#5a52a5',
    },
});
