"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Ban, Check, Trash2 } from "lucide-react";
import { updloadFileImageToS3 } from "./Apicalls";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import CategoryDropdown from "@/components/ShopComponents/CaregoryDropdown";
import { CategorySearch } from "@/components/Forms/productForm";
import { CreateNewBlog } from "@/lib/dashboard";
import SuccessMessage from "@/components/SuccessMessage";

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
        <h4 className="text-2xl">Create New Blog</h4>
        <hr></hr>

        <div className="space-y-2 my-4">
          <Label htmlFor="blogHeading">Blog Heading</Label>
          <Input
            id="blogHeading"
            value={formData.heading}
            placeholder="Blog Heading"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, heading: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2 my-4">
          <Label htmlFor="blogImage">Blog Image</Label>
          <div className="flex m-auto">
            <Input
              id="blogImage"
              type="file"
              name="file"
              placeholder="Blog Image"
              onChange={(e) =>
                updateMainImage(e.target.files ? e.target.files[0] : null)
              }
            />
            <Ban className="m-auto mx-2 text-red-600 hidden" />
            <Check className="m-auto mx-2 text-green-700 hidden" />
          </div>
        </div>

        <div className="space-y-2 my-4">
          <Label htmlFor="blogImage">Select Category</Label>
          <div className="flex m-auto">
            <CategoryDropdown selected={selected} setSelected={setSelected} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="blogDescription">Description</Label>
          <Textarea
            id="blogDescription"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Blog Description"
            rows={4}
          />
        </div>
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

              <div className="space-y-2">
                <Label htmlFor={`heading-${section.id}`}>Heading</Label>
                <Input
                  id={`heading-${section.id}`}
                  value={section.heading}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sections: prev.sections.map((s) =>
                        s.id === section.id
                          ? { ...s, heading: e.target.value }
                          : s
                      ),
                    }))
                  }
                  placeholder="Section Heading"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`image-${section.id}`}>Section Image</Label>
                <Input
                  id={`image-${section.id}`}
                  type="file"
                  onChange={(e) =>
                    updateSectionImage(
                      section.id,
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`paragraph-${section.id}`}>Paragraph</Label>
                <Textarea
                  id={`paragraph-${section.id}`}
                  value={section.paragraph}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sections: prev.sections.map((s) =>
                        s.id === section.id
                          ? { ...s, paragraph: e.target.value }
                          : s
                      ),
                    }))
                  }
                  placeholder="Section Content"
                  rows={4}
                />
              </div>
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
