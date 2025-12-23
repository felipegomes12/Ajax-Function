function submit_ajax(form, endpoint, metodo, only_data=true, async=true, onSuccess=null, onError=null) {
    
    var ajaxOptions = {
        url: endpoint,
        type: metodo,
        dataType: 'json',
        data: form,
        async: async,
        success: function(response) {
            if (onSuccess) {
                onSuccess(response);
            } else {
                console.log(response); // <--------- ATENÇÃO em produção os logs devem ser comentados ou apagados por segurança
            }
        },
        error: function(error) {

            if (onError) {
                onError(error);
            } else {
                console.log(error); // <--------- ATENÇÃO em produção os logs devem ser comentados ou apagados por segurança
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