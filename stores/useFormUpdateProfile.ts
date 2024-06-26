import { create } from "zustand";

type FormProfile = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const useFormUpdateProfile = create<FormProfile>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useFormUpdateProfile;
