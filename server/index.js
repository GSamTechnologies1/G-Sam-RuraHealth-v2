import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

console.log("Gemini Key:", process.env.GEMINI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

app.post("/ask", async (req, res) => {

  console.log("📨 Request received:");
  console.log(req.body);

  try {

    const { prompt } = req.body;

    const result = await model.generateContent(prompt);

    console.log("✅ Gemini responded:");
    console.dir(result, { depth: null });

    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {

    console.log("❌ GEMINI ERROR:");
    console.dir(error, { depth: null });

    res.status(500).json({
      reply: "Gemini server error."
    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});