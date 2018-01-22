var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = "http://600tuvungtoeic.com/";

var url_constract = "http://600tuvungtoeic.com/index.php?mod=lesson&id=1";

var base_url = "http://600tuvungtoeic.com/index.php?mod=lesson&id=";

var url_details = [

]


function createUrl_detail() {
    fs.readFile('./topic.json', (err, data) => {
        var obj = JSON.parse(data);
        var count = 0;
        obj.forEach(element => {
            var tmp = {};
            tmp.name = element.name;
            tmp.url = base_url + (++count);
            url_details.push(tmp);
        });

        url_details.forEach(el => {
            crawl_detail(el.url, el.name);
        })

    })
}

function crawl_topic() {
    var data = [];

    request(url, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            var $ = cheerio.load(body);

            $('.gallery-item').each((i, element) => {

                var obj = {};

                if (i % 5 == 0) {
                    var a = $(element).children();
                    var content = $(element).children('.content-gallery').children('h3');
                    obj.name = content.text().split('-')[1].trim();
                    obj.image_url = a.attr('src');
                    // console.log(obj);
                    // console.log(i, ' ', a.attr('src'), ' - ', content.text());
                } else {
                    var a1 = $(element).children().children('img');
                    var content = $(element).children('.content-gallery').children('h3');
                    obj.name = content.text().split('-')[1].trim();
                    obj.image_url = a1.attr('src');
                    // console.log(obj);
                    // console.log(i, ' ', a1.attr('src'), '-', content.text());
                }
                data.push(obj);
            })

            console.log(data);

            fs.writeFileSync('topic.json', JSON.stringify(data), 'utf-8');

        } else {
            console.log('Error', err);
        }

    })
}

function crawl_detail(url, namefile) {
    var data = [];

    request(url, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            var $ = cheerio.load(body);

            var obj = [];


            $('.tuvung').each((i, element) => {
                var content = {};
                var example = {};
                var stt = $(element).children('.stt').text().trim();
                var image = $(element).children('.hinhanh').children('img').attr('src');

                content.image_url = image;  //  1

                // example_vi
                var explan_vi = $(element).children('.noidung').children('b').text();
                // console.log(i, ' ', explan_vi.text());
                example.vi = explan_vi;

                var audio = $(element).children('.noidung').children('audio').children('source').attr();
                // console.log(i, ' ', audio);
                let ado = {};
                if (audio && audio.src){
                    ado.audio_url = audio.src;
                }else{
                    console.log(namefile, ' ', image);
                }
                if (audio && audio.type){
                    ado.audio_type = audio.type;
                }else{
                    console.log(namefile, ' ', image);
                }

                content.audio = ado;


                var noidung = $(element).children('.noidung').children('span').each((i, el) => {

                    switch (i) {
                        case 0:
                            content.name = $(el).text();    // 2 
                            break;
                        case 1:
                            content.pronunciation = $(el).text();   // 3
                            break;
                        default: break;
                    }
                    // console.log('i : ', i, ' ', $(el).text());
                    //
                });
                var tes = $(element).children('.noidung').children().remove().end().text().trim();
                var parseString = tes.split('\n');

                if (parseString[0]) {
                    content.explanation = parseString[0].trim();
                } else {
                    console.log('name : ', namefile, '  string : ', tes)
                }
                if (parseString[1]) {

                    content.vocabulary = parseString[1].trim();
                } else {
                    console.log('name : ', namefile, '  string : ', tes)
                }
                if (parseString[2]) {
                    example.en = parseString[2].trim();
                } else {
                    console.log('name : ', namefile, '  string : ', tes)
                }
                content.example = example;


                obj.push(content);
            })

            fs.writeFileSync('./data/' + namefile + '.json', JSON.stringify(obj), 'utf-8');

        } else {
            console.log('Error', err);
        }

    })

}


// crawl_topic();

createUrl_detail();

// crawl_detail();
