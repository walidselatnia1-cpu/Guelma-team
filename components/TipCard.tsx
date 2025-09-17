export const TipCard: React.FC<any> = ({ title, items, after }) => {
  return (
    <>
      <div className="container border-8 border-solid border-black/16 rounded-lg">
        <div className="bg-[var(--mo-article-note)] p-6 border border-dashed border-gray-900">
          <div className="flex items-center space-x-1">
            <svg className="h-8 w-8 text-black" aria-hidden="true">
              <use href="/symbols-v4.svg#note" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 left-0">{title}</h2>
          </div>
          <div className="px-4 pt-2 w-full">
            <ul className="w-full">
              {items?.map((item: any, index: any) => (
                <li
                  key={index}
                  className="mb-0 text-[19.2px] text-[#0f2118] leading-relaxed article__wrapper list-disc marker:text-xl marker:text-gray-600 leading-relaxed marker:text-center w-full"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {after && <p className="p-6 pl-0 text-black leading-relaxed">{after}</p>}
    </>
  );
};
