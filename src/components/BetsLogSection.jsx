import React, { useState } from 'react';
// Match the exact file name, including case
import MyBets from './MyBets';

export default function UsersBetLayout({ betsData }) {
  const [activeTab, setActiveTab] = useState("my"); // renamed setter for clarity

  return (
    <div className="py-5 flex flex-col gap-3 my-5 w-full container bg-[#272726] mx-auto rounded-lg">
      <div className="w-fit p-1 flex gap-2 bg-[var(--grey-700)] rounded-lg px-3">
        <button
          onClick={() => setActiveTab("my")}
          className={`${activeTab === "my"
              ? "bg-[#77796a] text-white scale-100"
              : " text-[var(--grey-200)] hover:bg-[var(--grey-600)]"
            } p-3 px-6 rounded-lg transition-all duration-200 font-medium`}
        >
          Winners
        </button>
      </div>

      {/* Render the appropriate table based on active tab */}
      {activeTab === "my" && <MyBets betsData={betsData} />}
    </div>
  );
}
