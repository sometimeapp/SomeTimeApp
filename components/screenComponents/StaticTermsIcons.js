import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class StaticTermsIcons extends React.Component {

    render() {
        return (
            <View style={styles.rowContainer}>

                <View style={styles.itemContainer}>
                    <Text style={styles.emoji}>☕</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.emoji}>🍸</Text>
                </View>          
                <View style={styles.itemContainer}>
                    <Text style={styles.emoji}>🍴</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.emoji}>🚘</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.emoji}>*️⃣</Text>
                </View>
    
            </View>
        )
    }

}

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: "row", 
        // alignItems: 'center',
        // textAlign: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#ffffff',
    }, 
    emoji: {
        fontSize: 30
    },
    itemContainer: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center"
    }
    // itemContainer2: {
    //     flex: 1,
    //     backgroundColor: "blue", 
    //     height: 75,
    //     justifyContent: "center", 
    //     alignItems: "center"
    // },
    // itemContainer3: {
    //     flex: 1,
    //     backgroundColor: "green", 
    //     height: 75,
    //     justifyContent: "center", 
    //     alignItems: "center"
    // },
    // itemContainer4: {
    //     flex: 1,
    //     backgroundColor: "silver", 
    //     height: 75,
    //     justifyContent: "center", 
    //     alignItems: "center"
    // },
    // itemContainer5: {
    //     flex: 1,
    //     backgroundColor: "orange", 
    //     height: 75,
    //     justifyContent: "center", 
    //     alignItems: "center"
    // },
});
