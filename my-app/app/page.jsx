'use client'; // useState要在client component才能用
import Image from 'next/image';
import Style from './styles/page.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { ST } from 'next/dist/shared/lib/utils';
import myData from './typedata.json' assert { type: 'json' };
import company from './company.json' assert { type: 'json' };

// create a new company list which can be used in company selection area
// all product list
var productList = [].concat(
  myData[Object.keys(myData)[0]],
  myData[Object.keys(myData)[1]],
  myData[Object.keys(myData)[2]]
);
// new catagory list
var companysByProducts = productList.map((item, i) => ({
  tag: item,
  companies: company
    .filter((com) => com.products.includes(item))
    .map((item, i) => {
      return { name: item.name, products: item.products };
    }),
  selected: false,
  companies_selected: Array(company.filter((com) => com.products.includes(item)).length).fill(false)
}));
console.log(companysByProducts);

// sidebar controling
const Sidebar = ({ isSidebarOpen, selectedTags, setSelectedTags }) => {
  // State to keep track of sidebar open/close

  const [isGroupOpen, setIsGroupOpen] = useState(Array(Object.keys(myData).length).fill(false));
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
      setInputText(event.target.value);
    }
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

  // handle checkbox
  const [isChecked, setIsChecked] = useState(companysByProducts.map((data) => data.companies_selected));
  const handleCheckList = (e, indexOfProductArea, indexOfEachCom) => {
    if (
      companysByProducts.filter((data, index) => {
        return index != indexOfProductArea && data.selected == true;
      }).length > 0
    ) {
      // 如果有兩個重複的product area都有被選取，要跳alert
      alert('不能同時選取多種產品類別，請重新選擇！');
    } else {
      const newIsChecked = isChecked.slice(); //create a new var and copy
      newIsChecked[indexOfProductArea][indexOfEachCom] = !isChecked[indexOfProductArea][indexOfEachCom];
      setIsChecked(newIsChecked);
      // 如果該區的check裡面有true的話，把該區的selected改成true
      isChecked[indexOfProductArea].includes(true)
        ? (companysByProducts[indexOfProductArea].selected = true)
        : (companysByProducts[indexOfProductArea].selected = false);
    }
  };

  // add or remove all comparing products
  const [isRemove, setRemove] = useState(Array(companysByProducts.length).fill(false));
  const handleRmBtn = (indexOfProductArea) => {
    if (
      companysByProducts.filter((data, index) => {
        return index != indexOfProductArea && data.selected == true;
      }).length > 0
    ) {
      // 如果有兩個重複的product area都有被選取，要跳alert
      alert('不能同時選取多種產品類別，！請重新選擇！');
    } else {
      const newIsRemove = isRemove.slice();
      newIsRemove[indexOfProductArea] = !isRemove[indexOfProductArea];
      setRemove(newIsRemove);
      if (!isRemove[indexOfProductArea]) {
        isChecked[indexOfProductArea] = isChecked[indexOfProductArea].fill(true);
        companysByProducts[indexOfProductArea].selected = true;
      } else {
        isChecked[indexOfProductArea] = isChecked[indexOfProductArea].fill(false);
        companysByProducts[indexOfProductArea].selected = false;
      }
    }
  };

  // make users not able to select two or more types of products

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
          <Link className={Style.delall} href={'#'} onClick={() => removeAllTags()}>
            Remove all
          </Link>
        </div>
      ) : (
        ''
      )}

      {/* tag 區域 */}

      <div className={Style.tagsAndsearch}>
        <div className={Style.taRight}>
          <div>
            <div className={`${Style['toggle-btn']} ${!isSidebarOpen ? Style.click : ''}`} onClick={toggleSidebar}>
              <Image
                className={`${Style.arrow} ${isSidebarOpen ? Style.close : ''}`}
                src="/right-arrow.png"
                alt="right-arrow"
                width={0}
                height={0}
                sizes="5vh"
                style={{ width: 'auto', height: 'auto' }}
              ></Image>
            </div>
          </div>
          <div className={Style.filterAmount}>{`Total : ${
            selectedTags == 0
              ? company.length
              : company.filter((cinfo) => cinfo.products.some((i) => selectedTags.includes(i))).length
          }`}</div>
          <div className={Style.selectAmount}>{`Selected : ${isChecked.reduce((pre, cur) => {
            if (cur) pre += 1;
            return pre;
          }, 0)}`}</div>
        </div>
        <div className={Style.searchBar}>
          <input
            className={Style.searchInput}
            value={inputText}
            // onChange={handleChange}
            onKeyUp={handleKeyPress}
            type="text"
            placeholder="Search..."
            name="search"
          ></input>
        </div>
      </div>
      {/* tag 區域 */}

      {/* company 區域 */}
      <div className={Style.companyArea}>
        <div className={Style.infoAreaTop}></div>
        <div className={Style.infoArea}>
          {companysByProducts
            .filter((data) => {
              return selectedTags.length > 0 ? selectedTags.includes(data.tag) : data;
            })
            .map((data, indexOfProductArea) => (
              <div className={Style.eachProductArea}>
                <div className={Style.tagNameNSelect}>
                  <div className={Style.eachProduct}>{data.tag}</div>
                  <div className={Style.selectComBtn}>
                    <Link
                      href={'#'}
                      className={`${!isRemove[indexOfProductArea] ? Style.allCheck : Style.removeCheck}`}
                      onClick={() => handleRmBtn(indexOfProductArea)}
                    >
                      {isRemove[indexOfProductArea] ? 'Clear All' : 'Select All'}
                    </Link>
                  </div>
                </div>
                <div className={Style.companiesByProduct}>
                  {data.companies.map((cInfo, i) => (
                    <div className={Style.companyBox} key={i}>
                      <div className={Style.coInfoArea}>
                        <div className={Style.selectCo}>
                          <input
                            type="checkbox"
                            name="checkbox"
                            className={isChecked[indexOfProductArea][i] ? Style.checked : ''}
                            onChange={(e) => handleCheckList(e, indexOfProductArea, i)}
                          />
                        </div>
                        <div className={Style.cLogoName}>
                          <Link href={`/pages/company/${cInfo.name}`} key={i}>
                            {
                              <Image
                                src={`/${cInfo.name + '_logo'}.png`}
                                width={0}
                                height={0}
                                sizes="6vh"
                                style={{ width: 'auto', height: 'auto', borderRadius: '1vh' }}
                                alt={cInfo.name}
                              ></Image>
                            }
                          </Link>
                          <Link href={`/pages/company/${cInfo.name}`} className={Style.cName}>
                            {cInfo.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className={Style.infoAreaTop}>
          <div className={Style.compareComBtn}>
            <Link href={'#'} className={Style.compare} onClick={() => console.log(isChecked)}>
              Let's go
            </Link>
          </div>
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
