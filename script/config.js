var config = {
    "debug": false, // 输出日志信息到控制台
    "help_search": true, // 为true时使用定义好的搜索参数
    "theme": "default light", // 引用colorscheme中的字段

    "engine": {//{{{
        "index": 2, // 使用搜索引擎列表中的哪个搜索引擎，1 为第一个
        "trans_index": 1, // 使用翻译列表中的哪个翻译引擎，1 为第一个
        "translate": [
            // title  引擎名字
            // url:   引擎地址, 使用${word}标记翻译词
            {
                "title": "Google翻译",
                "url": "https://translate.google.cn/#view=home&op=translate&sl=auto&tl=zh-CN&text=${word}"
            }
        ],
        "list": [
            // title: 搜索引擎名字
            // url:   搜索引擎地址, 使用${word}标记搜索词
            // image: 搜索引擎图标, 目前没用, 以后可能会用上
            {
                "title": "秘迹",
                "url": "https://mijisou.com/?q=${word}",
                "image": "https://mijisou.com/favicon.ico"
            },
            {
                "title": "Bing",
                "url": "https://cn.bing.com/search?q=${word}",
                "image": "https://cn.bing.com/favicon.ico"
            },
            {
                "title": "Google",
                "url": "https://www.google.com/search?q=${word}",
                "image": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            }
        ]
    },//}}}

    "website": [//{{{
        // title: 网站名字
        // url:   网站链接
        // image: 网站图标
        {
            "title": "哔哩哔哩",
            "url": "https://bilibili.com",
            "image": "class:fa-youtube-play"
        },
        {
            "title": "知乎",
            "url": "https://www.zhihu.com",
            "image": "class:fa-file-text-o"
        },
        {
            "title": "GitHub",
            "url": "https://github.com",
            "image": "class:fa-github"
        },
        {
            "title": "Gitee",
            "url": "https://gitee.com",
            "image": "class:fa-git-square"
        },
        {
            "title": "谷歌翻译",
            "url": "https://translate.google.cn/",
            "image": "class:fa-google"
        },
        {
            "title": "腾讯视频",
            "url": "https://v.qq.com/",
            "image": "class:fa-film"
        }
    ],//}}}

    "colorscheme": {//{{{
        // theme name, theme file name
        "default dark": "default_dark",
        "default light": "default_light"
    },//}}}

    // key will be 'key'{{{
    "keyList": [
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
        "git",
        "android"
    ], //}}}

    // The function will run in window.onload
    "onload": function () {
        // document.getElementsByClassName("title")[0].innerText = "小爱同学";
        console.log("hello");
        if (navigator.platform.toLowerCase() == "win32") {
            // this.engine.index = 3;
            // this.help_search = false;
        }
    }
}
