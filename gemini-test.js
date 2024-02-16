import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const chat = model.startChat({ //automatically appending the state of the conversation according to the Google API
	history: [
		{
			role: "user",
			parts: "Hello, I want to know about postgraduate courses at UiTM",
		},
		{
			role: "model",
			parts: "Great to meet you. What would you like to know?",
		},
	],
	generationConfig: {
		maxOutputTokens: 100,
	},
});

async function generateResponse(message) {
	const result = await chat.sendMessageStream(message);
	const response = await result.response;
	return response.text();
}

async function run() {
	const msg = "What is the available courses so far?"; // replace this with message from chatbox
	const text = await generateResponse(msg);
	console.log(text);
}

run();