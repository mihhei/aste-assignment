import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import 'materialize-css';
import { Navbar } from './components/navbar';
import { Search } from './components/search';

function App() {
  const routes = useRoutes();

  return (
    <Router>
      <Navbar />
      <Search />
      <div className="container">{routes}</div>
    </Router>
  );
}

export default App;
