'use client'; // useState要在client component才能用
import Style from './styles/page.module.css';
import { useEffect, useState } from 'react';
import myData from './typedata.json' assert { type: 'json' };
// import company from './company.json' assert { type: 'json' };
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const Sidebar = dynamic(() => import('../app/components/sidebar'), { ssr: false });
const MainProducts = dynamic(() => import('../app/components/mainProducts'), { ssr: false }); // import edit component 並且使用lazy loading

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

function setProductList(data) {
  const productList =
    data.length > 0
      ? data.reduce((accumulator, currentValue) => {
          // Get the values (arrays) from the object and merge them into the accumulator
          accumulator.push(...Object.values(currentValue)[0]);
          return accumulator;
        }, [])
      : [];

  return productList;
}

export default function Home() {
  // get products data
  const [pdata, setPData] = useState([]);
  // get company data
  const [company, setCData] = useState([]);
  const [companysByProducts, setCompanyByProducts] = useState([]);

  useEffect(() => {
    // Fetch data and update state when the component mounts
    getAllProducts()
      .then(async (data) => {
        setPData(data);

        const productList = await setProductList(data);

        await getAllCompanyData()
          .then((data) => {
            setCData(data);
            const companiesByProductsData =
              data.length > 0 && productList.length > 0
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
                : [];

            return companiesByProductsData;
          })
          .then((companiesByProductsData) => {
            console.log(companiesByProductsData);
            setCompanyByProducts(companiesByProductsData);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error
      });
  }, []);
  console.log(companysByProducts);

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
          companiesByProducts={companysByProducts}
          company={company}
        />
      </div>
    </main>
  );
}
