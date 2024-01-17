const getDICOMValue = require("./getDICOMValue");

const validateDICOMSEG = (data) => {
  if (getDICOMValue(data.meta, "00020010") !== "1.2.840.10008.1.2.1") {
    throw "Transfer Syntax must be Explicit VR Little Endian";
  }
  // TODO: Add more validation
};

module.exports = validateDICOMSEG;
