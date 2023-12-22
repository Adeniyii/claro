import React from "react";
import dynamic from "next/dynamic";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";

interface EmojiPickerProps {
  children: React.ReactNode;
  getEmoji: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ children, getEmoji }) => {
  const Picker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
  });

  function handleEmojiClick(emojiObject: any) {
    getEmoji(emojiObject.emoji);
  }

  return <div className="flex items-center">
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-0 border-none">
        <Picker onEmojiClick={handleEmojiClick} />
      </PopoverContent>
    </Popover>
  </div>;
};

export default EmojiPicker;
