import "./AIHealthAssistant.css";

import { useState, useEffect, useRef } from "react";

import { getAIReply } from "../../bot/botEngine";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
  time: string;
};

const getCurrentTime = () => {

  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

};

export default function AIHealthAssistant() {

  const [message, setMessage] = useState("");

  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
  {
    sender: "bot",
    text: "👋 Hello! I'm Dr. RuraAI.\nHow can I help you today?",
    time: getCurrentTime(),
  }
]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, typing]);

const handleSend = async () => {

  if (!message.trim()) return;

  const userMessage: ChatMessage = {

    sender: "user",

    text: message,

    time: getCurrentTime(),

  };

  setMessages((prev) => [...prev, userMessage]);

  setTyping(true);

  const userInput = message.toLowerCase();

  setMessage("");

  setTimeout(async () => {

  const reply = await getAIReply(userInput);

  const botMessage: ChatMessage = {

    sender: "bot",

    text: reply,

    time: getCurrentTime(),

  };

  setTyping(false);

  setMessages((prev) => [...prev, botMessage]);

}, 1500);

  };

  return (

    <div className="ai-container">

      <div className="ai-header">

        <h2>🤖 AI Health Assistant</h2>

        <p>Ask me anything about your health.</p>

      </div>

      <div className="chat-box">

        {messages.map((msg, index) => (

          <div

            key={index}

            className={
              msg.sender === "user"
                ? "user-message"
                : "bot-message"
            }

          >

            <div>

  {msg.text}

  <div className="message-time">

    {msg.time}

  </div>

</div>

          </div>

        ))}

        {typing && (

          <div className="typing">

            🤖 AI is typing...

          </div>

        )}

        <div ref={chatEndRef}></div>

      </div>

       <div className="input-area">

        <input
          type="text"
          placeholder="Type your health question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleSend}>
          Send
        </button>

      </div>

    </div>

  );

}