const { defaultTheme } = require("@vuepress/theme-default")
const { viteBundler } = require("vuepress")
const { registerComponentsPlugin } = require("@vuepress/plugin-register-components")
const { path } = require("@vuepress/utils")

module.exports = {
  lang: "ko",
  title: "Think deep, make simple",
  description: "Front-end 개발자 블로그",
  head: [["link", { rel: "icon", href: "/images/logo-apeach.png" }]],
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],
  bundler: viteBundler({
    vuePluginOptions: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "center",
        },
      },
    },
  }),
  theme: defaultTheme({
    logo: "/images/logo-apeach.png",
    navbar: [
      {
        text: "JS",
        link: "/JS/",
      },
      {
        text: "TS",
        link: "/TS/",
      },
      {
        text: "VUE",
        link: "/VUE/",
      },
      {
        text: "DB",
        link: "/DB/",
      },
      {
        text: "ETC",
        link: "/ETC/",
      },
      {
        text: "Daily",
        link: "/Daily/",
      },
      {
        text: "Info",
        children: [
          { text: "AbelPark", link: "/Info/abelpark.md" },
          { text: "github", link: "https://github.com/AbelPark" },
        ],
      },
    ],
    sidebar: {
      "/JS/": [
        {
          children: [
            "/JS/",
            {
              text: "sample",
              children: ["/JS/fuctional/sample.md"],
            },
          ],
        },
      ],
      "/TS/": [
        {
          children: [
            "/TS/",
            {
              text: "sample",
              children: ["/TS/fuctional/sample.md"],
            },
          ],
        },
      ],
      "/VUE/": [
        {
          children: [
            "/VUE/",
            {
              text: "vue-router",
              children: ["/VUE/vue-router/vue-router-is.md", "/VUE/vue-router/vue-router-navigation.md"],
            },
            {
              text: "vuex",
              children: ["/VUE/vuex/vuex-is.md", "/VUE/vuex/vuex-mutation.md"],
            },
            {
              text: "vuepress",
              children: ["/VUE/vuepress/vuepress-init.md"],
            },
          ],
        },
      ],
      "/DB/": [
        {
          children: [
            "/DB/",
            {
              text: "sample",
              children: ["/DB/fuctional/sample.md"],
            },
          ],
        },
      ],
      "/ETC/": [
        {
          children: [
            "/ETC/",
            {
              text: "git",
              children: ["/ETC/git/commit-conventtion.md", "/ETC/git/multiple-account.md"],
            },
            {
              text: "markdown",
              children: ["/ETC/markdown/markdown-syntax.md"],
            },
          ],
        },
      ],
      "/Daily/": [
        {
          children: [
            "/Daily/",
            {
              text: "2021년",
              children: ["/Daily/2021/12.md"],
            },
          ],
        },
      ],
    },
  }),
}
