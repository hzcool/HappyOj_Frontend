<style scoped>
</style>
<template>
    <div v-show="loaded">
        <div style="margin: 10px 20px;">
            <pre v-highlightjs="content"><code :class="lang"></code></pre>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                loaded:false,
                lang:"C++",
                submissionID: 0,
                content: "",
            }
        },

        mounted() {
            if(!this.$route.params.id) return
            this.submissionID =  this.$route.params.id;
            let params = {"id":this.submissionID}
            let url = "getSubmission"
            if(this.$route.query.contest) {
                url = "getCsubmission"
                params = {"run_id":this.submissionID,"id":this.$route.query.contest}
            }
            this.$req.get({url:url,params:params})
            .then(res => {
                if (res) {
                    this.content += "submissionID: " + this.submissionID + '\n' +
                                    "Problem: " +  res.index + '\n' +
                                    "Author: " + res.author + '\n' +
                                    "Language: " + res.lang + '\n' +
                                    "Status: " + res.status + '\n' +
                                    "Time: " + res.time + '\n' +
                                    'Memory: ' + res.memory + '\n' +
                                    "Code Length: " + res.length + '\n' +
                                    "submit time: " + res.submitTime + '\n' +
                                    "compile_info: " + '\n' + res.compile_info + '\n' +
                                    "********************************************\n\n" +
                                    res.code;
                    if (res.lang=="C11") this.lang = "C"
                    else if(res.lang.substr(0,6)=="Python") this.lang="Pyhton"
                    else if(res.lang=="Java") this.lang="Java"
                }
                this.loaded = true
            })
        }
    }
</script>