<template>
    <div>
        <MasterLayout>
            <div class="container-fluid">
                <div class="row">
                    <v-card v-if="isAuthenticated && userHasPermission === 'AUTHOR'" class="ma-2 col-lg-6" max-width="400"
                        rounded="10">

                        <div class="row">

                            <div class="col-lg-3">
                                <v-avatar color="grey" size="150" rounded="0">
                                    <v-img v-if="userProfile.profile_img == null" co9ver
                                        src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                                    <v-img v-if="userProfile.profile_img !== null" co9ver
                                        :src="userProfile.profile_img"></v-img>
                                </v-avatar>


                            </div>

                            <div class="col-lg-8">
                                <h6 class="col-10 text-center m-3">ကိုယ်ရေးအကျဉ်း</h6>
                                <p class="col-10 text-body-2">{{ userProfile.bio }}</p>
                            </div>

                        </div>
                        <button type="button"
                            class="btn btn-primary btn-lg btn-floating float-end position-absolute top-0 end-0"
                            @click="logout">
                            <i class="fas fa-right-from-bracket"></i>
                            <v-tooltip activator="parent" location="left">Logout</v-tooltip>

                        </button>
                        <v-list-item-title class="text-primary text-left ma-1"> {{ userProfile.username
                        }}</v-list-item-title>
                        <v-list-item-subtitle class="text-left text-overline ma-1">
                            {{ userProfile.type }}
                        </v-list-item-subtitle>
                        <hr>

                        <v-list :lines="false" density="compact" nav>
                            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="secondary"
                                @click.prevent="this.$router.push({ name: item.page })">
                                <template v-slot:prepend>
                                    <v-icon :icon="item.icon"></v-icon>
                                </template>

                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="logout" color="secondary">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-logout"></v-icon>
                                </template>

                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-card>
                    <div class="card col-lg-6 posts-section ma-2 p-3" width="800px">
                        <router-view></router-view>
                    </div>
                </div>




            </div>
        </MasterLayout>
    </div>
</template>
<script>
import MasterLayout from '../Layout/Master.vue'
import axios from 'axios';

export default {
    name: "ProfilePage",
    components: {
        MasterLayout,
    },
    data() {
        return {
            isAuthenticated: null,
            userHasPermission: null,
            postList: [],
            isLoad: false,
            noImageUrl: "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg",
            itemsPerPage: 12,
            currentPage: 1,
            userProfile: {},
            items: [
                { text: 'Posts', icon: 'mdi-information', page: 'AdminPosts' },
                { text: 'Horror Posts', icon: 'mdi-ghost', page: 'HorrorPosts' },
                { text: 'Account Setting', icon: 'mdi-account-cog', page: 'Setting' },
                { text: 'Buy Coin', icon: 'mdi-cash-plus', page: 'PurchaseCoin' },
                { text: 'Order History', icon: 'mdi-file-clock', page: 'OrderHistory' },
            ],
        }
    },
    methods: {
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        getPostsByUser() {
            const id = this.$route.params.id
            axios.get(`posts/${id}/post`).then((res) => {
                console.log(res)
                this.postList = res.data['data'];
                this.isLoad = true;
            }).catch((err) => {
                console.error("error receiving author posts", err);
                alert("ERROR RECEIVING POSTS!!!")
            });
        },
        getUserDetail() {
            const id = this.$route.params.id
            axios.get(`accounts/${id}/detail`).then((res) => {
                this.userProfile = res.data['data']
            })
        },
        logout() {
            this.$store.dispatch('logout')
            this.$router.push({ name: 'HomePage' })
        },
        totalPosts() {
            return this.postList.length;
        },
        displayedPosts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            if (this.postList == undefined) {
                return this.postList
            }

            return this.postList.slice(start, end);
        },

    },
    computed: {
        totalPages() {
            if (this.postList !== undefined) {
                return Math.ceil(this.postList.length / this.itemsPerPage);
            }
            return 0
        },
        paginatedPosts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            if (this.postList == undefined) {
                return this.postList
            }
            return this.postList.slice(start, end);
        },
        getAuthentication() {
            return this.$store.getters.isAuthenticated
        },
        getUserPermissions() {
            return this.$store.getters.userPermissions
        },
    },
    created() {
        this.getUserDetail()
        this.getPostsByUser()
        this.isAuthenticated = this.getAuthentication
        this.userHasPermission = this.getUserPermissions

    },


}
</script>

<style scoped>
.posts-section {
    min-width: 300px;
    max-width: 800px;
    border-radius: 5px;
    background-color: rgb(255, 251, 246);
}

.post-title {
    font-size: 10px;
}
</style>