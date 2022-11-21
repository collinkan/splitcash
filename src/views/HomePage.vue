<template>
  <div >
    <NavBar/>
    <div class="home-container">
      <h2>Hello, {{username}}</h2>
      <h3>Your Oustanding Total is:</h3> 
      <h2>{{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'CAD'}).format(total)}}</h2>
    </div>
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
    data() {
      return{
        savedBills: {},
        total: 0,
        signedIn: false,
        username: 'Guest'
      }
    },
    mounted(){
        let saved = localStorage.getItem('bills') || JSON.stringify({})
        this.savedBills = JSON.parse(saved)
        console.log(this.savedBills)

        let signedIn = localStorage.getItem('isSignedIn') || false
        this.signedIn = signedIn
        if (this.signedIn) { this.username = localStorage.getItem('username')}
        console.log(this.signedIn)
        console.log(this.username)

        this.calcTotal()
    },
    methods: {
      calcTotal(){
        let sum = 0
        Object.keys(this.savedBills).forEach((key: any) => {
          sum += this.savedBills[key].total
        });
        this.total = sum
      }
    }
})
export default class HomePage extends Vue {}
</script>

<style scoped>
.home-container{
  padding:5vh;

  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>