<template>
    <div class="main">
        <div class="main-content">
            <div class="markdown-body" ref="content" id="content" v-html="compiledMarkdown">
            </div>
        </div> 
        <div v-if="menu_seen" class="menu">
            <md-aside :mode="mode" :str="str"/>
        </div>
    </div>
</template>

<script>
// 相关内容获取
import mdAside from "@/components/md_menu.vue";
// markdown内容信息解析
import marked from 'marked';
// For axios
import axios from 'axios/dist/axios.min';

let rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});
// markdown内容读取


export default {
  data() {
    return {
      mode: "raw_js_demo", 
      str: '', 
      menu_seen: true
    }
  }, 
  props: {
      md_name: {
          type: String
      }
  }, 
  mounted() {
    this.readMarkdown();
  }, 
  // 在计算属性中，处理md的h1、h2，加上id值，并使用marked转成html
  computed: {
      compiledMarkdown: function() {
          let index = 0;
          rendererMD.heading = function(text, level) {
              if (level < 3) {
                  return `<h${level} id="${index++}" class="jump" >${text}</h${level}>`;
              } else {
                  return `<h${level}>${text}</h${level}>`;
              }
          };
          return marked(this.str);
      }
  }, 
  name: 'App',
  components: {
    mdAside
  }, 
  methods: {
    readMarkdown: function() {
    // 获取进程中的变量信息
    var _this=this;
    // axios实现异步请求以获取get命令后的返回结果
    // http://localhost/api/str_markdown_query.php
    axios.get('http://pmglab.top/kggsee/api/str_markdown_query.php', {
      params:{
        fileName:this.md_name
      }
    })  // 获取返回结果后进行处理
        .then(function (response) {
            // 获取结果
            _this.str = response.data
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
}
</script>

<style lang="less" scoped>
.main {
    width: 100%;
    background: #FCFCFC;
}
.content {
    margin-right: 200px;
} 
.main-content {
    height: 100%;
    margin-right: 220px;
    color: #5c5c5c;
    word-wrap: break-word;
    border: 1px solid #dedede;
    background-color: #fff;
    padding: 20px 30px;
}
.menu {
    height: 100%;
    width: 200px;
    z-index: 2;
    position: fixed;
    right: 10px;
    top: 85px;
}
</style>
