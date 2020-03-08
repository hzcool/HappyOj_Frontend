<template>
    <div v-if="contest">
        <Button shape="circle" type="error" @click="fresh" :loading="loading"> 刷新 </Button>
        <br>
        <br>
        <div class="problemtable">
            <Table stripe :columns="head" :data="data">
                <template slot-scope="{ row }" slot="solved">
                    <span v-if="row.solved==1" style="color: green;font-size: 18px;"> Yes</span>
                    <span v-else-if="row.solved==2" style="color: red;font-size: 18px;"> No </span>
                </template>
                <template slot-scope="{ row }" slot="label">
                    <router-link tag="a" target="_blank" :to="{name:'cproblem',query:{'id':contest.id,'problem':row.label}}"> {{row.label}} </router-link>
                </template>
                <template slot-scope="{ row }" slot="title">
                    <router-link tag="a" target="_blank" :to="{name:'cproblem',query:{'id':contest.id,'problem':row.label}}"> {{row.title}} </router-link>
                </template>
                <template slot-scope="{ row }" slot="ratio">
                    <Progress :percent="row.ratio" :stroke-width="22" style="width: 80px;" text-inside /> {{row.ac}}/{{row.all}}
                </template>
            </Table>
        </div>
    </div>
</template>
<script>
    export default {
        props :['contest'],
        data() {
            return {
                head: [
                    {
                        title:'Solved',
                        slot : 'solved',
                        width : '120px',
                        align : 'center',
                    },
                    {
                        title: 'Label',
                        slot : 'label',
                        width: '120px',
                        align : 'center',
                    },
                    {
                        title: 'Title',
                        slot: 'title',
                    },
                    {
                        title: 'Ratio(AC/ALL)',
                        slot: 'ratio',
                        align: 'center',
                        width: '150px',
                    }
                ],
                data:[],
                loading: false,
            }
        },
        methods:{
            fresh() {
                this.loading = true
                setTimeout(() =>{
                    this.getCproblems()
                },600)
            },
            getCproblems() {
                this.$req.get({url:'getCproblems',params:{'id':this.contest.id}})
                .then(res => {
                    if(res){
                        this.data = res
                    }
                    this.loading = false
                })
            },
        },
    }
</script>
<style>
    .problemtable .ivu-table-header th{
        background-color:#2db7f5;
        color: #fff;
    }
</style>