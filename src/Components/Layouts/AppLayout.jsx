import { Outlet, ScrollRestoration, useMatches } from "react-router";
import { useSidebarStore } from "../../store/sidebarStore";
import Header from "../Common/Header/index";
import Sidebar from "../Common/SideBar";
import PageLable from "../UI/PageLable";
import ToastContainer from "../UI/Toast/ToastContainer";

function AppLayout() {
  const { openMobile, isOpenMobile } = useSidebarStore();
  const matches = useMatches();

  // Find the deepest route with a title handle
  const currentMatch = [...matches].reverse().find((m) => m.handle?.title);
  const pageTitle = currentMatch?.handle?.title || "داشبورد";
  const pageColor = currentMatch?.handle?.bgColor || "bg-amber-500";
  const pageIconColor = currentMatch?.handle?.iconColor || "text-amber-500";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased text-gray-800">
      {/* Floating Hamburger Menu Button on Mobile (Right Side) */}
      {!isOpenMobile && (
        <button
          type="button"
          onClick={openMobile}
          aria-label="باز کردن منو"
          className="fixed top-4 right-4 z-40 md:hidden size-12 bg-white text-gray-700 shadow-xl shadow-blue-900/5 rounded-2xl border border-gray-100 flex items-center justify-center hover:text-primary hover:border-blue-200 active:scale-90 transition-all duration-200 cursor-pointer group"
        >
          <svg
            className="w-6 h-6 stroke-current transition-transform duration-200 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      )}

      <main id="application" className="flex flex-1 relative">
        <Sidebar />

        <section
          className="flex-1 p-4 md:p-6 overflow-x-hidden min-w-0 flex flex-col"
          id="content"
        >
          {/* Global Top Bar: Page Title on Right, Wallet & Profile on Left */}
          <div className="flex items-center justify-between gap-3 mb-6 ps-14 md:ps-0 transition-all">
            <PageLable
              lable={pageTitle}
              className="!mb-0"
              bgColor={pageColor}
              iconColor={pageIconColor}
            />

            <Header />
          </div>

          {/* Current Page Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </section>
      </main>

      <ToastContainer />
      <ScrollRestoration />
    </div>
  );
}

export default AppLayout;
