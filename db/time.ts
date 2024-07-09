import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "times-database";
const DB_VERSION = 1;
const STORE_NAME = "times";

interface TimerEntry {
  date: string;
  workTime: number;
  breakTime: number;
}

const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "date" });
      }
    },
  });
};

export const saveTime = async (
  date: string,
  workTime: number,
  breakTime: number
): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  const existing = (await store.get(date)) as TimerEntry | undefined;

  console.log("Existing Entry:", existing);
  console.log("New Work Time:", workTime);
  console.log("New Break Time:", breakTime);

  const data: TimerEntry = existing
    ? {
        ...existing,
        workTime: existing.workTime + workTime,
        breakTime: existing.breakTime + breakTime,
      }
    : { date, workTime, breakTime };

  console.log("Data to be saved:", data);

  await store.put(data);
  await tx.done;
};

export const getTime = async (
  date: string
): Promise<TimerEntry | undefined> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const data = (await store.get(date)) as TimerEntry | undefined;
  await tx.done;
  return data;
};
