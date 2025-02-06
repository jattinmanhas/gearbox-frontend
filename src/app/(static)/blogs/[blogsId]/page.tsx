import { getSingleBlogPost } from "@/lib/blog";
import Image from "next/image";

const BlogPage = async ({ params }: { params: { blogsId: string } }) => {
  console.log(params.blogsId);
  const blogData = await getSingleBlogPost(params.blogsId);
  let blog = blogData.data!;

  if (blogData.status != 200 || blogData.data == null) {
    return (
      <div>
        <h1>Blog Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {/* Blog Metadata */}
      <div className="flex items-center text-gray-300 text-sm mb-6">
        <p className="mr-4">Author: {blog.author.fullname}</p>
        <p className="mr-4">Category: {blog.category?.name}</p>
        <p>
          Published on: {new Date(String(blog.createdAt)).toLocaleDateString()}
        </p>
      </div>

      {/* Main Image */}
      {blog.mainImageSignedUrl && (
        <div className="mb-6">
          <Image
            src={blog.mainImageSignedUrl}
            alt="Main Blog Image"
            width={800}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      )}

      {/* Blog Description */}
      <p dangerouslySetInnerHTML={{__html: blog.description}} className="text-lg text-gray-200 mb-8" />

      {/* Blog Sections */}

      {blog.sections.length >= 1 &&
        blog.sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
            {section.image && section.image.signedUrl && (
              <div className="mb-4">
                <Image
                  src={section.image.signedUrl}
                  alt={section.image.imageName || "Blog Section Image"}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            )}
            <p className="text-gray-200 mb-3" dangerouslySetInnerHTML={{__html: section.paragraph}} />
          </div>
        ))}
    </div>
  );
};

export default BlogPage;
