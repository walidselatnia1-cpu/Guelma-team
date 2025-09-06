import { TipCard } from "./TipCard";

export default function CompleteCookingProcess({
  completeProcess,
}: {
  completeProcess: any;
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
        Complete Cooking Process
      </h2>

      <div className=" pt-2 space-y-6">
        <ul className="space-y-4">
          {completeProcess.map((step: any, index: number) => {
            // Handle Card-type items separately
            if (step.type === "Card") {
              return (
                <TipCard
                  title={step.title}
                  items={step.items}
                  after={step.after}
                />
              );
            }

            // Handle normal process items
            return (
              <div className="block">
                <span
                  className="font-sans font-bold text-xl"
                  style={{
                    fontFamily: "system-ui",
                    fontWeight: "var(--font-weight-extrabold)",
                  }}
                >
                  {step.title ?? step.section}:
                </span>{" "}
                <p className=" text-gray-700 leading-relaxed block">
                  {step.description}
                </p>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
