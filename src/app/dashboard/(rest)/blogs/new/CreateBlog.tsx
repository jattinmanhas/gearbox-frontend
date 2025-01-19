"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { updloadFileImageToS3 } from "./Apicalls";
import { toast } from "react-toastify";
import { CategorySearch } from "@/components/Forms/productForm";
import { CreateNewBlog } from "@/lib/dashboard";
import SuccessMessage from "@/components/SuccessMessage";
import { CustomInput, CustomTextArea, CustomFileUpload } from '@/components/ui/CustomInput';

interface Section {
  id: string;
  heading: string;
  paragraph: string;
  order: number;
  image: {
    imageName: string | null;
    confirmed: boolean;
  };
}

export interface BlogPostFormData {
  id: string;
  heading: string;
  description: string;
  category_id?: string;
  image: string | null;
  sections: Section[];
}

export default function BlogPostForm() {
  const [selected, setSelected] = useState<CategorySearch | null>(null);
  const [formData, setFormData] = useState<BlogPostFormData>({
    id: "",
    heading: "",
    description: "",
    category_id: "",
    image: null,
    sections: [],
  });

  useEffect(() => {
    if (selected && selected.category_id) {
      setFormData((prev) => ({ ...prev, category_id: selected.category_id }));
    }
  }, [selected]);

  const updateMainImage = async (file: File | null) => {
    if (file && window.confirm("Do you want to Upload this image?")) {
      const fileUpload = await updloadFileImageToS3(file);
      if (fileUpload.status === 200) {
        setFormData((prev) => ({ ...prev, image: fileUpload.data }));
      }
    }
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: String(prev.sections.length + 1),
          heading: "",
          paragraph: "",
          order: prev.sections.length + 1,
          image: {
            imageName: null,
            confirmed: false,
          },
        },
      ],
    }));
  };

  const updateSectionImage = async (sectionId: string, file: File | null) => {
    if (file) {
      if (
        window.confirm("Do you want to confirm this image for the section?")
      ) {
        const fileUpload = await updloadFileImageToS3(file);
        if (fileUpload.status === 200) {
          setFormData((prev) => ({
            ...prev,
            sections: prev.sections.map((section) =>
              section.id === sectionId
                ? {
                    ...section,
                    image: { imageName: fileUpload.data, confirmed: true },
                  }
                : section
            ),
          }));
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const blog = await CreateNewBlog(formData);
    console.log(blog);
    if (blog.status == 200) {
      toast.success(blog.message);
      setFormData({
        id: "",
        heading: "",
        description: "",
        category_id: "",
        image: null,
        sections: [],
      });
    } else {
      toast.error(blog.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h4 className="text-2xl text-gray-100">Create New Blog</h4>
        <hr className="border-neutral-700 my-4" />

        <CustomInput
          label="Blog Heading"
          value={formData.heading}
          placeholder="Enter blog heading"
          onChange={(e) => setFormData((prev) => ({ ...prev, heading: e.target.value }))}
        />

        <CustomFileUpload
          label="Blog Image"
          onChange={(e) => updateMainImage(e.target.files ? e.target.files[0] : null)}
        />

        <CustomTextArea
          label="Description"
          value={formData.description}
          placeholder="Enter blog description"
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="space-y-6">
        {formData.sections.map((section) => (
          <Card key={section.id} className="p-4">
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Section {section.order}
                </h3>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      sections: prev.sections.filter(
                        (s) => s.id !== section.id
                      ),
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <CustomInput
                label="Section Heading"
                value={section.heading}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    sections: prev.sections.map((s) =>
                      s.id === section.id ? { ...s, heading: e.target.value } : s
                    ),
                  }))
                }
              />

              <CustomFileUpload
                label="Section Image"
                onChange={(e) =>
                  updateSectionImage(section.id, e.target.files ? e.target.files[0] : null)
                }
              />

              <CustomTextArea
                label="Section Content"
                value={section.paragraph}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    sections: prev.sections.map((s) =>
                      s.id === section.id ? { ...s, paragraph: e.target.value } : s
                    ),
                  }))
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button type="button" onClick={addSection}>
          Add Section
        </Button>
        <Button type="submit">Save Blog Post</Button>
      </div>
    </form>
  );
}
