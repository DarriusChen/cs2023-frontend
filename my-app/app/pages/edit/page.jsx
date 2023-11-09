'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Estyle from '../../styles/edit.module.css';
import Swal from 'sweetalert2';
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
    // API endpoint where we send the request.
    const endpoint = `http://192.168.70.25:8000/DeleteCompany/?cid=${company_id}`;
  
    // Form the request for sending data to the server.
    const options = {
      method: 'DELETE', // The method is DELETE because we're deleting data.
      headers: {
        'Content-Type': 'application/json', // Tell the server we're sending JSON.
      },
    };
  
    try {
      const result = await Swal.fire({
        title: `是否確認刪除"${cdata.filter((data) => data.company_id == company_id)[0].name}"？`,
        text: "刪除後無法復原",
        icon: "warning",
        showConfirmButton: "true",
        confirmButtonColor: "rgb(109 81 146)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        showCancelButton: true, // Add this to show the Cancel button.
      });
  
      if (result.isConfirmed) {
        const response = await fetch(endpoint, options);
        if (response.ok) {
          Swal.fire({
            title: "Deleted!",
            text: `已成功刪除：${cdata.filter((data) => data.company_id == company_id)[0].name}`,
            icon: "success",
          });
          setClickBtn(() => !clickBtn);
        } else {
          const errorMsg = await response.json();
          Swal.fire({
            title: "Oops!",
            text: `刪除失敗：${errorMsg}`,
            icon: "error",
          });
        }
      }
    } catch (error) {
      // Handle errors here.
      console.error("Error:", error);
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
