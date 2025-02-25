/*
fetch('home.html') //ロード元URL
        .then(data => data.text())
        .then(html => document.getElementById('loadArea-2').innerHTML = html)
*/

/**********
**初期処理**
**********/
// ★タグを追加する場合→①tag変数を追加②PageTransFunction、ChangeUrlTagFunctionに条件を追加

// タグURL
var tagNone = "tag_none"
var tagReq = "illu_req"
var tagOthers = "others"
const url = location.href

var TopElement = document.getElementById('TopPage');
var IlluReqElement = document.getElementById('IlluReqPage');
var OthersElement = document.getElementById('OthersPage');

console.log(url);
console.log(TopElement);
console.log(IlluReqElement);

// URLにタグが含まれていたらページの表示を切り替える
IntialFunction();

// ブラウザバックや、ChangeUrlTagFunctionによるhref変更を検知
ReloadPageFunction();

/**********
***関数****
**********/

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
        OthersElement.classList.add("d-none");

    } else if (tags == tagOthers) {
        console.log("お願いページを表示します");
        // お願いページを表示する
        TopElement.classList.add("d-none");
        IlluReqElement.classList.add("d-none");
        OthersElement.classList.remove("d-none");

    } else {
        consol.log("タグの該当無し、もしくは該当しないタグです");
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
        consol.log("ChangeUrlTagFunction End 処理を終了します");
        return;
    }

    // URLが変更されたらReloadPageFunctionのEventLisnerでキャッチされる
    if (id == "NaviReq") {
        window.location.href = "./index.html#" + tagReq;
        consol.log("URLタグが設定されました\t" + tagReq);
    } else if (id == "NaviOthers") {
        window.location.href = "./index.html#" + tagOthers;
        consol.log("URLタグが設定されました\t" + tagOthers);
    } else {
        window.location.href = "./index.html";
        consol.log("URLタグは設定されませんでした");
    }

    console.log("ChangeUrlTagFunction End");
}

// 関数 - タグのエラー判定
function JudgeTagErrorFunction(tag, functionName) {

    console.log("ChangeUrlTagFunction Start\t" + tag + "," + functionName);

    // nullの場合
    if (tag == null) {
        consol.log("JudgeTagErrorFunction End 正規タグではありません Null - " + functionName);
        return true;
    }

    // タグの長さが10以上の場合
    if (tag.length > 10) {
        consol.log("JudgeTagErrorFunction End 正規タグではありません len10over - " + functionName);
        return true;
    }
    //try { if (id.length > 10) { throw new Error('正規タグではありません - ChangeUrlTagFunction'); } } catch (e) { consol.log(e.message); }

    console.log("JudgeTagErrorFunction End");
}



