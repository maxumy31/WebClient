
import ContactCard from "./ContactCard"

export default function ContactList({
    contacts,
    onDelete}) {

    function CreateCardsFromData(data) {
        return data.map((d) => 
            <ContactCard 
                name={d.name} 
                email={d.email} 
                phone={d.phone} 
                key={d.id} 
                id={d.id} 
                onDelete={(id) => onDelete(id)}
            />
        )
    }

    return (
        <div className="container mx-auto flex flex-col">
            <div className="my-2 w-[55%] flex flex-row gap-4 mx-auto">
                <span>Всего контактов: {contacts.length}</span>
            </div>
            <div className="flex flex-col gap-4 items-center container">
                {CreateCardsFromData(contacts)}
            </div>
        </div>

    )
}