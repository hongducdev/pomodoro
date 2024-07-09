import TimerCountdown from "@/components/timer-countdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomePage = () => {
  return (
    <div className="w-[800px] bg-summer-dog p-0.5 rounded-xl">
      <div className="bg-zinc-950 text-zinc-50 p-5 rounded-xl text-center">
        <Tabs defaultValue="pomodoro">
          <TabsList>
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
            <TabsTrigger value="longBreak">Long Break</TabsTrigger>
          </TabsList>
          <TabsContent value="pomodoro">
            <TimerCountdown
              initialWorkMinutes="25"
              initialWorkSeconds="0"
              initialBreakMinutes="5"
              initialBreakSeconds="0"
            />
          </TabsContent>
          <TabsContent value="shortBreak">
            <TimerCountdown
              initialWorkMinutes="5"
              initialWorkSeconds="0"
              initialBreakMinutes="5"
              initialBreakSeconds="0"
            />
          </TabsContent>
          <TabsContent value="longBreak">
            <TimerCountdown
              initialWorkMinutes="15"
              initialWorkSeconds="0"
              initialBreakMinutes="5"
              initialBreakSeconds="0"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;
