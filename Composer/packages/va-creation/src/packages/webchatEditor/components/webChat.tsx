import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../models/reduxState';
import { WebChatContainerStyling, WebChatPaneStyling } from '../styles';

interface StateProps {
  webChatStyleOptions: any;
}

interface DispatchProps {}

interface Props {}

type PropsType = StateProps & DispatchProps & Props;

export class WebChat extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    // TODO: add UseMemo functionality here for class component
    const directLine = createDirectLine({ token: '09QzhaLtLRc.C59btT8lvO2dI_HCyPvqElhIj5PVUudojAR_2PV9H1Y' });
    return (
      <WebChatPaneStyling>
        <WebChatContainerStyling>
          <ReactWebChat styleOptions={this.props.webChatStyleOptions} directLine={directLine} userID="User" />
        </WebChatContainerStyling>
      </WebChatPaneStyling>
    );
  }
}

const mapStateToProps = (state: IAppState, ownProps: Props): StateProps => ({
  webChatStyleOptions: state.WebChatState.styleOptions,
});

const dispatchToProps: DispatchProps = {};

export default connect(mapStateToProps, dispatchToProps)(WebChat);
