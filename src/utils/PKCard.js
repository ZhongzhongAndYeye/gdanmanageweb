/*
    * 描述：扑克牌逻辑值
*/
var PKCard =
{
    //方
    "🃁": 1, //1 A
    "🃂": 2, //2
    "🃃": 3, //3
    "🃄": 4, //4
    "🃅": 5, //5
    "🃆": 6, //6
    "🃇": 7, //7
    "🃈": 8, //8
    "🃉": 9, //9
    "🃊": 10, //10
    "🃋": 11, //11 J
    "🃍": 12, //12 Q
    "🃎": 13, //13 K

    //梅
    "🃑": 17, //1
    "🃒": 18, //2
    "🃓": 19, //3
    "🃔": 20, //4
    "🃕": 21, //5
    "🃖": 22, //6
    "🃗": 23, //7
    "🃘": 24, //8
    "🃙": 25, //9
    "🃚": 26, //10
    "🃛": 27, //J
    "🃝": 28, //Q
    "🃞": 29, //K

    //红
    "🂱": 33, //1
    "🂲": 34, //2
    "🂳": 35, //3
    "🂴": 36, //4
    "🂵": 37, //5
    "🂶": 38, //6
    "🂷": 39, //7
    "🂸": 40, //8
    "🂹": 41, //9
    "🂺": 42, //10
    "🂻": 43, //J
    "🂽": 44, //Q
    "🂾": 45, //K

    //黑
    "🂡": 49, //1
    "🂢": 50, //2
    "🂣": 51, //3
    "🂤": 52, //4
    "🂥": 53, //5
    "🂦": 54, //6
    "🂧": 55, //7
    "🂨": 56, //8
    "🂩": 57, //9
    "🂪": 58, //10
    "🂫": 59, //J
    "🂭": 60, //Q
    "🂮": 61, //K

    //王
    "🃟": 65, //65 小王
    "🂿": 66, //66 大王
}

// js中的数组是引用传递
export const changeListToEmoji = (list) => {
    //[{order int,handcard []}{}{}{}] 
    var listcon = [{},{},{},{}]
    for (const x in list){
     listcon[x].order = list[x].order
     listcon[x].handcard = list[x].handcard   
    }
    // 将handcard由string-->[] 然后再将int[]--->emoji[]
    for (const i in listcon) {
        listcon[i].handcard = JSON.parse(listcon[i].handcard)
        SortList(listcon[i].handcard) // 排序
        for (const x in list[i].handcard) {
            for (const j in PKCard) {
                if (PKCard[j] == listcon[i].handcard[x]) {
                    listcon[i].handcard[x] = j
                }
            }
        }
    }
    return listcon
}

// 将一局的emoji数组转为牌值的数组
export const changeEmojiToList = (emoji) => {
    // console.log(emoji)
    var listcon = [{},{},{},{}]
    for(const i in emoji){
        listcon[i].order = emoji[i].order
        listcon[i].handcard = []
        for(const j in emoji[i].handcard){
            listcon[i].handcard[j] = emoji[i].handcard[j]
        }
    }
    // console.log(listcon)
    for(const i in listcon){
        for(const x in listcon[i].handcard){
            for (const j in PKCard){
                if(listcon[i].handcard[x] == j){
                    listcon[i].handcard[x] = PKCard[j]
                }
            }
        }
    }
    return listcon 
}

// 牌值权重
var PKCard2 =
{
    //方
    1:49,
    2:1,
    3:5,
    4:9,
    5:13,
    6:17,
    7:21,
    8:25,
    9:29,
    10:33,
    11:37,
    12:41,
    13:45,

    //梅
    17:50,
    18:2,
    19:6,
    20:10,
    21:14,
    22:18,
    23:22,
    24:26,
    25:30,
    26:34,
    27:38,
    28:42,
    29:46,

    //红
    33:51,
    34:3,
    35:7,
    36:11,
    37:15,
    38:19,
    39:23,
    40:27,
    41:31,
    42:35,
    43:39,
    44:43,
    45:47,

    //黑
    49:52, 
    50:4, 
    51:8, 
    52:12, 
    53:16, 
    54:20, 
    55:24, 
    56:28, 
    57:32, 
    58:36, 
    59:40, 
    60:44, 
    61:48, 

    //王
    65:53, // 小王
    66:54, // 大王
}
// 数组排序 大-小王-a[黑 红 梅 方]-k-q-j...3-2  
const SortList = (list) => {
    // 将其转化为权重列表
    for(const i in list){
        for(const j in PKCard2){
            if (list[i] == j){
                list[i] = PKCard2[j]
                break
            } 
        }
    }
    // 从大到小排序权重列表
    list.sort(function(a,b){
        return b-a
    })
    // 将排序好的权重数组转为原数组
    for(const i in list){
        for(const j in PKCard2){
            if(list[i] == PKCard2[j]){
                list[i] = j*1 // j遍历出来变成字符串了，*1转为int
                break
            }
        }
    }
}

// 判断牌的颜色是否为红色
export const PKCardColor = (pkstr) => {
    if (pkstr=="🃁"||pkstr=="🃂"||pkstr=="🃃"||pkstr=="🃄"||pkstr=="🃅"||pkstr=="🃆"||pkstr=="🃇"||pkstr=="🃈"||pkstr=="🃉"||pkstr=="🃊"||pkstr=="🃋"||pkstr=="🃍"||pkstr=="🃎"){
        return 1
    }
    if (pkstr=="🂱"||pkstr=="🂲"||pkstr=="🂳"||pkstr=="🂴"||pkstr=="🂵"||pkstr=="🂶"||pkstr=="🂷"||pkstr=="🂸"||pkstr=="🂹"||pkstr=="🂺"||pkstr=="🂻"||pkstr=="🂽"||pkstr=="🂾"||pkstr=="🂿"){
        return 1
    }
    return 0
}

