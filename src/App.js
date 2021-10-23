import React from "react";
import ImageGrid from "./comps/ImageGrid";
import Title from "./comps/Title";
import UploadImageForm from "./comps/UploadImageForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./comps/Navbar";
import Manage from "./comps/Manage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Title} />
          <Route path="/UploadImageForm" exact component={UploadImageForm} />
          <Route path="/ImageGrid" exact component={ImageGrid} />
          <Route path="/Manage" exact component={Manage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
