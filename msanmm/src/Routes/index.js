import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
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
import DashboardLayout from "../Layout/Dashboard.vue";

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
  {
    path: "/dashboard",
    name: "DashboardLayout",
    component: DashboardLayout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      router.push({
        path: "/login",
        name: "LoginPage",
      });
    }
  } else {
    next();
  }
});

export default router;
