import '../assets/css/font-awesome.min.css'
import '../assets/css/app.css'
import React, { Component } from 'react'
import Header from '../components/Header'
import List from '../components/List'
import Modal from '../components/Modal'
import appState from '../appState'

export default class App extends Component {
	constructor() {
    super();
    this.state = {
    	ellementList: []
    };
  }
	componentDidMount() {
		if(localStorage.getItem('noteData')){
			appState.ellementList = JSON.parse(localStorage.getItem('noteData'));
			this.setState({ellementList: appState.ellementList});
		};
	}
	setEllementList = () => {
		this.setState({ellementList: appState.ellementList});
	}
  render() {
    return (
    	<div className="notepad-wrap">
    		<Header setEllementList={this.setEllementList} />
    		<List ellementList={this.state.ellementList} setEllementList={this.setEllementList}/>
    		<Modal setEllementList={this.setEllementList}/>
			</div>  
    )
  }
}



