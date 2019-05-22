
import TwoWayMap from '../utilities/TwoWayMap';

const iconDict = {
    "coffee": "a coffee",
    "glass-cocktail": "a drink",
    "food": "a meal",
    "car": "a ride",
    "asterisk": "other"
}

const twoWayIconDict = new TwoWayMap(iconDict);

export { iconDict, twoWayIconDict }