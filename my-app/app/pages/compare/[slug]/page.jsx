'use client';
import React, { useState } from 'react';
import Cstyle from '../../styles/compare.module.css';
import CompareData from '../../../app/compare.json'


const Compare = () => {
  <div className={Cstyle.main}>
    <table className={Cstyle.table}>
      <thead>
        <tr>
          <th rowSpan={CompareData.Category["EDR-indicators"].length}></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>;
};

export default Compare;
