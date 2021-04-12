const Contact = require('./models/Contact')

exports.getAllContacts = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.json(contacts)
        })
        .catch(e => {
            console.log(e)
            res.status(500).json({ error: "Error occured" })
        })
}

exports.getContactById = (req, res) => {
    let { id } = req.params
    Contact.findById(id)
        .then(contact => {
            res.json(contact)
        })
        .catch(e => {
            console.log(e)
            res.status(500).json({ error: "Error occured" })
        })
}

exports.createContact = (req, res) => {
    let { name, phone, email } = req.body
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
            res.status(500).json({ error: "Error occured" })
        })
}

exports.updateContact = (req, res) => {
    let { id } = req.params
    let { name, email, phone } = req.body
    Contact.findOneAndUpdate(
        { _id: id },
        {
            $set: { name, email, phone }
        },
        { new: true }
    ).then(contact => {
        res.json(contact)
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: "Error occured" })
    })
}

exports.deleteContact = (req, res) => {
    let { id } = req.params

    Contact.findOneAndDelete({_id: id})
    .then(contact => {
        res.json(contact)
    })
    .catch(e => {
        console.log(e)
        res.status(500).json({ error: "Error occured" })
    })
}