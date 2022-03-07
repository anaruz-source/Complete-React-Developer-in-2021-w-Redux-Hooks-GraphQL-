import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";



import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";


import { fetchCollectionsStart } from "../../redux/shop/shop.actions";




class ShopPage extends React.Component {


    componentDidMount() {
       
      const {fetchCollectionStart} = this.props
      fetchCollectionStart()
    }




    render() {

        const {match} = this.props

       return(
                <div className="shop-page">
                    <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                    <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
                </div>
           )
         }
} 
    


const mapDispatchToProps = dispatch => ({

    fetchCollectionStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);