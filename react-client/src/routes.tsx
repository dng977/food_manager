import React, { Component } from 'react';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/Signin';
import Welcome from './components/Welcome';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import FoodStock from './components/dashboard/pages/foodstock_page/FoodStock';
import Receipts from './components/dashboard/pages/receipts_page/Receipts';
import NutritionState from './components/dashboard/pages/nutritionstate_page/NutritionState';
import Settings from './components/dashboard/pages/settings_page/Settings';
import ReceiptPage from './components/dashboard/pages/receipts_page/receipt_page/ReceiptPage';
import BodyDetails from './components/auth/BodyDetails';
import MealPage from './components/dashboard/pages/foodstock_page/meals/MealPage';
import MealNutrition from './components/dashboard/pages/foodstock_page/meals/MealNutrition';
import TimelineIcon from '@mui/icons-material/Timeline';
import Diary from './components/dashboard/pages/diary_page/Diary';

const dashboardPath = '/dashboard';
export const dashboardRoutes = [
  {
    path: dashboardPath + "/foodstock",
    component: FoodStock,
    Icon: FastfoodIcon,
    title: 'Food Stock',
    exact: true
  },

  {
    path: dashboardPath + "/nutrition",
    component: NutritionState,
    Icon: AssessmentIcon,
    title: 'Nutrition State'
  },
  {
    path: dashboardPath + "/diary",
    component: Diary,
    Icon: TimelineIcon,
    title: 'Food Diary'
  },
  {
    path: dashboardPath + "/receipts", 
    component: Receipts,
    Icon: ReceiptIcon,
    title: 'Receipts',
    exact: true

  },
  {
    path: dashboardPath + "/settings",
    component: Settings,
    Icon: SettingsIcon,
    title: 'Settings'
  },
  {
    path: dashboardPath + "/receipts" + "/:id",
    component: ReceiptPage,
    Icon: ReceiptIcon,
    title: 'Receipts',
    exact: true
  },
  {
    path: dashboardPath + "/foodstock/meal" + "/:id",
    component: MealPage,
    Icon: FastfoodIcon,
    title: 'Food Stock',
    exact: true

  }
  ,
  {
    path: dashboardPath + "/foodstock/meal" + "/:id" + "/nutrition",
    // render: (func) => {func(); return <MealNutrition/>;},
    component: MealNutrition,
    Icon: FastfoodIcon,
    title: 'Meal Nutrition',
    exact: true

  }
];

export const routes: any = [
  {
    path: '/bodydetails',
    component: BodyDetails
  },
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
    //@ts-ignore  
    component: () => <Dashboard routes={dashboardRoutes} />,
  },
  {
    path: "/signin",
    component: SignIn
  },
]

export const getPathRegex = (path) => {
  let regex = "^" + path + "$"
  if (regex.includes(":id")){
    return new RegExp(regex.replace(":id","\\d+"))
  }
  else
    return new RegExp(regex)
}



