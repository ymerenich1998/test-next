"use client";

import { useState, useRef, useEffect } from "react";

export default function CollapseList({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={`${index}-${item.title}`} style={{ marginBottom: "1rem" }}>
          <button
            type="button"
            className="flex gap-2 items-center"
            onClick={() => toggleItem(index)}
          >
            {item.title}
            <span
              className={`transition-transform duration-300 ease-in-out ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              {"▼"}
            </span>
          </button>
          <div
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              maxHeight: openIndex === index 
                ? `${contentRefs.current[index]?.scrollHeight}px` 
                : "0px",
              opacity: openIndex === index ? 1 : 0,
            }}
          >
            <div className="pt-2">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}