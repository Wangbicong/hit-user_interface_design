/**
 * Created by wangbicong on 2017/4/28.
 */

var lefts = new Array();
var tops = new Array();
var rights = new Array();
var bottoms = new Array();

var nextFocus;

function getyAbsTop(obj) {
    var top = obj.offsetTop;
    while (obj.offsetParent != null) {
        obj = obj.offsetParent;
        top += obj.offsetTop;
    }
    return top;
}

function getyAbsLeft(obj) {
    var left = obj.offsetLeft;
    while (obj.offsetParent != null) {
        obj = obj.offsetParent;
        left += obj.offsetLeft;
    }
    return left;
}

function getyAbsBottom(obj) {
    return getyAbsTop(obj) + obj.offsetHeight;
}

function getyAbsRight(obj) {
    return getyAbsLeft(obj) + obj.offsetWidth;
}

function setTopElement() {
    var minHeight = getyAbsTop(inputs[0]);
    var min_i = 0;
    for (var i = 0; i < count; i++) {
        if (getyAbsTop(inputs[i]) < minHeight){
            min_i = i;
            minHeight = getyAbsTop(inputs[i]);
        }
    }
    currentFocus = min_i;
    inputs[currentFocus].focus();
}

function setBottomElement() {
    var maxHeight = getyAbsBottom(inputs[0]);
    var max_i = 0;
    for (var i = 0; i < count; i++) {
        if (getyAbsBottom(inputs[i]) > maxHeight){
            max_i = i;
            maxHeight = getyAbsBottom(inputs[i]);
        }
    }
    currentFocus = max_i;
    inputs[currentFocus].focus();
}

function setLeftElement() {
    var minWeight = getyAbsLeft(inputs[0]);
    var min_i = 0;
    for (var i = 0; i < count; i++) {
        if (getyAbsLeft(inputs[i]) < minWeight){
            min_i = i;
            minWeight = getyAbsLeft(inputs[i]);
        }
    }
    currentFocus = min_i;
    inputs[currentFocus].focus();
}

function setRightElement() {
    var maxWeight = getyAbsRight(inputs[0]);
    var max_i = 0;
    for (var i = 0; i < count; i++) {
        if (getyAbsRight(inputs[i]) > maxWeight){
            max_i = i;
            maxWeight = getyAbsRight(inputs[i]);
        }
    }
    currentFocus = max_i;
    inputs[currentFocus].focus();
}

function sqr(val) {
    return val * val;
}

function onKeyLeft(is_circle) {
    if(getCursortPosition(inputs[currentFocus]) == 0){
        var thisLeft = lefts[currentFocus];
        nextFocus = currentFocus;
        var minDis = 0.0;
        var tmp;
        for (var i = 0; i < count; i++) {
            if (lefts[i] < thisLeft) {
                var absWeight;
                if (thisLeft < rights[i]){
                    absWeight = 0;
                }else{
                    absWeight = thisLeft - rights[i];
                }
                tmp = sqr(absWeight) + sqr(tops[i] - tops[currentFocus]);
                if (minDis == 0.0 || minDis > tmp) {
                    minDis = tmp;
                    nextFocus = i;
                }
            }
        }
        if (is_circle && nextFocus == currentFocus){
            nextFocus = -1;
            setRightElement();
        }
    }else{
        nextFocus = -1;
    }
}

function onKeyRight(is_circle) {
    if (getCursortPosition(inputs[currentFocus]) == inputs[currentFocus].value.length){
        var thisRight = rights[currentFocus];
        nextFocus = currentFocus;
        var minDis = 0.0;
        var tmp;
        for (var i = 0; i < count; i++) {
            if (rights[i] > thisRight) {
                var absWeight;
                if (lefts[i] < thisRight){
                    absWeight = 0;
                }else{
                    absWeight = thisRight - lefts[i];
                }
                tmp = sqr(absWeight) + sqr(tops[i] - tops[currentFocus]);
                if (minDis == 0.0 || minDis > tmp) {
                    minDis = tmp;
                    nextFocus = i;
                }
            }
        }
        if (is_circle && nextFocus == currentFocus){
            nextFocus = -1;
            setLeftElement();
        }
    }else{
        nextFocus = -1;
    }
}

function onKeyUp(is_circle) {
    nextFocus = currentFocus;
    var minDis = 0.0;
    var tmp;
    for (var i = 0; i < count; i++) {
        if (tops[i] < tops[currentFocus]) {
            var absHeight;
            if (lefts[currentFocus] > rights[i]){
                absHeight = lefts[currentFocus] - rights[i];
            }else if(rights[currentFocus] < lefts[i]){
                absHeight = rights[currentFocus] - lefts[i];
            }else{
                absHeight = 0;
            }
            // console.log(absHeight);
            // console.log(tops[i] - tops[currentFocus]);
            tmp = sqr(absHeight) + sqr(tops[i] - tops[currentFocus]);
            // console.log(tmp);
            if (minDis == 0.0 || minDis > tmp) {
                minDis = tmp;
                nextFocus = i;
            }
        }
    }
    if (is_circle && nextFocus == currentFocus){
        nextFocus = -1;
        setBottomElement();
    }
}

function onKeyDown(is_circle) {
    nextFocus = currentFocus;
    var minDis = 0.0;
    var tmp;
    for (var i = 0; i < count; i++) {
        if (bottoms[i] > bottoms[currentFocus]) {
            var absHeight;
            if (lefts[currentFocus] > rights[i]){
                absHeight = lefts[currentFocus] - rights[i];
            }else if(rights[currentFocus] < lefts[i]){
                absHeight = rights[currentFocus] - lefts[i];
            }else{
                absHeight = 0;
            }
            // console.log(absHeight);
            // console.log(bottoms[i] - bottoms[currentFocus]);
            tmp = sqr(absHeight) + sqr(bottoms[i] - bottoms[currentFocus]);
            // console.log(tmp);
            if (minDis == 0.0 || minDis > tmp) {
                minDis = tmp;
                nextFocus = i;
            }
        }
    }
    if (is_circle && nextFocus == currentFocus){
        nextFocus = -1;
        setTopElement();
    }
}

function onKeyEnter(mark, is_circle) {
    if (mark == "right"){
        onKeyRight(is_circle);
    }else if(mark == "down"){
        onKeyDown(is_circle);
    }else{
        console.log('mark error!');
    }
}

function findNextFocus(keyCode) {
    lefts = new Array();
    tops = new Array();
    rights = new Array();
    bottoms = new Array();
    nextFocus = -1;
    for (var i = 0; i < count; i++) {    // 计算所有表单的边界坐标
        lefts[i] = getyAbsLeft(inputs[i]);
        tops[i] = getyAbsTop(inputs[i]);
        rights[i] = getyAbsRight(inputs[i]);
        bottoms[i] = getyAbsBottom(inputs[i]);
    }
    if (keyCode == 37) { //left
        onKeyLeft(true);
    } else if (keyCode == 38) { //up
        onKeyUp(true);
    } else if (keyCode == 39) { //right
        onKeyRight(true);
    } else if (keyCode == 40) { //down
        onKeyDown(true)
    } else if (keyCode == 13){ //enter
        onKeyEnter("down", true);
    } else{
        nextFocus = -1;
    }
    return nextFocus;
}