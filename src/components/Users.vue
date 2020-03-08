<template>
    <Card v-if="loaded">

        <div style="text-align: center">
            <h1>用户列表</h1>
        </div>
        <br>
        <Row>
            <span style="font-size: 15px;color: black"> 用户名 <Input v-model="username"  placeholder="Search By username" style="width: 200px;margin-left: 2px;" /> </span>
            <span style="margin-left: 30px;font-size: 15px;color: black">
                学校
                <Input v-model="school"  placeholder="Search By School" style="width: 200px;margin-left: 2px;" />
            </span>

            <Button :loading="sloading" type="info" shape="circle" icon="ios-search" style="margin-left:20px" @click="search">查找</Button>
            <Page :total="total" :page-size="pageSize"  show-total show-elevator @on-change="changePage" style="float: right"/>
            <div style="clear: both"> </div>
        </Row>
        <br>
        <div class="usertable">
            <Table stripe :columns="head" :data="data">
                <template slot-scope="{ index }" slot="rank">
                    {{index+1}}
                </template>
                <template slot-scope="{ row }" slot="username">
                    <router-link :to="{name:'userinfo',query:{'username':row.username}}"> {{row.username}}</router-link>
                </template>
                <template slot-scope="{ row }" slot="ratio">
                    <Progress :percent="row.ratio*100" :stroke-width="22" style="width: 80px;" text-inside />
                </template>
            </Table>
        </div>
    </Card>
</template>

<script>
    export default {
        data() {
            return {
                modal: false,
                password:'',
                head:[
                    {
                        title: '排名',
                        slot: 'rank',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '用户名',
                        slot: 'username',
                        align: 'center',
                    },
                    {
                        title: '学校',
                        key: 'school',
                        align: 'center',
                    },
                    {
                        title: '已解决',
                        key: 'solved',
                        align: 'center',
                        // width: 100,
                    },
                    {
                        title: '总提交',
                        key: 'all',
                        align: 'center',
                        // width:100,
                    },
                    {
                        title: '正确率',
                        slot: 'ratio',
                        align: 'center',
                        width:150,
                    }
                ],
                data:[],

                total: 0,
                pageSize: 50,
                //查询条件
                username:'',
                school:'',
                loaded: false,


                sloading: false,
            }
        },
        methods: {
            getRules() {
                let rules = {}
                this.username = this.username.trim()
                this.school = this.school.trim()
                if(this.username) rules.username = this.username
                if (this.school) rules.school = this.school
                return rules
            },
            search() {
                this.sloading = true
                setTimeout(()=>{
                    this.searchUsers(1,this.pageSize,this.getRules())
                },600)
            },
            changePage(page) {
                let l = (page-1)*this.pageSize + 1
                let r = page*this.pageSize
                this.searchUsers(l,r,this.getRules())
            },
            searchUsers(l,r,rules) {
                let formdata = new FormData()
                let config = { headers:{ 'Content-Type': 'multipart/form-data' }}
                formdata.append("l",l)
                formdata.append("r",r)
                formdata.append("rules",JSON.stringify(rules))
                this.$req.post({url:'searchUsers',form:formdata,config:config})
                .then(res=> {
                    if(res) {
                        if(res.tot) {
                            this.total = res.tot
                            this.data = res.data
                        } else  {
                            this.total = 0
                            this.data = []
                        }
                        this.loaded = true
                        this.sloading = false
                    }
                })
            },
        },
        mounted() {
            this.searchUsers(1,this.pageSize,{})
        }
    }
</script>
<style>
    .usertable .ivu-table-header th{
        background-color:#EB7347;
        color: #fff;
    }
    .usertable .ivu-table td{
        font-size: 16px;
    }
</style>

<style scoped>

</style>