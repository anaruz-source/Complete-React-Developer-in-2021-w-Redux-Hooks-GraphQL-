import React from 'react';
import { connect } from 'react-redux';



import CollectionItem from '../../components/collection-item/collection-item.component';
import { collectionSelector } from '../../redux/shop/shop.selectors';
import { CollectionPageContainer, CollectionTitleContainer, CollectionItemsContainer } from './collection.styles';


const CollectionPage = ({collection}) => {

   const {title, items} = collection;

    return (
        <CollectionPageContainer>
            <CollectionTitleContainer>{title}</CollectionTitleContainer>
            <CollectionItemsContainer>
              {items.map(item => <CollectionItem key={item.id}  item = {item}/>)}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
}

const mapStateToProps = (state, props) =>({

    collection: collectionSelector(props.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
