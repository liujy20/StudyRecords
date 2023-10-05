// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/StudyRecords/12vue3/vue3-demo/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/StudyRecords/12vue3/vue3-demo/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import AutoImport from "file:///C:/StudyRecords/12vue3/vue3-demo/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/StudyRecords/12vue3/vue3-demo/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/StudyRecords/12vue3/vue3-demo/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "C:\\StudyRecords\\12vue3\\vue3-demo";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        eslintrc: {
          enabled: false,
          // 是否自动生成 eslint 规则，建议生成之后设置 false
          filepath: "./.eslintrc-auto-import.json"
          // 指定自动导入函数 eslint 规则的文件
        },
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"),
        // 指定自动导入函数TS类型声明文件路径
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dirs: ["src/components", "src/views"],
        dts: path.resolve(pathSrc, "types", "components.d.ts"),
        // 指定自动导入组件TS类型声明文件路径
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        //define global scss variable
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVER_PATH,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(new RegExp("^" + env.VITE_APP_BASE_API), "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxTdHVkeVJlY29yZHNcXFxcMTJ2dWUzXFxcXHZ1ZTMtZGVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcU3R1ZHlSZWNvcmRzXFxcXDEydnVlM1xcXFx2dWUzLWRlbW9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1N0dWR5UmVjb3Jkcy8xMnZ1ZTMvdnVlMy1kZW1vL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgQ29uZmlnRW52LCBVc2VyQ29uZmlnLCBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG4vL1x1OTE0RFx1N0Y2RVx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmNvbnN0IHBhdGhTcmMgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKTtcblxuLy9cdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTYzRDJcdTRFRjZcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuLy8gZWxlbWVudFVJXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XG4gIC8vXHU4M0I3XHU1M0Q2XHU1MjMwZW52XHVGRjBDZW52XHU4M0I3XHU1M0Q2XHU1QjlBXHU0RTQ5XHU1M0Q4XHU5MUNGXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IFZ1ZSBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFyZWYsIHJlYWN0aXZlLCB0b1JlZiBcdTdCNDlcbiAgICAgICAgaW1wb3J0czogW1widnVlXCJdLFxuICAgICAgICBlc2xpbnRyYzoge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTAgZXNsaW50IFx1ODlDNFx1NTIxOVx1RkYwQ1x1NUVGQVx1OEJBRVx1NzUxRlx1NjIxMFx1NEU0Qlx1NTQwRVx1OEJCRVx1N0Y2RSBmYWxzZVxuICAgICAgICAgIGZpbGVwYXRoOiBcIi4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25cIiwgLy8gXHU2MzA3XHU1QjlBXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU1MUZEXHU2NTcwIGVzbGludCBcdTg5QzRcdTUyMTlcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICAgICAgfSxcbiAgICAgICAgZHRzOiBwYXRoLnJlc29sdmUocGF0aFNyYywgXCJ0eXBlc1wiLCBcImF1dG8taW1wb3J0cy5kLnRzXCIpLCAvLyBcdTYzMDdcdTVCOUFcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTUxRkRcdTY1NzBUU1x1N0M3Qlx1NTc4Qlx1NThGMFx1NjYwRVx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgfSksXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgZGlyczogW1wic3JjL2NvbXBvbmVudHNcIiwgXCJzcmMvdmlld3NcIl0sXG4gICAgICAgIGR0czogcGF0aC5yZXNvbHZlKHBhdGhTcmMsIFwidHlwZXNcIiwgXCJjb21wb25lbnRzLmQudHNcIiksIC8vIFx1NjMwN1x1NUI5QVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1N0VDNFx1NEVGNlRTXHU3QzdCXHU1NzhCXHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQFwiOiBcIi9zcmNcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIC8vIENTUyBcdTk4ODRcdTU5MDRcdTc0MDZcdTU2NjhcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgLy9kZWZpbmUgZ2xvYmFsIHNjc3MgdmFyaWFibGVcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIkAvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtgLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogTnVtYmVyKGVudi5WSVRFX0FQUF9QT1JUKSxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBwcm94eToge1xuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQVBQX1NFUlZFUl9QQVRILFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT5cbiAgICAgICAgICAgIHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKFwiXlwiICsgZW52LlZJVEVfQVBQX0JBU0VfQVBJKSwgXCJcIiksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFIsU0FBZ0MsY0FBYyxlQUFlO0FBQ3ZWLE9BQU8sU0FBUztBQUVoQixPQUFPLFVBQVU7QUFJakIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFFdkIsU0FBUywyQkFBMkI7QUFWcEMsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBUzdDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUE2QjtBQUUvRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQTtBQUFBLFFBRVQsU0FBUyxDQUFDLEtBQUs7QUFBQSxRQUNmLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQTtBQUFBLFVBQ1QsVUFBVTtBQUFBO0FBQUEsUUFDWjtBQUFBLFFBQ0EsS0FBSyxLQUFLLFFBQVEsU0FBUyxTQUFTLG1CQUFtQjtBQUFBO0FBQUEsUUFDdkQsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDbkMsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsTUFBTSxDQUFDLGtCQUFrQixXQUFXO0FBQUEsUUFDcEMsS0FBSyxLQUFLLFFBQVEsU0FBUyxTQUFTLGlCQUFpQjtBQUFBO0FBQUEsUUFDckQsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDbkMsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUs7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBO0FBQUEsTUFFSCxxQkFBcUI7QUFBQTtBQUFBLFFBRW5CLE1BQU07QUFBQSxVQUNKLG1CQUFtQjtBQUFBLFVBQ25CLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU0sT0FBTyxJQUFJLGFBQWE7QUFBQSxNQUM5QixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxDQUFDLElBQUksaUJBQWlCLEdBQUc7QUFBQSxVQUN2QixRQUFRLElBQUk7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQ0EsVUFDUkEsTUFBSyxRQUFRLElBQUksT0FBTyxNQUFNLElBQUksaUJBQWlCLEdBQUcsRUFBRTtBQUFBLFFBQzVEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
