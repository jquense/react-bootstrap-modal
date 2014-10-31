
var React = require('react')
  , cloneWithProps = require('react-bootstrap/utils/cloneWithProps')

module.exports = {

  propTypes: {
    open: React.PropTypes.bool,
    delay: React.PropTypes.number
  },

  getInitialState: function(){
    return {
      disabled: !!this.props.delay
    }
  },

  _renderButton: function(prop, classes){
    var handler = this._action.bind(null, prop)
      , text, Button;

    if (typeof this.props[prop] === 'string')
      text =  this.props[prop]

    Button = text ? React.DOM.button({ type: 'button' }, text) : this.props[prop]

    return cloneWithProps(Button, { 
      className: classes || '',
      disabled: this.state.disabled,
      onClick: chain(handler, Button.props.onClick, this)
    })
  },

  _delay: function(props){
    var self = this;

    if(!props.delay || !this.state.disabled) return

    this._timer = setTimeout(function(){
      self.setState({ disabled: false })
    }, props.delay)
  },

  componentWillMount: function() {
    this._delay(this.props) 
  },

  componentWillReceiveProps: function(nextProps) {
    this._delay(nextProps) 
  },
}


function chain(a,b, thisArg){
  return function(){
    a && a.apply(thisArg, arguments)
    b && b.apply(thisArg, arguments)
  }
}