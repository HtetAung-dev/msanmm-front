<template>
    <div>
        <MasterLayout>
            <LoaderComponent v-show="!isLoad" />
            <div v-show="isLoad" class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card p-3 m-3">
                            <div class="card-header">
                                Product Name
                            </div>
                            <div class="card-body">
                                <img src="https://s.alicdn.com/@sc04/kf/H7d3a8c1540cf4ee58827661e21fa29b8m.jpg_300x300.jpg"
                                    width="100%" alt="card img">
                            </div>
                            <div class="card-footer">
                                <span>Price: <small>$100</small></span>
                                <a href="" class="btn btn-sm btn-dark float-end">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card p-3 m-3">
                            <div class="card-header">
                                Product Name
                            </div>
                            <div class="card-body">
                                <img src="https://s.alicdn.com/@sc04/kf/H7d3a8c1540cf4ee58827661e21fa29b8m.jpg_300x300.jpg"
                                    width="100%" alt="card img">
                            </div>
                            <div class="card-footer">
                                <span>Price: <small>$100</small></span>
                                <a href="" class="btn btn-sm btn-dark float-end">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card p-3 m-3">
                            <div class="card-header">
                                Product Name
                            </div>
                            <div class="card-body">
                                <img src="https://s.alicdn.com/@sc04/kf/H7d3a8c1540cf4ee58827661e21fa29b8m.jpg_300x300.jpg"
                                    width="100%" alt="card img">
                            </div>
                            <div class="card-footer">
                                <span>Price: <small>$100</small></span>
                                <a href="" class="btn btn-sm btn-dark float-end">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card p-3 m-3">
                            <div class="card-header">
                                Product Name
                            </div>
                            <div class="card-body">
                                <img src="https://s.alicdn.com/@sc04/kf/H7d3a8c1540cf4ee58827661e21fa29b8m.jpg_300x300.jpg"
                                    width="100%" alt="card img">
                            </div>
                            <div class="card-footer">
                                <span>Price: <small>$100</small></span>
                                <a href="" class="btn btn-sm btn-dark float-end">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card p-3 m-3">
                            <div class="card-header">
                                Product Name
                            </div>
                            <div class="card-body">
                                <img src="https://s.alicdn.com/@sc04/kf/H7d3a8c1540cf4ee58827661e21fa29b8m.jpg_300x300.jpg"
                                    width="100%" alt="card img">
                            </div>
                            <div class="card-footer">
                                <span>Price: <small>$100</small></span>
                                <a href="" class="btn btn-sm btn-dark float-end">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card p-3 m-3">
                            <div class="card-header">
                                Product Name
                            </div>
                            <div class="card-body">
                                <img src="https://s.alicdn.com/@sc04/kf/H7d3a8c1540cf4ee58827661e21fa29b8m.jpg_300x300.jpg"
                                    width="100%" alt="card img">
                            </div>
                            <div class="card-footer">
                                <span>Price: <small>$100</small></span>
                                <a href="" class="btn btn-sm btn-dark float-end">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card p-3 m-3">
                            <div class="card-header">
                                Product Name
                            </div>
                            <div class="card-body">
                                <img src="https://s.alicdn.com/@sc04/kf/H7d3a8c1540cf4ee58827661e21fa29b8m.jpg_300x300.jpg"
                                    width="100%" alt="card img">
                            </div>
                            <div class="card-footer">
                                <span>Price: <small>$100</small></span>
                                <a href="" class="btn btn-sm btn-dark float-end">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card p-3 m-3">
                            <div class="card-header">
                                Product Name
                            </div>
                            <div class="card-body">
                                <img src="https://s.alicdn.com/@sc04/kf/H7d3a8c1540cf4ee58827661e21fa29b8m.jpg_300x300.jpg"
                                    width="100%" alt="card img">
                            </div>
                            <div class="card-footer">
                                <span>Price: <small>$100</small></span>
                                <a href="" class="btn btn-sm btn-dark float-end">Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    </div>
</template>
<script>
import MasterLayout from '../Layout/Master.vue';
import LoaderComponent from '../Component/Loader.vue';
import axios from 'axios';
export default {
    components: {
        MasterLayout,
        LoaderComponent,
    },
    name: "ProductPage",
    data() {
        return {
            isLoad: true,
            tags: []
        };

    },
    created() {
        axios.get('http://127.0.0.1:8000/posts/all').then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        });
        console.log('created');
    }
}
</script>