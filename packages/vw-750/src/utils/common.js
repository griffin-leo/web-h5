function isApp() {
  if (
    (window.webkit && window.webkit.messageHandlers) ||
    typeof apiEngine != 'undefined'
  ) {
    return true;
  } else {
    return false;
  }
}

function isAndroid() {
  const u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}

function isIOS() {
  let isIOS = /(iPhone|iPad|iPod|iOS|Mac OS)/i.test(navigator.userAgent);
  return isIOS;
}

function isWx() {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
}

// 计算分秒
const getTimeText = totalSeconds => {
  // 计算小时、分钟和秒数
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;
  if (hours > 0) {
    const str = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
    return str;
  } else {
    const str = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    return str;
  }
};

// 年月日的日期转换为数组
const getDateList = str => {
  let replacedStr = str.replace(/[\u4e00-\u9fa5]+/g, '/');
  let splitStr = replacedStr.split('/');
  splitStr.pop();
  return splitStr;
};

// 日期对象转年月日的日期
const getDateStr = date => {
  let year = date.getFullYear() + '年';
  let month = date.getMonth() + 1 + '月';
  let day = date.getDate() + '日';
  return year + month + day;
};

// 获取元素高度
const getElHeight = (el, callback) => {
  let count = 0;
  let timer = setInterval(() => {
    if (!el && count < 10) {
      count++;
    } else {
      clearInterval(timer);
      timer = null;
      if (el?.header) {
        const elHeight = el.header?.getBoundingClientRect?.()?.height || 44;
        callback(elHeight);
      } else {
        callback(0);
      }
    }
  }, 100);
};

export {
  isApp,
  isAndroid,
  isIOS,
  isWx,
  getTimeText,
  getDateList,
  getDateStr,
  getElHeight
};
