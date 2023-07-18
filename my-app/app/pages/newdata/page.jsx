import Astyle from '@/app/styles/newdata.module.css';
import Link from 'next/link';

export default function Importdata() {
  return (
    <div className={Astyle.main}>
      <div className={Astyle.pageArea}>
        <div className={Astyle.titleArea}>
          <div className={Astyle.title}>UPLOAD NEW DATA</div>
          <div className={Astyle.tdesc}>請根據想上傳之公司名稱填入對應資訊</div>
        </div>
        <div className={Astyle.uploadForm}>
          <div className={Astyle.dropdown}>
            <div className={Astyle.eachTitle}>Name: </div>
            <Link href={'#'} className={Astyle.dropdownTitle}>
              Existing Companies
            </Link>
          </div>
          <div className={Astyle.dropdown}>
            <div className={Astyle.eachTitle}>Link: </div>
          </div>
          <div className={Astyle.dropdown}>
            <div className={Astyle.eachTitle}>Description: </div>
          </div>
          <div className={Astyle.dropdown}>
            <div className={Astyle.eachTitle}>Products: </div>
            <Link href={'#'} className={Astyle.dropdownTitle}>
              Existing Products
            </Link>
            <div>New Product: </div>
          </div>
        </div>
      </div>
    </div>
  );
}
