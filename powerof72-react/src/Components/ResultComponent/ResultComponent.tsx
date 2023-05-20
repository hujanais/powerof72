import React from 'react';
import { InterestResult, SAResponse } from '../../Models/data-model';
import GraphComponent from '../GraphComponent/GraphComponent';
import { InterestComponent } from '../InterestComponent/InterestComponent';
import { TableComponent } from '../TableComponent/TableComponent';
import './ResultComponent.scss';

export type ResultComponentProps = {
    jsonArr: SAResponse[];
    apr_apy: InterestResult;
};

export const ResultComponent = (props: ResultComponentProps) => {
    return (
        <div className="results-container">
            <div className="results-container__result">
                <div>
                    <InterestComponent apr_apy={props.apr_apy}></InterestComponent>
                </div>
                <div className="div-table">
                    <TableComponent jsonArr={props.jsonArr}></TableComponent>
                </div>
            </div>
            <div className="results-container__graph">
                <GraphComponent jsonArr={props.jsonArr}></GraphComponent>
            </div>
        </div>
    );
};
