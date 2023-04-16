const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate')
const db = require('../config/db/index')
data = [
    {
          "id": 1,
          "fullname": "Nguyen Huy Tuong",
          "gender": true,
          "age": 18
      },
      {
          "id": 2,
          "fullname": "Nguyen Thi Tuong",
          "gender": false,
          "age": 15
      },
    {
      "id": 3,
      "fullname": "Nguyen Thi Tuong",
      "gender": false,
      "age": 15
    },
  ]

function find_user_by_id(user_id) {
    query = 'select * from Users where user_id = ?'
    db.query(query, user_id, (err, result) => {
        if (err) {
            console.log(err)
            return false
        }
        return true
    })
}

router.get('/', (req, res) => {
  // res.status(200).json(data)
  query = 'select * from Users'
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json("error")
    }
    res.status(200).json(result)
  })
})
// get user by id
router.get('/:id', (req, res) => {
  const id = req.params.id
  // const user = data.find(user => user.id == id)
  // if (!user) {
  //   console.log('not found')
  //   return res.status(404).json("user not found")
  // }

  // res.status(200).json(user)
   if (!find_user_by_id(id))
   {
    return res.status(404).json("user not found")
   }
   query = 'select * from Users where user_id = ?'
   db.query(query, id, (err, result) => {
    if(err)
    {
      console.log(err)
      return res.status(500).json("error")
    }
    res.status(200).json(result)
})})
//update user by id with data get from body
router.put('/:id',validate, (req, res) => {
  const id = req.params.id
  // const user = data.find(user => user.id == id)
  // const index = data.indexOf(user)
  // data[index] = req.body
  // res.status(204).json(data)
  if (!find_user_by_id(id))
   {
    return res.status(404).json("user not found")
   }
    query = 'update user set ? where user_id = ?'
    db.query(query, [req.body, id], (err, result) => {
      if(err)
      {
        console.log(err)
        return res.status(500).json("error")
      }
      res.status(200).json(result)})
})
//delete user by id
router.delete('/:id', (req, res) => {
  // const id = req.params.id
  // const user = data.find(user => user.id == id)
  // if (!user) {
  //   res.status(404).json("user not found")
  // }
  // const index = data.indexOf(user)
  // data.splice(index, 1)
  // res.status(204).json(data)
  if (!find_user_by_id(id))
   {
    return res.status(404).json("user not found")
   }
    query = 'delete from Users where user_id = ?'
    db.query(query, id, (err, result) => {
      if(err)
      {
        console.log(err)
        return res.status(500).json("error")
      }
      res.status(200).json(result)})  
})
//create user with data get from body

router.post('/create',validate ,(req, res) => {
  // const user = req.body
  // console.log(user)
  // data.push(user)
  // res.status(201).json(data)
  query = 'insert into Users set ?'
  db.query(query,req.body, (err, result) => {
    if(err)
    {
      console.log(err)
      return res.status(500).json("error")
    }
    res.status(201).json("data inserted")})
})


module.exports =  router;