import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

const emojiDictionary = {
    "☕" : "a coffee",
    "🍸" : "a drink",
    "🍴" : "a meal",
    "🚘" : "a ride", 
    "🤙" : "to hang out"
}

export default class StaticTermsIcons extends React.Component {

    render() {
        return (
            <View style={styles.rowContainer}>

                <TouchableOpacity style={ styles.itemContainer} onPress={ () => this.props.handleTouch(emojiDictionary["☕"]) }>
                    <Text style={styles.emoji}>☕</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={ () => this.props.handleTouch(emojiDictionary["🍸"]) }>
                    <Text style={styles.emoji}>🍸</Text>
                </TouchableOpacity>          
                <TouchableOpacity style={styles.itemContainer} onPress={ () => this.props.handleTouch(emojiDictionary["🍴"]) }>
                    <Text style={styles.emoji}>🍴</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={ () => this.props.handleTouch(emojiDictionary["🚘"]) }>
                    <Text style={styles.emoji}>🚘</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={ () => this.props.handleTouch(emojiDictionary["🤙"]) }>
                    <Text style={styles.emoji}>🤙</Text>
                </TouchableOpacity>
    
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
