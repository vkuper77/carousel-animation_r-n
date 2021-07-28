import { Dimensions } from 'react-native'
const { width } = Dimensions.get('screen')
const imageW = width * 0.7
const imageH = imageW * 1.54
export const CONSTANTS = { imageW, imageH, width }
