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
          bgColor: "bg-blue-600",
          borderColor: "border-blue-500",
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
          bgColor: "bg-blue-700",
          borderColor: "border-blue-600",
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
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl"></div>

        {/* Main Feedback Card */}
        <div
          className={`relative ${config.bgColor} ${config.borderColor} border rounded-2xl p-6 shadow-lg transform transition-all duration-300 ${config.animation}`}
        >
          {/* Icon */}
          <div className="flex justify-center mb-3">
            <div className={config.iconColor}>
              <IconComponent size={32} />
            </div>
          </div>

          {/* Text */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white">{config.text}</h2>

            {/* Additional text for match */}
            {swipeFeedback === "matched" && (
              <p className="text-white/90 text-sm mt-1">
                You can now start chatting!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeFeedback;
