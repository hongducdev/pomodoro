import { openDB } from "idb";
import { IProfile } from "@/@types";

const DB_NAME = "profiles-database";
const DB_VERSION = 1;
const STORE_NAME = "profiles";

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const addProfile = async (profile: IProfile): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.add(profile);
  await tx.done;
};

export const getAllProfiles = async (): Promise<IProfile[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const updateProfile = async (
  id: string,
  updatedProfile: Partial<IProfile>
): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const profile = await tx.store.get(id);
  const newProfile = { ...profile, ...updatedProfile };
  await tx.store.put(newProfile);
  await tx.done;
};

export const deleteProfile = async (id: string): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
