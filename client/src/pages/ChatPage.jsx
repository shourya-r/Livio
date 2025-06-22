import { useEffect, useRef } from "react";
import Header from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { Link, useParams } from "react-router-dom";
import { Loader, UserX } from "lucide-react";
import MessageInput from "../components/MessageInput";
import { isSocketReady } from "../socket/socket.client";

const ChatPage = () => {
  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
  const {
    messages,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    isLoading,
  } = useMessageStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  const { id } = useParams();

  const match = matches.find((m) => m?._id === id);

  // Filter messages for the current conversation
  const conversationMessages = messages.filter(
    (msg) =>
      (msg.sender === authUser._id && msg.receiver === id) ||
      (msg.sender === id && msg.receiver === authUser._id)
  );

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);

  useEffect(() => {
    const fetchData = async () => {
      if (authUser && id) {
        console.log("=== CHAT PAGE FETCH DATA ===");
        console.log("Auth user:", authUser._id);
        console.log("Chat ID:", id);

        await getMyMatches();
        await getMessages(id);

        // Try to subscribe immediately first
        if (isSocketReady()) {
          console.log("Socket ready, subscribing immediately");
          subscribeToMessages();
        } else {
          console.log("Socket not ready, starting polling");
          // If not ready, poll more frequently
          const waitForSocket = () => {
            if (isSocketReady()) {
              console.log("Socket became ready, subscribing");
              subscribeToMessages();
            } else {
              // Poll every 50ms for faster response
              setTimeout(waitForSocket, 50);
            }
          };
          waitForSocket();
        }
      }
    };

    fetchData();

    return () => {
      console.log("=== CHAT PAGE CLEANUP ===");
      unsubscribeFromMessages();
    };
  }, [id, authUser]);

  if (isLoadingMyMatches) return <LoadingMessagesUI />;
  if (!match) return <MatchNotFound />;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full">
        {/* Chat Header */}
        <div className="flex items-center mb-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
          <img
            src={match.image || "/avatar.png"}
            className="w-12 h-12 object-cover rounded-full mr-4 border-2 border-blue-300 shadow-md"
            alt={`${match.name}'s profile picture`}
          />
          <h2 className="text-xl font-bold text-blue-600">{match.name}</h2>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto mb-4 bg-white rounded-2xl shadow-lg p-4 space-y-4 border border-gray-200">
          {isLoading && (
            <p className="text-center text-blue-600 font-medium">
              Loading messages...
            </p>
          )}
          {!isLoading && conversationMessages.length === 0 ? (
            <p className="text-center text-gray-600 py-8 font-medium">
              No messages yet. Start the conversation with {match.name}! 💬
            </p>
          ) : (
            conversationMessages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`flex items-end gap-2 ${
                  msg.sender === authUser._id ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender !== authUser._id && (
                  <img
                    src={match.image || "/avatar.png"}
                    alt="sender"
                    className="w-6 h-6 rounded-full border border-gray-200"
                  />
                )}
                <div
                  className={`inline-block p-3 rounded-2xl max-w-xs lg:max-w-md shadow-md ${
                    msg.sender === authUser._id
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md border border-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          <div ref={messageEndRef} />
        </div>
        <MessageInput matchId={id} />
      </div>
    </div>
  );
};
export default ChatPage;

const MatchNotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
      <UserX size={64} className="mx-auto text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Match Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Oops! It seems this match doesn't exist or has been removed.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors 
				focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 inline-block"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

const LoadingMessagesUI = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="text-center p-8">
      <Loader size={48} className="mx-auto text-blue-500 animate-spin mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Loading Chat
      </h2>
      <p className="text-gray-600">
        Please wait while we prepare your conversation.
      </p>
    </div>
  </div>
);
