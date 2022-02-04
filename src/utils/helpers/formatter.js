export const formatDate = (date) => {
	const _date = new Date(date);
	const day = _date.getDate();
	const month = _date.toLocaleString("en", { month: "long" });
	return `${day} ${month.slice(0,3)}`;
   };
   
   export const getWeekDay = (date) => {
	const _date = new Date(date);
	const day = _date.toLocaleString("en", { weekday: "long" });
	return `${day}`;
   };
   