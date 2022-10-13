// 所有的api接口在此进行统一管理

import requests from "./request";

// 登录接口
export const login = (param) => requests.post('/sessions',param)

// 获取限时赛牌局仓库信息
export const getdata = () => requests.get()