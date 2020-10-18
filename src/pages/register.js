import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import openModal from '../actions/openModal';
import Login from './login';
import './login.css';
import axios from 'axios';
import swal from 'sweetalert';
import regAction from '../actions/regAction';


class SignUp extends Component{

    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            name: ""
        }
    }

    changeUsername = (e) => this.setState({username: e.target.value});
    changePassword = (e) => this.setState({password: e.target.value});
    changeName = (e) => this.setState({name: e.target.value});


    
     submitLogin = async (e) =>{
        e.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
        const url = `${window.apiHost}/api/user/register`;
        const data = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name
        }
        const resp = await axios.post(url,data);
        console.log(resp.data);
    
        if(resp.data.status === "userExists"){
            swal({
                title: "Email Exists",
                text: "The email provided is already registered. Please try another",
                icon: "error",
            })
        }
        else if(resp.data.status === "invalidData"){
            swal({
                title: "Invalid email/password",
                text: "Please provide a valid email/password",
                icon: "error",
            })
        }
        
        else if(resp.data.status === "success"){
            swal({
                title: "Success",
                icon: "success",
            })

            // we call our register action to update the auth Reducer
            this.props.regAction(resp.data);
        }
    }

    closeModal = ()=>{
        this.props.openModal('closed','');
    }

    render(){
        console.log(this.props.auth);
        return(
            <div className="row " id="signup">
            <div className="col l4 m3"></div>
                    <div className="col l4 m6 s12">
                <div className="card card-login">
                    <div className="card-content">
                        <h4>Register<span onClick={this.closeModal} className="close right">&times;</span></h4>
                        <form onSubmit={this.submitLogin}>

                        <div className="input-field signupinput">
                            <input id="name" type="text" className="validate" onChange={this.changeName}/>
                            <label htmlFor="name" id="name" className="signuplabel">Name</label>
                            </div>

                            <div className="input-field signupinput">
                            <input id="name" type="text" className="validate" onChange={this.changeUsername}/>
                            <label htmlFor="name" id="name" className="signuplabel">Username</label>
                            </div>

                            <div className="input-field signupinput">
                            <input id="password" type="password" className="validate" onChange={this.changePassword}/>
                            <label htmlFor="password" className="signuplabel">Password</label>
                            </div>

                            <button className="waves-effect waves-light btn sign-page-button" >Register</button>
                        </form>

                        <div className="textUnderFormContainer">
                            <span className="text-under-form">Already have an account? </span>
                            <span className="signuplink" onClick={()=>{this.props.openModal('open', <Login/>)}}>Login now</span>
                        </div>
                    
                    </div>
                </div>
            </div>
            <div className="col l4 m3"></div>
            </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);