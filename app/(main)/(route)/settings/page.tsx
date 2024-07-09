import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <div className="w-[500px] text-zinc-50">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <div className="mt-10">
				<div className="flex items-center justify-between">
					<p>Alarm Sound</p>
					<Switch />
				</div>
			</div>
    </div>
  );
};

export default SettingsPage;
