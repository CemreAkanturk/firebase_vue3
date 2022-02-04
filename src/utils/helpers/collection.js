

export const getPaymentObject = ( operation ) => {
	const today = new Date();
	 if (operation == 0)
	   return {
		date: today.toISOString().slice(0, 10),
		description: "",
		sum: null,
		operation: { id: 0, name: "Nakit Ödeme" },
	   };
	 else
	   return {
		date: today.toISOString().slice(0, 10),
		expiry_date: new Date(today.setMonth(today.getMonth() + 1)).toISOString().slice(0, 10),
		description: "",
		sum: null,
		bank: "",
		check_no: "",
		operation: { id: 1, name: "Çek Ödeme" },
	   };
    };
    