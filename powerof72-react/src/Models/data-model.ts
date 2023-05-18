export type FrequencyOptions = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'biannually' | 'annually';

export type SAResponse = {
    Date: number;
    Investment: number; // the total amount that was invested
    BalanceNoDivs: number; // the cumulative total without dividend
    Balance: number; // the cumulative total with dividend re-investment
};

export type SARequest = {
    ticker: string;
    principal: number;
    addition: number;
    frequency: FrequencyOptions;
    years: number;
};

export type InterestResult = {
    apy_nodivs: number;
    apy_divs: number;
    apr_nodivs: number;
    apr_divs: number;
}