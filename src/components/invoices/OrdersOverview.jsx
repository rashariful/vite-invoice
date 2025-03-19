import { IoTodayOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { useMemo } from "react";

const OrderCard = ({
  title,
  value,
  icon,
  bgColor,
  textColor,
  iconColor,
  subText,
  growth,
  onClick,
}) => (
  <div
    className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100 dark:border-slate-200 cursor-pointer"
    onClick={onClick}
  >
    <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-lg ${bgColor}`}>
      <span className={`h-8 w-8 ${textColor} text-${iconColor}`}>{icon}</span>
    </div>
    <div>
      <p className="text-sm font-medium text-slate-900 dark:text-slate-700">
        {title}
      </p>
      <div className="flex items-end gap-1">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-900">
          {value}
        </h3>
        {growth && (
          <span className="text-xs font-medium text-green-600 dark:text-green-400 pb-1">
            {growth}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-600">{subText}</p>
    </div>
  </div>
);


const OrdersOverview = ({
  allData,
  todayInvoices,
  yesterdayInvoices,
  weeklyInvoices,
  monthlyInvoices,
  handleFilterChange
}) => {
  // const ordersData = useMemo(
  //   () => [
  //     {
  //       title: "Total Orders",
  //       value: allData?.data?.length ?? 0,
  //       iconColor: "text-indigo-600 dark:text-indigo-400",
  //       icon: <IoTodayOutline size={35} />,
  //       bgColor: "bg-indigo-50 dark:bg-indigo-200", // Total Orders,
  //       textColor: "text-slate-900 dark:text-indigo-400",
  //       subText: "All time",
  //     },
  //     {
  //       title: "Today's Orders",
  //       value: todayInvoices?.length ?? 0,
  //       iconColor: "text-purple-600 dark:text-purple-400",
  //       icon: <SlCalender size={35} />,
  //       bgColor: "bg-purple-50 dark:bg-purple-200", // Today's Orders

  //       textColor: "text-blue-600 dark:text-indigo-400",
  //       subText: "Today's Orders",
  //     },
  //     {
  //       title: "Yesterday's Orders",
  //       value: yesterdayInvoices?.length ?? 0,
  //       iconColor: "text-green-600 dark:text-green-400",
  //       icon: <SlCalender size={35} />,
  //       bgColor: "bg-green-50 dark:bg-green-200", // yesterday Orders

  //       textColor: "text-blue-600 dark:text-indigo-400",
  //       subText: "Yesterday",
  //     },
  //     {
  //       title: "Weekly's Orders",
  //       value: weeklyInvoices?.length ?? 0,
  //       iconColor: "text-green-600 dark:text-green-400",
  //       icon: <SlCalender size={35} />,
  //       bgColor: "bg-green-50 dark:bg-green-200", // yesterday Orders

  //       textColor: "text-blue-600 dark:text-indigo-400",
  //       subText: "Last 7 days",
  //     },
  //     {
  //       title: "Monthly Orders",
  //       value: monthlyInvoices?.length ?? 0,
  //       iconColor: "text-pink-600 dark:text-pink-400",
  //       icon: <SlCalender size={35} />,
  //       bgColor: "bg-pink-50 dark:bg-pink-200", // Monthly Orders

  //       textColor: "text-blue-600 dark:text-indigo-400",
  //       subText: "This month",
  //     },
  //   ],
  //   [allData, TodayOrders, weeklyOrders, monthlyOrders]
  // );


 
  
  const ordersData = useMemo(
    () => [
      {
        title: "Total Orders",
        value: allData?.data?.length ?? 0,
        iconColor: "text-indigo-600 dark:text-indigo-400",
        icon: <IoTodayOutline size={35} />,
        bgColor: "bg-indigo-50 dark:bg-indigo-200",
        textColor: "text-slate-900 dark:text-indigo-400",
        subText: "All time",
        onClick: () => handleFilterChange("total", allData?.data),
      },
      {
        title: "Today's Orders",
        value: todayInvoices?.length ?? 0,
        iconColor: "text-purple-600 dark:text-purple-400",
        icon: <SlCalender size={35} />,
        bgColor: "bg-purple-50 dark:bg-purple-200",
        textColor: "text-blue-600 dark:text-indigo-400",
        subText: "Today's Orders",
        onClick: () => handleFilterChange("today", todayInvoices),
      },
      {
        title: "Yesterday's Orders",
        value: yesterdayInvoices?.length ?? 0,
        iconColor: "text-green-600 dark:text-green-400",
        icon: <SlCalender size={35} />,
        bgColor: "bg-green-50 dark:bg-green-200",
        textColor: "text-blue-600 dark:text-indigo-400",
        subText: "Yesterday",
        onClick: () => handleFilterChange("yesterday", yesterdayInvoices),
      },
      {
        title: "Weekly's Orders",
        value: weeklyInvoices?.length ?? 0,
        iconColor: "text-green-600 dark:text-green-400",
        icon: <SlCalender size={35} />,
        bgColor: "bg-green-50 dark:bg-green-200",
        textColor: "text-blue-600 dark:text-indigo-400",
        subText: "Last 7 days",
        onClick: () => handleFilterChange("weekly", weeklyInvoices),
      },
      {
        title: "Monthly Orders",
        value: monthlyInvoices?.length ?? 0,
        iconColor: "text-pink-600 dark:text-pink-400",
        icon: <SlCalender size={35} />,
        bgColor: "bg-pink-50 dark:bg-pink-200",
        textColor: "text-blue-600 dark:text-indigo-400",
        subText: "This month",
        onClick: () => handleFilterChange("monthly", monthlyInvoices),
      },
    ],
    [allData, todayInvoices, yesterdayInvoices, weeklyInvoices, monthlyInvoices]
  );
  



  // console.log({todayInvoices, yesterdayInvoices, weeklyInvoices, monthlyInvoices}, "details invoice data")
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {ordersData.map((order, index) => (
        <OrderCard key={index} {...order} />
      ))}
    </div>
  );
};

export default OrdersOverview;
