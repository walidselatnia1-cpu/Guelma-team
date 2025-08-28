export const TipCard: React.FC<any> = ({ title, items, after }) => {
  return (
    <>
      <div className="container border-8 border-solid border-black/16 rounded-lg">
        <div className="bg-[var(--mo-article-note)] p-6 border border-dashed border-gray-900">
          <div className="flex items-center space-x-1 ">
            <svg className="h-8 w-8 text-black" aria-hidden="true">
              <use href="/symbols-v4.svg#note" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          <div className="px-12 pt-2 ">
            <ul>
              {items?.map((item: any, index: any) => (
                <li
                  key={index}
                  className="mb-0 text-[19.2px] text-[#0f2118]   leading-relaxed article__wrapper list-disc marker:text-xl marker:text-gray-600 text-[#0f2118] leading-relaxed marker:text-center "
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {after && (
        <p className="p-6 pl-0 text-gray-700 leading-relaxed">{after}</p>
      )}
    </>
  );
};
