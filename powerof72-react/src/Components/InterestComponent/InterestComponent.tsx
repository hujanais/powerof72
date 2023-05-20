import React from 'react';
import './InterestComponent.scss';
import { InterestResult } from '../../Models/data-model';

export type InterestComponentProps = {
    apr_apy: InterestResult;
};

export const InterestComponent = (props: InterestComponentProps) => {
    const formatDigits = (val: number) => {
        return val.toFixed(2);
    };

    const apr_apy = props.apr_apy;

    return (
        <div className="interest-container">
            <div className="grid-item">APY(no-divs)</div>
            <div className="grid-item">{formatDigits(apr_apy.apy_nodivs)}</div>
            <div className="grid-item">APY</div>
            <div className="grid-item">{formatDigits(apr_apy.apy_divs)}</div>
            <div className="grid-item">APR(no-divs)</div>
            <div className="grid-item">{formatDigits(apr_apy.apr_nodivs)}</div>
            <div className="grid-item">APR</div>
            <div className="grid-item">{formatDigits(apr_apy.apr_divs)}</div>
        </div>
    );
};
