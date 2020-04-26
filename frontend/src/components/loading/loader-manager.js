import {LoadingContext} from "./loading-context";
import Loader from 'react-loader-spinner'
import React from "react";

// Load animation shows up an animation
// based on context provider state.
export const LoadAnimation = (props) => {

  const context = React.useContext(LoadingContext);

  return (
    <div className="h-100">
      {
        context.loading ?
          <div className="d-flex justify-content-center align-items-center h-100">
            <Loader type="Oval" className="fade-in" color="#00BFFF" height={35} width={35}/>
          </div>
        :
          props.children
      }
    </div>
  )
}