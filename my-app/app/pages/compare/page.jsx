'use client';
import React, { useState } from 'react';
import Cstyle from '../../styles/compare.module.css';
import CompareData from '../../../app/compare.json';

export default function Compare() {
  return (
    <div className={Cstyle.main}>
      <div className={Cstyle.subMain}>
        <div className={Cstyle.title}>產品功能比較</div>
        <table className={Cstyle.tableArea}>
          <thead>
            <tr>
              <th rowSpan={CompareData.Category['EDR-indicators'].length}>aaa</th>
              <th>abc</th>
              <th>def</th>
            </tr>
          </thead>
          <tbody>
            {CompareData['Companies-comparison']['EDR'].map((item, index) => (
              <tr key={index}>
                <td>hahaaa</td>
                <td>gege</td>
                <td>haha</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
