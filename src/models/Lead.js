const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  last_name: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    enum: ['website', 'facebook_ads', 'google_ads', 'referral', 'events', 'other']
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['new', 'contacted', 'qualified', 'lost', 'won'],
    default: 'new'
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score must be at least 0'],
    max: [100, 'Score cannot exceed 100'],
    default: 0
  },
  lead_value: {
    type: Number,
    required: [true, 'Lead value is required'],
    min: [0, 'Lead value must be positive']
  },
  last_activity_at: {
    type: Date,
    default: null
  },
  is_qualified: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// indexing
leadSchema.index({ userId: 1, email: 1 });
leadSchema.index({ userId: 1, status: 1 });
leadSchema.index({ userId: 1, source: 1 });
leadSchema.index({ userId: 1, created_at: -1 });

module.exports = mongoose.model('Lead', leadSchema);