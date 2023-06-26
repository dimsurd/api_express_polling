const dbPool = require("../configs/database");

const getAllPollings = () => {
  const sqlQuery = "SELECT * FROM pollings";
  return dbPool.execute(sqlQuery);
};

const getDetail = async (id) => {
  try {
    const [dataPolling] = await dbPool.execute(
      "SELECT * FROM pollings WHERE id=?",
      [id]
    );
    const [pollingOptions] = await dbPool.execute(
      "SELECT * FROM polling_options WHERE id_polling=?",
      [id]
    );
    const mergedData = {
      ...dataPolling[0],
      data_polling_options: pollingOptions,
    };
    return mergedData;
  } catch (err) {
    throw new Error(err);
  }
};

const createPolling = async (body) => {
  const { name, description, polling_option_name } = body;

  try {
    await dbPool.beginTransaction();

    const sqlQuery = "INSERT INTO pollings (name, description) VALUES (?, ?)";
    const [result] = await dbPool.execute(sqlQuery, [name, description]);
    const { insertId } = result;

    const options = Array.isArray(polling_option_name)
      ? polling_option_name
      : [polling_option_name];

    const insertOptionPromises = options.map(async (option) => {
      const optionSqlQuery =
        "INSERT INTO polling_options (id_polling, name) VALUES (?, ?)";
      await dbPool.execute(optionSqlQuery, [insertId, option]);
    });

    await Promise.all(insertOptionPromises);

    await dbPool.commit();
  } catch (err) {
    await dbPool.rollback();
    throw new Error(err);
  }
};

const updatePolling = async (id, body) => {
  const { name, description } = body;

  const [findData] = await dbPool.execute("SELECT * FROM pollings WHERE id=?", [
    id,
  ]);

  if (findData.length === 0) {
    throw new Error("Data not found");
  }

  try {
    const sqlQuery = "UPDATE pollings SET name=?,description=? WHERE id=?";
    return dbPool.execute(sqlQuery, [name, description, id]);
  } catch (err) {
    throw new Error(err);
  }
};

const deletePolling = async (id) => {
  const [findData] = await dbPool.execute("SELECT * FROM pollings WHERE id=?", [
    id,
  ]);

  if (findData.length === 0) {
    throw new Error("Data not found");
  }

  try {
    await dbPool.beginTransaction();

    await dbPool.execute("DELETE FROM pollings WHERE id=?", [id]);
    await dbPool.execute("DELETE FROM polling_options WHERE id_polling=?", [
      id,
    ]);

    await dbPool.commit();
  } catch (err) {
    await dbPool.rollback();
    throw new Error(err);
  }
};

module.exports = {
  getAllPollings,
  getDetail,
  createPolling,
  updatePolling,
  deletePolling,
};
