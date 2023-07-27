'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import Estyle from '../../styles/edit.module.css';
import Astyle from '../../styles/newdata.module.css';
import cdata from '../../company.json';
import { ChangeEvent } from 'react';
import dynamic from 'next/dynamic'; // lazy loading->先不要rendor直到client點擊

const EditPage = dynamic(() => import('../../components/changeData'), { ssr: false }); // import edit component 並且使用lazy loading

async function getCompanyData() {
  // const res = await fetch('http://192.168.70.134:8000/getCompanyData');
  // // The return value is *not* serialized
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }
  // const result = await res.json().then((data)=>data);
  // return result;
}

export default function Edit() {
  const response = getCompanyData().then((data) => ({ data: data }));
  const data = response['data'];
  // console.log(response);

  //控制頁面要不要跳出
  const [isShowAddPage, setShowAddPage] = useState(false);
  const [companyData, setCompanyData] = useState({ name: '', url: '', desc: '', products: '' });
  const handleShowPage = (name, url, desc, products) => {
    const productsOptions = products.map((data) => ({ value: data, label: data }));
    setCompanyData({ name: '', url: '', desc: '', products: '' });
    setCompanyData({ name: { value: name, label: name }, url: url, desc: desc, products: productsOptions });
    setShowAddPage(true);
  };
  // console.log(companyData)

  return (
    <div className={Estyle.main}>
      <div className={Estyle.mainArea}>
        <div className={Estyle.searchNAdd}>
          <input type="text" placeholder="Search..." className={Estyle.inputArea}></input>
          <Link href={'#'} className={Estyle.searchIcon}>
            <Image
              src="/search.svg"
              width={0}
              height={0}
              // sizes="5vh"
              style={{ width: '4.5vh', height: 'auto' }}
              alt="search"
            ></Image>
          </Link>
          <Link href={'/pages/newdata'} className={Estyle.addNew}>
            NEW
          </Link>
        </div>
        <div className={Estyle.companyArea}>
          <div className={Estyle.headerArea}>
            <div className={Estyle.header}>Company</div>
            <div className={Estyle.header}>Url</div>
            <div className={Estyle.header}>Products</div>
            <div className={Estyle.header} style={{ paddingLeft: '1rem' }}>
              Actions
            </div>
          </div>
          {cdata.map((data, i) => (
            <div key={i} className={Estyle.company}>
              <Link href={`/pages/company/${data.name}`} key={i} className={Estyle.cNAME}>
                {data.name}
              </Link>
              <Link href={data.url} className={Estyle.cURL}>
                {data.url}
              </Link>
              <div className={Estyle.cProducts}>
                {data.products.map((p) => (
                  <div className={Estyle.eachProduct}>{p}</div>
                ))}
              </div>
              <div className={Estyle.crud}>
                <button
                  className={Estyle.crudBtn}
                  onClick={() => handleShowPage(data.name, data.url, data.Description, data.products)}
                >
                  Edit
                </button>
                <button className={Estyle.crudBtn}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditPage
        isShowAddPage={isShowAddPage}
        setShowAddPage={setShowAddPage}
        companyData={companyData}
        setCompanyData={setCompanyData}
      />
    </div>
  );
}
