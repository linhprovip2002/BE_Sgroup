const express = require('express');
const router = express.Router();

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
  

router.get('/all', (req, res) => {
  res.status(200).json(data)
})
// get user by id
router.get('/:id', (req, res) => {
  const id = req.params.id
  const user = data.find(user => user.id == id)
  if (!user) {
    console.log('not found')
    return res.status(404).json("user not found")
  }

  res.status(200).json(user)
})
//update user by id with data get from body
router.put('/:id', (req, res) => {
  const id = req.params.id
  const user = data.find(user => user.id == id)
  const index = data.indexOf(user)
  data[index] = req.body
  res.status(204).json(data)
})
//delete user by id
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const user = data.find(user => user.id == id)
  if (!user) {
    res.status(404).json("user not found")
  }
  const index = data.indexOf(user)
  data.splice(index, 1)
  res.status(204).json(data)
})
//create user with data get from body

router.post('/create', (req, res) => {
  const user = req.body
  console.log(user)
  data.push(user)
  res.status(201).json(data)
})


module.exports =  router;