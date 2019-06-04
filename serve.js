// 导入http内置模块
const http = require("http");
// 解析URL地址 拿到 parthname query
const urlModule = require("url");

// 创建一个http内置服务器
const server = http.createServer();
// 监听http服务器的request请求
server.on("request", function(req, res) {
  // write your code here...
  const { parthname: url, query } = urlModule.parse(req.url, true);
  res.end(url);
  if (url === "/getScript") {
    var data = {
      name: "sss",
      age: 18,
      gender: "girl"
    };
    var scriptStr = `${query.callback}(${JSON.stringify(data)})`;
    res.end(scriptStr);
  } else {
    res.end("404");
  }
});
// 指定端口号并启动服务器监听
server.listen(3000, function() {
  console.log("server listen at http://127.0.0.1:3000");
});
