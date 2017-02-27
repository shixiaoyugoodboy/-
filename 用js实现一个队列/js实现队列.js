/**
 * Created by shixiaoyu on 17/2/26.
 */
function Queue() {
    var items = [];
    //队尾添加元素
    this.add = function (element) {
        items.push(element);
    };
    //删除队首元素，并返回他
    this.dequeue = function () {
        return items.shift();
    };
    //返回队列的第一个元素
    this.first = function () {
        return items[0];
    };
    //判断队列是否为空
    this.isEmpty = function () {
        return items.length == 0;
    };
    //清空队列
    this.clear = function () {
        items = [];
    };
    //返回队列长度
    this.size = function () {
        return items.length;
    };
    //打印
    this.print = function() {
        console.log(items.toString())
    }
};
//用队列这种数据结构解决一些问题，生活中我们经常遇到一种情况，医院的(急诊科)候诊室。
//医生会优先处理病情比较严重的患者。通常,护士会鉴别分类,根据患者病情的严重程度放号。
//我们要实现一个优先队列，代码如下：
function PriorityQueue() {
    var items = [];
    function QueEle(ele, priority){ //封装我们的元素为一个对象
        this.ele = ele; //元素
        this.priority = priority; //优先级
    }
    this.enqueue = function (ele, priority) {
        var queObj = new QueEle(ele, priority); //创建队列元素对象
        if(this.isEmpty()){ //如果队列是空的，直接插入
            items.push(queObj);
        }else{
            var bAdded = false;
            for(var i = 0, len = items.length; i < len; i++){
                if(priority < items[i].priority){
                    items.splice(i, 0, queObj); // 循环队列，如果优先级小于这个位置元素的优先级，插入
                    bAdded = true;
                    break;
                }
            }
            if(!bAdded){
                items.push(queObj); // 如果循环一圈都没有找到能插队的位置，直接插入队列尾部
            }
        }
    };
    this.dequeue = function () {
        return items.shift();
    };
    this.first = function () {
        return items[0];
    };
    this.isEmpty = function () {
        return items.length === 0;
    };
    this.size = function () {
        return items.length;
    };
    this.clear = function () {
        items = [];
    };
    this.print = function () {
        var temp = [];
        for(var i = 0, len = items.length; i < len; i++){
            temp.push(items[i].ele);
        }
        console.log(temp.toString());
    };
}

var pQueue = new PriorityQueue();
//    优先级一样
pQueue.enqueue('小王', 3);
pQueue.enqueue('小明', 3);
pQueue.enqueue('小红', 3);
console.log("原队列:");
pQueue.print();
//    优先级不一样
pQueue.enqueue('小李vip', 2);
pQueue.enqueue('小史超级vip', 1);
console.log("新队列:");
pQueue.print();
//还有一个更好玩的是循环队列，来模拟一下击鼓传花吧
function hotPotato (nameList, num){
    var queue = new Queue();
    for (var i=0; i<nameList.length; i++){
        queue.add(nameList[i]);
    }
    var eliminated = '';
    while (queue.size() > 1){
        for (var i=0; i<num; i++){
            queue.add(queue.dequeue()); // {3}
        }
        eliminated = queue.dequeue();// {4}
        console.log(eliminated + '在击鼓传花游戏中被淘汰。');
    }
    return queue.dequeue();// {5}
}
var names = ['小王','小李','小明','小红','小白'];
var winner = hotPotato(names, 7);
console.log('胜利者:' + winner);
