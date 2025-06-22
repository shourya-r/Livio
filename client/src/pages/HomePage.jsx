import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import { Frown } from "lucide-react";

import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const {
    isLoadingUserProfiles,
    getUserProfiles,
    userProfiles,
    subscribeToNewMatches,
    unsubscribeFromNewMatches,
  } = useMatchStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getUserProfiles();
  }, [getUserProfiles]);

  useEffect(() => {
    authUser && subscribeToNewMatches(authUser._id);
    return () => {
      unsubscribeFromNewMatches();
    };
  }, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100
		 overflow-hidden
		"
    >
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header />
        <main className="flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden">
          {userProfiles.length > 0 && !isLoadingUserProfiles && (
            <>
              <SwipeArea />
              <SwipeFeedback />
            </>
          )}

          {userProfiles.length === 0 && !isLoadingUserProfiles && (
            <NoMoreProfiles />
          )}

          {isLoadingUserProfiles && <LoadingUI />}
        </main>
      </div>
    </div>
  );
};
export default HomePage;

const NoMoreProfiles = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className="bg-blue-100 rounded-full p-6 mb-6">
      <Frown className="text-blue-600" size={60} />
    </div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      No more profiles available
    </h2>
    <p className="text-lg text-gray-600 mb-6 max-w-md">
      You've seen all the available roommate profiles. Check back later for new
      listings!
    </p>
  </div>
);

const LoadingUI = () => {
  return (
    <div className="relative w-full max-w-sm h-[32rem]">
      <div className="w-96 h-[32rem] rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="space-y-4">
              <div className="h-7 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
