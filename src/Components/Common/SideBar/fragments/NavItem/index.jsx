import { Link, useLocation } from "react-router";
import { useSidebarStore } from "../../../../../store/sidebarStore";

const NavItem = ({ item }) => {
  const location = useLocation();
  const {
    activeItem,
    setActiveItem,
    openSubmenus,
    toggleSubmenu,
    isCollapsedDesktop,
    closeMobile,
  } = useSidebarStore();

  const isSubmenuOpen = !!openSubmenus[item.id];
  const isCurrentPath =
    (item.href && item.href !== "#" && location.pathname === item.href) ||
    (item.subItems &&
      item.subItems.some(
        (sub) => sub.href && sub.href !== "#" && location.pathname === sub.href,
      ));

  const isActive =
    activeItem === item.id ||
    isCurrentPath ||
    (item.subItems && item.subItems.some((sub) => sub.id === activeItem));

  const IconComponent = item.icon;

  const handleClick = (e) => {
    if (item.hasSubmenu) {
      e.preventDefault();
      toggleSubmenu(item.id);
    } else {
      setActiveItem(item.id);
      if (window.innerWidth < 768) {
        closeMobile();
      }
    }
  };

  const handleSubItemClick = (e, subId) => {
    setActiveItem(subId);
    if (window.innerWidth < 768) {
      closeMobile();
    }
  };

  const isHighlighted = isActive || (item.hasSubmenu && isSubmenuOpen);

  const tooltipProps = isCollapsedDesktop
    ? {
        "data-tooltip-id": "sidebar-tooltip",
        "data-tooltip-content": item.label,
        "data-tooltip-place": "left",
      }
    : {};

  return (
    <div className="w-full select-none">
      {/* Main Item Row */}
      {item.hasSubmenu ? (
        <button
          type="button"
          onClick={handleClick}
          {...tooltipProps}
          className={`group relative w-full flex items-center justify-between py-2.5 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
            isHighlighted
              ? "text-primary font-medium"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          {/* Active Indicator Bar on Edge */}
          {isActive && (
            <span
              className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-l-full pointer-events-none transition-all duration-200"
              aria-hidden="true"
            />
          )}

          {/* In RTL: 1st child is on Right (Icon + Label) */}
          <div
            className={`flex items-center gap-3 ${
              isCollapsedDesktop ? "mx-auto" : ""
            }`}
          >
            <div
              className={`transition-colors duration-200 shrink-0 ${
                isHighlighted
                  ? "text-primary"
                  : "text-[#777777] group-hover:text-primary"
              }`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            {!isCollapsedDesktop && (
              <span className="text-[14.5px] leading-none">{item.label}</span>
            )}
          </div>

          {/* In RTL: 2nd child is on Left (Chevron) */}
          {!isCollapsedDesktop && (
            <svg
              className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                isSubmenuOpen
                  ? "rotate-180 text-primary"
                  : "text-gray-400 group-hover:text-primary"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
      ) : (
        <Link
          to={item.href || "#"}
          onClick={handleClick}
          {...tooltipProps}
          className={`group relative w-full flex items-center justify-between py-2.5 px-3 rounded-xl transition-all duration-200 ${
            isHighlighted
              ? "text-primary font-medium"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          {/* Active Indicator Bar on Edge */}
          {isActive && (
            <span
              className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-l-full pointer-events-none transition-all duration-200"
              aria-hidden="true"
            />
          )}

          <div
            className={`flex items-center gap-3 ${
              isCollapsedDesktop ? "mx-auto" : ""
            }`}
          >
            <div
              className={`transition-colors duration-200 shrink-0 ${
                isHighlighted
                  ? "text-primary"
                  : "text-[#777777] group-hover:text-primary"
              }`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            {!isCollapsedDesktop && (
              <span className="text-[14.5px] leading-none">{item.label}</span>
            )}
          </div>
        </Link>
      )}

      {/* Submenu Accordion */}
      {item.hasSubmenu && !isCollapsedDesktop && (
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isSubmenuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="bg-[#F6F8FB] rounded-2xl py-3 px-4 my-1.5 flex flex-col gap-2.5 mr-2 ml-1">
              {item.subItems.map((sub) => {
                const isSubActive =
                  activeItem === sub.id ||
                  (sub.href && sub.href !== "#" && location.pathname === sub.href);
                return (
                  <Link
                    key={sub.id}
                    to={sub.href || "#"}
                    onClick={(e) => handleSubItemClick(e, sub.id)}
                    className={`group flex items-center justify-start gap-1.5 text-[13px] transition-colors duration-150 py-0.5 ${
                      isSubActive
                        ? "text-primary font-medium"
                        : "text-gray-500 hover:text-primary"
                    }`}
                  >
                    <span className="text-gray-400 group-hover:text-primary transition-colors select-none">
                      _
                    </span>
                    <span>{sub.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;
