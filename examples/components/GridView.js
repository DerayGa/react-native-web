import React, { StyleSheet, View } from '../../src'

const { Component, PropTypes } = React

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden'
  },
  contentContainer: {
    flexDirection: 'row',
    flexGrow: 1
  },
  // distribute all space (rather than extra space)
  column: {
    flexBasis: '0%'
  }
})

export default class GridView extends Component {
  static propTypes = {
    alley: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    gutter: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    alley: '0',
    gutter: '0'
  }

  render() {
    const { alley, children, gutter, style, ...other } = this.props

    const rootStyle = {
      ...style,
      ...styles.root
    }

    const contentContainerStyle = {
      ...styles.contentContainer,
      margin: `0 calc(-0.5 * ${alley})`,
      padding: `0 ${gutter}`
    }

    const newChildren = React.Children.map(children, (child) => {
      return child && React.cloneElement(child, {
        style: {
          ...child.props.style,
          ...styles.column,
          margin: `0 calc(0.5 * ${alley})`
        }
      })
    })

    return (
      <View className='GridView' {...other} style={rootStyle}>
        <View style={contentContainerStyle}>
          {newChildren}
        </View>
      </View>
    )
  }
}
