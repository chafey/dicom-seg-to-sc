const getDICOMValue = (dataset, tag, index = 0) => {
  if (!dataset[tag] || !dataset[tag].Value || !dataset[tag].Value[index]) {
    return undefined;
  }
  return dataset[tag].Value[index];
};

module.exports = getDICOMValue;
