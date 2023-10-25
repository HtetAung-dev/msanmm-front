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
                            <form @submit.prevent="register">
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

                                <!-- Username input -->
                                <div>
                                    <label class="input-label" for="registerUsername">Username</label>
                                    <input class="txt-input" type="text" maxlength="40" v-model="username"
                                        id="registerUsername" title="Username is invalid" required />
                                </div>

                                <!-- Email input -->
                                <div>
                                    <label class="input-label" for="registerEmail">Email</label>
                                    <input class="txt-input" v-model="email" type="email" id="registerEmail"
                                        pattern="[a-zA-Z][0-9]\/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
                                        title="Email is invalid" required />
                                </div>

                                <!-- Password input -->
                                <div>
                                    <label class="input-label" for="registerPassword">Password</label>
                                    <input class="txt-input" type="password" minlength="8" v-model="password"
                                        id="registerPassword" title="Please enter at least 8 characters" required />
                                </div>

                                <!-- Repeat Password input -->
                                <div>
                                    <label class="input-label" for="registerRepeatPassword">Confirm Password</label>
                                    <input class="txt-input" type="password" minlength="8"
                                        title="Please enter the same password again" v-model="confirmPassword"
                                        id="registerConfirmPassword" required />
                                </div>

                                <!-- Checkbox -->
                                <div class="form-check d-flex justify-content-center">
                                    <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck"
                                        required aria-describedby="registerCheckHelpText" />
                                    <label class="form-check-label" for="registerCheck">
                                        I have read and agree to the terms
                                    </label>
                                </div>

                                <!-- Submit button -->
                                <button type="submit" class="login-btn">Register</button>
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

import axios from 'axios';
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
            confirmPassword: '',
            userType: 'READER',
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
            console.log(success)
            if (success) {
                console.log("success login")
                this.permission = this.$store.getters.userPermissions
                if (this.permission === "EDITOR") {
                    this.$router.push('/admin')
                } else if (this.permission === "AUTHOR") {
                    const user = this.$store.getters.userData;
                    this.$router.push({ name: 'ProfilePage', params: { id: user.id } })
                }
                else {
                    this.$router.push('/')
                }


            }

        },
        async register() {
            if (this.password === this.confirmPassword) {
                try {

                    const success = await axios.post('auth/signup/',
                        {
                            email: this.email,
                            username: this.username,
                            password: this.password,
                            type: this.userType

                        });
                    if (success) {
                        console.log(success)

                    }

                } catch (err) {
                    console.error("failed to register user!", err)
                }
            } else {
                alert('passwords didn\'t match!');
            }


        }
    }
}
</script>
<style scoped>
.background-radial-gradient {
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

.login-container {
    width: 400px;
    min-height: 600px;
    padding: 40px;
    margin: 30px auto;
    border-radius: 10px;
    color: #fffefe;
    box-shadow:
        0.3em 0.3em 1em rgba(29, 130, 224, 0.573);
}


.bg-glass {
    /* background-color: hsla(0, 0%, 100%, 0.9) !important; */
    backdrop-filter: saturate(200%) blur(40px);
}

.input-label {
    color: #e6e2e2;
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
    border: 1px solid #f6f3f3;
    color: #ffffff;
    border-radius: 10px;

}


.txt-input:invalid {
    border: 1px solid #ff0000;
}

.txt-input:focus:invalid {
    border: 1px solid #f6f3f3;
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
    background: #02133d;
    box-shadow: 1px #a8a7a7;
}
</style>