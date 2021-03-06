'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elementResizeEvent = require('element-resize-event');

var _elementResizeEvent2 = _interopRequireDefault(_elementResizeEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoScale = (_temp = _class = function (_Component) {
  _inherits(AutoScale, _Component);

  function AutoScale() {
    _classCallCheck(this, AutoScale);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      wrapperSize: { width: 0, height: 0 },
      contentSize: { width: 0, height: 0 },
      scaleX: 1,
      scaleY: 1
    };
    return _this;
  }

  AutoScale.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _refs = this.refs,
        wrapper = _refs.wrapper,
        content = _refs.content;

    var actualContent = content.children[0];

    this.updateState(_extends({}, this.state, {
      contentSize: { width: actualContent.offsetWidth, height: actualContent.offsetHeight },
      wrapperSize: { width: wrapper.offsetWidth, height: wrapper.offsetHeight }
    }));

    (0, _elementResizeEvent2.default)(actualContent, function () {
      _this2.updateState(_extends({}, _this2.state, {
        contentSize: { width: actualContent.offsetWidth, height: actualContent.offsetHeight }
      }));
    });

    (0, _elementResizeEvent2.default)(wrapper, function () {
      _this2.updateState(_extends({}, _this2.state, {
        wrapperSize: { width: wrapper.offsetWidth, height: wrapper.offsetHeight }
      }));
    });
  };

  AutoScale.prototype.updateState = function updateState(newState) {
    var _props = this.props,
        maxHeight = _props.maxHeight,
        maxWidth = _props.maxWidth,
        maxScale = _props.maxScale;
    var wrapperSize = newState.wrapperSize,
        contentSize = newState.contentSize;


    var scaleX = wrapperSize.width / contentSize.width;
    var scaleY = wrapperSize.height / contentSize.height;

    if (maxHeight) {
      scaleY = Math.min(scaleY, maxHeight / contentSize.height);
    }
    if (maxWidth) {
      scaleX = Math.min(scaleX, maxWidth / contentSize.width);
    }
    if (maxScale) {
      scaleX = Math.min(scaleX, maxScale);
      scaleY = Math.min(scaleY, maxScale);
    }

    this.setState(_extends({}, newState, {
      scaleX: scaleX,
      scaleY: scaleY
    }));
  };

  AutoScale.prototype.render = function render() {
    var _state = this.state,
        scaleX = _state.scaleX,
        scaleY = _state.scaleY,
        contentSize = _state.contentSize;
    var _props2 = this.props,
        children = _props2.children,
        wrapperClass = _props2.wrapperClass,
        containerClass = _props2.containerClass,
        contentClass = _props2.contentClass;

    var containerHeight = scaleY * contentSize.height;
    var containerWidth = scaleX * contentSize.width;

    return _react2.default.createElement(
      'div',
      { ref: 'wrapper', className: wrapperClass, style: { height: '100%' } },
      _react2.default.createElement(
        'div',
        { ref: 'container', className: containerClass, style: { maxWidth: '100%', overflow: 'hidden', width: containerWidth + 'px', height: containerHeight + 'px' } },
        _react2.default.createElement(
          'div',
          { ref: 'content', className: contentClass, style: { transform: 'scale(' + scaleX + ', ' + scaleY + ')', transformOrigin: '0 0 0', width: 100 / scaleX + '%' } },
          _react2.default.Children.only(children)
        )
      )
    );
  };

  return AutoScale;
}(_react.Component), _class.propTypes = {
  children: _react.PropTypes.node,
  wrapperClass: _react.PropTypes.string,
  containerClass: _react.PropTypes.string,
  contentClass: _react.PropTypes.string,
  maxHeight: _react.PropTypes.number,
  maxWidth: _react.PropTypes.number,
  maxScale: _react.PropTypes.number
}, _class.defaultProps = {
  wrapperClass: '',
  containerClass: '',
  contentClass: ''
}, _temp);
exports.default = AutoScale;