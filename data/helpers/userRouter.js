const express = require('express');

const Users = require('./userDb');


const router = express.Router();

function capitalized() {
    return function (req, res, next) {
        const { name } = req.body;
        if (name === name.charAt(0).toUpperCase() + name.slice(1)) {
            next();
        } else {
            res.status(400).json({
                message: "Name needs to be capitalized."
            });
        };
    };
};

router.get('/', (req, res) => {
    Users
        .get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The user information could not be retrieved"
            });
        });
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    Users
        .getById(userId)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The user information could not be retrieved."
            });
        });
});

router.post('/', capitalized(), (req, res) => {
    if ( req.body.name && req.body.name !== "") {
        const userInfo = req.body;
        Users
            .insert(userInfo)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                res.status(500).json({
                    error: err,
                    message: "This name already exists."
                })
            });
    } else {
        res.status(400).json({
            error: "Must include name."
        });
    };
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    Users
        .remove(userId)
        .then(deletedUser => {
            if (deletedUser) {
                res.status(201).json({
                    message: "The user was deleted."
                });
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The user could not be deleted."
            })
        });
});

router.put('/:id', capitalized(), (req, res) => {
    if (req.body.name && req.body.name !== "") {
        const userId = req.params.id;
        const userInfo = req.body;
        Users
            .update(userId, userInfo)
            .then(updatedUser => {
                if(updatedUser) {
                    res.status(200).json(updatedUser);
                } else {
                    res.status(404).json({
                        message: "The user with the specified ID does not exist."
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err,
                    message: "The user could not be updated."
                });
            });
    } else {
        res.status(400).json({
            error: "Must include name."
        })
    }
});

router.get('/:id/posts', (req, res) => {
    const posts = req.params.id;
    Users
        .getUserPosts(posts)
        .then(post => {
            if (post.length !== 0) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The user information could not be retrieved."
            });
        });
});


module.exports = router;