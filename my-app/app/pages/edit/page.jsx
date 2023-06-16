'use client'

import React, { useState } from 'react';

const TagSelector = () => {
const myArray = ["one", "two", "three", "four", "five"]
const s1 = [["two", "seven"]]
const s2 = ["zero", "ten"]

let result1 = s1.filter(ele=>ele.filter(i => myArray.includes(i)))
// result1 = true

let result2 = s2.some(i => myArray.includes(i))
  console.log(result1)
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleTagClick = (tag) => {
    setSelectedTags([...selectedTags, tag]);
    setInputValue('');
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleTagClick(inputValue.trim());
    }
  };

  return (
    <div>
      <div>
        {selectedTags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <button onClick={() => handleRemoveTag(tag)}>X</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyPress}
        placeholder="Type and press Enter to add tags"
      />
    </div>
  );
};

export default TagSelector;
