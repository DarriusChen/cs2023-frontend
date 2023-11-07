'use client';
import React, { useState } from 'react';
import Cstyle from '../../styles/compare.module.css';
import CompareData from '@/app/compare.json';

export default function Compare() {
  const compare_companies = ['功能比較', 'Cybereason', 'SentinelOne', 'Wazuh', 'Datadog'];

  return (
    <div className={Cstyle.main}>
      <div className={Cstyle.subMain}>
        <div className={Cstyle.title}>產品功能比較</div>
        {console.log(CompareData.Category['端點偵測分析'].length)}
        <div style={{ textAlign: 'center', fontSize: '2vh' }}>比較類別：端點偵測分析</div>
        <hr className={Cstyle.line} />
        <div className={Cstyle.tableWrapper}>
          <div className={Cstyle.tableArea}>
            <div style={{padding:"1.5vh"}}>{compare_companies[0]}</div>
            {compare_companies.slice(1,).map((data, i) => {
              return <div key={i} style={{ textAlign: 'center', padding:"1.5vh"}}>{data}</div>;
            })}
            {/* <div> */}
            {CompareData['Category']['端點偵測分析'].map((item, index) => (
              <React.Fragment key={index}>
                <div className={Cstyle.functions}>{item}</div>
                {Object.values(CompareData['Companies-comparison']['EDR']).map((data, i) => (
                  <div key={i} className={Cstyle.tContent}>{data[item]}</div>
                ))}
               </React.Fragment>
            ))}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
