import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { MikroORM } from "mikro-orm";
import path from "path";

export default {
	migrations: {
		path: path.join(__dirname, "./migrations"),
		pattern: /^[\w-]+\d+\.[tj]s$/,
	},
	entities: [Post, User],
	dbName: "redditClone",
	type: "postgresql",
	user: "postgres",
	password: "tibbers",
	debug: process.env.NODE_ENV === "production",
} as Parameters<typeof MikroORM.init>[0];
