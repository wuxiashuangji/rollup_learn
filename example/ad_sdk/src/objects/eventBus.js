/** ***************** 订阅中心 eventBus功能 开始  ***********************/
const event = function(params) {
  if (typeof window === 'undefined') {
    return false
  }
  /**
   * name: 订阅中心
   * for: 通知广播模式类,降低耦合度
   */
  // 存放
  const __notices = []
  // const isDebug = true

  /**
   * addNotification
   * 注册通知对象方法
   *
   * 参数:
   * name： 注册名，一般let在公共类中
   * selector： 对应的通知方法，接受到通知后进行的动作
   * observer: 注册对象，指Page对象
   */
  function addNotification(name, selector, observer) {
    if (name && selector) {
      if (!observer) {
        console.log('')
      }
      // console.log('addNotification:' + name)
      const newNotice = {
        name: name,
        selector: selector,
        observer: observer
      }
      addNotices(newNotice)
    } else {
      console.log('addNotification error: no selector or name')
    }
  }

  /**
   * 仅添加一次监听
   *
   * 参数:
   * name： 注册名，一般let在公共类中
   * selector： 对应的通知方法，接受到通知后进行的动作
   * observer: 注册对象，指Page对象
   */
  function addOnceNotification(name, selector, observer) {
    if (__notices.length > 0) {
      for (let i = 0; i < __notices.length; i++) {
        const notice = __notices[i]
        if (notice.name === name) {
          if (notice.observer === observer) {
            return
          }
        }
      }
    }
    addNotification(name, selector, observer)
  }

  function addNotices(newNotice) {
    // if (__notices.length > 0) {
    //     for (var i = 0; i < __notices.length; i++) {
    //         var hisNotice = __notices[i];
    //         //当名称一样时进行对比，如果不是同一个 则放入数组，否则跳出
    //         if (newNotice.name === hisNotice.name) {
    //             if (!cmp(hisNotice, newNotice)) {
    //                 __notices.push(newNotice);
    //             }
    //             return;
    //         }else{
    //             __notices.push(newNotice);
    //         }

    //     }
    // } else {

    // }

    __notices.push(newNotice)
  }

  /**
   * removeNotification
   * 移除通知方法
   *
   * 参数:
   * name: 已经注册了的通知
   * observer: 移除的通知所在的Page对象
   */

  function removeNotification(name, observer) {
    for (let i = 0; i < __notices.length; i++) {
      const notice = __notices[i]
      if (notice.name === name) {
        if (notice.observer === observer) {
          __notices.splice(i, 1)
          return
        }
      }
    }
  }

  /**
   * postNotificationName
   * 发送通知方法
   *
   * 参数:
   * name: 已经注册了的通知
   * info: 携带的参数
   */

  function postNotificationName(name, info) {
    // console.log('postNotificationName:' + name)
    if (__notices.length === 0) {
      // console.log("postNotificationName error: u hadn't add any notice.")
      return
    }

    for (let i = 0; i < __notices.length; i++) {
      const notice = __notices[i]
      if (notice.name === name) {
        notice.selector(info)
      }
    }
  }

  // 用于对比两个对象是否相等
  function cmp(x, y) {
    // If both x and y are null or undefined and exactly the same
    if (x === y) {
      return true
    }

    // If they are not strictly equal, they both need to be Objects
    if (!(x instanceof Object) || !(y instanceof Object)) {
      return false
    }

    // They must have the exact same prototype chain, the closest we can do is
    // test the constructor.
    if (x.constructor !== y.constructor) {
      return false
    }

    for (const p in x) {
      // Inherited properties were tested using x.constructor === y.constructor
      if (x.hasOwnProperty(p)) {
        // Allows comparing x[ p ] and y[ p ] when set to undefined
        if (!y.hasOwnProperty(p)) {
          return false
        }

        // If they have the same strict value or identity then they are equal
        if (x[p] === y[p]) {
          continue
        }

        // Numbers, Strings, Functions, Booleans must be strictly equal
        if (typeof x[p] !== 'object') {
          return false
        }

        // // Objects and Arrays must be tested recursively
        // if (!Object.equals(x[p], y[p])) {
        //   return false
        // }
      }
    }

    for (const p in y) {
      // allows x[ p ] to be set to undefined
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        return false
      }
    }
    return true
  }

  return {
    cmp: cmp,
    on: addNotification, // 注册事件
    off: removeNotification, // 解绑事件
    trigger: postNotificationName, // 触发事件
    emit: postNotificationName, // 触发事件
    onceOn: addOnceNotification // 注册一次性事件
  }
}

export default event()
/** ***************** 订阅中心 eventBus功能 结束  ***********************/
