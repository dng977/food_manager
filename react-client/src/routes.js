import React from 'react';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/Signin';
import Welcome from './components/Welcome';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import FoodStock from './components/dashboard/pages/FoodStock';
import Receipts from './components/dashboard/pages/Receipts';
import NutritionState from './components/dashboard/pages/NutritionState';
import Settings from './components/dashboard/pages/Settings';
import ReceiptPage from './components/dashboard/pages/receipt_page/ReceiptPage';


const dashboardPath = '/dashboard';
const dashboardRoutes = [
  {
    path: dashboardPath + "/foodstock",
    component: FoodStock,
    icon: FastfoodIcon,
    title: 'Food Stock'
  },
  {
    path: dashboardPath + "/receipts", 
    component: Receipts,
    icon: ReceiptIcon,
    title: 'Receipts',
    exact: true

  },
  {
    path: dashboardPath + "/receipts" + "/:id",
    component: ReceiptPage,
    icon: ReceiptIcon,
    title: 'Receipts',
    exact: true
  },
  {
    path: dashboardPath + "/nutrition",
    component: NutritionState,
    icon: AssessmentIcon,
    title: 'Nutrition State'
  },
  {
    path: dashboardPath + "/settings",
    component: Settings,
    icon: SettingsIcon,
    title: 'Settings'
  },
]

export const routes = [
  {
    path: '/',
    component: Welcome,
    exact: true,
  },
  { path: "/signup",
    component: Signup
  },
  {
    path: "/dashboard",
    component: () => <Dashboard routes={dashboardRoutes}/>,
  },
  {
    path: "/signin",
    component: SignIn
  },
]

export const getPathRegex = (path) => {
  let regex = "^" + path + "$"
  if (regex.includes(":id")){
    return new RegExp(regex.replace(":id","\\d"))
  }
  else
    return new RegExp(regex)
}



