// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.value;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
               // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                } 
            });
        });
    }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  message || 'Trường này phải là email';
        }
    };
}
Validator.isUserName = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

            return regex.test(value) ? undefined :  message || 'Có ít nhất 4 chữ cái và 1 số';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}


let globalData;
async function getData() {
    try {
        const response = await fetch("http://localhost:3000/user/");
        const data = await response.json();

        globalData = data;
        // console.log(globalData);
        return data; // Trả về dữ liệu để sử dụng trong khối .then tiếp theo
    } catch (error) {
        console.log(error); // Ném lỗi để bắt trong khối .catch tiếp theo
    }
}
getData();
function checkLogin(email, password) {
    const userData = globalData;
    // Tìm user có email như người dùng nhập vào
    const user = userData.find(user => user.email === email);
    // Kiểm tra nếu không tìm thấy user hoặc mật khẩu không đúng
    // if (!user || user.passWord !== password) {
    //     return false; // Đăng nhập không thành công
    // }

    return user; // Đăng nhập thành công
}

function handleLogin(email,password) {
    const storedUser = sessionStorage.getItem('loggedInUser');
  
    // Kiểm tra nếu đã có session user
    if (storedUser) {
      alert('Bạn đã đăng nhập rồi');
      redirectToNewPage("index-logined.html");
    } else {
      // Dữ liệu người dùng nhập vào
      const userInputEmail = email;
      const userInputPassword = password;
        console.log(userInputEmail,userInputPassword);
      // Kiểm tra đăng nhập
      const proFile = checkLogin(userInputEmail, userInputPassword);
      console.log(proFile);
      if (proFile) {
        alert("Đăng nhập thành công");
  
        // Lưu thông tin đăng nhập vào session
        const userObject = { 
            email: proFile.email,
            password: proFile.passWord,
            gender: proFile.gender,
            address: proFile.address,
            userName: proFile.userName,
            name: proFile.name
        };
        sessionStorage.setItem('loggedInUser', JSON.stringify(userObject));
  
        // Chuyển trang sau 1 giây
        setTimeout(() => {
          redirectToNewPage("index-logined.html");
        }, 1000);
      } else {
        console.log("Đăng nhập không thành công");
      }
    }
}
function redirectToNewPage(href) {
    window.location.href = href;
}
