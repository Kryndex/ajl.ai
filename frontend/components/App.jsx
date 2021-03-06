import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import HeaderContainer from './HeaderContainer';
import FooterContainer from './FooterContainer';
import ModalContainer from './ModalContainer';

import Home from './Home';
import PerceivedDemographicsContainer from './PerceivedDemographicsContainer';
import './App.styl';

const App = () => (
  <Router>
    <div>
      <HeaderContainer />
      <ModalContainer />

      <Route exact path="/" component={Home} />
      <Route path="/annotate" component={PerceivedDemographicsContainer} />

      <FooterContainer />
    </div>

  </Router>
);

export default App;
