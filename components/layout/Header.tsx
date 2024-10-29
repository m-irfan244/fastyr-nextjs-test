// Header.tsx
import { Menu } from "lucide-react"; // Import icon for menu toggle

type HeaderProps = {
  onToggleSidebar: () => void;
};

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <button
          onClick={onToggleSidebar}
          className="sm:hidden p-2 text-gray-600"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold flex-1">Fastyr Dashboard</h1>
      </div>
    </header>
  );
}
