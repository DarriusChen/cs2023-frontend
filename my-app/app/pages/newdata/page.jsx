'use client';

import Astyle from '@/app/styles/newdata.module.css';
import cdata from '@/app/company.json';
import tdata from '@/app/typedata.json';
import CreatableSelect from 'react-select/creatable'; // react套件
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';

export default function Importdata() {
  // data processing -> to fit the data format of the react library
  const comName = cdata.map((data) => {
    return { value: data.name, label: data.name };
  });

  const productsData = Object.keys(tdata).map((key) => ({
    label: key,
    options: tdata[key].map((data) => ({ value: data, label: data }))
  }));

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      name: event.target.company_name.value,
      url: event.target.company_url.value,
      description: event.target.company_desc.value,
      tag: selectedOptions
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = 'http://192.168.70.25:8000/createCompany/';

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json'
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata
    };

    console.log(JSONdata)
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    alert(`This is what you sent: ${result.data}`);
  };

  // Handle CreatableSelect
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (newValue) => {
    setSelectedOptions(newValue);
  };

  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setSelectedOptions([...selectedOptions, newOption]);
  };

  return (
    <div className={Astyle.newMain}>
      <div className={Astyle.pageArea}>
        <div className={Astyle.titleArea}>
          <div className={Astyle.title}>UPLOAD NEW DATA</div>
          <div className={Astyle.tdesc}>請根據想上傳之公司名稱填入對應資訊</div>
        </div>
        <form className={Astyle.uploadForm} onSubmit={handleSubmit}>
          <div className={Astyle.eachForm} style={{ margin: '0' }}>
            <div className={Astyle.eachTitle}>Name: </div>
              <input
                type="text"
                className={Astyle.input}
                isClearable
                options={comName}
                placeholder="New company name..."
                id="company_name"
                required
                pattern="^[A-Z].*"
                title="Please start with an uppercase letter"
                // value={}
                // onChange={()=>handleChange()}
              />
          </div>
          <div className={Astyle.eachForm}>
            <div className={Astyle.eachTitle}>Link: </div>
            <input type="url" className={Astyle.input} id="company_url" placeholder="New company link..." required></input>
          </div>
          <div className={Astyle.eachForm} style={{ height: '20vh', alignItems: 'start' }}>
            <div className={Astyle.eachTitle}>Description: </div>
            <textarea
              className={Astyle.input}
              style={{ height: '20vh', padding: '1vh' }}
              id="company_desc"
              placeholder="Please write a short description of this company..."
              required
            ></textarea>
          </div>
          <div className={Astyle.eachForm}>
            <div className={Astyle.eachTitle}>Products: </div>
            <CreatableSelect
              className={Astyle.selectInput}
              isClearable
              isMulti
              options={productsData}
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
    </div>
  );
}
