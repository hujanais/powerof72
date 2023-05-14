import React from 'react';
import { SAResponse } from '../../Models/data-model';
import GraphComponent from '../GraphComponent/GraphComponent';
import { TableComponent } from '../TableComponent/TableComponent';
import './ResultComponent.scss';

export type ResultComponentProps = {
  jsonArr: SAResponse[];
};

export const ResultComponent = (props: ResultComponentProps) => {
  return (
    <div className='results-container'>
      <div className='results-container__table'>
        <div className='div-table'>
          <TableComponent jsonArr={props.jsonArr}></TableComponent>
        </div>
      </div>
      <div className='results-container__graph'>
        <div className='div-graph'>
          <GraphComponent jsonArr={props.jsonArr}></GraphComponent>
        </div>
      </div>
    </div>
  );
};
