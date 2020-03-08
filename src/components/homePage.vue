<template>
<div :style="backgroundDiv">

</div>
</template>

<script>
export default {
    data() {
        return {
            backgroundDiv : {
                backgroundImage:'url(' + require('@/assets/2.png') + ')',
                backgroundRepeat:'no-repeat',
                backgroundSize:'100% 100%',
                height : '1000px',
            },
        }
    },
}
</script>