import { FC, JSX } from "react";
import {
  Home,
  User,
  CreditCard,
  DollarSign,
  FileText,
  Book,
  Server,
  Box,
  Settings,
  Eye,
  Code,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: JSX.Element | null;
  active?: boolean;
}

// const mainItems: NavItem[] = [
//   { label: "Overview", icon: <Home size={16} /> },
//   { label: "Products", icon: <User size={16} />, active: true },
//   { label: "Reviews", icon: <Book size={16} /> },
//   { label: "Disputes", icon: <RefreshCw size={16} /> },
//   { label: "Top-ups", icon: <DollarSign size={16} /> },
//   { label: "Check deposits", icon: <CreditCard size={16} /> },
//   { label: "Payouts", icon: <CreditCard size={16} /> },
//   { label: "All transactions", icon: <Layers size={16} /> },
// ];
const mainItems: NavItem[] = [
  { label: "Overview", icon: <Home size={16} /> },
  { label: "Products", icon: <User size={16} />, active: true },
  { label: "Reviews", icon: null },
  { label: "Disputes", icon: null },
  { label: "Top-ups", icon: null },
  { label: "Check deposits", icon: null },
  { label: "Payouts", icon: null },
  { label: "All transactions", icon: null },
];
const secondaryItems: NavItem[] = [
  { label: "Balances", icon: <DollarSign size={16} /> },
  { label: "Payments", icon: <CreditCard size={16} /> },
  { label: "Connected accounts", icon: <Server size={16} /> },
  { label: "Products", icon: <Box size={16} /> },
  { label: "Readers", icon: <FileText size={16} /> },
  { label: "Reports", icon: <Book size={16} /> },
  { label: "Issued cards", icon: <CreditCard size={16} /> },
];

const bottomItems: NavItem[] = [
  { label: "Developers", icon: <Code size={16} /> },
  { label: "View test data", icon: <Eye size={16} /> },
  { label: "Settings", icon: <Settings size={16} /> },
];

const Sidebar: FC = () => {
  const renderItem = (item: NavItem) => (
    <li
      key={item.label}
      className={`flex items-center gap-2 px-5 py-2 text-sm rounded-md cursor-pointer hover:bg-gray-100 ${
        item.active ? "bg-blue-100 text-blue-600 font-medium font-family-inter" : "text-textColor font-family-inter" 
      }`}
    >
      {item.icon?.type ? item.icon : <span className="w-4 h-4 inline-block" />}
      <span>{item.label}</span>
    </li>
  );

  return (
    <aside className="w-64 h-screen bg-sidePanelColor p-7 flex flex-col border-r-2 border-sidePanelBorderColor justify-between">
      <div>
        <h1 className="text-[24px] font-bold mb-4 px-2 text-textColor font-family-inter">FakeApp</h1>
        <ul className="space-y-1">{mainItems.map(renderItem)}</ul>
        <div className="my-5" />
        <ul className="space-y-1">{secondaryItems.map(renderItem)}</ul>
      </div>
      <ul className="space-y-1">{bottomItems.map(renderItem)}</ul>
    </aside>
  );
};

export default Sidebar;
