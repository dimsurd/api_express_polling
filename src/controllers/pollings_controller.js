const pollingsModels = require("../models/pollings_model");

const getAllPollings = async (req, res) => {
  try {
    const [data] = await pollingsModels.getAllPollings();
    res.status(200).json({
      message: "Get All Polling Success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const getDetailPolling = async (req, res) => {
  const { id } = req.params;

  const data = await pollingsModels.getDetail(id);
  try {
    res.status(200).json({
      message: "Get Detail Polling Success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const createPolling = async (req, res) => {
  const { body } = req;

  await pollingsModels.createPolling(body);
  try {
    res.status(200).json({
      message: "Create Polling Success",
      data: body,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const updatePolling = async (req, res) => {
  try {
    const { body, params } = req;
    const { id } = params;
    await pollingsModels.updatePolling(id, body);
    res.status(200).json({
      message: "Update Polling Success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Update Polling Failed",
      error: err.message,
    });
  }
};

const deletePolling = async (req, res) => {
  try {
    await pollingsModels.deletePolling(req.params.id);
    res.status(200).json({
      message: "Delete Polling Success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete Polling Failed",
      error: err.message,
    });
  }
};

module.exports = {
  getAllPollings,
  getDetailPolling,
  createPolling,
  updatePolling,
  deletePolling,
};
