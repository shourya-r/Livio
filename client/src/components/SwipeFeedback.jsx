import { useMatchStore } from "../store/useMatchStore";
import { Heart, X, CheckCircle, Sparkles } from "lucide-react";

const SwipeFeedback = () => {
  const { swipeFeedback } = useMatchStore();

  if (!swipeFeedback) return null;

  const getFeedbackConfig = (feedback) => {
    switch (feedback) {
      case "liked":
        return {
          icon: Heart,
          text: "Connected!",
          bgGradient: "bg-gradient-to-r from-green-500 to-emerald-500",
          borderColor: "border-emerald-400",
          iconColor: "text-white",
          animation: "animate-pulse",
          sparkles: true,
        };
      case "passed":
        return {
          icon: X,
          text: "Passed",
          bgGradient: "bg-gradient-to-r from-red-500 to-pink-500",
          borderColor: "border-pink-400",
          iconColor: "text-white",
          animation: "animate-bounce",
          sparkles: false,
        };
      case "matched":
        return {
          icon: CheckCircle,
          text: "Roommate Match!",
          bgGradient: "bg-gradient-to-r from-purple-600 to-pink-600",
          borderColor: "border-pink-400",
          iconColor: "text-white",
          animation: "animate-pulse",
          sparkles: true,
        };
      default:
        return null;
    }
  };

  const config = getFeedbackConfig(swipeFeedback);
  if (!config) return null;

  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="relative">
        {/* Background Blur */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md rounded-3xl"></div>

        {/* Main Feedback Card */}
        <div
          className={`relative ${config.bgGradient} ${config.borderColor} border-2 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 ${config.animation} scale-110`}
        >
          {/* Sparkles for special feedback */}
          {config.sparkles && (
            <>
              <div className="absolute -top-2 -left-2">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-ping" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles
                  className="w-6 h-6 text-pink-300 animate-ping"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Sparkles
                  className="w-6 h-6 text-cyan-300 animate-ping"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <Sparkles
                  className="w-6 h-6 text-purple-300 animate-ping"
                  style={{ animationDelay: "0.6s" }}
                />
              </div>
            </>
          )}

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div
              className={`${config.iconColor} bg-white/20 rounded-full p-3 backdrop-blur-sm`}
            >
              <IconComponent size={40} />
            </div>
          </div>

          {/* Text */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              {config.text}
            </h2>

            {/* Additional text for match */}
            {swipeFeedback === "matched" && (
              <p className="text-white/90 text-lg font-medium">
                You can now start chatting! 🎉
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeFeedback;
