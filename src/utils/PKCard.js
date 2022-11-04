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
    "🃑": 17, //17
    "🃒": 18, //18
    "🃓": 19, //19
    "🃔": 20, //20
    "🃕": 21, //21
    "🃖": 22, //22
    "🃗": 23, //23
    "🃘": 24, //24
    "🃙": 25, //25
    "🃚": 26, //26
    "🃛": 27, //27
    "🃝": 28, //28
    "🃞": 29, //29

    //红
    "🂱": 33, //33
    "🂲": 34, //34
    "🂳": 35, //35
    "🂴": 36, //36
    "🂵": 37, //37
    "🂶": 38, //38
    "🂷": 39, //39
    "🂸": 40, //40
    "🂹": 41, //41
    "🂺": 42, //42
    "🂻": 43, //43
    "🂽": 44, //44
    "🂾": 45, //45

    //黑
    "🂡": 49, //49
    "🂢": 50, //50
    "🂣": 51, //51
    "🂤": 52, //52
    "🂥": 53, //53
    "🂦": 54, //54
    "🂧": 55, //55
    "🂨": 56, //56
    "🂩": 57, //57
    "🂪": 58, //58
    "🂫": 59, //59
    "🂭": 60, //60
    "🂮": 61, //61

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

