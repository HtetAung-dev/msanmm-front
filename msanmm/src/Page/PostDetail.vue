<template>
    <div class="post-detail-section">
        <MasterLayout>
            <LoaderComponent v-show="isLoad" />
            <div v-show="!isLoad" class="post-detail-page container">
                <div class="columns is-multiline">
                    <div class="row">

                        <img v-bind:src="post.post_img" style="width: 300px;height: 300px;"
                            class="figure-img img-fluid rounded shadow-3 mb-3 col-md-4" alt="post image">
                        <div class="col-md-4">
                            <h1 class="title col">{{ post.title }}</h1><span
                                class="badge rounded-pill badge-danger post-status p-2" data-mdb-toggle="tooltip"
                                data-mdb-placement="top" title="This serires is completed."><i
                                    class="fas fa-face-grin-hearts"></i> {{
                                        post.status }}</span>
                            <div class="detail">
                                <div class="row col-12  m-1 p-1">
                                    <span class="col-5 p-1">စာရေးသူ</span> <span class="col-4 p-1">: {{
                                        puname }}</span>
                                </div>

                                <div class="row m-1 p-1">
                                    <span class="col-5 p-1">အမျိုးအစား </span> <span class="col-4 p-1">: {{
                                        post.categories }}</span>
                                </div>
                                <div class="row m-1 p-1">
                                    <span class="col-5 p-1">ဘာသာစကား</span> <span class="col-4 p-1">: {{
                                        post.language }}</span>
                                </div>
                                <div v-if="post.original_author == null" v-show="false" class="row m-1 p-1">
                                    <span class="col-5 p-1">မူရင်းရေးသူ</span> <span class="col-8 p-1">: {{
                                        post.original_author }}</span>
                                </div>
                                <div class="tag m-3" v-if="post.tags">
                                    <span class="badge rounded-pill badge-danger m-1 p-2" v-for="tag in post.tags"
                                        :key="tag.id">{{
                                            tag.tag }}</span>
                                </div>

                                <div>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="description">

                        <h4>ဇာတ်လမ်းအကျဉ်း</h4>
                        <hr>
                        <p class="align-item-center">{{ post.description }}</p>
                    </div>

                </div>
            </div>
            <div v-show="!isLoad" class="container chapter-list-container">
                <h2>Chapters</h2>
                <div v-if="isAuthenticated">
                    <v-btn v-if="uid.id === puid && userHasPermisssions === 'AUTHOR'" class="add-chapter-btn p-2"
                        @click="createChapter">အခန်းသစ်ထည့်သွင်းရန်</v-btn>
                </div>

                <!-- <ChapterDialog class="elevation-2 dialog" v-model="dialog" @close-dialog="dialog = false" /> -->
                <hr>
                <div v-if="this.chapterList.length == 0" class="chapter-none">
                    <h3>အခန်းသစ်များမရှိပါ</h3>
                </div>
                <v-expansion-panels v-if="this.chapterList.length > 0">
                    <v-expansion-panel v-for="(chapterList, season) in groupChaptersByVol" :key="season">
                        <v-expansion-panel-title>
                            {{ season }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <div class="row col-12">
                                <h6 class="col-4 text-center">Season/Chapter</h6>
                                <h6 class="col-4 text-center">Title</h6>
                                <h6 class="col-4 text-center">Release Date</h6>
                            </div>
                            <!-- Your list of items goes here -->
                            <div>
                                <v-list>
                                    <v-list-item v-for="chapter in chapterList" :key="chapter.id" class="list-item"
                                        @click="this.$router.push({ name: 'ChapterDetailPage', params: { cid: chapter.id } })">
                                        <v-list-item-content>

                                            <div class="row col-12">
                                                <v-list-item-title class="col-4 text-center pt-3">{{ chapter.season
                                                }} {{ chapter.chapter_no }}</v-list-item-title>
                                                <p class="col-4 text-center pt-3">{{ chapter.title }}</p>
                                                <p class="col-4 text-center pt-3">{{ dateTime(chapter.published_date) }}</p>
                                            </div>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </div>

                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- Add more panels as needed -->

                </v-expansion-panels>

            </div>
        </MasterLayout>

    </div>
</template>

<script>
import MasterLayout from '../Layout/Master.vue'
import LoaderComponent from '../Component/Loader.vue'
// import ChapterDialog from '../Component/ChapterDialog.vue'
import axios from 'axios'

import moment from 'moment';

export default {
    name: "PostDetail",
    components: {
        MasterLayout,
        LoaderComponent,
        // ChapterDialog
    },
    data() {
        return {

            isLoad: true,
            post: {},
            isAuthenticated: false,
            userHasPermisssions: null,
            chapterList: [],
            uid: {},
            dialog: false,
            pid: this.$route.params.pid,
            puid: 0,
            puname: '',
            sameUser: false
        };
    },
    methods: {
        dateTime(value) {
            return moment(value).format("DD-MM-YYYY")
        },
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        GetPostDetail() {

            const id = this.$route.params.pid
            axios.get(`posts/detail/${id}/`).then((result) => {
                this.post = result.data["data"]
                this.isLoad = false
                this.puid = this.post.author.id
                this.puname = this.post.author.username
                console.log('post Created', this.post.author.username)
            }).catch((err) => {
                alert("The post was not found!")
                console.log(err)
            });
        },
        getChapters() {
            const pid = this.$route.params.pid
            axios.get(`posts/${pid}/chapters/`).then((res) => {

                const chapters = res.data["data"]
                this.chapterList = chapters
            }).catch((err) => {
                console.error(err)
            })
        },
        createChapter() {
            const pid = this.$route.params.pid
            this.$router.push({ name: 'ChapterCreate', params: { id: pid } });
        },
        getCurrentUser() {
            this.uid = this.$store.getters.userData
            console.log("user get")
        },
        checkedSameUser() {
            if (this.uid !== undefined && this.puid !== 0) {
                if (this.uid.id === this.puid) {
                    this.sameUser = true;
                }
                this.sameUser = false;
            }
            this.sameUser = false;

        }

    },
    computed: {

        getAuthenticated() {
            return this.$store.getters.isAuthenticated;
        },
        getPermissions() {
            const permissions = this.$store.getters.userPermissions
            console.log("Current permisssion", permissions)
            return permissions;
        },


        groupChaptersByVol() {
            const groupedChapters = {};
            for (const chapter of this.chapterList) {
                if (!groupedChapters[chapter.season]) {
                    groupedChapters[chapter.season] = [];
                }
                groupedChapters[chapter.season].push(chapter)
            }
            return groupedChapters;
        },
        areUserEqual() {
            return this.uid.id === this.puid
        }

    },
    created() {
        this.GetPostDetail()
        this.getChapters()
        this.getCurrentUser()
        this.isAuthenticated = this.getAuthenticated
        this.userHasPermisssions = this.getPermissions
        this.sameUser = this.areUserEqual

    },
    watch: {
        uid: 'checkedSameUser',
        puid: 'checkedSameUser'
    },
    mounted() {
    }
}
</script>

<style scoped>
.post-detail-page {
    background-color: #fafafa;
    box-shadow: 4px 2px #dddcdc;
    border-radius: 20px;
    padding: 20px;
    max-width: 900px;
    margin-top: 20px;
}

.chapter-list-container {
    background-color: #fafafa;
    box-shadow: 4px 2px #dddcdc;
    border-radius: 15px;
    padding: 20px;
    max-width: 900px;
    margin-top: 15px;
}

.tag {
    width: 250px;

}

.add-chapter-btn {
    border-radius: 5px;
    background-color: aqua;
    padding: 10px;
    box-shadow: 2px solid #ddf4fd;
}

.add-chapter-btn:hover {
    border-radius: 5px;
    background-color: rgb(7, 196, 196);
    padding: 10px;
    box-shadow: 2px solid #ddf4fd;
}

v-list {
    max-height: 300px;
    overflow: scroll;
}

.list-item {
    border: 1px solid #585858;
    border-radius: 10px;


}

@media only screen and (max-width:600px) {
    .post-detail-page {
        background-color: #ddf4fd;
        box-shadow: 4px 2px #dddcdc;
        border-radius: 20px;
        padding: 20px;
        margin-top: 20px;
    }
}
</style>