import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onToggleAdminMode: () => void;
  isAdminMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleAdminMode, isAdminMode }) => {
  const router = useRouter();

  const navigateToPage = (link: string) => {
    router.push(link);
  };

  return (
    <header>
      <Link href="/">
        <h1>Router Expense App</h1>
      </Link>
      <div className="links">
        <Link href="/">
          <p>Home</p>
        </Link>
        <Link href="/about">
          <p>About</p>
        </Link>
        <button className="button" onClick={() => navigateToPage("/page2")}>
          Page 2
        </button>
        <button className="button" onClick={() => navigateToPage("/page3")}>
          Page 3
        </button>
      </div>
      <button onClick={onToggleAdminMode}>
        {isAdminMode ? "Disable Admin Mode" : "Enable Admin Mode"}
      </button>
    </header>
  );
};

export default Header;
