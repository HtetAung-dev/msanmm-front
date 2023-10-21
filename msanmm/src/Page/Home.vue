<template>
    <div>
        <MasterLayout>
            <div class="container home-container">
                <div class="row">
                    <div class="col-12 editor-choice my-2">
                        <h4>အယ်ဒီတာ့ စိတ်ကြိုက်</h4>
                        <v-card flat rounded="20">
                            <v-window show-arrows direction="vertical" v-model="onboarding" class="choice-window">
                                <v-window-item v-for="post in editorChoices" :key="post.id" :value="post">
                                    <v-card class="d-flex editor-card m-2">
                                        <div class="row">
                                            <img class="col-4 editor-img" :src="post.post_img" alt="" style="width: 100px;">

                                        </div>
                                        <div class="col-8">
                                            <span class="editor-title">
                                                {{ post.title }}
                                            </span>
                                            <span class="badge rounded-pill badge-danger editor-status"> {{
                                                post.status }}</span><br>
                                            <span style="font-size: .7rem;margin: 10px;"
                                                class="editor-translator">ဘာသာပြန်သူ - {{ post.translator
                                                }}</span><br>

                                            <span class="badge rounded-pill badge-info editor-category"> {{
                                                post.categories.category_name
                                            }}</span>
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
                                        class="badge rounded-pill badge-warning post-status latest-status"
                                        data-mdb-toggle="tooltip" data-mdb-placement="top"
                                        title="This series is ongoing."><i class="fas fa-face-grin-hearts"></i> {{
                                            post.status }}</span>
                                    <span v-if="post.status == 'COMPLETED'"
                                        class="badge rounded-pill badge-danger post-status latest-status"
                                        data-mdb-toggle="tooltip" data-mdb-placement="top"
                                        title="This serires is completed."><i class="fas fa-face-grin-hearts"></i>
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
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 post-section-container">

                            <div class="posts-section my-2 ">
                                <h4 style="width: 100%; margin-top: -40px;">စာစဉ်များ</h4>
                                <LoaderComponent v-show="isLoad" />
                                <div v-show="!isLoad" class="row">
                                    <div class="col-8 card-holder" v-for="post in  paginatedPosts" :key="post.id">
                                        <div class="latest-chapters col-6 card m-1">

                                            <div class="card-body p-0 m-1 bg-img">
                                                <div class="card-posts-min">
                                                    <div class="img-posts-section">
                                                        <img v-if="post.post_img != null" :src="post.post_img"
                                                            alt="card img"
                                                            style="width:150px;height: 150px; padding: 0;margin: 0;"
                                                            class="card-img chapter-post-img">
                                                        <img style="width:150px;height: 150px;" v-else
                                                            :src="this.noImageUrl" alt="no image" class="card-img">
                                                    </div>
                                                    <div class="detail-posts-section">
                                                        <router-link :to="{ name: 'PostDetail', params: { pid: post.id } }"
                                                            class="chapter-post-title">
                                                            {{ post.title }}
                                                        </router-link><br>
                                                        <span class="posts-caption">ဘာသာပြန်သူ - {{ post.translator
                                                        }}</span>
                                                        <div class="posts-latest-chp"
                                                            v-for="chapter in post.latest_chapters" :key="chapter.id">
                                                            <router-link class="btn btn-warning"
                                                                :to="{ name: 'ChapterDetailPage', params: { cid: chapter.id } }">
                                                                {{ chapter.season }} - {{ chapter.chapter_no
                                                                }}</router-link>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer">

                                                <span v-if="post.status == 'ONGOING'"
                                                    class="badge rounded-pill badge-warning post-status"
                                                    data-mdb-toggle="tooltip" data-mdb-placement="top"
                                                    title="This serires is ongoing."><i class="fas fa-face-grin-hearts"></i>
                                                    {{
                                                        post.status }}</span>
                                                <span v-if="post.status == 'COMPLETED'"
                                                    class="badge rounded-pill badge-danger post-status"
                                                    data-mdb-toggle="tooltip" data-mdb-placement="top"
                                                    title="This serires is completed."><i
                                                        class="fas fa-face-grin-hearts"></i>
                                                    {{
                                                        post.status }}</span>

                                                <span class="float-right"><v-icon icon="mdi-heart"
                                                        color="red-lighten-2"></v-icon> {{ post.likes }}</span>
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
                        <div class="col-md-4 my-2 last-rel-block">
                            <h4 style="width: 300px;" class="my-2">Chapter အသစ်များ</h4>
                            <div v-for="post in lastRelease" :key="post.id">

                                <v-card v-for="chapter in post.latest_chapters" :key="chapter.id"
                                    class="mx-auto lastRel-card my-2" width="350">
                                    <v-card-title>
                                        <span class="lastrel-title">{{ post.title }}</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <router-link :to="{ name: 'ChapterDetailPage', params: { cid: chapter.id } }"
                                            class="lastrel-body">
                                            {{ chapter.chapter_no }}</router-link>
                                    </v-card-text>
                                </v-card>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </MasterLayout>

    </div>
</template>

<script>
import MasterLayout from '../Layout/Master.vue';
import LoaderComponent from '@/Component/Loader.vue';
import axios from 'axios';
export default {
    components: {
        MasterLayout,
        LoaderComponent
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
            lastReleaseUrl: 'posts/lastpublished/',
            length: 3,
            widnow: 0,
            onboarding: 0,
            editorChoices: [],
            lastRelease: []
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
            await axios.get(url).then((result) => {

                this.postList = result.data['data']
                console.log("all post get successfully")
                this.isLoad = false;
            }).catch((err) => {
                console.log("error request posts", err)
                alert("error fetching the posts");
            });
        },
        async getLastRel(url) {
            await axios.get(url).then((result) => {
                this.lastRelease = result.data['data']
                console.log("all last release get success!")

            }).catch((err) => {
                console.log("error request latest releases", err)

            });
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
        this.getLastRel(this.lastReleaseUrl);
    },
    watch: {
    }
};
</script>
<style scoped>
.home-container {
    min-height: 100vh;
}

.last-rel-block {
    background-color: #f7f4f4;
    border-radius: 10px;
}

.lastrel-title {
    color: #212020;
}

.lastrel-body {
    color: #eeac3b;
    font-size: 0.8rem;
}

.posts-section {
    background-color: #f7f4f4;
    border-radius: 20px;
    padding: 50px;
}

.editor-category,
.editor-translator,
.editor-status {
    font-size: .7rem;
    margin: 10px;
}

.post-section-container {
    padding-left: 0 !important;
}

.card-holder {
    max-width: 380px;
}

.posts-caption {
    font-size: 0.5rem;
    margin: 0;
    color: #818181;
}

.card-posts-min {
    display: flex;
    justify-content: space-between;
}

.detail-posts-section {
    width: 53%;
}

.img-posts-section {
    width: 45%;
}

.editor-choice {
    background-image: linear-gradient(to right, rgb(31, 31, 31), rgb(73, 73, 73));
    width: 600px;
    height: 250px;
    padding: 20px;
    border-radius: 20px;
    color: #ffd312c4;
}

.posts-latest-chp {
    list-style-type: none;

    margin-left: 0px;
}

.posts-latest-chp .btn {
    display: block;
    padding: 2px;
    margin: 5px;
    font-size: 0.7rem;
    max-width: 150px;
}

.choice-window,
.choice-btn {
    color: #ffd312c4;
    background-image: linear-gradient(to right, rgb(31, 31, 31), rgb(73, 73, 73));
}

.latest-chapters {
    width: 370px !important;
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
    font-size: 1rem;
    font-weight: bold;
}

.editor-description {
    font-style: 10px;

}

.card-footer {
    padding: 5px !important;
    font-size: 14px;

}

.post-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.chapter-post-title {
    width: 180px;
    color: #1b1b1b;
    white-space: wrap;
    font-size: .8rem;
    font-weight: bold;
}

@media only screen and (max-width: 600px) {
    .popular-card {
        width: 80px;
        height: 150px;
    }


    .post-section-container {
        padding-right: 0 !important;
    }

    .editor-title {
        margin: 5px;
        font-size: .7rem;
        font-weight: bold;
    }

    .editor-category,
    .editor-translator,
    .editor-status {
        font-size: .5rem;
        margin: 8px;
    }

    .card-post-min {
        max-width: 250px;
    }

    .chapter-post-img {
        width: 100px !important;

    }

    .card-holder {
        max-width: 250px;
    }

    .latest-status {
        font-size: 0.5rem;
    }

    .img-posts-section {
        widows: 120px !important;
    }

    .card-img {
        width: 80px;
        height: 80px;
    }


    .chapter-post-title {
        width: 160px;
        color: #161616;
        white-space: wrap;
        font-size: .8rem;
        font-weight: bold;
    }

    .post-title {
        font-size: 10px;
    }

    .v-slide-group__next,
    .v-slide-group__prev {
        min-width: 20px !important;
    }

    .latest-chapters {
        width: 300px !important;
    }
}
</style>