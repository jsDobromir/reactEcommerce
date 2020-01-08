import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Switch,Route} from 'react-router-dom';
import ShopPage from './pages/homepage/shop/shop.component';
import Header from './components/header/header.component';
import SingInSignUpPage from './pages/homepage/signin/singup/signin-signup.component';
import {auth, createUserProfileFromDocument} from './firebase/firebase.utils';

class App extends React.Component {

  constructor(){
    super();
    this.state={
      currentUser : null
    };
  }

  unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileFromDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser : {
              id : snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      this.setState({currentUser : userAuth});
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SingInSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
