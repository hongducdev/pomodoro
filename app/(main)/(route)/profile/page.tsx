"use client";
import ProfileItem from "@/components/profile-item";
import useProfile from "@/hooks/useProfile";
import CreateProfile from "@/components/create-profile";

const ProfilePage = () => {

	const {profiles} = useProfile();

	return (
		<div className="grid grid-cols-3 gap-3">
			{
				profiles && profiles.length > 0 && (
					profiles.map((profile) => (
						<ProfileItem key={profile.id} profile={profile}/>
					))
				)
			}
			<CreateProfile/>
		</div>
	);
};

export default ProfilePage;