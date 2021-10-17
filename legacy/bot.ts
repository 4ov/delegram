import Core from "./core.ts";
import { getTypes } from "./utils/major.ts";
import { updateSubtypes, updateTypes } from "./types-objects.ts";
import Context from "./context.ts";
import { asArray, asRegexp } from "./utils/conv.ts";

class Bot {
  telegram: Core;
  private offset = 0;
  private last_rule_id = -1;
  rules: Rule[] = [];
  constructor(private token: string) {
    this.telegram = new Core(this.token);
  }

  on(_typ: OnType | OnType[], ...callbacks: Callback[]) {
    _typ = asArray(_typ);
    _typ.forEach((typ) => {
      const types = getTypes(typ);
      if (types) {
        const { type, subtype } = types;
        const rule: Rule = {
          type,
          subtype,
          callbacks: callbacks.map((cb) => {
            this.last_rule_id += 1;
            return { id: this.last_rule_id, callback: cb };
          }) as any,
        };
        this.push_rule(rule);
      } else {
        throw new Error(`Type ${typ} is not valid`);
      }
    });
  }

  use(...callbacks: Callback[]) {

    this.last_rule_id += 1;
    const rule: Rule = {
      type: null,
      subtype: null,
      callbacks: callbacks.map((cb) => {
        this.last_rule_id += 1;
        return { id: this.last_rule_id, callback: cb };
      }) as any,
    };
    this.push_rule(rule);
  }

  text(text: string | RegExp | string[] | RegExp[], ...callbacks: Callback[]) {
    const texts = asArray(text).map(asRegexp)
    texts.forEach($text => {
      this.last_rule_id += 1;
      const rule: Rule = {
        type: null,
        subtype: null,
        text: $text,
        callbacks: callbacks.map((cb) => {
          this.last_rule_id += 1;
          return { id: this.last_rule_id, callback: cb };
        }) as any,
      };
      this.push_rule(rule);
    })

  }

  private push_rule(rule: Rule) {
    const ruleIdx = this.rules.findIndex(($rule) => {
      return (
        (rule.type == $rule.type || false) /* null == $rule.type */ &&
        (rule.subtype == $rule.subtype || false) /* null == $rule.subtype*/
      );
    });

    if (ruleIdx < 0) {
      this.rules.push(rule);
    } else {
      this.rules[ruleIdx].callbacks.push(...rule.callbacks);
    }
  }

  private get_rules_callbacks(
    {
      type,
      subtype,
    }: {
      type: UpdateType;
      subtype: UpdateSubtype;
    },
    message: Message
  ) {
    let regResult = null
    const passedRules = this.rules.filter((rule) => {
      const textPatt = rule.text ? asRegexp(rule.text) : null;
      const matchedReg = textPatt?.exec(message.text as string)
      regResult = matchedReg
      return (
        (rule.type == type || rule.type == null) &&
        (rule.subtype == subtype || rule.subtype == null) &&
        ((subtype == "text" && textPatt) ? matchedReg : true)
      );
    });
    const callbacks = passedRules
    .map((rule) => {
      return rule.callbacks;
    })
    .flat(1)
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .map((i) => {
      return i;
    })
    .map((cb) => cb.callback);
    return{
      callbacks,
      regResult
    }
  }

  handle(update: Update) {

    const type: UpdateType = Object.keys(update).filter((key) =>
      updateTypes.includes(key as any)
    )[0] as UpdateType;
    const subtype = Object.keys(update[type] as object).filter((key) =>
      updateSubtypes.includes(key as any)
    )[0] as UpdateSubtype;
    const messageObj = update[type] as Message;
    const { callbacks, regResult } = this.get_rules_callbacks({ type, subtype }, messageObj);
    const context = new Context(this.telegram, update, { type, subtype, regResult });
    function go(id = 0) {
      function next() {

        go(id + 1);
      }
      const _callback = callbacks[id];

      //@ts-ignore
      if (_callback) {
        try {
          _callback(context, next);
        } catch (err) {
          console.log(err);
        }
      }
    }

    go();
  }

  async poll() {
    await this.telegram
      .getUpdates({
        offset: this.offset,
        timeout: 10,
        allowed_updates: ["message"],
      })
      .then((updates) => {
        updates.forEach((update) => {
          this.offset = update.update_id + 1;

          this.handle(update);

          // handler(update)
        });
      })
      .finally(() => {
        this.poll();
      });
  }
}

export default Bot;
