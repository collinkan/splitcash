<template>
    <div>
        <NavBar/>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <ConfirmDialog group="templating">
                <template #message="slotProps">
                    <div class="flex p-4">
                        <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
                        <p class="pl-2">{{slotProps.message.message}}</p>hi
                    </div>
                </template>
        </ConfirmDialog>
        <ConfirmDialog group="positionDialog"></ConfirmDialog>
        <Button style="display: flex; justify-content: center; align-items: center;" id="field" @click="cancel()" icon="pi pi-times" label="Cancel" class="mr-2"></Button>
        <div class="form-container">
            <div id="field">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-list"></i>
                </span>
                <InputText placeholder="Bill Name" v-model="billname"/>
            </div>

            <div id="tax-tip">
                <div id="field">
                    <span class="p-inputgroup-addon">
                        Tax
                    </span>
                    <InputNumber placeholder="Tax Percentage" v-model=tax suffix="%" showButtons :min="0" :max="100" />
                </div>
                <div id="field">
                    <span class="p-inputgroup-addon">
                        Tip
                    </span>
                    <InputNumber placeholder="Tip Percentage" v-model=tip suffix="%" showButtons :min="0" :max="100" />
                </div>
            </div>

            <div class="item-container" v-for="i in items" :key="i.id">
                <div id="item">
                    <InputText :placeholder="'Item ' + i.id + ' Name'" v-model="i.name"/>
                    <Dropdown v-model="i.payer" :options="users" optionLabel="name" placeholder="Item Payer" />
                    <Dropdown v-model="i.owner" :options="users" optionLabel="name" placeholder="Item Payee" />
                    <InputNumber :placeholder="'Item ' + i.id + ' Price'" v-model="i.price" mode="currency" currency="CAD" locale="en-US" />
                </div>
                <Button style="margin: 1vw; width: 1vw; height:3vh; display: flex; justify-content: center; align-items: center;" label="X" class="p-button" @click="delItem(i.id)" />
            </div>
            
            <Button style="margin: 3vh; height: 7vh; width: 4vw; display: flex; justify-content: center; align-items: center;" label="Add Item" class="p-button-info" @click="newItem()" />

            <div style="padding-left: 9vw; display: flex; justify-content: center; align-items: center;">
                <div style="display: flex; flex-direction: column; align-items: flex-end;">
                    <div>
                        {{'Subtotal: ' + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'CAD'}).format(subtotal)}}
                    </div>
                    <div>
                        {{'Total: ' + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'CAD'}).format(total)}}
                    </div>
                </div>
                <Button style="margin: 1vw; width: 7vw; height:6vh; display: flex; justify-content: center; align-items: center;" label="Create" class="p-button" @click="checkBill()" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from '@/components/NavBar.vue';

@Options({
    components: {
        NavBar,
    },
    data() {
        return {
            billname: "",
            tax: null,
            tip: null,
            itemnum: 1,
            items: {
                item1:{
                    id: 1,
                    name: "",
                    payer: null,
                    owner: null,
                    price: null,
                }
            },
            users: [],
            savedBills: {},
            newBill: {},
            created: false
        }
    },
    mounted(){
        let saved = localStorage.getItem('bills') || JSON.stringify({})
        this.savedBills = JSON.parse(saved)

        let users = localStorage.getItem('users') || JSON.stringify([{name: 'Guest', code: 'guest'}, {name: 'Friend', code: 'friend'}])
        this.users = JSON.parse(users)

        console.log(this.savedBills)
        console.log(this.users)
    },
    computed: {
        subtotal() {
            let sub = 0
            for (let item in this.items) {
                sub += this.items[item].price
            }
            return sub
        },
        total() {
            let total = this.subtotal
            if (this.tax){
                total *= (1 + this.tax/100)
            }
            if (this.tip) {
                total *= (1 + this.tip/100)
            }
            return total
        }
    },
    methods: {
        newItem() {
            this.itemnum++
            this.items['item' + this.itemnum.toString()] = {id: this.itemnum, name: "", payer: null, owner: null, price: null}
        },
        delItem(num: number) {
            delete this.items['item' + num.toString()]
        },
        checkBill(){
            if (this.billname.trim() in this.savedBills){
                this.$toast.add({severity:'error', summary:'Declined', detail:'A bill with that name already exists.', life: 2500});
            } else {
                this.setBill()
                this.confirm()
            }
        },
        setBill(){
            this.newBill = {
                name: this.billname,
                total: this.total,
                tax: this.tax,
                tip: this.tip,
                items: this.items
            }
            this.savedBills[this.billname.trim()] = this.newBill
        },
        confirm() {
            this.$confirm.require({
                message: 'Are you sure you want to create this bill?',
                header: 'Create New Bill',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    localStorage.setItem('bills', JSON.stringify(this.savedBills))
                    this.created = true
                    this.$toast.add({severity:'success', summary:'Created', detail:'You have successfully created the bill', life: 2500});
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 3000)
                },
                reject: () => {
                    this.$toast.add({severity:'error', summary:'Declined', detail:'Your changes have not been saved', life: 2500});
                },
                onHide: () => {
                    this.$toast.add({severity:'error', summary:'Declined', detail:'Your changes have not been saved', life: 2500});
                }
            });
        },
        cancel() {
            this.$confirm.require({
                message: 'Are you sure you want to discard this bill?',
                header: 'Discard New Bill',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$router.push('/')
                    //this.$toast.add({severity:'success', summary:'Discarded', detail:'Bill has been discarded', life: 2500});
                }
            });
        }
    },
    beforeRouteLeave(to,from,next){
        if (!this.created){
            const answer = window.confirm("Are you sure you want to leave? You changes have NOT been saved.");
            if (answer) {
                next();
            } else {
                next(false);
            }
        } else {
            next();
        }
    }
})
export default class NewBill extends Vue {}
</script>

<style scoped>
.form-container{
    padding: 5vh;

    display: flex;
    flex-direction: column;
    align-items: center;
}

#field{
    margin: 1.5vh;
    display: flex;
    align-content: center;
}

#tax-tip{
    display: flex;
    justify-content: center;
}

.item-container{
    padding-left: 5vw;
    display:flex;
    justify-content: center;
    align-content: space-between;
    align-items: center;
}

#item{
    margin-top: 3vh;
    display: flex;
    flex-direction: column;
}

::v-deep(.p-inputtext){
    border-radius: 0;
}

::v-ddep(.p-dropdown){
    border-radius: 0;
}
</style>