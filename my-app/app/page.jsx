'use client'; // useState要在client component才能用
import Image from 'next/image';
import Style from './styles/page.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { ST } from 'next/dist/shared/lib/utils';
import myData from './typedata.json' assert { type: 'json' };
import company from './company.json' assert { type: 'json' };

// sidebar controling
const Sidebar = ({ isSidebarOpen, selectedTags, setSelectedTags }) => {
  // State to keep track of sidebar open/close

  const [isGroupOpen, setIsGroupOpen] = useState(Array(Object.keys(myData).length).fill(false));
  function handleClickGroup(i) {
    // console.log(i)
    const newIsGroupOpen = isGroupOpen.slice(); //create a new var and copy
    newIsGroupOpen[i] = !isGroupOpen[i];
    setIsGroupOpen(newIsGroupOpen);
  }

  // handle tag click
  const handleTagClick = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    // setSbInputValue('');
  };

  return (
    <div className={`${Style.sidebar} ${isSidebarOpen ? Style.open : ''}`}>
      {/* Button to toggle sidebar */}

      {isSidebarOpen && (
        <div className={`${Style['sidebar-content']}`}>
          {/* filter options go here */}
          <div className={Style.sidebarTitle}>Select products</div>
          <hr className={Style.sidebarLine}></hr>
          <div className={Style.productsContainer}>
            <div className={Style.addTags}></div>
            {Object.keys(myData).map(function (groupName, i) {
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
                      id={groupName}
                    >
                      {groupName}
                      <Image
                        className={Style.dropdownArrow}
                        src="/arrow_dropdown.svg"
                        width={25}
                        height={30}
                        alt="dropdown"
                      ></Image>
                    </Link>
                  </div>

                  <div id={groupName} className={`${Style.product} ${isGroupOpen[i] ? Style.pOpen : ''}`}>
                    {myData[groupName].map(function (item, i) {
                      return (
                        <Link
                          key={i}
                          className={Style.item}
                          href="#"
                          onClick={() => {
                            handleTagClick(item);
                          }}
                        >
                          {item}
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

function MainProducts({ isSidebarOpen, setIsSidebarOpen, selectedTags, setSelectedTags }) {
  //handle searchbar
  const [inputText, setInputText] = useState('');

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      alert(inputText);
    }
  }
  function handleChange(event) {
    setInputText(event.target.value);
  }

  //handle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // remove tag
  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };
  //remove all tags
  const removeAllTags = () => {
    setSelectedTags([]);
  };

  return (
    <div className={Style.mainRight}>
      {selectedTags.length != 0 ? (
        <div className={Style.setags}>
          <div className={Style.tagDisplay}>
            {selectedTags.map((tag, index) => (
              <div key={index} className={Style.tag}>
                <div className={Style.tagtext}>{tag}</div>
                <button className={Style.deltag} onClick={() => handleRemoveTag(tag)}>
                  X
                </button>
              </div>
            ))}
          </div>
          <Link className={Style.delall} href={'#'} onClick={removeAllTags}>
            Remove all
          </Link>
        </div>
      ) : (
        ''
      )}
      <div className={Style.tagsAndsearch}>
        <div className={Style.taRight}>
          <div>
            <div className={`${Style['toggle-btn']} ${!isSidebarOpen ? Style.click : ''}`} onClick={toggleSidebar}>
              <Image
                className={`${Style.arrow} ${isSidebarOpen ? Style.close : ''}`}
                src="/right-arrow.png"
                alt="right-arrow"
                width={30}
                height={47}
              ></Image>
            </div>
          </div>
          <div className={Style.filterAmount}>{`Total : ${company.length}`}</div>
        </div>
        <div className={Style.searchBar}>
          <input
            className={Style.searchInput}
            value={inputText}
            onChange={handleChange}
            onKeyUp={handleKeyPress}
            type="text"
            placeholder="Search..."
            name="search"
          ></input>
        </div>
      </div>
      <div className={Style.companyArea}>
        <div className={Style.infoArea}>
          {/* .reduce((cinfo)=> cinfo.products.filter(i=>selectedTags.includes(i))) */}
          {selectedTags.length > 0
            ? company
                .filter((cinfo) => cinfo.products.some((i) => selectedTags.includes(i)))
                .map(function (cInfo, i) {
                  return (
                    <Link className={Style.companyBox} href={`/pages/company/${cInfo.name}`} key={i}>
                      <div className={Style.cName} key={i}>
                        {/* {cInfo.name} */}
                        {<Image src={`/${cInfo.name}.png`} width={150} height={100} alt={cInfo.name}></Image>}
                      </div>
                    </Link>
                  );
                })

            // ? company
            //     .filter((cinfo)=> cinfo.name.includes(inputText)).

            : company.map(function (cInfo, i) {
                return (
                  <Link className={Style.companyBox} href={`/pages/company/${cInfo.name}`} key={i}>
                    <div className={Style.cName} key={i}>
                      {/* {cInfo.name} */}
                      {<Image src={`/${cInfo.name}.png`} width={150} height={100} alt={cInfo.name}></Image>}
                    </div>
                    {/* <div>
                      {cInfo.products.map(function())}
                    </div> */}
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  //handle tags display
  const [selectedTags, setSelectedTags] = useState([]); //還沒被選取

  return (
    <main className={Style.main}>
      <div className={Style.mainContent}>
        <Sidebar isSidebarOpen={isSidebarOpen} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <MainProducts
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>
    </main>
  );
}
