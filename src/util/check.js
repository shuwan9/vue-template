const checkUsername = username => {
  return !(username === "" || username === undefined || username === null)
}
const checkMobile = mobile => {
  return /^1[3456789]\d{9}$/.test(mobile)
}

export { checkUsername, checkMobile }
