import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button, 
    Slider, 
    TouchableOpacity
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
        duration: 3,
        // date: moment(),
        // dueDate: moment().add(3, 'd'),
        terms: ''
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


    onChangeTerms = (value) => {
        this.setState({ terms: value })
    }

    onChangeDuration = (value) => {
        this.setState({duration: value})
    }

    setStaticPledge = (value) => {
        this.setState({terms : value})
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.introContainer}>
                    <Text style={styles.introText}>I promise...</Text>
                </View>

                <View style={styles.termsBoxContainer}>
                    <View style={styles.termsBox}>
                        {/* <Text style={styles.termsBoxText}>{this.state.terms || "(something)"}</Text> */}
                        <Input 
                          style={styles.termsBoxText}
                          placeholder="(something...)"
                          value={this.state.terms}
                          onChangeText={text => this.setState({terms: text})}
                          multiline={true}
                          maxLength={50}
                        />
                    </View>
                </View>

                <View style={styles.staticTermsContainer}>
                    <StaticTermsIcons 
                    handleTouch={ value => this.setStaticPledge(value)}
                    />
                </View>

                <View style={styles.durationTextContainer}>
                    <Text style={styles.durationText}>within...</Text>
                </View>

                <View style={styles.durationColumnBox}>

                    <View style={styles.durationRowBox}>

                        <View style={styles.durationBorderBox}>
                            <View style={styles.durationRow}>
                                <Text style={styles.durationNumber}>{this.state.duration}</Text>
                            </View>
                        </View>

                        <View style={styles.durationUnitsRow}>
                            <Text style={styles.durationText}>{this.state.duration < 2 ? 'day' : 'days'}</Text>
                        </View>
        
                    </View>

                </View>


                <View style={styles.sliderContainer}>
                    <Slider
                    style={{marginLeft: 10, marginRight: 10}}
                    minimumValue={1}
                    maximumValue={90}
                    minimumTrackTintColor="#1EB1FC"
                    maximumTractTintColor="#1EB1FC" 
                    step={1}
                    value={3}
                    onValueChange={ value => this.onChangeDuration(value)}

                    />
                </View>


                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonRowContainer}>
                        <View style={styles.signInButtonView}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={ () => this.props.navigation.navigate('Home') }>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signUpButtonView}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={ () => {
                                    let today = moment();
                                    let future = today.add(this.state.duration, 'd')
                                    this.props.navigation.navigate('MakeQR', {...this.state, date: today, dueDate: future}) 
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
        flex: 1
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
        borderWidth: 2.5,
        borderRadius: 10,
        position: "absolute", 
        height: "90%", 
        width: "50%",
        alignItems: "center",
        justifyContent: "center", 
    },
    termsBoxText: {
        fontSize: 22
    },

    staticTermsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center", 
    },
    durationTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center", 
    },
    durationText: {
        fontSize: 32
    },
    durationUnitsRow: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
    },
    durationColumnBox: {
        flex: 2,
    },
    durationRowBox: {
        flex: 1,
        flexDirection: "row"
    },
    durationBorderBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    durationRow: {
        borderWidth: 2.5,
        borderRadius: 10,
        position: "absolute", 
        height: "75%", 
        width: "50%",
        alignItems: "center",
        justifyContent: "center", 
    },
    durationNumber: {
        fontSize: 40
    },
    sliderContainer: {
        flex: 1,
        //backgroundColor: "fuchsia",
        justifyContent: "center",
    },
    buttonsContainer: {
        flex: 1,
      },
      buttonRowContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        //backgroundColor: "lime"
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
        backgroundColor: '#DDDDDD',
        padding: 10,
        //height: "30%",
        width: "66%",
        borderRadius: 10
      },
      buttonText: {
        fontWeight: "bold"
      },
});
