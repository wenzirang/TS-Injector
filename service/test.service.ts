import { HttpService } from "./http";
import { Inject } from "../Injector/inject";
import { Injectable } from "../Injector/injectable";

@Injectable()
export class TestService {
    @Inject() private http: HttpService
    constructor(
    ) {

    }

    /**
     * 获取直播数据
     */
    getLiveList() {
        return this.http.getData(`http://www.test.com/LiveProadcast/GetData`, {})
    }
    /**
     * 修改直播数据
     * @param item 
     */
    updateLive(item) {
        return this.http.updateData(`http://www.test.com/LiveProadcast/UpdateData?`, item);
    }
} 