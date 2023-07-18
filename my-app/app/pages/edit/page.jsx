'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import Estyle from '../../styles/edit.module.css';
import Astyle from '../../styles/newdata.module.css';
import cdata from '../../company.json';
import tdata from '../../typedata.json'
import CreatableSelect from 'react-select/creatable'; // react套件
// import { cache } from 'react';

async function getCompanyData() {
  // const res = await fetch('http://192.168.70.89:8000/').then((res) => res.json());
  // The return value is *not* serialized
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }
  // return res;
}

export default function Edit() {
  const response = getCompanyData();
  console.log(response);

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
                <button className={Estyle.crudBtn}>Edit</button>
                <button className={Estyle.crudBtn}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditPage />
    </div>
  );
}

function EditPage() {
  const showAddPage = useState(false);
  const comName = cdata.map((data) => {return {"value":data.name,"label":data.name}})
  const productsData = Object.keys(tdata)

  return (
    <div className={Astyle.newMain}>
      <div className={Astyle.pageArea}>
        <div className={Astyle.titleArea}>
          <div className={Astyle.title}>UPLOAD NEW DATA</div>
          <div className={Astyle.tdesc}>請根據想上傳之公司名稱填入對應資訊</div>
        </div>
        <div className={Astyle.uploadForm}>
          <div className={Astyle.eachForm}>
            <div className={Astyle.eachTitle}>Name: </div>
            {/* <input type='text' list='companies' className={Astyle.input}></input>
            <datalist id='companies'>
              {cdata.map((data)=><option className={Astyle.option} value={data.name}></option>)}
            </datalist> */}
            <CreatableSelect className={Astyle.selectInput} isClearable options={comName} />
          </div>
          <div className={Astyle.eachForm}>
            <div className={Astyle.eachTitle}>Link: </div>
            <input type="text" className={Astyle.input}></input>
          </div>
          <div className={Astyle.eachForm} style={{height:"20vh",alignItems:"start"}}>
            <div className={Astyle.eachTitle}>Description: </div>
            <textarea className={Astyle.input} style={{height:"20vh",padding:"1vh"}}></textarea>
          </div>
          <div className={Astyle.eachForm}>
            <div className={Astyle.eachTitle}>Products: </div>
            <CreatableSelect className={Astyle.selectInput} isClearable options={products} />
          </div>
          <div className={Astyle.eachForm}>
            <div className={Astyle.eachTitle}>Upload DM: </div>
            <input type="file" className={Astyle.fileInput} />
          </div>
        </div>
      </div>
    </div>
  );
}
