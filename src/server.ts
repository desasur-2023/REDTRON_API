import * as http from "http";
import { logger } from "./logger";

// Routes


export default async function server(createAppFunction){

  const server: http.Server = http.createServer(await createAppFunction());

  const port = process.env.PORT;

  server
    .listen(port)
    .on("listening", () => {
      logger().info(`Listening on port ${port}`);
    })
    .on("error", (err) => {
      logger().error(err);
    });

  return server;
}
