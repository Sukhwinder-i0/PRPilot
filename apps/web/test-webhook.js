const crypto = require("crypto");
require("dotenv").config();

function verifyWebhookSignature(payload, signature, secret) {
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload, "utf-8");
    const digest = 'sha256=' + hmac.digest("hex");
    return { digest, signature, match: crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest)) };
}

const payload = JSON.stringify({ action: "opened", repository: { name: "PRPilot" } });
const secret = process.env.GITHUB_WEBHOOK_SECRET || "NOT_SET";
const hmac = crypto.createHmac("sha256", secret);
hmac.update(payload, "utf-8");
const signature = 'sha256=' + hmac.digest("hex");

console.log("Secret from .env:", secret);
console.log("Mock Payload:", payload);
console.log("Generated Signature:", signature);

const result = verifyWebhookSignature(payload, signature, secret);
console.log("Verification Result:", result.match ? "✅ MATCH" : "❌ MISMATCH");
