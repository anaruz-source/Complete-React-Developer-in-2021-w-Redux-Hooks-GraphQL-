import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { collectionsLoadedSelector } from "../../redux/shop/shop.selectors";
import collectionPage from "./collection.page";



const mapStateToProps = createStructuredSelector({

    isLoading: state => !collectionsLoadedSelector(state) 
})


const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(collectionPage)

export default CollectionPageContainer