'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Estyle from '../../styles/edit.module.css';
// import Astyle from '../../styles/newdata.module.css';
import { ChangeEvent } from 'react';
import dynamic from 'next/dynamic'; // lazy loading->先不要rendor直到client點擊

const EditPage = dynamic(() => import('../../components/changeData-old'), { ssr: false }); // import edit component 並且使用lazy loading

async function getAllCompanyData() {
  try {
    const res = await fetch('http://192.168.70.25:8000/');
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

export default function Edit() {
  const [cdata, setCData] = useState([]);
  const [clickBtn, setClickBtn] = useState(false);

  // search
  const [searchInput, setSearchInput] = useState('');
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    setSearchInput(e.target.value);
    if (!searchTerm) {
      setClickBtn(!clickBtn);
    } else {
      setCData(cdata.filter((data, i) => data.name.toLowerCase().includes(searchTerm)));
    }
  };

  const handleSearchBtn = (e) => {
    const searchTerm = e.target.value
    if(!searchTerm){
      ''
    }
    else {
      setCData(cdata.filter((data, i) => data.name.toLowerCase().includes(searchTerm).toLowerCase()));
    }
  }

  useEffect(() => {
    // Fetch data and update state when the component mounts
    getAllCompanyData()
      .then((data) => {
        setCData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error
      });
  }, [clickBtn]); // Empty dependency array ensures the effect runs only once when the component mounts

  //控制頁面要不要跳出
  // const [isShowAddPage, setShowAddPage] = useState(false);
  // const [companyData, setCompanyData] = useState({ name: '', url: '', desc: '', products: '' });
  // const handleShowPage = (name, url, desc, products) => {
  //   const productsOptions = products.map((data, i) => ({ value: data, label: data }));
  //   setCompanyData({ name: '', url: '', desc: '', products: '' });
  //   setCompanyData({ name: { value: name, label: name }, url: url, desc: desc, products: productsOptions });
  //   setShowAddPage(true);
  // };
  // console.log(companyData)

  //crud-刪除
  const route = useRouter();

  async function handleDelBtn(company_id) {
    // API endpoint where we send request.
    const endpoint = `http://192.168.70.25:8000/DeleteCompany/?cid=${company_id}`;

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'DELETE',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json'
      }
      // Body of the request is the JSON data we created above.
    };
    const response = await fetch(endpoint, options);
    if (response.ok) {
      alert(`刪除成功!`);
      // route.push('/pages/edit');
      setClickBtn(() => !clickBtn);
    } else {
      const errorMsg = await response.json();
      alert(`刪除失敗：${errorMsg}`);
    }
  }

  return (
    <div className={Estyle.main}>
      <div className={Estyle.mainArea}>
        <div className={Estyle.searchNAdd}>
          <input
            type="text"
            placeholder="search by company name..."
            className={Estyle.inputArea}
            value={searchInput}
            onChange={handleSearchChange}
          ></input>
          <button onClick={handleSearchBtn} className={Estyle.searchIcon}>
            <Image
              src="/search.svg"
              width={0}
              height={0}
              // sizes="5vh"
              style={{ width: '4.5vh', height: 'auto' }}
              alt="search"
            ></Image>
          </button>
          <Link href={'/pages/newdata'} className={Estyle.addNew}>
            NEW
          </Link>
        </div>
        <div className={Estyle.companyArea}>
          <div className={Estyle.headerArea}>
            <div className={Estyle.header}>Company</div>
            <div className={Estyle.header}>Url</div>
            <div className={Estyle.header}>Products</div>
            <div className={Estyle.header}>Actions</div>
          </div>
          {cdata.map((data, i) => (
            <div key={i} className={Estyle.company}>
              <Link href={`/pages/company/${data.company_id}`} key={i} className={Estyle.cNAME}>
                {data.name}
              </Link>
              <Link href={data.url} className={Estyle.cURL}>
                {data.url}
              </Link>
              <div className={Estyle.cProducts}>
                {data.Products.map((p, i) => (
                  <div key={i} className={Estyle.eachProduct}>{p}</div>
                ))}
              </div>
              <div className={Estyle.crud}>
                <Link
                  className={Estyle.crudBtn}
                  // onClick={() => handleShowPage(data.name, data.url, data.Description, data.Products)}
                  href={`/pages/edit/changeData/${data.company_id}`}
                >
                  EDIT
                </Link>
                <button className={Estyle.delBtn} onClick={() => handleDelBtn(data.company_id)}>
                  DEL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
        {/* <EditPage
        isShowAddPage={isShowAddPage}
        setShowAddPage={setShowAddPage}
        companyData={companyData}
        setCompanyData={setCompanyData}
      /> */}
      
    </div>
  );
}
