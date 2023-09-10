<template>
    <div>
        <MasterLayout>
            <LoaderComponent v-show="isLoad" />
            <div v-show="!isLoad" class="posts-container">
                <div class="filter-section">
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



                    <!-- <div class="input-group rounded">
                        <input type="search" class="form-control rounded" v-model="search" @input="applyFilter"
                            placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                            <i class="fas fa-search"></i>
                        </span>
                    </div> -->


                </div>
                <div class="row posts-section">
                    <div class="col-md-4 col-sm-3 card-holder" v-for="post in  filteredList" :key="post.id">
                        <div class="card m-1">
                            <!-- <div class="card-header">
                                <strong>{{ post.title }}</strong>
                            </div> -->
                            <div class="card-body p-0 m-1 bg-img">

                                <img v-if="post.post_img != null" :src="post.post_img" alt="card img"
                                    style="width:100%;height: 150px; padding: 0;margin: 0;" class="card-img">
                                <img style="width:100%;height: 150px;" v-else :src="this.noImageUrl" alt="no image"
                                    class="card-img">


                                <span v-if="post.status == 'ONGOING'" class="badge rounded-pill badge-warning post-status"
                                    data-mdb-toggle="tooltip" data-mdb-placement="top" title="This serires is ongoing."><i
                                        class="fas fa-face-grin-hearts"></i> {{
                                            post.status }}</span>
                                <span v-if="post.status == 'COMPLETED'" class="badge rounded-pill badge-danger post-status"
                                    data-mdb-toggle="tooltip" data-mdb-placement="top" title="This serires is completed."><i
                                        class="fas fa-face-grin-hearts"></i> {{
                                            post.status }}</span>


                            </div>
                            <div class="card-footer">
                                <router-link :to="{ name: 'PostDetail', params: { pid: post.id } }">
                                    <strong v-if="post.title.length > 15" class="post-title"> {{ post.title.substring(0, 15)
                                        + "..."
                                    }}</strong>
                                    <strong v-else class="post-title"> {{ post.title }}</strong>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pagination-buttons">
                    <button class="btn btn-primary " @click="loadPage(prevUrl)" :disabled="!prevUrl"> &lt;&lt;
                        Previous</button>
                    <button class="btn btn-primary " @click="loadPage(nextUrl)" :disabled="!nextUrl">Next >></button>
                </div>
            </div>
        </MasterLayout>
    </div>
</template>
<script>
import MasterLayout from '../Layout/Master.vue';
import LoaderComponent from '../Component/Loader.vue';
import axios from 'axios';
import moment from 'moment';
export default {
    components: {
        MasterLayout,
        LoaderComponent,
    },
    name: "PostPage",
    data() {

        return {
            isLoad: true,
            search: '',
            category: '',
            tags: '',
            postStatus: '',
            posts: [],
            allPosts: [],
            prevUrl: null,
            nextUrl: null,
            posturl: "posts/list/",
            noImageUrl: "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
        };

    },
    methods: {
        async getPosts(url, params = {}) {
            try {

                await axios.get(url, { params }).then((result) => {
                    this.isLoad = false;
                    this.posts = result.data['results']
                    this.prevUrl = result.data['previous']
                    this.nextUrl = result.data['next']
                }).catch((err) => {
                    console.log(err)
                });

            } catch (error) {
                console.error('Error fetching posts', error);
                alert("error fetching the posts");
            }
        },
        async loadPage(url) {
            if (url) {
                this.getPosts(url, { "title_search": this.search, "category": this.category, "tags": this.tags, "post_status": this.postStatus })
            }
        },
        applyFilter() {
            this.loadPage(this.posturl, { "title_search": this.search, "category": this.category, "tags": this.tags, "post_status": this.postStatus });
        },

        changeDateFormat(date) {
            return moment(date).format('DD-MM-YYYY')
        }
    },
    created() {
        this.getPosts(this.posturl, { "title_search": this.search, "category": this.category, "tags": this.tags, "post_status": this.postStatus })
    },
    computed: {
        filteredList() {
            return this.posts.filter(post => post.title.toLowerCase().includes(this.search.toLowerCase()));
        }
    },
    mounted() {
        this.getPosts(this.posturl, { "title_search": this.search, "category": this.category, "tags": this.tags, "post_status": this.postStatus })
    },
    watch() {
        this.applyFilter()
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
    margin: 20px;
    width: 800px;
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
    width: 800px;
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

@media only screen and (max-width:600px) {
    .posts-container {
        max-width: 350px;
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