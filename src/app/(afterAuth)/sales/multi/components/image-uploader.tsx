"use client";

import { Button } from "@/shared/ui/button";
import { useRef } from "react";

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const ImageUploader: React.FC<Props> = ({ setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("선택한 파일:", file);
      setFile(file);
    }
  };
  return (
    <Button onClick={onClick}>
      등록
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />
    </Button>
  );
};

export default ImageUploader;
