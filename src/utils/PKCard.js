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
    var listcon = [{},{},{},{}]
    for (const x in list){
     listcon[x].order = list[x].order
     listcon[x].handcard = list[x].handcard   
    }
    for (const i in listcon) {
        listcon[i].handcard = JSON.parse(listcon[i].handcard)
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
