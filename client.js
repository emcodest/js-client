
const methods = {}
/**
 * include this script at the end of the body tag for the methods.Error and Success to work
 * Uses JQUERY 
 * <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
 */
methods.Error = function(title, message){
    Swal.fire({
        icon: 'error',
        title: title,
        text: message,
      })
}
methods.Success = function(title, message){
    Swal.fire({
        icon: 'success',
        title: title,
        text: message,
      })
}

methods.Spin = function(_btn){
    window.__spin = _btn
    window.__unspin = _btn.html()
    _btn.html('<div class="loader">Please wait...</div>')
}
methods.UnSpin = function(){
    window.__spin.html(window.__unspin)
}

methods.GetNoAuthURL = function (endpoint, method) {
    return "/no-auth-api/" + endpoint + "/" + method
}
methods.GetAuthURL = function (endpoint, method) {
    return "/auth-api/" + endpoint + "/" + method
}
methods.Ajax = function (url, data, data_type, callback, button=false) {
   // var i = 0;
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: data_type,
        beforeSend: function () {
           if(button){
            methods.Spin(button)
           }
        },
        completed: function () {
           // _lb.loading = !1
           if(button){
            methods.UnSpin()
           }
        },
        success: function (t) {
            methods.UnSpin()
            if(t.error){
                methods.Error("", t.message)
            }
            if(t.success){
                methods.Success("", t.message)
            }
            callback(t)
            
        },
        error: function (t) {}
    })

}
methods.OpenModal = function(title, body){
   
    $("#modal-1-title").html(title)
    $("#modal-1-content").html(body)
    MicroModal.init();
    MicroModal.show('modal-1');
}
methods.CloseModal = function(title, body){
    $("#modal-1-title").html("")
    $("#modal-1-content").html("")
    MicroModal.show('modal-1');
}


