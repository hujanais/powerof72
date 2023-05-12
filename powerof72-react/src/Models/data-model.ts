export type FrequencyOptions = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'biannually' | 'annually'

export type SAResponse = {
    timestamp: number;
    total_nodiv: number;    // the cumulative total without dividend
    total: number;          // the cumulative total with dividend re-investment
}

export type SARequest = {
    ticker: string;
    principal: number;
    addition: number;
    frequency: FrequencyOptions;
    years: number;
}

