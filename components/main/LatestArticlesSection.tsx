import React from "react";
import { latestArticles } from "../../data/articles";

interface LatestArticlesSectionProps {
  className?: string;
}

export default function LatestArticlesSection({
  className,
}: LatestArticlesSectionProps) {
  return (
    <section className={`box-border my-[51.2px] ${className || ""}`}>
      <div className="relative box-border max-w-full w-full mx-auto px-4">
        <div className="box-border gap-x-[51.2px] flex flex-col gap-y-[51.2px]">
          <div className="items-center box-border flex justify-between uppercase">
            <h2 className="text-neutral-900 text-[24.96px] font-bold items-center box-border flex basis-[0%] grow leading-[29.952px] md:text-[36.48px] md:leading-[43.776px] after:accent-auto after:bg-zinc-200 after:box-border after:text-neutral-900 after:block after:basis-[0%] after:grow after:text-[24.96px] after:not-italic after:normal-nums after:font-bold after:h-1.5 after:tracking-[normal] after:leading-[29.952px] after:list-outside after:list-disc after:min-w-4 after:outline-dashed after:outline-1 after:text-start after:indent-[0px] after:uppercase after:visible after:w-full after:ml-4 after:rounded-lg after:border-separate after:font-system_ui after:md:text-[36.48px] after:md:leading-[43.776px]">
              Latest Articles
            </h2>
            <a
              href="/articles"
              title="All Articles"
              className="text-white font-bold items-center bg-neutral-900 box-border flex ml-4 my-4 p-2 rounded-[50%]"
            >
              <img
                src="https://c.animaapp.com/mer35j4wJPAxku/assets/icon-22.svg"
                alt="Icon"
                className="box-border shrink-0 h-[19.2px] w-[19.2px]"
              />
            </a>
          </div>

          <div className="box-border gap-x-[25.6px] grid grid-cols-[1fr] gap-y-[25.6px] md:grid-cols-[repeat(4,1fr)]">
            {latestArticles.map((article) => (
              <div
                key={article.id}
                className="items-center box-border gap-x-2 flex flex-col col-start-[span_1] gap-y-2 text-center overflow-hidden"
              >
                <a
                  href={article.href}
                  title={article.title}
                  className="text-blue-700 bg-stone-100 box-border block h-[300px] w-full overflow-hidden rounded-[14px]"
                >
                  <img
                    alt={article.alt}
                    src={article.imageSrc}
                    sizes={article.sizes}
                    className={article.imageClassName}
                  />
                </a>

                <a
                  href={article.href}
                  title={article.title}
                  className="text-blue-700 box-border block"
                >
                  <strong className="text-black text-[15.36px] font-bold box-border block leading-[21.504px] md:text-[19.2px] md:leading-[26.88px]">
                    {article.name}
                  </strong>
                </a>

                <p className="text-[13.44px] box-border leading-[21.504px] md:text-[17.28px] md:leading-[27.648px]">
                  {article.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
