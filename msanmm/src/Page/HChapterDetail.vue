<template>
    <div>
        <MasterLayout>

            <Loader v-show="!isLoad"></Loader>

            <div v-show="isLoad" class="mt-5">
                <div class="container crumbs my-2">
                    <div class="container p-2 m-2">
                        <router-link :to="{ path: '/' }"><span><v-icon
                                    style="font-size: 18px;">mdi-home</v-icon>Home</span></router-link> >

                        <router-link :to="{ name: 'HorrorDetail', params: { hid: postId } }"><span><v-icon
                                    style="font-size: 18px;">mdi-newspaper-variant-outline</v-icon>{{ parentPost.title
                                    }}</span></router-link>



                    </div>
                </div>


                <v-card v-if="!isEdit" class="container" max-width="1000">

                    <button v-if="this.userData.id === this.puid" type="button" class="btn btn-white btn-floating"
                        @click.prevent="editModeOn">
                        <i class="far fa-pen-to-square"></i>
                    </button>
                    <v-card-item>
                        <v-card-title class="text-center">
                            {{ chapter.title }}
                        </v-card-title>

                        <v-card-subtitle class="text-center">{{ chapter.season }} / {{ chapter.chapter_no
                        }}</v-card-subtitle>
                    </v-card-item>
                    <div class="mx-3 align-items-center" width="1000">
                        <v-btn icon="mdi-format-size" @click="toggleSizing" color="orange"></v-btn>
                        <v-slider v-show="toggle" v-model="fontsize" append-icon="mdi-magnify-plus-outline"
                            prepend-icon="mdi-magnify-minus-outline" @click:append="increaseSize"
                            @click:prepend="decreaseSize"></v-slider>
                    </div>
                    <div class="container m-4">
                        <v-btn v-if="prevChapter > 0"
                            @click="this.$router.push({ name: 'HChapterDetail', params: { id: prevChapter } })"
                            density="default" icon="mdi-skip-previous" color="orange" class="mx-2"></v-btn>
                        <v-btn v-else-if="prevChapter === 0"
                            @click="this.$router.push({ name: 'HChapterDetail', params: { id: prevChapter } })"
                            density="default" icon="mdi-exclamation-thick" color="orange" class="mx-2"></v-btn>

                        <v-btn v-if="nextChapter > 0"
                            @click="this.$router.push({ name: 'HChapterDetail', params: { id: nextChapter } })"
                            density="default" icon="mdi-skip-next" color="orange" class="mx-2"></v-btn>
                        <v-btn v-else-if="nextChapter === 0"
                            @click="this.$router.push({ name: 'HChapterDetail', params: { id: nextChapter } })"
                            density="default" icon="mdi-exclamation-thick" color="orange" class="mx-2"
                            :disabled="true"></v-btn>
                    </div>


                    <v-card-text class="m-5 text-justify ">

                        <p :style="`font-size :${fontsize}px;`" class="chapter-body">{{ chapter.body }}</p>
                    </v-card-text>
                </v-card>
                <div v-if="isEdit" class="container chapter-create-section rounded-shaped">
                    <p class="text-caption pa-4 text-danger">*စာစဉ်အကြောင်းအရာများဖြည့်သွင်းရာတွင် အောက်ပါကွက်လပ်များအား
                        တစ်ခုမကျန်ဖြည့်သွင်းရန်လိုအပ်ပါသည်။</p>
                    <v-form @submit.prevent="updateChapter">
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-textarea v-model="editData.title" rows="3" outlined dense class="scrollable-textarea"
                                        :rules="titleRules" label="အခန်းခေါင်းစဉ်" variant="solo-filled"></v-textarea>
                                    <v-text-field class="pt-4" v-model="editData.season" :rules="seasonRules" :counter="10"
                                        label="Season" variant="solo-filled"></v-text-field>
                                    <v-text-field v-model="editData.chapter_no" class="pt-4" :rules="chnoRules"
                                        :counter="10" label="အခန်းအမှတ်စဉ်" variant="solo-filled"></v-text-field>

                                    <v-switch v-model="editData.access" color="red" @change="setFreeAccess"
                                        inset></v-switch>
                                    <p class="text-danger text-caption">{{ this.chapterStatus }}</p>



                                    <v-slider v-if="editData.access" v-model="editData.price" class="align-center pt-3"
                                        :max="maxPrice" :min="minPrice">
                                        <template v-slot:append>
                                            <v-text-field v-model="editData.price" single-line density="compact"
                                                type="number" style="width: 90px"></v-text-field>
                                        </template>
                                    </v-slider>
                                </v-col>
                                <v-col cols="12" md="8">
                                    <v-textarea outlined dense rows="15" class="scrollable-textarea" :rules="bodyRules"
                                        label="စာစဉ်အကြောင်းအရာ" v-model="editData.body" variant="solo-filled"></v-textarea>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col cols="4" md="2">
                                    <v-btn type="button" width="100px" color="warning"
                                        @click.prevent="editModeOff">ပယ်ဖျက်မည်</v-btn>
                                </v-col>
                                <v-col cols="4" md="2">
                                    <v-btn type="submit" width="100px" color="info">ပြင်မည်</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </div>
            </div>
        </MasterLayout>
    </div>
</template>
<script>
import MasterLayout from '../Layout/Master.vue';
import Loader from '@/Component/Loader.vue';
import axios from 'axios';

export default {
    name: "ChapterDetailPage",
    components: {
        MasterLayout,
        Loader
    },
    data() {
        return {
            yes: 'Free ဖတ်ရှုခွင့် ပြုမည်',
            no: 'Free ဖတ်ရှုခွင့် မပြုပါ! အောက်တွင် ဈေးနှုန်းသတ်မှတ်ပေးပါ။',
            chapter: {},
            isEdit: false,
            isLoad: false,
            isAuthenticated: false,
            userHasPermission: false,
            userData: {},
            editData: {},
            puid: 0,
            id: this.$route.params.id,
            postId: 0,
            parentPost: {},
            chapterAccess: false,
            toggle: false,
            chapterStatus: '',
            prevChapter: 0,
            nextChapter: 0,
            fontsize: 17,
            titleRules: [
                v => {
                    if (v) return true

                    return "အခန်းခေါင်းစဉ်အားထည့်သွင်းရန်လိုအပ်သည်!"
                }
            ],
            seasonRules: [
                v => {
                    if (v) return true

                    return "Season အားထည့်သွင်းရန်လိုအပ်သည်!"
                }
            ],
            chnoRules: [
                v => {
                    if (v) return true

                    return "အခန်းနံပါတ် အားထည့်သွင်းရန်လိုအပ်သည်!"
                }
            ],
            bodyRules: [
                v => {
                    if (v) return true

                    return "စာစဉ်အကြောင်းအရာ အားထည့်သွင်းရန်လိုအပ်သည်!"
                }
            ]
        }
    },
    methods: {
        toggleSizing() {
            this.toggle = !this.toggle;
        },
        increaseSize() {
            this.fontsize += 2;
        },
        decreaseSize() {
            this.fontsize -= 2;
        },
        getChapterDetail(id) {

            console.log('chapter id', id)
            axios.get(`horrors/chapter/${id}/`).then((result) => {
                console.log("data chapter", result.data["data"])
                this.chapter = result.data["data"]
                //const id = this.chapter.id
                this.isLoad = true
                //this.getPrevChapter(id)
                //this.getNextChapter(id)
                console.log("prev chapter", this.prevChapter)
                console.log("next chapter", this.nextChapter)

                this.getChapterParentPost()
            }).catch((err) => {
                alert("Can't find chapter by this id! ERR:", err)
            });

        },
        getPrevChapter() {
            const id = this.id
            console.log('prev id', id)

            axios.get(`horrors/${id}/prev/`).then((result) => {
                console.log("prev chapter", result.data["data"])
                const chapter = result.data["data"]
                if (chapter.post != null) {
                    this.prevChapter = chapter.id
                }

            }).catch((err) => {
                alert("Can't find chapter by this id! ERR:", err)
            });
        },
        getNextChapter() {
            const id = this.id
            console.log('next id', id)
            axios.get(`horrors/${id}/next/`).then((result) => {
                console.log("next chapter", result.data["data"])
                const chapter = result.data["data"]
                if (chapter.post != null) {
                    this.nextChapter = chapter.id
                }


            }).catch((err) => {
                alert("Can't find chapter by this id! ERR:", err)
            });
        },
        setFreeAccess() {
            if (this.editData.access) {
                this.chapterStatus = this.no
            }
            else {
                this.chapterStatus = this.yes
            }
        },
        getChapterParentPost() {
            const id = this.chapter.post;

            console.log("chapter parent", id)
            axios.get(`horrors/detail/${id}/`).then((result) => {
                this.parentPost = result.data["data"]
                this.postId = this.parentPost.id
                this.puid = this.parentPost.author.id
            }).catch((err) => {
                console.error("parent post not found", err)
            });
        },
        checkedSameUser() {
            if (this.userData !== undefined && this.puid !== 0) {
                if (this.userData.id === this.puid) {
                    this.sameUser = true;
                }
                this.sameUser = false;
            }
            this.sameUser = false;

        },
        editModeOn() {
            this.isEdit = true
            this.editData = Object.assign({}, this.chapter)
        },
        editModeOff() {
            this.isEdit = false
            this.editData = {}
        },
        async updateChapter() {
            const pk = this.editData.id
            console.log("chapter id update", pk)
            const formData = new FormData();
            formData.append('post', this.editData.post)
            formData.append('season', this.editData.season)
            formData.append('chapter_no', this.editData.chapter_no)
            formData.append('title', this.editData.title)
            formData.append('body', this.editData.body)
            formData.append('access', this.editData.access)
            formData.append('price', this.editData.price)

            await axios.put(`horrors/chapter/edit/${pk}/`, formData, { headers: { 'Content-Type': 'multipart/form-data ', 'Authorization': `Bearer ${this.$store.state.token}` } }).then((result) => {
                console.log("udpated Data", result)
                this.isEdit = false
                this.getChapterDetail()
            }).catch((err) => {
                alert("update error")
                console.error("error while updating", err)
            });
        },
        loadContent(id) {
            this.id = this.$route.params.id;
            this.getChapterDetail(id);
            this.getPrevChapter();
            this.getNextChapter();
        }
    },
    computed: {

        getAuthentication() {
            return this.$store.getters.isAuthenticated;
        },
        getPermissions() {
            return this.$store.getters.permissions;
        },
        getUserData() {
            return this.$store.getters.userData
        },
        getCurrentParam() {
            return this.$route.params.id
        }
    },
    created() {
        this.getChapterDetail(this.id)
        this.getPrevChapter()
        this.getNextChapter()
        this.isAuthenticated = this.getAuthentication
        this.userHasPermission = this.getPermissions
        this.userData = this.getUserData
    },
    watch: {
        nextChapter: 'getNextChapter',
        prevChapter: 'getPrevChapter',
        userData: 'checkedSameUser',
        puid: 'checkedSameUser',
        $route(to, from) {
            if (to.params.id !== from.params.id) {
                this.loadContent(to.params.id)
            }
        }
    },
}
</script>
<style scoped>
.chapter-create-section {
    background-color: #fff;
    border-radius: 10px;
    margin-top: 20px;
}

.chapter-body {
    line-height: 30px;
}

.crumbs-block {
    max-width: 1000px;
}

.crumbs {
    max-width: 1000px !important;
    height: 50px;
    background-color: #fff;
}
</style>