import '../assets/css/modal.css'
import appState from '../appState'
import React, { Component } from 'react'

export default class Modal extends Component {
	componentDidMount() {
		appState.domNode.modalWind = this.refs.modalWind;
		appState.domNode.windForm = this.refs.modalWind.firstElementChild;
		appState.domNode.windMore = this.refs.modalWind.lastElementChild;
		appState.domNode.moreHead = this.refs.moreHead
		appState.domNode.moreDate = this.refs.moreDate
		appState.domNode.moreCont = this.refs.moreCont
		appState.formEll.head = this.refs.formHead;
		appState.formEll.cont = this.refs.formCont;
	}
	saveChange = () => {
		let ellDate = new Date().toString(),
				ellementId = 0;
		if(appState.ellementList.length){
			appState.ellementList.forEach((ellement) => {
				if(ellement.id > ellementId) ellementId = ellement.id;
			})
		}
		if(appState.redactNote && this.requiredNoteTest()) {
			this.closeModalForm();
			appState.ellementList[appState.indexList].head = appState.formEll.head.value;
			appState.ellementList[appState.indexList].cont = appState.formEll.cont.value;
			appState.ellementList[appState.indexList].date = ellDate;
			localStorage.setItem('noteData', JSON.stringify(appState.ellementList));
			this.props.setEllementList();
		} else if(this.requiredNoteTest()) {
			this.closeModalForm();
			let ellement = {
				id: ellementId + 1,
				head: appState.formEll.head.value,
				cont: appState.formEll.cont.value,
				date: ellDate
			};
			appState.ellementList.unshift(ellement);
			localStorage.setItem('noteData', JSON.stringify(appState.ellementList));
			this.props.setEllementList();
		}	
	}
	closeModal = (ellement) => {
		appState.domNode.modalWind.style.opacity = '0';
		ellement.style.zIndex = '0';
		ellement.style.opacity = '0';
		ellement.style.transform = 'translate(-50%, -80%)';
		setTimeout(() => {
			appState.domNode.modalWind.style.visibility = 'hidden';
		}, 300);
	}
	closeModalForm = () => {
		this.closeModal(appState.domNode.windForm);
		setTimeout(() => {
			appState.formEll.head.value = '';
			appState.formEll.cont.value = '';
			appState.formEll.head.classList.remove('error');
			appState.formEll.cont.classList.remove('error');
		}, 300);
	}
	closeModalMore = () => {
		this.closeModal(appState.domNode.windMore);
	}
	requiredForm = (event) => {
		event.target.value.replace(/\s/g, '') ? event.target.classList.remove('error') : event.target.classList.add('error');	
	}
	requiredNoteTest = () => {
		appState.formEll.head.value.replace(/\s/g, '') ? appState.formEll.head.classList.remove('error') : appState.formEll.head.classList.add('error');
		appState.formEll.cont.value.replace(/\s/g, '') ? appState.formEll.cont.classList.remove('error') : appState.formEll.cont.classList.add('error');
		if(appState.formEll.head.value.replace(/\s/g, '') && appState.formEll.cont.value.replace(/\s/g, '')) {
			return true
		} else {
			return false
		} 
	}
  render() {
    return (
    	<div ref="modalWind" className="modal-wind">

				<div className="modal-form modal-blok">
					<div className="modal-head">Настройка записи</div>
					<div className="modal-content">
						<p>Введите текст заголовка:</p>
						<input ref="formHead" type="text" name="note-head" onInput={this.requiredForm} />
						<p>Введите текст записи:</p>
						<textarea ref="formCont" onInput={this.requiredForm}></textarea>
						<div className="text-center">
							<div className="wind-btn" onClick={this.saveChange}>
								<span className="bt-bg"></span>
								<span className="save-note bt-text">Сохранить</span>
							</div>
							<div className="wind-btn" onClick={this.closeModalForm}>
								<span className="bt-bg"></span>
								<span className="chanel-note bt-text">Отмена</span>
							</div>
						</div>
					</div>
				</div>

				<div className="modal-more modal-blok">
					<i className="close-more fa fa-times" onClick={this.closeModalMore}></i>
					<div ref="moreHead" className="modal-head"></div>
					<div ref="moreDate" className="modal-date"></div>
					<div ref="moreCont" className="modal-content"></div>
				</div>

			</div>
    )
  }
}
