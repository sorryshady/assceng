"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Eye, FileDown } from "lucide-react";

interface FileActionsProps {
  fileUrl: string;
  title: string;
}

const FileActions = ({ fileUrl, title }: FileActionsProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = title || "download";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button asChild>
        <Link href={fileUrl} target="_blank">
          <Eye size={20} />
          <span>View</span>
        </Link>
      </Button>
      <Button onClick={handleDownload}>
        <FileDown size={20} />
        <span>Download</span>
      </Button>
    </div>
  );
};

export default FileActions;
