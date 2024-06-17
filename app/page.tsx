import TimerCountdown from "@/components/timer-countdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomePage = () => {
  return (
    <div>
      <div className="w-[800px] bg-zinc-950 text-zinc-50 p-5 rounded-xl border border-zinc-400 text-center">
        <Tabs defaultValue="pomodoro">
          <TabsList>
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
            <TabsTrigger value="longBreak">Long Break</TabsTrigger>
          </TabsList>
          <TabsContent value="pomodoro">
            <TimerCountdown initialMinutes={25} initialSeconds={0} />
          </TabsContent>
          <TabsContent value="shortBreak">
            <TimerCountdown initialMinutes={5} initialSeconds={0} />
          </TabsContent>
          <TabsContent value="longBreak">
            <TimerCountdown initialMinutes={15} initialSeconds={0} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;
