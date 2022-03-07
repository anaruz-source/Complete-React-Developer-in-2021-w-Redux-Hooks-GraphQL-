import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import './App.css';





import { collectionsForPreviewSelector } from './redux/shop/shop.selectors';
import { selectCurrentUser } from './redux/user/user.selectors';

import HomePage from './pages/homepage/homepage.page';
import ShopPage from './pages/shop/shop.page';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.page';
import Checkout from './pages/checkout/checkout.page';
import Header from './components/header/header.component';
import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './redux/user/user.actions';




class App extends React.Component {




   componentDidMount(){

    const { checkUserSession} = this.props;
    

    checkUserSession()


      // await addCollectionsAndDocuments('collections', collections.map(({title, items}) => ({title, items})))



    

   // console.log(this.unsubscriberFromAuth);
    }


  render(){

    const {currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/sign-in' render = {() => currentUser ? (<Redirect to='/' />) : (<SignInSignUpPage />) } />
          <Route path='/checkout' component ={Checkout} />

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({

  currentUser: selectCurrentUser,
  collections: collectionsForPreviewSelector
})

const mapDispatchToProps = dispatch =>({

  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);