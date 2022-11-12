<template>
    <div >
      <NavBar/>
      Bills
      Bills
      <BottomMenu/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from '@/components/NavBar.vue';
import BottomMenu from '@/components/BottomMenu.vue'

@Options({
    components: {
        NavBar,
        BottomMenu
    },
})
export default class Bills extends Vue {}
</script>