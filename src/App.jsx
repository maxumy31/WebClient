import { useEffect, useState } from 'react'

import viteLogo from '/vite.svg'
import './global.css'
import ContactCard from './components/ContactCard'
import ContactList from './components/ContactList'
import Header from './components/Header'
import AddContactModal from './components/AddContactModal'

function App() {

	const [isModalOpened, setModalOpen] = useState(false);

	return (
		<div>
			<Header onAddClick={() => {
				setModalOpen(true);
			}} />
			<ContactList data />
			<AddContactModal isOpen={isModalOpened} onClose={() => setModalOpen(false)}/>
		</div>
	)
}

export default App
