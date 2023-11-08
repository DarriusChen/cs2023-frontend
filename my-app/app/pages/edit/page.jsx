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
  const [showdata, setShowData] = useState([]); //暫存資料用來filter
  const [clickBtn, setClickBtn] = useState(false);

  // search
  const [searchInput, setSearchInput] = useState('');
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(e.target.value);
    if (!searchTerm) {
      setShowData(cdata);
    } else {
      setShowData(cdata.filter((data, i) => data.name.toLowerCase().includes(searchTerm)));
    }
  };

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
    if (confirm('是否確認刪除此筆資料？')) {
      const response = await fetch(endpoint, options);
      if (response.ok) {
        alert(`刪除成功!`);
        // route.push('/pages/edit');
        setClickBtn(() => !clickBtn);
      } else {
        const errorMsg = await response.json();
        alert(`刪除失敗：${errorMsg}`);
      }
    } else {
      ('已取消！');
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
          <div style={{ overflowY: 'scroll', maxHeight: '82vh', width: "100%" }}>
            {(searchInput.length == 0 ? cdata : showdata).map((data, i) => (
              <div key={i} className={Estyle.company}>
                <Link href={`/pages/company/${data.company_id}`} key={i} className={Estyle.cNAME}>
                  {data.name}
                </Link>
                <Link href={data.url} className={Estyle.cURL}>
                  {data.url}
                </Link>
                <div className={Estyle.cProducts}>
                  {data.Products.map((p, i) => (
                    <div key={i} className={Estyle.eachProduct}>
                      {p}
                    </div>
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
