// 所有的api接口在此进行统一管理
import requests from "./request";

// 登录接口
export const login = (param) => requests({method:'post',url:'/sessions',data:param})

// 获取限时赛牌局仓库信息
export const getxsskc = (token) => requests({method:'get',url:'/gdanmanage/xsskc',headers:{token}})

// 删除指定的限时赛库存牌局
export const delxsskc = (token,pjid) => requests({method:'delete',url:'/gdanmanage/xsskc',headers:{token},data:{pjid}})

// 限时赛创建桌子
export const createxsstable = (token,tablename) => requests({method:'post',url:'/gdanmanage/xsstable',headers:{token},data:{tablename}})

// 获取所有限时赛桌子信息
export const getxsstable = (token) => requests({method:'get',url:'/gdanmanage/xsstable',headers:{token}})

// 限时赛出库接口
export const outofxsskc = (token,tableid,pjid) => requests({method:'post',url:'/gdanmanage/xsskc',headers:{token},data:{tableid,pjid}})

// 获取限时赛指定桌子下的所有牌局
export const getxssyx = (token,tableid) => requests({method:'get',url:'/gdanmanage/xssyx',headers:{token},params:{tableid}})

// 删除限时赛指定桌子下的指定牌局
export const delxssyx = (token,tablepjid) => requests({method:'delete',url:'gdanmanage/xssyx',headers:{token},data:{tablepjid}})

// 改变限时赛指定桌子下的指定牌局order
export const changexssyxorder = (token,tablepjid,beforeo,aftero) => requests({method:'post',url:"gdanmanage/xssyx/order",headers:{token},data:{tablepjid,beforeo,aftero}})