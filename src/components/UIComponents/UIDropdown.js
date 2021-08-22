import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const Popover = styled.div`
  position: absolute;
  z-index: 3;
  ${(props) => props.position}
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const WrapperContent = styled.div`
  position: relative;
  z-index: 4;
`;

export default class UIDropdown extends React.Component {
  static defaultProps = {
    position: {
      top: "auto",
      left: "auto",
      bottom: "auto",
      right: "auto"
    }
  };

  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  toggleShow = () => {
    this.setState((prevState) => ({
      show: !prevState.show
    }));
  };

  render() {
    return (
      <Wrapper>
        {this.props.render(this.toggleShow)}
        {this.state.show && (
          <Popover position={this.props.position}>
            <Cover onClick={this.toggleShow} />
            <WrapperContent>
              {this.props.children(this.toggleShow)}
            </WrapperContent>
          </Popover>
        )}
      </Wrapper>
    );
  }
}
