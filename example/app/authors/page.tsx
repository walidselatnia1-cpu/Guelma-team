import Authors from "@/components/main/Authors";

export default function AuthorsPage() {
  return (
    <>
      <div className="pl-2 pr-4 py-8  xl mx-auto">
        <Authors />
      </div>
    </>
  );
}

export const metadata = {
  title: "Our Authors - Recipe Experts",
  description:
    "Meet our talented team of recipe authors and culinary experts who create delicious recipes for your family table.",
};
