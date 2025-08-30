import React from "react";

// ---------- Icons ----------
const FlameIcon = () => (
  <svg
    height="32"
    width="32"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="box-border m-0 overflow-hidden max-w-full h-auto w-full text-black fill-black"
  >
    <g
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      className="box-border m-0"
    >
      <path d="M7.885 9.176A3.98 3.98 0 0 0 5 13m2.885-3.824c1.97-.563 6.142-.925 6.942-3.169M7.885 9.176C7.885 5 12 6 12 2c2.047 0 3.503 2.11 2.827 4.007m0 0c1.627-.14 2.717 1.731 1.858 3.071m0 0c-.274.427-.724.775-1.185 1.041m1.185-1.04C18.642 9.534 19 11.293 19 13" />
      <path d="M16 14.949c0-2.599 4-2.599 4 0c0 1.362-.755 2.529-1.342 3.71c-.806 1.626-1.21 2.438-1.935 2.89S15.096 22 13.292 22h-2.584c-1.804 0-2.706 0-3.431-.451c-.725-.452-1.128-1.264-1.935-2.89C4.755 17.478 4 16.311 4 14.949c0-2.599 4-2.599 4 0c0-2.599 4-2.599 4 0c0-2.599 4-2.599 4 0" />
    </g>
  </svg>
);

const ChefIcon = () => (
  <svg
    height="32"
    width="32"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="box-border m-0 overflow-hidden max-w-full h-auto w-full text-black fill-black"
  >
    <path
      color="currentColor"
      d="M15.398 4.41A3.601 3.601 0 0 1 21 7.405A3.6 3.6 0 0 1 17.625 11H17m-1.602-6.59a3.602 3.602 0 0 0-6.796 0m6.796 0a3.6 3.6 0 0 1 .089 2.093m-5.769-.9A3.6 3.6 0 0 0 8.602 4.41m0 0A3.601 3.601 0 0 0 3 7.405A3.6 3.6 0 0 0 6.375 11H7m10 3v-4M7 14v-4m11 4.5c-1.599-.622-3.7-1-6-1s-4.4.378-6 1M17 17a5 5 0 0 1-10 0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const HandIcon = () => (
  <svg
    height="32"
    width="32"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="box-border m-0 overflow-hidden max-w-full h-auto w-full text-black fill-black"
  >
    <path
      color="currentColor"
      d="M10.605 9.028L6.203 4.616a1.53 1.53 0 0 1 .012-2.162a1.523 1.523 0 0 1 2.157-.012l7.786 7.725c2.658 2.664 4.19 6.156 1.223 9.764l-.316.317a5.96 5.96 0 0 1-8.44 0l-3.188-3.15c-.593-.593-.58-1.568.027-2.177c.575-.577 1.48-.618 2.077-.115m3.064-5.778l2.51 2.514m-2.51-2.514c-.593-.594-1.59-.58-2.2.031c-.611.612-.625 1.589-.033 2.182l.728.73m0 0l1.784 1.787M9.1 11.971c-.592-.594-1.542-.566-2.152.045s-.625 1.588-.032 2.182l.625.608m0 0l1.13 1.1m-1.13-1.1q.05.042.095.088m4.5-8.717c.168-1.537 1.988-3.13 4.26-2.039c.216.104.387.3.39.54c.002.386-.167.863-.711 1.18c-.778.452-2.051 2.18-.351 3.885"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

// ---------- Styled List ----------
const StyledList = ({ children }: any) => (
  <ol className="list-[circle] pl-6 text-lg text-left marker:text-black marker:font-normal marker:tabular-nums">
    {children}
  </ol>
);

// ---------- Card ----------
const AboutCard = ({ icon, title, children, position = "left" }: any) => {
  const colStart = position === "left" ? "col-start-1" : "col-start-3";

  return (
    <li
      className={`col-span-10 ${colStart} w-max bg-stone-100 rounded-3xl overflow-hidden transition-all duration-300 outline outline-1 outline-dashed outline-black text-black grid grid-cols-[1fr_3fr] w-full shadow-lg`}
      style={{ outlineOffset: "calc(-0.5rem)" }}
    >
      <div className="p-6 bg-stone-200 flex items-center justify-center">
        {icon}
      </div>
      <div className="p-6 gap-4 flex flex-col">
        <h2 className="text-xl">{title}</h2>
        {children}
      </div>
    </li>
  );
};

// ---------- Main ----------
export default function About() {
  return (
    <div className="flex flex-col gap-12">
      <ul className="grid grid-cols-12 auto-rows-auto gap-12 p-0">
        <AboutCard
          icon={<FlameIcon />}
          title="What Will You Find on Recipes by Clare?"
          position="left"
        >
          <StyledList>
            <li>Time-tested family recipes that work every time</li>
            <li>Practical cooking tips from years of kitchen experience</li>
            <li>Personal stories behind favorite family dishes</li>
            <li>Kitchen wisdom for cooks of all skill levels</li>
          </StyledList>
        </AboutCard>

        <AboutCard icon={<ChefIcon />} title="Meet Clare" position="right">
          <StyledList>
            <li>A passionate home cook sharing tried-and-true recipes</li>
            <li>Creator of RecipesByClare.com</li>
            <li>Dedicated to making cooking accessible and enjoyable</li>
            <li>Bringing families together through shared meals</li>
          </StyledList>
        </AboutCard>

        <AboutCard icon={<HandIcon />} title="My Mission" position="left">
          <StyledList>
            <li>Help you feel confident in your kitchen</li>
            <li>Share reliable, delicious recipes for every occasion</li>
            <li>Create joyful cooking experiences</li>
            <li>Build a community of happy home cooks</li>
          </StyledList>
        </AboutCard>
      </ul>
    </div>
  );
}
