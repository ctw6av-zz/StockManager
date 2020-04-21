import {TabsContextProvider} from "./components/tabs/tabs-context";
import {TabManager} from "./components/tabs/tabs-manager";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import React from "react";
import './index.css';

// This component is only for testing
const NullComponent = (props) => {
  return (
    <div>
      <p>Null</p>
      <div>
        {props.children}
      </div>
    </div>
  )
};

// This component is only for testing
const SearchComponent = () => {

  return (
    <div>
      <p>Search Component</p>
    </div>
  )
};

// To add a new route in the tabs just insert the component,
// it's name as specify if it is listed or not.
const routes = [
  {name: "Dashboard", Component: NullComponent, listed: true},
  {name: "Dashboard1", Component: NullComponent, listed: true},
  {name: "Search", Component: SearchComponent, listed: false},
];

ReactDOM.render(
  <React.StrictMode>
    <TabsContextProvider routes={routes}>
      <TabManager/>
    </TabsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
