import React from 'react';
import Navbar from './components/Navbar';
import FormContainer from './components/FormContainer';
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Documentation from './components/Documentation'

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/docs" component={Documentation} />
        <Route path="/wish" component={FormContainer} />
      </Switch>
    </div>
  );
};

export default App;