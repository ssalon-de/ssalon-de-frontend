"use client";

import PageTitle from "@/shared/ui/page-title";
import ImageUploader from "./components/image-uploader";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import api from "@/shared/lib/axios";

export default function MultiUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const handleSave = async () => {
    const formData = new FormData();

    formData.append("file", file as Blob);
    formData.append("name", "test");
    const res = await api({
      url: "/sales/multi-upload",
      data: formData,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return (
    <div>
      <PageTitle title="매출 사진 등록" />
      <ImageUploader setFile={setFile} />
      <Button onClick={handleSave}>저장</Button>
    </div>
  );
}
