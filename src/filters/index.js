/**
 *   将时间戳（十三位时间搓，也就是带毫秒的时间搓）转换成时间格式 横杠隔离
 *   @param {string} input
 */
export function getLocalTime(input) {
  // d.cTime = 1539083829787
  let date = new Date(input)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  date = year + '-' + month + '-' + day
  return date
}

/**
 *   将时间戳（十三位时间搓，也就是带毫秒的时间搓）转换成时间格式 中文隔离
 *   @param {string} input
 */
export function getChineseLocalTime(input) {
  if (input === null || !input) {
    return '--'
  }
  // d.cTime = 1539083829787
  if (input === null || input === '') {
    return ''
  }
  let date = new Date(input)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  date = year + '年' + month + '月' + day + '日'
  return date
}

/**
 *   日期格式过滤器 2018-06-26 07:26:07 转为 xxxx()xx()xx 格式 （） 中为传入的参数，默认为 /
 *   @param {string} input
 *   @param {string} symbol  格式 （）默认为 /
 */
export function timeSplit(input, symbol) {
  if (!input) {
    return input
  }
  if (!symbol) {
    symbol = '/'
  }
  const reg = new RegExp('-', 'g')
  return input.split(' ')[0].replace(reg, symbol)
}

/**
 *   自定义数字转金额，三位添加逗号，保留两位小数过滤器 100000 转为 100,000.00
 *   @param {string} s
 */
export function money(s) {
  if (s === undefined) {
    return '--'
  }
  if (s === null) {
    return '--'
  }
  if (s === '') {
    return '--'
  }
  if (s === '--') {
    return s
  }
  // 判断数字是正数还是负数
  let minus = false
  // 数字转字符串
  s = s + ''
  if (s.substring(0, 1) === '-') {
    minus = true
    s = parseFloat(s.substring(1).replace(/[^\d\.-]/g, '')).toFixed(2) + ''
  } else {
    s = parseFloat(s.replace(/[^\d\.-]/g, '')).toFixed(2) + ''
  }
  const l = s.split('.')[0].split('').reverse()
  const r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  if (minus) {
    return '-' + t.split('').reverse().join('') + '.' + r
  } else {
    return t.split('').reverse().join('') + '.' + r
  }
}

/**
 *   超出省略
 *   @param {string} value
 *   @param {number} max
 *   @param {string} tail  超出显示内容
 */
export function ellipsis(value, max, tail) {
  if (!value) return
  if (!max) return value
  if (value.length <= max) return value
  value = value.substr(0, max)
  return value + (tail || '.')
}
export function salaryZhuangtai(value) {
  let text = ''
  switch (value) {
    case 1:
      text = '使用中'
      break
    case 2:
      text = '未启用'
      break

    default:
      text = '已过期'
      break
  }
  return text
}
export function approvalType(value) {
  let text = ''
  switch (value) {
    case 0:
      text = '未审批'
      break
    case 1:
      text = '审批中'
      break
    case 2:
      text = '已审批'
      break

    default:
      text = '已驳回'
      break
  }
  return text
}
// 返回周 或周加月日
export function weekly(value, rules) {
  if (!value) return
  value = value.replace(/-/g, '/') // 更改日期格式
  var nd = new Date(value)
  const weekday = ['日', '一', '二', '三', '四', '五', '六']
  if (rules) {
    const cm = nd.getMonth() + 1
    const cd = nd.getDate()
    return weekday[nd.getDay()] + '. ' + cm + '-' + cd
  } else {
    return weekday[nd.getDay()]
  }
}
// 日期相加减 date 当前日期 days 加减天数 operator 加/减
export function dateOperator(date, days, operator) {
  date = date.replace(/-/g, '/') // 更改日期格式
  var nd = new Date(date)
  nd = nd.valueOf()
  if (operator === '-') {
    nd = nd - days * 24 * 60 * 60 * 1000
  } else {
    nd = nd + days * 24 * 60 * 60 * 1000
  }
  nd = new Date(nd)
  const cy = nd.getFullYear()
  const cm = nd.getMonth() + 1
  const cd = nd.getDate()
  return cy + '-' + cm + '-' + cd
}

/**
 *   支付状态
 *   @param {string} value
 */
export function payStatus(value) {
  if (typeof value === 'number') {
    value = String(value)
  }
  const data = {
    '0': '未支付',
    '1': '已支付',
    '2': '部分支付',
    '3': '退款中',
    '4': '已退款',
    '5': '无效',
    '6': '部分支付未支付',
    '7': '部分支付尾款逾期'
  }
  return data[value]
}
/**
 *   截取时间
 *   @param {string} value
 */
export function splitData(value, index) {
  if (typeof value === 'string') {
    return value.split('-')[index]
  }
  return value
}
/**
 *   0位置1男2女
 *   @param {string} value
 */
export function sex(value, index) {
  if (value === null) { value = 0 }
  value = Number(value)
  let text = ''
  switch (value) {
    case 1:
      text = '男'
      break
    case 2:
      text = '女'
      break
    default:
      text = '未知'
  }
  return text
}
