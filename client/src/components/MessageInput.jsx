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
      className="flex items-center p-3 bg-white rounded-2xl shadow-lg border-2 border-purple-200"
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-300 border border-purple-200 text-purple-900 placeholder-purple-500 font-medium"
      />
      <button
        type="submit"
        className="ml-3 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 
						disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg transform hover:scale-105 disabled:transform-none"
        disabled={!content.trim()}
      >
        <SendHorizonal size={20} />
      </button>
    </form>
  );
};
export default MessageInput;
