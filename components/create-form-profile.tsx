import useProfile from "@/hooks/useProfile";
import useFormCreateProfile from "@/stores/useFormCreateProfile";
import FormProfile, { formSchema } from "./form-profile";
import { z } from "zod";

const CreateFormProfile = () => {
  const { addProfile } = useProfile();
  const { close, setIsLoadData } = useFormCreateProfile();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    addProfile({
      id: `${Date.now()}`,
      name: values.title,
      minutes: values.minutes,
      seconds: values.seconds,
      icon: values.icon,
      background: values.background,
    });
    close();
    setIsLoadData(true);
  };

  return (
    <FormProfile
      initialValues={{
        title: "",
        icon: "",
        minutes: 0,
        seconds: 0,
        background: "",
      }}
      onSubmit={onSubmit}
      buttonLabel="Create Profile"
    />
  );
};

export default CreateFormProfile;
