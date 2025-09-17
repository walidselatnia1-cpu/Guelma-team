import { Pin, Share2, Mail, Printer, ArrowDown } from "lucide-react";

export default function SocialShareButtons() {
  const handlePinIt = () => {
    const url = window.location.href;
    const media = "https://ext.same-assets.com/3912301781/917733602.jpeg";
    const description =
      "Crispy chicken and tender broccoli coated in a sweet and savory honey sesame sauce, ready in 30 minutes.";
    window.open(
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        url
      )}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(
        description
      )}`,
      "_blank"
    );
  };

  const handleShareIt = () => {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const handleSendIt = () => {
    const subject = "Honey Sesame Chicken and Broccoli";
    const body = window.location.href;
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`
    );
  };

  const handlePrintIt = () => {
    window.print();
  };

  const handleJumpToRecipe = () => {
    const recipeCard = document.getElementById("recipe-card");
    if (recipeCard) {
      recipeCard.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center text-sm">
      <button
        onClick={handlePinIt}
        className="inline-flex items-center gap-1.5 px-2 py-2 border-2 border-black bg-transparent rounded text-black font-bold transition-all duration-300 hover:bg-black hover:text-white cursor-pointer"
      >
        <Pin className="w-5 h-5 flex-shrink-0" />
        <span>Pin it</span>
      </button>

      <button
        onClick={handleShareIt}
        className="inline-flex items-center gap-1.5 px-2 py-2 border-2 border-black bg-transparent rounded text-black font-bold transition-all duration-300 hover:bg-black hover:text-white cursor-pointer"
      >
        <Share2 className="w-5 h-5 flex-shrink-0" />
        <span>Share it</span>
      </button>

      <button
        onClick={handleSendIt}
        className="inline-flex items-center gap-1.5 px-2 py-2 border-2 border-black bg-transparent rounded text-black font-bold transition-all duration-300 hover:bg-black hover:text-white cursor-pointer"
      >
        <Mail className="w-5 h-5 flex-shrink-0" />
        <span>Send it</span>
      </button>

      <button
        onClick={handlePrintIt}
        className="inline-flex items-center gap-1.5 px-2 py-2 border-2 border-black bg-transparent rounded text-black font-bold transition-all duration-300 hover:bg-black hover:text-white cursor-pointer"
      >
        <Printer className="w-5 h-5 flex-shrink-0" />
        <span>Print it</span>
      </button>

      <button
        onClick={handleJumpToRecipe}
        className="inline-flex items-center gap-1.5 px-2 py-2 border-2 border-black bg-transparent rounded text-black font-bold transition-all duration-300 hover:bg-black hover:text-white cursor-pointer"
        aria-label="Jump To Recipe"
      >
        <ArrowDown className="w-5 h-5 flex-shrink-0" />
        <span>Jump To Recipe</span>
      </button>
    </div>
  );
}
