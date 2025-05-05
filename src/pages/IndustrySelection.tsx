
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { File, Upload } from 'lucide-react';

interface IndustrySelectionProps {
  onIndustrySelect: (industry: string) => void;
}

const industries = [
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'hospital', label: 'Hospital' },
  { id: 'office', label: 'General Office' },
  { id: 'other', label: 'Other (Upload Own Documents)' }
];

const IndustrySelection: React.FC<IndustrySelectionProps> = ({ onIndustrySelect }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
    setIsOtherSelected(value === 'other');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    
    if (!selectedFiles) return;
    
    // Check file sizes
    const newFiles: File[] = [];
    let hasLargeFiles = false;
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Check if file is larger than 20MB (20 * 1024 * 1024 bytes)
      if (file.size > 20 * 1024 * 1024) {
        hasLargeFiles = true;
        continue;
      }
      
      // Check file type
      const validTypes = ['application/pdf', 'text/csv', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        newFiles.push(file);
      }
    }
    
    if (hasLargeFiles) {
      toast({
        title: "Warning",
        description: "Some files exceed the 20MB limit and were not added",
        variant: "destructive",
      });
    }
    
    if (newFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please upload valid files (PDF, CSV, TXT, DOCX) under 20MB",
        variant: "destructive",
      });
      return;
    }
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedIndustry) {
      toast({
        title: "Error",
        description: "Please select an industry",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedIndustry === 'other' && files.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one document",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate processing
    setTimeout(() => {
      onIndustrySelect(selectedIndustry);
      toast({
        title: "Success",
        description: "Your industry has been set up successfully",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Select Your Industry</CardTitle>
          <CardDescription>
            Choose the industry that best matches your business to help us personalize your experience
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedIndustry || ""} onValueChange={handleIndustryChange}>
              {industries.map((industry) => (
                <div key={industry.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={industry.id} id={industry.id} />
                  <label htmlFor={industry.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {industry.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
            
            {isOtherSelected && (
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer text-center" onClick={triggerFileInput}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.csv,.txt,.docx,application/pdf,text/csv,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  />
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600 font-medium">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, CSV, TXT, DOCX (Max 20MB per file)</p>
                </div>
                
                {files.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Uploaded Files:</h3>
                    <ul className="space-y-2">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                          <div className="flex items-center space-x-2">
                            <File size={16} className="text-gray-500" />
                            <span className="truncate max-w-[180px]">{file.name}</span>
                            <span className="text-gray-500 text-xs">{formatFileSize(file.size)}</span>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFile(file)}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <Button type="button" variant="outline" size="sm" onClick={triggerFileInput}>
                      Add More Files
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Setting up..." : "Continue"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default IndustrySelection;
