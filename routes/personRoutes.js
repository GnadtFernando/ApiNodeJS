const router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async (req, res) => {
    const { name, email, password } = req.body

    if (!name) {
        res.status(422).json({ error: 'Dados Obrigatorios' });
        return
    }

    const person = {
        name, email, password,
    }

    try {

        await Person.create(person);

        res.status(201).json({ message: 'Cadastro Criado com Sucesso' })

    } catch (error) {
        res.status(500).json({ error: error });
    }

});


router.get('/', async (req, res) => {
    try {

        const people = await Person.find()

        res.status(200).json(people);

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {

        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: "Não encontrado" })
            return
        }

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, email, password } = req.body

    const person = {
        name, email, password,
    }

    try {

        const updatedPerson = await Person.updateOne({ _id: id }, person);

        res.status(200).json(person);

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: "Não encontrado" })
            return
        }

    }
    catch (error) {
        res.status(500).json({ error: error });
    }

});

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: "Não encontrado" })
        return
    }

    try {

        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: "Excluido com sucesso" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router