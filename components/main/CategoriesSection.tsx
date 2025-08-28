import React from "react";
import { categories } from "../../data/categories";

interface CategoriesSectionProps {
  className?: string;
}

export default function CategoriesSection({
  className,
}: CategoriesSectionProps) {
  return (
    <section className={`box-border my-[51.2px] ${className || ""}`}>
      <div className="relative box-border max-w-full w-full mx-auto px-4">
        <div className="box-border gap-x-[51.2px] flex flex-col gap-y-[51.2px]">
          <div className="items-center box-border flex justify-between uppercase">
            <h2 className="text-neutral-900 text-[24.96px] font-bold items-center box-border flex basis-[0%] grow leading-[29.952px] md:text-[36.48px] md:leading-[43.776px] after:accent-auto after:bg-zinc-200 after:box-border after:text-neutral-900 after:block after:basis-[0%] after:grow after:text-[24.96px] after:not-italic after:normal-nums after:font-bold after:h-1.5 after:tracking-[normal] after:leading-[29.952px] after:list-outside after:list-disc after:min-w-4 after:outline-dashed after:outline-1 after:text-start after:indent-[0px] after:uppercase after:visible after:w-full after:ml-4 after:rounded-lg after:border-separate after:font-system_ui after:md:text-[36.48px] after:md:leading-[43.776px]">
              Best Categories
            </h2>
            <a
              href="/categories"
              title="All categories"
              className="text-white text-[13.44px] font-bold items-center bg-neutral-900 box-border flex leading-[21.504px] ml-4 my-4 p-2 rounded-[50%] md:text-[17.28px] md:leading-[27.648px]"
            >
              <img
                src="https://c.animaapp.com/mer35j4wJPAxku/assets/icon-22.svg"
                alt="Icon"
                className="box-border shrink-0 h-[19.2px] w-[19.2px]"
              />
            </a>
          </div>

          <div className="box-border">
            <div className="box-border h-auto w-auto md:h-0 md:w-0">
              <div className="box-border">
                <div className="relative box-border table mx-auto">
                  <div className="items-center gap-x-2.5 flex justify-center min-h-[100px] gap-y-2.5 w-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="box-border gap-x-[25.6px] grid grid-cols-[1fr] gap-y-[25.6px] md:grid-cols-[repeat(3,1fr)]">
            {categories.map((category) => (
              <div key={category.id} className="box-border">
                <a
                  href={category.href}
                  title={category.title}
                  className="relative text-blue-700 box-border block h-40 overflow-hidden rounded-xl"
                >
                  <img
                    alt={category.alt}
                    src={category.imageSrc}
                    sizes={category.sizes}
                    className={category.imageClassName}
                  />
                  <span className="absolute text-black text-[21.12px] font-black box-border block leading-[33.792px] left-4 bottom-0 md:text-[26.88px] md:leading-[43.008px]">
                    {category.name}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
