var Common = {
  /*
  * HaiTD
  * 11/11/2020
  * Check validate Form
  */
  validateForm(data, rules, errors) {
    //let errors = []
    if (data != undefined && data != null) {
      rules.map((item, i) => {
        let error = {
          Key: ""
        }
        let fieldName = item.field
        let obj = data[fieldName] == undefined || data[fieldName] == null ? '' : data[fieldName]
        error = Common.approveRules(obj, fieldName, item)
        errors = errors == null || errors == undefined ? [] : errors
        var fieldexist = errors.find(g => g.Key === fieldName);
        if (!fieldexist) {
          if (error.Key != "") {
            errors.push(error)
          }
        }
      });
    }
    return errors
  },
  /*
  * HaiTD
  * 11/11/2020
  * Check rules Form
  */
  approveRules(data, fieldName, item) {
    let error = {
      Key: "",
      Value: ""
    }
    if (!data && item.required) {
      error = {
        Key: fieldName,
        Value: item.messages && item.messages.required ? item.messages.required : "Dữ liệu không được để trống"
      };
      return error;
    }
    if (data && item.email && !Common.isValidEmail(data)) {
      error = {
        Key: fieldName,
        Value: item.messages && item.messages.email ? item.messages.email : "Vui lòng nhập email đúng định dạng như (@gmail.com, @yahoo.com, @abc.vn ...)"
      };
      return error;
    }
    if (data && item.phone) {
      var errPhone = Common.fieldsRequiredPhone(data);
      if (errPhone != true) {
        error = {
          Key: fieldName,
          Value: item.messages && item.messages.Phone ? item.messages.Phone : errPhone.Value
        };
        return error;
      }
    }
    return error;
  },
  /*
	 * HaiTD
	 * 11/11/2020
	 * Check validate Email
	 */
  fieldsRequiredEmail(email) {
    var regEx = new RegExp(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
    if (regEx.test(email.trim())) {
      return true;
    }
    else {
      return "Vui lòng nhập email đúng định dạng như( @gmail.com ,@yahoo.com,@abc.vn...... ).";
    }
    return false;
  },
	/*
	 * HaiTD
	 * 11/11/2020
	 * Check validate phone number
	 */
  fieldsRequiredPhone(phone) {
    var arrayPrefixMobileNumber = new Array("052", "071", "072", "087", "08", "083", "086", "0868", "088", "089", "090", "091", "092", "093", "094", "095", "096", "097", "098", "099", "034", "032", "033", "034", "035", "036", "037", "038", "039", "070", "079", "077", "076", "078", "083", "084", "085", "081", "082", "056", "058", "059");
    var arrayPrefixNumber = new Array("0200", "0201", "0202", "0203", "0204", "0205", "0206", "0207", "0208", "0209", "0210", "0211", "0212", "0213", "0214", "0215", "0216", "0217", "0218", "0219", "0220", "0221", "0222", "0223", "0224", "0225", "0226", "0227", "0228", "0229", "0230", "0231", "0232", "0233", "0234", "0235", "0236", "0237", "0238", "0239", "0240", "0241", "0242", "0243", "0244", "0245", "0246", "0247", "0248", "0249", "0250", "0251", "0252", "0253", "0254", "0255", "0256", "0257", "0258", "0259", "0260", "0261", "0262", "0263", "0264", "0265", "0266", "0267", "0268", "0269", "0270", "0271", "0272", "0273", "0274", "0275", "0276", "0277", "0278", "0279", "0280", "0281", "0282", "0283", "0284", "0285", "0286", "0287", "0288", "0289", "0290", "0291", "0292", "0293", "0294", "0295", "0296", "0297", "0298", "0299");
    var strNumber = phone;
    strNumber = strNumber.replace(/-/g, '');
    var regEx = new RegExp(/^ *[0-9]+ *$/);
    let error = {
      Key: "",
      Value: ""
    }
    if (regEx.test(strNumber.trim())) {
      if (strNumber != "") {
        if ((strNumber.trim().length == 10 || strNumber.trim().length == 11) && regEx.test(strNumber.trim())) {
          var strPrefixNumber = strNumber.replace('-', '');
          var flagPrefix = false;
          var flagNumber = false;
          for (var j = 0; j < arrayPrefixNumber.length; j++) {
            if (strPrefixNumber.startsWith(arrayPrefixNumber[j])) {
              flagPrefix = true;
            }
            if (strPrefixNumber.startsWith(arrayPrefixNumber[j]) && strNumber.trim().length == 11) {
              flagNumber = true;
            }
          }
          for (var j = 0; j < arrayPrefixMobileNumber.length; j++) {
            if (strPrefixNumber.startsWith(arrayPrefixMobileNumber[j])) {
              flagPrefix = true;
            }
            if ((strPrefixNumber.startsWith(arrayPrefixMobileNumber[j]) && strNumber.trim().length == 10 && arrayPrefixMobileNumber[j].length == 3) || (strPrefixNumber.startsWith(arrayPrefixMobileNumber[j]) && strNumber.trim().length == 11 && arrayPrefixMobileNumber[j].length == 4)) {
              flagNumber = true;
            }
          }
          if (!flagPrefix) {
            error = {
              Key: phone,
              Value: "Đầu số điện thoại không đúng."
            }
            return error;
          }
          else if (!flagNumber) {
            error = {
              Key: phone,
              Value: "Điện thoại không đúng định dạng."
            }
            return error;
          }
          return true;
        }
        else {
          error = {
            Key: phone,
            Value: "Điện thoại không đúng định dạng (10 hoặc 11 số)."
          }
          return error;
        }
      }
    }
    else {
      phone = phone.slice(0, -1);
      error = {
        Key: phone,
        Value: "Điện thoại không được nhập chữ cái và kí tự đặc biệt"
      }
      return error;
    }
  }
}
