import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";


import CollectionPreview from "../collection-preview/collection-preview.component";



import {collectionsForPreviewSelector} from '../../redux/shop/shop.selectors';


import { CollectionsOverviewContainer } from "./collections-overview.styles";


const CollectionsOverview = ({collections}) => (

    <CollectionsOverviewContainer>
        {
        collections.map(({id, ...otherProps}) =>(<CollectionPreview key={id} {...otherProps} />))
        }
    </CollectionsOverviewContainer>
)


const mapStateToProps = createStructuredSelector(
    {
        collections: collectionsForPreviewSelector
    }
)


export default connect(mapStateToProps)(CollectionsOverview);