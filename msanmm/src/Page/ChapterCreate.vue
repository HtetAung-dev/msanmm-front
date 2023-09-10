<template>
    <div>
        <MasterLayout>
            <div class="container chapter-create-section rounded-shaped">
                <p class="text-caption pa-4 text-danger">*စာစဉ်အကြောင်းအရာများဖြည့်သွင်းရာတွင် အောက်ပါကွက်လပ်များအား
                    တစ်ခုမကျန်ဖြည့်သွင်းရန်လိုအပ်ပါသည်။</p>
                <v-form v-model="valid" @submit.prevent="createChapter">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-textarea v-model="title" rows="3" outlined dense class="scrollable-textarea"
                                    :rules="titleRules" label="အခန်းခေါင်းစဉ်" variant="solo-filled"></v-textarea>
                                <v-text-field class="pt-4" v-model="season" :rules="seasonRules" :counter="10"
                                    label="Season" variant="solo-filled"></v-text-field>
                                <v-text-field v-model="chapterNo" class="pt-4" :rules="chnoRules" :counter="10"
                                    label="အခန်းအမှတ်စဉ်" variant="solo-filled"></v-text-field>

                                <v-switch v-model="chapterAccess" color="red" @change="setFreeAccess" inset></v-switch>
                                <p class="text-danger text-caption">{{ this.chapterStatus }}</p>



                                <v-slider v-if="chapterAccess" v-model="price" class="align-center pt-3" :max="maxPrice"
                                    :min="minPrice">
                                    <template v-slot:append>
                                        <v-text-field v-model="price" single-line density="compact" type="number"
                                            style="width: 90px"></v-text-field>
                                    </template>
                                </v-slider>
                            </v-col>
                            <v-col cols="12" md="8">
                                <v-textarea outlined dense rows="15" class="scrollable-textarea" :rules="bodyRules"
                                    label="စာစဉ်အကြောင်းအရာ" v-model="body" variant="solo-filled"></v-textarea>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col cols="4" md="2">
                                <v-btn type="button" width="100px" color="warning">ပယ်ဖျက်မည်</v-btn>
                            </v-col>
                            <v-col cols="4" md="2">
                                <v-btn type="submit" width="100px" color="info">သိမ်းမည်</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </div>
        </MasterLayout>
    </div>
</template>
<script>
import MasterLayout from '../Layout/Master.vue'
import axios from 'axios'

export default {
    name: "ChapterCreate",
    components: {
        MasterLayout
    },
    data() {
        return {
            title: '',
            body: '',
            season: '',
            chapterNo: '',
            chapterAccess: false,
            access: null,
            yes: 'Free ဖတ်ရှုခွင့် ပြုမည်',
            no: 'Free ဖတ်ရှုခွင့် မပြုပါ! အောက်တွင် ဈေးနှုန်းသတ်မှတ်ပေးပါ။',
            minPrice: 0,
            maxPrice: 200,
            price: 0,
            chapterStatus: "",
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
        getAuthenticated() {
            return this.$store.getters.isAuthenticated;

        },

        getCurrentUser() {
            return this.$store.getters.userData;
        },
        setFreeAccess() {
            if (this.chapterAccess) {
                this.chapterStatus = this.no
            }
            else {
                this.chapterStatus = this.yes
            }
        },
        async createChapter() {

            const formData = new FormData();
            formData.append('post', this.$route.params.id)
            formData.append('season', this.season)
            formData.append('chapter_no', this.chapterNo)
            formData.append('title', this.title)
            formData.append('body', this.body)
            formData.append('access', this.chapterAccess)
            formData.append('price', this.price)
            // post: this.$route.params.id,
            // season: this.season,
            // chapter_no: this.chapterNo,
            // title: this.title,
            // body: this.body,
            // access: this.chapterAccess,
            // price: this.price
            try {
                const res = await axios.post("posts/chapters/create/", formData, { headers: { 'Content-Type': 'multipart/form-data ' } });
                console.log("chapter created", res)
                this.$router.push({ name: 'PostDetail', params: { pid: this.$route.params.id } })
            } catch (error) {
                console.error("chapter creation failed!", error)
            }


        }

    },
    computed() {

    },
    created() {
        this.setFreeAccess()
    },
}
</script>
<style scoped>
.chapter-create-section {
    background-color: #fff;
    border-radius: 10px;
    margin-top: 20px;
}
</style>
