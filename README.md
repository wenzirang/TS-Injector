## 目录结构

```
├───Injector                     	         # 依赖注入的核心代码          
├───service						             # 使用实例      
```

### 装饰器注解

[^@Injectable()]: 此装饰器用于标识此类为一个可以注入的服务；列子：

```js
export class HttpService{
	constructor(){
        console.log('我是一个已经被装饰标识为一个可以注入的服务了')
	}
    
    // get方法
    public getData(url, params, header?) {
        const option = this.getOption({ params: params }, header)
        return new Promise(function (resolve, reject) {
            axios.get(url, option)
                .then(function (res) {
                    resolve(res.data);
                })
                .catch(function (err) {
                    reject(err.data);
                });
        });
    }
}
```

[^@Inject]: 此装饰器用于标识使用此装饰器的变量 为一个注入到当前类的服务可以直接使用他的实例

```ts
import {Inject} from "./Injector/Inject";
import {HttpService} from './http'
export class TestService{
	// 此处的http变量是已经注入进来的服务了 可以直接使用了
	@Inject private http : HttpService
    constructor(){        
        //使用注入进来的服务
        this.http.getData();
    }
}
```

