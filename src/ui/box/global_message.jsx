import PropTypes from 'prop-types';
import React from 'react';

export default class GlobalMessage extends React.Component {
  componentDidMount() {
    const methodIsSupported =
      this.messageNode && typeof this.messageNode.scrollIntoView === 'function';
    if (methodIsSupported && this.props.scrollIntoView) {
      const boundingRect = this.messageNode.getBoundingClientRect();
      if (boundingRect.top < 0) {
        this.messageNode.scrollIntoView(true);
      }
    }
  }
  render() {
    const { message, type } = this.props;
    const className = `auth0-global-message auth0-global-message-${type}`;
    return (
      <div
        className={className}
        ref={messageNode => {
          this.messageNode = messageNode;
        }}
      >
        <div className="msg-div">
          <svg
            className="exclamation-icon"
            height="16px"
            version="1.1"
            viewBox="0 0 16 16"
            width="16px"
          >
            <g fill="none" fillRule="evenodd" id="Icons with numbers" stroke="none" strokeWidth="1">
              <g fill="#ffffff" id="Group" transform="translate(-96.000000, -432.000000)">
                <path
                  d="M103,443 L103,445 L105,445 L105,443 Z M104,448 
          C99.5817218,448 96,444.418278 96,440 C96,435.581722 99.5817218,432 104,432 C108.418278,432 112,435.581722 
          112,440 C112,444.418278 108.418278,448 104,448 Z M103,435 L103,442 L105,442 L105,435 Z M103,435"
                  id="Oval 
          208 copy"
                />
              </g>
            </g>
          </svg>
        </div>
        <span className="animated fadeInUp">{message}</span>
      </div>
    );
  }
}

GlobalMessage.propTypes = {
  message: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['error', 'success', 'info']).isRequired,
  scrollIntoView: PropTypes.bool
};

GlobalMessage.defaultProps = {
  scrollIntoView: false
};
