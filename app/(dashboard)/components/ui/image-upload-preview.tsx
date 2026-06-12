"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FiEdit, FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
  label?: string;
  value?: string | null;
  onChange: (file: File) => void;
  className?: string;
};

const ImageUploadPreview = ({
  label,
  value,
  onChange,
  className,
}: TImageUploadPreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(value || null);

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validasi file
      console.log("File selected:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      // Buat preview lokal
      const previewUrl = URL.createObjectURL(file);
      setLocalPreview(previewUrl);
      
      // Kirim file ke parent
      onChange(file);
    }
  };

  return (
    <div className={`flex flex-col ${className || ""}`}>
      {label && (
        <label className="block text-sm font-bold text-gray-800 mb-1">
          {label}
        </label>
      )}
      <div
        onClick={handleImageClick}
        className="border-2 border-dashed border-primary bg-primary/5 rounded-lg flex-1 flex flex-col justify-center items-center cursor-pointer hover:bg-primary/10 transition-all min-h-[200px]"
      >
        {localPreview ? (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={localPreview}
              alt="preview category"
              className="max-w-full max-h-full object-contain"
              width={150}
              height={150}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
              <span className="text-white text-sm flex items-center gap-1">
                <FiEdit size={16} /> Change
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <FiUploadCloud className="text-primary mx-auto mb-2" size={32} />
            <span className="text-sm text-gray-500">Click to Upload</span>
            <p className="text-xs text-gray-400 mt-1"></p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploadPreview;