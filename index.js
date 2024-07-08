require('dotenv').config();

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// 定义路由
app.get('/devices', async (req, res) => {
  const devices = await prisma.device.findMany();
  res.json(devices);
});

app.post('/devices', async (req, res) => {
  const { device_name, device_type, location, status } = req.body;
  const device = await prisma.device.create({
    data: {
      device_name,
      device_type,
      location,
      status,
    },
  });
  res.json(device);
});

app.get('/energy-usage', async (req, res) => {
  const energyUsage = await prisma.energyUsageData.findMany();
  res.json(energyUsage);
});

app.post('/energy-usage', async (req, res) => {
  const { device_id, timestamp, voltage, current, power, energy, frequency, power_factor } = req.body;
  const energyUsageData = await prisma.energyUsageData.create({
    data: {
      device_id,
      timestamp,
      voltage,
      current,
      power,
      energy,
      frequency,
      power_factor,
    },
  });
  res.json(energyUsageData);
});

app.get('/device-status', async (req, res) => {
  const deviceStatus = await prisma.deviceStatus.findMany();
  res.json(deviceStatus);
});

app.post('/device-status', async (req, res) => {
  const { device_id, timestamp, status } = req.body;
  const deviceStatus = await prisma.deviceStatus.create({
    data: {
      device_id,
      timestamp,
      status,
    },
  });
  res.json(deviceStatus);
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
