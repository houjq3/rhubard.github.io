var currUrl = window.location.href.replace(window.location.hash, '');
var share_title = document.title.trim();
var meta = document.getElementsByTagName('meta');
var share_desc = '';
for (i in meta) { if (typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "description") { share_desc = meta[i].content.trim(); } }

$.getJSON('/wechat/signature?url=' + encodeURIComponent(currUrl)).done(function (data) {
    wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    });
});

wx.ready(function () {
    // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
    wx.checkJsApi({
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ],
        success: function (res) {
            // alert(JSON.stringify(res));
        }
    });

    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
        title: share_title,
        desc: share_desc,
        link: currUrl,
        imgUrl: 'http://houjq.com/author.jpg',
        trigger: function (res) {
            // alert('用户点击发送给朋友');
        },
        success: function (res) {
            // alert('已分享');
        },
        cancel: function (res) {
            // alert('已取消');
        },
        fail: function (res) {
            // alert(JSON.stringify(res));
        }
    });

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
        title: share_title,
        link: currUrl,
        imgUrl: 'http://houjq.com/author.jpg',
        trigger: function (res) {
            // alert('用户点击分享到朋友圈');
        },
        success: function (res) {
            // alert('已分享');
        },
        cancel: function (res) {
        desc: share_desc,
            // alert('已取消');
        },
        fail: function (res) {
            // alert(JSON.stringify(res));
        }
    });

});

wx.error(function (res) {
    // alert(res.errMsg);
});
