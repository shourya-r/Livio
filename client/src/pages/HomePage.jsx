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
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden">
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
    <div className="bg-blue-100 rounded-full p-8 mb-6 shadow-lg">
      <Frown className="text-blue-600" size={60} />
    </div>
    <h2 className="text-3xl font-bold text-blue-600 mb-4">
      No more profiles available
    </h2>
    <p className="text-lg text-gray-700 mb-6 max-w-md font-medium">
      You've seen all the available roommate profiles. Check back later for new
      listings! ✨
    </p>
  </div>
);

const LoadingUI = () => {
  return (
    <div className="relative w-full max-w-sm h-[32rem]">
      <div className="w-96 h-[32rem] rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-200">
        <div className="w-full h-full bg-gray-50">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded-xl w-3/4 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded-xl w-1/2 animate-pulse"></div>
              <div className="h-20 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="flex gap-3">
                <div className="h-7 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                <div className="h-7 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                <div className="h-7 bg-gray-200 rounded-full w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
