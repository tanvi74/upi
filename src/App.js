import React,{Component} from 'react';
import Home from './pages/home';
import {connect} from 'react-redux';
import './App.css';


import {BrowserRouter as Router,Redirect,Route} from "react-router-dom";
import Modal from './components/Modal/Modal';
import UploadCsv from './pages/uploadcsv';


class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          {this.props.auth.status==="success"
            ? 
            <Redirect to="/upload-csv" />
            : 
             this.props.auth.type==="user"
             ?
                null
             :
             <Redirect to="/" />
          }
          <Route exact path = "/upload-csv" component={UploadCsv} />
          {/* <Route exact path = "/admin-dashboard" component={LibrarianDashboard} />
            <Route exact path = "/admin/requests" component={Request} />
            <Route exact path = "/admin/add-new-book" component={AddNewBook} /> 
          <Route exact path = "/user-dashboard" component={UserDashboard} />
          <Route exact path = "/user/history" component={History} />
          <Route exact path = "/book/:bookId" component={SingleBookPage} /> */}
          
          
          <Route path="/" component={Modal} />          
        </div>
      </Router>
    )
  }
}
function mapStateToProps(state){
  return{
      auth: state.auth
  }
}

export default connect(mapStateToProps)(App)