const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

pool.on('connect', () => {
    console.log('postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error connecting to db', error);
});

//POST
router.post('/', (req, res) => {
    console.log('in post message', req.body);

    const message = req.body.message;
    const user = req.body.user;
    console.log(user, message);

    //query to add message to database

    const addUser = `INSERT INTO "users" ("name") VALUES ($1);`;
    
    pool.query(addUser, [user])
        .then((results) => {
            console.log('added user:', user);
            getUserId(user, message);
        })
        .catch((error) => {
            console.log('error in adding user:', error);
            res.sendStatus(500);
        });

    function getUserId(user, message) {
        console.log('in add message', message);

        const getUserIdQuery = `SELECT id FROM "users" WHERE "users"."name" = $1;`;

        pool.query(getUserIdQuery, [user])
            .then((results) => {
                console.log('got user id:', results.rows);
                const userObj = results.rows[0];
                const userId = userObj.id;
                console.log(userObj, userId);
                addMessage(message, userId);
            })
            .catch((error) => {
                console.log('error getting user id:', error);
                res.sendStatus(500);
            });
    }// end getUserId

    function addMessage(message, userId) {
        console.log('in addMessage');
        const addMessageQuery = `INSERT INTO "messages" ("message", "user_id") VALUES ($1, $2);`;
        console.log(message, userId);
        
            pool.query(addMessageQuery, [message, userId])
                .then((results) => {
                    console.log('added message');
                    res.sendStatus(201);
                })
                .catch((error) => {
                    console.log('error adding message:', error);
                    res.sendStatus(500);
                });

               
    }//end addMessage
});



module.exports = router;