export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// export function formateDate(fmt, date) {
//   let _this = new Date(date)
//   let o = {
//     "M+": _this.getMonth() + 1,
//     "d+": _this.getDate(),
//     "h+": _this.getHours(),
//     "m+": _this.getMinutes(),
//     "s+": _this.getSeconds(),
//     "q+": Math.floor((_this.getMonth() + 3) / 3),
//     "S": _this.getMilliseconds()
//   };
//   if (/(y+)/.test(fmt))
//     fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
//   for (var k in o)
//     if (new RegExp("(" + k + ")").test(fmt))
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//   return fmt;
// }
