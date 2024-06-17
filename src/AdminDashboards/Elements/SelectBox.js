import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export default function SelectBox({ options, setSelcted, initialValue }) {
  const [selectedOption, setSelectedOption] = useState(null);

 
  useEffect(() => {
    if (options.length > 0 && initialValue) {
      const initialOption = options.find(option => option.value === initialValue);
      if (initialOption) {
        setSelectedOption(initialOption);
        setSelcted(initialOption); 
      }
    }
  }, [initialValue, options, setSelectedOption, setSelcted]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelcted(selectedOption);
  };

  return (
    <Select
      className='borderColor-yellow'
      value={selectedOption}
      onChange={handleChange}
      options={options}
    />
  );
}


// import React, { useState } from 'react';
// import Select from 'react-select';

// export default function SelectBox({ options,setSelcted }) {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleChange = (selectedOption) => {
//     setSelectedOption(selectedOption);
//     setSelcted(selectedOption)
//     console.log('Option selected:', selectedOption);
//   };

//   return (
//     <Select
//       className='borderColor-yellow'
//       value={selectedOption}
//       onChange={handleChange}
//       options={options}
//     />
//   );
// }
