<template>
    <div>
        <div class="navbar-container">
            <Button icon="pi pi-bars" class="button p-button-text" @click="visibleLeft=true" />
            <Button label="$plit Cash" class="title p-button-text" @click="$router.push('/')" />
            <Button icon="pi pi-user" class="avatar p-button-rounded p-button-raised p-button-text" @click="$router.push('/profile')" />
        </div>
        <Sidebar class="side-menu" v-model:visible="visibleLeft">
            <h3>$plit Cash</h3>
        </Sidebar>
    </div>
</template>

<script lang="ts">
export default{
    data() {
        return {
            visibleLeft: false,
        }
    },
}
</script>

<style scoped>
.navbar-container{
    z-index: 1;
    width: 100%;
    height: 10vh;
    top: 0;
    position: fixed; 

    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: rgb(7,20,38);
}
.title{
    font-size: 2.5vmax;
    font-style: italic;
    letter-spacing: 1.5vmax;
}
.button{
    margin-left: 2vh;
    text-align: center;
}
.avatar{
    margin-right: 2vh;
}
</style>
