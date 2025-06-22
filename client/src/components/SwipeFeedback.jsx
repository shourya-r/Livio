import { useMatchStore } from "../store/useMatchStore";
import { Heart, X, CheckCircle } from "lucide-react";

const SwipeFeedback = () => {
  const { swipeFeedback } = useMatchStore();

  if (!swipeFeedback) return null;

  const getFeedbackConfig = (feedback) => {
    switch (feedback) {
      case "liked":
        return {
          icon: Heart,
          text: "Connected!",
          bgColor: "bg-blue-500",
          borderColor: "border-blue-400",
          iconColor: "text-white",
          animation: "animate-pulse",
        };
      case "passed":
        return {
          icon: X,
          text: "Passed",
          bgColor: "bg-gray-600",
          borderColor: "border-gray-500",
          iconColor: "text-white",
          animation: "animate-bounce",
        };
      case "matched":
        return {
          icon: CheckCircle,
          text: "Roommate Match!",
          bgColor: "bg-orange-500",
          borderColor: "border-orange-400",
          iconColor: "text-white",
          animation: "animate-pulse",
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
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl"></div>

        {/* Main Feedback Card */}
        <div
          className={`relative ${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-8 shadow-2xl transform transition-all duration-500 ${config.animation} scale-110`}
        >
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
