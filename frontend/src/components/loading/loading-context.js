import React from "react";

// Provides the app loading context
export const LoadingContext = React.createContext({
  setLoading: () => {},
  loading: false
})

export const LoadingProvider = (props) => {

  // Handle the loading state
  const [loading, __] = React.useState(false)

  const setLoading = (state) => {
    __(prevState => {
      prevState = state
      return prevState
    })
  }

  const values = {
    setLoading: setLoading,
    loading: loading
  }

  return (
    // Provides th context
    <LoadingContext.Provider value={values}>
      {props.children}
    </LoadingContext.Provider>
  )
}

