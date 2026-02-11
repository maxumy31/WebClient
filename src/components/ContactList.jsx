
import ContactCard from "./ContactCard"
import { useSelector } from "react-redux";

export default function ContactList() {
    const contacts = useSelector((state) => state.contacts.contacts)
    const searchQuery = useSelector((state) => state.contacts.searchQuery)

    const filteredContacts = searchQuery 
        ? contacts.filter(c => c.name.toLowerCase().startsWith(searchQuery.toLowerCase())) 
        : contacts

    function CreateCardsFromData(contracts) {
        return contracts.map((d) => <ContactCard name={d.name} email={d.email} phone={d.phone} key={d.id} id={d.id} />)
    }

    return (
        <div className="container mx-auto flex flex-col">
            <div className="my-2 w-[80%] flex flex-row justify-around gap-4 mx-auto">
                <span>Всего контактов: {contacts.length}</span>
                <span>Найдено контактов по фильтру: {filteredContacts.length}</span>
            </div>
            <div className="flex flex-col gap-4 items-center container">
                {CreateCardsFromData(filteredContacts)}
            </div>
        </div>

    )
}