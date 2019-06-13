// 定义一个全局的过滤器msgFormat
Vue.filter("msgFormat", function(msg, arg) {
  // replace方法  第一个参数可以传正则
  return msg.replace(/傻狗/g, arg);
});
Vue.filter("dataFormat", function(msg) {
  // ES6字符串新方法：String.prototype.padStart(maxlength,fillString) 或者
  // String.prototype.padEnd(maxlength,fillString)
  var dt = new Date(msg);
  var y = dt.getFullYear();
  var m = (dt.getMonth() + 1).toString().padStart(2, "0");
  var d = dt
    .getDate()
    .toString()
    .padStart(2, "0");
  var hh = dt
    .getHours()
    .toString()
    .padStart(2, "0");
  var mm = dt
    .getMinutes()
    .toString()
    .padStart(2, "0");
  var ss = dt
    .getSeconds()
    .toString()
    .padStart(2, "0");

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

// 自定义全局按键修饰符
Vue.config.keyCodes.f2 = 113;

// 定义全局的指令v-focus 钩子函数
Vue.directive("focus", {
  bind: function(el) {
    //每当指令绑定到元素  执行 只一次
  },
  inserted: function(el) {
    // 元素插入到DOM中 执行一次
    el.focus();
  },
  updated: function() {
    // VNODE更新 执行 可能会触发多次
  }
});
// 钩子函数参数
Vue.directive("color", {
  bind: function(el, binding) {
    el.style.color = binding.value;
  },
  inserted: function(el) {},
  updated: function(el) {}
});

// 自定义组建
var commentBox = {
  // 模版只能有唯一的根元素
  template: "#temp",
  data() {
    return {
      user: "",
      content: ""
    };
  },
  methods: {
    postComment() {
      var comment = { id: Date.now(), user: this.user, content: this.content };
      var list = JSON.parse(localStorage.getItem("cmts") || "[]");
      list.unshift(comment);
      localStorage.setItem("cmts", JSON.stringify(list));
      this.user = "";
      this.content = "";
      this.$emit("func");
    }
  }
};

Vue.component("login", {
  template: "<h3>这个是登陆组建</h3>"
});
Vue.component("register", {
  template: "<h3>这个是注册组建</h3>"
});

var vm = new Vue({
  el: "#app",
  data: {
    msg: "何宁傻狗，傻狗何宁。",
    msg22: "父组建的值",
    comName: "login",
    setIntervalName: null,
    flagBall: false,
    flagH3: false,
    flagH32: false,
    n1: 0,
    n2: 0,
    result: 0,
    opt: "+",
    list1: {
      key: "name",
      key2: "name2",
      key3: "name3"
    },
    list2: [
      { id: 1, name: "a", ctime: new Date() },
      { id: 2, name: "as", ctime: new Date() },
      { id: 3, name: "asdf", ctime: new Date() },
      { id: 4, name: "ww", ctime: new Date() },
      { id: 5, name: "ee", ctime: new Date() },
      { id: 6, name: "ew", ctime: new Date() }
    ],
    list3: [
      { id: Date.now(), user: "a", content: "aaa" },
      { id: Date.now(), user: "b", content: "bbb" },
      { id: Date.now(), user: "c", content: "ccc" }
    ],
    tableId: "",
    tableName: "",
    tableSearch: "",
    guolv: "傻狗2",
    guolvtext: "何宁是傻狗，傻狗是何宁"
  },
  filters: {
    //私有的过滤器
  },
  directives: {
    // 基于Vue.directive自定义的指令，内部字母不能大写，要将JasonNiu改为Jasonniuk
    fontweight: {
      bind: function(el, bbb) {
        el.style.fontWeight = bbb.value;
      }
    }
  },
  components: {
    "cmt-box": commentBox
  },
  methods: {
    // 跑马灯
    go() {
      if (this.setIntervalName !== null) return;
      this.setIntervalName = setInterval(() => {
        var start = this.msg.substring(0, 1);
        var end = this.msg.substring(1);
        this.msg = end + start;
      }, 100);
    },
    // 跑马灯停止
    stop() {
      clearInterval(this.setIntervalName);
      this.setIntervalName = null;
    },
    // 计算按钮
    calc() {
      // switch (this.opt) {
      //     case '+': this.result = parseInt(this.n1) + parseInt(this.n2);
      //         break;
      //     case '-': this.result = parseInt(this.n1) - parseInt(this.n2);
      //         break;
      //     case '*': this.result = parseInt(this.n1) * parseInt(this.n2);
      //         break;
      //     case '/': this.result = parseInt(this.n1) /  parseInt(this.n2);
      //         break;
      // }

      var codeStr = " parseInt(this.n1) " + this.opt + "parseInt(this.n2)";
      this.result = eval(codeStr);
    },
    // 表单相关  添加按钮
    addTable() {
      var car = { id: this.tableId, name: this.tableName, ctime: new Date() };
      this.list2.push(car);
      this.tableId = this.tableName = "";
    },
    tableDel(id) {
      // some方法
      // this.list2.some((item, i) => {
      //     if (item.id === id) {
      //         this.list2.splice(i, 1)
      //         // some该方法中 如果return true  就会终止这个数组的后续循环
      //         return true
      //     }
      // })

      // findIndex方法
      var index = this.list2.findIndex(item => {
        if (item.id == id) {
          return true;
        }
      });
      this.list2.splice(index, 1);
    },
    searchList2(tableSearch) {
      // some forEach filter findIndex  都属于数组新方法  都会被数组每一项进行遍历
      // var newList = []
      // this.list2.forEach(item => {
      //     if (item.name.indexOf(tableSearch) !== -1) {
      //         newList.push(item);
      //     }
      // });
      // return newList

      return this.list2.filter(item => {
        // ES6中 为字符串提供了新的方法 String.prototype.includes('要包含的字符串')
        // 返回 true 否则 false (jquery:contains   $(':contains(text)') )
        if (item.name.includes(tableSearch)) {
          return item;
        }
      });
    },
    getInfo() {
      // 封装好了promise
      this.$http
        .post("http://vue.studyit.io/api/getlunbo", {}, { emulateJSON: true })
        .then(result => {
          console.log(result);
        });
    },
    // 小球的运动
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transform = "translate(50px,150px)";
      el.style.transition = "all 2s ease";
      done();
    },
    afterEnter(el) {
      this.flagBall = !this.flagBall;
    },
    loadComments() {
      console.log("emmmm");
      var list = JSON.parse(localStorage.getItem("cmts") || "[]");
      this.list3 = list;
    }
  },
  beforeCreate() {
    //第一个钩子函数 实例完全被创建出来之前 执行
  },
  created() {
    //第2个钩子函数 创建的时候
  },
  beforeMount() {
    //第3个钩子函数 模版在内存中编译完成  但尚未渲染
  },
  mounted() {
    //第4个钩子函数 模版渲染 页面挂载
    this.loadComments();
  },
  beforeUpdate() {
    //第5个钩子函数 界面没有被更新 数据已更新
  },
  updated() {
    //第6个钩子函数 界面被更新
  },
  beforeDestroy() {
    //第7个钩子函数 销毁之前
  },
  Destroyed() {
    //第8个钩子函数 销毁完毕
  }
});
