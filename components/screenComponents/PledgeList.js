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

const PledgeList = (props) => {
    console.log(props);
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
              ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: "center", paddingTop: 25 }}>
                  <Text style={{ fontSize: 16, textAlign: 'center' }}>No pledges to show.</Text>
                  <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 10 }}>(Pull to refresh)</Text>
                </View>
              }
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => console.log("Pressed!")/*this.props.navigation.navigate('Details', { ...item, screen: 'made' }) */}
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