"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquareArrowOutUpRight } from "lucide-react";
import EditFormProfile from "./edit-form-profile";
import { IProfile } from "@/@types";
import useFormUpdateProfile from "@/stores/useFormUpdateProfile";

const EditProfile = ({ profile }: { profile: IProfile }) => {
  const { isOpen, toggle } = useFormUpdateProfile();

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <SquareArrowOutUpRight className="text-zinc-900 w-8 h-8 absolute top-5 right-5" />
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
