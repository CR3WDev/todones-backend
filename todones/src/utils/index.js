exports.isUUID = (uuid) => {
  let x =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  let result = x.test(uuid);
  return result;
};
exports.isDate = (date) => {
  let x = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
  let result = x.test(date);
  return result;
};
