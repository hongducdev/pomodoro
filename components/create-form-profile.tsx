"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Smile } from "lucide-react";
import IconPicker from "@/components/icon-picker";
import useProfile from "@/hooks/useProfile";
import useFormCreateProfile from "@/stores/useFormCreateProfile";

const backgroundList = [
	"bg-summer-dog",
	"bg-roseanna",
	"bg-limeade",
	"bg-almost",
	"bg-teal-love",
	"bg-virgin"
];

const formSchema = z.object({
	title: z.string().min(2, {message: "Title must be at least 2 characters."}),
	icon: z.string().min(1, {message: "Icon must be at least 1 character."}),
	minutes: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val >= 0, {message: "Minutes must be a non-negative integer."}),
	seconds: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val >= 0, {message: "Seconds must be a non-negative integer."}),
	background: z.string(),
});

const CreateFormProfile = () => {
	const {addProfile} = useProfile();
	const {close, setIsLoadData} = useFormCreateProfile();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		addProfile({
			id: `${Date.now()}`,
			name: values.title,
			minutes: values.minutes,
			seconds: values.seconds,
			icon: values.icon,
			background: values.background,
		});
		form.reset();
		close();
		setIsLoadData(true);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({field}) => (
						<FormItem>
							<FormLabel className="text-zinc-50">Title</FormLabel>
							<FormControl>
								<Input placeholder="Coding" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="icon"
					render={({field}) => (
						<FormItem>
							<FormLabel className="text-zinc-50">Icon</FormLabel>
							<FormControl>
								<div className="flex items-center gap-2">
									<IconPicker onChange={field.onChange}>
										<div className="flex items-center gap-2 cursor-pointer">
											{field.value ? (
												<span className="text-2xl">{field.value}</span>
											) : (
												<Smile className="w-6 h-6 text-zinc-400"/>
											)}
										</div>
									</IconPicker>
								</div>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="minutes"
					render={({field}) => (
						<FormItem>
							<FormLabel className="text-zinc-50">Minutes</FormLabel>
							<FormControl>
								<Input type="number" placeholder="25" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="seconds"
					render={({field}) => (
						<FormItem>
							<FormLabel className="text-zinc-50">Seconds</FormLabel>
							<FormControl>
								<Input type="number" placeholder="0" {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="background"
					render={({field}) => (
						<FormItem>
							<FormLabel className="text-zinc-50">Background</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a background"/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{backgroundList.map((background, index) => (
										<SelectItem key={index} value={background}>
											<div className="flex items-center space-x-4">
												<div className={`w-5 h-5 rounded-sm ${background}`}/>
												<span className="text-zinc-50">{background.replace("bg-", "")}</span>
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<Button className="bg-summer-dog text-zin-950 w-full" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default CreateFormProfile;
