import Istyle from '@/app/styles/import.module.css';
import Link from 'next/link';

export default function Importdata() {
  return (
    <div className={Istyle.main}>
      <div className={Istyle.titleArea}>
        <div className={Istyle.title}>UPLOAD</div>
        <div className={Istyle.tdesc}>請根據想上傳之公司名稱填入對應資訊</div>
      </div>
      <div className={Istyle.uploadForm}>
        <div className={Istyle.dropdown}>
          <div className={Istyle.eachTitle}>Name: </div>
          <Link href={'#'} className={Istyle.dropdownTitle}>
            Existing Companies
          </Link>
        </div>
        <div className={Istyle.dropdown}>
          <div className={Istyle.eachTitle}>Link: </div>
        </div>
        <div className={Istyle.dropdown}>
          <div className={Istyle.eachTitle}>Description: </div>
        </div>
        <div className={Istyle.dropdown}>
          <div className={Istyle.eachTitle}>Products: </div>
          <Link href={'#'} className={Istyle.dropdownTitle}>
            Existing Products
          </Link>
          <div>New Product: </div>
        </div>
      </div>
    </div>
  );
}
