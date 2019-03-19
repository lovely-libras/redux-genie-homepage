import React from 'react';
import Navbar from './components/Navbar';
import YMLForm from './components/YMLForm';

const App = () => {
  return (
    <div className="yml_form_container">
      <Navbar />
      <YMLForm />
    </div>
  );
};

export default App;
