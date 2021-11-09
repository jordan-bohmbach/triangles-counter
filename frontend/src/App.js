import React from "react";
import { Route, Switch } from "react-router-dom";

import Solution from "./components/Solution";

function App() {

  return (
    <>
        <Switch>
          <Route path = '/'>
            <Solution />
          </Route>
        </Switch>
    </>
  );
}

export default App;