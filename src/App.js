import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'chota/src/_base.css';
import 'chota/src/_grid.css';

import Header from './components/header/Header';
import Tables from './pages/tables/Tables'
import List from './pages/content/List';
import Content from './pages/content/Content';

import { statements } from './utils/statements';

function App() {

  return (
    <main id="app" className="container" data-test="crate-challenge-app">
      <Header />

      <Switch>
        <Route exact path="/">
          <Tables query={statements.QUERY_TABLENAMES}/>
        </Route>

        <Route
          path="/full/:tableName"
          render={(props) => <List query={statements.queryTableContent(props.match.params.tableName)} tableName={props.match.params.tableName}/>}
        />

        <Route path="/paginated/:tableName">
          <Content />
        </Route>

      </Switch>
    </main>
  );
}


export default App;
