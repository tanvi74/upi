
import React, {Component} from 'react';
import './login.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import openModal from '../actions/openModal';
import axios from 'axios';
import swal from 'sweetalert';
import regAction from '../actions/regAction';
import SignUp from './register';


class SignIn extends Component{

    state = {
        username: "",
        password: ""
    }

    submitLogin = async(e) =>{
        e.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
        const url = `${window.apiHost}/api/user/login`;
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        const resp = await axios.post(url,data);
        console.log(resp.data);
        // -- noEmail
        if(resp.data.status === "invalidData"){
            swal({
                title: "Invalid data.",
                icon: "error",
              })
        
        }
        // -- badPass
        else if(resp.data.status === "badPass"){
            swal({
                title: "Invalid email/password",
                text: "We don't have a match for that user name and password for the selected category.",
                icon: "error",
              })    
        }
        // --wrongpassword
        else if(resp.data.status === "wrongPassword"){
            swal({
                title: "Wrong Password",
                text: "Password mismatch",
                icon: "error"
            })
        }
        // -- loggedIn
        else if(resp.data.status === "success"){
            swal({
                title: "Success!",
                icon: "success",
              });
            // we call our register action to update our auth reducer!!
            this.props.regAction(resp.data);
            }
        }

        changeUsername = (e) =>{
        this.setState({
            username: e.target.value
        })
    }

    changePassword = (e) =>{
        this.setState({
            password: e.target.value
        })
    }

    closeModal = ()=>{
        this.props.openModal('closed','');
    }

    render(){
        console.log(this.props.auth);
        return(
            <>
                <div className="row " id="signup">
                <div className="col l4 m3"></div>
                    <div className="col l4 m6 s12">
                        <div className="card card-login">
                            <div className="card-content">
                                <h4>Login <span onClick={this.closeModal} className="close right">&times;</span></h4>
                                
                                <form onSubmit={this.submitLogin}>
                                    <div className="input-field signupinput">
                                    <input id="name" type="text" className="validate" onChange={this.changeUsername}/>
                                    <label htmlFor="name" id="name" className="signuplabel">Username</label>
                                    </div>

                                    <div className="input-field signupinput">
                                    <input id="password" type="password" className="validate" onChange={this.changePassword}/>
                                    <label htmlFor="password" className="signuplabel">Password</label>
                                    </div>

                                    <button className="waves-effect waves-light btn sign-page-button">Login</button>
                                </form>

                                <div className="textUnderFormContainer">
                                    <span className="text-under-form">New User? </span>
                                    <span className="signuplink" onClick={()=>{this.props.openModal('open', <SignUp type={this.props.type} />)}}>Register now</span>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    <div className="col l4 m3"></div>
                </div>
            </>
 
        )
    }

}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        openModal: openModal,
        regAction: regAction
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);