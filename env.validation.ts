import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getEnvironment } from "./env.validation";

describe("Environment Validation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("NODE_ENV validation", () => {
    it("should default to development", () => {
      delete process.env.NODE_ENV;
      const env = getEnvironment();
      expect(env.NODE_ENV).toBe("development");
    });

    it("should accept production", () => {
      process.env.NODE_ENV = "production";
      const env = getEnvironment();
      expect(env.NODE_ENV).toBe("production");
    });

    it("should throw error for invalid NODE_ENV", () => {
      process.env.NODE_ENV = "invalid";
      expect(() => getEnvironment()).toThrow(
        "Invalid NODE_ENV: invalid. Must be 'development' or 'production'"
      );
    });
  });

  describe("PORT validation", () => {
    it("should default to 3000", () => {
      delete process.env.PORT;
      const env = getEnvironment();
      expect(env.PORT).toBe(3000);
    });

    it("should accept valid port numbers", () => {
      process.env.PORT = "8080";
      const env = getEnvironment();
      expect(env.PORT).toBe(8080);
    });

    it("should throw error for invalid port", () => {
      process.env.PORT = "invalid";
      expect(() => getEnvironment()).toThrow(
        "Invalid PORT: invalid. Must be a number between 1 and 65535"
      );
    });

    it("should throw error for port out of range", () => {
      process.env.PORT = "99999";
      expect(() => getEnvironment()).toThrow(
        "Invalid PORT: 99999. Must be a number between 1 and 65535"
      );
    });

    it("should throw error for port 0", () => {
      process.env.PORT = "0";
      expect(() => getEnvironment()).toThrow(
        "Invalid PORT: 0. Must be a number between 1 and 65535"
      );
    });
  });

  describe("Combined validation", () => {
    it("should validate both NODE_ENV and PORT", () => {
      process.env.NODE_ENV = "production";
      process.env.PORT = "5000";
      const env = getEnvironment();
      expect(env.NODE_ENV).toBe("production");
      expect(env.PORT).toBe(5000);
    });
  });
});
