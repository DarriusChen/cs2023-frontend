'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import Estyle from '../../styles/edit.module.css';
import Astyle from '../../styles/newdata.module.css';
import cdata from '../../company.json';
import tdata from '../../typedata.json';
import CreatableSelect from 'react-select/creatable'; // react套件
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';
// import { cache } from 'react';

async function getCompanyData() {
  // const res = await fetch('http://192.168.70.134:8000/');
  // // The return value is *not* serialized
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }

  // const result = await res.json().then((data)=>data);

  // return result;
}

export default function Edit() {
  const response = getCompanyData().then((data)=>({"data":data}));
  const data = response["data"]
  console.log(response);

  //控制頁面要不要跳出
  const [isShowAddPage, setShowAddPage] = useState(false);
  const handleShowPage = () => {
    setShowAddPage(true);
    // console.log(isShowAddPage);
  };

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
                <button className={Estyle.crudBtn} onClick={() => handleShowPage()}>
                  Edit
                </button>
                <button className={Estyle.crudBtn}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditPage isShowAddPage={isShowAddPage} setShowAddPage={setShowAddPage} />
    </div>
  );
}

function EditPage({ isShowAddPage, setShowAddPage }) {
  const handleClosePage = () => {
    setShowAddPage(false);
    console.log(isShowAddPage);
  };

  // data processing -> to fit the data format of the react library
  const comName = cdata.map((data) => {
    return { value: data.name, label: data.name };
  });
  const productsData = Object.keys(tdata).map((key) => ({
    label: key,
    options: tdata[key].map((data) => ({ value: data, label: data }))
  }));

  // alert after file uploaded
  const fileUploader = document.getElementById('#file-uploader');
  console.log(fileUploader)

  // 存form的變數們
  const [cMessage,setcMessage] = useState({"name": '',"url":'',"Description":'',"products":''})
  const handleCompanyMessage = () => {
    setcMessage()
  }

  return (
    <div className={isShowAddPage ? Astyle.newMain : Astyle.closeMain}>
      <div className={Astyle.pageArea}>
        <div className={Astyle.titleArea}>
          <div className={Astyle.title}>UPLOAD NEW DATA</div>
          <div className={Astyle.tdesc}>請根據以下欄位填入對應的公司資訊</div>
        </div>
        <div className={Astyle.closeBtnArea} style={{ height: '0' }}>
          <Image
            src={'/close.svg'}
            alt="close"
            width={0}
            height={0}
            style={{ width: 'auto', height: 'auto' }}
            className={Astyle.closeBtn}
            onClick={() => handleClosePage()}
          />
        </div>

        <div className={Astyle.uploadForm}>
          <div className={Astyle.eachForm} style={{ margin: '0' }}>
            <div className={Astyle.eachTitle}>Name: </div>
            <CreatableSelect
              className={Astyle.selectInput}
              isClearable
              options={comName}
              placeholder="Select or Create..."
              // value={cNameMessage}
              // onChange={setcNameMessage()}
            />
          </div>
          <div className={Astyle.eachForm}>
            <div className={Astyle.eachTitle}>Link: </div>
            <input type="url" className={Astyle.input} ></input>
          </div>
          <div className={Astyle.eachForm} style={{ height: '20vh', alignItems: 'start' }}>
            <div className={Astyle.eachTitle}>Description: </div>
            <textarea className={Astyle.input} style={{ height: '20vh', padding: '1vh' }} ></textarea>
          </div>
          <div className={Astyle.eachForm}>
            <div className={Astyle.eachTitle}>Products: </div>
            <CreatableSelect className={Astyle.selectInput} isClearable options={productsData} />
          </div>
          <div className={Astyle.eachForm} style={{ marginBottom: '0' }}>
            <div className={Astyle.eachTitle}>Upload DM: </div>
            {/* <input type="file" className={Astyle.fileInput} /> */}
            <div className={Astyle.fileInput}>
              <label className={Astyle.uploadBtn}>
                <input id="file-uploader" style={{ display: 'none' }} type="file" accept="image/*" multiple/>
                <FontAwesomeIcon icon={faFile} style={{ marginRight: '0.5vh' }} />
                上傳圖片
              </label>
            </div>
          </div>
          <div className={Astyle.submitContainer}>
            <div className={Astyle.submitArea}>
              <button className={Astyle.submit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
