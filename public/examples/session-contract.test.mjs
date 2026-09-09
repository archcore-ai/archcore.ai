import assert from "node:assert/strict";
import test from "node:test";

// An in-memory boundary fixture, not an HTTP server or production rate limiter.
// Contract: when the client IP is rate limited, return 429 and Retry-After.
export function createSession({ rateLimited, retryAfterSeconds }) {
  if (rateLimited) {
    return {
      status: 429,
      headers:
        process.env.SESSION_DEMO_OMIT_RETRY_AFTER === "1"
          ? {}
          : { "Retry-After": String(retryAfterSeconds) },
      body: { error: "rate_limited" },
    };
  }
  return { status: 201, headers: {}, body: { session_id: "fixture-session" } };
}

test("a limited request returns 429 with Retry-After", () => {
  const response = createSession({ rateLimited: true, retryAfterSeconds: 60 });
  assert.equal(response.status, 429);
  assert.equal(response.headers["Retry-After"], "60");
});

test("a request below the limit can create a session", () => {
  const response = createSession({ rateLimited: false, retryAfterSeconds: 60 });
  assert.equal(response.status, 201);
  assert.ok(response.body.session_id);
  assert.equal(response.headers["Retry-After"], undefined);
});
