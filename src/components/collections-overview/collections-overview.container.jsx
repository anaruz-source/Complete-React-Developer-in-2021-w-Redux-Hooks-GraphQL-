import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { collectionsFetchingSelector } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import collectionsOverview from "./collections-overview.component";



const mapStateToProps = createStructuredSelector({

    isLoading: collectionsFetchingSelector
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(collectionsOverview)


export default CollectionsOverviewContainer