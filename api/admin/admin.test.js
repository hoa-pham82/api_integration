const { assignJobToTruck } = require("./api");
const { postEstimateJob, submitJob, cancelJob } = require("../job/api");
const { truckTypeId } = require("../../utils/const");
const { driverAccount } = require("../../utils/data");

describe("[POST] Assign job to truck", () => {
  let res;
  let estimateId;
  let jobId;

  beforeAll(async () => {
    let job = await postEstimateJob(truckTypeId.pantech);
    estimateId = job.body.id;

    let submittedJob = await submitJob(truckTypeId.pantech, estimateId);
    jobId = submittedJob.body.id;

    res = await assignJobToTruck(jobId, driverAccount.truckId);
  });

  afterAll(async () => {
    await cancelJob(jobId);
  });

  test("Status code is 200", () => {
    expect(res.status).toBe(200);
  });

  test("Job status is assigned (M)", () => {
    expect(res.body.status).toBe("M");
  });

  test("Job status is assigned to correct truck", () => {
    expect(res.body.truck.id).toBe(driverAccount.truckId);
  });
});
