
import { getxsstable } from "../../api"

export default {
    namespaced: true,
    actions: {
        getxsstable(context, value) {
            getxsstable(value).then(
                (response) => {
                    context.commit("GETXSSTABLE", response)
                },
                (err) => {
                    console.log(err)
                }
            )
        }
    },

    mutations: {
        GETXSSTABLE(state, value) {
            if(value.tokenvalid == 0){
                state.tokenvalid = 0
            }else{
                if(value.status == 0){
                    console.log("获取限时赛桌子信息失败...")
                }else{
                    state.xsstable = value.xsstablelist
                }
            }
        },
        RECOVERTOKENVALID(state){
            state.tokenvalid = 1
        }
    },

    state: {
        xsstable: [],
        tokenvalid : 1
    }
}