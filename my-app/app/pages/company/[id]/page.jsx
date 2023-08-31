'use client';
import Cstyle from '@/app/styles/company.module.css';
// import Cdata from '@/app/company.json';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import path from 'path';
import fs from 'fs';

// 公司資訊
async function getTheCompany(id) {
  const res = await fetch(`http://192.168.70.25:8000/getCompany/?cid=${id}`);
  if (!res.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
// 照片呈現
//get images using api
// async function getImages(id) {
  // const res = await fetch(`http://192.168.70.134:8000/getimages/${id}`);
  // // The return value is *not* serialized
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }
  // const result = await res.json().then((data) => data);
  // return result;
// }

export default function ShowCompany({ params: { id } }) {
  //get the company info

  const [info, setInfo] = useState('');
  useEffect(() => {
    // Fetch data and update state when the component mounts
    getTheCompany(id)
      .then((data) => {
        setInfo(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error
      });
  },[] );

  // const imageurls = getImages(id);
  // const Gallery = ({ imageurls }) => {
  //   return (
  //     <div className={Cstyle.eachDm}>
  //       {imageurls.map((url,i) => (
  //         <Image
  //           className={card}
  //           width={0}
  //           height={0}
  //           style={{width:"3vh",height:"5vh"}}
  //           alt={`dm+${i}`}
  //           src={url}
  //           key={i}
  //         />
  //       ))}
  //     </div>
  //   )
  // }

  // filter the data to make it remain only the data whose company's name = id
  return (
    <div className={Cstyle.main}>
      <div className={Cstyle.intro}>
        <Link target="_blank" className={Cstyle.cname} href={info?info.url:''}>
          {info.name}
        </Link>
        <div className={Cstyle.desc}>{info.description}</div>
      </div>
      <div className={Cstyle.products}>
        Products: &emsp;
        {info?info.Products.map((tag) => (
          <div className={Cstyle.tag}>{tag}</div>
        )):''}
      </div>
      <div className={Cstyle.mainBody}>
        <div className={Cstyle.dmArea}>
          <Link className={Cstyle.backArrow} href={''}>
            <Image src={'/arrow_back.svg'} width={0} height={0} alt='arrow' style={{ width: '5vh', height: '7vh' }}></Image>
          </Link>
          <div className={Cstyle.dms}>{/* <Gallery images={imageurls} /> */}</div>
          <Link className={Cstyle.forwardArrow} href={''}>
            <Image src={'/arrow_forward.svg'} width={0} height={0} alt='arrow' style={{ width: '5vh', height: '7vh' }}></Image>
          </Link>
        </div>
      </div>
    </div>
  );
}

// 預先render (路徑)
// export async function generateStaticParams() {
//   const posts = await fetch('192.168.70.89').then((res) => {
//     res.json();
//   });
//   return posts.map((post) => ({
//     id: post.name
//   }));
// }
