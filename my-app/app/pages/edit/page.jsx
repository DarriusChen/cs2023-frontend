'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import Estyle from '../../styles/edit.module.css';
import cdata from '../../company.json';

export default function Edit() {
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
              sizes="2vh"
              style={{ width: '3vh', height: 'auto' }}
              alt="search"
            ></Image>
          </Link>
          <Link href={'#'} className={Estyle.addNew}>
            Add
          </Link>
        </div>
        <div className={Estyle.companyArea}>
          {cdata.map((data, i) => (
            <div key={i} className={Estyle.company}>
              <div className={Estyle.cNAME}>{data.name}</div>
              <Link href={data.url} className={Estyle.cURL}>{data.url}</Link>
              <div className={Estyle.cProducts}>{data.products.map((p)=>(p+', '))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
