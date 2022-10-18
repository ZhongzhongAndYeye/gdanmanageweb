// 所有的api接口在此进行统一管理
import requests from "./request";

// 登录接口
export const login = (param) => requests({method:'post',url:'/sessions',data:param})

// 获取限时赛牌局仓库信息
export const getxsskc = (token) => requests({method:'get',url:'/gdanmanage/xsskc',headers:{token:token}})

// 删除指定的限时赛库存牌局
export const delxsskc = (token,pjid) => requests({method:'delete',url:'/gdanmanage/xsskc',headers:{token:token},data:{pjid:pjid}})

// 限时赛创建桌子
export const createxsstable = (token,tablename) => requests({method:'post',url:'/gdanmanage/xsstable',headers:{token:token},data:{tablename:tablename}})

// 获取所有限时赛桌子信息
export const getxsstable = (token) => requests({method:'get',url:'/gdanmanage/xsstable',headers:{token:token}})