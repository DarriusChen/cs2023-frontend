'use client';
import Cstyle from '@/app/styles/company.module.css';
import Cdata from '@/app/company.json';
import Link from 'next/link';

export default function Importdata({ params: { id } }) {
  //get the company info
  const info = Cdata.filter((ele) => ele.name == id)[0];
  return (
    <div className={Cstyle.main}>
      <div className={Cstyle.intro}>
        <Link target="_blank" className={Cstyle.cname} href={info.url}>
          {id}
        </Link>
        <div className={Cstyle.desc}>{info.Description}</div>
      </div>
    </div>
  );
}

// 預先render (路徑)
export async function generateStaticParams() {
  const posts = await fetch('http://localhost:3000/company.json').then((res) => {
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
