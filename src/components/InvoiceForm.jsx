import { useEffect, useState } from "react";
import { uid } from "uid";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import { useGetAllInvoiceQuery } from "../redux/api/invoiceApi";
import icchaporon from "../../src/img/logo-ip.png";
import ifashion from "../../src/img/I Fashion Logo.png";
import mi from "../../src/img/images.png";
import { useGetAllShopQuery } from "../redux/api/shopApi";
const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const InvoiceForm = () => {
  const { data: allData, isLoading: allInvoiceLoading } =
    useGetAllInvoiceQuery();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (allData) {
      setInvoices(allData.data);
    }
  }, [allData]);
  // Extract last orderId
  const orderId = parseInt(invoices[0]?.orderId) + 1;
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [note, setNote] = useState("");
  const [deliveryAmount, setDeliveryAmount] = useState("");
  const [paid, setPaid] = useState("");
  const {
    data: shops,
    isLoading: isShopLoading,
    isFetching: isShopFetching,
  } = useGetAllShopQuery(undefined);

  const [shop, setShop] = useState({
    name: shops?.data[0]?.name,
    image: shops?.data[0]?.image,
    address: shops?.data[0]?.address,
  });
  const [customerName, setCustomerName] = useState("");
  const [customerContactNo, setCustomerContactNo] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const [items, setItems] = useState([
    {
      id: uid(6),
      name: "",
      qty: 1,
      price: "",
      amount: "",
    },
  ]);

  const { isloading } = useGetAllInvoiceQuery();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: "",
        qty: 1,
        price: "",
        amount: "",
      },
    ]);
  };

  const addNextInvoiceHandler = () => {
    setCustomerName("");
    setCustomerContactNo("");
    setCustomerAddress("");
    setItems([
      {
        id: uid(6),
        name: "",
        qty: 1,
        price: "",
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  items.forEach((obj) => {
    const qty = parseFloat(obj.qty);
    const price = parseFloat(obj.price);
    const amount = qty * price;
    obj.amount = amount.toString();
  });

  const subTotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  const deliveryCharge = parseInt(deliveryAmount);
  const paidAmount = parseInt(paid);
  const grandTotal = isNaN(deliveryCharge)
    ? subTotal
    : subTotal + deliveryCharge;
  const due = isNaN(paidAmount) ? grandTotal : grandTotal - paidAmount;

  if (isloading || allInvoiceLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <form
        className="relative flex flex-col px-2 md:flex-row"
        onSubmit={reviewInvoiceHandler}
      >
        <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 ">
          <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
            <div className="flex space-x-2">
              <span className="font-bold">Current Date: </span>
              <span>{today}</span>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-bold" htmlFor="invoiceNumber">
                Invoice Number:
              </label>
              <input
                disabled
                className="max-w-[130px] bg-slate-100 p-1 rounded-md"
                type="text"
                name="invoiceNumber"
                id="invoiceNumber"
                min="1"
                step="1"
                value={orderId}
              />
            </div>
          </div>
          <h1 className="text-center text-lg font-bold">INVOICE</h1>

          <div className="grid grid-cols-2 gap-5 pt-4 pb-8">
            <div>
              <label
                htmlFor="cashierName"
                className="text-sm font-bold sm:text-base"
              >
                Cashier Info:
              </label>

              <select
                name="cashierName"
                required
                id="cashierName"
                className="bg-slate-100 p-2 rounded-md"
                value={shop.name}
                onChange={(event) => {
                  const selectedOption =
                    event.target.options[event.target.selectedIndex];
                  const selectedValue = event.target.value;
                  const selectedImage =
                    selectedOption.getAttribute("data-image");
                  const selectedAddress =
                    selectedOption.getAttribute("data-address");
                  setShop({
                    name: selectedValue,
                    image: selectedImage,
                    address: selectedAddress,
                  });
                }}
              >
                <option disabled>Select a store</option>
                {shops?.data.map((shop) => (
                  <option
                    key={shop.id}
                    value={shop.name}
                    data-image={shop.image}
                    data-address={shop.address}
                  >
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="customerName"
                className="text-sm font-bold md:text-base"
              >
                Customer Name:
              </label>
              <input
                required
                className="bg-slate-100 p-2 rounded-md"
                type="text"
                name="customerName"
                id="customerName"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="customerName"
                className="text-sm font-bold md:text-base"
              >
                Customer Phone:
              </label>
              <input
                required
                className="bg-slate-100 p-2 rounded-md"
                type="number"
                name="customerName"
                id="customerName"
                value={customerContactNo}
                onChange={(event) => setCustomerContactNo(event.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="customerName"
                className="text-sm font-bold md:text-base"
              >
                Customer Address:
              </label>
              <input
                required
                className="bg-slate-100 p-2 rounded-md"
                type="text"
                name="customerName"
                id="customerName"
                value={customerAddress}
                onChange={(event) => setCustomerAddress(event.target.value)}
              />
            </div>
          </div>
          <table className="text-left">
            <thead>
              <tr className="border-b ">
                <th>ITEM</th>
                <th className="text-center">QTY</th>
                <th className="text-center">PRICE</th>
                <th className="text-center">AMOUNT</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <InvoiceItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  qty={item.qty}
                  price={item.price}
                  onDeleteItem={deleteItemHandler}
                  onEdtiItem={edtiItemHandler}
                />
              ))}
            </tbody>
          </table>
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="button"
            onClick={addItemHandler}
          >
            Add Item
          </button>
          <div className="flex flex-col items-end space-y-2 pt-6">
            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Subtotal:</span>
              <span>Tk. {subTotal.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Delivery Charge:</span>
              <span>
                Tk.{" "}
                {isNaN(deliveryCharge)
                  ? "0.00"
                  : deliveryCharge.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Total:</span>
              <span>
                Tk. {isNaN(grandTotal) ? "0.00" : grandTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Paid Amount:</span>
              <span>
                Tk.{" "}
                {isNaN(paidAmount) ? "0.00" : paidAmount.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
              <span className="font-bold">Due:</span>
              <span className="font-bold">
                Tk. {isNaN(due) ? "0.00" : due.toFixed(0)}
              </span>
            </div>
          </div>
        </div>
        <div className="basis-1/4 bg-transparent">
          <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
            <button
              className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
              type="submit"
            >
              Review Invoice
            </button>
            <InvoiceModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              invoiceInfo={{
                orderId,
                shop,
                customerName,
                customerContactNo,
                customerAddress,
                subTotal,
                paidAmount,
                due,
                deliveryCharge,
                grandTotal,
                note,
              }}
              items={items}
              onAddNextInvoice={addNextInvoiceHandler}
            />
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-bold md:text-base" htmlFor="tax">
                  Delivery Charge:
                </label>
                <div className="flex items-center">
                  <input
                    className="w-full rounded-l-md rounded-r-none bg-white p-2 shadow-sm"
                    type="number"
                    name="tax"
                    id="tax"
                    min="0.01"
                    step="0.01"
                    placeholder="0.0"
                    value={deliveryAmount}
                    onChange={(event) => setDeliveryAmount(event.target.value)}
                  />
                  <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                    $
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-bold md:text-base"
                  htmlFor="discount"
                >
                  Paid Amount:
                </label>
                <div className="flex items-center">
                  <input
                    className="w-full rounded-l-md rounded-r-none p-2 bg-white shadow-sm"
                    type="number"
                    name="discount"
                    id="discount"
                    min="0"
                    step="0.01"
                    placeholder="0.0"
                    value={paid}
                    onChange={(event) => setPaid(event.target.value)}
                  />
                  <span className="rounded-r-md bg-gray-200 p-2 px-4 text-gray-500 shadow-sm">
                    $
                  </span>
                </div>
              </div>

              <div className="py-5 text-right">
                <div className="space-y-4">
                  <a
                    onClick={toggleVisibility}
                    className="rounded-sm cursor-pointer bg-blue-300 px-3 py-1 text-xs text-white hover:bg-blue-500 focus:outline-none focus:ring"
                  >
                    add a note
                  </a>
                  {isVisible && (
                    <textarea
                      className="bg-white p-2 rounded-md"
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      rows={5}
                      cols={36}
                      placeholder="Type something here..."
                      // Add any additional props or styling as needed
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
