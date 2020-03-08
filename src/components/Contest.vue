<template>
    <Card v-if="loaded">
        <Tabs  @on-click="changeTab" v-model="pane">
            <TabPane label="比赛信息" name="pane1">
                <div style="text-align: center;color: black;font-size: 30px;">
                    <count-down
                            @start_callback="toStart"
                            @end_callback="toEnd"
                            :startTime="contest.begin.getTime()"
                            :endTime="contest.end.getTime()"
                            :tipText="'开始倒计时'"
                            :tipTextEnd="'结束倒计时'"
                            :endText="'比赛已结束'"
                            :dayTxt="'天'"
                            :hourTxt="'时'"
                            :minutesTxt="'分'"
                            :secondsTxt="'秒'"
                    >
                    </count-down>
                    <Divider />
                </div>
                <Contest-info :contest="contest"></Contest-info>
            </TabPane>
            <TabPane label="题目列表" name="pane2">
                <div v-if="contest.status=='Pending'">
                    <h1>比赛未开始</h1>
                </div>
                <div v-else>
                    <Cproblems :contest="contest" ref="cproblems"> </Cproblems>
                </div>
            </TabPane>
            <TabPane label="提交列表" name="pane3">
                <div v-if="contest.status=='Pending'">
                    <h1>比赛未开始</h1>
                </div>
                <div v-else>
                    <Csubmissions :contest="contest" ref="cs"> </Csubmissions>
                </div>
            </TabPane>
            <TabPane label="排行榜" name="pane4">
                <div v-if="contest.status=='Pending'">
                    <h1>比赛未开始</h1>
                </div>
                <div v-else>
                    <RankList :contest="contest" ref="rl"> </RankList>
                </div>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
    import ContestInfo from "./contestComp/ContestInfo";
    import CountDown from 'vue2-countdown'
    import Cproblems from "./contestComp/Cproblems";
    import Csubmissions from "./contestComp/Csubmissions";
    import RankList from "./contestComp/RankList";
    export default {
        components: {
            ContestInfo,
            CountDown,
            Cproblems,
            Csubmissions,
            RankList,
        },
        data() {
            return {
                contest: {
                    begin: null,
                    end: null,
                    id: 0,
                    title: '',
                    length: 0,
                    desc: '',
                    author: '',
                    type: '',
                    format: '',
                    status: '',
                },
                pane: 'pane1',
                loaded : false,
                lastGetProblems: 0,
                lastGetSubmissions: 0,
                lastGetRankList: 0,
            }
        },
        methods: {
            toStart() {
                this.getContestContent()
            },
            toEnd() {
                alert("比赛已结束")
            },
            changeTab(value) {
                let now = (new Date()).getTime()
                if(value=='pane2' && now - this.lastGetProblems >= 120000) {
                    this.lastGetProblems = now
                    this.$refs.cproblems.getCproblems()
                } else if(value=='pane3' && now - this.lastGetSubmissions >= 30000) {
                    this.lastGetSubmissions = now
                    this.$refs.cs.searchCsubmissions()
                } else if(value=='pane4' && now - this.lastGetRankList >= 60000) {
                    this.lastGetRankList = now
                    this.$refs.rl.getRankList()
                }
            },

            getContestContent() {
                this.$req.get({url:'getContestContent',params:{'id':this.contest.id}})
                .then(res => {
                    if(res){
                        this.contest = res.contest
                        this.contest.begin = new Date(this.contest.begin)
                        this.contest.end = new Date(this.contest.end)
                        this.loaded = true
                    }
                })
            }
        },
        mounted() {
            if(this.$route.query.id) {
                this.contest.id = this.$route.query.id
                this.getContestContent()
            } else {
                this.$router.push({name:'contestset'})
            }
        }
    }
</script>