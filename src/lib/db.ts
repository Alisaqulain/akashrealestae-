import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI?.trim();

/** Shown in API responses when Mongo is not configured yet */
export const MONGODB_DISABLED_MESSAGE =
  "MongoDB is not connected yet. Add a valid MONGODB_URI to .env.local when you are ready (Atlas host looks like cluster0.xxxxx.mongodb.net).";

/**
 * Mongo is optional for local UI work: unset URI, empty URI, or the doc placeholder host
 * `@cluster.mongodb.net` (without your cluster id) disables DB access without throwing on the home page.
 */
export function isDatabaseEnabled(): boolean {
  if (!MONGODB_URI) {
    return false;
  }

  if (MONGODB_URI.includes("@cluster.mongodb.net")) {
    return false;
  }

  return true;
}

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectToDatabase() {
  if (!isDatabaseEnabled()) {
    throw new Error(MONGODB_DISABLED_MESSAGE);
  }

  const mongoUri = MONGODB_URI!;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB || "akasak",
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;

    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("ENOTFOUND") || message.includes("querySrv")) {
      throw new Error(
        `MongoDB could not be reached (${message}). Fix MONGODB_URI in .env.local: use the exact SRV string from Atlas (cluster0.xxxxx.mongodb.net). Check VPN/DNS if the host is already correct.`,
      );
    }

    throw error;
  }
}
