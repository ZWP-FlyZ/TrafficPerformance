<template>
   <section class="chart">
        <el-tabs v-model="traffic" type="border-card" v-loading ="editLoading" @tab-click="handleClick">
            <el-tab-pane label="道路客运">
                <el-row>
                    <div class="chart-content" style="font-weight:bold;text-align:center">
                        <el-col :span="3" :offset="6">均值</el-col>
                        <el-col :span="4" :offset="2">区间范围</el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="chart-content">
                        <el-form :model="roadpassform" label-width="180px" ref="roadpassform" label-position="right">
                            <el-form-item label="燃油消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.oilavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadpassform.oilmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.oilmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="燃气消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.gasavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadpassform.gasmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.gasmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="电能消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.elecavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadpassform.elecmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.elecmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="其他燃料消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.otheravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadpassform.othermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.othermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="旅客周转量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.turnoveravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadpassform.turnovermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.turnovermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">万人公里</el-col>
                            </el-form-item>
                            <el-form-item label="运行距离阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.rundisavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadpassform.rundismin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadpassform.rundismax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">公里</el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :offset="9" >
                                    <el-button @click="resetForm('roadpassform')" style="width:80px">重 置</el-button>
                                    <el-button type="primary" @click="submitForm('roadpassform')" style="width:80px">提 交</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="道路货运">
                <el-row>
                    <div class="chart-content" style="font-weight:bold;text-align:center">
                        <el-col :span="3" :offset="6">均值</el-col>
                        <el-col :span="4" :offset="2">区间范围</el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="chart-content">
                        <el-form :model="roadgoodsform" label-width="180px" ref="roadgoodsform" label-position="right">
                            <el-form-item label="燃油消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.oilavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadgoodsform.oilmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.oilmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="燃气消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.gasavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadgoodsform.gasmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.gasmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="电能消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.elecavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadgoodsform.elecmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.elecmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="其他燃料消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.otheravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadgoodsform.othermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.othermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="货运周转量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.turnoveravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadgoodsform.turnovermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.turnovermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">万吨公里</el-col>
                            </el-form-item>
                            <el-form-item label="运行距离阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.rundisavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="roadgoodsform.rundismin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="roadgoodsform.rundismax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">公里</el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :offset="9" >
                                    <el-button @click="resetForm('roadgoodsform')" style="width:80px">重 置</el-button>
                                    <el-button type="primary" @click="submitForm('roadgoodsform')" style="width:80px">提 交</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="公交客运">
                <el-row>
                    <div class="chart-content" style="font-weight:bold;text-align:center">
                        <el-col :span="3" :offset="6">均值</el-col>
                        <el-col :span="4" :offset="2">区间范围</el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="chart-content">
                        <el-form :model="busform" label-width="180px" ref="busform" label-position="right">
                            <el-form-item label="燃油消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="busform.oilavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="busform.oilmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="busform.oilmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="燃气消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="busform.gasavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="busform.gasmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="busform.gasmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="电能消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="busform.elecavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="busform.elecmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="busform.elecmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="其他燃料消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="busform.otheravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="busform.othermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="busform.othermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="旅客周转量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="busform.turnoveravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="busform.turnovermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="busform.turnovermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">万人公里</el-col>
                            </el-form-item>
                            <el-form-item label="运行距离阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="busform.rundisavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="busform.rundismin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="busform.rundismax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">公里</el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :offset="9" >
                                    <el-button @click="resetForm('busform')" style="width:80px">重 置</el-button>
                                    <el-button type="primary" @click="submitForm('busform')" style="width:80px">提 交</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="出租客运">
                <el-row>
                    <div class="chart-content" style="font-weight:bold;text-align:center">
                        <el-col :span="3" :offset="6">均值</el-col>
                        <el-col :span="4" :offset="2">区间范围</el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="chart-content">
                        <el-form :model="taxiform" label-width="180px" ref="taxiform" label-position="right">
                            <el-form-item label="燃油消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="taxiform.oilavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="taxiform.oilmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="taxiform.oilmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="燃气消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="taxiform.gasavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="taxiform.gasmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="taxiform.gasmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="电能消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="taxiform.elecavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="taxiform.elecmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="taxiform.elecmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="其他燃料消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="taxiform.otheravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="taxiform.othermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="taxiform.othermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="旅客周转量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="taxiform.turnoveravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="taxiform.turnovermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="taxiform.turnovermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">万人公里</el-col>
                            </el-form-item>
                            <el-form-item label="运行距离阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="taxiform.rundisavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="taxiform.rundismin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="taxiform.rundismax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">公里</el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :offset="9" >
                                    <el-button @click="resetForm('taxiform')" style="width:80px">重 置</el-button>
                                    <el-button type="primary" @click="submitForm('taxiform')" style="width:80px">提 交</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="内河运输">
                <el-row>
                    <div class="chart-content" style="font-weight:bold;text-align:center">
                        <el-col :span="3" :offset="6">均值</el-col>
                        <el-col :span="4" :offset="2">区间范围</el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="chart-content">
                        <el-form :model="riverform" label-width="180px" ref="riverform" label-position="right">
                            <el-form-item label="燃油消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="riverform.oilavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="riverform.oilmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="riverform.oilmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="燃气消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="riverform.gasavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="riverform.gasmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="riverform.gasmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="电能消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="riverform.elecavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="riverform.elecmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="riverform.elecmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="其他燃料消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="riverform.otheravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="riverform.othermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="riverform.othermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="货运周转量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="riverform.turnoveravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="riverform.turnovermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="riverform.turnovermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">万吨公里</el-col>
                            </el-form-item>
                            <el-form-item label="运行距离阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="riverform.rundisavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="riverform.rundismin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="riverform.rundismax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">公里</el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :offset="9" >
                                    <el-button @click="resetForm('riverform')" style="width:80px">重 置</el-button>
                                    <el-button type="primary" @click="submitForm('riverform')" style="width:80px">提 交</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                        
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="海洋客运">
                <el-row>
                    <div class="chart-content" style="font-weight:bold;text-align:center">
                        <el-col :span="3" :offset="6">均值</el-col>
                        <el-col :span="4" :offset="2">区间范围</el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="chart-content">
                        <el-form :model="oceanpassform" label-width="180px" ref="oceanpassform" label-position="right">
                            <el-form-item label="燃油消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.oilavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceanpassform.oilmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.oilmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="燃气消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.gasavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceanpassform.gasmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.gasmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="电能消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.elecavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceanpassform.elecmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.elecmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="其他燃料消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.otheravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceanpassform.othermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.othermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="旅客周转量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.turnoveravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceanpassform.turnovermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.turnovermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">万人公里</el-col>
                            </el-form-item>
                            <el-form-item label="运行距离阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.rundisavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceanpassform.rundismin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceanpassform.rundismax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">公里</el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :offset="9" >
                                    <el-button @click="resetForm('oceanpassform')" style="width:80px">重 置</el-button>
                                    <el-button type="primary" @click="submitForm('oceanpassform')" style="width:80px">提 交</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="海洋货运">
                <el-row>
                    <div class="chart-content" style="font-weight:bold;text-align:center">
                        <el-col :span="3" :offset="6">均值</el-col>
                        <el-col :span="4" :offset="2">区间范围</el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="chart-content">
                        <el-form :model="oceangoodsform" label-width="180px" ref="oceangoodsform" label-position="right">
                            <el-form-item label="燃油消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.oilavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceangoodsform.oilmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.oilmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="燃气消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.gasavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceangoodsform.gasmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.gasmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="电能消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.elecavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceangoodsform.elecmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.elecmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="其他燃料消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.otheravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceangoodsform.othermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.othermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="货运周转量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.turnoveravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceangoodsform.turnovermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.turnovermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">万吨公里</el-col>
                            </el-form-item>
                            <el-form-item label="运行距离阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.rundisavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="oceangoodsform.rundismin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="oceangoodsform.rundismax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">公里</el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :offset="9" >
                                    <el-button @click="resetForm('oceangoodsform')" style="width:80px">重 置</el-button>
                                    <el-button type="primary" @click="submitForm('oceangoodsform')" style="width:80px">提 交</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="港口生产">
                <el-row>
                    <div class="chart-content" style="font-weight:bold;text-align:center">
                        <el-col :span="3" :offset="6">均值</el-col>
                        <el-col :span="4" :offset="2">区间范围</el-col>
                    </div>
                </el-row>
                <el-row>
                    <div class="chart-content">
                        <el-form :model="portproform" label-width="180px" ref="portproform" label-position="right">
                            <el-form-item label="燃油消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="portproform.oilavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="portproform.oilmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="portproform.oilmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="燃气消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="portproform.gasavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="portproform.gasmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="portproform.gasmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="电能消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="portproform.elecavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="portproform.elecmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="portproform.elecmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="其他燃料消耗量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="portproform.otheravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="portproform.othermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="portproform.othermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨标准煤</el-col>
                            </el-form-item>
                            <el-form-item label="生产量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="portproform.turnoveravg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="portproform.turnovermin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="portproform.turnovermax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">吨</el-col>
                            </el-form-item>
                            <el-form-item label="吞吐量阈值设定">
                                <el-col :span="4">
                                    <el-input v-model="portproform.throughoutavg"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <el-input v-model="portproform.throughoutmin"></el-input>
                                </el-col>
                                <el-col :span="1" style="text-align:center">-</el-col>
                                <el-col :span="4">
                                    <el-input v-model="portproform.throughoutmax"></el-input>
                                </el-col>
                                <el-col :span="4" style="text-align:center">万吨</el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :offset="9" >
                                    <el-button @click="resetForm('portproform')" style="width:80px">重 置</el-button>
                                    <el-button type="primary" @click="submitForm('portproform')" style="width:80px">提 交</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-row>
            </el-tab-pane>
        </el-tabs>
   </section>
</template>
<script>
  var element  = ['rundisavg','rundismin','rundismax','turnoveravg','turnovermin','turnovermax','oilavg',
                    'oilmin','oilmax','gasavg','gasmin','gasmax','elecavg','elecmin','elecmax',
                    'otheravg','othermin','othermax'];
  var portelement = ['throughoutavg','throughoutmin','throughoutmax','turnoveravg','turnovermin','turnovermax','oilavg',
                    'oilmin','oilmax','gasavg','gasmin','gasmax','elecavg','elecmin','elecmax',
                    'otheravg','othermin','othermax']; 
  var sendData = {};  
  var resetData  = {};
  export default {
    data() {
      return {
          traffic:'',
          roadpassform:{
              oilavg:'',
              oilmin:'',
              oilmax:'',
              gasavg:'',
              gasmin:'',
              gasmax:'',
              elecavg:'',
              elecmin:'',
              elecmax:'',
              otheravg:'',
              othermin:'',
              othermax:'',
              turnoveravg:'',
              turnovermin:'',
              turnovermax:'',
              rundisavg:'',
              rundismin:'',
              rundismax:'',
          },
          roadgoodsform:{
              oilavg:'',
              oilmin:'',
              oilmax:'',
              gasavg:'',
              gasmin:'',
              gasmax:'',
              elecavg:'',
              elecmin:'',
              elecmax:'',
              otheravg:'',
              othermin:'',
              othermax:'',
              turnoveravg:'',
              turnovermin:'',
              turnovermax:'',
              rundisavg:'',
              rundismin:'',
              rundismax:'',
          },
          busform:{
              oilavg:'',
              oilmin:'',
              oilmax:'',
              gasavg:'',
              gasmin:'',
              gasmax:'',
              elecavg:'',
              elecmin:'',
              elecmax:'',
              otheravg:'',
              othermin:'',
              othermax:'',
              turnoveravg:'',
              turnovermin:'',
              turnovermax:'',
              rundisavg:'',
              rundismin:'',
              rundismax:'',
          },
          taxiform:{
              oilavg:'',
              oilmin:'',
              oilmax:'',
              gasavg:'',
              gasmin:'',
              gasmax:'',
              elecavg:'',
              elecmin:'',
              elecmax:'',
              otheravg:'',
              othermin:'',
              othermax:'',
              turnoveravg:'',
              turnovermin:'',
              turnovermax:'',
              rundisavg:'',
              rundismin:'',
              rundismax:'',
          },
          riverform:{
              oilavg:'',
              oilmin:'',
              oilmax:'',
              gasavg:'',
              gasmin:'',
              gasmax:'',
              elecavg:'',
              elecmin:'',
              elecmax:'',
              otheravg:'',
              othermin:'',
              othermax:'',
              turnoveravg:'',
              turnovermin:'',
              turnovermax:'',
              rundisavg:'',
              rundismin:'',
              rundismax:'',
          },
          oceanpassform:{
              oilavg:'',
              oilmin:'',
              oilmax:'',
              gasavg:'',
              gasmin:'',
              gasmax:'',
              elecavg:'',
              elecmin:'',
              elecmax:'',
              otheravg:'',
              othermin:'',
              othermax:'',
              turnoveravg:'',
              turnovermin:'',
              turnovermax:'',
              rundisavg:'',
              rundismin:'',
              rundismax:'',
          },
          oceangoodsform:{
              oilavg:'',
              oilmin:'',
              oilmax:'',
              gasavg:'',
              gasmin:'',
              gasmax:'',
              elecavg:'',
              elecmin:'',
              elecmax:'',
              otheravg:'',
              othermin:'',
              othermax:'',
              turnoveravg:'',
              turnovermin:'',
              turnovermax:'',
              rundisavg:'',
              rundismin:'',
              rundismax:'',
          },
          portproform:{
              oilavg:'',
              oilmin:'',
              oilmax:'',
              gasavg:'',
              gasmin:'',
              gasmax:'',
              elecavg:'',
              elecmin:'',
              elecmax:'',
              otheravg:'',
              othermin:'',
              othermax:'',
              turnoveravg:'',
              turnovermin:'',
              turnovermax:'',
              throughoutavg:'',
              throughoutmin:'',
              throughoutmax:'',
          },
          editLoading:false
      };
    },
    methods:{
        checkInput(num){
                
        },
        initsendData(formName){ 
            if(formName=='roadpassform'){
                sendData.tranType = '道路客运';
                sendData.ranges  = '';
                var rangesArr = [];
                var copyForm = {};
                for(var i=0;i<element.length;i++){
                   // console.log(this.roadpassform[element[i]]);
                    var num = this.roadpassform[element[i]];
                    if(isNaN(num)||num.toString().indexOf(" ")>=0){          
                        this.$message({
                            message: '均值和区间范围必须为数字',
                            type: 'warning'
                        });
                        return;
                    }else{
                        if(num==''||num==null||new RegExp("^[ ]+$").test(num)){
                            //console.log(i);
                            copyForm[element[i]] = 'N';
                            this.roadpassform[element[i]]='';
                        }else{
                            copyForm[element[i]] = num;
                        }
                    }
                }
                for(var i=1;i<=element.length;i=i+3){
                    var range = copyForm[element[i-1]]+'_'+ copyForm[element[i]]+'_'+
                                copyForm[element[i+1]];
                    rangesArr.push(range);
                }
                sendData.ranges = JSON.stringify(rangesArr);
                console.log(sendData);
            }
            if(formName=='roadgoodsform'){
                sendData.tranType = '道路货运';
                sendData.ranges = '';
                var rangesArr = [];
                var copyForm = {};
                for(var i=0;i<element.length;i++){
                   // console.log(this.roadgoodsform[element[i]]);
                    var num = this.roadgoodsform[element[i]];
                    if(isNaN(num)||num.toString().indexOf(" ")>=0){          
                        this.$message({
                            message: '均值和区间范围必须为数字',
                            type: 'warning'
                        });
                        return;
                    }else{
                        if(num==''||num==null||new RegExp("^[ ]+$").test(num)){
                            //console.log(i);
                            copyForm[element[i]] = 'N';
                            this.roadgoodsform[element[i]]='';
                        }else{
                            copyForm[element[i]] = num;
                        }
                    }
                }
                for(var i=1;i<=element.length;i=i+3){
                    var range = copyForm[element[i-1]]+'_'+ copyForm[element[i]]+'_'+
                                copyForm[element[i+1]];
                    rangesArr.push(range);
                }
                sendData.ranges = JSON.stringify(rangesArr);
                console.log(sendData);
            }
            if(formName=='busform'){
                sendData.tranType = '公交客运';
                sendData.ranges = '';
                var rangesArr = [];
                var copyForm = {};
                for(var i=0;i<element.length;i++){
                   // console.log(this.busform[element[i]]);
                    var num = this.busform[element[i]];
                    if(isNaN(num)||num.toString().indexOf(" ")>=0){          
                        this.$message({
                            message: '均值和区间范围必须为正确格式的数字（或为空值）',
                            type: 'warning'
                        });
                        return;
                    }else{
                        if(num==''||num==null||new RegExp("^[ ]+$").test(num)){
                            //console.log(i);
                            copyForm[element[i]] = 'N';
                            this.busform[element[i]]='';
                        }else{
                            copyForm[element[i]] = num;
                        }
                    }
                }
                for(var i=1;i<=element.length;i=i+3){
                    var range = copyForm[element[i-1]]+'_'+ copyForm[element[i]]+'_'+
                                copyForm[element[i+1]];
                    rangesArr.push(range);
                }
                sendData.ranges = JSON.stringify(rangesArr);
                console.log(sendData);
            }
            if(formName=='taxiform'){
                sendData.tranType = '出租客运';
                sendData.ranges = '';
                var rangesArr = [];
                var copyForm = {};
                for(var i=0;i<element.length;i++){
                   // console.log(this.taxiform[element[i]]);
                    var num = this.taxiform[element[i]];
                    if(isNaN(num)||num.toString().indexOf(" ")>=0){          
                        this.$message({
                            message: '均值和区间范围必须为数字',
                            type: 'warning'
                        });
                        return;
                    }else{
                        if(num==''||num==null||new RegExp("^[ ]+$").test(num)){
                            //console.log(i);
                            copyForm[element[i]] = 'N';
                            this.taxiform[element[i]]='';
                        }else{
                            copyForm[element[i]] = num;
                        }
                    }
                }
                for(var i=1;i<=element.length;i=i+3){
                    var range = copyForm[element[i-1]]+'_'+ copyForm[element[i]]+'_'+
                                copyForm[element[i+1]];
                    rangesArr.push(range);
                }
                sendData.ranges = JSON.stringify(rangesArr);
                console.log(sendData);
            }
            if(formName=='riverform'){
                sendData.tranType = '内河运输';
                sendData.ranges = '';
                var rangesArr = [];
                var copyForm = {};
                for(var i=0;i<element.length;i++){
                   // console.log(this.riverform[element[i]]);
                    var num = this.riverform[element[i]];
                    if(isNaN(num)||num.toString().indexOf(" ")>=0){          
                        this.$message({
                            message: '均值和区间范围必须为数字',
                            type: 'warning'
                        });
                        return;
                    }else{
                        if(num==''||num==null||new RegExp("^[ ]+$").test(num)){
                            //console.log(i);
                            copyForm[element[i]] = 'N';
                            this.riverform[element[i]]='';
                        }else{
                            copyForm[element[i]] = num;
                        }
                    }
                }
                for(var i=1;i<=element.length;i=i+3){
                    var range = copyForm[element[i-1]]+'_'+ copyForm[element[i]]+'_'+
                                copyForm[element[i+1]];
                    rangesArr.push(range);
                    
                }
                sendData.ranges = JSON.stringify(rangesArr);
                console.log(sendData);
            }
            if(formName=='oceanpassform'){
                sendData.tranType = '海洋客运';
                sendData.ranges = '';
                var rangesArr= [];
                var copyForm = {};
                for(var i=0;i<element.length;i++){
                   // console.log(this.oceanpassform[element[i]]);
                    var num = this.oceanpassform[element[i]];
                    if(isNaN(num)||num.toString().indexOf(" ")>=0){          
                        this.$message({
                            message: '均值和区间范围必须为数字',
                            type: 'warning'
                        });
                        return;
                    }else{
                        if(num==''||num==null||new RegExp("^[ ]+$").test(num)){
                            //console.log(i);
                            copyForm[element[i]] = 'N';
                            this.oceanpassform[element[i]]='';
                        }else{
                            copyForm[element[i]] = num;
                        }
                    }
                }
                for(var i=1;i<=element.length;i=i+3){
                    var range = copyForm[element[i-1]]+'_'+ copyForm[element[i]]+'_'+
                                copyForm[element[i+1]];
                    rangesArr.push(range);
                }
                sendData.ranges = JSON.stringify(rangesArr);
                console.log(sendData);
            }
            if(formName=='oceangoodsform'){
                sendData.tranType = '海洋货运';
                sendData.ranges = '';
                var rangesArr = [];
                var copyForm = {};
                for(var i=0;i<element.length;i++){
                   // console.log(this.oceangoodsform[element[i]]);
                    var num = this.oceangoodsform[element[i]];
                    if(isNaN(num)||num.toString().indexOf(" ")>=0){          
                        this.$message({
                            message: '均值和区间范围必须为数字',
                            type: 'warning'
                        });
                        return;
                    }else{
                        if(num==''||num==null||new RegExp("^[ ]+$").test(num)){
                            //console.log(i);
                            copyForm[element[i]] = 'N';
                            this.oceangoodsform[element[i]]='';
                        }else{
                            copyForm[element[i]] = num;
                        }
                    }
                }
                for(var i=1;i<=element.length;i=i+3){
                    var range = copyForm[element[i-1]]+'_'+ copyForm[element[i]]+'_'+
                                copyForm[element[i+1]];
                    rangesArr.push(range);
                }
                sendData.ranges = JSON.stringify(rangesArr);
                console.log(sendData);
            }
            if(formName=='portproform'){
                sendData.tranType = '港口生产';
                sendData.ranges = '';
                var rangesArr =[];
                var copyForm = {};
                for(var i=0;i<portelement.length;i++){
                   // console.log(this.portproform[portelement[i]]);
                    var num = this.portproform[portelement[i]];
                    if(isNaN(num)||num.toString().indexOf(" ")>=0){          
                        this.$message({
                            message: '均值和区间范围必须为数字',
                            type: 'warning'
                        });
                        return;
                    }else{
                        if(num==''||num==null||new RegExp("^[ ]+$").test(num)){
                            //console.log(i);
                            copyForm[portelement[i]] = 'N';
                            this.portproform[portelement[i]]='';
                        }else{
                            copyForm[portelement[i]] = num;
                        }
                    }
                }
                for(var i=1;i<=portelement.length;i=i+3){
                    var range = copyForm[portelement[i-1]]+'_'+ copyForm[portelement[i]]+'_'+
                                copyForm[portelement[i+1]];
                    rangesArr.push(range);
                }
                sendData.ranges = JSON.stringify(rangesArr);
                console.log(sendData);
            }
            
        },
        handleClick(tab){
            console.log(tab.label);
            this.getDataFromService(tab.label);
        },
        submitForm(formName){
            this.$confirm('确认提交吗?', '提示', {
                type: 'info'
            }).then(() => {
                this.initsendData(formName);
                this.sentDataToService();
            }).catch(() => {

            });
        },
        getDataFromService(tranType){
            var _this = this;
            var requestData = {tranType:tranType};
            //console.log(requestData);
            this.editLoading = true;
            $.get(this.Constant.dataAjaxAddress+this.Constant.getValueLimit,requestData).
            done(function(data){
                console.log(data);
                if(data.errCode==30){
                    _this.editLoading = false;
                    _this.setFormData(data);
                    
                    resetData = data;
                }else if(data.errCode==31){
                    _this.editLoading = false;
                    _this.$message('获取数据失败，请稍后再试');
                }
                
            });
        },
        setFormData(data){
            var formData = [];
            if(data.ranges == null){
                for(var i=0;i<18;i++){
                    formData.push('');
                }
            }else{
                for(var i=0;i<data.ranges.length;i++){
                    //console.log(data.ranges[i]);
                    var strs = data.ranges[i].split("_");
                    // console.log(strs)
                    for(var j=0;j<strs.length;j++){
                        if(strs[j]=='N')
                            formData.push('');
                        else
                            formData.push(parseFloat(strs[j]));
                    }
                }
            }
            //console.log(formData)
            if(data.tranType=='道路客运'){
                for(var i=0 ;i<element.length ;i++){
                    this.roadpassform[element[i]] = formData[i];
                }
            }
            if(data.tranType=='道路货运'){
                for(var i=0 ;i<element.length ;i++){
                    this.roadgoodsform[element[i]] = formData[i];
                }
            }
            if(data.tranType=='公交客运'){
                for(var i=0 ;i<element.length ;i++){
                    this.busform[element[i]] = formData[i];
                }
            }
            if(data.tranType=='出租客运'){
                for(var i=0 ;i<element.length ;i++){
                    this.taxiform[element[i]] = formData[i];
                }
            }
            if(data.tranType=='内河运输'){
                for(var i=0 ;i<element.length ;i++){
                    this.riverform[element[i]] = formData[i];
                }
            }
            if(data.tranType=='海洋货运'){
                for(var i=0 ;i<element.length ;i++){
                    this.oceangoodsform[element[i]] = formData[i];
                }
            }
            if(data.tranType=='海洋客运'){
                for(var i=0 ;i<element.length ;i++){
                    this.oceanpassform[element[i]] = formData[i];
                }
            }
            if(data.tranType=='港口生产'){
                for(var i=0 ;i<element.length ;i++){
                    this.portproform[portelement[i]] = formData[i];
                }
            }
        },
        sentDataToService(){
            var _this = this;
            this.editLoading = true;
            $.get(this.Constant.dataAjaxAddress+this.Constant.setValueLimit,sendData).
            done(function(data){
                if(data.errCode==30){
                    _this.$message('修改成功！');
                    _this.editLoading = false;
                    resetData.tranType  = sendData.tranType;
                    resetData.ranges = JSON.parse(sendData.ranges);
                }else if(data.errCode==31){
                    _this.editLoading = false;
                    _this.$message('修改失败，请稍后再试');
                }else if(data.errCode==44){
                    _this.$router.push('/login');
                }
                
            });
        },
        resetForm(formName){
            this.setFormData(resetData);
        }
    },
    mounted:function(){
		this.getDataFromService("道路客运");
    },

  };
</script>

<style scoped lang="scss">

    .chart {
        margin-top: 50px;
        margin-left: 10%;
        width: 800px;
        float: left;
        

    }
    .chart-content {
        margin-left: 80px;
        width: 700px;
    }
    .el-row{
        margin-top:20px; 
    }

    
</style>