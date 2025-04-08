
import { TreeDeciduous, Leaf, Recycle, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileNavigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50">
      <NavItem 
        icon={<TreeDeciduous size={20} />} 
        label="Beranda" 
        link="/" 
        active={isActive('/')} 
      />
      <NavItem 
        icon={<Leaf size={20} />} 
        label="Program" 
        link="/programs" 
        active={isActive('/programs')} 
      />
      <NavItem 
        icon={<Recycle size={20} />} 
        label="Layanan" 
        link="/services" 
        active={isActive('/services')} 
      />
      <NavItem 
        icon={<Info size={20} />} 
        label="Info" 
        link="/about" 
        active={isActive('/about')} 
      />
    </div>
  );
};

const NavItem = ({ 
  icon, 
  label, 
  link, 
  active = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  link: string; 
  active?: boolean 
}) => (
  <Link 
    to={link} 
    className={`flex flex-col items-center px-2 ${active ? 'text-green-600' : 'text-gray-500'}`}
  >
    <div>{icon}</div>
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default MobileNavigation;
