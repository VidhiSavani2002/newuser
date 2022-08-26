const express = require('express')
const User = require('../models/users')

const router = new express.Router()


router.post("/new", (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.send(error);

    })
})

router.get("/getnew", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    }).catch((error) => {
      res.send(error);
    }
    )

})

router.get("/getnew/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send(user);
    }).catch((error) => {
      res.send(error);
    }
    )

})

router.patch("/getnew/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!user) {
      return res.status(404).send("user not found");
    }

    res.send(user);
  } catch (e) {
    res.send(e);
  }
})

router.delete("/getnew/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send("user not found");
    }

    res.send(user);
  } catch (e) {
    res.send(e);
  }
}
)


module.exports = router;