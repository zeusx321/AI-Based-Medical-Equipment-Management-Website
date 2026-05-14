import React, { useState, useEffect, useRef } from "react";
import sendIcon from "../../../assets/Email_Send.svg";
import axios from "axios";

function ChatBot({ username }) {
  const [req, setReq] = useState("");
  const [currentReq, setCurrentReq] = useState("");
  const [chat, setChat] = useState(() => {
    const savedChat = sessionStorage.getItem("chatbot_chat");
    return savedChat ? JSON.parse(savedChat) : [];
  });
  const [res, setRes] = useState(() => {
    const savedChat = sessionStorage.getItem("chatbot_chat");
    return (savedChat && JSON.parse(savedChat).length > 0) ? "started" : "";
  });
  const [sessionId, setSessionId] = useState(() => {
    return sessionStorage.getItem("chatbot_sessionId") || crypto.randomUUID();
  });
  const token = localStorage.getItem("token");
  const messagesRef = useRef();
  const [aiThinking, setAiThinking] = useState(false);

  const AiRes = async (e) => {
    e.preventDefault();

    if (!req.trim()) return;

    setCurrentReq(req);
    setReq("");
    setAiThinking(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/ai/chat",
        {
          sessionId: sessionId,
          message: req,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setRes(response.data);
      setChat((prevChat) => [...prevChat, response.data]);
      setAiThinking(false);
    } catch (error) {
      setAiThinking(false);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("chatbot_chat", JSON.stringify(chat));
    sessionStorage.setItem("chatbot_sessionId", sessionId);

    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chat, sessionId]);

  const handleNewChat = () => {
    setChat([]);
    setRes("");
    setSessionId(crypto.randomUUID());
    sessionStorage.removeItem("chatbot_chat");
    sessionStorage.removeItem("chatbot_sessionId");
  };

  return (
    <div className="relative h-[calc(100vh-100px)] w-full flex flex-col justify-between items-center pt-4">
      
      {/* Welcome Message or Chat Messages */}
      <div className={`w-full flex-1 flex flex-col items-center overflow-hidden ${res === "" ? "justify-center" : ""}`}>
        <div
          className={`flex flex-col justify-center items-center text-center px-4 animate-in fade-in zoom-in duration-700 ${res === "" ? "" : "hidden"}`}
        >
          <h2 className="text-[28px] lg:text-[35px] font-bold">
            Hi,{" "}
            <span className=" text-transparent bg-clip-text bg-gradient-to-r from-color-purple to-color-pink ">
              {username}
            </span>
          </h2>
          <h3 className="text-[20px] lg:text-[25px] font-medium text-color-white/60">
            What do you want to ask about?
          </h3>
        </div>

        <div
          className={`flex flex-col items-start w-full max-w-[800px] flex-1 pb-4 overflow-hidden ${res != "" ? "" : "hidden"}`}
        >
          <div
            className="w-full flex-1 p-4 lg:p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar"
            ref={messagesRef}
          >
            {chat.map((items, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex justify-end">
                  <h3 className="bg-color-purple p-4 rounded-[8px] rounded-br-[2px] px-6 max-w-[85%] lg:max-w-[75%] font-medium text-[15px] shadow-lg">
                    {items.userMessage}
                  </h3>
                </div>
                <div>
                  <p className="text-[15px] bg-color-gray2 p-4 rounded-[8px] rounded-bl-[2px] px-6 max-w-[85%] lg:max-w-[75%] font-medium border border-color-white/5 shadow-md">
                    {items.aiResponse}
                  </p>
                </div>
              </div>
            ))}

            {aiThinking && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <h3 className="bg-color-purple p-4 rounded-[8px] rounded-br-[2px] px-6 max-w-[85%] lg:max-w-[75%] font-medium text-[15px] opacity-70">
                  {currentReq}
                </h3>
              </div>
                <div>
                  <p className="text-[15px] bg-color-gray2 p-4 rounded-[8px] rounded-bl-[2px] px-6 w-fit font-medium animate-pulse border border-color-white/5">
                    🤖 MedicalEqu Thinking...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions & Input */}
      <div className="w-full max-w-[800px] px-4 pb-6 flex flex-col gap-4">
        {chat.length > 0 && (
          <div className="flex justify-center lg:justify-end">
            <button
              onClick={handleNewChat}
              className="font-bold bg-color-white/10 hover:bg-color-white text-color-white hover:text-color-gray1 border border-color-white/10 px-4 py-2 rounded-[8px] text-[12px] shadow-lg transition-all flex items-center gap-2 group backdrop-blur-md"
            >
              <span className="group-hover:rotate-12 transition-transform">✨</span> New Chat
            </button>
          </div>
        )}
        
        <form
          className={`flex item-center w-full gap-3 border p-2 px-3 rounded-[8px] shadow-xl transition-all duration-300 bg-color-gray1/80 backdrop-blur-md
            ${req.trim() ? 'border-color-purple/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'border-color-white/10'}`}
          onSubmit={AiRes}
        >
          <input
            type="text"
            onChange={(e) => setReq(e.target.value)}
            value={req}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent px-4 py-2"
          />
          <button
            type="submit"
            disabled={!req.trim() || aiThinking}
            className={`w-11 h-11 rounded-[12px] flex items-center justify-center transition-all 
              ${req.trim() && !aiThinking ? 'bg-color-purple shadow-lg shadow-color-purple/20 scale-100' : 'bg-color-gray3/50 scale-95 opacity-50 cursor-not-allowed'}`}
          >
            <img src={sendIcon} alt="Send" className="w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
