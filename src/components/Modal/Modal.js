import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import openModal from '../../actions/openModal';
import './Modal.css';

class Modal extends Component{

    state = {

    }

    
    
    render(){

        let modalInlineStyle;
        console.log(this.props.siteModal);
        if(this.props.siteModal.openClose === "open"){
            console.log("wooo");
            modalInlineStyle = {display: 'block'}
        }
        else{
            modalInlineStyle = {display: 'none'}
        }

        return(
            <div className="site-modal" style={modalInlineStyle}>
                <div className="modal-content">
                    <div className="">
                        {this.props.siteModal.content}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        siteModal: state.siteModal
    }
}

function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal : openModal,
    },dispatcher)
}

export default connect(mapStateToProps,mapDispatchToProps)(Modal)