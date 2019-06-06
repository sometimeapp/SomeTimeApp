import { API } from 'aws-amplify';
import moment from 'moment';

const updateIfExpired = async (pledges) => {
    console.log('There are: ' + pledges.length + ' expired pledges');
    let apiName = 'PledgesCRUD';
    let path = '/pledges';
    let promisesArray = [];

    for (let i = 0; i < pledges.length; i++) {
        let myInit = {
            response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
            body: {
                "promiseeId": pledges[i]['promiseeId'],
                "promisorId": pledges[i]['promisorId'],
                "promiseDate": pledges[i]['promiseDate'],
                "promiseDueDate": pledges[i]['promiseDueDate'],
                "pledgeStatus": 'expired',
                "promiseeFirstName": pledges[i]['promiseeFirstName'],
                "promiseeLastName": pledges[i]['promiseeLastName'],
                "promisorFirstName": pledges[i]['promisorFirstName'],
                "promisorLastName": pledges[i]['promisorLastName'],
                "terms": pledges[i]['terms'],
            }
        }
        promisesArray.push(API.put(apiName, path, myInit));
    }
    Promise.all(promisesArray).then(() => console.log("all good")).catch(() => console.log("fail!"));
}

const getData = async (id, index) => {
    console.log("getting data from api...")
    let apiName = 'PledgesCRUD';
    // let path = `/pledges/${id}?message=${index}`;
    let path = `/pledges/${id}`;
    if (index) {
        path += `?message=${index}`
    }
    let apiData = await API.get(apiName, path);

    let groupedApiData = [];
    let expiredPledges = [];

    for (let pledge of apiData) {
        if (pledge.pledgeStatus === 'pending') {
            if (moment().isAfter(pledge.promiseDueDate)) {
                pledge.pledgeStatus = 'expired';
                // this is the server-side PUT request array
                expiredPledges.push(pledge);
            } else {
                groupedApiData.push(pledge);
            }
        }
    }

    for (let pledge of apiData) {
        if (pledge.pledgeStatus === 'resolved') groupedApiData.push(pledge);
    }

    for (let pledge of apiData) {
        if (pledge.pledgeStatus === 'expired') {
            // this is the client-side array
            groupedApiData.push(pledge);
        }
    }
    if (expiredPledges.length > 0) {
        updateIfExpired(expiredPledges);
    }

    return groupedApiData;
}

export { getData }