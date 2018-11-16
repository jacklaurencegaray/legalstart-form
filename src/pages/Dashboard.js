import React, { Component } from 'react'
import GeneralLayout from '../layouts/General'
import Form from '../components/Form'
import Graphic from '../components/Graphic'
import styled from 'styled-components'

export default class Dashboard extends Component {
  render() {
    return (
      <GeneralLayout>
        <Layout>
          <Content>
            <Graphic />
            <Form />
          </Content>
        </Layout>
      </GeneralLayout>
    )
  }
}

const Content = styled.div`
  display: grid;
  margin-left: 5vw;
  margin-right: 5vw;
  grid-template-columns: minmax(270px, 3fr) 6fr;
  max-width: 950px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-rows: 150px 1fr;
  }
  
  @media (max-width: 686px) {
    width: calc(100vw - 15vw);
  }
`

const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
`
