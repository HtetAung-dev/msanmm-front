<template>
    <div>
        <MasterLayout>
            <Loader v-show="!isLoad"></Loader>
            <div v-show="isLoad" class="mt-5">
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

                    <v-card-text class="m-5 text-justify ">
                        <p class="chapter-body">{{ chapter.body }}</p>
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
            parentPost: {},
            chapterAccess: false,
            chapterStatus: '',
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
        getChapterDetail() {
            const id = this.$route.params.cid;
            console.log('chapter id', id)
            axios.get(`posts/chapter/${id}/`).then((result) => {
                console.log("data chapter", result.data["data"])
                this.chapter = result.data["data"]
                this.isLoad = true

                this.getChapterParentPost()
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
            axios.get(`posts/detail/${id}`).then((result) => {
                this.parentPost = result.data["data"]
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

            await axios.put(`posts/chapter/edit/${pk}/`, formData, { headers: { 'Content-Type': 'multipart/form-data ' } }).then((result) => {
                console.log("udpated Data", result)
                this.isEdit = false
                this.getChapterDetail()
            }).catch((err) => {
                alert("update error")
                console.error("error while updating", err)
            });
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
        }
    },
    created() {
        this.getChapterDetail()

        this.isAuthenticated = this.getAuthentication
        this.userHasPermission = this.getPermissions
        this.userData = this.getUserData
    }, watch: {
        userData: 'checkedSameUser',
        puid: 'checkedSameUser'
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
</style>