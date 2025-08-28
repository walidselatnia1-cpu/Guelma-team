import React from "react";
import { trendingRecipes } from "../../data/trending";

interface TrendingSectionProps {
  className?: string;
}

export default function TrendingSection({ className }: TrendingSectionProps) {
  return (
    <section className={`box-border my-[51.2px] ${className || ""}`}>
      <div className="relative box-border max-w-full w-full mx-auto px-4">
        <div className="box-border gap-x-[51.2px] flex flex-col gap-y-[51.2px]">
          <div className="items-center box-border flex justify-between uppercase">
            <h2 className="text-neutral-900 text-[24.96px] font-bold items-center box-border flex basis-[0%] grow leading-[29.952px] md:text-[36.48px] md:leading-[43.776px] after:accent-auto after:bg-zinc-200 after:box-border after:text-neutral-900 after:block after:basis-[0%] after:grow after:text-[24.96px] after:not-italic after:normal-nums after:font-bold after:h-1.5 after:tracking-[normal] after:leading-[29.952px] after:list-outside after:list-disc after:min-w-4 after:outline-dashed after:outline-1 after:text-start after:indent-[0px] after:uppercase after:visible after:w-full after:ml-4 after:rounded-lg after:border-separate after:font-system_ui after:md:text-[36.48px] after:md:leading-[43.776px]">
              Trending
            </h2>
          </div>

          <div className="box-border gap-x-[25.6px] grid grid-cols-[repeat(2,1fr)] gap-y-[25.6px] md:grid-cols-[repeat(6,1fr)]">
            {trendingRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="items-center box-border gap-x-2 flex flex-col col-start-[span_1] gap-y-2 text-center overflow-hidden"
              >
                <a
                  href={recipe.href}
                  title={recipe.title}
                  className="text-blue-700 bg-stone-100 box-border block h-[300px] w-full overflow-hidden rounded-[14px]"
                >
                  <img
                    alt={recipe.alt}
                    src={recipe.imageSrc}
                    sizes={recipe.sizes}
                    className="aspect-[auto_1024_/_1024] bg-stone-100 box-border h-full max-w-full object-cover w-full"
                  />
                </a>

                <a
                  href={recipe.href}
                  title={recipe.title}
                  className="text-blue-700 box-border block"
                >
                  <strong className="text-black text-[15.36px] font-bold box-border block leading-[21.504px] md:text-[19.2px] md:leading-[26.88px]">
                    {recipe.name}
                  </strong>
                </a>
              </div>
            ))}
          </div>

          <div className="box-border">
            <div className="fixed box-border flex justify-center z-[16777271] bottom-0 inset-x-0">
              <div className="relative box-border table mx-auto">
                <div className="items-center box-border gap-x-[5px] flex justify-center gap-y-[5px] w-full">
                  <div className="items-center box-border gap-x-[5px] flex flex-col justify-center gap-y-[5px]">
                    <div className="box-border">
                      <div className="box-border h-0 w-80"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
