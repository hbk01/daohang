var engine_now;
var translate_engine_now;

window.onload = function () {
    // 加载配置文件中的onload方法
    config.onload();

    // 初始化搜索引擎、翻译、快捷键
    init();

    // load theme
    var themeFile = config.colorscheme[this.config.theme];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    if (themeFile == undefined) {
        this.console.log("Theme not found: [" + config.theme + "], Will use to [default_dark]");
        link.href = "./theme/default_dark.css";
    } else {
        link.href = "./theme/" + themeFile + ".css";
    }

    document.getElementsByTagName("head")[0].appendChild(link);

    // 加载搜索引擎logo
    // var search_image = document.getElementsByClassName("search-image")[0];
    // var image_url = search_engine_image[search_engine_index - 1];
    // search_image.setAttribute("src", image_url);
    // var search_btn  = document.getElementsByClassName("search-btn")[0];
    // search_btn.value = "";
    // search_btn.style.background = "url(\"" + image_url + "\")";

    // load engine name
    var search_btn = document.getElementsByClassName("btn search")[0];
    search_btn.value = engine_now.title;
    var trans_btn = document.getElementsByClassName("btn trans")[0];
    trans_btn.value = translate_engine_now.title;

    // load website.
    config.website.forEach(page => {
        if (page.image.startsWith(".")) {
            var perfix = page.url;
            if (page.url.endsWith("/")) {
                perfix = page.url.substring(0, page.url.length - 1);
            }

            var endfix = page.image.substring(1, page.image.length);
            addWebsite(page.title, page.url, perfix + endfix);
        } else {
            addWebsite(page.title, page.url, page.image);
        }
    });
};

function init() {
    engine_now = config.engine.list[config.engine.index - 1];
    translate_engine_now = config.engine.translate[config.engine.trans_index - 1];

    // 监听按键，enter为搜索，alt+enter为翻译
    document.onkeydown = function (e) {
        if (!transEnter(e)) {
            searchEnter();
        }
    }
}

/**
 * 搜索
 */
function search() {
    // 获取输入文本
    var text = document.getElementsByClassName("input")[0].value;
    if (text == "") {
        return;
    }
    // 是否要添加搜索参数
    if (config.help_search) {
        if (text.indexOf(" ") > 0) {
            var lang = text.substring(0, text.indexOf(" "));
            var inlist = [
                "java",
                "python",
                "c",
                "c++",
                "js",
                "javascript",
                "html",
                "css",
                "pycharm",
                "vim",
                "shell",
                "linux",
                "Linux",
                "win",
                "win10",
                "git"
            ];

            inlist.forEach(value => {
                if (value == lang) {
                    text = text.replace(lang, "\"" + lang + "\"");
                }
            });

        }
        // 去除百度及csdn的搜索结果
        text = "-baidu AND -csdn " + text;
    }

    // 拼接搜索链接
    var url = engine_now.url.replace("${word}", text);
    if (config.debug) {
        console.log("search [" + text + "] use [" + engine_now.title + "]; url=" + url);
    }
    window.open(url);

}

function trans() {
    // 获取输入文本
    var text = document.getElementsByClassName("input")[0].value;
    if (text != "") {
        // 解析翻译链接
        var url = translate_engine_now.url.replace("${word}", text);
        if (config.debug) {
            console.log("translate [" + text + "] use [" + translate_engine_now.title + "]; url=" + url);
        }
        window.open(url);
    }
}

/**
 * 监听回车按键，用以回车搜索功能
 */
function searchEnter() {
    // enter 键对应的 keyCode 为 13
    if (window.event.keyCode == 13) {
        search();
    }
}

/**
 * 监听Alt+Enter，用以翻译功能
 */
function transEnter(e) {
    if ((e.altKey) && (window.event.keyCode == 13)) {
        trans()
        return true;
    }
}

/**
 * 新建一个tab，打开网站
 * @param {*} div #div
 */
function goto(div) {
    var node = div.getElementsByTagName("div")[0];
    var url = node.attributes["url"].nodeValue;
    if (config.debug) {
        console.log("goto-website: " + url);
    }
    window.open(url);
}

function clearText() {
    var input = document.getElementsByClassName("input")[0];
    input.innerText = "";
}

function addWebsite(title, url, image) {
    if (config.debug) {
        console.log("add-website: " + title + ", " + url + ", " + image);
    }
    var website = document.getElementsByClassName("website")[0];

    var li = document.createElement("li");

    var div = document.createElement("div");
    div.className = "site";
    div.setAttribute("onclick", "goto(this)");

    var img = document.createElement("img");
    img.className = "image";
    img.src = image;

    var name = document.createElement("div");
    name.className = "name";
    name.setAttribute("url", url);
    name.innerText = title;

    website.appendChild(li);
    li.appendChild(div);
    div.appendChild(img);
    div.appendChild(name);
}
