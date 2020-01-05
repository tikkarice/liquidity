/**
 * Checks valida mobile number
 * @param {String} mobile
 * @return boolean
 */
const isValidMobile = (mobile) => {
    const mobileRegx = /^[9876]{1}[0-9]{9}$/;
    let status = false;
    debugger;
    if (mobileRegx.test(mobile)) {
        status = true;
    }

    return status;
};


module.exports = {
    isValidMobile,
};
