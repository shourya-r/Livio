import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";
import { Heart, X, MapPin, Home, User } from "lucide-react";

const SwipeArea = () => {
  const { userProfiles, swipeRight, swipeLeft } = useMatchStore();

  const handleSwipe = (dir, user) => {
    if (dir === "right") swipeRight(user);
    else if (dir === "left") swipeLeft(user);
  };

  return (
    <div className="relative w-full max-w-sm h-[32rem]">
      {userProfiles.map((user) => (
        <TinderCard
          className="absolute shadow-none"
          key={user._id}
          onSwipe={(dir) => handleSwipe(dir, user)}
          swipeRequirementType="position"
          swipeThreshold={100}
          preventSwipe={["up", "down"]}
        >
          <div className="relative w-96 h-[32rem] select-none rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 card-hover">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Swipe Indicators */}
            <div className="absolute top-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
                <X className="w-5 h-5 text-gray-600" />
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            {/* User Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="space-y-4">
                {/* Name and Age */}
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-semibold">
                    {user.name}, {user.age}
                  </h2>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                    {user.gender === "male" ? "Male" : "Female"}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Looking for roommates</span>
                </div>

                {/* Bio */}
                {user.bio && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-white/90 text-sm leading-relaxed">
                      {user.bio}
                    </p>
                  </div>
                )}

                {/* Roommate Preferences */}
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-600/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                    Clean & Organized
                  </span>
                  <span className="bg-blue-600/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                    Quiet Environment
                  </span>
                  <span className="bg-blue-600/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                    Shared Expenses
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle swipe hint */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-white text-xs font-medium">
                  Swipe right to connect • Swipe left to pass
                </p>
              </div>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default SwipeArea;
