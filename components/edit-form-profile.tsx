import { z } from "zod";
import useProfile from "@/hooks/useProfile";
import useFormUpdateProfile from "@/stores/useFormUpdateProfile";
import useFormCreateProfile from "@/stores/useFormCreateProfile";
import { IProfile } from "@/@types";
import FormProfile, { formSchema } from "./form-profile";

const EditFormProfile = ({ profile }: { profile: IProfile }) => {
  const { updateProfile, deleteProfile } = useProfile();
  const { close } = useFormUpdateProfile();
  const { setIsLoadData } = useFormCreateProfile();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateProfile(profile.id, {
      name: values.title,
      icon: values.icon,
      minutes: values.minutes,
      seconds: values.seconds,
      background: values.background,
    });
    close();
    setIsLoadData(true);
  };

  const onDelete = () => {
    deleteProfile(profile.id);
    close();
    setIsLoadData(true);
  };

  return (
    <FormProfile
      initialValues={{
        title: profile.name,
        icon: profile.icon,
        minutes: profile.minutes,
        seconds: profile.seconds,
        background: profile.background,
      }}
      onSubmit={onSubmit}
      buttonLabel="Update Profile"
      isDelete
      onDelete={onDelete}
    />
  );
};

export default EditFormProfile;
