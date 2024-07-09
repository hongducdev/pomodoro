"use client";
import { useEffect, useState } from "react";
import { IProfile } from "@/@types";
import useProfile from "@/hooks/useProfile";
import TimerCountdown from "@/components/timer-countdown";

const ProfileDetailPage = ({ params }: { params: { id: string } }) => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const { getProfileById } = useProfile();

  useEffect(() => {
    const profileData = getProfileById(params.id);
    setProfile(profileData || null);
  }, [params.id, getProfileById]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-h-screen">
      <div className={`w-[800px] ${profile.background} p-0.5 rounded-xl`}>
        <div className="bg-zinc-950 text-zinc-50 p-5 rounded-xl text-center">
          <div className="text-3xl flex items-center justify-center">
            <span>{profile.icon}</span>
            <h1 className="font-semibold">{profile.name}</h1>
          </div>
          <TimerCountdown
            initialWorkMinutes={profile.minutes}
            initialWorkSeconds={profile.seconds}
            initialBreakMinutes="1"
            initialBreakSeconds="0"
            background={profile.background}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;
