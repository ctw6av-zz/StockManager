import {TabsContext, TabsContextProvider} from "./components/tabs/tabs-context";
import {ContentContainer} from "./components/containers/content-container";
import {LoadingProvider} from "./components/loading/loading-context";
import {TabManager} from "./components/tabs/tabs-manager";
import {Dashboard} from "./pages/dashboard/dashboard";
import {Scheduler} from "./pages/reminder/calendar";
import * as serviceWorker from './serviceWorker';
import {Search} from "./pages/search/search";
import {FiMinimize2} from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import React from "react";
import './animations.css';
import './global.css';


// This component is only for testing
const NullComponent = () => {

  const context = React.useContext(TabsContext);

  return (
    <ContentContainer backgroundColor="#0D1D29">
      <FiMinimize2 size={28} onClick={() => context.setCollapsed(!context.collapsed)}/>
    </ContentContainer>
  )
};

// To add a new route in the tabs just insert the component, it's
// name as specify if it is listed or not or appear at bottom.
const routes = [

  {name: "Dashboard", Component: Dashboard, listed: true, bottom: false},
  {name: "Lembretes", Component: Scheduler, listed: true, bottom: false},
  {name: "Estoque", Component: NullComponent, listed: true, bottom: false},

  {name: "Procurar", Component: Search, listed: false, bottom: false},

  {name: "Privacidade", Component: NullComponent, listed: true, bottom: true},
  {name: "Suporte", Component: NullComponent, listed: true, bottom: true},
  {name: "Sobre", Component: NullComponent, listed: true, bottom: true},
];

ReactDOM.render(
  <LoadingProvider>
    <TabsContextProvider routes={routes}>
      <TabManager/>
    </TabsContextProvider>
  </LoadingProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
