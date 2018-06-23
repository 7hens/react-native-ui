import React from "react"
import { View, TouchableWithoutFeedback, Modal, StyleSheet } from "react-native"
import PropTypes from "prop-types"

export default class Dialog extends React.PureComponent {
  state = { visible: false }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible })
  }

  render() {
    const { closable, style } = this.props
    const { visible } = this.state
    return (
      <Modal visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {}}>
        <TouchableWithoutFeedback style={styles.container}
          onPress={() => closable && this.setState({ visible: false })}>
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={style}>
                {this.props.children}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  static propTypes = {
    visible: PropTypes.bool,
    closable: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    closable: true,
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    left: 0,
    right: 0,
    top: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.47)",
  },
})