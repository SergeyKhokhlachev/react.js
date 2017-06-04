import '../assets/css/header.css'
import React, { Component } from 'react'
import appState from '../appState'

export default class Header extends Component {
	filterByName = (event) => {
		event.target.classList.toggle('reverse');
		appState.ellementList.sort((item1,item2) => {
			let val1 = item1.head,
					val2 = item2.head;	
			if(event.target.classList.contains('reverse')){
				if (val1 < val2) return 1;
				else if (val1 > val2) return -1;
				else return 0;
			} else {	
				if (val1 < val2) return -1;
				else if (val1 > val2) return 1;
				else return 0;
			}			
		})
		this.props.setEllementList();
	}
	filterByDate = (event) => {
		event.target.classList.toggle('reverse')
		appState.ellementList.sort((item1,item2) => {
			let val1 = item1.date,
					val2 = item2.date;	
			if(event.target.classList.contains('reverse')){
				if (val1 < val2) return 1;
				else if (val1 > val2) return -1;
				else return 0;
			} else {	
				if (val1 < val2) return -1;
				else if (val1 > val2) return 1;
				else return 0;
			}			
		})
		this.props.setEllementList();
	}
	changeView = (event) => {
		if(event.target.classList.contains('row-view')){
			event.target.textContent = 'список';
			event.target.classList.toggle('row-view');
			appState.domNode.listCont.classList.toggle('flex-coll');
		} else {
			event.target.textContent = 'плитка';
			event.target.classList.toggle('row-view');
			appState.domNode.listCont.classList.toggle('flex-coll');	
		}
	}
  render() {
    return (
    	<div className="note-header">
				<div className="note-left">
					<span className="filter-head">Фильтр записей:</span>
					<span className="filter-name note-filter" onClick={this.filterByName}>по имени <i className="fa fa-chevron-down"></i></span>
					<span className="filter-date note-filter" onClick={this.filterByDate}>по дате <i className="fa fa-chevron-down"></i></span>
				</div>
				<div className="note-right">
					<span className="filter-head">Вид:</span>
					<span className="filter-view note-filter row-view" onClick={this.changeView}>плитка</span>
				</div>
			</div> 
    )
  }
}
