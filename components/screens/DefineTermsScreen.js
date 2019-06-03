import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
    Platform,
    TextInput,
} from 'react-native';

import { Icon } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import moment from 'moment';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

import StaticTermsIcons from '../screenComponents/StaticTermsIcons';
import { twoWayIconDict } from '../../constants/iconInfo';

var buttonFontSize = 16;
if (PixelRatio.get() <= 2) {
    buttonFontSize = 12;
}

export default class DefineTermsScreen extends React.Component {

    state = {
        promisorID: '',
        promisorFirstName: '',
        promisorLastName: '',
        duration: 3,
        terms: '',
        otherSelected: false,
        inputHasFocus: false
    }

    static navigationOptions = {
        headerTitle: 'Terms',
        headerStyle: {
            backgroundColor: Colors.sometimeHeader
        },
        headerTintColor: Colors.sometimeSecondaryText
    };

    async componentDidMount() {
        let userInfo = await this.getId();
        this.setState({
            promisorID: userInfo.userID,
            promisorFirstName: userInfo.firstName,
            promisorLastName: userInfo.lastName,
        });
    }

    getId = async () => {
        try {
            let userInfo = {};
            let user = await Auth.currentAuthenticatedUser()
            userInfo.userID = await user.attributes.sub;
            userInfo.firstName = await user.attributes.name;
            userInfo.lastName = await user.attributes.family_name;
            return userInfo;
        } catch (error) {
            console.log(error);
        }
    }

    onChangeTerms = (value) => {
        this.setState({ terms: value })
    }

    onChangeDuration = (value) => {
        this.setState({ duration: value })
    }

    setStaticPledge = (value) => {
        value === 'other' ?
            this.setState({ terms: value, otherSelected: true })
            :
            this.setState({ terms: value, otherSelected: false });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.introContainer}>
                    <Text style={styles.introText}>I pledge...</Text>
                </View>

                <View style={styles.termsBoxContainer}>
                    <View style={styles.termsBox}>
                        {
                            this.state.otherSelected ?
                                (

                                    <View>
                                        {!this.state.inputHasFocus && <Text style={{ marginBottom: 10 }}>(Enter custom pledge)</Text>}

                                        <TextInput
                                            style={{ fontSize: 22, color: Colors.sometimePrimary }}
                                            placeholder="  touch here"
                                            placeholderTextColor="#888888"
                                            onChangeText={text => this.setState({ terms: text })}
                                            multiline={true}
                                            maxLength={50}
                                            onFocus={() => this.setState({ inputHasFocus: true })}
                                        />

                                    </View>
                                ) :
                                (
                                    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                                        <Icon
                                            name={twoWayIconDict.revGet(this.state.terms)}
                                            type='material-community'
                                            size={75}
                                        />
                                        <Text style={styles.termsBoxText}>{this.state.terms || "(choose)"}</Text>
                                    </View>
                                )
                        }

                    </View>
                </View>

                <View style={styles.staticTermsContainer}>
                    <StaticTermsIcons
                        handleTouch={value => this.setStaticPledge(value)}
                    />
                </View>

                <View style={styles.durationColumnBox}>
                    <Text style={{ fontSize: 28 }}>within   <Text style={{ fontSize: 32, color: Colors.sometimePrimary }}>{this.state.duration}</Text>   {this.state.duration < 2 ? 'day' : 'days'}</Text>
                </View>

                <View style={styles.sliderContainer}>
                    <Slider
                        style={[{ marginLeft: 20, marginRight: 20 }, {
                            transform: [
                                { scaleX: 1.5 }, { scaleY: 1.5 }
                            ]
                        }, { width: Dimensions.get('window').width / 1.5 }, { alignSelf: 'center' }
                        ]}
                        minimumValue={1}
                        maximumValue={90}
                        minimumTrackTintColor={Colors.sometimePrimary}
                        maximumTrackTintColor={Colors.sometimePrimary}
                        step={1}
                        value={3}
                        onValueChange={value => this.onChangeDuration(value)}
                        thumbTintColor={Colors.sometimeHeader}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonRowContainer}>
                        <View style={styles.signInButtonView}>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: Colors.sometimeSecondary }}
                                onPress={() => this.props.navigation.navigate('Home')}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signUpButtonView}>
                            <TouchableOpacity
                                style={{ ...styles.button, backgroundColor: Colors.sometimeTertiary }}
                                onPress={() => {
                                    let today = moment();
                                    let future = today.clone().add(this.state.duration, 'd');
                                    this.props.navigation.navigate('MakeQR', { ...this.state, promiseDate: today, promiseDueDate: future })
                                }
                                }>
                                <Text style={styles.buttonText}>Seal the Deal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.sometimeBackground
    },
    introContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    introText: {
        fontSize: 32
    },
    termsBoxContainer: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    termsBox: {
        borderRadius: 5,
        backgroundColor: Colors.sometimeSecondaryText,
        position: "absolute",
        height: "90%",
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
    },
    termsBoxText: {
        fontSize: 22,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        color: Colors.sometimePrimary
    },

    staticTermsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    durationColumnBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    sliderContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    buttonsContainer: {
        flex: 2,
    },
    buttonRowContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
    signUpButtonView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    signInButtonView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
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
    },

});
