import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const otpRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(7, "5 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});
