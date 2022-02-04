

export const  getPaymentObject = ( operation,status ) => {
 const today = new Date();
  if (operation == 0)
    return  {
      date: today.toISOString().slice(0, 10),
      description: "",
      sum: null
	
    };
  else
    return  {
      date: today.toISOString().slice(0, 10),
      expiry_date: new Date(today.setMonth(today.getMonth() + 1)).toISOString().slice(0, 10),
      description: "",
      sum: null,
      bank: "",
      check_no: ""
	
    };
};
