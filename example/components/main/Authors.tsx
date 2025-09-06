import React from "react";
import Image from "next/image";

interface Author {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  recipes: number;
}

const authors: Author[] = [
  {
    id: 1,
    name: "Emily Chen",
    title: "Head Chef & Founder",
    bio: "With over 15 years of culinary experience, Emily specializes in fusion cuisine that brings together traditional flavors with modern techniques. She believes cooking should be accessible to everyone.",
    image: "/Auther 01.webp",
    recipes: 127
  },
  {
    id: 2,
    name: "Marco Rodriguez",
    title: "Mediterranean Cuisine Expert",
    bio: "Born in Valencia, Spain, Marco brings authentic Mediterranean flavors to your kitchen. His passion for fresh ingredients and simple preparations makes every dish memorable.",
    image: "/Auther 02.webp",
    recipes: 89
  },
  {
    id: 3,
    name: "Sarah Johnson",
    title: "Pastry & Dessert Specialist",
    bio: "A graduate of Le Cordon Bleu, Sarah creates stunning desserts that are both beautiful and delicious. Her step-by-step guides make baking accessible for home cooks.",
    image: "/Auther 03.webp",
    recipes: 94
  },
  {
    id: 4,
    name: "David Kim",
    title: "BBQ & Grilling Master",
    bio: "David's expertise in barbecue and grilling techniques has made him a favorite among outdoor cooking enthusiasts. He shares secrets for perfect smoked meats and grilled vegetables.",
    image: "/Auther 04.webp",
    recipes: 76
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "Nutritionist & Wellness Chef",
    bio: "Combining her background in nutrition with culinary arts, Lisa creates healthy recipes that don't compromise on taste. She's passionate about plant-based cooking and wellness.",
    image: "/Auther 05.webp",
    recipes: 103
  },
  {
    id: 6,
    name: "Antoine Dubois",
    title: "French Culinary Artist",
    bio: "Trained in Lyon, France, Antoine brings classical French techniques to modern home cooking. His elegant yet approachable recipes have won hearts worldwide.",
    image: "/Auther 06.webp",
    recipes: 112
  }
];

export default function Authors() {
  return (
    <div className="box-border w-full">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-[34.56px] font-black box-border leading-[41.472px] uppercase md:text-[51.84px] md:leading-[62.208px] text-black mb-6">
          Meet Our Culinary Team 👨‍🍳
        </h1>
        <p className="text-[16px] md:text-[18px] leading-[25.6px] md:leading-[28.8px] text-gray-700 max-w-3xl mx-auto">
          Our passionate team of chefs and culinary experts brings you the finest recipes from around the world. 
          Each author contributes their unique expertise and cultural background to create an amazing cooking experience.
        </p>
      </div>

    {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-25 mb-16 mt-25">
          {authors.map((author) => (
            <div
            key={author.id}
            className="relative border border-dashed border-black rounded-2xl bg-stone-100 p-6 pt-24 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2"
            >
            {/* Author Image - Positioned at top like sidebar */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 z-10">
              <div
                className="w-full h-full relative overflow-hidden rounded-full bg-white border border-dashed border-black"
                style={{
                  outline: "1px dashed black",
                  outlineOffset: "-4px",
                }}
              >
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover object-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.5,1.25,0.75,1.25)] hover:scale-105"
                  sizes="(max-width: 768px) 128px, 128px"
                />
              </div>
            </div>

            {/* Author Info */}
            <div className="text-center">
              <div className="mb-4">
                <h2 className="text-[24px] font-bold text-black mb-1">
                  {author.name}
                </h2>
                <p className="text-[14px] font-semibold text-orange-600 uppercase tracking-wide">
                  {author.title}
                </p>
              </div>

              <p className="text-[14px] leading-[22.4px] text-gray-700 mb-4">
                {author.bio}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center border border-dashed border-black rounded-2xl bg-stone-100 p-8">
        <h2 className="text-[28px] font-bold text-black mb-4">
          Want to Share Your Recipes?
        </h2>
        <p className="text-[16px] text-gray-700 mb-6 max-w-2xl mx-auto">
          Join our community of passionate cooks! We&apos;re always looking for talented individuals 
          who want to share their culinary expertise with food lovers around the world.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}
