import { createBrowserRouter } from "react-router";
import AppLayout from "../Components/Layouts/AppLayout";
import {
  DashboardTemplate,
  ProfileTemplate,
  TradePanelTemplate,
  BankerTemple,
  BankStatementTemplate,
  SupportTemple,
  TicketTemplate,
  BankingActivityTemplate,
  SettingPage,
  SignUpTemplate,
  SignInTemplate,
  ForgetPasswordTempleate,
  WalletTemplate,
  InvoiceTemplate,
  TradeHistory,
  TransactionList,
  IquiryServiceTempalet,
} from "../Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardTemplate />,
        handle: {
          title: "داشبورد",
          bgColor: "bg-blue-600",
          iconColor: "text-blue-600",
        },
      },
      {
        path: "profile",
        element: <ProfileTemplate />,
        handle: {
          title: "پروفایل",
          bgColor: "bg-indigo-600",
          iconColor: "text-indigo-600",
        },
      },
      {
        path: "trade",
        element: <TradePanelTemplate />,
        handle: {
          title: "مرکز تبادل",
          bgColor: "bg-amber-500",
          iconColor: "text-amber-500",
        },
      },
      {
        path: "trade-history",
        element: <TradeHistory />,
        handle: {
          title: "تاریخچه",
          bgColor: "bg-amber-500",
          iconColor: "text-amber-500",
        },
      },
      {
        path: "bank-center",
        element: <BankerTemple />,
        handle: {
          title: "انتقال وجه",
          bgColor: "bg-emerald-600",
          iconColor: "text-emerald-600",
        },
      },
      {
        path: "activities",
        element: <BankingActivityTemplate />,
        handle: {
          title: "تراکنش",
          bgColor: "bg-emerald-600",
          iconColor: "text-emerald-600",
        },
      },
      {
        path: "bank-activity",
        element: <BankStatementTemplate />,
        handle: {
          title: "صورت حساب",
          bgColor: "bg-emerald-600",
          iconColor: "text-emerald-600",
        },
      },
      {
        path: "transactionList",
        element: <TransactionList />,
        handle: {
          title: "مدیریت حساب",
          bgColor: "bg-teal-600",
          iconColor: "text-teal-600",
        },
      },
      {
        path: "inquiry-service",
        element: <IquiryServiceTempalet />,
        handle: {
          title: "سرویس استعلام",
          bgColor: "bg-cyan-600",
          iconColor: "text-cyan-600",
        },
      },
      {
        path: "invoices",
        element: <InvoiceTemplate />,
        handle: {
          title: "فاکتور ها",
          bgColor: "bg-amber-600",
          iconColor: "text-amber-600",
        },
      },
      {
        path: "support",
        element: <SupportTemple />,
        handle: {
          title: "پشتیبانی",
          bgColor: "bg-purple-600",
          iconColor: "text-purple-600",
        },
      },
      {
        path: "support/ticket/:id",
        element: <TicketTemplate />,
        handle: {
          title: "مشاهده تیکت",
          bgColor: "bg-purple-600",
          iconColor: "text-purple-600",
        },
      },
      {
        path: "setting",
        element: <SettingPage />,
        handle: {
          title: "تنظیمات",
          bgColor: "bg-gray-600",
          iconColor: "text-gray-600",
        },
      },
      {
        path: "wallet",
        element: <WalletTemplate />,
        handle: {
          title: "کیف پول",
          bgColor: "bg-blue-500",
          iconColor: "text-blue-500",
        },
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUpTemplate />,
  },
  {
    path: "/sign-in",
    element: <SignInTemplate />,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordTempleate />,
  },
]);

export default router;
