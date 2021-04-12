const Contact = require('./models/Contact')

exports.getAllContacts = (req, res) => {
    res.json(contacts.getAllContacts())
}

exports.getContactById = (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    contact = contacts.getContactById(contactId)
    res.json(contact)
}

exports.createContact = (req, res)  => {
    let {name, phone, email } = req.body
    new_contact = new Contact({
        name,
        phone,
        email
    })
    new_contact.save()
                .then(contact => {
                    res.json(new_contact)  
                })
                .catch(e => {
                    console.log(e)
                    res.status(500).json({error: "Error occured"})
                })
}

exports.updateContact = (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    let { name, email, phone } = req.body 
    let updated_contact = contacts.updateContact(id, {
        name, email, phone
    })
    console.log(updated_contact)
    res.json(updated_contact)
}

exports.deleteContact = (req, res) => {
    let { id } = req.params
    id = parseInt(id)

    let contact = contacts.deleteContact(id)
    res.json(contact)
}