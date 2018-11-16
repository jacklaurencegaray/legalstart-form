import React, { Component } from 'react'
import styled from 'styled-components'

export default class General extends Component {
  render() {
    return (
      <Layout>
          { this.props.children }
      </Layout>
    )
  }
}

const Layout = styled.div`
    min-height: 100vh;
    background-color: #B1B1CB;
    color: #252A62;
`
