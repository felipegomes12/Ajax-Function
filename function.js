function submit_ajax(form, endpoint, metodo, only_data=true, async=true, onSuccess=null, onError=null) {
    
    var csrfToken = $('input[name=csrfmiddlewaretoken]').val();
    var ajaxOptions = {
        url: endpoint,
        type: metodo,
        headers: {'X-CSRFToken': csrfToken},
        dataType: 'json',
        data: form,
        async: async,
        success: function(response) {
            if (onSuccess) {
                onSuccess(response);
            } else {
                // console.log(response);
            }
        },
        error: function(error) {
            mostrar_erro(error)
            var load_scream = document.getElementById('load_scream')
            if (!load_scream.classList.contains('hidden')) {
                load_scream.classList.add('hidden')
            }
            if (onError) {
                onError(error);
            } else {
                // console.log(error);
            }
        }
    };

    if (metodo === 'POST' && !only_data) {
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
    } else {
        ajaxOptions.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        ajaxOptions.processData = true;
    }

    $.ajax(ajaxOptions);
}