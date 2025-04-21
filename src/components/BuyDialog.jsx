import { useState, useEffect, useContext } from "react";

import { motion } from "framer-motion";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";
import GlobalContext from "../GlobalContext";

const BuyDialog = ({ open, onClose, symbol, price }) => {
  const [responseOk, setResponseOk] = useState(false);
  const {navbarRefresh, setNavbarRefresh} = useContext(GlobalContext);
  const [quantityHeld, setQuantity] = useState("...");
  const [buyquantity, setBuyQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const username = localStorage.getItem("username");
  useEffect(() => {
    if(open) {
      fetch(`https://finapi.rrex.cc/getQtyOwned?username=${username}&symbol=${symbol}`)
        .then(response => response.json())
        .then(data => setQuantity(data.quantity));
    }
  }, [open, username, symbol])
  const updateTotal = () => {
    let total = (buyquantity * price).toFixed(2)
    setTotal(total==="NaN" ? 0 : total);
  }
  useEffect(() => {
    updateTotal();
  }, [buyquantity, price]);
  if (!open) {
    return null;
  }
  const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const quantity = Number(formData.get("buyquantity"));
      if (isNaN(quantity) || quantity <= 0) {
        toast.error("Please enter a valid quantity");
        return;
      }
      fetch(`https://finapi.rrex.cc/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          symbol: symbol,
          quantity: quantity
      })
      })
        .then(async response => {
          const data = await response.json();
          console.log(data);
          if(response.ok) {
            toast.success(data.detail);
          } else {
            toast.error(data.detail);
          }
          setNavbarRefresh(true);
        })
        .catch(error => {
          console.error(error);
          toast.error(error.message);

        });

      onClose();
  };

  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 1000,
        damping: 100
      },
      duration: 200
    }
  };

  return (
    <motion.div
      className={`text-mercury-200 text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-woodsmoke-900 border-woodsmoke-700 border rounded-lg p-4 shadow-3xl/70 w-11/12 md:w-1/2`}
      variants={popupVariants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
    >
        <form
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center">
            <label className="text-mercury-200 font-bold" htmlFor="quantity">Quantity:</label>
            <button
              className="text-mercury-200 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500"
              type="button"
              onClick={onClose}
            >
            <FaX />
            </button>
          </div>
          <div className="my-4 text-mercury-400 text-lg font-medium">Owned: {quantityHeld}</div>
          <input
            className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            type="text"
            pattern="^\d+(\.\d{1,2})?$"
            inputMode="decimal"
            id="buyquantity"
            name="buyquantity"
            required
            onChange={(e) => setBuyQuantity(parseFloat(e.target.value))}
          />
          {price && <div className="my-4 text-mercury-200 text-lg font-medium">Price: {price}</div>}
          {price && <div className="text-mercury-200 text-2xl font-semibold">Total: {total}</div>}
          
          <div className="flex justify-between items-center">
            <button
              className="w-full mt-6 py-3 border-transparent text-mercury-200 bg-gradient-to-br from-fuchsia-500 to-san-marino-500 rounded-lg text-lg border font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500"
              type="submit"
            >
              Buy
            </button>
          </div>
        </form>
    </motion.div>
  );
};

export default BuyDialog;
