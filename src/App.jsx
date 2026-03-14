import { useReducer } from 'react'

import './global.css'

import ContactList from './components/ContactList'
import Header from './components/Header'
import AddContactModal from './components/AddContactModal'

const States = Object.freeze({
	EMPTY: Symbol("Empty"),
	CONTACT_INPUT: Symbol("ContactInput"),
	CONTACT_ADDED: Symbol("ContactAdded"),
	VALIDATION_ERROR: Symbol("ValidationError"),
	LIST_FULL: Symbol("ListFull"),
	NORMAL: Symbol("Normal"),
});

const Actions = Object.freeze({
	INPUT_NAME: Symbol("InputName"),
	INPUT_PHONE: Symbol("InputNumber"),
	INPUT_EMAIL: Symbol("InputEmail"),
	SAVE_CONTACT: Symbol("SaveContact"),
	DELETE_CONTACT: Symbol("DeleteContact"),
	FORMAT_ERROR: Symbol("FormatError"),
	CLOSE_MODAL: Symbol("CloseModal"),
});

function reducer(state, action) {
	const maxSize = 6;

	switch (action.type) {
		case Actions.OPEN_MODAL:
			return {
				...state,
				status: States.CONTACT_INPUT
			};
		case Actions.CLOSE_MODAL:
			return {
				...state,
				status: States.NORMAL,
				errorMessage: null,
			};
		case Actions.INPUT_NAME:
			return {
				...state,
				status: States.CONTACT_INPUT
			};
		case Actions.INPUT_PHONE:
			return {
				...state,
				status: States.CONTACT_INPUT
			};
		case Actions.INPUT_EMAIL:
			return {
				...state,
				status: States.CONTACT_INPUT
			};
		case Actions.SAVE_CONTACT:
			const {
				name,
				email,
				phone,
			} = action.data;

			// Не удалось добавить - слишком много контактов
			if (state.contact_list.length >= maxSize) {
				return { ...state, status: States.LIST_FULL };
			}

			// Не удалось добавить - ошибка валидации
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return {
					...state,
					status: States.VALIDATION_ERROR,
					errorMessage: "Неверный формат почты"
				};
			}
			const phoneRegex = /^\+?\d{7,15}$/;
			if (!phoneRegex.test(phone)) {
				return {
					...state,
					status: States.VALIDATION_ERROR,
					errorMessage: "Неверный формат номера телефона"
				};
			}

			if (!name) {
				return {
					...state,
					status: States.VALIDATION_ERROR,
					errorMessage: "Неверно задано имяы"
				};
			}

			// Удалось добавить
			return {
				...state,
				contact_list: [...state.contact_list, {
					name: name,
					email: email,
					phone: phone,
					id: crypto.randomUUID(),
				}],
				status: States.CONTACT_ADDED,
				errorMessage: null,
			};
		case Actions.DELETE_CONTACT:
			const newList = state.contact_list.filter(d => d.id !== action.data)
			return {
				...state,
				contact_list: newList,
				status: newList.length >= maxSize ? States.LIST_FULL : States.NORMAL
			}
	}

	return state;
}

function App() {

	const initialState = {
		status: States.EMPTY,
		contact_list: [],
		error_message: null,
	}

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			<Header onAddClick={() => {
				dispatch({ type: Actions.OPEN_MODAL });
			}} />

			<ContactList
				contacts={state.contact_list}
				onDelete={(id) => {
					dispatch({ type: Actions.DELETE_CONTACT, data: id });
				}}
			/>

			{
				(
					state.status === States.CONTACT_INPUT
					|| state.status === States.VALIDATION_ERROR
				)
				&& <AddContactModal
					onClose={() => {
						dispatch({ type: Actions.CLOSE_MODAL })
					}}
					onEmailInput={(email) => {
						dispatch({ type: Actions.INPUT_EMAIL, data: email });
					}}
					onPhoneInput={(phone) => {
						dispatch({ type: Actions.INPUT_NUMBER, data: phone });
					}}
					onNameInput={(name) => {
						dispatch({ type: Actions.INPUT_NAME, data: name });
					}}
					onSubmit={(data) => {
						dispatch({ type: Actions.SAVE_CONTACT, data: data });
					}}
					errorMessage={state.errorMessage}
				/>}
		</div>
	)
}

export default App
