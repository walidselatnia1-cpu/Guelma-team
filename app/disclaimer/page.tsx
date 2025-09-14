export const dynamic = "force-static";

import Disclaimer from "@/components/main/Disclaimer";

export default async function DisclaimerPage({}) {
  return (
    <>
      <div className="pl-2 pr-4 py-8  xl mx-auto">
        <Disclaimer />
      </div>
    </>
  );
}
