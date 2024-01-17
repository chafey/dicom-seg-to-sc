const fs = require("fs");
const dcmjs = require("dcmjs");
const { datasetToBuffer } = dcmjs.data;

const writeToFile = (instance) => {
  const buffer = datasetToBuffer(instance);
  fs.writeFileSync("dicomout/" + instance.SOPInstanceUID + ".dcm", buffer);
};

module.exports = writeToFile;
