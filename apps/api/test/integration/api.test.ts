import request from "supertest";
import app from "../../src/app";

describe("API Endpoints", () => {
    describe("GET /health", () => {
        it("should return 200 and status ok", async () => {
            const response = await request(app)
                .get("/health")
                .expect(200);

            expect(response.body).toEqual({ status: "ok" });
        });
    });
});
