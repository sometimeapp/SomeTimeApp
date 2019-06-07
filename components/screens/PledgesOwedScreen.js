import React from 'react';

import { Auth } from 'aws-amplify';
import { getData } from '../../utilities/services';
import PledgeList from '../screenComponents/PledgeList'

export default class PledgesOwedScreen extends React.Component {

  state = {
    pledgesOwed: null,
    isFetching: false,
    goingToExpired: false
  }

  static navigationOptions = {
    title: 'Owed to Me',
  };

   async componentDidMount() {
    console.log("mounting owed");
    let userInfo = await this.getId();
    let promiseeId = userInfo.userID;
    this.setState({ isFetching: true });
    const apiData = await getData(promiseeId, null);
    this.setState({
      promiseeId: promiseeId,
      pledgesOwed: apiData,
      isFetching: false
    })

    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      if(this.state.goingToExpired) {
        let userInfo = await this.getId();
        let promiseeId = userInfo.userID;
        this.setState({ isFetching: true });
        const apiData = await getData(promiseeId, null);
        this.setState({
          promiseeId: promiseeId,
          pledgesOwed: apiData,
          isFetching: false, 
          goingToExpired: false
        })
      }
    });
  }

  onRefresh = async () => {
    this.setState({ isFetching: true });
    const newPledges = await getData(this.state.promiseeId, null);
    //console.log(newPledges)
    this.setState({
      pledgesOwed: newPledges,
      isFetching: false
    })
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

  goToDetails = (item, screenName) => {
    this.props.navigation.navigate('Details', { ...item, screen: screenName })
  }

  setGoingToExpired = () => {
    this.setState({goingToExpired: true})
  }

  render() {
    console.log("goingToExpired is " + this.state.goingToExpired);
    const { routeName } = this.props.navigation.state;
    return (
      <PledgeList
        pledges={this.state.pledgesOwed}
        isFetching={this.state.isFetching}
        onRefresh={this.onRefresh}
        routeName={routeName}
        navigate={this.goToDetails}
        setGoingToExpired={this.setGoingToExpired}
      />
    )
  }
}
