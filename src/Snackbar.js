import React from 'react'
import { Text, StyleSheet, Animated, Easing } from 'react-native'
import PropTypes from 'prop-types'

export default class Snackbar extends React.Component {
  static SHORT = 1000
  static LONG = 2500
  static FOREVER = 0
  static _instance = null

  /**
   * @param {string|*} options
   */
  static show(options) {
    if (!Snackbar._instance) {
      console.error('Snackbar must be instantiated before show.')
      return
    }
    Snackbar._instance.show(options)
  }

  static hide() {
    Snackbar._instance && Snackbar._instance.hide()
  }

  state = {
    content: '',
    translateAnimValue: new Animated.Value(0),
    position: this.props.position,
    height: 9999
  }

  show = (options) => {
    if (typeof options === 'string') options = { content: options }
    const { content, position } = options
    this.setState({ content, position })
    Animated.timing(this.state.translateAnimValue, {
      toValue: 1,
      duration: this.props.entryDuration,
      easing: Easing.bezier(0, 0, 0.2, 1)
    }).start(() => {
      const duration = options.duration || Snackbar.SHORT
      if (duration != Snackbar.FOREVER) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(this.hide, duration);
      }
    })
  }

  hide = () => {
    Animated.timing(this.state.translateAnimValue, {
      toValue: 0,
      duration: this.props.exitDuration,
      easing: Easing.bezier(0.4, 0, 1, 1)
    }).start()
  }

  componentDidMount() {
    if (Snackbar._instance) console.warn('You already have a instance of Snackbar.')
    Snackbar._instance = this
  }

  componentWillUnmount() {
    Snackbar._instance = null
  }

  render() {
    let { content, position, translateAnimValue, height } = this.state
    let { opacity } = this.props
    let pos = translateAnimValue.interpolate({ inputRange: [0, 1], outputRange: [-height, 0] })
    return <Animated.View
      style={[ styles.container, { opacity, [position || this.props.position]: pos } ]}>
      {React.isValidElement(content) ? content : <Text style={styles.text}>{content}</Text>}
    </Animated.View>
  }

  static propTypes = {
    position: PropTypes.oneOf([ 'top', 'bottom' ]),
    entryDuration: PropTypes.number,
    exitDuration: PropTypes.number,
    opacity: PropTypes.number
  }

  static defaultProps = {
    position: 'bottom',
    entryDuration: 225,
    exitDuration: 195,
    opacity: 0.8
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10000,
    elevation: 9999,
    backgroundColor: "black",
    paddingHorizontal: 24,
    paddingVertical: 14,
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  }
})
