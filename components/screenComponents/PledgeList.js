import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList, 
    TouchableOpacity
} from 'react-native';
import PledgeCard from './PledgeCard';

import Colors from '../../constants/Colors';

const PledgeList = (props) => {
    if (!props.pledges || props.isFetching) {
        return (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
        )
    } else {
        return (
          
          <View style={styles.container}>
            <FlatList
              data={props.pledges}
              keyExtractor={(x, i) => i.toString()}
              onRefresh={() => props.onRefresh()}
              refreshing={props.isFetching}
              contentContainerStyle={{paddingBottom: 10}}
              ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: "center", paddingTop: 25 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center' }}>No pledges to show.</Text>
                  <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 10 }}>(Pull to refresh)</Text>
                </View>
              }
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => props.navigate(item, props.routeName ) }
                  >
                    <PledgeCard
                      pledge={item}
                      screen={props.routeName} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          
        )
      }
}

const styles = StyleSheet.create({
    indicatorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    container: {
      flex: 1,
      backgroundColor: Colors.sometimeBackground
    },
    button: {
      alignItems: 'center',
      justifyContent: "center",
      backgroundColor: '#DDDDDD',
      padding: 10,
      height: "10%",
      width: "25%",
      borderRadius: 10
    },
    buttonText: {
      fontWeight: "bold"
    },
  });

export default PledgeList