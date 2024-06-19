"use client";
import React from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface IconPickerProps {
	onChange: (icon: string) => void;
	children: React.ReactNode;
	asChild?: boolean;
}

const IconPicker = ({
	                    onChange,
	                    children,
	                    asChild,
                    }: IconPickerProps) => {

	return (
		<Popover>
			<PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
			<PopoverContent className="p-0 w-full border-none shadow-none">
				<EmojiPicker
					height={350}
					theme={Theme.DARK}
					onEmojiClick={(data) => onChange(data.emoji)}
				/>
			</PopoverContent>
		</Popover>
	);
};

export default IconPicker;