'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Style from '@/app/styles/page.module.css';

export default function MainProducts({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedTags,
  setSelectedTags,
  productList,
  getAllCompanyData
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

  // create a new data format: each company with its own products
  // const productList =
  //   productData.length > 0
  //     ? productData.reduce((accumulator, currentValue) => {
  //         // Get the values (arrays) from the object and merge them into the accumulator
  //         accumulator.push(...Object.values(currentValue)[0]);
  //         return accumulator;
  //       }, [])
  //     : [];
  
  const [company, setCData] = useState([]);

  const [companysByProducts, setCompanysData] = useState([])
  // const [cbData, setCBData] = useState([]);
  // const [plist, setPlist] = useState([]);

  // const companysByProducts =
  //   company.length > 0 && productList.length > 0
  //     ? productList.map((item, i) => ({
  //         tag: item,
  //         companies: company
  //           .filter((com) => com.Products.includes(item))
  //           .map((item, i) => {
  //             return { name: item.name, products: item.Products, id: item.company_id };
  //           }),
  //         selected: false,
  //         companies_selected: Array(company.filter((com) => com.Products.includes(item)).length).fill(false)
  //       }))
  //     : [];
  // handle checkbox
  const [isChecked, setIsChecked] = useState(
    companysByProducts.length > 0 && productList.length > 0
      ? companysByProducts.map(() => Array(companysByProducts[0].companies_selected.length).fill(false))
      : []
  );
  useEffect(() => {
    getAllCompanyData()
      .then((data) => {
        setCData(data);
        console.log(productList)
        setCompanysData(data.length > 0 && productList.length > 0
          ? productList.map((item, i) => ({
              tag: item,
              companies: data
                .filter((com) => com.Products.includes(item))
                .map((item, i) => {
                  return { name: item.name, products: item.Products, id: item.company_id };
                }),
              selected: false,
              companies_selected: Array(data.filter((com) => com.Products.includes(item)).length).fill(false)
            }))
          : [])

        setIsChecked(
          companysByProducts.length > 0 && productList.length > 0
            ? companysByProducts.map(() => Array(companysByProducts[0].companies_selected.length).fill(false))
            : []
        );
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  },[]);
  console.log(companysByProducts)
  console.log(isChecked);

  const handleCheckList = (e, indexOfProductArea, indexOfEachCom) => {
    console.log(isChecked);
    if (
      companysByProducts.filter((data, index) => {
        return index != indexOfProductArea && data.selected == true;
      }).length > 0
    ) {
      // 如果有兩個重複的product area都有被選取，要跳alert
      alert('不能同時選取多種產品類別，請重新選擇！');
    } else {
      const newIsChecked = [...isChecked]; //create a new var and copy
      newIsChecked[indexOfProductArea][indexOfEachCom] = !isChecked[indexOfProductArea][indexOfEachCom];
      companysByProducts[indexOfProductArea].companies_selected[indexOfEachCom] =
        newIsChecked[indexOfProductArea][indexOfEachCom]; //改company_selected的值
      setIsChecked(newIsChecked);
      // 如果該區的check裡面有true的話，把該區的selected改成true
      isChecked[indexOfProductArea].includes(true)
        ? (companysByProducts[indexOfProductArea].selected = true)
        : (companysByProducts[indexOfProductArea].selected = false);
      // 建立compareArray
      if (companysByProducts.filter((data) => data.selected == true).length != 0) {
        const trueCompanies = companysByProducts.filter((data) => data.selected == true)[0];
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
      } else {
        setCompareLIst('');
      }
    }
    console.log(isChecked);
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
        // handle selected amount
        const trueCompanies = companysByProducts.filter((data) => data.selected == true)[0];
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
      } else {
        isChecked[indexOfProductArea] = isChecked[indexOfProductArea].fill(false);
        companysByProducts[indexOfProductArea].selected = false;
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
            {compareList ? '(' + compareList.Product + ')' : ''}
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
          {companysByProducts
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
