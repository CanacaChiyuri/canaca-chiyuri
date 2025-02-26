
// Element - クラスを追加する場所を取得
var dispXxlLgEle = document.getElementsByClassName("disp-xxl-lg");
var dispMdEle = document.getElementsByClassName("disp-md");
var dispMdXsEle = document.getElementsByClassName("disp-md-xs");
var dispSmXsEle = document.getElementsByClassName("disp-sm-xs");
var outlineBoxEle = document.getElementsByClassName("outlineBox");

// ClassName - 追加するクラス名を指定
// ディスプレイの大きさによって表示を変えるクラス
const dispXxlLgAddClassName = ['d-none', 'd-xxl-block', 'd-xl-block', 'd-lg-block'];
const dispMdAddClassName = ['d-none', 'd-md-block', 'd-lg-none'];
const dispMdXsAddClassName = ['d-block', 'd-lg-none'];
const dispSmXsAddClassName = ['d-block', 'd-md-none'];

// 枠の大きさ等の指定
const outlineBoxAddClassName = ['border', 'border-4', 'rounded', 'rounded-3', 'd-flex', 'align-items-center', 'justify-content-center', 'opacity-75'];

window.addEventListener('load', function () {
    console.log("load：リソースファイルを全て読み込みました。");
    AddBSClassFunction(dispXxlLgEle, dispXxlLgAddClassName)
    AddBSClassFunction(dispMdEle, dispMdAddClassName)
    AddBSClassFunction(dispMdXsEle, dispMdXsAddClassName)
    AddBSClassFunction(dispSmXsEle, dispSmXsAddClassName)
    AddBSClassFunction(outlineBoxEle, outlineBoxAddClassName)
});

/**********
***関数****
**********/

// 関数 - 対象クラスをもつElementに、Bootstrapクラスを追加する
function AddBSClassFunction(tgtClass, addClassNames) {

    console.log("AddBSClassFunction Start");

    for (var i = 0; i < tgtClass.length; i++) {
        console.log(tgtClass[i].classList)
        for (var j = 0; j < addClassNames.length; j++) {
            tgtClass[i].classList.add(addClassNames[j]);
        }
    }

    console.log("AddBSClassFunction End");
}

