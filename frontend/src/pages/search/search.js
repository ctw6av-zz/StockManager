import {AiOutlineFullscreen, AiOutlineFullscreenExit} from "react-icons/ai";
import {ContentContainer} from "../../components/containers/content-container";
import {TabsContext} from "../../components/tabs/tabs-context";
import React from "react";

export const Search = () => {

  const context = React.useContext(TabsContext)

  return (
    <ContentContainer backgroundColor="#f8f9fa">
      <div className="d-flex justify-content-end mb-3">
        {
          context.collapsed ?
            <AiOutlineFullscreenExit className="icon icon-dark fade-in" size={22} onClick={() => context.setCollapsed(!context.collapsed)}/>
          :
            <AiOutlineFullscreen className="icon icon-dark fade-in" size={22} onClick={() => context.setCollapsed(!context.collapsed)}/>
        }
      </div>
      <p>+++ Product Search +++</p>
    </ContentContainer>
  )
};
