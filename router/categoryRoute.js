const express = require('express');
const router = express.Router();
const db = require('../config/db/index')

router.get('/', (req, res) => {
    db.query('SELECT * FROM category', (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json("error")
        }
        res.status(200).json(result)
    })})
// get product by category    
router.get('/:category_name', (req, res) => {
    const category_name = req.params.category_name
    db.query('SELECT item_id,item_name,quantity  FROM item INNER JOIN category ON item.category_id = category.category_id WHERE category.category_name = ?', category_name, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json("error")
        }
        res.status(200).json(result)
    })
})


module.exports =  router;