export const getJapaneseTime = (time: string, type?: String) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  switch (type) {
    case "YYYY年mm月dd日":
      return `${year}年${month}月${day}日`;
    case "YYYY年mm月dd日 HH時mm分ss秒":
      return `${year}年${month}月${day}日 ${hour}時${minute}分${second}秒`;
  }

  return `${year}年${month}月${day}日`;
};
