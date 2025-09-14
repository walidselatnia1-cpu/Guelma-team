"use client";

import { useEffect } from "react";

interface CustomCodeSettings {
  header: {
    html: string[];
  };
}

export default function CustomCodeInjector() {
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        if (response.ok) {
          const settings: CustomCodeSettings = await response.json();
          const htmlStrings = settings.header.html || [];

          htmlStrings.forEach((htmlString) => {
            const temp = document.createElement("template");
            temp.innerHTML = htmlString.trim();

            // append each node inside <head>
            Array.from(temp.content.childNodes).forEach((node) => {
              document.head.appendChild(node);
            });
          });
        }
      } catch (error) {
        console.error("Error fetching custom code settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return null; // nothing rendered in React tree
}
