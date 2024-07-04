import { IProfile } from "@/@types";
import { SquareArrowOutUpRight } from "lucide-react";
import EditProfile from "./edit-profile";

const padTime = (time: number | string): string => {
  const num = typeof time === 'string' ? parseInt(time, 10) : time;
  return num < 10 ? `0${num}` : `${num}`;
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
        <EditProfile profile={profile} />
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
