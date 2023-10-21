<template>
    <MasterLayout>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-4">
                    <div class="card card-profile mb-4">
                        <div class="card-header"
                            style="background-image: url(https://therichpost.com/wp-content/uploads/2021/05/bootstrap5-carousel-slider-img1.jpg);">
                        </div>
                        <div class="card-body text-center"><img class="card-profile-img"
                                src="https://therichpost.com/wp-content/uploads/2021/03/avatar2.png" alt="Jassa Rich">
                            <h3 class="mb-3">{{ userProfile.username }}</h3>
                            <button class="btn btn-outline-dark btn-sm">Change Profile</button>
                        </div>
                    </div>
                    <v-card class="mb-4">
                        <v-card-title>
                            <h6 class="mt-4"> <v-icon>mdi-cog-box</v-icon>User Setting</h6>
                        </v-card-title>
                        <hr>
                        <v-list :lines="false" density="compact" nav>
                            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="secondary"
                                @click.prevent="this.$router.push({ name: item.page })">
                                <template v-slot:prepend>
                                    <v-icon :icon="item.icon"></v-icon>
                                </template>

                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="logout" color="secondary">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-logout"></v-icon>
                                </template>

                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </div>
                <div class="col-lg-6">
                    <v-card class="slot-card">
                        <router-view></router-view>
                    </v-card>
                </div>
            </div>

        </div>
    </MasterLayout>
</template>
<script>
import axios from 'axios'
import MasterLayout from '../Layout/Master.vue'
export default {
    name: 'ReaderPage',
    components: {
        MasterLayout
    },
    data() {
        return {
            userProfile: {},
            items: [
                { text: 'My Info', icon: 'mdi-information', page: 'Info' },
                { text: 'Account Setting', icon: 'mdi-account-cog', page: 'Setting' },
                { text: 'Buy Coin', icon: 'mdi-cash-plus', page: 'PurchaseCoin' },
                { text: 'Order History', icon: 'mdi-file-clock', page: 'OrderHistory' },
            ],
        }
    },
    methods: {
        getUserDetail() {
            const id = this.$route.params.id
            axios.get(`auth/${id}/detail`).then((res) => {
                this.userProfile = res.data['data']
            })
        },
        async logout() {
            this.$store.dispatch('logout')
            this.$router.push('/')
        }
    },
    created() {
        this.getUserDetail();
    }
}
</script>

<style scoped>
.slot-card {
    min-height: 600px;
}
</style>