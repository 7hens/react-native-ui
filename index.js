import { Dimensions } from 'react-native'

const windowRect = Dimensions.get("window")

export const windowWidth = windowRect.width
export const windowHeight = windowRect.height

export { default as Scaffold } from './src/Scaffold'
export { default as Toast } from './src/Toast'
export { default as Snackbar } from './src/Snackbar'
export { default as Dialog } from "./src/Dialog"
