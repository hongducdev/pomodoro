import { useEffect, useState } from "react";
import { IProfile } from "@/@types";

const useProfile = () => {
	const [profiles, setProfiles] = useState<IProfile[]>([]);

	useEffect(() => {
		const storedProfiles = localStorage.getItem('profiles');
		if (storedProfiles) {
			setProfiles(JSON.parse(storedProfiles));
		}
	}, []);

	const saveProfilesToLocalStorage = (profiles: IProfile[]) => {
		localStorage.setItem('profiles', JSON.stringify(profiles));
	};

	const addProfile = (profile: IProfile) => {
		const newProfiles = [...profiles, profile];
		setProfiles(newProfiles);
		saveProfilesToLocalStorage(newProfiles);
	};

	const updateProfile = (id: string, updatedProfile: Partial<IProfile>) => {
		const newProfiles = profiles.map(profile =>
			profile.id === id ? {...profile, ...updatedProfile} : profile
		);
		setProfiles(newProfiles);
		saveProfilesToLocalStorage(newProfiles);
	};

	const deleteProfile = (id: string) => {
		const newProfiles = profiles.filter(profile => profile.id !== id);
		setProfiles(newProfiles);
		saveProfilesToLocalStorage(newProfiles);
	};

	return {
		profiles,
		addProfile,
		updateProfile,
		deleteProfile
	};
}

export default useProfile;