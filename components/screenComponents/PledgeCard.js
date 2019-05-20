import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import { iconDict, twoWayIconDict } from '../../constants/iconInfo';

export default class PledgeCard extends React.Component {


    render() {
        console.log("pledge is...")
        console.log(this.props.pledge);
        console.log(twoWayIconDict.get(this.props.pledge.terms));
        const { pledgeStatus } = this.props.pledge;
        return (
            <View style={styles.container} >
                <View style={pledgeStatus === 'resolved' ? {...styles.card, backgroundColor: '#d3d3d3'} : {...styles.card}}>

                    <View style={styles.imageContainer}>
                        <Icon
                            name={twoWayIconDict.revGet(this.props.pledge.terms) || "asterisk"}
                            type="font-awesome"
                            size={52}
                        />
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.promiseeNameContainer}>
                            <Text style={{ fontSize: 20 }}>
                                {this.props.screen === 'PledgesMade' ?
                                    `${this.props.pledge.promiseeFirstName} ${this.props.pledge.promiseeLastName}`
                                    : `${this.props.pledge.promisorFirstName} ${this.props.pledge.promisorLastName}`}
                            </Text>
                        </View>

                        <View style={styles.detailContainerContainer}>
                            <View style={styles.promiseDetailsHeadingsContainer}>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.headingText}>Made:</Text>
                                </View>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.headingText}>Due:</Text>
                                </View>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.headingText}>Status:</Text>
                                </View>
                            </View>

                            <View style={styles.promiseDetailsContainer}>
                                <View style={styles.detailContainer}>
                                    <Text>{moment(this.props.pledge.promiseDate).format('MMM Do YYYY')}</Text>
                                </View>
                                <View style={styles.detailContainer}>
                                    <Text>{moment(this.props.pledge.promiseDueDate).format('MMM Do YYYY')}</Text>
                                </View>
                                <View style={styles.detailContainer}>
                                    <Text>{this.props.pledge.pledgeStatus}</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                    <View style={styles.arrowContainer}>
                        <Icon
                            name='angle-right'
                            type='font-awesome'
                            size={60}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    card: {
        flex: 1,
        flexDirection: "row",
        height: 150,
        borderWidth: 3,
        borderRadius: 10,
        margin: 10
    },
    imageContainer: {
        flex: 2,
        //backgroundColor: "red",

        justifyContent: "center",
        alignItems: "center"
    },
    infoContainer: {
        flex: 6,
        //backgroundColor: "green",

    },
    arrowContainer: {
        flex: 1,
        //backgroundColor: "blue",

        justifyContent: "center",
        alignItems: "center"
    },
    promiseeNameContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    promiseDetailsContainer: {
        flex: 3,
        flexDirection: "column",
        //backgroundColor: "pink",
    },
    promiseDetailsHeadingsContainer: {
        flex: 1,
        flexDirection: "column"
    },
    headingContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    detailContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    detailContainerContainer: {
        flex: 3,
        flexDirection: "row",
        //backgroundColor: "lime"
    },
    headingText: {
        fontWeight: "bold"
    }

});