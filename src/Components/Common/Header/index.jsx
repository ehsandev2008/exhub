import ProfileDropdown from "./fragments/ProfileDropdown";
import WalletDropdown from "./fragments/WalletDropdown";

function Header() {
  return (
    <header className="flex items-center justify-end gap-2 sm:gap-3.5 py-1 z-30">
      <WalletDropdown />
      <ProfileDropdown />
    </header>
  );
}

export default Header;
