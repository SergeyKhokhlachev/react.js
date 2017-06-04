import '../assets/css/list.css'
import React, { Component } from 'react';
import appState from '../appState'
import ListEll from '../components/ListEll'

export default class List extends Component {
	componentDidMount() {
		appState.domNode.listCont = this.refs.listContainer;
	}
	addEll() {
		appState.redactNote = false;
		appState.domNode.modalWind.style.visibility = 'visible';
		appState.domNode.modalWind.style.opacity = '1';
		appState.domNode.windForm.style.zIndex = '10';
		appState.domNode.windForm.style.opacity = '1';
		appState.domNode.windForm.style.transform = 'translate(-50%, -50%)';
	}
  render() {
  	let listEll;
  	if(this.props.ellementList.length){
			listEll =	this.props.ellementList.map((ellement) => {
				return <ListEll key={ellement.id} id={ellement.id} head={ellement.head} cont={ellement.cont} date={ellement.date} setEllementList={this.props.setEllementList}/>
			})
		}
    return (
      <div ref="listContainer" className="note-contain">
        <div className="note-new note-ell" onClick={this.addEll}>
					<div className="new-add">
						<i className="fa fa-plus"></i>
					</div>
				</div>
				{listEll}  
      </div>
    )  
  }
}