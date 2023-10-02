<template>
    <div>
        <MasterLayout>
            <section class="background-radial-gradient overflow-hidden">
                <div class="login-container bg-glass">
                    <!-- Pills navs -->
                    <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                                aria-controls="pills-login" aria-selected="true">Login</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                                aria-controls="pills-register" aria-selected="false">Register</a>
                        </li>
                    </ul>
                    <!-- Pills navs -->

                    <!-- Pills content -->
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                            <form @submit.prevent="signin">
                                <div class="text-center mb-3">
                                    <p>Sign in with:</p>
                                    <button type="button" class="btn btn-link btn-floating mx-1">
                                        <i class="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" class="btn btn-link btn-floating mx-1">
                                        <i class="fab fa-google"></i>
                                    </button>

                                    <button type="button" class="btn btn-link btn-floating mx-1">
                                        <i class="fab fa-twitter"></i>
                                    </button>

                                    <button type="button" class="btn btn-link btn-floating mx-1">
                                        <i class="fab fa-github"></i>
                                    </button>
                                </div>

                                <p class="text-center">or:</p>
                                <!-- Email input -->
                                <div>
                                    <label class="input-label" for="loginEmail">Email</label>
                                    <input v-model="email" class="txt-input" type="email" id="loginEmail" />
                                </div>

                                <!-- Password input -->
                                <div>
                                    <label class="input-label" for="loginPassword">Password</label>
                                    <input v-model="password" class="txt-input" type="password" id="loginPassword" />
                                </div>

                                <!-- 2 column grid layout -->
                                <div class="row login-footer">
                                    <div class="col-md-6 d-flex justify-content-center">
                                        <!-- Checkbox -->
                                        <div>
                                            <input type="checkbox" value="" id="loginCheck" checked />
                                            <label for="loginCheck"> Remember me </label>
                                        </div>
                                    </div>

                                    <div class="col-md-6 d-flex justify-content-center">
                                        <!-- Simple link -->
                                        <a href="#!">Forgot password?</a>
                                    </div>
                                </div>

                                <!-- Submit button -->
                                <button type="submit" class="login-btn btn-block">Sign in</button>

                                <!-- Register buttons -->
                                <div class="text-center">
                                    <p>Not a member? <a href="#!">Register</a></p>
                                </div>
                            </form>
                        </div>
                        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                            <form>
                                <div class="text-center mb-3">
                                    <p>Sign up with:</p>
                                    <button type="button" class="btn btn-link btn-floating mx-1">
                                        <i class="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" class="btn btn-link btn-floating mx-1">
                                        <i class="fab fa-google"></i>
                                    </button>

                                    <button type="button" class="btn btn-link btn-floating mx-1">
                                        <i class="fab fa-twitter"></i>
                                    </button>

                                    <button type="button" class="btn btn-link btn-floating mx-1">
                                        <i class="fab fa-github"></i>
                                    </button>
                                </div>

                                <p class="text-center">or:</p>

                                <!-- Name input -->
                                <div>
                                    <label class="input-label" for="form12">Example label</label>
                                    <input class="txt-input" type="text" id="form12" />

                                </div>

                                <!-- Username input -->
                                <div>
                                    <label class="input-label" for="registerUsername">Username</label>
                                    <input class="txt-input" type="text" id="registerUsername" />
                                </div>

                                <!-- Email input -->
                                <div>
                                    <label class="input-label" for="registerEmail">Email</label>
                                    <input class="txt-input" type="email" id="registerEmail" />
                                </div>

                                <!-- Password input -->
                                <div>
                                    <label class="input-label" for="registerPassword">Password</label>
                                    <input class="txt-input" type="password" id="registerPassword" />
                                </div>

                                <!-- Repeat Password input -->
                                <div>
                                    <label class="input-label" for="registerRepeatPassword">Repeat password</label>
                                    <input class="txt-input" type="password" id="registerRepeatPassword" />
                                </div>

                                <!-- Checkbox -->
                                <div class="form-check d-flex justify-content-center">
                                    <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                                        aria-describedby="registerCheckHelpText" />
                                    <label class="form-check-label" for="registerCheck">
                                        I have read and agree to the terms
                                    </label>
                                </div>

                                <!-- Submit button -->
                                <button type="submit" class="login-btn">Sign in</button>
                            </form>
                        </div>
                    </div>
                    <!-- Pills content -->
                </div>
            </section>
        </MasterLayout>
    </div>
</template>
<script>

import MasterLayout from '../Layout/Master.vue'
import { useStore } from 'vuex'

export default {
    name: "LoginPage",
    components: {
        MasterLayout
    },
    data() {
        return {
            email: '',
            password: '',
            token: '',
            store: useStore,
            permission: ''
        };
    },
    methods: {
        async signin() {
            const success = await this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            });

            if (success) {
                this.permission = this.$store.getters.userPermissions
                if (this.permission == "EDITOR") {
                    this.$router.push('/admin')
                } else if (this.permission == "AUTHOR") {
                    const user = this.$store.getters.userData;
                    this.$router.push({ name: 'ProfilePage', params: { id: user.id } })
                }
                else {
                    this.$router.push('/')
                }


            }

        }
    }
}
</script>
<style scoped>
.background-radial-gradient {
    background-color: hsl(218, 41%, 15%);
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

.login-container {
    width: 500px;
    min-height: 600px;
    padding: 40px;
    margin: 30px auto;
    border-radius: 10px;
}


.bg-glass {
    background-color: hsla(0, 0%, 100%, 0.9) !important;
    backdrop-filter: saturate(200%) blur(25px);
}

.input-label {
    color: #585858;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1;
}

.txt-input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #a8a7a7;
    color: #555;
    border-radius: 10px;

}

.login-footer {
    margin-top: 10px;
}

.login-btn {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 1.3em 3em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
}

.login-btn:hover {
    background-color: #23c483;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
}

.login-btn:active {
    transform: translateY(-1px);
}

.btn {
    background: #fffefe;
    box-shadow: 1px #a8a7a7;
}
</style>