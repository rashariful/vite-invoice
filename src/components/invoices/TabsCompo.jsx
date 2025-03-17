
const TABS = [
  { key: "all", label: "All Orders", color: "bg-indigo-500" },
  { key: "pending", label: "Pending", color: "bg-rose-500" },
  { key: "ready to delivery", label: "Ready To Delivery", color: "bg-amber-500" },
  { key: "delivered", label: "Delivered", color: "bg-green-500" },
];

const TabsCompo = ({ activeTab:activeKey, handleTabChange }) => {

  return (
    <div className="relative dark:bg-gray-200 backdrop-blur-sm p-2 rounded-lg">
      <div className="flex gap-2">
        {TABS.map(({ key, label, color }) => (
          <button
        
          key={key}
          onClick={() => handleTabChange(key)}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            activeKey === key ? `${color} text-white` : "bg-gray-50 text-gray-700"
          }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsCompo;
