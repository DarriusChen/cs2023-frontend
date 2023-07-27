'use client';
import Cstyle from '@/app/styles/company.module.css';
import Cdata from '@/app/company.json';
import Link from 'next/link';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';

export default function ShowCompany({ params: { id } }) {
  //get the company info
  const info = Cdata.filter((ele) => ele.name == id)[0];
  // 照片呈現
  //get images using api
  async function getImages(id) {
    const res = await fetch(`http://192.168.70.134:8000/getimages/${id}`);
    // // The return value is *not* serialized
    // if (!res.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   throw new Error('Failed to fetch data');
    // }
    // const result = await res.json().then((data) => data);
    // return result;
  }
  const imageurls = getImages(id);
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
        <Link target="_blank" className={Cstyle.cname} href={info.url}>
          {id}
        </Link>
        <div className={Cstyle.desc}>{info.Description}</div>
      </div>
      <div className={Cstyle.products}>
        Products: &emsp;
        {info.products.map((tag) => (
          <div className={Cstyle.tag}>{tag}</div>
        ))}
      </div>
      <div className={Cstyle.dmArea}>
        <Link className={Cstyle.backArrow} href={''}>
          <Image src={'/arrow_back.svg'} width={0} height={0} style={{ width: '5vh', height: '7vh' }}></Image>
        </Link>
        <div className={Cstyle.dms}>
          {/* <Gallery images={imageurls} /> */}
        </div>
        <Link className={Cstyle.forwardArrow} href={''}>
          <Image src={'/arrow_forward.svg'} width={0} height={0} style={{ width: '5vh', height: '7vh' }}></Image>
        </Link>
      </div>
    </div>
  );
}

// 預先render (路徑)
export async function generateStaticParams() {
  const posts = await fetch('192.168.70.89').then((res) => {
    res.json();
  });
  return posts.map((post) => ({
    id: post.name
  }));
}

//fetch data
async function getData() {
  const info = Cdata.includes({ id });
  return info;
}
