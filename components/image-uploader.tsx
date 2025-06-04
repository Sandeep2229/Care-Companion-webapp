"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, X, Check, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  title: string;
  description: string;
  maxSizeMB?: number;
  onImageSelect?: (file: File) => void;
}

export function ImageUploader({
  title,
  description,
  maxSizeMB = 10,
  onImageSelect,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please select an image file.",
      });
      return;
    }
    
    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB.`,
      });
      return;
    }
    
    // Update state with selected file
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setIsComplete(false);
    
    // Notify parent component
    if (onImageSelect) {
      onImageSelect(file);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsComplete(true);
          toast({
            title: "Upload complete",
            description: "X-ray image has been successfully uploaded.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 150);
  };

  const resetUploader = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {!selectedFile && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center gap-3 py-4">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Drag & drop an image or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: JPEG, PNG, DICOM - Max size: {maxSizeMB}MB
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </div>
      )}
      
      {selectedFile && previewUrl && (
        <div className="space-y-4 border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                <FileImage className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium line-clamp-1">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetUploader}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
          
          <div className="relative aspect-video overflow-hidden rounded-md border bg-muted">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
          
          <div className="flex gap-3">
            {!isComplete ? (
              <Button 
                onClick={simulateUpload}
                disabled={isUploading}
                className="flex-1"
              >
                {isUploading ? "Uploading..." : "Upload X-ray"}
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 border border-green-200"
              >
                <Check className="mr-2 h-4 w-4" />
                X-ray Uploaded Successfully
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}