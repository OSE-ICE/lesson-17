import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onToggleAdminMode: () => void;
  isAdminMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleAdminMode, isAdminMode }) => {
  const router = useRouter();

  const navigateToPage2 = () => {
    router.push("/page2");
  };

  return (
    <header>
      <Link href="/">
        <h1>Router Expense App</h1>
      </Link>
      <div className="links">
        <Link href="/about">
          <p>About</p>
        </Link>
        <button className="button" onClick={navigateToPage2}>
          Page 2
        </button>
        <p>Page 3</p>
      </div>
      <button onClick={onToggleAdminMode}>
        {isAdminMode ? "Disable Admin Mode" : "Enable Admin Mode"}
      </button>
    </header>
  );
};

export default Header;
