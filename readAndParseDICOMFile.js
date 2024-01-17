const fs = require("fs");
const dcmjs = require("dcmjs");

const readDICOMFile = (filePath) => {
  const buffer = fs.readFileSync(filePath).buffer;
  const data = dcmjs.data.DicomMessage.readFile(buffer);
  return data;
};

module.exports = readDICOMFile;
