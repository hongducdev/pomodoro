"use client";
import ProfileItem from "@/components/profile-item";
import useProfile from "@/hooks/useProfile";
import CreateProfile from "@/components/create-profile";
import { useEffect, useState } from "react";
import { IProfile } from "@/@types";
import useFormCreateProfile from "@/stores/useFormCreateProfile";

const ProfilePage = () => {
	const {profiles} = useProfile();
	const {isLoadData} = useFormCreateProfile();
	const [ profilesData, setProfilesData ] = useState<IProfile[]>(profiles);

	useEffect(() => {
		setProfilesData(profiles);
	}, [ profiles, isLoadData ]);

	return (
		<div className="grid grid-cols-3 gap-3">
			{profilesData && profilesData.length > 0 && profilesData.map((profile) => (
				<ProfileItem key={profile.id} profile={profile}/>
			))}
			<CreateProfile/>
		</div>
	);
};

export default ProfilePage;
