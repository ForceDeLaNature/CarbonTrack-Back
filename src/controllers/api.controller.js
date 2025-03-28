const { StatusCodes } = require("http-status-codes");
const { distancematrix } = require("../../service/api_google");

const getDistance = async (req, res) => {
  try {
    const { origin, destination } = req.body;
    console.log("les données ", origin);
    
    if (!origin || !destination) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Origin and Destination are required" });
    }
    var body = {
      origins: origin,
      destinations: destination,
    };
    const key = process.env.SECRET_KEY;
    const response = await distancematrix(body, key);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching data" });
  }
};

module.exports = { getDistance };
