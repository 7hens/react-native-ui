import React from 'react'
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const windowHeight = Dimensions.get('window').height

export default class Toast extends React.Component {
  static SHORT = 2000
  static LONG = 3500
  static FOREVER = 0
  static _instance = null

  /**
   * @param {string|*} options 值可为 string 或者 { content: <Component/>, position: "top" }
   */
  static show(options) {
    if (!Toast._instance) {
      console.error('Toast must be instantiated before show.')
      return
    }
    Toast._instance.show(options)
  }

  static hide() {
    Toast._instance && Toast._instance.hide()
  }

  state = {
    content: '',
    opacityAnimValue: new Animated.Value(0),
    position: this.props.position
  }

  show = (options) => {
    if (typeof options === 'string') options = { content: options }
    const { content, position } = options
    this.setState({ content, position })
    Animated.timing(
      this.state.opacityAnimValue,
      {
        toValue: this.props.opacity,
        duration: this.props.fadeInDuration,
        useNativeDriver: true
      }
    ).start(() => {
      const duration = options.duration || Toast.SHORT
      if (duration != Toast.FOREVER) {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(this.hide, duration);
      }
    })
  }

  hide = () => {
    Animated.timing(
      this.state.opacityAnimValue,
      {
        toValue: 0,
        duration: this.props.fadeOutDuration,
        useNativeDriver: true
      }
    ).start()
  }

  componentDidMount() {
    if (Toast._instance) console.warn('You already have a instance of Toast.')
    Toast._instance = this
  }

  componentWillUnmount() {
    Toast._instance = null
  }

  getTop (pos) {
    if (typeof pos === 'string') {
      switch (pos) {
        case "top":
          pos = 100
          break;
        case "center":
          pos = windowHeight / 2
          break;
        case "bottom":
          pos = windowHeight - 120
          break;
      }
    }
    return pos
  }

  render() {
    const { content, position, opacityAnimValue } = this.state
    return <Animated.View
      pointerEvents="none"
      style={[ styles.container, { top: this.getTop(position || this.props.position), opacity: opacityAnimValue }]}>
      {React.isValidElement(content) ? content : (
        <View style={styles.content}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      )}
    </Animated.View>
  }

  static propTypes = {
    position: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([ "top", "center", "bottom" ])
    ]),
    fadeInDuration: PropTypes.number,
    fadeOutDuration: PropTypes.number,
    opacity: PropTypes.number
  }

  static defaultProps = {
    position: "bottom",
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 0.8
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 999,
  },
  content: {
    backgroundColor: 'black',
    borderRadius: 16,
  },
  contentText: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: 'white',
  }
})