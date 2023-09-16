<template>
    <div>
        <MasterLayout>
            <div class="container">

                <v-card v-if="isAuthenticated && userHasPermission === 'AUTHOR'" class="mx-auto mt-2" max-width="800"
                    rounded="10">

                    <div class="row col-12">

                        <div class="col-2">
                            <v-avatar color="grey" size="150" rounded="0">
                                <v-img v-if="userProfile.profile_img == null" co9ver
                                    src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                                <v-img v-if="userProfile.profile_img !== null" co9ver
                                    :src="userProfile.profile_img"></v-img>
                            </v-avatar>
                            <v-list-item-title class="text-primary text-center mt-1"> {{ userProfile.username
                            }}</v-list-item-title>
                            <v-list-item-subtitle class="text-center text-overline">
                                {{ userProfile.type }}
                            </v-list-item-subtitle>
                        </div>

                        <div class="col-10">
                            <h6 class="col-10 text-center m-3">ကိုယ်ရေးအကျဉ်း</h6>
                            <p class="col-10 text-body-2">{{ userProfile.bio }}</p>
                        </div>

                    </div>
                    <button type="button"
                        class="btn btn-primary btn-lg btn-floating float-end position-absolute top-0 end-0" @click="logout">
                        <i class="fas fa-right-from-bracket"></i>
                        <v-tooltip activator="parent" location="left">Logout</v-tooltip>

                    </button>
                </v-card>
                <div class="container posts-section mt-4 p-3" width="800px">
                    <div class="row">
                        <h3 class="col">
                            စာစဉ်များ
                        </h3>
                        <button type="button" class="btn btn-primary btn-lg btn-floating float-end col-1"
                            @click="this.$router.push({ name: 'PostCreate' })">
                            <i class="far fa-pen-to-square"></i>
                            <v-tooltip activator="parent" location="left">Create Post</v-tooltip>

                        </button>
                    </div>


                    <div class="row ">
                        <div class="col-md-3 col-sm-2 card-holder" v-for="post in  paginatedPosts" :key="post.id">
                            <div class="card m-1">
                                <!-- <div class="card-header">
                                <strong>{{ post.title }}</strong>
                            </div> -->
                                <div class="card-body p-0 m-1 bg-img">

                                    <img v-if="post.post_img != null" :src="post.post_img" alt="card img"
                                        style="width:100%;height: 150px; padding: 0;margin: 0;" class="card-img">
                                    <img style="width:100%;height: 150px;" v-else :src="this.noImageUrl" alt="no image"
                                        class="card-img">


                                    <span v-if="post.status == 'ONGOING'"
                                        class="badge rounded-pill badge-warning post-status" data-mdb-toggle="tooltip"
                                        data-mdb-placement="top" title="This serires is ongoing."><i
                                            class="fas fa-face-grin-hearts"></i> {{
                                                post.status }}</span>
                                    <span v-if="post.status == 'COMPLETED'"
                                        class="badge rounded-pill badge-danger post-status" data-mdb-toggle="tooltip"
                                        data-mdb-placement="top" title="This serires is completed."><i
                                            class="fas fa-face-grin-hearts"></i> {{
                                                post.status }}</span>


                                </div>
                                <div class="card-footer">
                                    <router-link :to="{ name: 'PostDetail', params: { pid: post.id } }">
                                        <strong v-if="post.title.length > 15" class="post-title"> {{ post.title.substring(0,
                                            15)
                                            + "..."
                                        }}</strong>
                                        <strong v-else class="post-title"> {{ post.title }}</strong>
                                    </router-link>
                                    <!-- 
                                <router-link :to="{ name: 'PostDetail', params: { pid: post.id } }"
                                    class="btn btn-sm btn-info float-end">read</router-link> -->
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 text-center">
                            <button class="mr-5 text-primary" @click="previousPage" :disabled="currentPage === 1">&lt;&lt;
                                Previous</button>
                            <span class="mr-6">page {{ currentPage }} of {{ totalPages }}</span>
                            <button class="text-primary" @click="nextPage" :disabled="currentPage === totalPages">Next
                                >></button>
                        </div>

                    </div>
                    <v-divider></v-divider>
                    <LoaderComponet v-show="!isLoad"></LoaderComponet>

                </div>


            </div>
        </MasterLayout>
    </div>
</template>
<script>
import MasterLayout from '../Layout/Master.vue'
import LoaderComponet from '../Component/Loader.vue'
import axios from 'axios';

export default {
    name: "ProfilePage",
    components: {
        MasterLayout,
        LoaderComponet,
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
            userProfile: {}
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
    border-radius: 20px;
    background-color: rgb(255, 251, 246);
}

.post-title {
    font-size: 10px;
}
</style>