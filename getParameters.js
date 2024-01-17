const getParameters = () => {
  if (process.argv.length != 4) {
    throw "Not enough command line arguments - expected input file and output directory";
  }
  return {
    inputFile: process.argv[2],
    outputDirectory: process.argv[3],
  };
};

module.exports = getParameters;
