import app from "./app.js";
import http from "http";
import sequelize from "./config/config.database.js";

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected");
    server.listen(PORT, () => {
      console.log(` Server is running successfully!`);
      console.log(` Local URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("unable to start the server :: ", error);
  }
};

startServer();
