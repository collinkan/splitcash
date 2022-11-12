<template>
    <div class="menu-container">
        <div id="bottom-menu">
            <Button icon="pi pi-list" class="p-button-text" @click="$router.push('/bills')" />
            <Button icon="pi pi-plus" class="p-button-text" @click="$router.push('/create')" />
            <Button icon="pi pi-users" class="p-button-text" @click="$router.push('/friends')" />
        </div>
    </div>
</template>

<script lang="ts">
export default{
    data() {
        return {
        }
    },
}
</script>

<style scoped>
.menu-container{
    z-index: 1;
    width: 100%; 
    height: 15vh; 
    position: fixed; 
    bottom: 0;
    padding: 10vh 3vh 10vh 3vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

#bottom-menu{
    width: 75vmax;
    height: inherit;
    border-radius: 1.5vmax;

    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgb(22, 44, 88);
}
</style>
