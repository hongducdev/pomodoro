"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditFormProfile from "./edit-form-profile";
import { IProfile } from "@/@types";
import useFormUpdateProfile from "@/stores/useFormUpdateProfile";
import { Settings2 } from "lucide-react";

const EditProfile = ({ profile }: { profile: IProfile }) => {
  const { isOpen, toggle } = useFormUpdateProfile();

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Settings2 className="text-zinc-900 w-8 h-8 absolute top-5 right-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editor Profile</DialogTitle>
          <DialogDescription>
            Fill out the form below to edit the profile.
          </DialogDescription>
        </DialogHeader>
        <EditFormProfile profile={profile} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
