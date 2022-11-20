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
        <Button id="field" @click="cancel()" icon="pi pi-times" label="Cancel" class="mr-2"></Button>
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

            <div id="item" v-for="i in items" :key="i.id">
                <InputText :placeholder="'Item ' + i.id + ' Name'" v-model="i.name"/>
                <InputText :placeholder="'Item ' + i.id + ' Payer'" v-model="i.payer"/>
                <InputText :placeholder="'Item ' + i.id + ' Owner'" v-model="i.owner"/>
                <InputNumber :placeholder="'Item ' + i.id + ' Price'" v-model="i.price" mode="currency" currency="CAD" locale="en-US" />
            </div>
            
            <Button style="margin: 3vh;" label="Add Item" class="p-button" @click="newItem()" />

            <div>
                {{'Subtotal: ' + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'CAD'}).format(subtotal)}}
                {{'Total: ' + new Intl.NumberFormat('en-US', {style: 'currency', currency: 'CAD'}).format(total)}}
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
                    payer: "",
                    owner: "",
                    price: null,
                }
            },
        }
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
            this.items['item' + this.itemnum.toString()] = {id: this.itemnum, name: "", payer: "", owner: "", price: null}
        },
        confirm() {
            this.$confirm.require({
                message: 'Are you sure you want to create this bill?',
                header: 'Create New Bill',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$toast.add({severity:'success', summary:'Created', detail:'You have successfully created the bill', life: 2500});
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
        },
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

#item{
    margin-top: 3vh;
    display: flex;
    flex-direction: column;
}

::v-deep(.p-inputtext){
    border-radius: 0;
}

</style>