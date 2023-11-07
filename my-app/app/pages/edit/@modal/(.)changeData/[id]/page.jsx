'use client';
import Modal from '@/app/components/modal/Modal';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Astyle from '@/app/styles/change.module.css';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';

// 公司資訊
async function getTheCompany(id) {
  const res = await fetch(`http://192.168.70.25:8000/getCompany/?cid=${id}`);
  if (!res.ok) {
    //   // This will activate the closest `error.js` Error Boundary
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

// get all company data
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

export default function UpdateModal({ params: { id } }) {
  const CreatableSelect = dynamic(() => import('react-select/creatable'), { ssr: false }); // import edit component 並且使用lazy loading

  //get the company info, all company and all products
  const [info, setInfo] = useState('');
  const [products, setProducts] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  // const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // Fetch data and update state when the component mounts
    getTheCompany(id)
      .then((data) => {
        setInfo(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error
      });
    getAllProducts()
      .then((data) => {
        // data processing -> to fit the data format of the react library
        setProducts(
          data.map((data, i) => ({
            label: Object.keys(data)[0],
            options: data[Object.keys(data)[0]].map((data, i) => ({ value: data, label: data }))
          }))
        );
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error
      });
    getAllCompanyData()
      .then((data) => {
        // data processing -> to fit the data format of the react library
        setCompanyNames(
          data.map((data, i) => {
            return { value: data.name, label: data.name };
          })
        );
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error
      });
  }, []);

  // Handle CreatableSelect (products)
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (newValue) => {
    setSelectedOptions(newValue);
  };

  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setSelectedOptions([...selectedOptions, newOption]);
  };
  return (
    <>
      <Modal>
        <div className={Astyle.pageArea}>
          <div className={Astyle.titleArea}>
            <div className={Astyle.title}>UPLOAD / UPDATE NEW DATA</div>
            <div className={Astyle.tdesc}>請根據以下欄位填入對應的公司資訊</div>
          </div>
          <div className={Astyle.closeBtnArea} style={{ height: '0' }}>
            {/* <Image
              src={'/close.svg'}
              alt="close"
              width={0}
              height={0}
              style={{ width: 'auto', height: 'auto' }}
              className={Astyle.closeBtn}
              onClick={() => handleClosePage()}
            /> */}
          </div>

          <form className={Astyle.uploadForm} action={''}>
            <div className={Astyle.eachForm} style={{ margin: '0' }}>
              <div className={Astyle.eachTitle}>Name: </div>
              {info.name && (
                <CreatableSelect
                  className={Astyle.selectInput}
                  isClearable
                  options={companyNames}
                  placeholder="Select or Create..."
                  defaultValue={{ value: info.name, label: info.name }}
                  id="company_name"
                  required
                  // value={}
                  // onChange={()=>handleChange()}
                />
              )}
            </div>
            <div className={Astyle.eachForm}>
              <div className={Astyle.eachTitle}>Link: </div>
              <input type="url" className={Astyle.input} defaultValue={info.url} id="company_url" required></input>
            </div>
            <div className={Astyle.eachForm} style={{ height: '20vh', alignItems: 'start' }}>
              <div className={Astyle.eachTitle}>Description: </div>
              <textarea
                className={Astyle.input}
                style={{ height: '20vh', padding: '1vh' }}
                defaultValue={info['description']}
                id="company_desc"
                required
              ></textarea>
            </div>
            <div className={Astyle.eachForm}>
              <div className={Astyle.eachTitle}>Products: </div>
              <CreatableSelect
                className={Astyle.selectInput}
                isClearable
                isMulti
                options={products}
                defaultValue={info.Products && info.Products.map((data, i) => ({ label: data, value: data }))}
                id="company_products"
                required
                onChange={handleSelectChange}
                onCreateOption={handleCreateOption}
              />
            </div>
            <div className={Astyle.eachForm} style={{ marginBottom: '0' }}>
              <div className={Astyle.eachTitle}>Upload DM: </div>
              {/* <input type="file" className={Astyle.fileInput} /> */}
              <div className={Astyle.fileInput}>
                <label className={Astyle.uploadBtn}>
                  <input
                    id="file-uploader"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={() => FileUploaded()}
                    multiple
                  />
                  <FontAwesomeIcon icon={faFile} style={{ marginRight: '0.5vh' }} />
                  上傳圖片
                </label>
              </div>
            </div>
            <div className={Astyle.submitContainer}>
              <div className={Astyle.submitArea}>
                <button className={Astyle.submit} type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
