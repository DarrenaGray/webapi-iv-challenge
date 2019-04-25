const express = require('express');

const Posts = require('./postDb');

const router = express.Router();


router.get('/', (req, res) => {
    Posts
        .get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The post information could not be retrieved"
            });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Posts
        .getById(id)
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The post information could not be retrieved."
            })
        });
});

router.post('/', (req, res) => {
    const { user_id, text } = req.body;
    Posts
        .insert( { user_id, text })
        .then(() => {
            res.status(201).json();
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "There was an error while saving the post to the database."
            })
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Posts
        .remove(id)
        .then(deletedpost => {
            if (deletedpost) {
                res.status(201).json({
                    message: "The post was deleted."
                });
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The post could not be deleted."
            })
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const text = req.body;
    Posts
        .update(id, text)
        .then(updatedpost => {
            res.status(200).json(updatedpost);
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The post could not be updated."
            });
        });
});


module.exports = router;