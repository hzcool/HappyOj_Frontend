<template>
    <Card>
        <h1 style="text-align: center"> 题库 </h1>
        <Row>
            <div style="float: left">
                <Select v-model="clue" style="width:200px">
                        <Option value="题号">  题号 </Option>
                        <Option value="题目名"> 题目名  </Option>
                </Select>
                <Input v-model="search_content" placeholder="请输入查询条件" style="width: auto;margin-left: 10px;" @on-enter="search">
                    <Icon type="ios-search" slot="suffix" @click="search"/>
                </Input>
            </div>
            <Page :total="tot" :page-size="siz" show-elevator show-total @on-change="changePage" style="float: right"/>
        </Row>
        <br>
        <div class="problemtable">
            <Table stripe :columns="head" :data="data">
                <template slot-scope="{ row }" slot="solved">
                    <span v-if="row.solved==1" style="color: green;font-size: 18px;"> Yes</span>
                    <span v-else-if="row.solved==2" style="color: red;font-size: 18px;"> No </span>
                </template>
                <template slot-scope="{ row }" slot="index">
                    <router-link :to="{name:'problem',params:{'Index':row.index}}"> {{row.index}} </router-link>
                </template>
                <template slot-scope="{ row }" slot="title">
                    <router-link :to="{name:'problem',params:{'Index':row.index}}"> {{row.title}} </router-link>
                </template>
                <template slot-scope="{ row }" slot="ratio">
                    <Progress :percent="row.ratio" :stroke-width="22" style="width: 80px;" text-inside /> {{row.ac}}/{{row.all}}
                </template>
            </Table>
        </div>
    </Card>
</template>

<script>
export default {
    name: 'problemset',
    data() {
        return{
            head: [
                {
                    title:'Solved',
                    slot : 'solved',
                    width : 100,
                    align : 'center',
                },
                {
                    title: 'Index',
                    slot : 'index',
                    width: 150,
                    align : 'center',
                },
                {
                    title: 'Title',
                    slot: 'title',
                },
                {
                    title: 'Ratio(AC/ALL)',
                    slot: 'ratio',
                    width: 200,
                    align : 'center',
                }
            ],
            tot : 0, //题目数量
            siz : 100, // 每页显示的数量
            data : [],
            clue : "题号",  // 题号和题目名查询
            search_content: "",
        }
    },
    methods : {
        get_rules() {
            let rules = {type:true}
            let c = this.search_content
            c = c.trim()
            if (c && c!="") {
                if(this.clue=="题号") {
                    if (c[0]=='p') {
                        c = "P" + c.substr(1)
                    } else if(c[0]!='P') {
                        c = "P"+c
                    }
                    rules.index = c
                } else if(this.clue =="题目名") {
                    rules.title = c
                }
            }
            return rules
        },
        changePage(index) {
            let l = (index-1)*this.siz + 1;
            let r = l + this.siz - 1;
            this.searchProblems(l,r,this.get_rules())
        },

        getProblems(l,r) {
            this.$req.get({url:"getProblems",params:{"l":l,"r":r}})
            .then(res => {
                if(res) {
                    this.data = res.data
                    this.tot = res.tot
                }
            })
        },
        search() {
            this.searchProblems(1,this.siz,this.get_rules())
        },
        searchProblems(l=1,r=100,rules={}) {
            let form = new FormData()
            let config = { headers:{ 'Content-Type': 'multipart/form-data' }}
            form.append("l",l)
            form.append("r",r)
            form.append("rules",JSON.stringify(rules))
            this.$req.post({url:"searchProblems",form:form,config:config})
                .then(res => {
                    if(res) {
                        this.data = res.data
                        if(res.data) this.data = res.data;else this.data=[]
                        this.tot = res.tot
                    }
                })
        },
    },
    mounted() {
        this.searchProblems(1,this.siz,{type:true})
    }
}
</script>
<style>
.problemtable .ivu-table-header th{
    background-color:#2db7f5;
    color: #fff;
}
</style>