import React from 'react';
const InfoComponent = ({ items }) => {
  // Determine how many rows are needed to display items in two columns
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <div className="p-2">
      {rows.map((rowItems, rowIndex) => (
        <div className="row align-items-center mb-3" key={rowIndex}>
          {rowItems.map((item, index) => (
            <div className="col d-flex flex-row align-items-center position-relative" key={index}>
              <p className="fw-bold mb-0 me-2">{item.label}:</p>
              <hr className="border border-dark mt-4 flex-grow-1" />
              <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">
                {item.value || ""}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InfoComponent;
