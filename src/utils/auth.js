const key = 'token'
// 获取
function getItem () {
  return localStorage.getItem(key)
}
// 设置
function setItem (value) {
  localStorage.setItem(key, value)
}
// 删除
function removeItem () {
  localStorage.removeItem(key)
}

export { getItem, setItem, removeItem }
