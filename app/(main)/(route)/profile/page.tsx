import React from 'react';
import ProfileItem from "@/components/profile-item";

const ProfilePage = () => {
	return (
		<div>
			ProfilePage
			<div className="grid grid-cols-3 gap-3">
				<ProfileItem/>
				<ProfileItem/>
				<ProfileItem/>
				<ProfileItem/>
				<ProfileItem/>
				<ProfileItem/>
			</div>
		</div>
	);
};

export default ProfilePage;