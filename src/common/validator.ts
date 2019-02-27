
import Dialog from '../component/Dialog';

export const HandleErrorResult = (result: any) => {
    Dialog.showToast(result.errMsg);
}

const strategies: any = {
  /*非空校验*/
  isNonEmpty(value: any, errorMsg: any, elementName: any) {
      return value === '' || value.length === 0 ? {
          name    : elementName,
          errMsg  : errorMsg,
      } : void 0;
  },

  /*手机格式校验*/
  isNumberVali(value: any, errorMsg: any, elementName: any) {
      return (!(new RegExp('^[0-9]*$').test(value))) ? {
          name    : elementName,
          errMsg  : errorMsg,
      } : void 0;
  },

  isEqual(value: any, errorMsg: any, elementName: any) {
    return value[0] === value[1] ? void 0 : {
        name    : elementName,
        errMsg  : errorMsg,
    };
  },

  /**
   * @param {valiEosAccount} Eos 账号只支持 1-5 a-z 的格式
   */
  valiEosAccount(value: any, errorMsg: any, elementName: any) {
    // const charmap = '12345abcdefghijklmnopqrstuvwxyz';

    const reg = new RegExp('^[a-z1-5]+$');
    return (!reg.test(value)) ? {
        name    : elementName,
        errMsg  : errorMsg,
    } : void 0;
  },

  valiLength(value: any, errorMsg: any, elementName: any) {
    return value.length === 12 ? void 0 : {
        name    : elementName,
        errMsg  : errorMsg,
    };
  },

  checkValueLength(value: any, errorMsg: any, elementName: any, args: any) {
    return value.length >= args.validLength ? void 0 : {
        name    : elementName,
        errMsg  : errorMsg,
    }
  }
};

class Validator {
  
  private cache: any;
  
  constructor () {
      /*缓存校验规则*/
      this.cache  = [];
      this.add    = this.add.bind(this);
      this.start  = this.start.bind(this);
  }

  public add = (value: any, rules: any) => {
      rules.map((rule: any) => {
          let strategyAry = rule.strategy.split(':');
          let errorMsg = rule.errorMsg;
          let elementName = rule.elementName;
          let args = rule.args;

          this.cache.push(() => {
              
              let strategy = strategyAry.shift();
              
              strategyAry.unshift(value);

              strategyAry.push(errorMsg);

              strategyAry.push(elementName);

              strategyAry.push(args);
              
              return strategies[strategy].apply(value, strategyAry);
          });
      });
  }

  public start = () => {
      for (let validatorFunc of this.cache) {
          /* 开始校验并取得校验后的信息 */
          let errorMsg = validatorFunc(); 

          if (errorMsg) {
              return errorMsg;
          }
      }
  }
}

export default Validator;