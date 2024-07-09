import { useEffect, useState } from "react";
import { IProfile } from "@/@types";
import useFormCreateProfile from "@/stores/useFormCreateProfile";
import {
  addProfile as addProfileToDB,
  getAllProfiles,
  updateProfile as updateProfileInDB,
  deleteProfile as deleteProfileFromDB,
} from "@/db/profile";

const useProfile = () => {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const { isLoadData } = useFormCreateProfile();

  useEffect(() => {
    const loadProfiles = async () => {
      const storedProfiles = await getAllProfiles();
      setProfiles(storedProfiles);
      if (isLoadData) {
        useFormCreateProfile.getState().setIsLoadData(false);
      }
    };
    loadProfiles();
  }, [isLoadData]);

  const addProfile = async (profile: IProfile) => {
    await addProfileToDB(profile);
    setProfiles((prevProfiles) => [...prevProfiles, profile]);
  };

  const updateProfile = async (
    id: string,
    updatedProfile: Partial<IProfile>
  ) => {
    await updateProfileInDB(id, updatedProfile);
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      )
    );
  };

  const deleteProfile = async (id: string) => {
    await deleteProfileFromDB(id);
    setProfiles((prevProfiles) =>
      prevProfiles.filter((profile) => profile.id !== id)
    );
  };

  const getProfileById = (id: string): IProfile | undefined => {
    return profiles.find((profile) => profile.id === id);
  };

  return {
    profiles,
    addProfile,
    updateProfile,
    deleteProfile,
    getProfileById,
  };
};

export default useProfile;
