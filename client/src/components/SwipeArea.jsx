import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";

const SwipeArea = () => {
  const { userProfiles, swipeRight, swipeLeft } = useMatchStore();

  const handleSwipe = (dir, user) => {
    if (dir === "right") swipeRight(user);
    else if (dir === "left") swipeLeft(user);
  };

  return (
    <div className="relative w-full max-w-sm h-[30rem]">
      {userProfiles.map((user) => (
        <TinderCard
          className="absolute shadow-none"
          key={user._id}
          onSwipe={(dir) => handleSwipe(dir, user)}
          swipeRequirementType="position"
          swipeThreshold={100}
          preventSwipe={["up", "down"]}
        >
          <div className="card w-96 h-[30rem] rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white transform transition duration-300 ease-in-out hover:scale-[1.02]">
            <div className="relative h-3/4">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                <h2 className="text-white text-2xl font-bold drop-shadow-lg">
                  {user.name}, {user.age}
                </h2>
              </div>
            </div>
            <div className="p-4 bg-blue-50 h-1/4">
              <p className="text-gray-700 text-md">{user.bio}</p>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default SwipeArea;
