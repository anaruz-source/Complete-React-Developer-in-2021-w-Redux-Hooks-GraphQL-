import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { directorySectionsSelector } from "../../redux/directory/directory.selectors";
import MenuItem from "../menu-item/menu-item.component";
import { DirectoryMenuContainer } from "./directory.styles";


const  Directory = ({sections}) => (
        <DirectoryMenuContainer>
          {
          sections.map(

            ({id, ...otherProps}) => <MenuItem key={id} {...otherProps}/>)
          }
        </DirectoryMenuContainer>
)

const mapStateToProps = createStructuredSelector({

  sections: directorySectionsSelector
})

export default  connect(mapStateToProps)(Directory);