class Contact{
    constructor(){
        this.contacts = []
    }

    getAllContacts(){
        return this.contacts
    }

    getContactById(id){
        return this.contacts.find(contact => contact.id == id)
    }

    createContact(contact){
        contact.id = this.contacts.length + 1
        this.contacts.push(contact)
        return contact 
    }

    updateContact(id, updatedContact){
        let index = this.contacts.findIndex(contact => contact.id == id)
        this.contacts[index].name = updatedContact.name || this.contacts[index].name 
        this.contacts[index].email = updatedContact.email || this.contacts[index].email 
        this.contacts[index].phone = updatedContact.phone || this.contacts[index].phone
        console.log(this.contacts[index])
        return this.contacts[index]
    }

    deleteContact(id){
        const index = this.contacts.findIndex(contact => contact.id == id)
        let deletedObj = this.contacts[index]
        this.contacts = this.contacts.filter(contact => contact.id !== id)

        return deletedObj
    }
}

module.exports = new Contact()