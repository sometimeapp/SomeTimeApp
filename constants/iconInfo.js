import { createIconSet } from '@expo/vector-icons';
import TwoWayMap from '../utilities/TwoWayMap';

const iconDict = {
    "coffee": "a coffee",
    "glass-cocktail": "a drink",
    "food": "a meal",
    "car": "a ride",
    "asterisk": "other"
}

const twoWayIconDict = new TwoWayMap(iconDict);

// Do NOT remove the Unicode Square! It defines the icon from the font file
const glyphMap = { 'handshake': '', 'hand-holding': '', 'thumbs-up': ''};
const CustomIcon = createIconSet(glyphMap, 'fontawesome-free', 'fa-solid-900.ttf');

export { iconDict, twoWayIconDict, CustomIcon }