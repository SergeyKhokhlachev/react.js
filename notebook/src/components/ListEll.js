import React, { Component } from 'react';
import appState from '../appState'

export default class ListEll extends Component {
	openModalMore = (event) => {
		let currentEll = event.target.parentNode.parentNode;
		appState.ellementList.forEach(function(element, index) {  
			if(element.id === Number(currentEll.id)) {
				appState.domNode.moreHead.textContent  = element.head;
				appState.domNode.moreCont.textContent  = element.cont;
				appState.domNode.moreDate.textContent = 'от: ' + new Date(element.date).toLocaleString('ru');
				appState.domNode.modalWind.style.visibility = 'visible';
				appState.domNode.modalWind.style.opacity = '1';
				appState.domNode.windMore.style.zIndex = '10';
				appState.domNode.windMore.style.opacity = '1';
				appState.domNode.windMore.style.transform = 'translate(-50%, -50%)';
			}
		})
	}
	redactItem = (event) => {
		appState.redactNote = true;
		appState.currentEll = event.target.parentNode.parentNode.parentNode;
		appState.ellementList.forEach(function(element, index) {  
			if(element.id === Number(appState.currentEll.id)) {
				appState.indexList = index;
				appState.formEll.head.value = element.head;
				appState.formEll.cont.value = element.cont;
				appState.domNode.modalWind.style.visibility = 'visible';
				appState.domNode.modalWind.style.opacity = '1';
				appState.domNode.windForm.style.zIndex = '10';
				appState.domNode.windForm.style.opacity = '1';
				appState.domNode.windForm.style.transform = 'translate(-50%, -50%)';
			}
		})
	}
	removeItem = (event) => {
		let currentEll = event.target.parentNode.parentNode.parentNode;
		currentEll.style.opacity = '0';
		setTimeout(() => {
			appState.ellementList.forEach(function(element, index) { 
				if(element.id === Number(currentEll.id)) {
					appState.ellementList.splice(index, 1);
				}
			});
			localStorage.setItem('noteData', JSON.stringify(appState.ellementList));
			this.props.setEllementList();
		}, 400);
	}
  render() {
    return (
      <div id={this.props.id} className="note-item note-ell">
				<div className="item-head">
					<div className="item-icon">
						<i className="change-note fa fa-pencil" onClick={this.redactItem}></i>
						<i className="remove-note fa fa-times" onClick={this.removeItem}></i>
					</div>
					<h3 className="item-header">{this.props.head}</h3>
				</div>
				<div className="item-content">{this.props.cont}</div>
				<span className="item-foot">
					<span className="item-date">от: {new Date(this.props.date).toLocaleString('ru')}</span>
					<span className="item-more" onClick={this.openModalMore}>Подробнее...</span>
				</span>
			</div>
    )  
  }
}


