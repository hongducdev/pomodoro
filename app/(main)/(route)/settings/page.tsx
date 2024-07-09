import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <div className="w-[400px] bg-summer-dog p-0.5 rounded-xl">
      <div className="bg-zinc-950 text-zinc-50 p-5 rounded-xl text-center">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <div className="mt-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p>Alarm Sound</p>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <p>Ticking Sound</p>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
