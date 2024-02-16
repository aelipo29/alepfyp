import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Helper function to display messages in the chat history
function displayMessage(role, text) {
  const chatHistory = document.querySelector(".chat-history");
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message");
  messageElement.classList.add(role);
  messageElement.textContent = text;
  chatHistory.appendChild(messageElement);
  chatHistory.scrollTo(0, chatHistory.scrollHeight);
}

// Function to handle user input and generate response
async function handleChat(message) {
  try {
    // Use cached chat or create new
    const chat = await model.startChat({
      history: messageHistory,
    });
    messageHistory.push({ role: "user", parts: message }); // Update history

    const result = await chat.sendMessageStream(message);
    const response = await result.response;
    const responseText = response.text();

    displayMessage("model", responseText);
  } catch (error) {
    console.error("Error generating response:", error);
    displayMessage("model", "Oops, something went wrong. Please try again.");
  }
}

// Initial message for context (remove if not needed)
const initialChat = model.startChat({
  history: [
    { role: "user", parts: "Hello" },
    { role: "model", parts: "Hi there! " },
  ],
});

// Store chat history to maintain context across sessions
let messageHistory = initialChat.then(() => []);

// Handle input from chatbox
const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const message = chatInput.value.trim();
    if (message) {
      displayMessage("user", message);
      chatInput.value = "";
      handleChat(message);
    }
  }
});

// Set placeholder initial message (optional)
initialChat.then(async (chat) => {
	const initialResponse = await chat.sendMessageStream("");
	const initialResponseText = await initialResponse.response.text();
	displayMessage("model", initialResponseText);
});

// Additional UI enhancements (optional):
// - Add timestamps to messages
// - Implement user avatars
// - Handle errors more gracefully
// - Improve loading/waiting indicators

console.log("Chatbot ready!");
