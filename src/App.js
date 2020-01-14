import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ShopPage from './pages/homepage/shop/shop.component';
import Header from './components/header/header.component';
import SingInSignUpPage from './pages/homepage/signin/singup/signin-signup.component';
import {auth, createUserProfileFromDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.action';
import Checkout from './components/checkout/checkout.component';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selector';

class App extends React.Component {


  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileFromDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id : snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

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
  currentUser : selectCurrentUser
})

const mapDispatchProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchProps)(App);
