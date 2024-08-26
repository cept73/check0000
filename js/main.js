
jQuery('#main button[type=submit]').on('click', function () {
    let url = jQuery('#protocol').val() + '0.0.0.0';

    let showMessage = function (message, className) {
        let responseItem = $('#response');
        let classList = responseItem[0].classList;
        responseItem.html('');
        classList.remove('error', 'success');
        classList.add('form-control');

        setTimeout(function () {
            if (className) {
                classList.add(className);
            }

            responseItem.html(message);
        }, 500);

    }
    let success = function (message) {
        showMessage(message, 'success');
    }
    let error = function (message) {
        showMessage(message, 'error');
    }

    showMessage();
    try {
        const method = $('#method').val();
        fetch(url, {'method': method, 'mode': 'no-cors'})
            .then(() => {
                alert('Fetch successful!');
                const xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            success(xhr.responseText);
                        } else {
                            error('Status ' + xhr.status);
                        }
                    } else {
                        error(xhr)
                    }
                }
            })
            .catch((reason) => {
                error(reason);
            });
    } catch (e) {
        error(e);
    }
});
