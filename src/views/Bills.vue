<template>
    <div style="text-align: center;">
      <NavBar/>
        <h1>
            Bills List
        </h1>
        <div class="list-container" v-for="b in savedBills" :key="b.name">
            <div id="bill">
                <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    <h2>
                        {{b.name}}
                    </h2>
                    <ul>
                        <li v-for="i in b.items" :key="i.id">
                            {{i.name}}
                        </li>
                    </ul>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end;">
                    <h2>
                        Total: {{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'CAD'}).format(b.total)}}
                    </h2>
                    <ul>
                        <li v-for="i in b.items" :key="i.id" style="display: flex; justify-content: space-between;">
                            {{i.owner.name + ' owes ' + i.payer.name + ' ' + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'CAD'}).format(i.price)}}
                        </li>
                    </ul>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; align-content: space-between;">
                    <Button style="width: 1vw; height:3vh; display: flex; justify-content: center; align-items: center;" label="Edit" class="p-button" @click="editBill()" />
                    <p></p>
                    <p></p>
                    <Button style="width: 4vw; height:3vh; display: flex; justify-content: center; align-items: center;" label="Delete" class="p-button" @click="delBill(b.name)" />
                </div>
            </div>
        </div>
        <div style="margin-bottom: 25vh;"></div>
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
      }
    },
    mounted(){
        let saved = localStorage.getItem('bills') || JSON.stringify({})
        this.savedBills = JSON.parse(saved)
        console.log(this.savedBills)
    },
    methods: {
        editBill(){
            this.$router.push('/create')
        },
        delBill(name: string){
            delete this.savedBills[name]
            localStorage.setItem('bills', JSON.stringify(this.savedBills))
            this.$toast.add({severity:'success', summary:'Created', detail:'You have successfully created the bill', life: 2500});
        }
    }
})
export default class Bills extends Vue {}
</script>

<style scoped>
.list-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#bill{
    width: 100vw;
    padding: 5vh;

    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    border: 2px solid rgb(7,20,38);
}
</style>