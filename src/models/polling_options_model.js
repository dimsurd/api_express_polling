const dbPool = require("../configs/database");

const getAllOptions = () => {
  const sqlQuery = "SELECT * FROM polling_options";
  return dbPool.execute(sqlQuery);
};

const getDetailOptions = async (id) => {
  const [data] = await dbPool.execute(
    "SELECT * FROM polling_options WHERE id=?",
    [id]
  );

  if (data.length === 0) {
    throw new Error("Data not found!");
  }

  return data;
};

const updatePointOption = async (id) => {
  const [data] = await dbPool.execute(
    "SELECT * FROM polling_options WHERE id=?",
    [id]
  );

  if (data.length === 0) {
    throw new Error("Data not found!");
  }

  try {
    const currentPoint = data[0].point;
    const newPoint = currentPoint + 1;

    return await dbPool.execute(
      "UPDATE polling_options SET point = ? WHERE id=?",
      [newPoint, id]
    );
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllOptions,
  getDetailOptions,
  updatePointOption,
};
