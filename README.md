# vue-cli4

## 下载项目依赖 （得进入目录）
yarn install

### 启动项目
yarn serve

### 打包编译
yarn build

### vuex
vuex 页面的刷新会初始化vuex 一般数据会被清空 vuex仅仅是传参 并不是数据持久化！
第一种  一些死值如 某些字典项、下拉框几乎每个页面都一样的值（校区下拉） 放到sessitionStorage中一份 在vuex中的getter中使用 方法去 sessition中取值
       看着就像是vuex中的数据不会清除一样的假象 
第二种  常用的会变的 一般在 切换路由的时候重新 设置vuex中的值 如某些路由 虽然在vuex中取值 是因为每次路由改变
       vuex中的数据都会重新算一遍重新存好 
第三种（感觉这个才是vuex的本质） 页面刷新vuex中的数据丢失却不用管的 比如某些操作需要上一步的某一个值 
                              这样刷新页面后上一步也得重新选择 也就会重新触发设置vuex 所以不用管
svg 图标只用设置宽或者高中的一个 他们说等比缩放的 不能设置宽是50% 高是40%（都设置了也没用 他只会按照最低的取值）
    <span>
      微信<icon name="wx" :w="40"></icon>
    </span>
    <span class="wx" title="用css设置图标为40px">
      微信<icon name="wx"></icon>
    </span>
       .wx svg{
              width:100px
       }