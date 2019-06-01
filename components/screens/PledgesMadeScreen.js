import React from 'react';
import { Auth } from 'aws-amplify';
import { getData } from '../../utilities/services'
import PledgeList from '../screenComponents/PledgeList'

export default class PledgesMadeScreen extends React.Component {

  state = {
    pledgesMade: null,
    isFetching: false
  }

  static navigationOptions = {
    title: "Pledges I've Made",
  };

  async componentDidMount() {
    let userInfo = await this.getId();
    let promisorId = userInfo.userID;
    this.setState({ isFetching: true });
    const apiData = await getData(promisorId, "index");
    this.setState({
      promisorId: promisorId,
      pledgesMade: apiData,
      isFetching: false
    })
  }

  onRefresh = async () => {
    this.setState({ isFetching: true });
    const newPledges = await getData(this.state.promisorId, "index");
    this.setState({
      pledgesMade: newPledges,
      isFetching: false
    })
  }

  getId = async () => {
    try {
      let userInfo = {};
      let user = await Auth.currentAuthenticatedUser()
      userInfo.userID = await user.attributes.sub;
      userInfo.firstName = await user.attributes.name;
      userInfo.lastName = await user.attributes.family_name;;
      return userInfo;
    } catch (error) {
      console.log(error);
    }
  }

  goToDetails = (item, screenName) => {
    this.props.navigation.navigate('Details', { ...item, screen: screenName })
  }

  render() {
    const { routeName } = this.props.navigation.state;
    return (
      <PledgeList
        pledges={this.state.pledgesMade}
        isFetching={this.state.isFetching}
        onRefresh={this.onRefresh}
        routeName={routeName}
        navigate={this.goToDetails}
      />
    )
  }
}
