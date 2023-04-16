const express = require('express');
const router = express.Router();
const db = require('../config/db/index')

router.get('/', (req, res) => {
    db.query('SELECT * FROM item', (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json("error")
        }
        res.status(200).json(result)
    })})
router.post('/', (req, res) => {    
    db.query('INSERT INTO item SET ?', req.body, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json("error")
        }
        res.status(200).json(result)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM item WHERE item_id = ?', id, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json("error")
        }
        if(result.length > 0)
        {

            res.status(200).json(result)
        }
        else{
            res.status(404).json("deo tim ra")
        }
    })
});

router.put('/:id', (req, res) => {
    const id = req.params.id
    db.query('UPDATE item SET ? WHERE item_id = ?', [req.body, id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json("error")
        }
        res.status(200).json(result)
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.query('DELETE FROM item WHERE item_id = ?', id, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json("error")
        }
        res.status(200).json(result)
    })
});
module.exports =  router;