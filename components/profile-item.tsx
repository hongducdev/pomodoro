const ProfileItem = () => {
	return (
		<div
			className="relative group w-[300px] h-[300px] rounded-md bg-virgin p-0.5 transition-all duration-500 ease-in-out cursor-pointer">
			<div
				className="flex h-full w-full items-center justify-center bg-zinc-900 rounded-md p-5 flex-col group-hover:bg-virgin transition-all duration-300 ease-in-out">
				<span className="text-3xl absolute top-5 left-5 transition-all duration-300 ease-in-out">
					🐧
				</span>
				<h5
					className="text-5xl font-semibold text-zinc-50 group-hover:text-zinc-800 transition-all duration-300 ease-in-out">
					Coding
				</h5>
				<span
					className="absolute font-medium text-zinc-50 group-hover:text-zinc-800 bottom-5 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out">
					25 minutes
				</span>
			</div>
		</div>
	);
};

export default ProfileItem;
