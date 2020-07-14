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
    if (event.type === 'postback' && event.postback.data) return client.replyMessage(event.replyToken, { type: 'text', text: event.postback.data });

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
        case "flex": {
            message = {
                "type": "flex",
                "altText": "Flex Message",
                "contents": {
                    "type": "bubble",
                    "header": {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                            {
                                "type": "text",
                                "text": "NEWS DIGEST",
                                "size": "sm",
                                "weight": "bold",
                                "color": "#AAAAAA"
                            }
                        ]
                    },
                    "hero": {
                        "type": "image",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_4_news.png",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "action": {
                            "type": "uri",
                            "label": "Action",
                            "uri": "https://linecorp.com/"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "horizontal",
                        "spacing": "md",
                        "contents": [
                            {
                                "type": "box",
                                "layout": "vertical",
                                "flex": 1,
                                "contents": [
                                    {
                                        "type": "image",
                                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/02_1_news_thumbnail_1.png",
                                        "gravity": "bottom",
                                        "size": "sm",
                                        "aspectRatio": "4:3",
                                        "aspectMode": "cover"
                                    },
                                    {
                                        "type": "image",
                                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/02_1_news_thumbnail_2.png",
                                        "margin": "md",
                                        "size": "sm",
                                        "aspectRatio": "4:3",
                                        "aspectMode": "cover"
                                    }
                                ]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "flex": 2,
                                "contents": [
                                    {
                                        "type": "text",
                                        "text": "7 Things to Know for Today",
                                        "flex": 1,
                                        "size": "xs",
                                        "gravity": "top"
                                    },
                                    {
                                        "type": "separator"
                                    },
                                    {
                                        "type": "text",
                                        "text": "Hay fever goes wild",
                                        "flex": 2,
                                        "size": "xs",
                                        "gravity": "center"
                                    },
                                    {
                                        "type": "separator"
                                    },
                                    {
                                        "type": "text",
                                        "text": "LINE Pay Begins Barcode Payment Service",
                                        "flex": 2,
                                        "size": "xs",
                                        "gravity": "center"
                                    },
                                    {
                                        "type": "separator"
                                    },
                                    {
                                        "type": "text",
                                        "text": "LINE Adds LINE Wallet",
                                        "flex": 1,
                                        "size": "xs",
                                        "gravity": "bottom"
                                    }
                                ]
                            }
                        ]
                    },
                    "footer": {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                            {
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "More",
                                    "uri": "https://linecorp.com"
                                }
                            }
                        ]
                    }
                }
            }

            break;
        }
        case "quickreply": {
            message = {
                "type": "text",
                "text": "Hello Quick Reply!",
                "quickReply": {
                    "items": [
                        {
                            "type": "action",
                            "action": {
                                "type": "cameraRoll",
                                "label": "Camera Roll"
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "camera",
                                "label": "Camera"
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "location",
                                "label": "Location"
                            }
                        },
                        {
                            "type": "action",
                            "imageUrl": "https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-1-512.png",
                            "action": {
                                "type": "message",
                                "label": "Message",
                                "text": "Hello World!"
                            }
                        },
                        {
                            "type": "action",
                            "action": {
                                "type": "postback",
                                "label": "Postback",
                                "data": "action=buy&itemid=123",
                                "displayText": "Buy"
                            }
                        },
                        {
                            "type": "action",
                            "imageUrl": "https://icla.org/wp-content/uploads/2018/02/blue-calendar-icon.png",
                            "action": {
                                "type": "datetimepicker",
                                "label": "Datetime Picker",
                                "data": "storeId=12345",
                                "mode": "datetime",
                                "initial": "2018-08-10t00:00",
                                "max": "2018-12-31t23:59",
                                "min": "2018-08-01t00:00"
                            }
                        }
                    ]
                }
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
                        },
                        {
                            "type": "message",
                            "label": "Menu 3",
                            "text": "menu3"
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
                            "type": "postback",
                            "label": "Universal Liff",
                            "data": "https://liff.line.me/1654446763-WNw4E4Mx"
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
        case "menu3": {
            message = {
                "type": "template",
                "altText": "this is a buttons template",
                "template": {
                    "type": "buttons",
                    "actions": [
                        {
                            "type": "message",
                            "label": "Flex",
                            "text": "flex"
                        },
                        {
                            "type": "message",
                            "label": "Quick Reply",
                            "text": "quickreply"
                        }
                    ],
                    "title": "Menu 3",
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