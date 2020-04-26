import React, {useEffect, useState} from "react";


// Provide all states and functions in tabs context
export const TabsContext = React.createContext({
  setActiveKey: () => {},
  setCollapsed: () => {},
  collapsed: false,
  activeKey: null,
  routes: []
});


export const TabsContextProvider = (props) => {

  // Controls the collapsed or expanded tab state
  const [collapsed, setCollapsed] = useState(false)

  // Controls the tab active key, depending on it's visibility.
  const [activeKey, setActiveKey] = useState(null)


  const values = {
    setActiveKey: setActiveKey,
    setCollapsed: setCollapsed,
    routes: props.routes,
    collapsed: collapsed,
    activeKey: activeKey
  }

  useEffect(() => {
    // Sets the default active tab, it'll be always the first element
    // in routes, since the the element has the flag listed as "true"
    // setActiveKey(props.routes[0].name)
    setActiveKey("Lembretes")
  }, [])

  return (
    <TabsContext.Provider value={values}>
      {props.children}
    </TabsContext.Provider>
  )
}
