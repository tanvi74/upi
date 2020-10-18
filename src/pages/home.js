import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import openModal from '../actions/openModal';
import Login from '../pages/login';
import SignUp from './register';

 class Home extends Component {
    state = {
        isOpen:false
    }
    handleToggle = () =>{
        this.setState({isOpen:!this.state.isOpen});
    }

    componentDidUpdate(oldProps){
        if((oldProps.auth.token !== this.props.auth.token)){
            this.props.openModal('closed', "")
        }
    }

     handleLogout = () => {
            this.props.logoutAction();
            const { history } = this.props;
            if(history) history.push('/');
            window.location.reload()
      };
    render() {
        return (
            <div>
                <ul>
                <li className="login-signup waves-effect waves-light btn-large  " onClick={()=>{this.props.openModal("open", <Login/>)}}  >Login</li>
                <li className="login-signup waves-effect waves-light btn-large  " onClick={()=>{this.props.openModal("open", <SignUp/>)}}  >Register</li>
                </ul>
                
            </div>
        )
    }
 }
    
function mapStateToProps(state){
    return{
        auth: state.auth,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        openModal: openModal,
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);



