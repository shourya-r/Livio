import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";
import { Heart, X, MapPin, Home, User, Sparkles } from "lucide-react";

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
          <div className="relative w-96 h-[32rem] select-none rounded-2xl overflow-hidden shadow-2xl bg-white border-2 border-purple-200 card-hover transform transition-all duration-300 hover:scale-[1.02]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
              {/* Vibrant gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-pink-800/40 to-transparent"></div>
            </div>

            {/* Swipe Indicators with vibrant colors */}
            <div className="absolute top-4 left-4">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-sm rounded-full p-3 shadow-lg transform hover:scale-110 transition-transform">
                <X className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-sm rounded-full p-3 shadow-lg transform hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Fun floating elements */}
            <div className="absolute top-16 left-8 opacity-20">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
            </div>
            <div className="absolute top-20 right-12 opacity-20">
              <Sparkles
                className="w-6 h-6 text-pink-300 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            {/* User Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="space-y-4">
                {/* Name and Age with fun styling */}
                <div className="flex items-center space-x-3">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                    {user.name}, {user.age}
                  </h2>
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold shadow-lg">
                    {user.gender === "male" ? "Male" : "Female"}
                  </div>
                </div>

                {/* Location with fun icon */}
                <div className="flex items-center space-x-2 text-white/90">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-1">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    Looking for roommates
                  </span>
                </div>

                {/* Bio with enhanced styling */}
                {user.bio && (
                  <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
                    <p className="text-white/95 text-sm leading-relaxed font-medium">
                      {user.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced swipe hint */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-md rounded-xl p-4 text-center shadow-2xl border border-white/20">
                <p className="text-white text-sm font-bold">
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
