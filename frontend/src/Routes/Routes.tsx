import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatment from "../Components/IncomeStatment/IncomeStatment";
import DesignPage from "../Pages/DesignPage/DesignPage";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatement/CashFlowStatement";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "search", element: <SearchPage /> },
            { path: "design-guide", element: <DesignPage /> },
            { path: "company/:ticker", element: <CompanyPage />,
            children: [
                { path: "company-profile", element: < CompanyProfile /> },
                { path: "income-statement", element: < IncomeStatment /> },
                { path: "balance-sheet", element: < BalanceSheet /> },
                { path: "cashflow-statement", element: < CashFlowStatement /> },
            ]},
        ]
    }
])