const getArgs = () => {
    var args = {};
    var match = null;
    var search = decodeURIComponent(location.search.substring(1));
    var reg = /(?:([^&]+)=([^&]+))/g;
    while ((match = reg.exec(search)) !== null) {
        args[match[1]] = match[2];
    }
    return args;
}

const init_modal = (key, a) => {
    $("#m_title").text(json[key]["titles"][a])
    $("#m_body").html("<p>"+json[key]["contents"][a].replace(/\n/g, "</p><p>"))
    $("#m_unformatted_body")[0].value = json[key]["contents"][a]
}

const init_video_img_modal = (src, title, type) => {
    $("#m_title").text(title)
    $("#m_body").html(type == "img" ? `<img src="${src}" />` : `<video src="${src}" preload="Metadata" controls></video>`)
    $("#copy").hide()

    $(".download_video").remove()
    $(".modal-footer").prepend(`<a href="${src}" target="_blank" class="btn btn-primary download_video" download>下载${type == "img" ? "图片" : "视频"}</a>`)
}

var is_electron_app = navigator.userAgent.indexOf("Electron") > -1
const is_Firefox = navigator.userAgent.indexOf("Firefox") > -1;
const is_Chrome = navigator.userAgent.indexOf("Chrome") > -1;

var t = getArgs()["type"] || "shuo"

var link = $("#" + t)
link.addClass('active');

var json
$.get("https://mohu.oss-cn-shanghai.aliyuncs.com/" + t + ".json", (data) => {
    json = data
    var keys = _.keys(data)
    var card_deck = $("#card-deck")
    if (t == "dou" || t == "chang" || t == "videos") {
        keys.shift()
    }

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]

        if (t == "dou" || t == "chang" || t == "videos") {
            var items = _.keys(data[key])
        } else {
            var items = data[key]["titles"]
        }

        var item_html = ""


        for (var a = 0; a < items.length; a++) {
            switch (t) {
                case "dou": {
                    item_html += `<li class="list-group-item grey"><a data-toggle="modal" href="#modal" data-target="#modal" onclick="init_video_img_modal('${json["url"]}${items[a]}','${data[key][items[a]]}','img');">${data[key][items[a]]}</a></li>`
                    break;
                }
                case "chang": {
                    item_html += `<li class="list-group-item grey">${data[key][items[a]]}<a href="${data["url"]}${items[a]}.mp3" target="_blank" class="download_music" download><i class="fa fa-download" aria-hidden="true"></i></a><audio class="audio${is_Firefox ? "_Firefox" : ""}" src="${data["url"]}${items[a]}.mp3" controls></audio></li>`
                    break;
                }
                case "videos": {
                    item_html += `<li class="list-group-item grey"><a data-toggle="modal" href="#modal" data-target="#modal" onclick="init_video_img_modal('${json["url"]}${items[a]}','${data[key][items[a]]}');">${data[key][items[a]]}</a></li>`
                    break;
                }
                default: {
                    item_html += `<li class="list-group-item"><a data-toggle="modal" href="#modal" data-target="#modal" onclick="init_modal('${key}',${a});">${items[a]}</a></li>`
                }
            }
        }

        var html = `
    <div class="card">
        <h5 class="card-header">${key}</h5>
        <ul class="list-group list-group-flush">
            ${item_html}
        </ul>
    </div>
    <p> &nbsp;</p>`;
        card_deck.append(html);
        if (!is_Firefox) {
            $(".download_music").hide()
        }
    }




})

$('#modal').on('hidden.bs.modal', function (e) {
    $("#m_body").html(" ")
})
