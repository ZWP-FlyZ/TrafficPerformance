import Login from './views/Login.vue'
import Register from './views/register3.vue'
import scale from './views/scale.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import barChart from './views/systemSetting/barChart.vue'
import Table from './views/systemSetting/Table.vue'
import Form from './views/systemSetting/Form.vue'
import user from './views/systemSetting/user.vue'
import dataDic from './views/systemSetting/dataDic.vue'
import unitInfo from './views/basicInfo/unitInfo.vue'
import unitScale from './views/basicInfo/unitScale.vue'
import carEquip from './views/basicInfo/carEquip.vue'
import shipEquip from './views/basicInfo/shipEquip.vue'
import harbourEquip from './views/basicInfo/harbourEquip.vue'
import Page6 from './views/statisticalAnalysis/Page6.vue'
import RoadGoods from './views/statisticalAnalysis/RoadGoods.vue'
import Index from './views/index/Index.vue'
import main from './views/Main.vue'
import busChart from './components/busChart.vue'
import taxiChart from './components/taxiChart.vue'
import allTypChart from './components/allTypChart.vue'
import engTypChgChart from './components/engTypChgChart.vue'
import traTypPreChgChart from './components/traTypPreChgChart.vue'
import relTimDatChart from './components/relTimDatChart.vue'
import OceanFreight from './views/statisticalAnalysis/OceanFreight.vue'
import TrafficEnergy from './views/statisticalAnalysis/TrafficEnergy.vue'
import CityEnergy from './views/statisticalAnalysis/CityEnergy.vue'
//import TotalEnergy from './views/statisticalAnalysis/TotalEnergy.vue'
import DataInMap from './views/datadetection/DataInMap.vue'
import GuestCar from './views/datadetection/GuestCar.vue'//数据监测，客运车辆
import goodsCar from './views/datadetection/GoodsCar.vue'//数据监测，货运车辆
import taxi from './views/datadetection/Taxi.vue'//数据监测，出租车
import bus from './views/datadetection/Bus.vue'//数据监测，公交车
import riverShip from './views/datadetection/RiverShip.vue'//数据监测，内河船舶
import rivTraChart from './components/rivTraChart.vue'
import OceanPgerTrans from './views/statisticalAnalysis/OceanPgerTrans.vue'
import PortProduction from './views/statisticalAnalysis/PortProduction.vue'
import EnergyStruct from './views/statisticalAnalysis/EnergyStruct.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },{
        path: '/scale',
        component: scale,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        hidden: true,
        redirect: { path: '/index' }
    },
    {
        path: '/index.html',
        hidden: true,
        redirect: { path: '/index' }
    },
    {
        path: '/enger/login',
        hidden: true,
        redirect: { path: '/login' }
    },
    {
        path: '/enger/index.html',
        hidden: true,
        redirect: { path: '/index' }
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-home',
        leaf: true,//只有一个节点
        children: [
            { path: '/index', component: Index, name: '首页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        
        iconCls: 'fa fa-cogs',
        children: [
            { path: '/table', pri:['R_ADMIN'],component: Table, name: '用户管理' },
            { path: '/user', pri:['R_ADMIN','R_TRA','R_LAN','R_WAT','R_ENT'],component: user, name: '密码修改' },
            { path: '/unitInfo', pri:['R_ADMIN','R_TRA','R_LAN','R_WAT','R_ENT'],component: unitInfo, name: '技术支持' },
            { path: '/unitScale', pri:['R_ADMIN','R_TRA','R_LAN','R_WAT','R_ENT'],component: unitScale, name: '帮助文档' },
            { path: '/dataDic',pri:['R_ADMIN'], component: dataDic, name: '数据字典' }
        ]
    },

    {
        path: '/',
        component: Home,
        name: '统计分析',
        iconCls: 'fa fa-bar-chart-o',
        children: [
            { path: '/barChart', pri:['R_ADMIN','R_TRA','R_LAN','R_ENT'],component: barChart,  name: '道路客运' },
            { path: '/RoadGoods', pri:['R_ADMIN','R_TRA','R_LAN','R_ENT'],component: RoadGoods,  name: '道路货运' },
            { path: '/busChart', pri:['R_ADMIN','R_TRA','R_LAN','R_ENT'],component: busChart,  name: '公交客运' },
            { path: '/taxiChart', pri:['R_ADMIN','R_TRA','R_LAN','R_ENT'],component: taxiChart,  name: '出租车运输' },
            { path: '/rivTraChart', pri:['R_ADMIN','R_TRA','R_WAT','R_ENT'],component: rivTraChart,  name: '内河运输' },
            { path: '/OceanFreight', pri:['R_ADMIN','R_TRA','R_WAT','R_ENT'],component: OceanFreight,  name: '海洋货运' },
            { path: '/OceanPgerTrans', pri:['R_ADMIN','R_TRA','R_WAT','R_ENT'],component: OceanPgerTrans,  name: '海洋客运' },
            { path: '/PortProduction', pri:['R_ADMIN','R_TRA','R_WAT','R_ENT'],component: PortProduction,  name: '港口生产' },
            { path: '/traTypPreChgChart', pri:['R_ADMIN','R_TRA','R_LAN','R_WAT','R_ENT'],component: traTypPreChgChart,  name: '能耗变化趋势' },
            { path: '/allTypChart', pri:['R_ADMIN','R_TRA','R_LAN','R_WAT','R_ENT'],component: allTypChart,  name: '单位运距能耗指标' },
            { path: '/CityEnergy', pri:['R_ADMIN','R_TRA','R_LAN','R_WAT','R_ENT'],component: CityEnergy,  name: '地市能耗构成图' },
            { path: '/TrafficEnergy', pri:['R_ADMIN','R_TRA','R_LAN','R_WAT','R_ENT'],component: TrafficEnergy,  name: '交通方式能耗构成图' }, 
            { path: '/engTypChgChart', pri:['R_ADMIN','R_TRA','R_LAN','R_WAT','R_ENT'],component: engTypChgChart,  name: '年度数据对比' },           
        ]
    },

     {
        path: '/',
        component: Home,
        name: '数据监测',
        iconCls: 'fa fa-eye',
        children: [
            { path: '/relTimDatChart', pri:['R_ADMIN','R_TRA','R_LAN','R_ENT'],component: relTimDatChart, name: '数据展示' },
            { path: '/GuestCar', pri:['R_ADMIN','R_TRA','R_LAN','R_ENT'],component: GuestCar, name: '客运车辆' },
            { path: '/goodsCar', pri:['R_ADMIN','R_TRA','R_LAN','R_ENT'],component: goodsCar, name: '货运车辆' },
            { path: '/taxi', pri:['R_ADMIN','R_TRA','R_LAN','R_ENT'],component: taxi, name: '出租车' },
            { path: '/bus', pri:['R_ADMIN','R_TRA','R_LAN','R_ENT'],component: bus, name: '公交车' },
            { path: '/riverShip', pri:['R_ADMIN','R_TRA','R_WAT','R_ENT'],component: riverShip, name: '内河船舶' },
            { path: '/DataInMap', pri:['R_ADMIN','R_TRA','R_LAN','R_WAT','R_ENT'],component: DataInMap, name: '专题图展示'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;