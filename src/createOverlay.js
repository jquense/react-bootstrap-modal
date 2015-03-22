'use strict';
var React = require('react')
  , Layer = require('react-layer');


module.exports = render => class extends React.Component {

  static propTypes = {
    container: React.PropTypes.any
  }

  componentWillUnmount () {
    this._layer.destroy()
    this._layer = null
  }

  componentDidUpdate() {
    this._renderOverlay();
  }

  componentDidMount() {
    this._renderOverlay();
  }

  _renderOverlay() {
    if (!this._layer)
      this._layer = new Layer(this.props.container || document.body, () => this._child)

    this._layer.render()
  }

  render() {
    this._child = render(this.props)
    return null;
  }

}
