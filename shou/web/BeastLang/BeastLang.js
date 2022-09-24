/**
 * Syc <github.com/SycAlright>
 * Beast_SDK JavaScript
 */

const beastDictArr = ['嗷', '呜', '啊', '~']

function encode_fun() {
    var main1 = document.getElementById("main1").value;
    var main2 = document.getElementById("main2").value;
    var main3 = document.getElementById("main3").value;
    var main4 = document.getElementById("main4").value;

    var str = document.getElementById("string_0").value;
    if (main1.length == 1 && main2.length == 1 && main3.length == 1 && main4.length == 1) { } else {
        Materialize.toast("主体字符长度有误！", 4000);
        return;
    }
    //设置主体字符
    beastDictArr[0] = main1;
    beastDictArr[1] = main2;
    beastDictArr[2] = main3;
    beastDictArr[3] = main4;

    $('#string_1').val(encode(str));
    $('#string_1').trigger('autoresize');
    $(document).ready(function () {
        Materialize.updateTextFields();
    });
}

function decode_fun() {
    var main1 = document.getElementById("main1").value;
    var main2 = document.getElementById("main2").value;
    var main3 = document.getElementById("main3").value;
    var main4 = document.getElementById("main4").value;

    var str = document.getElementById("string_1").value;
    if (main1.length == 1 && main2.length == 1 && main3.length == 1 && main4.length == 1) { } else {
        Materialize.toast("主体字符长度有误！", 4000);
        return;
    }
    //设置主体字符
    beastDictArr[0] = main1;
    beastDictArr[1] = main2;
    beastDictArr[2] = main3;
    beastDictArr[3] = main4;
    $('#string_0').val(decode(str));
    $('#string_0').trigger('autoresize');
    $(document).ready(function () {
        Materialize.updateTextFields();
    });
}

function encode(rawStr) {
    let charArr = rawStr.split("")
    let unicodeHexStr = ""
    for (let i = 0; i < charArr.length; i++) {
        let charHexStr = charArr[i].charCodeAt(0).toString(16)
        while (charHexStr.length < 4) {
            charHexStr = "0" + charHexStr
        }
        unicodeHexStr += charHexStr
    }
    let k = 0
    let unicodeHexStrArr = unicodeHexStr.split("")
    let beastStr = ""
    for (let i = 0; i < unicodeHexStrArr.length; i++) {
        let unicodeHexCharValue = parseInt("0x" + unicodeHexStrArr[i])
        k = unicodeHexCharValue + (i % 0x10)
        if (k >= 0x10) {
            k = k - 0x10;
        }
        beastStr += beastDictArr[parseInt(k / 4)] + beastDictArr[(k % 4)]
    }
    return beastStr
}

function decode(beastStr) {
    let unicodeHexStr = ""
    let beastStrArr = beastStr.split("")
    for (let i = 0; i <= (beastStr.length - 2); i += 2) {
        let beastCharStr = ""
        let pos1 = 0
        beastCharStr = beastStrArr[i];
        for (; pos1 <= 3; pos1++) {
            if (beastCharStr == beastDictArr[pos1]) {
                break
            }
        }
        let pos2 = 0
        beastCharStr = beastStrArr[i + 1]
        for (; pos2 <= 3; pos2++) {
            if (beastCharStr == beastDictArr[pos2]) {
                break;
            }
        }
        let k = (pos1 * 4) + pos2;
        let unicodeHexCharValue = k - (parseInt(i / 2) % 0x10);
        if (unicodeHexCharValue < 0) {
            unicodeHexCharValue += 0x10;
        }
        unicodeHexStr += unicodeHexCharValue.toString(16)
    }
    let rawStr = ""
    let start = 0
    let end = 4
    while (end <= unicodeHexStr.length) {
        let charHexStr = unicodeHexStr.substring(start, end);
        let charStr = String.fromCharCode(parseInt("0x" + charHexStr))
        rawStr += charStr
        start += 4
        end += 4
    }
    return rawStr
}


