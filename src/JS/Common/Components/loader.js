/*
    This file contains commmon component Checkbox
    which can be used in multiple projects

    
*/

import React from 'react';
import ReactDOM from 'react-dom';

export default class Loader extends React.Component {
    render() {
    	let isVisibleClass = this.props.isLoading ? '' : 'u-hide'
        return (
        	<div className={`u-overlay ${isVisibleClass}`}>
	        	<div className='u-loader'>
	        	    <div></div>
	        	    <div></div>
	        	    <div></div>
	        	    <div></div>
	        	    <div></div>
	        	    <div></div>
	        	    <div></div>
	        	    <div></div>
	        	    <div></div>
	        	    <div></div>
	        	    <div></div>
	        	    <div></div>
	        	</div>
        	</div>
        )
    }
}

