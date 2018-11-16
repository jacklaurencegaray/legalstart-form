import React, { Component } from 'react'
import styled from 'styled-components'
import logo from '../assets/svg/logo.svg'

export default class Graphic extends Component {
  render() {
    return (
      <ArtworkWrapper>
        <Artwork data={logo} />
      </ArtworkWrapper>
    )
  }
}

const ArtworkWrapper = styled.div`
  padding: 70px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  background-color: #6362FE;
  display: grid;
  align-items: center;
  justify-items: center;

  @media (max-width: 980px) {
    border-bottom-left-radius: 0px;
    border-top-right-radius: 12px;
    padding: 0;
  }
`

const Artwork = styled.object`
    width: 130px;

    @media (max-width: 980px) {
      width: 60px;
    }
`

