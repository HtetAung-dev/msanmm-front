<template>
    <div>
        <MasterLayout>
            <div class="container">
                <div class="row">
                    <div class="col-12 editor-choice m-2">
                        <h4>အယ်ဒီတာ့ စိတ်ကြိုက်</h4>
                        <v-card flat rounded="20">
                            <v-window show-arrows direction="vertical" v-model="onboarding" class="choice-window">
                                <v-window-item v-for="post in editorChoices" :key="post.id" :value="post">
                                    <v-card class="d-flex editor-card m-2">
                                        <div class="row">
                                            <img class="col-4 editor-img" :src="post.post_img" alt="" style="width: 100px;">

                                        </div>
                                        <div class="col-4">
                                            <span class="editor-title">
                                                {{ post.title }}
                                            </span>
                                            <span v-if="post.latest_chapter"> {{ post.latest_chapter.chapter_no }}</span>
                                            <span v-else> no chapter here</span>
                                        </div>


                                    </v-card>
                                </v-window-item>
                            </v-window>

                        </v-card>
                    </div>
                </div>
                <v-sheet class="mx-auto" elevation="8" max-width="1300">
                    <v-slide-group v-model="model" class="p-1 slide-latest" selected-class="bg-primary" show-arrows>
                        <v-slide-group-item v-for="post in latestPosts" :key="post.id">
                            <div class="card m-1 popular-card">

                                <div class="card-body p-0 m-1 bg-img popular-img">

                                    <img v-if="post.post_img != null" :src="post.post_img" alt="card img" class="card-img">
                                    <img style="width:150px;height: 150px;" v-else :src="this.noImageUrl" alt="no image"
                                        class="card-img">

                                    <br>

                                    <span v-if="post.status == 'ONGOING'"
                                        class="badge rounded-pill badge-warning post-status" data-mdb-toggle="tooltip"
                                        data-mdb-placement="top" title="This serires is ongoing."><i
                                            class="fas fa-face-grin-hearts"></i> {{
                                                post.status }}</span>
                                    <span v-if="post.status == 'COMPLETED'"
                                        class="badge rounded-pill badge-danger post-status" data-mdb-toggle="tooltip"
                                        data-mdb-placement="top" title="This serires is completed."><i
                                            class="fas fa-face-grin-hearts"></i>
                                        {{
                                            post.status }}</span>


                                </div>
                                <div class="card-footer">
                                    <router-link :to="{ name: 'PostDetail', params: { pid: post.id } }">
                                        <!-- <strong v-if="post.title.length > 15" class="post-title"> {{
                                            post.title.substring(0,
                                                15)
                                            + "..."
                                        }}</strong>
                                        <strong v-else class="post-title"> {{ post.title }}</strong> -->
                                        <p class="post-title"> {{ post.title }}</p>
                                    </router-link>

                                </div>
                            </div>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-sheet>
            </div>
            <div class="container">


                <div class="row">
                    <div class="col">
                        <div class="posts-section col-md-9 mt-4 p-4" max-width="700px">

                            <div class="row ">
                                <div class="col-md-3 col-sm-2 card-holder" v-for="post in  paginatedPosts" :key="post.id">
                                    <div class="card m-1">

                                        <div class="card-body p-0 m-1 bg-img">

                                            <img v-if="post.post_img != null" :src="post.post_img" alt="card img"
                                                style="width:100%;height: 150px; padding: 0;margin: 0;" class="card-img">
                                            <img style="width:100%;height: 150px;" v-else :src="this.noImageUrl"
                                                alt="no image" class="card-img">


                                            <span v-if="post.status == 'ONGOING'"
                                                class="badge rounded-pill badge-warning post-status"
                                                data-mdb-toggle="tooltip" data-mdb-placement="top"
                                                title="This serires is ongoing."><i class="fas fa-face-grin-hearts"></i> {{
                                                    post.status }}</span>
                                            <span v-if="post.status == 'COMPLETED'"
                                                class="badge rounded-pill badge-danger post-status"
                                                data-mdb-toggle="tooltip" data-mdb-placement="top"
                                                title="This serires is completed."><i class="fas fa-face-grin-hearts"></i>
                                                {{
                                                    post.status }}</span>


                                        </div>
                                        <div class="card-footer">
                                            <router-link :to="{ name: 'PostDetail', params: { pid: post.id } }">
                                                <!-- <p v-if="post.title.length > 15" class="post-title"> {{
                                                    post.title.substring(0,
                                                        15)
                                                    + "..."
                                                }}</p>
                                                <p v-else class="post-title"> {{ post.title }}</p> -->
                                                <p class="post-title"> {{ post.title }}</p>

                                            </router-link>

                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3 text-center">
                                    <button class="mr-5 text-info" @click="previousPage"
                                        :disabled="currentPage === 1">&lt;&lt;
                                        ရှေ့သို့ </button>
                                    <span class="mr-6 text-info">page {{ currentPage }} of {{ totalPages }}</span>
                                    <button class="text-info" @click="nextPage"
                                        :disabled="currentPage === totalPages">နောက်သို့
                                        >></button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <v-text-field v-model="userName" :rules="rules" label="User name"></v-text-field>
                    </div>
                </div>

            </div>
        </MasterLayout>

    </div>
</template>

<script>
import MasterLayout from '../Layout/Master.vue';
import axios from 'axios';
export default {
    components: {
        MasterLayout
    },
    name: "HomePage",
    data() {
        return {
            isLoad: true,
            itemsPerPage: 12,
            currentPage: 1,
            postList: [],
            latestPosts: [],
            url: 'posts/home/',
            latestUrl: 'posts/list/sort/',
            editorUrl: 'posts/editor/choices/',
            length: 3,
            widnow: 0,
            onboarding: 0,
            editorChoices: []
        }
    },
    methods: {
        getEpisodeCount(chapters) {


            if (chapters !== undefined) {

                return chapters.length;
            }

            console.log("post chapter === ",)
            return 0;

        },
        async getEditorChoices(url) {
            await axios.get(url).then((result) => {
                this.editorChoices = result.data['data']
                console.log("choices length", this.editorChoices.length)
            }).catch((err) => {
                console.log("no editor choices", err)
            });
        },
        next() {
            this.onboarding = this.onboarding + 1 < this.length
                ? 1
                : this.onboarding + 1
        },
        prev() {
            this.onboarding = this.onboarding - 1 <= 0
                ? this.length
                : this.onboarding - 1
        },
        async getLatestPosts(url) {
            try {
                await axios.get(url).then((result) => {
                    this.isLoad = false;
                    this.latestPosts = result.data['data']

                    console.log("latest post", this.latestPosts)
                }).catch((err) => {
                    console.log("error request posts", err)
                });

            } catch (error) {
                console.error('Error fetching posts', error);
                alert("error fetching the posts");
            }
        },
        async getPosts(url) {
            try {
                await axios.get(url).then((result) => {
                    this.isLoad = false;
                    this.postList = result.data['data']
                    console.log("all post", this.postList)
                }).catch((err) => {
                    console.log("error request posts", err)
                });

            } catch (error) {
                console.error('Error fetching posts', error);
                alert("error fetching the posts");
            }
        },

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
    },
    created() {
        this.getEditorChoices(this.editorUrl)
        this.getLatestPosts(this.latestUrl);
        this.getPosts(this.url);
    },
    watch: {
    }
};
</script>
<style scoped>
.posts-section {
    background-color: #f7f4f4;
    border-radius: 20px;
}

.card-holder {
    max-width: 200px;
}

.editor-choice {
    background-image: linear-gradient(to right, rgb(31, 31, 31), rgb(73, 73, 73));
    width: 600px;
    height: 250px;
    padding: 20px;
    border-radius: 20px;
    color: #ffd312c4;
}

.choice-window,
.choice-btn {
    color: #ffd312c4;
    background-image: linear-gradient(to right, rgb(31, 31, 31), rgb(73, 73, 73));
}


.card-img {
    width: 150px;
    height: 150px;
    padding: 0;
    margin: 0;
}

.editor-card {
    background-image: linear-gradient(60deg, rgba(117, 115, 115, 0.897), rgba(118, 116, 116, 0.912), rgb(144, 144, 144), rgb(206, 206, 206), rgb(239, 247, 255));
    border-radius: 15px;
    height: 100px;
    color: #ffd312c4;
}

.editor-title {
    margin: 5px;
    font-size: 12px;
    font-weight: bold;
}

.editor-description {
    font-style: 10px;

}

.card-footer {
    padding: 5px !important;
    font-size: 10px;

}

.post-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

@media only screen and (max-width: 600px) {
    .popular-card {
        width: 80px;
        height: 150px;
    }

    .card-img {
        width: 80px;
        height: 80px;
    }

    .post-title {
        font-size: 10px;
    }

    .v-slide-group__next,
    .v-slide-group__prev {
        min-width: 20px !important;
    }
}
</style>