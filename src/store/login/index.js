import {login} from "../../api"

export default {
    namespaced: true,

    actions: {
        login(context, value) {
            var param = {
                username: value[0],
                password: value[1]
            }
            if (value[0] == "" || value[1] == "") {
                alert("账号或密码不能为空！");
                return;
            }
            login(param).then(
                response => {
                    context.commit("LOGIN", response)
                },
                err => {
                    console.log("err")
                }
            )
        }
    },

    mutations: {
        LOGIN(state, value) {
            state.msg = value.msg
            if (value.msg == "登录成功") {
                state.token = value.token
            }
        }
    },

    state: {
        msg : "",
        token : ""
    }
}