<template>
    <div v-if="contest">
        <List border size="large">
            <ListItem>
                <Row style="width: 800px">
                    <i-col span="6" style="color: blue;"><strong>标题</strong></i-col>
                    <i-col span="14" style="color:black;">{{contest.title}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px">
                    <i-col span="6" style="color: blue;"><strong>作者</strong></i-col>
                    <i-col span="14" style="color:black;">{{contest.author}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px">
                    <i-col span="6" style="color: blue;"><strong>队伍总数</strong></i-col>
                    <i-col span="14" style="color:black;">{{contest.num}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px">
                    <i-col span="6" style="color: blue;"><strong>开始时间</strong></i-col>
                    <i-col span="14" style="color:black;">{{begin}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px">
                    <i-col span="6" style="color: blue;"><strong>结束时间</strong></i-col>
                    <i-col span="14" style="color:black;">{{end}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px">
                    <i-col span="6" style="color: blue;"><strong>比赛时长(小时)</strong></i-col>
                    <i-col span="14" style="color:black;">{{contest.length.toFixed(2)}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px">
                    <i-col span="6" style="color: blue;"><strong>类型</strong></i-col>
                    <i-col span="14" style="color:black;">{{contest.type}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px">
                    <i-col span="6" style="color: blue;"><strong>赛制</strong></i-col>
                    <i-col span="14" style="color:black;">{{contest.format}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px">
                    <i-col span="6" style="color: blue;"><strong>描述</strong></i-col>
                    <i-col span="14" style="color:black;">{{contest.desc}}</i-col>
                </Row>
            </ListItem>
        </List>
    </div>
</template>
<script>
export default {
    props :['contest'],
    methods:{
        //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
        dateFormat(time) {
            var date=new Date(time);
            var year=date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
            var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
            var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
            var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
            var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
            // 拼接
            return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        }
    },
    computed: {
        begin(){
            return this.dateFormat(this.contest.begin)
        },
        end() {
            return this.dateFormat(this.contest.end)
        }
    }
}
</script>
