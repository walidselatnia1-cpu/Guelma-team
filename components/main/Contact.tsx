import React from "react";
import Icon from "@/components/Icon";

// Contact Card Component
const ContactCard = ({ title, description, email }: any) => {
  return (
    <div className="bg-stone-100 box-border border border-dashed border-black rounded-[40px] overflow-hidden p-6 shadow-lg">
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-[2.28rem] font-bold text-black">{title}</h2>
        <p className="text-lg text-black">{description}</p>
        <ul className="flex flex-col gap-2 list-none p-0 break-words">
          <li>
            <strong className="inline-flex items-center gap-1.5 text-[#394840] font-semibold">
              <Icon name="email" size={16} className="text-gray-600" />
              Email
            </strong>
            <br />
            {email}
          </li>
        </ul>
      </div>
    </div>
  );
};

// Main Component
export default function Contact() {
  const contacts = [
    {
      title: "Advertisement",
      description:
        "Looking to collaborate with Recipes By Clare? We’d love to hear from you! Reach out to discover exciting opportunities to showcase your brand through our recipes, articles, and more.",
      email: "ads@recipesbyclare.com",
    },
    {
      title: "Privacy Policy",
      description:
        "Have questions about how we handle your personal data or our privacy practices? Contact us to learn more about our commitment to protecting your privacy. We’re here to help.",
      email: "legal@recipesbyclare.com",
    },
    {
      title: "Recipes",
      description:
        "Curious about a recipe or need inspiration for your next meal? Whether it’s a special dish or new ideas you’re after, Recipes By Clare is here to guide you. Send us a message and let’s talk cooking!",
      email: "contact@recipesbyclare.com",
    },
  ];

  return (
    <div className="container mx-auto px-4 max-w-[1200px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contacts.map((contact) => (
          <ContactCard key={contact.email} {...contact} />
        ))}
      </div>
    </div>
  );
}
