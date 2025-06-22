import { useEffect, useState } from "react";
import { Users, Loader, MessageCircle, X, User, Sparkles } from "lucide-react";
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
          fixed inset-y-0 left-0 z-10 w-80 bg-white border-r border-gray-200 overflow-hidden transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-80
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Roommate Matches
                  </h2>
                  <p className="text-sm text-gray-500">
                    {matches.length} connections
                  </p>
                </div>
              </div>
              <button
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={toggleSidebar}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto">
            <div className="p-4">
              {isLoadingMyMatches ? (
                <LoadingState />
              ) : matches.length === 0 ? (
                <NoMatchesFound />
              ) : (
                <div className="space-y-3">
                  {matches.map((match) => (
                    <Link key={match._id} to={`/chat/${match._id}`}>
                      <div className="group flex items-center p-4 cursor-pointer hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200">
                        <div className="relative">
                          <img
                            src={match.image || "/avatar.png"}
                            alt="User avatar"
                            className="w-12 h-12 object-cover rounded-full border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-200"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {match.name}
                          </h3>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <MessageCircle className="w-5 h-5 text-gray-400" />
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
        className="lg:hidden fixed top-20 left-4 p-3 bg-white text-blue-600 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 z-20"
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
    <div className="bg-blue-50 p-4 rounded-full mb-6">
      <Users className="text-blue-400" size={48} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Matches Yet</h3>
    <p className="text-gray-500 max-w-xs leading-relaxed">
      Start swiping to find potential roommates. Your perfect match is just
      around the corner!
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center py-12">
    <div className="bg-blue-50 p-4 rounded-full mb-6">
      <Loader className="text-blue-500 animate-spin" size={48} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      Loading Matches
    </h3>
    <p className="text-gray-500 max-w-xs leading-relaxed">
      We're finding your perfect roommate matches. This might take a moment...
    </p>
  </div>
);
