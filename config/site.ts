export const siteConfig = {
  name: "Recipes by Calama",
  domain: "flavorfable.com",
  url: "https://recipesbyclare.com",
  email: "hello@recipesbyclare.com",
  description: "Family-Friendly Recipes That Everyone Will Love",
  version: "V3.01",
  author: {
    name: "Clare",
    email: "clare@recipesbyclare.com",
  },
  social: {
    facebook: "https://web.facebook.com/profile.php?id=61555199463164",
    instagram: "https://www.pinterest.com/recipesbyclare",
    email: "mailto:hello@recipesbyclare.com",
  },
  copyright: {
    year: new Date().getFullYear(),
    text: "All rights reserved.",
  },
};

export const getCurrentYear = () => new Date().getFullYear();
export const getCopyrightText = () =>
  `${siteConfig.copyright.year} ${siteConfig.name}. ${siteConfig.copyright.text}`;
