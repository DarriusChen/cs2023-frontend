'use client';

import navStyles from './styles/nav.module.css';
import styles from './styles/page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Router } from 'next/router';
import {useState} from 'react'


//write a navigator component
//I want this navigator component to be Responsive Web Design
export default function Nav() {

const[isOriginPageClik,setIsOriginPageClik] = useState(true)
function Render(isOriginPageClik){
 
}

  return (
    <div className={navStyles.nav}>
      <div className={navStyles.navLogo}>
        <Link href="/">
          <Image src="/iiilogo.png" alt="123" width={40} height={40}></Image>
        </Link>
      </div>
      <div className={`${navStyles['nav-links']}`}>
        <Link href="/" className={navStyles.navItems}>
          Home
        </Link>
        <Link href="/pages/importdata" className={navStyles.navItems}>
          Import
        </Link>
        <Link href="/pages/edit" className={navStyles.navItems}>
          Edit
        </Link>
      </div>
    </div>
  );
}
