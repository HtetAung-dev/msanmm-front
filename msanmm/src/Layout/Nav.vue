<template>
    <div>
        <nav class="navbar navbar-expand-lg  bg-dark">
            <div class="container-fluid">

                <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <a class="navbar-brand" href="#">
                        <img src="../../public/logo.png" alt="logo set" srcset="" width="80">
                    </a>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/"><i class="fas fa-house"></i> Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/posts"><i class="fas fa-book"></i> စာစဉ်များ</router-link>
                        </li>
                        <li v-if="isAuthenticated && userHasPermisssions !== 'READER'" class="nav-item">
                            <router-link class="nav-link" to="/admin">Admin Dashboard</router-link>
                        </li>

                    </ul>
                </div>
                <div class="d-flex align-items-center">
                    <button class="Btn" @click="this.router.push('/login')" v-if="!isAuthenticated">

                        <div class="sign"><svg viewBox="0 0 512 512">
                                <path
                                    d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z">
                                </path>
                            </svg></div>

                        <div class="text">Login</div>
                    </button>



                    <div class="dropdown" v-if="isAuthenticated">
                        <a class="dropdown-toggle d-flex align-items-center hidden-arrow" href="#"
                            id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" class="rounded-circle" height="50"
                                alt="Black and White Portrait of a Man" loading="lazy" />
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                            <li>
                                <router-link class="dropdown-item"
                                    :to="{ name: 'ProfilePage', params: { id: this.user.id || 0 } }">My
                                    profile</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/post/new">Create Posts</router-link>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Settings</a>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios';

export default {
    name: "NavLayout",
    data() {
        return {
            isAuthenticated: null,
            userHasPermisssions: '',
            store: useStore,
            user: {},
            router: useRouter(),
            token: ''


        }
    },
    method: {

        async navToLoginUrl() {
            this.router.go({ path: "/login", name: "LoginPage" });
        },
        logout() {
            console.log("before clear")
            localStorage.clear()
            console.log("after clear")
        }
    },
    computed: {
        getAuthenticated() {
            return this.$store.getters.isAuthenticated;
        },

        getCurrentUser() {
            return this.$store.getters.userData;
        },
        getUserPermissions() {
            return this.$store.getters.userPermissions;
        },

    },
    created() {

        this.isAuthenticated = this.getAuthenticated;
        this.user = this.getCurrentUser;
        this.userHasPermisssions = this.getUserPermissions;
        console.log("authentication is ", this.isAuthenticated)
        if (this.isAuthenticated) {
            this.token = localStorage.getItem("jwtToken")
            axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        }
    },

}
</script>
<style scoped>
.navbar-nav li a {
    color: #ffd312c4 !important;
}

.Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: rgb(163, 142, 255);
}

/* plus sign */
.sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sign svg {
    width: 17px;
}

.sign svg path {
    fill: white;
}

/* text */
.text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: .3s;
}

/* hover effect on button width */
.Btn:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: .3s;
}

.Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
}

/* hover effect button's text */
.Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
}

/* button click effect*/
.Btn:active {
    transform: translate(2px, 2px);
}
</style>