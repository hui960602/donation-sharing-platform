import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CATEGORIES, CONDITIONS } from "@/types/donation";
import { fileToBase64 } from "@/lib/storage";
import { saveDonatedItemToDB } from "@/lib/database";
import { Upload, ImagePlus, CheckCircle, Loader2 } from "lucide-react";

export function DonateForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    condition: "",
    location: "",
    contactEmail: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Please select an image file" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Image must be less than 5MB" }));
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }
    if (!formData.condition) {
      newErrors.condition = "Please select condition";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email";
    }
    if (!selectedFile) {
      newErrors.image = "Please upload an item photo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitDonation = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert image to Base64
      const imageBase64 = await fileToBase64(selectedFile!);

      // Save to database
      const { data, error } = await saveDonatedItemToDB({
        name: formData.itemName.trim(),
        description: formData.description.trim(),
        category: formData.category,
        condition: formData.condition,
        location: formData.location.trim(),
        contact_email: formData.contactEmail.trim(),
        image_url: imageBase64,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Donation Successful!",
        description: "Your item has been listed. Thank you for your generosity!",
      });

      // Navigate back to home page
      setTimeout(() => {
        navigate("/?donation=success#items");
      }, 1500);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitDonation();
      }}
      className="space-y-6"
    >
      {/* Item Photo Upload */}
      <div className="space-y-2">
        <Label htmlFor="itemPhoto">Item Photo *</Label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            previewUrl
              ? "border-primary bg-primary/5"
              : errors.image
              ? "border-destructive bg-destructive/5"
              : "border-border hover:border-primary/50 hover:bg-accent/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="itemPhoto"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {previewUrl ? (
            <div className="space-y-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-48 mx-auto rounded-lg object-cover"
              />
              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">{selectedFile?.name}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Click to change image
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent flex items-center justify-center">
                <ImagePlus className="h-8 w-8 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Click to upload an image
                </p>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>
        {errors.image && (
          <p className="text-sm text-destructive">{errors.image}</p>
        )}
      </div>

      {/* Item Name */}
      <div className="space-y-2">
        <Label htmlFor="itemName">Item Name *</Label>
        <Input
          id="itemName"
          name="itemName"
          placeholder="e.g., Vintage Wooden Chair"
          value={formData.itemName}
          onChange={handleInputChange}
          className={errors.itemName ? "border-destructive" : ""}
        />
        {errors.itemName && (
          <p className="text-sm text-destructive">{errors.itemName}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the item, its condition, and any relevant details..."
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          className={errors.description ? "border-destructive" : ""}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      {/* Category and Condition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger className={errors.category ? "border-destructive" : ""}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-destructive">{errors.category}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Condition *</Label>
          <Select
            value={formData.condition}
            onValueChange={(value) => handleSelectChange("condition", value)}
          >
            <SelectTrigger className={errors.condition ? "border-destructive" : ""}>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              {CONDITIONS.map((cond) => (
                <SelectItem key={cond} value={cond}>
                  {cond}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.condition && (
            <p className="text-sm text-destructive">{errors.condition}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Pickup Location *</Label>
        <Input
          id="location"
          name="location"
          placeholder="e.g., Downtown, Seattle"
          value={formData.location}
          onChange={handleInputChange}
          className={errors.location ? "border-destructive" : ""}
        />
        {errors.location && (
          <p className="text-sm text-destructive">{errors.location}</p>
        )}
      </div>

      {/* Contact Email */}
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email *</Label>
        <Input
          id="contactEmail"
          name="contactEmail"
          type="email"
          placeholder="your.email@example.com"
          value={formData.contactEmail}
          onChange={handleInputChange}
          className={errors.contactEmail ? "border-destructive" : ""}
        />
        {errors.contactEmail && (
          <p className="text-sm text-destructive">{errors.contactEmail}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Upload className="h-5 w-5 mr-2" />
            Submit Donation
          </>
        )}
      </Button>
    </form>
  );
}
