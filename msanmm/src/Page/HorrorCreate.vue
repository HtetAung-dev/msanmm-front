<template>
    <div>
        <MasterLayout>
            <section class="vh-150 p-1 horror-section">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-xl-9">



                            <div class="card" style="border-radius: 15px;">
                                <div class="card-body">
                                    <form @submit.prevent="submitCreate">
                                        <div>

                                            <h2 class="text-dark mb-4 text-bold">ညမဖတ်ရစာပေများတင်ရန်</h2>
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
    name: "HorrorCreatePage",
    components: {
        MasterLayout,
    },
    data() {
        return {
            isReady: false,
            selectedFile: null,
            uploadedImageUrl: null,
            post_img: null,
            tempImageUrl: null,
            type: null,
            language: '',
            origin_author: '',
            title: '',
            description: '',
            status: '',
            translator: ''
        }
    },
    created() {

    },
    methods: {
        async submitCreate() {

            const formData = new FormData()
            formData.append('title', this.title)
            formData.append('translator', this.translator)
            formData.append('post_img', this.$refs.imageInput.files[0])
            formData.append('origin_author', this.origin_author)
            formData.append('language', this.language)
            formData.append('status', this.status)
            formData.append('description', this.description)

            try {
                console.log(axios.defaults.headers.common['Authorization'])
                const response = await axios.post('horrors/horror/', formData, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': this.$store.state.token } });

                console.log('Post created: ', response.data)
                this.$router.push({ name: 'HorrorDetail', params: { hid: response.data["id"] } })
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
    },

}

</script>

<style scoped>
.horror-section {
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
</style>