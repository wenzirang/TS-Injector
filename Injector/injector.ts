/**
 * IOC container
 * 
 * 方法: 填充, 查找, 获取
 *
 * @export
 * @class Injector
 */
export class Injector {
  /**
   *服务映射：使用键值对的方式保存服务
   *
   * @private
   * @type {Map<any, any>}
   * @memberof Injector
   */
  private readonly providerMap: Map<any, any> = new Map();
  /**
   * 实例的映射：用键值对保存实例
   *
   * @private
   * @type {Map<any, any>}
   * @memberof Injector
   */
  private readonly instanceMap: Map<any, any> = new Map();

  /**
   * 保存服务
   *
   * @param {*} key
   * @param {*} value
   * @memberof Injector
   */
  public setProvider(key: any, value: any): void {
    if (!this.providerMap.has(key)) this.providerMap.set(key, value);
  }

  /**
   * 获取保存的服务
   *
   * @param {*} key
   * @returns {*}
   * @memberof Injector
   */
  public getProvider(key: any): any {
    return this.providerMap.get(key);
  }

  /**
   * 保存实例
   *
   * @param {*} key
   * @param {*} value
   * @memberof Injector
   */
  public setInstance(key: any, value: any): void {
    if (!this.instanceMap.has(key)) this.instanceMap.set(key, value);
  }

  /**
   * 获取实例
   *
   * @param {*} key
   * @returns {*}
   * @memberof Injector
   */
  public getInstance(key: any): any {
    if (this.instanceMap.has(key)) {
      return this.instanceMap.get(key);
    } else {
      if (this.getProvider(key)) {
        const providerClass = this.getProvider(key);
        const providerInsntance = new providerClass();
        this.setInstance(key, providerInsntance);
        return providerInsntance; 
      } else {
        console.error(`injector can't find provider: ${(key as any).name}`);
        return undefined;
      }
    }
  }
}

export const rootInjector = new Injector();
