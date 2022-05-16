<template>
  <div class="wrapper-taglist">
    <button @click="setCategory" class="classify-button">분류</button>
    <div v-for="(keys, keyIdx) in pages" :key="keyIdx">
      <h2>{{ keys[0] }}</h2>
      <div class="tag-menu" v-for="(values, valueIdx) in pages.get(keys[0])" :key="valueIdx">
        <router-link :to="values.path">{{ values.meta.title }}</router-link>
        <span
          class="category"
          :class="{
            green: values.meta.category === '이론',
            orange: values.meta.category === '기술',
            blue: values.meta.category === '방법론',
          }"
          >{{ values.meta.category }}</span
        >
        <span v-for="(tag, tagIdx) in values.meta.tags" :key="tagIdx" class="category tags">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
  props: {
    category: {
      type: String,
      defulat: "",
    },
  },
  setup(props) {
    const isTag = ref(false)
    const pages: any = ref()
    const groupBy = (list, keyGetter) => {
      const map = new Map()
      list.forEach((item) => {
        const key = keyGetter(item)
        if (!map.has(key)) {
          map.set(key, [item])
        } else {
          map.get(key).push(item)
        }
      })
      return map
    }
    const items = ref([])
    const router = useRouter()
    router.options.routes.forEach((route) => {
      if (route.meta) {
        if (route.meta.tags) {
          if (route.path.indexOf(props.category) === 0) {
            items.value.push({ name: route.name, path: route.path, meta: route.meta })
          }
        }
      }
    })

    const setCategory = () => {
      isTag.value = !isTag.value
      isTag.value
        ? (pages.value = groupBy(items.value, (obj) => obj.path.split("/")[1]))
        : (pages.value = groupBy(items.value, (obj) => obj.meta.category))
    }
    setCategory()

    return {
      pages,
      setCategory,
    }
  },
})
</script>

<style scoped>
.category {
  color: #ffffff;
  border-radius: 7px;
  padding: 1px 6px;
  font-weight: 500;
  margin: 0 4px;
  font-size: 14px;
}
.tags {
  background-color: #3aa675;
  color: white;
}
.tag-menu {
  line-height: 2;
  font-size: 18px;
}
.green {
  background-color: rgb(148, 34, 34);
}
.blue {
  background-color: rgb(17, 64, 127);
}
.orange {
  background-color: rgb(239, 127, 53);
}
.classify-button {
  margin-left: auto;
  display: block;
  font-size: 18px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #3aa675;
  border: none;
  border-radius: 4px;
}
</style>
