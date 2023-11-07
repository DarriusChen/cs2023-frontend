'use client';
import React, { useState, useEffect } from 'react';
import Style from '@/app/styles/page.module.css'
import Link from 'next/link';
import Image from 'next/image';

// sidebar controling
const Sidebar = ({ isSidebarOpen, selectedTags, setSelectedTags, productData }) => {
    // const [pdata, setPData] = useState([])
    // State to keep track of sidebar open/close
  
    const [isGroupOpen, setIsGroupOpen] = useState(Array(Object.keys(productData).length).fill(false));
    function handleClickGroup(i) {
      const newIsGroupOpen = isGroupOpen.slice(); //create a new var and copy
      newIsGroupOpen[i] = !isGroupOpen[i];
      setIsGroupOpen(newIsGroupOpen);
    }
  
    // handle tag click
    const handleTagClick = (tag) => {
      if (!selectedTags.includes(tag)) {
        setSelectedTags([...selectedTags, tag]);
      }
    };
  
    return (
      <div className={`${Style.sidebar} ${isSidebarOpen ? Style.open : ''}`}>
        {/* Button to toggle sidebar */}
  
        {isSidebarOpen && (
          <div className={`${Style['sidebar-content']}`}>
            {/* filter options go here */}
            <div className={Style.sidebarTitle}>Select Products</div>
            <hr className={Style.sidebarLine}></hr>
            <div className={Style.productsContainer}>
              <div className={Style.addTags}></div>
              {productData.map(function (group, i) {
                return (
                  <div className={Style.pp} key={i}>
                    {/* sub options link */}
                    <div className={Style.dropdown}>
                      <Link
                        href="#"
                        className={Style.filterGroups}
                        onClick={() => {
                          handleClickGroup(i);
                        }} // () => 寫法防止unlimited rerender
                        id={Object.keys(productData[i])[0]}
                      >
                        {Object.keys(productData[i])[0]}
                        <Image
                          className={Style.dropdownArrow}
                          src="/arrow_dropdown.svg"
                          width={25}
                          height={30}
                          alt="dropdown"
                        ></Image>
                      </Link>
                    </div>
                    <div
                      id={Object.keys(productData[i])[0]}
                      className={`${Style.product} ${isGroupOpen[i] ? Style.pOpen : ''}`}
                    >
                      {Object.values(productData[i])[0].map(function (item, i) {
                        return (
                          <Link
                            key={i}
                            className={Style.item}
                            href="#"
                            onClick={() => {
                              handleTagClick(item);
                            }}
                          >
                           ⦿ {item}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Sidebar