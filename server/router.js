const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Le serveur fonctionne') // établi la route et envoi message au serveur
});

module.exports = router; // module exporté dans index.js 