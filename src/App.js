import React, { Component } from 'react';
import Dashboard from './pages/Dashboard'
import { createGlobalStyle } from 'styled-components'
import globalStyle from './assets/styles/global'

const GlobalStyling = createGlobalStyle`${globalStyle}`

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyling />
        <Dashboard />
      </>
    );
  }
}

export default App;
