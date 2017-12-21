<template>
    <section>
        <div class="chart" v-loading = "editLoading">
        <el-row style="background: #B0E0E6">
            <div class="chart-header">
                <el-select v-model="tranType" filterable placeholder="请选择交通行业" @change="trafficSelectChange">
                    <el-option
                        v-for="item in optionTraffic"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
            </div>
        </el-row>    
        <el-row style="background: #D1EEEE">  
            <div class="chart-header">
                <el-date-picker
                    v-model="beginDate"
                    type="month"
                    placeholder="起始年月"
                    @change="selectOther"
                    :picker-options="pickerOptions1">
                </el-date-picker>
            </div> 
            <div class="chart-header">
                <el-date-picker
                    v-model="endDate"
                    type="month"
                    placeholder="结束年月"
                    @change="selectOther"
                    :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
            <div class="chart-header2">
                <el-input
                    placeholder="请输入查询企业代码"
                    icon="search"
                    v-model="inputCompID"
                    :on-icon-click="handleIconClick">
                </el-input>
            </div>
        </el-row>
        <el-row>
            <el-table
                
                :data="tableData"
                border
                height="500"
                :default-sort="{prop: 'passrate', order: 'descending'}"
                style="width:100%">
                <el-table-column
                    prop="month"
                    label="月份"
                    sortable
                    :formatter="formatterMonth"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="companyid"
                    label="企业代码"
                    sortable
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="passrate"
                    label="合格率"
                    sortable
                    :formatter="formatterPass"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="rank"
                    label="等级"
                    :filters="rankType"
                    :filter-method="filterRank"
                    width="150">
                </el-table-column>
            </el-table>
        </el-row>
        <el-row style="background:#F0F8FF">
            <div class="chart-info">
                <p>
                填报合格率100%，质量评定等级A；填报合格率80%-100%，质量评定等级B；<br /> 
                填报合格率60%-80%，质量评定等级C；填报合格率60%以下，质量评定等级D；
                </p>
                <b>
                查询时企业代码栏可不填，此时默认查询该交通行业下全部企业的质量评价。
                </b>
            </div>
        </el-row>
        </div>
    </section>
</template>


<script>
    
    import {getCookie,delCookie,setCookie} from '../../common/js/Cookie.js';
    var requestData={};
    var rankDefine = [{min:0,max:0.6,type:'D'},{min:0.6,max:0.8,type:'C'},
                        {min:0.8,max:1,type:'B'},{min:1,max:1.1,type:'A'}]  //min<=passrate<max
    export default {
        data(){
            return{
                inputCompID:'',
                editLoading:false,
                tranType:'',
                optionTraffic:[],
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
                beginDate:'',
                endDate:'',
                tableData:[],
                rankType:[{text:'A',value:'A'},{text:'B',value:'B'},{text:'C',value:'C'},{text:'D',value:'D'}],
            };
        },
        methods:{
            formatterPass(row,column){
                return (Math.round(row.passrate*10000)/100).toFixed(1)+"%";
            }, 
            formatterMonth(row,column){
                return row.month.slice(0,4)+'-'+row.month.slice(4);
            },
            filterRank(value,row){
                return row.rank === value;
            },
            filterMonth(value,row){
                return row.month === value;
            },
            initSelectBox(){
                var userInfo = JSON.parse(getCookie('userInfo'));
                if(userInfo.roleType=='R_LAN')
                    var traffic = ['道路客运','道路货运','公交客运','出租客运'];
                else if(userInfo.roleType=='R_WAT')
                    var traffic = ['海洋客运','海洋货运','内河运输','港口生产'];
                else
                    var traffic = ['道路客运','道路货运','公交客运','出租客运','海洋客运','海洋货运','内河运输','港口生产'];
                var isDisabled;
                this.optionTraffic= traffic.map(item => {
                    isDisabled = false;
                    return { value: item, label: item ,disabled: isDisabled};
                });
            },
            initRequestData(requestData){
                var userInfo = JSON.parse(getCookie('userInfo'));
                if(userInfo.roleType=='R_WAT'){
                    requestData.tranType = "海洋客运";
                    this.tranType = "海洋客运"
                }else{
                    requestData.tranType="道路客运"
                    this.tranType = "道路客运"
                }
                requestData.companyId = '';
                var year = new Date().getFullYear();
                var month = new Date().getMonth();
                var flag = Math.ceil((month+1)/3)-1;   //上一季度
                if(flag == 0){
                    requestData.timeRange = (year-1)+'-10:'+ (year-1)+'-12';
                   // this.beginDate = new Date(year-1,9);
                    //this.endDate = new Date(year-1,11);
                }else{
                    var endmon = flag*3;
                    var startmon =endmon-2;
                    //this.beginDate = new Date(year,startmon-1);
                    //this.endDate = new Date(year,endmon-1);
                    if(startmon>=1&&startmon<=9)
                        startmon = '0'+startmon;
                    if(endmon>=1&&endmon<=9)
                        endmon = '0'+endmon;
                    requestData.timeRange = year+'-'+startmon+':'+ year+'-'+endmon;
                    
                }
                
                //console.log(requestData);
            },
            trafficSelectChange(tt){
                if(!tt||tt=='')
                    return ;
                requestData['tranType']=tt;
            },
            selectOther(){
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
                    
                    var ey = this.endDate.getFullYear();
                    var em = this.endDate.getMonth()+1;


                    if(bm>=1 && bm <=9)
                        bm = '0'+bm;
                    if(em>=1 && em <=9)
                        em = '0'+em;
                    requestData['timeRange'] = by + '-' + bm +':' + ey + '-' + em;
                }
            },
            
            
            handleIconClick(){
                if(this.beginDate=='' || this.endDate==''){
                    this.$message({
                        showClose: true,
                        message: '请选择查询时间范围',
                        type: 'warning',
                        duration:2500
                    });
                    return;
                }
                if(this.beginDate > this.endDate){
                    this.$message({
                        showClose: true,
                        message: '起始年月不能大于结束年月',
                        type: 'warning',
                        duration:2500
                    });
                    return;
                }
                requestData['companyId'] = this.inputCompID;
                this.getDataFromService();
            },
            getDataFromService(){
                var _this = this;
               this.editLoading = true;
               //console.log(requestData);
                $.get(this.Constant.dataAjaxAddress+this.Constant.getEvel,requestData).
                done(function(res){
                    if(res.errCode==30){
                        //console.log(res);
                        _this.editLoading = false;
                        _this.setTableData(res);
                        
                    }else if(res.errCode==31){
                        _this.$message('获取数据失败，请稍后再试');
                    }
                });
            },
            
            setTableData(res){
                
                this.tableData = [];
                if(res.rawdata==null||res.rawdata=='')
                    return;
                if(res.data==null||res.data=='')
                    res.data=[];
                res.rawdata.forEach(element => {
                    var cot = element.cot;
                    var ym = element.ym;
                    var companyId = element.companyId;
                    var obj = {};
                    obj.month = ym;
                    obj.companyid = companyId;
                    res.data.forEach(e2 => {
                        if(e2.ym == ym && e2.companyId == companyId){
                            obj.passrate = e2.cot/cot;
                            for(var i=0;i<rankDefine.length;i++){
                                if(obj.passrate>=rankDefine[i].min&&obj.passrate<rankDefine[i].max){
                                    obj.rank = rankDefine[i].type;
                                    break;
                                }
                            }
                        } 
                    });
                    if(!obj['passrate']){
                        obj.passrate = 0;
                        obj.rank = 'D';
                    }
                    this.tableData.push(obj);
                });
                
            },


        },
        mounted:function(){
            requestData={};
            this.initSelectBox();
            this.initRequestData(requestData);
            this.getDataFromService();
            //this.setTableData();
        },
        updated: function () {
            console.log("update");
        }
    }
</script>



<style scoped lang="scss">

    .chart {
        
        margin-top: 50px;
        margin-left: 10%;
        width: 800px;
        float: left;

        .chart-header{
            margin-bottom: 10px;
            margin-top: 10px;
            margin-left: 20px;
            float: left;
            width: 190px;
            position: relative;
        }
        .chart-header2{
            margin-bottom: 10px;
            margin-top: 10px;
            margin-right: 20px;
            float: right;
            position: relative;
        }
        .chart-info{
            margin:20px;
        }
    }
    

    
</style>