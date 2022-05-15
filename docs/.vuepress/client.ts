import { defineClientConfig, resolvers } from "@vuepress/client"
import TagList from "./components/TagList.vue"

export default defineClientConfig({
  enhance({ app }) {
    app.component("TagList", TagList)
    resolvers.resolvePageHeadTitle = (page, siteLocale) => `${siteLocale.title} > ${page.title}`
  },
})
