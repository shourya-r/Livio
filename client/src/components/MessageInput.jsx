import { useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { SendHorizonal } from "lucide-react";

const MessageInput = ({ matchId }) => {
  const [content, setContent] = useState("");
  const { sendMessage } = useMessageStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    sendMessage(matchId, content);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-3 bg-white rounded-2xl shadow-lg border border-gray-200"
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 border border-gray-200 text-gray-900 placeholder-gray-500 font-medium"
      />
      <button
        type="submit"
        className="ml-3 px-5 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
						disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg transform hover:scale-105 disabled:transform-none"
        disabled={!content.trim()}
      >
        <SendHorizonal size={20} />
      </button>
    </form>
  );
};
export default MessageInput;
