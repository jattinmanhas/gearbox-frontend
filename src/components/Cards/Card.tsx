import React from "react";
import {
  Star,
  ShoppingBag,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import AddtoCartButton from "../Buttons/AddtoCartButton";
import Link from "next/link";
import { ProductType } from "@/types/shop/shopTypes";

// Common interface for badge/tag styling
interface BadgeProps {
  text: string;
  variant?: "purple" | "blue" | "green" | "red" | "yellow";
}

const Badge: React.FC<BadgeProps> = ({ text, variant = "purple" }) => {
  const variants = {
    purple: "bg-purple-600/20 text-purple-400",
    blue: "bg-blue-600/20 text-blue-400",
    green: "bg-green-800 text-green-100",
    red: "bg-red-600/20 text-red-400",
    yellow: "bg-yellow-600/20 text-yellow-400",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-sm ${variants[variant]}`}>
      {text}
    </span>
  );
};

// Product Card Types
interface ProductRating {
  value: number;
  count: number;
}

interface ProductPrice {
  current: number;
  original?: number;
  currency?: string;
}

export interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  price: ProductPrice;
  rating?: ProductRating;
  tag?: string;
  tagVariant?: BadgeProps["variant"];
  isNew?: boolean;
  discount?: number;
  wholeProduct ? : ProductType;
  //   onAddToCart?: (id: string) => void;
  //   onClick?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  image,
  price,
  rating,
  tag,
  tagVariant = "green",
  isNew,
  discount,
  className = "",
  wholeProduct
}) => {
  const formatPrice = (amount: number, currency = price.currency || "$") =>
    `${currency}${amount.toFixed(2)}`;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm 
        transition-all hover:bg-gray-800/70 ${className}`}
      //   onClick={onClick}
    >
      {/* Tag or Badge */}
      {(tag || isNew || discount) && (
        <div className="absolute right-4 top-4 z-10">
          <Badge
            text={tag || (isNew ? "New Arrival" : `${discount}% OFF`)}
            variant={tagVariant}
          />
        </div>
      )}

      <div className="p-6">
        <Link href={`/shop/product/${id}`}>
          {/* Image */}
          {image && (
            <div className="mb-4 overflow-hidden rounded-xl">
              <img
                src={image}
                alt={name}
                className="h-48 w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
          )}
          {/* Content */}
          <div className="mb-2 text-sm text-purple-400">{category}</div>
          <h3 className="mb-2 text-xl font-bold text-white">{name}</h3>

          {/* Rating */}
          {rating && (
            <div className="mb-4 flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-white">{rating.value}</span>
              <span className="text-gray-400">({rating.count})</span>
            </div>
          )}
        </Link>
        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">
              {formatPrice(price.current)}
            </span>
            {price.original && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(price.original)}
              </span>
            )}
          </div>
          <AddtoCartButton product={wholeProduct!} />
        </div>
      </div>
    </div>
  );
};

export interface BlogPostCardProps {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  author?: {
    name: string;
    avatar?: string;
  };
  publishDate?: string;
  categoryVariant?: BadgeProps["variant"];
  //   onClick?: () => void;
  className?: string;
  featured?: boolean;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({
  id,
  title,
  category,
  readTime,
  image,
  excerpt,
  author,
  publishDate,
  categoryVariant = "green",
  //   onClick,
  className = "",
  featured = false,
}) => {
  const cardClass = featured
    ? "md:col-span-2 md:flex md:items-center md:gap-6"
    : "";

  // const imageClass = featured ? "md:h-64" : "h-48";

  return (
    <div
      className={`group overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm 
        transition-all hover:bg-gray-800/70 ${cardClass} ${className} p-4`}
      //   onClick={onClick}
    >
      <Link href={`/blogs/${id}`}>
        {/* Image */}
        {image && (
          <div className={`overflow-hidden`}>
            <img
              src={image}
              alt={title}
              className={`object-cover transition-transform rounded group-hover:scale-110 w-full h-full`}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-2 mt-2">
          <div className="mb-4 flex items-center justify-between">
            <Badge text={category} variant={categoryVariant} />
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="mr-1 h-4 w-4" />
              {readTime}
            </div>
          </div>

          <h3 className="mb-3 text-xl font-bold text-white group-hover:text-green-400">
            {title}
          </h3>

          <p className="mb-4 text-gray-400" dangerouslySetInnerHTML={{__html: excerpt}} />

          {/* Author and Date */}
          {(author || publishDate) && (
            <div className="mb-4 flex items-center space-x-4">
              {author && (
                <div className="flex items-center space-x-2">
                  {author.avatar && (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-300">{author.name}</span>
                </div>
              )}
              {publishDate && (
                <span className="text-sm text-gray-400">{publishDate}</span>
              )}
            </div>
          )}

          <button className="flex items-center text-green-400 group-hover:text-green-300">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </Link>
    </div>
  );
};
