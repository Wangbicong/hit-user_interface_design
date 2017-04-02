/**
 * Created by wangbicong on 2017/4/1.
 */

function onNextButton() {
    $("#html5Form").data("bootstrapValidator").validate();
    var isChecked = $("#html5Form").data("bootstrapValidator").isValid();
    console.log(isChecked);
    if (isChecked){
        $('#processBar').css("width", "0%");
        $('#nextModal').modal('toggle');
    }
}

function onCommitButton(){
    $('#processBar').css("width", "100%");
    setTimeout(function(){
        $('#process-body').html("<small>提交成功，即将后关闭窗口。</small>");
        setTimeout(function () {
            $('#process-body').html("<small>正在关闭...</small>");
            window.location.reload();
        }, 2000);
    }, 2000);
}

function closeModal() {

}

var flag = 1;

function onPasswordButton() {
    if( flag === 1 ){
        $("#password").attr("type","text");
        flag = 0;
    }else{
        $("#password").attr("type","password");
        flag = 1;
    }
}

$('#email').focus();