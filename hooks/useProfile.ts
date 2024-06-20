import { useEffect, useState } from "react";
import { IProfile } from "@/@types";
import useFormCreateProfile from "@/stores/useFormCreateProfile";

const useProfile = () => {
	const [ profiles, setProfiles ] = useState<IProfile[]>([]);
	const {isLoadData} = useFormCreateProfile();

	useEffect(() => {
		const storedProfiles = localStorage.getItem('profiles');
		if (storedProfiles) {
			setProfiles(JSON.parse(storedProfiles));
			if (isLoadData) {
				useFormCreateProfile.getState().setIsLoadData(false);
			}
		}
	}, [ isLoadData ]);

	const saveProfilesToLocalStorage = (profiles: IProfile[]) => {
		localStorage.setItem('profiles', JSON.stringify(profiles));
	};

	const addProfile = (profile: IProfile) => {
		const newProfiles = [ ...profiles, profile ];
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
		deleteProfile,
	};
};

export default useProfile;
