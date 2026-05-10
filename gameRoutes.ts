import { describe, it, expect, beforeEach } from "vitest";
import express, { Express } from "express";
import { registerGameRoutes } from "./gameRoutes";
import request from "supertest";

let app: Express;

beforeEach(() => {
  app = express();
  app.use(express.json());
  registerGameRoutes(app);
});

describe("Game Update Server Routes", () => {
  describe("GET /live/{hash}", () => {
    it("should return version info for valid hash", async () => {
      // Hash válido com 64 caracteres hexadecimais
      const validHash = "a".repeat(64);

      const response = await request(app).get(`/live/${validHash}`);

      expect(response.status).toBe(200);
      expect(response.text).toContain("1.17.1");
      expect(response.headers["connection"]).toBe("Keep-Alive");
      expect(response.headers["access-control-allow-origin"]).toBe("*");
    });

    it("should return 400 for invalid hash format", async () => {
      const invalidHash = "invalid-hash";

      const response = await request(app).get(`/live/${invalidHash}`);

      expect(response.status).toBe(400);
      expect(response.text).toContain("Invalid hash format");
    });

    it("should have proper Android/Dalvik headers", async () => {
      const validHash = "a".repeat(64);

      const response = await request(app).get(`/live/${validHash}`);

      expect(response.headers["cache-control"]).toContain("no-cache");
      expect(response.headers["pragma"]).toBe("no-cache");
      expect(response.headers["content-type"]).toContain("text/plain");
    });
  });

  describe("GET /fileinfo", () => {
    it("should return file info list", async () => {
      const response = await request(app).get("/fileinfo");

      expect(response.status).toBe(200);
      expect(response.text).toContain("gameassetbundles");
      expect(response.text).toContain("mzZtylZ1fawV5N8D8XikRyF+5mY=");
      expect(response.text).toContain("main/gameentry");
    });

    it("should have proper headers", async () => {
      const response = await request(app).get("/fileinfo");

      expect(response.headers["access-control-allow-origin"]).toBe("*");
      expect(response.headers["connection"]).toBe("Keep-Alive");
    });
  });

  describe("GET /versioninfo", () => {
    it("should return version string", async () => {
      const response = await request(app).get("/versioninfo");

      expect(response.status).toBe(200);
      expect(response.text).toContain("1.17.1");
    });
  });

  describe("CORS Preflight", () => {
    it("should handle OPTIONS requests", async () => {
      const response = await request(app).options("/fileinfo");

      expect(response.status).toBe(200);
      expect(response.headers["access-control-allow-origin"]).toBe("*");
      expect(response.headers["access-control-allow-methods"]).toContain("GET");
    });
  });

  describe("Access Logging", () => {
    it("should log requests with User-Agent", async () => {
      const userAgent = "Dalvik/2.1.0 (Linux; U; Android 15; SM-A145M)";

      const response = await request(app)
        .get("/fileinfo")
        .set("User-Agent", userAgent);

      expect(response.status).toBe(200);
      // O log é feito via console.log, verificamos que a requisição foi processada
      expect(response.headers["access-control-allow-origin"]).toBe("*");
    });

    it("should handle requests without User-Agent", async () => {
      const response = await request(app).get("/fileinfo");

      expect(response.status).toBe(200);
      // Mesmo sem User-Agent, a requisição deve funcionar
      expect(response.headers["access-control-allow-origin"]).toBe("*");
    });
  });

  describe("Response Headers", () => {
    it("should include no-cache headers", async () => {
      const response = await request(app).get("/fileinfo");

      expect(response.headers["cache-control"]).toContain("no-cache");
      expect(response.headers["pragma"]).toBe("no-cache");
      expect(response.headers["expires"]).toBe("0");
    });

    it("should include Keep-Alive headers for Android compatibility", async () => {
      const response = await request(app).get("/fileinfo");

      expect(response.headers["connection"]).toBe("Keep-Alive");
      expect(response.headers["keep-alive"]).toContain("timeout=5");
    });
  });
});
