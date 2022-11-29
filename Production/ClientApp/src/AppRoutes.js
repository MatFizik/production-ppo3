import { Home } from "./components/Home";
import ReadyProduct from "./components/ReadyProduct";
import React from "react";
import Budget from "./components/Budget";
import Posts from "./components/Posts";
import Staff from "./components/Staff";
import FeedStock from "./components/FeedStock";
import Measure from "./components/Measure";
import Ingridient from "./components/Ingridient";
import ProdProduct from "./components/ProdProduct";
import PurchaseStock from "./components/PurchaseStock";
import SaleProduct from "./components/SaleProduct";
import Main from "./components/Main";

const AppRoutes = [
  {
    index: true,
    //path: '/main',
    element: <Main />
  },
  {
    path: '/ready-product',
    element: <ReadyProduct />
  },
  {
    path: '/budget',
    element: <Budget />
  },
  {
    path: '/posts',
    element: <Posts />
  },
  {
    path: '/staff',
    element: <Staff />
  },
  {
    path: '/feed-stock',
    element: <FeedStock />
  },
  {
    path: '/measures',
    element: <Measure />
  },
  {
    path: '/ingridients',
    element: <Ingridient />
  },
  {
    path: '/prod-product',
    element: <ProdProduct />
  },
  {
    path: '/purchase-feedstock',
    element: <PurchaseStock />
  },
  {
    path: '/sale-product',
    element: <SaleProduct />
  }
];
export default AppRoutes;
