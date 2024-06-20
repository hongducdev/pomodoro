import { IProfile } from "@/@types";
import { SquareArrowOutUpRight } from "lucide-react";

const padTime = (time: number): string => {
  return time < 10 ? `0${time}` : `${time}`;
};

const ProfileItem = ({ profile }: { profile: IProfile }) => {
  return (
    <div
      className={`relative group w-[300px] h-[300px] rounded-md ${profile.background} p-0.5 transition-all duration-500 ease-in-out cursor-pointer`}
    >
      <div
        className={`flex h-full w-full items-center justify-center bg-zinc-900 rounded-md p-5 flex-col transition-all duration-300 ease-in-out group-hover:bg-opacity-0`}
      >
        <span className="text-3xl absolute top-5 left-5 flex items-center transition-all duration-300 ease-in-out">
          {profile.icon}
        </span>
        <SquareArrowOutUpRight className="text-zinc-900 w-8 h-8 absolute top-5 right-5" />
        <h5
          className={`text-5xl font-semibold text-zinc-50 transition-all duration-300 ease-in-out group-hover:text-zinc-800`}
        >
          {profile.name}
        </h5>
        <span
          className={`absolute font-medium text-zinc-50 transition-all duration-300 ease-in-out bottom-5 left-1/2 -translate-x-1/2 group-hover:text-zinc-800`}
        >
          {padTime(profile.minutes)} : {padTime(profile.seconds)}
        </span>
      </div>
    </div>
  );
};

export default ProfileItem;
