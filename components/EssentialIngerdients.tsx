import { hasHtmlTags, renderSafeHtml } from "@/lib/utils";

export default function EssentialIngredients({
  essIngredientGuide,
}: {
  essIngredientGuide: any;
}) {
  return (
    <div>
      <h2
        className="
                          relative flex items-center
                          before:content-[''] before:rounded-2xl
                          before:w-[0.7rem] before:min-w-[0.7rem]
                          before:me-[0.7rem] before:bg-[var(--mo-article-any)]
                          before:self-stretch
                          text-[calc(var(--mo-font-size)*1.3)]
                          leading-[1.2]
                          font-bold
                          text-[1.5rem]
                          m-4
                          ml-0

                        "
      >
        Essential Ingredient Guide
      </h2>

      <div className="px-12 pt-2 ">
        <ul>
          {essIngredientGuide.map((item: any, index: any) => (
            <li
              key={index}
              className="mb-0 text-[19.2px] text-[#0f2118]   leading-relaxed article__wrapper list-disc marker:text-xl marker:text-gray-600 text-[#0f2118] leading-relaxed marker:text-center "
            >
              <span>
                {hasHtmlTags(item.ingredient) ? (
                  <span
                    dangerouslySetInnerHTML={renderSafeHtml(item.ingredient)}
                  />
                ) : (
                  <strong>{item.ingredient}:</strong>
                )}
              </span>{" "}
              {hasHtmlTags(item.note) ? (
                <span dangerouslySetInnerHTML={renderSafeHtml(item.note)} />
              ) : (
                item.note
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
