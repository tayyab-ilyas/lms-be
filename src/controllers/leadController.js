const Lead = require('../models/Lead');
const { buildLeadQuery } = require('../utils/queryBuilder');

const createLead = async (req, res) => {
    try {
        const leadData = {
            ...req.body,
            userId: req.user._id
        };

        const lead = await Lead.create(leadData);

        res.status(201).json({
            success: true,
            message: 'Lead created successfully',
            data: lead
        });
    } catch (error) {
        console.error('Create lead error:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Lead with this email already exists'
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while creating lead'
        });
    }
};

const getLeads = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const skip = (page - 1) * limit;

        let filters = {};
        if (req.query.filters) {
            try {
                filters = JSON.parse(req.query.filters);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid filters format'
                });
            }
        }

        const query = buildLeadQuery(filters, req.user._id);

        const [leads, total] = await Promise.all([
            Lead.find(query)
                .sort({ created_at: -1 })
                .skip(skip)
                .limit(limit),
            Lead.countDocuments(query)
        ]);

        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data: leads,
            page,
            limit,
            total,
            totalPages
        });
    } catch (error) {
        console.error('Get leads error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching leads'
        });
    }
};

const getLead = async (req, res) => {
    try {
        const lead = await Lead.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }

        res.status(200).json({
            success: true,
            data: lead
        });
    } catch (error) {
        console.error('Get lead error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching lead'
        });
    }
};

const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user._id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lead updated successfully',
            data: lead
        });
    } catch (error) {
        console.error('Update lead error:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Lead with this email already exists'
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while updating lead'
        });
    }
};

// Delete lead
const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lead deleted successfully'
        });
    } catch (error) {
        console.error('Delete lead error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting lead'
        });
    }
};

module.exports = {
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead
};