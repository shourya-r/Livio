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
          <div className="relative w-96 h-[32rem] select-none rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 card-hover transform transition-all duration-300 hover:scale-[1.02]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
              {/* Clean gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>

            {/* Swipe Indicators */}
            <div className="absolute top-4 left-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg">
                <X className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg">
                <Heart className="w-5 h-5 text-blue-500" />
              </div>
            </div>

            {/* User Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="space-y-4">
                {/* Name and Age */}
                <div className="flex items-center space-x-3">
                  <h2 className="text-3xl font-bold text-white">
                    {user.name}, {user.age}
                  </h2>
                  <div className="bg-orange-500 text-white rounded-full px-3 py-1 text-xs font-bold">
                    {user.gender === "male" ? "Male" : "Female"}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-white/90">
                  <div className="bg-blue-500 rounded-full p-1">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    Looking for roommates
                  </span>
                </div>

                {/* Bio */}
                {user.bio && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/95 text-sm leading-relaxed font-medium">
                      {user.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Swipe hint */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-white text-sm font-medium">
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
