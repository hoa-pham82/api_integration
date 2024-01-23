var request = require("supertest");
const { client_id, client_secret } = require("./const");
const host = process.env.SERVER;
const { shipperAccount, adminAccount, driverAccount } = require("./data");

const getToken = async (username, password) => {
  const payload = {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: "password",
    username: username,
    password: password,
  };
  const response = await request(host)
    .post("/o/token/")
    .send(payload)
    .set("Content-Type", "application/x-www-form-urlencoded");

  return response.body && response.body.access_token
    ? response.body.access_token
    : "";
};

module.exports = async () => {
  process.env.shipperToken = await getToken(
    shipperAccount.username,
    shipperAccount.password
  );
  process.env.adminToken = await getToken(
    adminAccount.username,
    adminAccount.password
  );
  process.env.driverToken = await getToken(
    driverAccount.username,
    driverAccount.password
  );
};
