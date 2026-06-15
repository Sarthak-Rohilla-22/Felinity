import React from "react";

function PageContainer({ children, heading, subHeading }) {
  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl tracking-wide text-taupe-700 font-extrabold">
            {heading}
          </h1>
          <p className="font-cute text-lg mt-4 max-w-xl mx-auto text-taupe-600">
            {subHeading}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
