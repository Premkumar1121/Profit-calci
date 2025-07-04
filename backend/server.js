#!/usr/bin/env node

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { execFile } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Cost from './models/cost.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

/**
 * POST /api/calculate-profit
 * - Input: { distance, weight, priority }
 * - Reads cost config from DB
 * - Calls Java CLI
 * - Returns profit calculation
 */
app.post('/api/calculate-profit', async (req, res) => {
  const { distance, weight, priority } = req.body;

  if (!distance || !weight || !priority) {
    return res.status(400).json({ error: 'distance, weight, priority are required' });
  }

  try {
    // 1️⃣ Load cost parameters from DB
    const costDoc = await Cost.findOne({ _id: 'default' });
    if (!costDoc) {
      return res.status(500).json({ error: 'Cost configuration not found in DB' });
    }

    const { fuelPricePerKm, driverRatePerKm, tollCost } = costDoc;

    console.log(`📌 Using costs from DB:
      fuelPricePerKm=${fuelPricePerKm},
      driverRatePerKm=${driverRatePerKm},
      tollCost=${tollCost}`);

    // 2️⃣ Call Java CLI
    const javaDir = path.join(__dirname, 'java');
    const args = [
      '-cp', javaDir,
      'ProfitCalculator',
      distance,
      weight,
      priority,
      fuelPricePerKm,
      driverRatePerKm,
      tollCost
    ];

    execFile('java', args, (err, stdout, stderr) => {
      if (err) {
        console.error('❌ Java error:', err, stderr);
        return res.status(500).json({ error: 'Error running profit calculation' });
      }

      try {
        const result = JSON.parse(stdout.trim());
        console.log('✅ Java returned:', result);
        res.json(result);
      } catch (parseErr) {
        console.error('❌ Error parsing Java output:', parseErr, stdout);
        res.status(500).json({ error: 'Invalid response from Java CLI' });
      }
    });

  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/costs
 * - For viewing the current cost config
 */
app.get('/api/costs', async (req, res) => {
  try {
    const costs = await Cost.find({});
    res.json(costs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
