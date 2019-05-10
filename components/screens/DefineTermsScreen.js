import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import { Input } from 'native-base';
import { Auth } from 'aws-amplify';
import moment from 'moment';

import StaticTermsIcons from '../screenComponents/StaticTermsIcons'

export default class DefineTermsScreen extends React.Component {


    state = {
        promisorID: '',
        promisorFirstName: '',
        promisorLastName: '',
        date: moment(),
        dueDate: moment().add(3, 'd'),
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

                <View style={styles.introContainer}>
                    <Text style={styles.introText}>I promise...</Text>
                </View>

                <View style={styles.termsBoxContainer}>
                    <View style={styles.termsBox}>
                        <Text style={styles.termsBoxText}>{this.state.terms || "(something)"}</Text>
                    </View>
                </View>

                <View style={styles.staticTermsContainer}>
                    <StaticTermsIcons />
                </View>

                <View style={styles.durationTextContainer}>
                    <Text style={styles.durationText}>within...</Text>
                </View>

                <View style={styles.durationBoxContainer}>

                    <View style={styles.durationRowBox}>

                        <View style={styles.durationBox}>
                            <Text style={styles.durationNumber}>3</Text>
                        </View>
                        <View style={styles.durationView}>
                            <Text style={styles.durationText}>days</Text>
                        </View>
                        

                    </View>

                </View>


                <View style={styles.sliderContainer}>
                    <Text>Placeholder for slider</Text>
                </View>


                <View style={styles.buttonContainer}>
                    <View style={{ margin: 5 }}>
                        <Button

                            title="Cancel"
                            onPress={() => this.props.navigation.navigate('Home')}
                        />
                    </View>
                    <View style={{ margin: 5 }}>
                        <Button

                            title="Seal the Deal"
                            onPress={() => this.props.navigation.navigate('MakeQR', this.state)}
                        />
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        // alignItems: 'center',
        // textAlign: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#ffffff',
    },
    introContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "skyblue"
    },
    introText: {
        fontSize: 32
    },
    termsBoxContainer: {
        flex: 3,
        // backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"

    },
    termsBox: {
        borderWidth: 2.5,
        position: "absolute", 
        height: "90%", 
        width: "50%",
        alignItems: "center",
        justifyContent: "center", 

    },
    termsBoxText: {
        fontSize: 32
    },

    staticTermsContainer: {
        flex: 1,
        // backgroundColor: "aqua",
        alignItems: "center",
        justifyContent: "center", 
    },
    durationTextContainer: {
        flex: 1,
        // backgroundColor: "lime",
        alignItems: "center",
        justifyContent: "center", 

    },
    durationText: {
        fontSize: 32
    },
    durationView: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
    },
    durationBoxContainer: {
        flex: 2,
        backgroundColor: "silver"
    },
    durationRowBox: {
        flex: 1,
        flexDirection: "row"
    },
    durationBox: {
        flex: 1,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    durationNumber: {
        fontSize: 40
    },
    sliderContainer: {
        flex: 1,
        backgroundColor: "fuchsia"

    },

    input: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#5a52a5',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "yellow"
    },
});
