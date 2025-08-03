import axios from 'axios'
import { CompanyBalanceSheet, CompanyCashFlow, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyTenK } from './company';

export interface SearchResponse {
    data: CompanySearch[];
};

export const searchCompanies = async (query: string) => {
    try {
        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=${process.env.REACT_APP_FMPKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_FMPKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getKeyMetrics = async (query: string) => {
    try {
        const data = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${process.env.REACT_APP_FMPKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getIncomeStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_FMPKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getBalanceSheet = async (query: string) => {
    try {
        const data = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.REACT_APP_FMPKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getCashFlowStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyCashFlow[]>(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.REACT_APP_FMPKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getTenK = async (query: string) => {
    try {
        const data = await axios.get<CompanyTenK[]>(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.REACT_APP_FMPKey}`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};