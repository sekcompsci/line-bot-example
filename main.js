const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

// console.log(`config:`, config)

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.get('/', (req, res) => {
    res.json({ sucess: true })
})

app.post('/callback', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

// event handler
const handleEvent = (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') return Promise.resolve(null);

    let message = undefined

    switch (event.message.text.toLowerCase()) {
        case "buttons": {
            message = {
                "type": "template",
                "altText": "this is a buttons template",
                "template": {
                    "type": "buttons",
                    "actions": [
                        {
                            "type": "message",
                            "label": "สอบถามข้อมูล",
                            "text": "สอบถามข้อมูล"
                        },
                        {
                            "type": "message",
                            "label": "ติดตามข้อมูล",
                            "text": "ติดตามข้อมูล"
                        }
                    ],
                    "thumbnailImageUrl": "https://www.somwang.co.th/content/somwang/th/loan/_jcr_content/image/file/_jcr_content/_dam_thumbnails/_dam_thumbnail_300.png",
                    "title": "สมหวังเงินสั่งได้",
                    "text": "บริการสินเชื่อจำนำทะเบียนรถทุกประเภท ได้แก่ รถจักรยานยนต์ รถ"
                }
            }

            break;
        }
        case "carousel": {
            message = {
                "type": "template",
                "altText": "this is a carousel template",
                "template": {
                    "type": "carousel",
                    "actions": [],
                    "columns": [
                        {
                            "thumbnailImageUrl": "https://www.somwang.co.th/content/somwang/th/loan/_jcr_content/image/file/_jcr_content/_dam_thumbnails/_dam_thumbnail_300.png",
                            "title": "สมหวังเงินสั่งได้",
                            "text": "บริการสินเชื่อจำนำทะเบียนรถทุกประเภท ได้แก่ รถจักรยานยนต์ รถ",
                            "actions": [
                                {
                                    "type": "message",
                                    "label": "Action 1",
                                    "text": "Action 1"
                                },
                                {
                                    "type": "message",
                                    "label": "Action 2",
                                    "text": "Action 2"
                                }
                            ]
                        },
                        {
                            "thumbnailImageUrl": "https://www.somwang.co.th/content/somwang/th/insurance/_jcr_content/image/file/_jcr_content/_dam_thumbnails/_dam_thumbnail_300.png",
                            "title": "สมหวังกันภัย",
                            "text": "พบข้อเสนอประกันภัยจากสมหวัง กับแผนความคุ้มครองที่หลากหลาย ตา",
                            "actions": [
                                {
                                    "type": "message",
                                    "label": "Action 1",
                                    "text": "Action 1"
                                },
                                {
                                    "type": "message",
                                    "label": "Action 2",
                                    "text": "Action 2"
                                }
                            ]
                        }
                    ]
                }
            }

            break;
        }
        case "text": {
            message = {
                "type": "text",
                "text": "สมหวังเงินสั่งได้"
            }

            break;
        }
        case "image": {
            message = {
                "type": "image",
                "originalContentUrl": "https://www.somwang.co.th/content/somwang/th/loan/_jcr_content/image/file/_jcr_content/_dam_thumbnails/_dam_thumbnail_300.png",
                "previewImageUrl": "https://www.somwang.co.th/content/somwang/th/loan/_jcr_content/image/file/_jcr_content/_dam_thumbnails/_dam_thumbnail_300.png",
                "animated": false
            }

            break;
        }
        case "video": {
            message = {
                "type": "video",
                "originalContentUrl": "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4",
                "previewImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rotating_earth_(large).gif/220px-Rotating_earth_(large).gif"
            }

            break;
        }
        case "audio": {
            message = {
                "type": "audio",
                "originalContentUrl": "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.m4a",
                "duration": 187000
            }

            break;
        }
        case "menus": {
            message = {
                "type": "template",
                "altText": "this is a buttons template",
                "template": {
                    "type": "buttons",
                    "actions": [
                        {
                            "type": "message",
                            "label": "Menu 1",
                            "text": "menu1"
                        },
                        {
                            "type": "message",
                            "label": "Menu 2",
                            "text": "menu2"
                        }
                    ],
                    "title": "Menus",
                    "text": "เลือกรายการเมนู"
                }
            }

            break;
        }
        case "menu1": {
            message = {
                "type": "template",
                "altText": "this is a buttons template",
                "template": {
                    "type": "buttons",
                    "actions": [
                        {
                            "type": "message",
                            "label": "Buttons",
                            "text": "buttons"
                        },
                        {
                            "type": "message",
                            "label": "Carousel",
                            "text": "carousel"
                        },
                        {
                            "type": "uri",
                            "label": "Internal Liff",
                            "uri": "line://app/1654446763-WNw4E4Mx"
                        },
                        {
                            "type": "message",
                            "label": "Universal Liff",
                            "text": "https://liff.line.me/1654446763-WNw4E4Mx"
                        }
                    ],
                    "title": "Menu 1",
                    "text": "เลือกข้อความที่ต้องการแสดง"
                }
            }

            break;
        }
        case "menu2": {
            message = {
                "type": "template",
                "altText": "this is a buttons template",
                "template": {
                    "type": "buttons",
                    "actions": [
                        {
                            "type": "message",
                            "label": "Text",
                            "text": "text"
                        },
                        {
                            "type": "message",
                            "label": "Image",
                            "text": "image"
                        },
                        {
                            "type": "message",
                            "label": "Video",
                            "text": "video"
                        },
                        {
                            "type": "message",
                            "label": "Audio",
                            "text": "audio"
                        }
                    ],
                    "title": "Menu 2",
                    "text": "เลือกข้อความที่ต้องการแสดง"
                }
            }

            break;
        }
        default: message = { type: 'text', text: event.message.text }
    }

    return client.replyMessage(event.replyToken, message);
}

// listen on port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});