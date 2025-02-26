
/**********
**初期処理**
**********/

// ★タグを追加する場合→①tag変数を追加②PageTransFunction、ChangeUrlTagFunctionに条件を追加
// タグURL
var tagNone = "tag_none"
var tagReq = "illu_req"
var tagGry = "gallery"
var tagOthers = "others"
const url = location.href

var TopElement = document.getElementById('TopPage');
var IlluReqElement = document.getElementById('IlluReqPage');
var GryElement = document.getElementById('GalleryPage');
var OthersElement = document.getElementById('OthersPage');

var htmlTop = "top.html";
var htmlIlluReq = "illuReq.html";
var htmlGry = "gallery.html";
var htmlOhers = "others.html";

// 異なるサイトへの遷移URL
var siteNamePi = "pixiv"
var siteUrlPi = "https://www.pixiv.net/users/80813802"

console.log(url);
console.log(TopElement);
console.log(IlluReqElement);

// URLにタグが含まれていたらページの表示を切り替える
IntialFunction();

// ブラウザバックや、ChangeUrlTagFunctionによるhref変更を検知
ReloadPageFunction();

LoadPageFunction(htmlTop, TopElement);
LoadPageFunction(htmlIlluReq, IlluReqElement);
LoadPageFunction(htmlGry, GryElement);
LoadPageFunction(htmlOhers, OthersElement);


// スライドショーのオプション設定
$('.carousel').carousel({
    interval: 1000, // スライドショーの間隔
    ride: false // 自動でスライド
})

/**********
***関数****
**********/

// 関数 - HTMLをロードする
function LoadPageFunction(htmlUrl, htmlElement) {
    var xhr = new XMLHttpRequest(),
        method = "GET";

    xhr.open(method, htmlUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var restxt = xhr.responseText;//String型で取得
            console.log(restxt)
            htmlElement.innerHTML = restxt;//完了
        }
    };
    xhr.send();
}

// 関数 - URLにタグが含まれていたらページの表示を切り替える
function IntialFunction() {

    console.log("IntialFunction Start");

    // タグがついている場合は指定のページを表示する
    if (url.indexOf('#') != -1) {
        const tags = url.split("#");
        console.log(tags[1]);
        PageTransFunction(tags[1]);
    } else {
        console.log("URLタグはありません");
    }

    console.log("IntialFunction End");
}

// 関数 - ブラウザバックや、ChangeUrlTagFunctionによるhref変更を検知
function ReloadPageFunction() {

    console.log("ReloadPageFunction Start");

    history.replaceState(null, null, null);
    window.addEventListener('popstate', function (e) {
        console.log('ブラウザバック、ブラウザ遷移を検知しました。');
        window.location.reload(true);
    });

    console.log("ReloadPageFunction End");
}

// 関数 - ページの表示を切り替える
function PageTransFunction(tags) {

    console.log("PageTransFunction Start\t" + tags);

    // エラー判定
    var ErrorFlg = JudgeTagErrorFunction(tags, "PageTransFunction");
    if (ErrorFlg == true) {
        console.log("PageTransFunction End - トップページへ遷移します")
        window.location.href = "./index.html"
        return;
    }


    if (tags == tagReq) {
        console.log("ご依頼ページを表示します");
        // ご依頼ページを表示する
        TopElement.classList.add("d-none");
        IlluReqElement.classList.remove("d-none");
        GryElement.classList.add("d-none");
        OthersElement.classList.add("d-none");

    } else if (tags == tagGry) {
        console.log("ギャラリーページを表示します");
        // ギャラリーページを表示する
        TopElement.classList.add("d-none");
        IlluReqElement.classList.add("d-none");
        GryElement.classList.remove("d-none");
        OthersElement.classList.add("d-none");

    } else if (tags == tagOthers) {
        console.log("その他ページを表示します");
        // その他ページを表示する
        TopElement.classList.add("d-none");
        IlluReqElement.classList.add("d-none");
        GryElement.classList.add("d-none");
        OthersElement.classList.remove("d-none");

    } else {
        console.log("タグの該当無し、もしくは該当しないタグです");
        // トップページを表示する
        window.location.href = "./index.html";
    }

    console.log("PageTransFunction End");
}

// 関数 - ナビゲーションバーがクリックされたら、URLのタグを付け替える
function ChangeUrlTagFunction(id) {

    console.log("ChangeUrlTagFunction Start\t" + id);

    // エラー判定
    var ErrorFlg = JudgeTagErrorFunction(id, "ChangeUrlTagFunction");
    if (ErrorFlg == true) {
        console.log("ChangeUrlTagFunction End 処理を終了します");
        return;
    }

    // URLが変更されたらReloadPageFunctionのEventLisnerでキャッチされる
    if (id == "NaviReq" || id == "topBtnReqP" || id == "topBtnReqS") {
        window.location.href = "./index.html#" + tagReq;
        console.log("URLタグが設定されました\t" + tagReq);
    } else if (id == "NaviGry") {
        window.location.href = "./index.html#" + tagGry;
        console.log("URLタグが設定されました\t" + tagGry);
    } else if (id == "NaviOthers" || id == "topBtnOthP" || id == "topBtnOthS") {
        window.location.href = "./index.html#" + tagOthers;
        console.log("URLタグが設定されました\t" + tagOthers);
    } else {
        window.location.href = "./index.html";
        console.log("URLタグは設定されませんでした");
    }

    console.log("ChangeUrlTagFunction End");
}

// 関数 - タグのエラー判定
function JudgeTagErrorFunction(tag, functionName) {

    console.log("ChangeUrlTagFunction Start\t" + tag + "," + functionName);

    // nullの場合
    if (tag == null) {
        console.log("JudgeTagErrorFunction End 正規タグではありません Null - " + functionName);
        return true;
    }

    // タグの長さが10以上の場合
    if (tag.length > 10) {
        console.log("JudgeTagErrorFunction End 正規タグではありません len10over - " + functionName);
        return true;
    }
    //try { if (id.length > 10) { throw new Error('正規タグではありません - ChangeUrlTagFunction'); } } catch (e) { console.log(e.message); }

    console.log("JudgeTagErrorFunction End");
}

// 関数 - サイト遷移
function TranceSiteFunction(siteName) {

    console.log("TranceSiteFunction Start");

    if (siteName == null) {
        console.log("TranceSiteFunction End null")
        return;
    }

    console.log(siteName + siteNamePi);
    if (siteName == siteNamePi) {
        console.log("TranceSiteFunction End サイトへ遷移します")
        window.location.href = siteUrlPi
    } else {
        console.log("TranceSiteFunction End サイト名が異なります")
        return;
    }

    console.log("TranceSiteFunction End");
}

// 関数 - イラスト表示モーダルを開く
function OpenModalFunction(imgName) {
    console.log("OpenModalFunction Start");
    console.log(imgName);

    var ModalImgVDisElement = document.getElementById('modalGaImgV');
    var ModalImgHDisElement = document.getElementById('modalGaImgH');
    var ModalImgVElement = document.getElementById('LightboxImageV');
    var ModalImgHLElement = document.getElementById('LightboxImageHL');
    var ModalImgHMSElement = document.getElementById('LightboxImageHMS');

    // エラーチェック
    // チユリのHP、Local環境以外の画像の場合
    if (imgName.indexOf('https://canacachiyuri.github.io') != -1 || imgName.indexOf('http://localhost:8080/ChiyuriHTML/') != -1) {
        console.log("OpenModalFunction End 自サイトの画像");
    } else {
        console.log("OpenModalFunction End 他サイトの画像");
        ModalImgVElement.setAttribute("src", "Alert");
        ModalImgHLElement.setAttribute("src", "Alert");
        ModalImgHMSElement.setAttribute("src", "Alert");
        return;
    }

    if (imgName.length > 80) {
        console.log("OpenModalFunction End Length Over");
        ModalImgVElement.setAttribute("src", "Alert");
        ModalImgHLElement.setAttribute("src", "Alert");
        ModalImgHMSElement.setAttribute("src", "Alert");
        return;
    }

    // 横イラストの場合
    if (imgName.indexOf('_HImg') != -1) {
        console.log("OpenModalFunction 横イラスト");
        ModalImgHDisElement.removeAttribute("style");
        ModalImgVDisElement.setAttribute("style", "display:none;");
    } else {
        console.log("OpenModalFunction 縦イラスト");
        ModalImgVDisElement.removeAttribute("style");
        ModalImgHDisElement.setAttribute("style", "display:none;");
    }

    ModalImgVElement.setAttribute("src", imgName);
    ModalImgHLElement.setAttribute("src", imgName);
    ModalImgHMSElement.setAttribute("src", imgName);

    console.log("OpenModalFunction End");
}


/* モーダルの操作試行錯誤
console.log("TranceSiteFunction Start");
var bodyElement = document.getElementsByTagName('body')
var ModalElement = document.getElementById('imgDispModal');
var ModalImgElement = document.getElementById('imgModal');

bodyElement[0].classList.add("modal-open");
bodyElement[0].setAttribute("style", "overflow: hidden; padding-right: 40px;");
bodyElement[0].setAttribute("data-bs-overflow", "hidden");
bodyElement[0].setAttribute("data-bs-padding-right", "20px");

//ModalElement.setAttribute("class", "openModal");
ModalElement.classList.add("show");
ModalElement.setAttribute("aria-modal", "true");
ModalElement.setAttribute("role", "dialog");
ModalElement.removeAttribute("aria-hidden");
ModalElement.setAttribute("style", "display: block; padding-right: 21px;");
ModalImgElement.removeAttribute("src");
ModalImgElement.setAttribute("src", imgName);

var modalDivElement = document.getElementById('modalDiv');
modalDivElement.classList.add("modal-backdrop", "fade", "show");
 
 
console.log("TranceSiteFunction End");
*/
