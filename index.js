import { Dimensions } from 'react-native'

const windowRect = Dimensions.get("window")

export const windowWidth = windowRect.width
export const windowHeight = windowRect.height

export { default as ResponsiveScreen } from './ResponsiveScreen'
export { default as Scaffold } from './Scaffold'
export { default as Toast } from './Toast'
export { default as Snackbar } from './Snackbar'
export { default as Dialog } from "./Dialog"
