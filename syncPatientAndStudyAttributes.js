const getDICOMValue = require("./getDICOMValue");

const syncPatientAndStudyAttributes = (instance, data) => {
  // Patient
  instance.PatientName = getDICOMValue(data.dict, "00100010") || "";
  instance.PatientID = getDICOMValue(data.dict, "00100020") || "";
  instance.IssuerOfPatientID = getDICOMValue(data.dict, "00100021") || "";
  instance.PatientBirthDate = getDICOMValue(data.dict, "00100030") || "";
  instance.PatientBirthTime = getDICOMValue(data.dict, "00100032") || "";
  instance.PatientSex = getDICOMValue(data.dict, "00100040") || "";
  // Study
  instance.StudyInstanceUID = getDICOMValue(data.dict, "0020000D") || "";
  instance.AccessionNumber = getDICOMValue(data.dict, "00080050") || "";
  instance.StudyID = getDICOMValue(data.dict, "00200010") || "";
  instance.StudyDescription = getDICOMValue(data.dict, "00081030") || "";
  instance.StudyDate = getDICOMValue(data.dict, "00080020") || "";
  instance.StudyTime = getDICOMValue(data.dict, "00080030") || "";
};

module.exports = syncPatientAndStudyAttributes;
