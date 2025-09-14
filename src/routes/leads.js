const express = require('express');
const {
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead
} = require('../controllers/leadController');
const auth = require('../middleware/auth');

const router = express.Router();

// all lead routes need auth
router.use(auth);

router.route('/')
    .post(createLead)
    .get(getLeads);

router.route('/:id')
    .get(getLead)
    .put(updateLead)
    .delete(deleteLead);

module.exports = router;