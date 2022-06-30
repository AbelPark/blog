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
          isCustomElement: tag => tag === "center",
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
        text: "VUE",
        link: "/VUE/",
      },
      {
        text: "REACT",
        link: "/REACT/",
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
        text: "Info",
        children: [{ text: "github", link: "https://github.com/AbelPark" }],
      },
    ],
    sidebar: {
      "/JS/": [
        {
          children: [
            "/JS/",
            "/JS/execution-context.md",
            "/JS/concept-hoisting.md",
            "/JS/concept-closure.md",
            "/JS/concept-this.md",
            "/JS/concept-scope.md",
            "/JS/var-let-const.md",
          ],
        },
        {
          text: "JS Deep Dive",
          collapsible: true,
          children: [
            "/JS/DeepDive/01-programing.md",
            "/JS/DeepDive/02-javascript.md",
            "/JS/DeepDive/03-runtime.md",
            "/JS/DeepDive/04-variable.md",
            "/JS/DeepDive/05-expression.md",
            "/JS/DeepDive/06-dataType.md",
          ],
        },
      ],
      "/VUE/": [
        {
          children: [
            "/VUE/",
            {
              text: "vuex",
              collapsible: true,
              children: ["/VUE/vuex/insight-branch-api.md", "/VUE/vuex/insight-callback.md"],
            },
            {
              text: "vuepress",
              collapsible: true,
              children: ["/VUE/vuepress/vuepress-init.md"],
            },
          ],
        },
      ],
      "/REACT/": ["/REACT/react-vue.md", "/REACT/react-query.md"],
      "/DB/": [
        {
          children: [
            {
              text: "Mysql",
              collapsible: true,
              children: ["/DB/mysql/control-error.md"],
            },
          ],
        },
      ],
      "/ETC/": [
        {
          children: [
            {
              text: "Git",
              collapsible: true,
              children: ["/ETC/git/commit-conventtion.md", "/ETC/git/multiple-account.md"],
            },
            {
              text: "MAC",
              collapsible: true,
              children: ["/ETC/mac/terminal-command.md"],
            },
            "/ETC/",
            "/ETC/concept-dom.md",
            "/ETC/browser-lander.md",
            "/ETC/bundling-transpile.md",
            "/ETC/concept-oop",
            "/ETC/http-rest.md",
            "/ETC/markdown-syntax.md",
          ],
        },
      ],
    },
  }),
}
