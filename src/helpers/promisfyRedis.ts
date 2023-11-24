import { promisify } from "util";
import { redisClient } from "../helpers/redis";

export const redisGetAsync = promisify(redisClient.get).bind(redisClient);
