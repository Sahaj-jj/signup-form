const form = (() => {

    const form = document.querySelector('form');
    const fields = document.querySelectorAll('input');
    
    const findField = (fieldName) => {
        return Array.from(fields)
                .find(field => field.classList.contains(fieldName));
    }

    const isEmpty = () => {
        empty = false;
        Array.from(fields).forEach(field => {
            if (field.value == '') {
                showError(field, "* please fill this field");
                empty = true;
            }
            else field.classList.remove('error');
        })
        return empty;
    }

    const isPasswordsMatch = () => {
        const pwd = findField('password');
        const rePwd = findField('re-password');
        if (pwd.value !== rePwd.value) {
            pwd.value = '';
            rePwd.value = '';
            showError(pwd, "* passwords don't match");
            return false;
        }
        return true;
    }

    const isPhoneValid = () => {
        const format = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        const phone = findField('phone');
        if (!phone.value.match(format)) {
            showError(phone, "* please enter a valid phone number");
            return false;
        }
        return true;
    }

    const showError = (inputElement, errorMsg) => {
        inputElement.classList.add('error');
        inputElement.nextElementSibling.textContent = errorMsg;
    }

    const checkValid = () => {
        return (!isEmpty() && isPhoneValid() && isPasswordsMatch());
    }

    onSuccess = () => {
        form.submit();
    }

    onFailure = () => {

    }
    
    const init = () => {

        form.addEventListener('submit', (e) => {
            if (checkValid()) {
                onSuccess();
            }
            else {
                e.preventDefault();
                onFailure();
            }
        })
    }

    return {
        init,
    };

})();

form.init();