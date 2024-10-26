const createApp = require("./app");
const config = require("./configs/config");
const { connectToDb } = require("./db");

async function startServer() {
  try {
    const dbClient = await connectToDb();
    const app = createApp(dbClient);

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

startServer();
