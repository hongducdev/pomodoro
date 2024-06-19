"use client"
import ProfileItem from "@/components/profile-item";
import useProfile from "@/hooks/useProfile";
import CreateProfile from "@/components/create-profile";

const ProfilePage = () => {

	const {profiles} = useProfile()

	return (
		<div>
			{
				profiles && profiles.length > 0 ? (<div className="grid grid-cols-3 gap-3">
					{
						profiles.map((profile) => (
							<ProfileItem key={profile.id} profile={profile}/>
						))
					}
				</div>) : (
					<CreateProfile/>
				)
			}
		</div>
	);
};

export default ProfilePage;