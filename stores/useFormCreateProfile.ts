import { create } from 'zustand';

type FormProfile = {
	isOpen: boolean;
	isLoadData: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
	setIsLoadData: (isLoadData: boolean) => void;
};

const useFormCreateProfile = create<FormProfile>((set) => ({
	isOpen: false,
	isLoadData: false,
	open: () => set({isOpen: true}),
	close: () => set({isOpen: false}),
	toggle: () => set((state) => ({isOpen: !state.isOpen})),
	setIsLoadData: (isLoadData) => set({isLoadData}),
}));

export default useFormCreateProfile;
