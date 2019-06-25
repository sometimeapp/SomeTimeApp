'use strict';

import React from 'react';
import {
  Text,
  StyleSheet,

} from 'react-native';

class AppText extends React.Component{

    render() {
        return (
            <Text style={[styles.defaultStyle, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }

}

const styles = StyleSheet.create({
    defaultStyle: {
        fontFamily: 'roboto',
        color: 'red'
    }
})

export default AppText