import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../Page/Home.vue";
import AboutPage from "../Page/About.vue";
import CartPage from "../Page/Cart.vue";
import ProductPage from "../Page/Product.vue";
import PostPage from "../Page/Post.vue";
import PostDetailPage from "../Page/PostDetail.vue";
import PostCreatePage from "../Page/PostCreate.vue";
import CategoryPage from "../AdminPage/Category.vue";
import ChapterCreatePage from "../Page/ChapterCreate.vue";
import ProfilePage from "../Auth/Profile.vue";
import ChapterDetailPage from "../Page/ChapterDetail.vue";
import store from "@/store";

// Admin Page and components
import LoginPage from "../Auth/Login.vue";
import AdminPage from "../Auth/Admin.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/about",
    name: "AboutPage",
    component: AboutPage,
  },
  {
    path: "/products",
    name: "ProductPage",
    component: ProductPage,
  },
  {
    path: "/cart",
    name: "CartPage",
    component: CartPage,
  },
  {
    path: "/posts",
    name: "PostPage",
    component: PostPage,
  },
  {
    path: "/post/:pid",
    name: "PostDetail",
    component: PostDetailPage,
  },
  {
    path: "/post/:id/create-chapter",
    name: "ChapterCreate",
    component: ChapterCreatePage,
  },
  {
    path: "/post/new",
    name: "PostCreate",
    component: PostCreatePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/admin",
    name: "AdminPage",
    component: AdminPage,
  },
  {
    path: "/admin/category",
    name: "CategoryPage",
    component: CategoryPage,
  },
  {
    path: "/user/:id/profile",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/chapter/:cid",
    name: "ChapterDetailPage",
    component: ChapterDetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  // Check if the user is logged in
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    next("/login"); // Redirect to the login page
    alert("Require Login to author account!!");
  } else {
    next();
  }
});

export default router;
