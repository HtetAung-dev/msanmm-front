<template>
    <div class="post-detail-section">
        <MasterLayout>
            <div v-show="isEdit" class="card" style="border-radius: 15px;">
                <div class="card-body">
                    <form @submit.prevent="submitUpdate">
                        <div>

                            <h2 class="text-dark mb-4 text-bold">လက်ရှိစာစဉ်အားပြင်ဆင်ရန်</h2>
                            <hr class="mx-n3">
                            <div class="mb-4 d-flex justify-content-center">
                                <img v-if="tempImageUrl == null"
                                    src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg" alt="imgae placeholder"
                                    style="width: 200px; height: 200px;" />
                                <img v-else :src="tempImageUrl" alt="imgae placeholder"
                                    style="width: 200px;height: 200px;" />
                            </div>
                            <div class="d-flex justify-content-center">
                                <div class="btn btn-primary btn-rounded">
                                    <label class="form-label text-white m-1" for="post_image">Choose
                                        file</label>
                                    <input type="file" class="form-control d-none" ref="imageInput"
                                        @change="handleFileUpload" id="post_image" />
                                </div>
                            </div>
                        </div>

                        <div class="row align-items-center pt-4 pb-3">
                            <div class="col-md-3 ps-5">

                                <h6 class="mb-0">စာစဉ်ခေါင်းစဉ်</h6>

                            </div>
                            <div class="col-md-9 pe-5">

                                <input v-model="title" type="text" class="form-control form-control-lg" />

                            </div>
                        </div>

                        <hr class="mx-n3">

                        <div class="row align-items-center pt-4 pb-3">
                            <div class="col-md-3 ps-5">

                                <h6 class="mb-0">ဘာသာပြန်သူ</h6>

                            </div>
                            <div class="col-md-9 pe-5">

                                <input v-model="translator" type="text" class="form-control form-control-lg" />

                            </div>
                        </div>


                        <hr class="mx-n3">

                        <div class="row align-items-center py-3">
                            <div class="col-md-3 ps-5">

                                <h6 class="mb-0">Status</h6>

                            </div>
                            <div class="col-md-9 pe-5">

                                <div class="mb-4 pb-2 radio-custom-group">
                                    <div class="radio-btn">
                                        <label>
                                            <input v-model="status" type="radio" name="ONGOING" value="ONGOING">
                                            <span>ONGOING</span>
                                        </label>

                                        <label>
                                            <input v-model="status" type="radio" name="COMPLETED" value="COMPLETED">
                                            <span>COMPLETED</span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <hr class="mx-n3">

                        <div class="row align-items-center pt-4 pb-3">
                            <div class="col-md-3 ps-5">

                                <h6 class="mb-0">ဘာသာစကား</h6>

                            </div>
                            <div class="col-md-3 pe-5">

                                <input v-model="language" type="text" class="form-control form-control-lg" />

                            </div>

                            <div class="col-md-2 ps-3">

                                <h6 class="mb-0">မူရင်းရေးသားသူ</h6>

                            </div>
                            <div class="col-md-4 pe-5">

                                <input v-model="origin_author" type="text" class="form-control form-control-lg" />

                            </div>
                        </div>

                        <hr class="mx-n3">

                        <div class="row align-items-center py-3">
                            <div class="col-md-3 ps-5">

                                <h6 class="mb-0">ဇာတ်လမ်းအညွှန်း</h6>

                            </div>
                            <div class="col-md-9 pe-5">

                                <textarea v-model="description" class="form-control" rows="10"
                                    placeholder="ဇာတ်လမ်းအညွှန်းရေးသားရန်"></textarea>
                            </div>
                        </div>

                        <hr class="mx-n3">


                        <hr class="mx-n3">
                        <div class="row">
                            <div class="px-5 py-4">
                                <button type="submit" class="btn btn-primary btn-lg">Create Post</button>
                            </div>
                            <div class="px-5 py-4">
                                <button type="button" @click.prevent="editModeOff()"
                                    class="btn btn-primary btn-lg">Cancel</button>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
            <div v-show="!isEdit">


                <LoaderComponent v-show="isLoad" />
                <div v-show="!isLoad" class="post-detail-page container card">
                    <div class="columns is-multiline">
                        <button v-if="uid.id === puid && userHasPermisssions === 'AUTHOR' && isAuthenticated" type="button"
                            class="btn btn-white btn-floating float-end" @click.prevent="editModeOn">
                            <i class="far fa-pen-to-square"></i>
                        </button>
                        <div class="row">

                            <img v-bind:src="post.post_img" style="width: 300px;height: 300px;"
                                class="figure-img img-fluid rounded shadow-3 mb-3 col-md-4" alt="post image">
                            <div class="col-md-6">
                                <h2 class="title mb-4">{{ post.title }}</h2><span
                                    class="badge rounded-pill badge-danger post-status p-2" data-mdb-toggle="tooltip"
                                    data-mdb-placement="top" title="This serires is completed."><i
                                        class="fas fa-face-grin-hearts"></i> {{
                                            post.status }}</span>
                                <div class="detail">

                                    <div v-if="post.translator !== null" class="row col-12  m-1 p-1">
                                        <span class="col-4 p-1">ဘာသာပြန်သူ</span> <span class="col-6 p-1">: {{
                                            post.translator }}</span>
                                    </div>


                                    <div class="row m-1 p-1">
                                        <span class="col-4 p-1">ဘာသာစကား</span> <span class="col-6 p-1">: {{
                                            post.language }}</span>
                                    </div>
                                    <div v-if="post.origin_author !== null" class="row m-1 p-1">
                                        <span class="col-4 p-1">မူရင်းရေးသူ</span> <span class="col-6 p-1">: {{
                                            post.origin_author }}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="description">

                            <h4>ဇာတ်လမ်းအကျဉ်း</h4>
                            <hr>
                            <p class="align-item-center text-justify post-description" @click="toggleDescription"
                                :class="{ 'text-overflow-handle': showless }">{{ post.description }} </p><span
                                class="text-caption text-info" v-show="showless"> click above to see more</span>
                        </div>

                    </div>
                </div>
                <div v-show="!isLoad" class="container chapter-list-container">
                    <h2>Chapters</h2>
                    <div v-if="isAuthenticated">
                        <v-btn v-if="uid.id === puid && userHasPermisssions === 'AUTHOR'" class="add-chapter-btn p-2"
                            @click="createChapter">အခန်းသစ်ထည့်သွင်းရန်</v-btn>
                    </div>
                    <hr>
                    <LoaderComponent v-show="isFinished" />
                    <div v-if="this.chapterList.length == 0 && isFinished === false" class="chapter-none">
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
                                            @click="this.$router.push({ name: 'HChapterDetail', params: { id: chapter.id } })">
                                            <v-list-item-content>

                                                <div class="row col-12">
                                                    <v-list-item-title class="col-4 text-center pt-3 text-caption"><v-icon
                                                            v-if="chapter.access == true">mdi-lock</v-icon>{{
                                                                chapter.season
                                                            }} {{ chapter.chapter_no }}</v-list-item-title>
                                                    <p class="col-4 text-center pt-3 text-caption"> {{ chapter.title
                                                    }}
                                                    </p>
                                                    <p class="col-4 text-center pt-3 text-caption">{{
                                                        dateTime(chapter.published_date) }}</p>
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

            showless: true,
            isLoad: true,
            isFinished: true,
            post: {},
            isAuthenticated: false,
            userHasPermisssions: null,
            chapterList: [],
            uid: {},
            dialog: false,
            pid: this.$route.params.pid,
            puid: 0,
            puname: '',
            translator: '',
            sameUser: false,
            isEdit: false,
            editData: {},
            selectedFile: null,
            uploadedImageUrl: null,
            post_img: null,
            tempImageUrl: 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg',
        };
    },
    methods: {
        async submitUpdate() {
            const pk = this.editData.id
            const formData = new FormData()
            formData.append('title', this.editData.title)
            formData.append('author', this.editData.author)
            formData.append('translator', this.editData.translator)
            if (this.$refs.imageInput.files[0] !== null) {
                formData.append('post_img', this.$refs.imageInput.files[0])
            }

            formData.append('origin_author', this.editData.origin_author)
            formData.append('language', this.editData.language)
            formData.append('categories', this.editCategoryName)
            formData.append('status', this.editData.status)
            formData.append('description', this.editData.description)
            for (const tag of this.editTags) {
                formData.append('tags', tag)
            }
            await axios.put(`posts/edit/${pk}`, formData, { headers: { 'Content-Type': 'multipart/form-data ' } }).then((result) => {
                console.log('Post created: ', result.data)
                this.editModeOff();
                this.GetPostDetail()
            }).catch((err) => {
                console.error("error editing this post :", err)
            });




        },
        editModeOn() {
            this.isEdit = true
            this.editData = Object.assign({}, this.post)
        },
        editModeOff() {
            this.isEdit = false
            this.editData = {}
        },
        toggleDescription() {
            this.showless = !this.showless
        },
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

            const id = this.$route.params.hid
            axios.get(`horrors/detail/${id}/`).then((result) => {
                this.post = result.data["data"]
                this.isLoad = false
                this.puid = this.post.author.id
                console.log('post user id', this.puid)
                this.puname = this.post.author.username
                this.translator = this.post.translator
                console.log('post Created', this.post.author.username)
            }).catch((err) => {
                alert("The post was not found!")
                console.log(err)
            });
        },
        getChapters() {
            const pid = this.$route.params.hid
            axios.get(`horrors/${pid}/chapters/`).then((res) => {

                const chapters = res.data["data"]
                this.chapterList = chapters
                this.isFinished = false;

            }).catch((err) => {

                this.isFinished = false;
                console.error(err)

            })
        },
        createChapter() {
            const pid = this.$route.params.hid
            this.$router.push({ name: 'HChapterCreate', params: { id: pid } });
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

        },
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];

            if (this.selectedFile) {
                const reader = new FileReader();
                reader.onload = event => {
                    this.tempImageUrl = event.target.result;
                };
                reader.readAsDataURL(this.selectedFile);
            } else {
                this.tempImageUrl = null;
            }
        },
        chapterDetail(chapter) {
            if (!chapter.access) {
                this.$router.push({ name: 'ChapterDetailPage', params: { cid: chapter.id } })
            }
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
.post-detail-section {
    background-color: hsl(219, 100%, 31%);
    background-image: radial-gradient(650px circle at 0% 0%,
            hsl(218, 41%, 35%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
            hsl(218, 41%, 45%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%);

}

.post-detail-page {
    background-color: #ffffff;
    border-radius: 20px;
    padding: 20px;
    max-width: 900px;
    margin-top: 20px;
}

.text-overflow-handle {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.post-description {
    line-height: 2rem;
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
    width: 450px;

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

.input {
    max-width: 100px;
    border: none;
    outline: none;
    background: none;
    font-size: 12px;
    color: #555;
    padding: 15px 5px 10px 20px;
    box-shadow: inset 8px 8px 8px #cecece,
        inset -8px -8px 8px #f0f0f0;
    border-radius: 25px;
}

.input::placeholder {
    color: #313131;
    transition: all 0.3s ease;
}

.input:focus::placeholder {
    color: #999;
}

@media only screen and (max-width:600px) {
    .post-detail-page {
        background-color: #ddf4fd;
        box-shadow: 4px 2px #dddcdc;
        border-radius: 20px;
        padding: 20px;
        margin-top: 20px;
    }

    .tag {
        width: 200px;
    }

    .add-genre {
        border: 2px solid #24b4fb;
        background-color: #24b4fb;
        border-radius: 0.9em;
        padding: 0.8em 1.2em 0.8em 1em;
        transition: all ease-in-out 0.2s;
        font-size: 12px;
    }

    .add-genre .add-genre-sp {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 600;
    }

    .add-genre:hover {
        background-color: #0071e2;
    }
}
</style>