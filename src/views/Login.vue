<template>
    <NavBar />
    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <div v-if="signedIn" >
            <h1>You are signed in</h1>
            <button type="button" @click="signOut()">Sign Out</button>
        </div>
        <div v-else>
            <h1>Sign In</h1>
            <form class="form-group">
                <input v-model="name" type="username" class="form-control" placeholder="Username" required>
                <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                <input type="submit" class="btn btn-primary" @click="doLogin()">
            </form>
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
            name: '',
            password: '',
            signedIn: false,
        };
    },
    mounted(){
        let signedIn = localStorage.getItem('isSignedIn') || JSON.stringify(false)
        this.signedIn = JSON.parse(signedIn)
    },
    methods: {
        doLogin(){
            localStorage.setItem('isSignedIn', JSON.stringify(true))
            localStorage.setItem('username', this.name)
            let users = localStorage.getItem('users') || JSON.stringify([{name: 'Guest', code: 'guest'}, {name: 'Friend', code: 'friend'}])
            let parsed = JSON.parse(users)
            parsed.push({name: this.name, code: this.name.toLowerCase()})
            localStorage.setItem('users', JSON.stringify(parsed))
            setTimeout(() => {
                this.$router.push('/')
            }, 750)
        },
        signOut(){
            localStorage.setItem('isSignedIn', JSON.stringify(false))
            localStorage.setItem('username', 'Guest')
            this.$router.go()
        }
    }
  })
  export default class Login extends Vue {}
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