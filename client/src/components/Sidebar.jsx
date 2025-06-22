import { useEffect, useState } from "react";
import { Users, Loader, MessageCircle, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useMatchStore } from "../store/useMatchStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();

  useEffect(() => {
    getMyMatches();
  }, [getMyMatches]);

  return (
    <>
      <div
        className={`
          fixed inset-y-0 left-0 z-10 w-80 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out shadow-lg
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-80 lg:h-full
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-3 rounded-xl shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-600">
                    Roommate Matches
                  </h2>
                  <p className="text-sm text-gray-600 font-medium">
                    {matches.length} connections ✨
                  </p>
                </div>
              </div>
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
                onClick={toggleSidebar}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              {isLoadingMyMatches ? (
                <LoadingState />
              ) : matches.length === 0 ? (
                <NoMatchesFound />
              ) : (
                <div className="space-y-3">
                  {matches.map((match) => (
                    <Link key={match._id} to={`/chat/${match._id}`}>
                      <div className="group flex items-center p-4 cursor-pointer hover:bg-blue-50 rounded-2xl transition-all duration-300 border border-transparent hover:border-blue-200 shadow-sm hover:shadow-md">
                        <div className="relative">
                          <img
                            src={match.image || "/avatar.png"}
                            alt="User avatar"
                            className="w-12 h-12 object-cover rounded-full border-2 border-blue-300 group-hover:border-orange-400 transition-all duration-300 shadow-md"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                            {match.name}
                          </h3>
                          {match.location && (
                            <p className="text-sm text-gray-600 mt-1">
                              📍 {match.location}
                            </p>
                          )}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <MessageCircle className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-20 left-4 p-3 bg-blue-500 text-white rounded-xl shadow-lg border border-blue-300 hover:bg-blue-600 transition-all duration-300 z-20 transform hover:scale-105"
        onClick={toggleSidebar}
      >
        <MessageCircle size={20} />
      </button>
    </>
  );
};

export default Sidebar;

const NoMatchesFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center py-12">
    <div className="bg-blue-100 p-6 rounded-full mb-6 shadow-lg">
      <Users className="text-blue-600" size={48} />
    </div>
    <h3 className="text-xl font-bold text-blue-600 mb-3">No Matches Yet</h3>
    <p className="text-gray-700 max-w-xs leading-relaxed font-medium">
      Start swiping to find potential roommates. Your perfect match is just
      around the corner! ✨
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center py-12">
    <div className="bg-blue-100 p-6 rounded-full mb-6 shadow-lg">
      <Loader className="text-blue-600 animate-spin" size={48} />
    </div>
    <h3 className="text-xl font-bold text-blue-600 mb-3">Loading Matches</h3>
    <p className="text-gray-700 max-w-xs leading-relaxed font-medium">
      We're finding your perfect roommate matches. This might take a moment...
      ✨
    </p>
  </div>
);
