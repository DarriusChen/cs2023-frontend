'use client'; // useState要在client component才能用
import Image from 'next/image';
import Style from './styles/page.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ST } from 'next/dist/shared/lib/utils';
import myData from './typedata.json' assert { type: 'json' };
// import company from './company.json' assert { type: 'json' };
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const MainProducts = dynamic(() => import('../app/components/mainProducts'), { ssr: false }); // import edit component 並且使用lazy loading


// get company data
async function getAllCompanyData() {
  const res = await fetch('http://192.168.70.25:8000/');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// get all products
async function getAllProducts() {
  try {
    const res = await fetch('http://192.168.70.25:8000/CategoryTag/');
    // The return value is *not* serialized
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('An error occured:', error);
    throw error;
  }
}

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
          <div className={Style.sidebarTitle}>Select products</div>
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


export default function Home() {
  // get products data
  const [pdata, setPData] = useState([]);
  // get company data
  useEffect(() => {
    // Fetch data and update state when the component mounts
    getAllProducts()
      .then((data) => {
        setPData(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error
      });

  }, []);

  // const router = useRouter();

  // useEffect(() => {
  //   router.refresh();
  // }, [router]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  //handle tags display
  const [selectedTags, setSelectedTags] = useState([]); //還沒被選取

  return (
    <main className={Style.main}>
      <div className={Style.mainContent}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          productData={pdata}
        />
        <MainProducts
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          productData={pdata}
          // company={company}
          getAllCompanyData={getAllCompanyData}
        />
      </div>
    </main>
  );
}
