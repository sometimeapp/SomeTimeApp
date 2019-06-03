import { API } from 'aws-amplify';

const getData = async (id, index) => {
    console.log("getting data from api...")
    let apiName = 'PledgesCRUD';
    // let path = `/pledges/${id}?message=${index}`;
    let path = `/pledges/${id}`;
    if(index) {
        path += `?message=${index}`
    }
    let apiData = await API.get(apiName, path);
    apiData.sort(function(a, b) {
        return a.pledgeStatus.localeCompare(b.pledgeStatus);
      });
    return apiData;
}

export {getData}