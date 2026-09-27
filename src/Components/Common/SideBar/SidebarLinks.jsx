import NavItem from "./fragments/NavItem";
import { sidebarMenuItems } from "./constants/sidebarMenuItems";

function SidebarLinks() {
  return (
    <nav className="flex flex-col gap-1 w-full" aria-label="منوی اصلی">
      {sidebarMenuItems.map((item) => (
        <NavItem key={item.id} item={item} />
      ))}
    </nav>
  );
}

export default SidebarLinks;
