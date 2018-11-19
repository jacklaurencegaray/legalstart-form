import React from "react"
import styled, { css } from "styled-components"
import { Component } from "react"

export default class Tooltip extends Component {
  state = {
    shown: false
  }

  show = () => this.setState({ shown: true })
  hide = () => this.setState({ shown: false })
  toggle = () => this.setState({ shown: !this.state.shown })

  render() {
    return (
      <TooltipParent>
        {" "}
        <span
          onMouseEnter={this.show}
          onMouseLeave={this.hide}
          onClick={this.toggle}
        >
          (?)
        </span>
        <TooltipMessage shown={this.state.shown}>
          {this.props.children}
        </TooltipMessage>
      </TooltipParent>
    )
  }
}

const TooltipMessage = styled.span`
  position: absolute;
  background-color: #252a63;
  color: #fff;
  width: fit-content;
  padding: 12px 10px;
  border-radius: 5px;
  min-width: 180px;

  ${props =>
    props.shown
      ? css`
          display: inline;
        `
      : css`
          display: none;
        `};
`

const TooltipParent = styled.span`
  position: relative;
  display: inline;
  cursor: pointer;
`
