import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ShopPage from './pages/homepage/shop/shop.component';
import Header from './components/header/header.component';
import SingInSignUpPage from './pages/homepage/signin/singup/signin-signup.component';
import {setCurrentUser} from './redux/user/user.action';
import Checkout from './components/checkout/checkout.component';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selector';
import {selectCollectionsForPreview} from './redux/shop/shop.selectors';
import {checkUserSession} from './redux/user/user.action';

class App extends React.Component {


  unsubscribeFromAuth = null

  componentDidMount(){

    const {checkUserSession} = this.props;
    checkUserSession();

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth){
    //     const userRef = await createUserProfileFromDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id : snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   }
    //   setCurrentUser(userAuth);
    //   //addCollectionAndDocuments('collections',collectionsArray.map(({title,items}) => ({title,items})));
    // });

    
  }

  // componentWillUnmount(){
  //   this.unsubscribeFromAuth();
  // }

  render(){
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' render={()=> this.props.currentUser ? (<Redirect to="/"/>) : <SingInSignUpPage/>}/>
          <Route exact path='/checkout' component={Checkout}/> 
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser : selectCurrentUser,
  collectionsArray : selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
