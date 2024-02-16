import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Initial message for context, remove if not needed
const initialChat = model.startChat({
	history: [
		{
			role: "user",
			parts: "Hello",
		},
		{
			role: "model",
			parts: "Hi there! ",
		},
	],
});

// Function to handle user input and generate response
async function handleChat(message) {
	try {
		const chat = await initialChat; // Use cached chat or create new
		const result = await chat.sendMessageStream(message);
		const response = await result.response;
		return response.text();
	} catch (error) {
		console.error("Error generating response:", error);
		return "Oops, something went wrong. Please try again.";
	}
}

// Handle input from chatbox (update based on your UI implementation)
function processUserInput() {
	const userMessage = getChatMessageFromUI(); // Replace with your method
	handleChat(userMessage).then((response) => {
		updateChatboxWithResponse(response); // Display response in chatbox
	});
}

// Example UI interaction (replace with your actual implementation)
const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keypress", (event) => {
	if (event.key === "Enter") {
		processUserInput();
	}
});

// Initial setup (not required if using previous conversation history)
initialChat.then(() => {
	// Chatbox is ready
	console.log("Chatbot ready!");
});

// Replace placeholder functions with your actual chatbox UI interaction logic
function getChatMessageFromUI() {
	// Implement your logic to retrieve user message from chatbox
}

function updateChatboxWithResponse(response) {
	// Implement your logic to display response in chatbox
}

const toggleChatbot = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
// const chatbox = document.querySelector(".chatbox");
// const chatInput = document.querySelector(".chat-input textarea");
// const sendChatBtn = document.querySelector(".chat-input span");

// let userMessage = null; // Variable to store user's message
// const inputInitHeight = chatInput.scrollHeight;

// const createChatLi = (message, className) => {
// 	// Create a chat <li> element with passed message and className
// 	const chatLi = document.createElement("li");
// 	chatLi.classList.add("chat", `${className}`);

// 	let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
// 	chatLi.innerHTML = chatContent;

// 	chatLi.querySelector("p").textContent = message;

// 	return chatLi; // return chat <li> element
// }

// const generateResponse = (chatElement) => {
// 	const API_URL = "https://api.openai.com/v1/chat/completions";
// 	const messageElement = chatElement.querySelector("p");

// 	// Define the properties and message for the API request
// 	const requestOptions = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			"Authorization": `Bearer ${API_KEY}`
// 		},
// 		body: JSON.stringify({
// 			model: "gpt-3.5-turbo",
// 			messages: [{ role: "user", content: userMessage }],
// 		})
// 	}

// 	// Send POST request to API, get response and set the response as paragraph text
// 	fetch(API_URL, requestOptions)
// 		.then(res => res.json())
// 		.then(data => {
// 			messageElement.textContent = data.choices[0].message.content.trim();
// 		})
// 		.catch(() => {
// 			messageElement.classList.add("error");
// 			messageElement.textContent = "Oops! Something went wrong. Please try again.";
// 		})
// 		.finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
// }

// function handleChat () {
// 	userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
// 	if (!userMessage) return;

// 	// Clear the input textarea and set its height to default
// 	chatInput.value = "";
// 	chatInput.style.height = `${inputInitHeight}px`;

// 	// Append the user's message to the chatbox
// 	chatbox.appendChild(createChatLi(userMessage, "outgoing"));
// 	chatbox.scrollTo(0, chatbox.scrollHeight);

// 	setTimeout(() => {
// 		// Display "Thinking..." message while waiting for the response
// 		const incomingChatLi = createChatLi("Thinking...", "incoming");
// 		chatbox.appendChild(incomingChatLi);
// 		chatbox.scrollTo(0, chatbox.scrollHeight);
// 		generateResponse(incomingChatLi);
// 	}, 600);
// }

// chatInput.addEventListener("input", () => {
// 	// Adjust the height of the input textarea based on its content
// 	chatInput.style.height = `${inputInitHeight}px`;
// 	chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
// 	// If Enter key is pressed without Shift key and the window
// 	// width is greater than 800px, handle the chat
// 	if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
// 		e.preventDefault();
// 		handleChat();
// 	}
// });

// sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
toggleChatbot.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
