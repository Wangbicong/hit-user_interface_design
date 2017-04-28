/**
 * Created by wangbicong on 2017/4/17.
 */
var currentFocus = 0;
var dragable1;
var inputs;
var count = 1;
var rDrag = {

    o: null,

    init: function (o) {
        o.onmousedown = this.start;
    },
    start: function (e) {
        var o;
        e = rDrag.fixEvent(e);
        e.preventDefault && e.preventDefault();
        rDrag.o = o = this;
        o.x = e.clientX - rDrag.o.offsetLeft;
        o.y = e.clientY - rDrag.o.offsetTop;
        document.onmousemove = rDrag.move;
        document.onmouseup = rDrag.end;

    },
    move: function (e) {
        e = rDrag.fixEvent(e);
        var oLeft, oTop;
        oLeft = e.clientX - rDrag.o.x;
        oTop = e.clientY - rDrag.o.y;
        rDrag.o.style.left = oLeft + 'px';
        rDrag.o.style.top = oTop + 'px';
    },
    end: function (e) {
        e = rDrag.fixEvent(e);
        inputs[rDrag.o.id[rDrag.o.id.length-1]-1].focus();
        currentFocus = parseInt(rDrag.o.id[rDrag.o.id.length-1]-1);
        rDrag.o = document.onmousemove = document.onmouseup = null;
    },
    fixEvent: function (e) {
        if (!e) {
            e = window.event;
            e.target = e.srcElement;
            e.layerX = e.offsetX;
            e.layerY = e.offsetY;
        }
        return e;
    }
}

document.onkeydown = function (e) {
    if (e) {
        var nextFocus = findNextFocus(e.keyCode);
        if (nextFocus != -1){
            inputs[nextFocus].focus();
            currentFocus = nextFocus;
        }
    }
}

function getCursortPosition (ctrl) {
    var CaretPos = 0;   // IE Support
    if (document.selection) {
        ctrl.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}

function setCaretPosition(textDom, pos){
    if(textDom.setSelectionRange) {
        // IE Support
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    }else if (textDom.createTextRange) {
        // Firefox support
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

function addNewChild(mark) {
    if (count <= 7){
        count += 1;
        var newId = "draggable" + count;
        var newId2 = "input" + count;
        if (mark){
            var width = Math.random() * 200 + 70;
            var height = Math.random() * 50 + 40;
        }else{
            $("#html5Form").data("bootstrapValidator").validate();
            if ($("#html5Form").data("bootstrapValidator").isValid()){
                var width = $('#width').val();
                var height = $('#height').val();
            }else{
                return;
            }
        }
        // var width = 194;
        // var newChild = document.createElement("<div id='"+newId+"' style='position: absolute'></div>");
        var newChild = document.createElement("div");
        newChild.id = newId;
        newChild.style.position = 'absolute';
        newChild.innerHTML = "<span>" + "表单" + newId2[newId2.length-1] + "</span><input id='" + newId2 +
            "' style='width:" + width + "px;"+ "height:" + height + "px" + "' />";
        document.body.appendChild(newChild);
        rDrag.init(newChild);
        inputs[count - 1] = document.getElementById(newId2);
        return;
    }
    else{
        $('#nextModal').modal('toggle');
    }
}

window.onload = function () {
    dragable1 = document.getElementById('draggable1');
    rDrag.init(dragable1);
    inputs = new Array();
    inputs[0] = document.getElementById("input1");
    inputs[0].focus();
};

$(function () {
    $('#html5Form').bootstrapValidator({
        feedbackIcons: {
            required: 'glyphicon glyphicon-asterisk requiredStar',
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            width: {
                validators: {
                    notEmpty: {
                        message: '宽度不能为空。'
                    },
                    callback: {
                        message: '宽度范围应为100~400。',
                        callback: function(value, validator) {
                            value = parseInt(value, 10);
                            if (isNaN(value) | value > 400 | value < 100){
                                return false
                            }else{
                                return true
                            }
                        }
                    }
                }
            },
            height: {
                validators: {
                    notEmpty: {
                        message: '高度不能为空。'
                    },
                    callback: {
                        message: '高度范围应为36~200。',
                        callback: function(value, validator) {
                            value = parseInt(value, 10);
                            if (isNaN(value) | value > 200 | value < 36){
                                return false
                            }else{
                                return true
                            }
                        }
                    }
                }
            }
        }
    });
});
