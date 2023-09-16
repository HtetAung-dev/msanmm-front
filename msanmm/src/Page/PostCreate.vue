<template>
    <div>
        <MasterLayout>
            <section class="vh-150 p-1" style="background-color: #2779e2;">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-xl-9">



                            <div class="card" style="border-radius: 15px;">
                                <div class="card-body">
                                    <form @submit.prevent="submitCreate">
                                        <div>

                                            <h2 class="text-dark mb-4 text-bold">စာစဉ်အသစ်တင်ရန်</h2>
                                            <hr class="mx-n3">
                                            <div class="mb-4 d-flex justify-content-center">
                                                <img v-if="tempImageUrl == null"
                                                    src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                                                    alt="imgae placeholder" style="width: 200px; height: 200px;" />
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

                                                <input v-model="translator" type="text"
                                                    class="form-control form-control-lg" />

                                            </div>
                                        </div>

                                        <hr class="mx-n3">

                                        <div class="row align-items-center py-3">
                                            <div class="col-md-3 ps-5">

                                                <h6 class="mb-0">စာစဉ်အမျိုးအစား</h6>

                                            </div>
                                            <div class="col-md-9 pe-5">

                                                <div class="mb-4 pb-2 radio-custom-group">
                                                    <div class="radio-btn">
                                                        <label v-for="category in categoriesList" :key="category.id">
                                                            <input v-model="categories" type="radio" name="{{category.id}}"
                                                                :value="category.id">
                                                            <span>{{ category.category_name }}</span>
                                                        </label>
                                                    </div>
                                                </div>

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
                                                            <input v-model="status" type="radio" name="ONGOING"
                                                                value="ONGOING">
                                                            <span>ONGOING</span>
                                                        </label>

                                                        <label>
                                                            <input v-model="status" type="radio" name="COMPLETED"
                                                                value="COMPLETED">
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

                                                <input v-model="language" type="text"
                                                    class="form-control form-control-lg" />

                                            </div>

                                            <div class="col-md-2 ps-3">

                                                <h6 class="mb-0">မူရင်းရေးသားသူ</h6>

                                            </div>
                                            <div class="col-md-4 pe-5">

                                                <input v-model="origin_author" type="text"
                                                    class="form-control form-control-lg" />

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


                                        <div class="row align-items-center py-3">
                                            <div class="col-md-3 ps-5">
                                                <h6 class="mb-0">Genres</h6>
                                            </div>
                                            <div class="col-md-9 pe-5">

                                                <div v-for="tag in tagsList" :key="tag.id"
                                                    class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="{{ tag.id }}"
                                                        v-model="tags" :value="tag.id" />
                                                    <label class="form-check-label" for="{{ tag.id }}">{{ tag.tag }}</label>
                                                </div>
                                                <div>
                                                    <input placeholder="Add genre" v-model="newTag" type="text" name="text"
                                                        class="input">
                                                    <button class="add-genre" @click.prevent="addNewTag">
                                                        <span class="add-genre-sp">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"
                                                                width="10" height="10">
                                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                                <path fill="currentColor"
                                                                    d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z">
                                                                </path>
                                                            </svg> Create
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                        <hr class="mx-n3">

                                        <div class="px-5 py-4">
                                            <button type="submit" class="btn btn-primary btn-lg">Create Post</button>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </MasterLayout>
    </div>
</template>

<script>
import MasterLayout from "../Layout/Master.vue"
import axios from 'axios'
export default {
    name: "PostCreate",
    components: {
        MasterLayout,
    },
    data() {
        return {
            categoriesList: [],
            isReady: false,
            tagsList: [],
            newTag: '',
            selectedFile: null,
            uploadedImageUrl: null,
            post_img: null,
            tempImageUrl: null,
            type: null,
            tags: [],
            language: '',
            origin_author: '',
            title: '',
            description: '',
            categories: '',
            status: '',
            translator: ''
        }
    },
    created() {
        this.getCategories();
        this.getTagsList();

    },
    methods: {
        async submitCreate() {

            const formData = new FormData()
            formData.append('title', this.title)
            formData.append('translator', this.translator)
            formData.append('post_img', this.$refs.imageInput.files[0])
            formData.append('origin_author', this.origin_author)
            formData.append('language', this.language)
            formData.append('categories', this.categories)
            formData.append('status', this.status)
            formData.append('description', this.description)
            for (const tag of this.tags) {
                formData.append('tags', tag)
            }


            // const data = {
            //     title: this.title,
            //     post_img: this.tempImageUrl,
            //     origin_author: this.origin_author,
            //     language: this.language,
            //     categories: this.categories,
            //     description: this.description,
            //     tags: this.tags

            // };
            //console.log("data: ", JSON.stringify(data));
            //console.log("image file ", data.post_img)
            try {
                const response = await axios.post('posts/post/', formData, { headers: { 'Content-Type': 'multipart/form-data ' } });

                console.log('Post created: ', response.data)
                this.$router.push({ name: 'PostDetail', params: { pid: response.data["id"] } })
            } catch (error) {
                console.error('Error creating post', error)
            }

        }, handleFileUpload(event) {
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
        getCategories() {
            axios.get('posts/categories/').then((result) => {
                this.categoriesList = result.data["data"];
            }).catch((err) => {
                console.log(err)
                alert("can't found categories\n" + err)
            });


        },
        getTagsList() {
            axios.get('posts/tag/').then((result) => {
                this.tagsList = result.data["data"];
            }).catch((err) => {
                console.log(err)
                alert("can't found tags\n" + err)
            });
        },
        addNewTag() {
            axios.post('posts/tag/', { "tag": this.newTag }).then((res) => {
                this.getTagsList();
                console.log(res.data)
            }).catch((err) => {
                console.log("error creating new Tag", err)
                alert("can't create tags")
            })
        }

    },

}

</script>

<style scoped>
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
</style>