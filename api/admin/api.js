var request = require("supertest");
const host = process.env.SERVER;
let adminToken = process.env.adminToken;

const assignJobToTruck = async (jobId, driverTruckId) => {
  let payload = {
    truck: {
      id: driverTruckId,
    },
  };
  const res = await request(host)
    .post(`/jobs/${jobId}/`)
    .send(payload)
    .set("Authorization", `Bearer ${adminToken}`)
    .set("Content-Type", "application/json");

  return res;
};

const getMatchingTruck = async (jobId) => {
  const res = await request(host)
    .get(`/jobs/${jobId}/`)
    .set("Authorization", `Bearer ${adminToken}`);

  return res;
};
module.exports = {
  assignJobToTruck,
  getMatchingTruck,
};
