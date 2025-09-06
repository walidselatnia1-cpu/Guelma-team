import React from "react";

export default function Disclaimer() {
  return (
    <div className="w-full mx-auto">
      <div className="bg-stone-100 box-border border border-dashed border-black rounded-[40px] overflow-hidden py-8 pr-8 pl-4 shadow-lg mb-12">
        <div className="text-center mb-8">
          <h2 className="text-[2.28rem] font-bold text-black mb-4">Disclaimer</h2>
          <p className="text-lg text-black">
            Important disclaimers for using our food blog and recipes.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-black">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> January 2025
          </p>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4">General Information</h3>
            <p className="text-black mb-4">
              The information on Recipes by Clare is for general informational and educational 
              purposes only. We make no representations or warranties about the completeness, 
              accuracy, reliability, or suitability of the recipes and information.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4">Food Safety and Allergies</h3>
            <div className="bg-red-100 p-4 rounded-lg border border-red-300 mb-4">
              <p className="text-red-800 font-medium">
                <strong>Important:</strong> Always use your own judgment when preparing food 
                and follow proper food safety guidelines.
              </p>
            </div>
            <ul className="list-disc pl-6 text-black mb-4">
              <li>Check ingredient labels for allergen information</li>
              <li>Be aware of cross-contamination risks</li>
              <li>Ensure proper cooking temperatures</li>
              <li>If you have allergies, consult healthcare professionals</li>
              <li>We cannot guarantee recipes are allergen-free</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4">Nutritional Information</h3>
            <p className="text-black mb-4">
              Nutritional information is approximate and may vary based on:
            </p>
            <ul className="list-disc pl-6 text-black mb-4">
              <li>Specific brands and ingredient types</li>
              <li>Preparation methods</li>
              <li>Portion sizes</li>
              <li>Regional ingredient differences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4">Recipe Results</h3>
            <p className="text-black mb-4">
              Cooking results may vary based on:
            </p>
            <ul className="list-disc pl-6 text-black mb-4">
              <li>Individual cooking skills</li>
              <li>Kitchen equipment variations</li>
              <li>Ingredient quality and freshness</li>
              <li>Environmental factors (altitude, humidity)</li>
              <li>Personal taste preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4">Medical Advice</h3>
            <p className="text-black mb-4">
              Our content is not a substitute for professional medical advice. 
              Always consult your physician regarding dietary concerns or medical conditions.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4">Limitation of Liability</h3>
            <p className="text-black mb-4">
              Recipes by Clare shall not be liable for any damages arising from 
              the use of this website or the recipes contained herein.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4">Contact Us</h3>
            <p className="text-black">
              Questions about this disclaimer? Contact us through our contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
