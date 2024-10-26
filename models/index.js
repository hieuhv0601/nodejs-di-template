const path = require("path");
const models = {};

function getModel(modelName) {
  if (!models[modelName]) {
    try {
      const modelPath = path.resolve(__dirname, modelName);
      models[modelName] = require(modelPath);
    } catch (err) {
      console.error(`Model "${modelName}" not found or failed to load.`);
      throw err;
    }
  }
  return models[modelName];
}

module.exports = {
  getModel,
};
