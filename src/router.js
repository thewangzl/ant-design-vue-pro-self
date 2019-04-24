import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "./views/404";

Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register")
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout*/ "./layouts/BasicLayout"),
      children: [
        //dashboard
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              component: () =>
                import(/* webpackChunkName */ "./views/Dashboard/Analysis")
            }
          ]
        },
        {
          path: "/form",
          name: "form",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/form",
              redirect: "/form/basic-form"
            },
            {
              path: "/form/basic-form",
              name: "basicForm",
              component: () =>
                import(/* webpackChunkName */ "./views/Forms/BasicForm")
            },
            {
              path: "/form/step-form",
              name: "stepForm",
              component: () =>
                import(/* webpackChunkName */ "./views/Forms/StepForm"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName */ "./views/Forms/StepForm/Step1")
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(/* webpackChunkName */ "./views/Forms/StepForm/Step2")
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(/* webpackChunkName */ "./views/Forms/StepForm/Step3.vue")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "404",
      component: NotFound
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

//路由守卫，在路由跳转时执行
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
