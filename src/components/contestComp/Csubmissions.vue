<template>
    <div v-if="loaded">
        <br>
        <Row>
            <div style="float: left">
                <div style="font-size: 15px;color: black">
                    Problem <Input v-model="label" style="width: 150px; margin-right: 20px;" placeholder="search like A" @on-enter="search"/>
                    Author <Input v-model="author" style="width: 150px;margin-right: 20px;" @on-enter="search"/>

                    Lang
                    <Select v-model="lang" style="width:150px;margin-right: 20px;">
                        <Option v-for="item in langList" :value="item.value" :key="item.value"> {{item.label}}</Option>
                    </Select>
                    Status
                    <Select v-model="status" style="width:200px">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value" :class="item.label"> {{item.label}} </Option>
                    </Select>
                    <Button :loading="sloading" type="info" shape="circle" icon="ios-search" style="margin-left:20px" @click="search">查找</Button>
                    <Button :loading="floading" type="error" shape="circle" @click="fresh" style="margin-left:20px">刷新</Button>
                </div>
            </div>
            <Page :total="tot" :page-size="siz" show-elevator show-total @on-change="changePage" style="float: right"/>
        </Row>
        <br>
        <div class="submissiontable">
            <Table :columns="columns" :data="data">
                <template slot-scope="{row}" slot="id">
                    <span v-if="$store.state.usr.username == row.author">
                         <router-link tag="a" target="_blank" :to="{name:'code',params:{'id':row.id},query:{'contest':contest.id}}"> {{row.id}} </router-link>
                    </span>
                   <span v-else>
                        {{row.id}}
                   </span>
                </template>
                <template slot-scope="{row}" slot="author">
                    {{row.author}}
                </template>
                <template slot-scope="{row}" slot="status">
                    <span v-if="$store.state.usr.username == row.author">
                         <router-link tag="a" target="_blank" :to="{name:'code',params:{'id':row.id},query:{'contest':contest.id}}">  <span :class="row.status"> {{row.status}} </span> </router-link>
                    </span>
                    <span v-else>
                        <span :class="row.status"> {{row.status}} </span>
                   </span>
                </template>
                <template slot-scope="{row}" slot="problem">
                    <router-link tag="a" target="_blank" :to="{name:'cproblem',query:{'id':contest.id,'problem':row.label}}"> {{row.label}} </router-link>
                </template>
            </Table>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['contest'],
        data() {
            return {
                columns: [
                    {
                        title:'Run ID',
                        slot : "id",
                        align: "center",
                        width: 100,
                    },
                    {
                        title:'Author',
                        slot:'author',
                        align: "center",
                    },
                    {
                        title:'Status',
                        slot:'status',
                        align: "center",
                    },
                    {
                        title: 'Score',
                        key : 'score',
                        align: 'center',
                    },
                    {
                        title:'Problem',
                        slot:'problem',
                        align: "center",
                    },
                    {
                        title:'Time(MS)',
                        key:'time',
                        align: "center",
                    },
                    {
                        title:'Memory(MB)',
                        key:'memory',
                        align: "center",
                    },
                    {
                        title:'Length',
                        key:'length',
                        align: "center",
                    },
                    {
                        title:'Lang',
                        key:'lang',
                        align: "center",
                    },
                    {
                        title:'SubmitTime',
                        key:'submitTime',
                        align: "center",
                    },
                ],
                data: [],
                tot: 0,
                siz: 50,
                label: "",
                author : "",
                langList: [
                    {
                        value:'All',
                        label:'All',
                    },
                    {
                        value:'C11',
                        label:'C11',
                    },
                    {
                        value:'C++11',
                        label:'C++11',
                    },
                    {
                        value:'C++14',
                        label:'C++14',
                    },
                    {
                        value:'C++17',
                        label:'C++17',
                    },
                    {
                        value:'Python2',
                        label:'Python2',
                    },
                    {
                        value:'Python3',
                        label:'Python3',
                    },
                    {
                        value:'Java',
                        label:'Java',
                    },
                ],
                lang:"All",
                statusList:[
                    {
                        value: 'All',
                        label: 'All',
                    },
                    {
                        value: 'Queueing',
                        label: 'Queueing',
                    },
                    {
                        value: 'Running',
                        label: 'Running',
                    },
                    {
                        value: 'Accepted',
                        label: 'Accepted',
                    },
                    {
                        value: 'WrongAnswer',
                        label: 'WrongAnswer',
                    },
                    {
                        value: 'CompileError',
                        label: 'CompileError',
                    },
                    {
                        value: 'RuntimeError',
                        label: 'RuntimeError',
                    },
                    {
                        value: 'TimeLimitExceeded',
                        label: 'TimeLimitExceeded',
                    },
                    {
                        value: 'MemoryLimitExceeded',
                        label: 'MemoryLimitExceeded',
                    },
                    {
                        value: 'OutputLimitExceeded',
                        label: 'OutputLimitExceeded',
                    },
                    {
                        value: 'SystemError',
                        label: 'SystemError',
                    },
                ],
                status:"All",
                loaded : false,

                sloading: false,
                floading: false,
            }
        },
        methods: {
            get_rules() {
                let rules = {}
                if (this.lang!="All") {
                    rules.lang = this.lang
                }
                if (this.status!="All") {
                    rules.status = this.status
                }
                let c = this.label.trim()
                if (c!="") {
                    rules.label = c
                }
                c = this.author.trim()
                if(c!="") {
                    rules.author = c
                }
                return rules
            },
            changePage(index) {
                let l = (index-1)*this.siz + 1;
                let r = l + this.siz - 1;
                this.searchCsubmissions(l,r,this.get_rules())
            },
            search() {
                this.sloading = true
                setTimeout(()=>{
                    this.searchCsubmissions(1,50,this.get_rules())
                },600)
            },
            fresh() {
                this.floading = true
                setTimeout(()=>{
                    this.searchCsubmissions(1,50,this.get_rules())
                },600)
            },
            searchCsubmissions(l=1,r=50,rules={}) {
                let form = new FormData()
                let config = { headers:{ 'Content-Type': 'multipart/form-data' }}
                form.append("id",this.contest.id)
                form.append("l",l)
                form.append("r",r)
                form.append("rules",JSON.stringify(rules))
                this.$req.post({url:"searchCsubmissions",form:form,config:config})
                    .then(res => {
                        if(res) {
                            this.data = res.data
                            if(res.data) this.data = res.data;else this.data=[]
                            this.tot = res.tot
                            this.loaded = true
                        }
                        this.floading = this.sloading = false
                    })
            }
        },
        mounted() {
            if(this.contest.format=="ACM") {
                this.columns.splice(3,1)
            }
        }
    }
</script>

<style scoped>
    .All{
        color: black;
    }
    .Queueing {
        color: green;
    }
    .Running{
        color: #000080;
    }
    .Accepted {
        color :	#00FF00;
    }
    .WrongAnswer{
        color: red;
    }
    .CompileError{
        color: blue;
    }
    .RuntimeError{
        color: Fuchsia;
    }
    .TimeLimitExceeded {
        color: 	DeepPink;
    }
    .MemoryLimitExceeded {
        color: Crimson;
    }
    .OutputLimitExceeded{
        color: DarkViolet;
    }
    .SystemError{
        color: Gold;
    }
</style>

<style>
    .submissiontable .ivu-table-header th{
        background-color:#19be6b;
        color: #fff;
    }
</style>