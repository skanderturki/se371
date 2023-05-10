
const generateOTP = () => {
  let otp = Math.random();
  otp = otp * 1000000;
  return parseInt(otp);
}


module.exports = { generateOTP }