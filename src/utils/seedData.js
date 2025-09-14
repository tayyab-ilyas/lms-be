require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Lead = require('../models/Lead');
const connectDB = require('../config/database');

const sources = ['website', 'facebook_ads', 'google_ads', 'referral', 'events', 'other'];
const statuses = ['new', 'contacted', 'qualified', 'lost', 'won'];
const companies = [
    'TechCorp', 'InnovateLLC', 'FutureTech', 'DataSolutions', 'CloudWorks',
    'SmartSystems', 'NextGen', 'ProTech', 'AdvancedTech', 'TechPioneer',
    'DigitalEdge', 'TechVision', 'InnoSoft', 'TechMasters', 'FutureWorks',
    'TechGlobal', 'SmartTech', 'TechSavvy', 'InnovateNow', 'TechLeaders'
];

const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
    'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington'
];

const states = [
    'NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA',
    'TX', 'FL', 'TX', 'OH', 'NC', 'CA', 'IN', 'WA', 'CO', 'DC'
];

const generateRandomLead = (index, userId) => {
    const firstName = `Lead${index}`;
    const lastName = `User${index}`;
    const email = `lead${index}@example.com`;
    const phone = `555-${String(index).padStart(4, '0')}`;
    const company = companies[Math.floor(Math.random() * companies.length)];
    const cityIndex = Math.floor(Math.random() * cities.length);
    const city = cities[cityIndex];
    const state = states[cityIndex];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const score = Math.floor(Math.random() * 101); // 0-100
    const lead_value = Math.floor(Math.random() * 100000) + 1000; // $1,000 - $101,000
    const is_qualified = Math.random() > 0.7; // 30% chance of being qualified

    const last_activity_at = Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 6 * 30 * 24 * 60 * 60 * 1000) : null;

    return {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        company,
        city,
        state,
        source,
        status,
        score,
        lead_value,
        last_activity_at,
        is_qualified,
        userId
    };
};

const seedData = async () => {
    try {
        await connectDB();

        console.log('🌱 Starting data seeding...');

        await User.deleteMany({});
        await Lead.deleteMany({});
        console.log('✅ Cleared existing data');

        const testUser = await User.create({
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User'
        });
        console.log('✅ Created test user:', testUser.email);

        const leads = [];
        for (let i = 1; i <= 150; i++) {
            leads.push(generateRandomLead(i, testUser._id));
        }

        await Lead.insertMany(leads);
        console.log('✅ Created 150 sample leads');

        console.log('🎉 Seeding completed successfully!');
        console.log('\n📋 Test Credentials:');
        console.log('Email: test@example.com');
        console.log('Password: password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    seedData();
}

module.exports = seedData;