module.exports = {
  lang: "ko-KR",
  title: "Hello, VuePress!",
  description: "This is my first VuePress site",
  head: [["link", { rel: "icon", href: "/images/logo-apeach.png" }]],
  themeConfig: {
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
          { text: "Toy Project", children: [{ text: "휴대폰분실보호", link: "https://admin.mfinder.co.kr:10004/" }] },
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
              link: "/JS/fuctional/sample.md",
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
              link: "/TS/fuctional/sample.md",
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
              link: "/VUE/vue-router/vue-router-is.md",
              children: ["/VUE/vue-router/vue-router-is.md", "/VUE/vue-router/vue-router-navigation.md"],
            },
            {
              text: "vuex",
              link: "/VUE/vuex/vuex-is.md",
              children: ["/VUE/vuex/vuex-is.md", "/VUE/vuex/vuex-mutation.md"],
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
              link: "/DB/fuctional/sample.md",
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
              text: "sample",
              link: "/ETC/fuctional/sample.md",
              children: ["/ETC/fuctional/sample.md"],
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
              link: "/Daily/2021/12.md",
              children: ["/Daily/2021/12.md"],
            },
          ],
        },
      ],
    },
  },
}
