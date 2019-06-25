import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-elements';

import { iconDict, twoWayIconDict } from '../../constants/iconInfo';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

export default class StaticTermsIcons extends React.Component {

    render() {
        return (
            <View style={styles.rowContainer}>

                {Object.keys(iconDict).map((item) => {
                    return (
                        <TouchableOpacity key={item}
                            style={styles.itemContainer}
                            onPress={() => this.props.handleTouch(twoWayIconDict.get(item))}>
                            <Icon
                                name={item}
                                type='material-community'
                                size={Layout.smallIconSize}
                                color={this.props.focusedIcon === twoWayIconDict.get(item) ? Colors.sometimePrimary : 'black'}
                            />
                        </TouchableOpacity>
                    );
                })}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: "row"
    },
    emoji: {
        fontSize: 30
    },
    itemContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
