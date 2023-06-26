const pollingOptionsModel = require("../models/polling_options_model");

const getAllOptions = async (req, res) => {
  try {
    const [data] = await pollingOptionsModel.getAllOptions();

    res.status(200).json({
      message: "Get all data success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get all data failed",
      error: err.message,
    });
  }
};
const getDetail = async (req, res) => {
  try {
    const [data] = await pollingOptionsModel.getDetailOptions(req.params.id);

    res.status(200).json({
      message: "Get detail success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get detail failed",
      error: err.message,
    });
  }
};

const updatePointOption = async (req, res) => {
  try {
    await pollingOptionsModel.updatePointOption(req.params.id);
    res.status(200).json({
      message: "Update Point success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Update Point success",
      error: err.message,
    });
  }
};

module.exports = { getAllOptions, getDetail, updatePointOption };
