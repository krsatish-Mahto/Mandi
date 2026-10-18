import type { ReactNode } from 'react';
import type { Village } from '../../types';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
  activeVillage?: Village | null;
  onSelectVillage?: (village: Village) => void;
}

export default function Layout({ children, onSearch, activeVillage, onSelectVillage }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-dark">
      <Navbar
        onSearch={onSearch}
        activeVillage={activeVillage}
        onSelectVillage={onSelectVillage}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
