<template>
    <div class="ranktable" v-if="loaded">
        <Button shape="circle" type="error" @click="fresh" :loading="loading"> 刷新 </Button>
        <br>
        <br>
        <Table :columns="columns"  :data="data" border size="small" class="small-table"> </Table>
    </div>
</template>

<script>
export default {
    props: ['contest'],
    data() {
        return {
            columns:[
                {
                    title: 'Rank',
                    key: 'rank',
                    align : 'center',
                    width : 50,
                },
                {
                    title: 'Team',
                    key: 'team',
                    align: 'center',
                },
                {
                    title: 'Score',
                    key: 'score',
                    align : 'center',
                    width: 60,
                },
                {
                    title: 'Solved',
                    key: 'solved',
                    align : 'center',
                    width: 60,
                },
                {
                    title: 'Penalty',
                    key: 'penalty',
                    align : 'center',
                    width: 65,
                },

            ],
            data: [],
            labelList: [],
            loaded: false,
            loading: false,
        }
    },
    methods: {
        getClass() {
            return "firstBlood"
        },
        fresh() {
            this.loading = true
            setTimeout(()=>{
                this.getRankList()
            },600)
        },
        getRankList() {
            this.$req.get({url:'getRankList',params:{'id':this.contest.id}})
            .then(res => {
                if(res) {
                    for(let i = 0,len=res.length; i < len; i++) {
                        let obj = {}
                        for (let p in res[i]) {
                            if(res[i][p].status) {
                                obj[p] = res[i][p].status
                                let msg = res[i][p].fail_times+1
                                if(this.contest.format=="ACM") {
                                    if(res[i][p].minutes) msg = msg + "/" + res[i][p].minutes;
                                    else msg = "(-"+(msg-1)+")"
                                }else if(res[i][p].score) msg = msg + "/" + res[i][p].score
                                res[i][p] = msg
                            }
                        }
                        res[i].cellClassName = obj
                    }
                    this.data = res
                    this.loaded = true
                }
                this.loading = false
            })
        },
    },
    mounted() {
        if (this.contest.format != "ACM") {
            this.columns.splice(4,1)
        } else {
            this.columns.splice(2,1)
        }
        this.$req.get({url:'getLabelList',params:{'id':this.contest.id}})
        .then(res => {
            if(res) {
                this.labelList = res
                for(let i = 0,len=res.length; i < len; i++) {
                    let obj = {}
                    obj.title = res[i]
                    obj.key = res[i]
                    obj.width = 65
                    obj.align = 'center'
                    this.columns.push(obj)
                }
            }
        })
    }
}
</script>

<style>
    .ranktable .ivu-table-header th{
        background-color:#00CCFF;
        color: #fff;
        font-size: 14px;
    }
    .ranktable .ivu-table td{
        color: black;
        font-size: 14px;
    }
    .ranktable .ivu-table .FirstBlood{
        background-color: #006000;
        color: #fff;
    }
    .ranktable .ivu-table .AC{
        background-color: #00BB00;
        color: #fff;
    }
    .ranktable .ivu-table .WA{
        background-color: red;
        color: #fff;
    }
    .ranktable .small-table .ivu-table-cell {
        padding: 0px 0px;
    }

</style>
