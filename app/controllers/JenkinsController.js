const axios = require("axios");
async function buidlFront(req, res, next) {
  try {
    const url =
      "http://jenkins:110425c5d18a19350d77c1a3fd6994f3e9@72.18.80.206:8080/job/eventos_front/build";

    const response = await axios({
      method: "post",
      url,
      data: {},
    });
    res.json(response.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  buidlFront,
};
