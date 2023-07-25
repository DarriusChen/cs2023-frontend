import cdata from '@/app/company.json';
import tdata from '@/app/typedata.json';
import React, { useState } from 'react';
import Image from 'next/image';
import Astyle from '@/app/styles/newdata.module.css';
import CreatableSelect from 'react-select/creatable'; // react套件
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';

export default function EditPage({ isShowAddPage, setShowAddPage, companyData, setCompanyData }) {
  const handleClosePage = () => {
    setCompanyData({ name: '', url: '', desc: '', products: '' });
    setShowAddPage(false);
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
  const FileUploaded = () => {
    const onFileUploadChange = (ChangeEvent) => {};
    // console.log(fileUploader)
  };

  // 存form的變數們
  const [cMessage, setcMessage] = useState({ name: '', url: '', Description: '', products: '' });
  const handleChange = (name, url, desc, products) => {
    setcMessage({
      name: name.target.value,
      url: url.target.value,
      Description: desc.target.value,
      products: products.target.value
    });
  };
  const cname = companyData.name;
  const cproducts = companyData.products;
  console.log(cname, cproducts);

  //

  return (
    <div className={isShowAddPage ? Astyle.newMain : Astyle.closeMain}>
      <div className={Astyle.pageArea}>
        <div className={Astyle.titleArea}>
          <div className={Astyle.title}>UPLOAD / UPDATE NEW DATA</div>
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
              defaultValue={cname}
              // value={}
              // onChange={()=>handleChange()}
            />
          </div>
          <div className={Astyle.eachForm}>
            <div className={Astyle.eachTitle}>Link: </div>
            <input type="url" className={Astyle.input} defaultValue={companyData['url']}></input>
          </div>
          <div className={Astyle.eachForm} style={{ height: '20vh', alignItems: 'start' }}>
            <div className={Astyle.eachTitle}>Description: </div>
            <textarea
              className={Astyle.input}
              style={{ height: '20vh', padding: '1vh' }}
              defaultValue={companyData['desc']}
            ></textarea>
          </div>
          <div className={Astyle.eachForm}>
            <div className={Astyle.eachTitle}>Products: </div>
            <CreatableSelect
              className={Astyle.selectInput}
              isClearable
              isMulti
              options={productsData}
              defaultValue={cproducts}
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
              <button className={Astyle.submit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
