import React, { Component } from 'react'
// import ReactFileReader from 'react-file-reader';
import {connect} from 'react-redux';
import logoutAction from '../actions/logoutAction';
import {bindActionCreators} from 'redux';
import CsvData from '../components/CsvData';

class Uploadcsv extends Component {
    

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
                <h4>Hello  {this.props.auth.name} :)</h4>
                <h5>
                    Username : {this.props.auth.username} <br/>
                    Account Number : {this.props.auth.accountNumber}
                </h5>
                <li onClick={this.handleLogout} className="logoutButton homesignupbutton waves-effect waves-light btn-large " style={{fontWeight: "bold"}}>Logout</li>
                <h4>Upload File</h4>
                <div>Accepted File format: csv</div>

                <div>
                      <CsvData name={this.props.auth.name} username={this.props.auth.username} accountNumber={this.props.auth.accountNumber}/>
                </div>
            
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
        logoutAction: logoutAction
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploadcsv);





