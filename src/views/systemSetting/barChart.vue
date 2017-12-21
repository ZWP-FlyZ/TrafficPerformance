<template>
    <section class="chart" >
        <el-row> 
            <el-col class="chart-container">
                <div class="chart-header">
                    <el-date-picker
                        v-model="endDate"
                        type="month"
                        placeholder="结束年月"
                        @change="selectOther"
                        :picker-options="pickerOptions0">
                    </el-date-picker>
                </div>
                <div class="chart-header">
                    <el-date-picker
                        v-model="beginDate"
                        type="month"
                        placeholder="起始年月"
                        @change="selectOther"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
                
                <div class="chart-header2">
                    统计期：{{ countDate }}
                </div>
                
                
            </el-col>
        </el-row>
        <el-row > 
            <el-col :xs="12" :sm="12" :md="12" :lg="12" class="chart-container">                
                <div id="energyPieChart" style="width:100%; height:400px;" class="chart-content"></div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" class="chart-container">                
                <div id="companyChart" style="width:100%; height:400px;" class="chart-content"></div>
            </el-col>   
            
              
        </el-row>
        <el-row>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" class="chart-container">                
                <div id="carTypeChart" style="width:100%; height:400px;" class="chart-content"></div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" class="chart-container">                
                <div id="distanceChart" style="width:100%; height:400px;" class="chart-content"></div>
            </el-col>   
                 
        </el-row>
        <el-row> 
            <el-col  class="chart-container">                
                <div id="guestChart" style="width:100%; height:400px;" class="chart-content"></div>
            </el-col>
              
        </el-row>
         

        <el-row>
            <el-col class="chart-container">
                <div class="chart-header">
                    <el-date-picker
                        v-model="year"
                        align="right"
                        type="year"
                        placeholder="选择年"
                        @change="selectYearMonth"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                </div>
                <div id="energyByYearChart" style="width:100%; height:400px;" class="chart-content"></div>
            </el-col>
        </el-row>   
    </section>
</template>

<script>
    import echarts from 'echarts'
    import {getCookie,delCookie,setCookie} from '../../common/js/Cookie.js';
    var energyPieChart;
    var companyChart;
    var carTypeChart;
    var distanceChart;
    var guestChart;
    var energyByYearChart;

    var dataForEngAll = [];//各能源饼图
    var dataForScalePer =[];//不同规模
    var dataForCarPer = [];//车辆类型
    var dataForDisPer =[];//运距类型
    var dataForEngPsger = [];//能源客位
    var dataForMon = [];//年度图表

    var carTypeMap;

    var k=1; //标志

    var _year=(new Date).getFullYear().toString();

    var requestData = {}; 

    

    var colors = ['#5793f3', '#d14a61'];
    var option = {
        color:colors,
        title:{
            text:'年度单耗、使用能耗关系图',
            left:'center'

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {readOnly:false},
                    saveAsImage : {show: true}
                },
                right:'3%'
            },
        legend: {
            data:['月使用能耗','单位能耗'],
            top : 20
        },
        xAxis: [
            {
                type: 'category',
                axisPointer: {
                    type: 'shadow'
                },
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                name:'月份',
                nameGap:'20'
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '月使用能耗(吨标准煤)',
                axisLine: {
                    lineStyle: {
                        color: '#5793f3'
                    }
                },
                axisLabel: {
                    formatter: '{value} '
                }
            },
            {
                type: 'value',
                name: '单位能耗(万吨标准煤/亿人公里)',
                nameGap : 35,
                nameLocation:'middle',
                axisLine: {
                    lineStyle: {
                        color: '#d14a61'
                    }
                },
                axisLabel: {
                    formatter: '{value} '
                }
            }
        ],
        series: [
            {
                name:'月使用能耗',
                type:'line'
            },
            {
                name:'单位能耗',
                type:'bar',
                yAxisIndex: 1
            }
        ]
    };
    var optionPi = {
        title:{
            text: '道路客运能源结构图',
            subtext:'单位：吨标准煤',
            x: 'center'
        },
        
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: []
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},                 
                dataView : {show: true, readOnly: false},
                saveAsImage : {show: true},
            },
            right:'4%'
        },
        series : [
            {
                name: '能耗',
                type: 'pie',
                radius : '75%',
                center: ['50%', '55%'],
                data:[],
            }
        ]

    };
    var optionScale={
        title:{
            text: '不同规模企业单位能耗柱状图',
            left:'center'
        },
        grid:{
            left:55,
            right:50
        },
        tooltip: {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'        
            }
        },
        legend: {
            data:[]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {readOnly:false},
                saveAsImage : {show: true}
                                
            },
            right:'4%'
        },
        xAxis: {
            data: [],
            name:'企业规模/车辆数（单位：辆）',
            nameLocation:'middle',
            nameGap:'25'
        },
        yAxis: {
            name:'单位能耗(万吨标煤/亿人公里)',
            nameLocation:'middle',
            nameGap:'40'
        },
        series : [
            {
                name:'单耗',
                type:'bar',
                barMaxWidth:'60%',
                data:[]
            }
        ]
    };
    var optionCarType={
        title:{
            text: '不同类型车辆单位能耗柱状图',
            left:'center'
        },
        grid:{
            left:55,
            right:50
        },
        tooltip: {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'        
            }
        },
        legend: {
            data:[]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {readOnly:false},
                saveAsImage : {show: true}
                                
            },
            right:'4%'
        },
        xAxis: {
            data: [],
            name:'车辆类型',
            nameGap:'2',
            axisLabel: {
                interval: 0,
                rotate: 30
            },
        },
        yAxis: {
            name:'单位能耗(万吨标煤/亿人公里)',
            nameLocation:'middle',
            nameGap:'40'
        },
        series : [
            {
                name:'单耗',
                type:'bar',
                barMaxWidth:'60%',
                data:[]
            }
        ]
    };
    var optionDistance={
        title:{
            text: '不同运距车辆单位能耗柱状图',
            left:'center'
        },
        grid:{
            left:55,
            right:50
        },
        tooltip: {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'        
            }
        },
        legend: {
            data:[]
        },
        toolbox: {
            show : true,
            feature : {
            mark : {show: true},
            dataView : {readOnly:false},
            saveAsImage : {show: true}
                                
            }
        },
        xAxis: {
            data: [],
            name:'运输距离（单位：公里）',
            nameLocation:'middle',
            nameGap:'25'
        },
        yAxis: {
            name:'单位能耗(万吨标煤/亿人公里)',
            nameLocation:'middle',
            nameGap:'40'
        },
        series : [
            {
                name:'单耗',
                type:'bar',
                barMaxWidth:'60%',
                data:[]
            }
        ]
    };
    var optionEngPsger={
        title: {
            text: '不同燃料类型不同客位车辆单位能耗柱状图',
            left:'center'
        },
        dataZoom: [
            {
                id: 'dataZoomX',
                type: 'slider',
                xAxisIndex: [0],
                filterMode: 'filter'
            }
        ],
        legend: {
            data:[],
            top : 30
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                magicType : {show: true, type: ['line', 'bar']},
                dataView : {readOnly:false},
                saveAsImage : {show: true}
            },
            right:'3%'
        },
        xAxis : [
            {
                type : 'category',
                data : [],
                name :'燃料类型',
                nameGap:5
            }
        ],
        yAxis : [
            {
                type : 'value',
                nameLocation : 'middle',
                name : '单位能耗(单位：万吨标准煤/亿人公里)',
                nameGap : 35
            }
        ],
        series : []
    };

    function setData(res){
        console.log(res);
        var monthData = new Object();
        var engerData = {};
        var scaleData={};
        var carTypeData={};
        var distanceData={};
        var engPsgerMap={};

        var month_all = new Array();//能耗
        var month_per = new Array();// eng_cl_e / eng_cl_l ;
        var eng_all_for_PI = []; //饼图填充数据
        var eng_per_for_scale =[];
        var eng_per_for_car =[];
        var eng_per_for_dis = [];
        var engPsgerSeries = [];

        var xAisMon = [_year+'-01',_year+'-02',_year+'-03',_year+'-04',_year+'-05',_year+'-06',
            _year+'-07',_year+'-08',_year+'-09',_year+'-10',_year+'-11',_year+'-12']

        res.engTypOther.forEach(function(element){

            element.engTypMo.forEach(function(e2){
                var t = monthData[e2.type];
                if(!t) t = [0,0];
                t[0] += e2.typDatOfAllEng;
                t[1] += e2.typDatOfAllLen;
                monthData[e2.type] = t;
            });

            element.engTypSs.forEach(function(e2){
                if (!engPsgerMap[e2.type]) 
                    engPsgerMap[e2.type] ={};
                if(!engPsgerMap[e2.type][element.baseTyp])
                    engPsgerMap[e2.type][element.baseTyp] =[0,0];
                
                var t = engPsgerMap[e2.type][element.baseTyp];
                t[0] += e2.typDatOfAllEng;
                t[1] += e2.typDatOfAllLen;
                engPsgerMap[e2.type][element.baseTyp] = t;

                var t = engerData[element.baseTyp];
                if(!t) t = [0,0];
                t[0] += e2.typDatOfAllEng;
                t[1] += e2.typDatOfAllLen;
                engerData[element.baseTyp] = t; 
            });
        });

        res.entTypOther.forEach(function(element){
            var t = scaleData[element.baseTyp];
            if(!t) t = [0,0];
            t[0] += element.baseTypDatOfAllEng;
            t[1] += element.baseTypDatOfAllLen;
            scaleData[element.baseTyp] = t;
        });


        res.disTypOther.forEach(function(element){
            var t = distanceData[element.baseTyp];
            if(!t) t=[0,0];
            t[0] += element.baseTypDatOfAllEng;
            t[1] += element.baseTypDatOfAllLen;
            distanceData[element.baseTyp] = t;
        });

        res.carTypOther.forEach(function(element){
            var t = carTypeData[element.baseTyp];
            if(!t) t=[0,0];
            t[0] += element.baseTypDatOfAllEng;
            t[1] += element.baseTypDatOfAllLen;
            carTypeData[element.baseTyp] = t;
        });

        //准备能源数据
        res.xs[1].forEach(function(e1){
            var t = engerData[e1];
            if(t)
            {
                eng_all_for_PI.push({name:e1,value:(t[0]).toFixed(2)})
            }else{
            }
        });

        //准备企业规模柱状图数据
        res.xs[3].forEach(function(e1){
            var t = scaleData[e1];
            if(t){
                eng_per_for_scale.push((t[0]/t[1]).toFixed(2));
            }else{
                eng_per_for_scale.push(0);
            }
        });

        //准备不同运距柱状图数据
        res.xs[4].forEach(function(e1){
            var t = distanceData[e1];
            if(t){
                eng_per_for_dis.push((t[0]/t[1]).toFixed(2));
            }else{
                eng_per_for_dis.push(0);
            }
        });

        //生成车辆类型映射表
        if(!carTypeMap){
            carTypeMap = {};
            var ts= res.xs[5];
            for(var i=1;i<=ts.length;i++)
                carTypeMap['c'+i] = ts[i-1];
            //console.log(carTypeMap);
        }
        
         //准备不同车辆类型柱状图数据
        var xstmp = [];
        var other=[0,0];
        var hasother = false;
        for(var i in carTypeData){
            if(carTypeData.hasOwnProperty(i)){
                var t = carTypeData[i];
                if(carTypeMap.hasOwnProperty(i)){
                    //if(t){
                        eng_per_for_car.push((t[0]/t[1]).toFixed(2));
                   // }else{
                       // eng_per_for_car.push(0);
                   // }
                    xstmp.push(carTypeMap[i]);
                }else{
                   // if(t){
                        hasother = true;
                        other[0] += t[0];
                        other[1] += t[1];
                   // }
                }
            }
        }
        if(hasother){
            eng_per_for_car.push((other[0]/other[1]).toFixed(2));
            xstmp.push('其它');
        }
       
        // res.xs[5].forEach(function(e1){
        //     var t = carTypeData[e1];
        //     if(t){
        //         eng_per_for_car.push((t[0]/t[1]).toFixed(2));
        //     }else{
        //         eng_per_for_car.push(0);
        //     }
        // });

        //准备燃料客位柱状图数据
        res.xs[2].forEach(function(i){
            var tmpEngDatas =[];
            if(!engPsgerMap[i]){
                var tmpSeriseObj = {
                        name:i,
                        type:'bar',
                        data:[]
                };
                engPsgerSeries.push(tmpSeriseObj);
            }else{
                res.xs[1].forEach(function(e1){
                    var t = engPsgerMap[i][e1];
                    if(t)
                    {
                        tmpEngDatas.push((t[0]/t[1]).toFixed(2))
                    }else{
                        //eng_all_for_PI.push({name:e1,value:0})
                        tmpEngDatas.push(0);
                    }
                });
                var tmpSeriseObj = {
                    name:i,
                    type:'bar',
                    data:tmpEngDatas
                };
                engPsgerSeries.push(tmpSeriseObj);
            }
        });

        if (k==1||k==3) {
            dataForEngAll.splice(0,dataForEngAll.length);
            dataForEngAll.push(res.xs[1]);
            dataForEngAll.push(eng_all_for_PI);

            dataForScalePer.splice(0,dataForScalePer.length);
            dataForScalePer.push(res.xs[3]);
            dataForScalePer.push(eng_per_for_scale);

            dataForDisPer.splice(0,dataForDisPer.length);
            dataForDisPer.push(res.xs[4]);
            dataForDisPer.push(eng_per_for_dis);

            dataForCarPer.splice(0,dataForCarPer.length);
            dataForCarPer.push(xstmp);
            dataForCarPer.push(eng_per_for_car);

            dataForEngPsger.splice(0,dataForEngPsger.length);
            dataForEngPsger.push(res.xs[2]);
            dataForEngPsger.push(res.xs[1]);
            dataForEngPsger.push(engPsgerSeries);
        }

        //准备年度数据
        xAisMon.forEach(function(e1){
            var t = monthData[e1];
            if(t) 
            {
                month_all.push((t[0]).toFixed(2));
                month_per.push((t[0]/t[1]).toFixed(2));
            }else
            {
                month_all.push(0);
                month_per.push(0);
            }
        });

        if (k==2) {
            dataForMon.splice(0,dataForMon.length);
            dataForMon.push(res.xs[0]);
            dataForMon.push(month_all);
            dataForMon.push(month_per);
        }

    };


    export default {
        data() {
            return {
                year:'',
                countDate: '',
                beginDate:'',
                endDate:'',
                pickerOptions0: {
                    disabledDate(time) {
                        if(time.getFullYear()>(new Date()).getFullYear())
                            return true;
                        if(time.getFullYear()==(new Date()).getFullYear())
                            return time.getMonth() >= (new Date()).getMonth();
                        else
                            return false;        
                    }
                },
                pickerOptions1: {
                    disabledDate(time) {
                        if(time.getFullYear()>(new Date()).getFullYear())
                            return true;
                        if(time.getFullYear()==(new Date()).getFullYear())
                            return time.getMonth() >= (new Date()).getMonth();
                        else
                            return false;        
                    }
                },
                pickerOptions2: {
                    disabledDate(time) {
                        if((new Date()).getMonth==0)
                            return time.getFullYear()>=(new Date()).getFullYear();
                        else
                            return time.getFullYear()>(new Date()).getFullYear();
                    }
                }
            }
        },
        methods: {
            initRequestData(requestData){
                var date = new Date;
                var year = date.getFullYear();
                var month = date.getMonth()-1;
                if(month<=0){
                    year = year -1;
                    month += 12;
                }else{
                    if(month>=1 && month<=9)
                        month = '0'+month;
                }
                var token = getCookie('token');
                var userInfo = JSON.parse(getCookie('userInfo'));
                requestData.token = token;
                requestData.username = userInfo.name;
                if(userInfo.roleName!=null && userInfo.roleName!="")
                    requestData.roleName = userInfo.roleName;
                requestData.roleType = userInfo.roleType;
                  if(userInfo.place1!=null && userInfo.place1!="")
                    requestData.place1 =userInfo.place1;
                else
                    delete  requestData.place1;
                if(userInfo.place2!=null && userInfo.place2!="")
                    requestData.place2 = userInfo.place2;
                else
                    delete  requestData.place2;          
                requestData.timeRange = year+'-'+month+'-01:'+year+'-'+month+'-31';

                this.countDate = year+'年'+month+'月';
                
            },
            getDataFromService(requestData){
                var _this = this;
                if(k==1||k==3){
                    energyPieChart.showLoading({text:'加载中'});
                    companyChart.showLoading({text:'加载中'});
                    carTypeChart.showLoading({text:'加载中'});
                    distanceChart.showLoading({text:'加载中'});
                    guestChart.showLoading({text:'加载中'});
                }
                if(k==1||k==2){
                    energyByYearChart.showLoading({text:'加载中'});
                }
                $.get(this.Constant.ajaxAddress+this.Constant.roadpassAjax,requestData).
                done(function (res){
                    if(k==1||k==3){
                        energyPieChart.hideLoading();
                        companyChart.hideLoading();
                        carTypeChart.hideLoading();
                        distanceChart.hideLoading();
                        guestChart.hideLoading();
                    }
                    if(k==2){
                        energyByYearChart.hideLoading();
                    }
                    if(res.errCode==30){//data ok
                        setData(res);
                        if(k==1||k==3)
                        {
                           // optionPi.legend.data = dataForEngAll[0];
                            optionPi.series[0].data = dataForEngAll[1];
                            energyPieChart.clear();
                            energyPieChart.setOption(optionPi);

                            optionScale.xAxis.data = dataForScalePer[0];
                            optionScale.series[0].data = dataForScalePer[1];
                            companyChart.clear();
                            companyChart.setOption(optionScale);

                            optionDistance.xAxis.data = dataForDisPer[0];
                            optionDistance.series[0].data = dataForDisPer[1];
                            distanceChart.clear();
                            distanceChart.setOption(optionDistance);

                            optionCarType.xAxis.data = dataForCarPer[0];
                            optionCarType.series[0].data = dataForCarPer[1];
                            carTypeChart.clear();
                            carTypeChart.setOption(optionCarType);

                            optionEngPsger.legend.data = dataForEngPsger[0];
                            optionEngPsger.xAxis[0].data = dataForEngPsger[1];
                            optionEngPsger.series = dataForEngPsger[2];
                            guestChart.clear();
                            guestChart.setOption(optionEngPsger);


                        }
                        if(k ==2){
                            
                           // option.xAxis[0].data =  dataForMon[0];
                            option.series[1].data = dataForMon[2];
                            option.series[0].data = dataForMon[1];
                            energyByYearChart.clear();
                            energyByYearChart.setOption(option);
                        }
                        if(k==1){
                            var date = new Date;
                            var year = date.getFullYear();
                            var month = date.getMonth()-1;
                            if(month<=0){
                                year -= 1;
                            }
                            _this.selectYearMonth(year);
                        }
                    }else if(res.errCode==31){ // data err
                        _this.$message({
                            showClose: true,
                            message: '获取数据失败，请稍后再试',
                            type: 'error',
                            duration:2500
                        });
                    }else if(res.errCode==44){ // auth 
                        _this.$router.push('/login');
                    }  
                });
                
            },
            selectOther(){
                k = 3;
                if(this.beginDate!='' && this.endDate!=''){
                    if(this.beginDate > this.endDate){
                        this.$message({
                            showClose: true,
                            message: '起始年月不能大于结束年月',
                            type: 'warning',
                            duration:2500
                        });
                        return;
                    }
                    var by = this.beginDate.getFullYear();
                    var bm = this.beginDate.getMonth()+1;
                    if(bm>=1 && bm <=9)
                        bm = '0'+bm;
                    if(this.beginDate == this.endDate){
                        requestData['timeRange'] = by + '-' + bm +'-01:' + by + '-' +bm + '-31';
                        this.countDate = by+'年'+bm+'月';
                    }else{
                        var ey = this.endDate.getFullYear();
                        var em = this.endDate.getMonth()+1;
                        if(em>=1 && em <=9)
                            em = '0'+em;
                        requestData['timeRange'] = by + '-' + bm +'-01:' + ey + '-' + em + '-31';
                        this.countDate = by+'年'+bm+'月 至 '+ey+'年'+em+'月';
                    }
                    this.getDataFromService(requestData);

                   

                }


            },
            selectYearMonth(y){
                k =2;

                if(!y||y=='')
                    return ;
                option.title.text = y +'年度单耗、使用能耗关系图';
                _year = y;
                var date = new Date();
                var year = date.getFullYear();
                if(year==y){
                    var month = date.getMonth().toString();
                    y = y+'-01-01:'+y+'-'+month+'-31';
                }else{
                    y = y +'-01-01:'+y+'-12-31';
                }
                requestData['timeRange']=y;
                
                this.getDataFromService(requestData);
            } 
            
        },
        mounted: function () {

            dataForEngAll = [];//各能源饼图
            dataForScalePer =[];//不同规模
            dataForCarPer = [];//车辆类型
            dataForDisPer =[];//运距类型
            dataForEngPsger = [];//能源客位
            dataForMon = [];//年度图表
            k=1; //标志

            requestData = {};

            optionPi.series.forEach(function(e){
                e.data=[];
            });
            optionScale.series.forEach(function(e){
                e.data=[];
            });
            optionDistance.series.forEach(function(e){
                e.data=[];
            });
            optionCarType.series.forEach(function(e){
                e.data=[];
            });
            optionEngPsger.series.forEach(function(e){
                e.data=[];
            });
            option.series.forEach(function(e){
                e.data=[];
            });
                        
            energyPieChart = echarts.init(document.getElementById('energyPieChart'));
            companyChart = echarts.init(document.getElementById('companyChart'));
            distanceChart = echarts.init(document.getElementById('distanceChart'));
            carTypeChart = echarts.init(document.getElementById('carTypeChart'));
            guestChart = echarts.init(document.getElementById('guestChart'));
            energyByYearChart = echarts.init(document.getElementById('energyByYearChart'));
            
            energyPieChart.setOption(optionPi);
            companyChart.setOption(optionScale);
            distanceChart.setOption(optionDistance);
            carTypeChart.setOption(optionCarType);
            guestChart.setOption(optionEngPsger);
            energyByYearChart.setOption(option);

            this.initRequestData(requestData);
            this.getDataFromService(requestData);
            
        },
        updated: function () {
            console.log("update");
        }
    }
</script>

<style scoped lang="scss">
    .chart {
        width: 1100px;
        float: left;
        .chart-container{
             background-color: #F2F2F2; 
             border-radius: 8px;
            .chart-header{
                float: right;
                margin-right: 20px;
                position: relative;
            }
            .chart-header2{
                float: left;
                font-weight:500;
                margin-left: 20px;
                top:10px;
                position: relative;
            }
            .chart-content{
                overflow: hidden;
            }
        }
        
    }

    .el-col {
        padding: 15px 15px;
        border-radius: 4px;
    }
    .el-row {
        margin-bottom: 15px;
        &:last-child {
        margin-bottom: 0;
        }
    }
</style>
