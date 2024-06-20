"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import CreateFormProfile from "@/components/create-form-profile";
import useFormCreateProfile from "@/stores/useFormCreateProfile";

const CreateProfile = () => {
	const {isOpen, toggle} = useFormCreateProfile(); // Access the form dialog state

	return (
		<Dialog open={isOpen} onOpenChange={toggle}>
			<DialogTrigger asChild>
				<div
					className="relative group w-[300px] h-[300px] rounded-md bg-summer-dog p-0.5 transition-all duration-500 ease-in-out cursor-pointer">
					<div
						className="flex h-full w-full items-center justify-center bg-zinc-900 rounded-md p-5 flex-col group-hover:bg-summer-dog transition-all duration-300 ease-in-out">
						<Plus className="w-[150px] h-[150px] text-zinc-50 group-hover:text-zinc-950 "/>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Profile</DialogTitle>
					<DialogDescription>
						Fill out the form below to create a new profile.
					</DialogDescription>
				</DialogHeader>
				<CreateFormProfile/>
			</DialogContent>
		</Dialog>
	);
};

export default CreateProfile;
