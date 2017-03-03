import React, { Component, PropTypes } from 'react';
import ere from 'element-resize-event';

export default class AutoScale extends Component {
  static propTypes = {
    children: PropTypes.node,
    wrapperClass: PropTypes.string,
    containerClass: PropTypes.string,
    contentClass: PropTypes.string,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    maxScale: PropTypes.number,
  };

  static defaultProps = {
    wrapperClass: '',
    containerClass: '',
    contentClass: '',
  };

  constructor() {
    super();

    this.state = {
      wrapperSize: { width: 0, height: 0 },
      contentSize: { width: 0, height: 0 },
      scaleX: 1,
      scaleY: 1,
    };
  }

  componentDidMount() {
    const { wrapper, content } = this.refs;
    const actualContent = content.children[0];

    this.updateState({
      ...this.state,
      contentSize: { width: actualContent.offsetWidth, height: actualContent.offsetHeight },
      wrapperSize: { width: wrapper.offsetWidth, height: wrapper.offsetHeight },
    });

    ere(actualContent, () => {
      this.updateState({
        ...this.state,
        contentSize: { width: actualContent.offsetWidth, height: actualContent.offsetHeight },
      });
    });

    ere(wrapper, () => {
      this.updateState({
        ...this.state,
        wrapperSize: { width: wrapper.offsetWidth, height: wrapper.offsetHeight },
      });
    });
  }

  updateState(newState) {
    const { maxHeight, maxWidth, maxScale } = this.props;
    const { wrapperSize, contentSize } = newState;

    let scaleX = wrapperSize.width / contentSize.width;
    let scaleY = wrapperSize.height / contentSize.height;

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

    this.setState({
      ...newState,
      scaleX,
      scaleY
    });
  }

  render() {
    const { scaleX, scaleY, contentSize } = this.state;
    const { children, wrapperClass, containerClass, contentClass } = this.props;
    const containerHeight = (scaleY * contentSize.height);
    const containerWidth = (scaleX * contentSize.width);

    return (
      <div ref="wrapper" className={wrapperClass} style={{ height: '100%' }}>
        <div ref="container" className={containerClass} style={{ maxWidth: '100%', overflow: 'hidden', width: containerWidth + 'px', height: containerHeight + 'px' }}>
          <div ref="content" className={contentClass} style={{ transform: 'scale(' + scaleX + ', ' + scaleY + ')', transformOrigin: '0 0 0', width: (100 / scaleX) + '%' }}>
            {React.Children.only(children)}
          </div>
        </div>
      </div>
    );
  }
}
