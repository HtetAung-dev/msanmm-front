<template>
    <MasterLayout>
        <div class="container-fluid">
            <LoaderComponent v-show="isLoad" />
            <div v-show="!isLoad" class="posts-container">
                <div class="filter-section pa-2">
                    <div class="filter-group">
                        <svg class="filter-icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path
                                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                                </path>
                            </g>
                        </svg>
                        <input v-model="search" @input="applyFilter" placeholder="Search" type="search"
                            class="filter-input">
                    </div>

                </div>
                <div class="post-section-container">

                    <div class="card posts-card ma-2 pa-2">
                        <h4 style="width: 100%;">Audio စာစဉ်များ</h4>
                        <hr>
                        <LoaderComponent v-show="isLoad" />
                        <div v-show="!isLoad" class="row ma-2 ">
                            <div class="col-sm-3" v-for="post in  paginatedPosts" :key="post.id">
                                <div class="latest-chapters card m-1">

                                    <div class="card-body p-0 m-1 bg-img">
                                        <div class="card-posts-min">
                                            <div class="img-posts-section">
                                                <img v-if="post.post_img != null" :src="post.post_img" alt="card img"
                                                    style="width:150px;height: 150px; padding: 0;margin: 0;"
                                                    class="card-img chapter-post-img">
                                                <img style="width:150px;height: 150px;" v-else :src="this.noImageUrl"
                                                    alt="no image" class="card-img">
                                            </div>
                                            <div class="detail-posts-section">
                                                <router-link :to="{ name: 'HorrorDetail', params: { hid: post.id } }"
                                                    class="chapter-post-title">
                                                    {{ post.title }}
                                                </router-link><br>
                                                <span class="posts-caption">ဘာသာပြန်သူ - {{ post.translator
                                                }}</span>
                                                <div class="posts-latest-chp" v-for="chapter in post.latest_chapters"
                                                    :key="chapter.id">
                                                    <router-link class="btn btn-warning"
                                                        :to="{ name: 'AEpisodeDetail', params: { id: chapter.id } }">
                                                        {{ chapter.season }} - {{ chapter.chapter_no
                                                        }}</router-link>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">

                                        <span v-if="post.status == 'ONGOING'"
                                            class="badge rounded-pill badge-warning post-status" data-mdb-toggle="tooltip"
                                            data-mdb-placement="top" title="This serires is ongoing."><i
                                                class="fas fa-face-grin-hearts"></i>
                                            {{
                                                post.status }}</span>
                                        <span v-if="post.status == 'COMPLETED'"
                                            class="badge rounded-pill badge-danger post-status" data-mdb-toggle="tooltip"
                                            data-mdb-placement="top" title="This serires is completed."><i
                                                class="fas fa-face-grin-hearts"></i>
                                            {{
                                                post.status }}</span>

                                        <span class="float-right"><v-icon icon="mdi-heart" color="red-lighten-2"></v-icon>
                                            {{ post.likes }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3 text-center">
                                <button class="mr-5 text-info" @click="previousPage" :disabled="currentPage === 1">&lt;&lt;
                                    ရှေ့သို့ </button>
                                <span class="mr-6 text-info">page {{ currentPage }} of {{ totalPages }}</span>
                                <button class="text-info" @click="nextPage" :disabled="currentPage === totalPages">နောက်သို့
                                    >></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MasterLayout>
</template>
<script>
import MasterLayout from '../Layout/Master.vue'
import LoaderComponent from '../Component/Loader.vue';
import axios from 'axios';
import moment from 'moment';
export default {
    components: {
        MasterLayout,
        LoaderComponent,
    },
    name: "AudioPage",
    data() {

        return {
            isLoad: true,
            search: '',
            category: '',
            itemsPerPage: 12,
            currentPage: 1,
            tags: '',
            postStatus: '',
            posts: [],
            allPosts: [],
            prevUrl: null,
            nextUrl: null,
            posturl: "audios/lastpublished/",
            noImageUrl: "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
        };

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
        totalPosts() {
            return this.allPosts.length;
        },
        async getPosts(url) {
            try {

                await axios.get(url).then((result) => {

                    this.allPosts = result.data['data']
                    console.log("all post get successfully", this.allPosts)
                    this.isLoad = false;
                }).catch((err) => {
                    console.log("error request posts", err)
                    alert("error fetching the posts");
                });

            } catch (error) {
                console.error('Error fetching posts', error);
                alert("error fetching the posts");
            }
        },
        // async loadPage(url) {
        //     if (url) {
        //         this.getPosts(url, { "title_search": this.search, "post_status": this.postStatus })
        //     }
        // },
        // applyFilter() {
        //     this.loadPage(this.posturl, { "title_search": this.search, "post_status": this.postStatus });
        // },

        changeDateFormat(date) {
            return moment(date).format('DD-MM-YYYY')
        }
    },
    created() {
        this.getPosts(this.posturl)
    },
    computed: {
        // filteredList() {
        //     return this.posts.filter(post => post.title.toLowerCase().includes(this.search.toLowerCase()));
        // }
        totalPages() {
            if (this.allPosts !== undefined) {
                return Math.ceil(this.allPosts.length / this.itemsPerPage);
            }
            return 0;
        },
        paginatedPosts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            if (this.allPosts == undefined) {
                return this.allPosts
            }
            return this.allPosts.slice(start, end);
        },
    },
    mounted() {

    },
    watch() {
        //this.applyFilter()
    }
}
</script>
<style scoped>
.filter-group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    max-width: 190px;
}

.posts-card {
    width: 100%;
}

.latest-chapters {
    width: 350px;
}

.filter-input {
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: .3s ease;
}

.filter-input::placeholder {
    color: #9e9ea7;
}

.filter-input:focus,
input:hover {
    outline: none;
    border-color: rgba(234, 76, 137, 0.4);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
}

.filter-icon {
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
}


.posts-container {
    width: 100%;
    height: 900px;
}


.post-status {
    position: absolute;
    top: 8px;
    left: 16px;
}

.pagination-buttons {
    padding-right: 25px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
}

.posts-section {
    width: 850px;
    min-height: 500px;
    max-height: 800px;
    height: auto;
    margin-top: 50px;
}

.post-title {
    color: #ff951c;
}

.card-img {
    border-radius: 5px;
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

@media only screen and (max-width:600px) {
    .posts-container {
        height: 100%;
        overflow: scroll;
    }

    .posts-section {
        max-width: 350px;
        min-height: 500px;
        height: auto;
        overflow: scroll;
    }

    .card-holder {
        max-width: 350px;
        margin: 0px;
        padding-left: 25px;
    }

    .card-img {
        width: 150px;
    }

    .pagination-buttons {
        position: relative;

        padding-right: 25px;
        padding-left: 10px;
        max-width: 350px;
        display: flex;
        justify-content: space-between;
    }
}
</style>