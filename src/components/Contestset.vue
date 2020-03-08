<template>
    <Card>
        <Modal
                v-model="modal"
                title="参赛密码"
                style="width:250px"
                @on-ok="check"
                >
                <Input type="password" password v-model="password"/>
        </Modal>
        <div style="text-align: center">
            <h1>比赛列表</h1>
        </div>
        <br>
        <Row>
            <span style="font-size: 15px;color: black"> 比赛ID <Input v-model="id"  placeholder="Search By ID" style="width: 200px;margin-left: 2px;" /> </span>
            <span style="margin-left: 30px;font-size: 15px;color: black">
                比赛标题
                <Input v-model="contestName"  placeholder="Search By Contest Title" style="width: 200px;margin-left: 2px;" />
            </span>
            <span style="margin-left: 30px;font-size: 15px;color: black">
                状态
                <Select v-model="select" style="width:200px;margin-left: 2px;">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value" :class="item.value">{{ item.label }}</Option>
                </Select>
            </span>
            <Button :loading="sloading" type="info" shape="circle" icon="ios-search" style="margin-left:20px" @click="search">查找</Button>
            <Page :total="total" :page-size="pageSize"  show-total show-elevator @on-change="changePage" style="float: right"/>
            <div style="clear: both"> </div>
        </Row>
        <br>
        <div class="contesttable">
            <Table stripe :columns="head" :data="data">
                <template slot-scope="{ row }" slot="title">
                    <Button type="text" @click="forEnter(row)" style="color: #2d8cf0"> {{row.title}} </Button>
                </template>
                <template slot-scope="{ row }" slot="status">
                    <span :class="row.status"> {{row.status}} </span>
                </template>
                <template slot-scope="{ row }" slot="length">
                    <span> {{row.length.toFixed(2)}} </span>
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
                    title: '比赛ID',
                    key: 'id',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '比赛标题',
                    slot: 'title',
                    align: 'center',
                },
                {
                    title: '开始时间',
                    key:'begin',
                    align: 'center',
                    width: 200,
                },
                {
                    title: '比赛时长(小时)',
                    slot: 'length',
                    align: 'center',
                    width: 200,
                },
                {
                    title: '比赛类型',
                    key: 'type',
                    align: 'center',
                    width: 120,
                },
                {
                    title: '赛制',
                    key: 'format',
                    align: 'center',
                    width: 120,
                },
                {
                    title: '状态',
                    slot: 'status',
                    align: 'center',
                    width: 120,
                },
                {
                    title: '队伍总数',
                    key: 'num',
                    align: 'center',
                    width: 120,
                }
            ],
            data:[],

            total: 0,
            pageSize: 50,
            //查询条件
            id:'',
            contestName:'',
            statusList: [
                {
                    value: 'All',
                    label: 'All'
                },
                {
                    value: 'Pending',
                    label: 'Pending'
                },
                {
                    value: 'Running',
                    label: 'Running'
                },
                {
                    value: 'Ended',
                    label: 'Ended'
                },

            ],
            select: "All",

            choose_id: 0,
            sloading: false,
        }
    },
    methods: {
        getRules() {
            let rules = {}
            this.id = this.id.trim()
            this.contestName = this.contestName.trim()
            if(this.id) rules.id = this.id
            if (this.contestName) rules.title = this.contestName
            if (this.select!='All') rules.status = this.select
            return rules
        },
        search() {
            this.sloading = true
            setTimeout(()=>{
                this.searchContests(1,this.pageSize,this.getRules())
            },600)
        },
        changePage(page) {
            let l = (page-1)*this.pageSize + 1
            let r = page*this.pageSize
            this.searchContests(l,r,this.getRules())
        },
        searchContests(l,r,rules) {
            let formdata = new FormData()
            let config = { headers:{ 'Content-Type': 'multipart/form-data' }}
            formdata.append("l",l)
            formdata.append("r",r)
            formdata.append("rules",JSON.stringify(rules))
            this.$req.post({url:"searchContests",form:formdata,config:config})
                .then(res => {
                    if(res) {
                        this.total = res.tot
                        this.data = res.data
                    }
                    this.sloading = false
                })
        },
        enter() {
            this.$router.push({name:'contest',query:{'id':this.choose_id}})
        },
        check() {  //验证参赛密码
            let formdata = new FormData()
            let config = { headers:{ 'Content-Type': 'multipart/form-data' }}
            formdata.append('password',this.password)
            formdata.append('id',this.choose_id)
            this.$req.post({url:'checkContestPwd',form:formdata,config:config})
            .then(res => {
                if(res) {
                    this.enter()
                }
            })
        },

        forEnter(row) {
            this.choose_id = row.id
            if(row.type=='private') {
                if(!this.$store.state.usr.isLogin) {
                    this.$message("error", "请先登陆")
                    return
                }
                this.$req.get({url:'enterContest',params:{'id':row.id}})
                .then(res => {
                    if(res) {
                        if(res.ok) this.enter(); else this.modal = true
                    }
                })
                return
            }
        }
    },
    mounted() {
        this.searchContests(1,this.pageSize,{})
    }
}
</script>
<style>
.contesttable .ivu-table-header th{
    background-color:#17233d;
    color: #fff;
}
.contesttable .ivu-table td{
    font-size: 16px;
}
</style>

<style scoped>
    .Pending {
        color: green;
    }
    .Running{
        color: red;
    }
    .Ended {
        color: navy;
    }
    .All{
        color:black;
    }
</style>