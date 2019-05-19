
import TwoWayMap  from '../utilities/TwoWayMap';

const iconDict = {
    //fontawesome_name : sometime_description
    "coffee" : "a coffee",
    "glass" : "a drink",
    "cutlery" : "a meal",
    "automobile" : "a ride", 
    "asterisk" : "other"
};

const twoWayIconDict = new TwoWayMap(iconDict);

export {iconDict, twoWayIconDict}