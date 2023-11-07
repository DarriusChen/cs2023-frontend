'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Style from '@/app/styles/page.module.css';

export default function MainProducts({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedTags,
  setSelectedTags,
  company,
  companiesByProducts
}) {

  //handle searchbar
  const [inputText, setInputText] = useState('');

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      setInputText(event.target.value);
      alert(event.target.value);
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
  const [isChecked, setIsChecked] = useState([]);
  // Handle checkbox initialization
  const initializeCheckedState = (data) => {
    const checkedState = data.length > 0 ? data.map(() => Array(data[0].companies_selected.length).fill(false)) : [];
    return checkedState;
  };

  // Make sure that the state is only initialized once.
  useEffect(() => {
    const init = initializeCheckedState(companiesByProducts);
    setIsChecked(init);
  }, [companiesByProducts]);

  const handleCheckList = (e, indexOfProductArea, indexOfEachCom) => {
    if (
      companiesByProducts.filter((data, index) => {
        return index != indexOfProductArea && data.selected == true;
      }).length > 0
    ) {
      // 如果有兩個重複的product area都有被選取，要跳alert
      alert('不能同時選取多種產品類別，請重新選擇！');
    } else {
      const newIsChecked = [...isChecked]; //create a new var and copy
      newIsChecked[indexOfProductArea][indexOfEachCom] = !isChecked[indexOfProductArea][indexOfEachCom];
      companiesByProducts[indexOfProductArea].companies_selected[indexOfEachCom] =
        newIsChecked[indexOfProductArea][indexOfEachCom]; //改company_selected的值
      setIsChecked(newIsChecked);
      // 如果該區的check裡面有true的話，把該區的selected改成true
      isChecked[indexOfProductArea].includes(true)
        ? (companiesByProducts[indexOfProductArea].selected = true)
        : (companiesByProducts[indexOfProductArea].selected = false);
      // 建立compareArray
      if (companiesByProducts.filter((data) => data.selected == true).length != 0) {
        const trueCompanies = companiesByProducts.filter((data) => data.selected == true)[0];
        const product = trueCompanies.tag;
        const iscompare = trueCompanies.companies_selected;
        const compareArray = trueCompanies.companies
          .map((com, i) => {
            if (iscompare[i]) {
              return com.name;
            } else {
              return;
            }
          })
          .filter((data) => data); //filter存在的company
        setCompareLIst({ product: product, companies: compareArray });
        // 如果全部都被勾選->就把select all改成 remove all
        if (!companiesByProducts[indexOfProductArea].companies_selected.includes(false)){
          const newIsRemove = isRemove.slice();
          newIsRemove[indexOfProductArea] = !isRemove[indexOfProductArea];
          setRemove(newIsRemove);
        } else {
          setRemove([])
        }
      } else {
        setCompareLIst('');
        setRemove([]) //如果所有勾選都被清除，就要轉select all
      }
    }
    console.log(isChecked);
  };

  // add or remove all comparing products
  const [isRemove, setRemove] = useState([]);
  // const [isRemove, setRemove] = useState(Array(companiesByProducts.length).fill(false));

  const handleRmBtn = (indexOfProductArea) => {
    if (
      companiesByProducts.filter((data, index) => {
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
        companiesByProducts[indexOfProductArea].selected = true;
        companiesByProducts[indexOfProductArea].companies_selected = companiesByProducts[indexOfProductArea].companies_selected.fill(true);
        // handle selected amount
        const trueCompanies = companiesByProducts.filter((data) => data.selected == true)[0]; // 被勾選的公司資料
        const product = trueCompanies.tag; //被勾選的公司所屬產品類別
        const iscompare = trueCompanies.companies_selected; //該產品類別中被選擇公司的 trre/false array
        const compareArray = trueCompanies.companies
          .map((com, i) => {
            if (iscompare[i]) {
              return com.name;
            } else {
              return;
            }
          })
          .filter((data) => data); //filter存在的company
        setCompareLIst({ product: product, companies: compareArray });
      } else {
        isChecked[indexOfProductArea] = isChecked[indexOfProductArea].fill(false);
        companiesByProducts[indexOfProductArea].selected = false;
        companiesByProducts[indexOfProductArea].companies_selected = companiesByProducts[indexOfProductArea].companies_selected.fill(false);
        setCompareLIst(''); //selected amount 歸零
      }
    }
  };
  // Let's go button
  const router = useRouter();
  const [compareList, setCompareLIst] = useState('');
  const handleLetsGo = () => {
    if (compareList) {
      console.log(compareList);
      const query = compareList.companies.map((com, i) => i).join('@');
      router.push('/pages/compare?cid=' + query);
    } else if (compareList == '') {
      alert('Please select at least one company');
    }
  };
  console.log(compareList)
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
              : company.filter((cinfo) => cinfo.Products.some((i) => selectedTags.includes(i))).length
          }`}</div>
          <div className={Style.selectAmount}>
            Selected : {compareList ? compareList.companies.length : '0'}{' '}
            {compareList ? '(' + compareList.product + ')' : ''}
          </div>
        </div>
        <div className={Style.searchBar}>
          <input
            className={Style.searchInput}
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
          {companiesByProducts
            .filter((data) => {
              return selectedTags.length > 0 ? selectedTags.includes(data.tag) : data;
            })
            .map((data, indexOfProductArea) => (
              <div key={indexOfProductArea} className={Style.eachProductArea}>
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
                            className={
                              isChecked[indexOfProductArea] && isChecked[indexOfProductArea][i] ? Style.checked : ''
                            }
                            onChange={(e) => handleCheckList(e, indexOfProductArea, i)}
                          />
                        </div>
                        <div className={Style.cLogoName}>
                          <Link href={`/pages/company/${cInfo.id}`} key={i}>
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
                          <Link href={`/pages/company/${cInfo.id}`} className={Style.cName}>
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
            <button
              href={compareList == '' ? null : `/pages/compare`}
              className={Style.compare}
              onClick={() => handleLetsGo()}
            >
              Let's go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
