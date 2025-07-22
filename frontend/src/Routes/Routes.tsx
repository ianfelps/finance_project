import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatment from "../Components/IncomeStatment/IncomeStatment";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "search", element: <SearchPage /> },
            { path: "company/:ticker", element: <CompanyPage />,
            children: [
                { path: "company-profile", element: < CompanyProfile /> },
                { path: "income-statement", element: < IncomeStatment /> },
            ]},
        ]
    }
])