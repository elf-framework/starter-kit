(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _handlerCache, ___stateHooks, ___stateHooksIndex, _state, _cachedMethodList, _functionCache, _childObjectList, _childObjectElements, _cachedChildren, _reloadInstance, reloadInstance_fn, _storeInstance;
const COMPONENT_INSTANCE = "__componentInstance";
const COMPONENT_ROOT_CONTEXT = "__componentRootContext";
const IS_FRAGMENT_ITEM = "__is_fragment_item";
const CHILD_ITEM_TYPE_FRAGMENT = "fragment";
const CHILD_ITEM_TYPE_ELEMENT = "element";
function collectProps(root, rootClass, filterFunction = () => true) {
  let p2 = root;
  let results = [];
  do {
    const isObject2 = p2 instanceof Object;
    if (isObject2 === false) {
      break;
    }
    const isRootClass = p2.constructor.name === rootClass.name;
    if (isRootClass) {
      break;
    }
    const names = Object.getOwnPropertyNames(p2).filter(filterFunction);
    results.push.apply(results, names);
  } while (p2 = Object.getPrototypeOf(p2));
  return results;
}
function debounce(callback, delay = 0) {
  if (delay === 0) {
    return callback;
  }
  var t = void 0;
  return function($1, $2, $3, $4, $5) {
    if (t) {
      window.clearTimeout(t);
    }
    t = window.setTimeout(function() {
      callback($1, $2, $3, $4, $5);
    }, delay || 300);
  };
}
function throttle(callback, delay) {
  var t = void 0;
  return function($1, $2, $3, $4, $5) {
    if (!t) {
      t = window.setTimeout(function() {
        callback($1, $2, $3, $4, $5);
        t = null;
      }, delay || 300);
    }
  };
}
function ifCheck(callback, context, checkMethods) {
  return (...args) => {
    const ifResult = checkMethods.every((check2) => {
      return context[check2].apply(context, args);
    });
    if (ifResult) {
      callback.apply(context, args);
    }
  };
}
function makeRequestAnimationFrame(callback, context) {
  return (...args) => {
    if (callback.requestAnimationFrameId) {
      cancelAnimationFrame(callback.requestAnimationFrameId);
    }
    callback.requestAnimationFrameId = requestAnimationFrame(() => {
      callback.apply(context, args);
    });
  };
}
function isUndefined(value) {
  return typeof value == "undefined";
}
function isNotUndefined(value) {
  return !isUndefined(value);
}
function isBoolean(value) {
  return typeof value == "boolean";
}
function isString(value) {
  return typeof value == "string";
}
function isArray(value) {
  return Array.isArray(value);
}
function isObject(value) {
  return typeof value == "object" && !Array.isArray(value) && !isNumber(value) && !isString(value) && value !== null;
}
function isFunction(value) {
  return typeof value == "function";
}
function isValue(value) {
  return value !== void 0 && value !== null;
}
function isNumber(value) {
  return typeof value == "number";
}
function classnames(...args) {
  const result = [];
  args.filter(Boolean).forEach((it) => {
    if (isArray(it)) {
      result.push(classnames(...it));
    } else if (isObject(it)) {
      Object.keys(it).filter((k) => Boolean(it[k])).forEach((key) => {
        result.push(key);
      });
    } else if (isString(it)) {
      result.push(it);
    }
  });
  return result.length ? result.join(" ") : void 0;
}
const VNodeType = {
  NODE: 8,
  TEXT: 3,
  FRAGMENT: 11,
  COMPONENT: 100,
  ELEMENT: 101,
  COMMENT: 102
};
const UUID_REG = /[xy]/g;
function uuid() {
  var dt = new Date().getTime();
  var uuid2 = "xxx12-xx-34xx".replace(UUID_REG, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : r & 3 | 8).toString(16);
  });
  return uuid2;
}
function uuidShort() {
  var dt = new Date().getTime();
  var uuid2 = "idxxxxxxx".replace(UUID_REG, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : r & 3 | 8).toString(16);
  });
  return uuid2;
}
let contextProviderList = {};
function useRender(component) {
  renderComponent(component);
}
function useState(initialState) {
  return getCurrentComponent().useState(initialState);
}
function useEffect(callback, deps) {
  return getCurrentComponent().useEffect(callback, deps);
}
function useMemo(callback, deps) {
  return getCurrentComponent().useMemo(callback, deps);
}
function useCallback(callback, deps) {
  return getCurrentComponent().useCallback(callback, deps);
}
function useRef(initialValue) {
  return getCurrentComponent().useRef(initialValue);
}
function getContextProvider(context) {
  const contextInfo = contextProviderList[context.id];
  return contextInfo.lastProvider;
}
const providerEvents = {};
function addProviderSubscribe(providerId, component, callback) {
  if (!providerEvents[providerId]) {
    providerEvents[providerId] = {};
  }
  providerEvents[providerId][component.id] = callback;
}
function useSubscribe(name, callback, debounceSecond = 0, throttleSecond = 0, isSelf = false) {
  return getCurrentComponent().useSubscribe(
    name,
    callback,
    debounceSecond,
    throttleSecond,
    isSelf
  );
}
function useEmit(name, ...args) {
  return getCurrentComponent().emit(name, ...args);
}
function useMagicMethod(methodName, callback) {
  return getCurrentComponent().initMagicMethod(methodName, callback);
}
class MagicHandler {
  constructor() {
    __privateAdd(this, _handlerCache, {});
    this.handlers = this.initializeHandler();
  }
  initializeHandler(localHandlers = {}) {
    return createHandlerInstance(this, localHandlers);
  }
  loadHandlerCache(func) {
    if (!__privateGet(this, _handlerCache)[func]) {
      __privateGet(this, _handlerCache)[func] = this.handlers.filter((h2) => h2[func]);
    }
    return __privateGet(this, _handlerCache)[func];
  }
  async runHandlers(func = "run", ...args) {
    await Promise.all(
      this.loadHandlerCache(func).map(async (h2) => {
        await h2[func](...args);
      })
    );
  }
  filterFunction(func, ...args) {
    return this.loadHandlerCache(func).map((h2) => {
      return h2[func](...args);
    });
  }
}
_handlerCache = /* @__PURE__ */ new WeakMap();
const USE_STATE = Symbol("useState");
const USE_EFFECT = Symbol("useEffect");
const USE_MEMO = Symbol("useMemo");
const USE_CALLBACK = Symbol("useCallback");
const USE_REF = Symbol("useRef");
const USE_CONTEXT = Symbol("useContext");
const USE_SUBSCRIBE = Symbol("useSubscribe");
const USE_ID = Symbol("useId");
const USE_SYNC_EXTERNAL_STORE = Symbol("useSyncExternalStore");
class RefClass {
  constructor(current) {
    this.current = current;
  }
  setCurrent(current) {
    this.current = current;
  }
}
function createRef(current = void 0) {
  return new RefClass(current);
}
function createState({ value, component }) {
  let localValue = { value, component };
  function getValue(v2) {
    if (typeof v2 === "function") {
      return v2(localValue.value);
    }
    return v2;
  }
  const update = (newValue) => {
    const _newValue = getValue(newValue);
    if (localValue.value !== _newValue) {
      localValue.value = _newValue;
      renderComponent(localValue.component);
    }
  };
  return [localValue, update];
}
function createExternalStore({ subscribe, getSnapshot, isEqual: isEqual2, component }) {
  let localValue = {
    value: getSnapshot(),
    subscribe,
    unsubscribe: null,
    component
  };
  const update = () => {
    const _newValue = getSnapshot();
    const isDiff = isFunction(isEqual2) ? isEqual2(localValue, _newValue) === false : localValue.value !== _newValue;
    if (isDiff) {
      localValue.value = _newValue;
      renderComponent(localValue.component);
    }
  };
  localValue.unsubscribe = subscribe(update);
  return localValue;
}
class HookMachine extends MagicHandler {
  constructor() {
    super(...arguments);
    __privateAdd(this, ___stateHooks, []);
    __privateAdd(this, ___stateHooksIndex, 0);
  }
  copyHooks() {
    return {
      __stateHooks: __privateGet(this, ___stateHooks),
      __stateHooksIndex: __privateGet(this, ___stateHooksIndex)
    };
  }
  reloadHooks(hooks) {
    __privateSet(this, ___stateHooks, hooks.__stateHooks || []);
    __privateSet(this, ___stateHooksIndex, hooks.__stateHooksIndex || 0);
    __privateGet(this, ___stateHooks).forEach((hook, index2) => {
      if ((hook == null ? void 0 : hook.type) === USE_STATE) {
        hook.hookInfo = createState({
          value: hook.hookInfo[0].value,
          component: this
        });
      } else {
        __privateGet(this, ___stateHooks)[index2] = void 0;
      }
    });
  }
  resetCurrentComponent() {
    this.resetHookIndex();
    resetCurrentComponent(this);
  }
  resetHookIndex() {
    __privateSet(this, ___stateHooksIndex, 0);
  }
  increaseHookIndex() {
    __privateWrapper(this, ___stateHooksIndex)._++;
  }
  getHook() {
    return __privateGet(this, ___stateHooks)[__privateGet(this, ___stateHooksIndex)];
  }
  setHook(type, hookInfo) {
    __privateGet(this, ___stateHooks)[__privateGet(this, ___stateHooksIndex)] = {
      type,
      hookInfo
    };
  }
  useBatch(callback) {
    pendingComponent(this);
    callback && callback();
    removePendingComponent(this);
    renderComponent(this);
  }
  useId() {
    if (!this.getHook()) {
      this.setHook(USE_ID, { value: uuid(), component: this });
    }
    const { value } = this.getHook().hookInfo;
    this.increaseHookIndex();
    return value;
  }
  useSyncExternalStore(subscribe, getSnapshot, isEqual2) {
    if (!this.getHook()) {
      this.setHook(
        USE_SYNC_EXTERNAL_STORE,
        createExternalStore({
          subscribe,
          getSnapshot,
          isEqual: isEqual2,
          component: this
        })
      );
    }
    const { value } = this.getHook().hookInfo;
    this.increaseHookIndex();
    return value;
  }
  useState(initialState) {
    if (!this.getHook()) {
      this.setHook(
        USE_STATE,
        createState({ value: initialState, component: this })
      );
    }
    const [value, update] = this.getHook().hookInfo;
    this.increaseHookIndex();
    return [value.value, update];
  }
  isChangedDeps(deps) {
    const hasDeps = !deps;
    const {
      hookInfo: { deps: currentDeps }
    } = this.getHook() || { hookInfo: {} };
    const hasChangedDeps = currentDeps ? !deps.every((d2, i) => d2 === currentDeps[i]) : true;
    if ((deps == null ? void 0 : deps.length) === 0 && (currentDeps == null ? void 0 : currentDeps.length) === 0) {
      return false;
    }
    return hasDeps || hasChangedDeps;
  }
  useEffect(callback, deps) {
    const hasChangedDeps = this.isChangedDeps(deps);
    this.setHook(USE_EFFECT, {
      deps,
      hasChangedDeps,
      callback
    });
    this.increaseHookIndex();
  }
  useReducer(reducer, initialState) {
    const [state, setState] = this.useState(initialState);
    function dispatch(action) {
      setState((prevState) => reducer(prevState, action));
    }
    return [state, dispatch];
  }
  useMemo(callback, deps, useType = USE_MEMO) {
    const hasChangedDeps = this.isChangedDeps(deps);
    if (hasChangedDeps) {
      this.setHook(useType, {
        deps,
        value: callback()
      });
    }
    const lastHookValue = this.getHook().hookInfo || {};
    this.increaseHookIndex();
    return lastHookValue.value;
  }
  useCallback(callback, deps) {
    return this.useMemo(() => callback, deps, USE_CALLBACK);
  }
  useRef(initialValue) {
    return this.useMemo(() => createRef(initialValue), [], USE_REF);
  }
  refreshProvider(provider) {
    const hookInfo = this.filterHooks(USE_CONTEXT).find(
      (it) => it.provider.id === provider.id
    );
    if (hookInfo) {
      hookInfo.provider = provider;
    }
  }
  useContext(context) {
    if (!this.getHook()) {
      this.setHook(USE_CONTEXT, {
        provider: getContextProvider(context),
        component: this
      });
    }
    const { provider } = this.getHook().hookInfo;
    addProviderSubscribe(provider.id, this, () => {
      renderComponent(this);
    });
    this.increaseHookIndex();
    return (provider == null ? void 0 : provider.value) || context.defaultValue;
  }
  useSubscribe(name, callback, debounceSecond = 0, throttleSecond = 0, isSelf = false) {
    if (!this.getHook()) {
      this.setHook(USE_SUBSCRIBE, {
        name,
        callback,
        component: this,
        unsubscribe: this.$store.on(
          name,
          callback,
          this,
          debounceSecond,
          throttleSecond,
          false,
          isSelf
        )
      });
    }
    const { unsubscribe } = this.getHook().hookInfo;
    this.increaseHookIndex();
    return unsubscribe;
  }
  useSelf(name, callback, debounceSecond = 0, throttleSecond = 0) {
    return this.useSubscribe(
      name,
      callback,
      debounceSecond,
      throttleSecond,
      true
    );
  }
  useEmit(name, ...args) {
    return this.emit(name, ...args);
  }
  useStore(key) {
    return this.$store.get(key);
  }
  useStoreSet(key, value) {
    this.$store.set(key, value);
  }
  filterHooks(type) {
    return __privateGet(this, ___stateHooks).filter((it) => (it == null ? void 0 : it.type) === type).map((it) => it.hookInfo);
  }
  getUseEffects() {
    return this.filterHooks(USE_EFFECT);
  }
  getUseSyncExternalStore() {
    return this.filterHooks(USE_SYNC_EXTERNAL_STORE);
  }
  getUseStates() {
    return this.filterHooks(USE_STATE).map((it) => it.value);
  }
  runHooks() {
    this.getUseEffects().forEach((it) => {
      if (it.hasChangedDeps) {
        it.cleanup = it.callback();
      }
    });
  }
  cleanHooks() {
    this.getUseEffects().forEach((it) => {
      if (isFunction(it.cleanup)) {
        it.cleanup();
      }
    });
    this.getUseSyncExternalStore().forEach((it) => {
      if (isFunction(it.unsubscribe)) {
        it.unsubscribe();
      }
    });
  }
  destroy() {
  }
  onMounted() {
    this.isMounted = true;
    this.runHooks();
  }
  onUpdated() {
    this.runHooks();
  }
  onDestroyed() {
    this.isMounted = false;
    this.cleanHooks();
  }
  onUnmounted() {
  }
}
___stateHooks = /* @__PURE__ */ new WeakMap();
___stateHooksIndex = /* @__PURE__ */ new WeakMap();
const MAGIC_METHOD_REG = /^@magic:([a-zA-Z][a-zA-Z0-9]*)[\W]{1}(.*)*$/g;
const MAGIC_METHOD = "@magic:";
const SPLITTER = "|";
const FUNC_REGEXP = /(([\$a-z_\-]+)\([^\(\)]*\)|([a-z_\-]+))/gi;
const FUNC_START_CHARACTER = "(";
const FUNC_END_CHARACTER = ")";
const MAGICMETHOD_EXTRA = {
  KEYWORD: "keyword",
  FUNCTION: "function",
  VALUE: "value"
};
class MagicMethod {
  constructor(obj) {
    this.context = obj.context;
    this.originalMethod = obj.originalMethod;
    this.method = obj.method;
    this.args = obj.args;
    this.pipes = obj.pipes;
    this.keys = obj.keys;
    this.__cache = /* @__PURE__ */ new Map();
  }
  setCache(key, value) {
    this.__cache.set(key, value);
  }
  hasCache(key) {
    return this.__cache.has(key);
  }
  getCache(key) {
    return this.__cache.get(key);
  }
  hasKeyword(keyword) {
    if (this.hasCache(keyword)) {
      return this.getCache(keyword);
    }
    let exists = false;
    this.pipes.forEach((pipe) => {
      switch (pipe.type) {
        case MAGICMETHOD_EXTRA.KEYWORD:
          if (pipe.value === keyword) {
            exists = true;
          }
          break;
      }
    });
    this.setCache(keyword, exists);
    return exists;
  }
  hasFunction(funcName) {
    if (this.hasCache(funcName)) {
      return this.getCache(funcName);
    }
    let exists = !!this.getFunction(funcName);
    this.setCache(funcName, exists);
    return exists;
  }
  getFunction(funcName) {
    return this.functions.find((pipe) => pipe.func === funcName);
  }
  getFunctionList(funcName) {
    return this.functions.filter((pipe) => pipe.func === funcName);
  }
  get originalCallback() {
    return this.context[this.originalMethod];
  }
  get keywords() {
    return this.keys[MAGICMETHOD_EXTRA.KEYWORD].map((pipe) => pipe.value);
  }
  get functions() {
    return this.keys[MAGICMETHOD_EXTRA.FUNCTION];
  }
  get values() {
    return this.keys[MAGICMETHOD_EXTRA.VALUE].map((pipe) => pipe.value);
  }
  execute(...args) {
    return this.originalCallback.call(this.context, ...args);
  }
  executeWithContext(context, ...args) {
    return this.originalCallback.call(context, ...args);
  }
  static make(str, ...args) {
    return `${MAGIC_METHOD}${str} ${args.join(SPLITTER)}`;
  }
  static check(str) {
    return str.match(MAGIC_METHOD_REG) !== null;
  }
  static parse(str, context = {}) {
    const matches = str.match(MAGIC_METHOD_REG);
    if (!matches) {
      return void 0;
    }
    const result = matches[0].split(MAGIC_METHOD)[1].split(SPLITTER).map((item) => item.trim());
    let [initializer, ...pipes] = result;
    const [method, ...args] = initializer.split(" ");
    const pipeList = pipes.map((it) => {
      return this.parsePipe(it);
    }).filter((it) => it.value);
    const pipeObjects = {
      function: [],
      keyword: [],
      value: []
    };
    pipeList.forEach((pipe) => {
      if (pipe.type === "function") {
        pipeObjects.function.push(pipe);
      } else if (pipe.type === "keyword") {
        pipeObjects.keyword.push(pipe);
      } else {
        pipeObjects.value.push(pipe);
      }
    });
    return new MagicMethod({
      context,
      originalMethod: str,
      method,
      args,
      pipes: pipeList,
      keys: pipeObjects
    });
  }
  static parsePipe(it) {
    const result = it.match(FUNC_REGEXP);
    if (!result) {
      return {
        type: "value",
        value: it
      };
    }
    const [value] = result;
    if (value.includes(FUNC_START_CHARACTER)) {
      const [func, rest] = value.split(FUNC_START_CHARACTER);
      const [args] = rest.split(FUNC_END_CHARACTER);
      return {
        type: "function",
        value,
        func,
        args: args.split(",").map((it2) => it2.trim()).filter(Boolean)
      };
    }
    return {
      type: "keyword",
      value: result[0]
    };
  }
}
const makeEventChecker = (value, split = SPLITTER) => {
  return ` ${split} ${value}`;
};
const NAME_SAPARATOR = ":";
const SAPARATOR = " ";
const DOM_EVENT_MAKE = (...keys) => {
  var key = keys.join(NAME_SAPARATOR);
  return (...args) => {
    const [selector, ...result] = args;
    return MagicMethod.make("domevent", [key, selector].join(" "), ...result);
  };
};
const SUBSCRIBE_EVENT_MAKE = (...args) => {
  return MagicMethod.make("subscribe", ...args);
};
const CALLBACK_EVENT_MAKE = (...args) => {
  return MagicMethod.make("callback", ...args);
};
const OBSERVER_EVENT_MAKE = (...args) => {
  return MagicMethod.make("observer", ...args);
};
const CHECKER = (value, split = SPLITTER) => {
  return makeEventChecker(value, split);
};
const AFTER = (value, split = SPLITTER) => {
  return CHECKER(`after(${value})`, split);
};
const IF = CHECKER;
const LEFT_BUTTON = CHECKER("isMouseLeftButton");
const DEBOUNCE = (t = 100) => {
  return CHECKER(`debounce(${t})`);
};
const ALL_TRIGGER = CHECKER("allTrigger()");
const SELF_TRIGGER = CHECKER("selfTrigger()");
const FRAME = CHECKER("frame()");
const PARAMS = (obj) => {
  return CHECKER(`params(${variable(obj)})`);
};
const PREVENT = AFTER(`preventDefault`);
const STOP = AFTER(`stopPropagation`);
const SUBSCRIBE_ALL = (...args) => SUBSCRIBE_EVENT_MAKE(...args, ALL_TRIGGER);
const SUBSCRIBE_SELF = (...args) => SUBSCRIBE_EVENT_MAKE(...args, SELF_TRIGGER);
const CALLBACK = CALLBACK_EVENT_MAKE;
CALLBACK("requestAnimationFrame");
const OBSERVER = OBSERVER_EVENT_MAKE;
const CUSTOM = DOM_EVENT_MAKE;
const CLICK = DOM_EVENT_MAKE("click");
DOM_EVENT_MAKE("dblclick");
DOM_EVENT_MAKE("mousedown");
DOM_EVENT_MAKE("mouseup");
DOM_EVENT_MAKE("mousemove");
DOM_EVENT_MAKE("mouseover");
DOM_EVENT_MAKE("mouseout");
DOM_EVENT_MAKE("mouseenter");
DOM_EVENT_MAKE("mouseleave");
DOM_EVENT_MAKE("touchstart");
DOM_EVENT_MAKE("touchmove");
DOM_EVENT_MAKE("touchend");
DOM_EVENT_MAKE("keydown");
DOM_EVENT_MAKE("keyup");
DOM_EVENT_MAKE("keypress");
DOM_EVENT_MAKE("drag");
DOM_EVENT_MAKE("dragstart");
DOM_EVENT_MAKE("drop");
DOM_EVENT_MAKE("dragover");
DOM_EVENT_MAKE("dragenter");
DOM_EVENT_MAKE("dragleave");
DOM_EVENT_MAKE("dragexit");
DOM_EVENT_MAKE("dragout");
DOM_EVENT_MAKE("dragend");
DOM_EVENT_MAKE("contextmenu");
DOM_EVENT_MAKE("change");
DOM_EVENT_MAKE("input");
const FOCUS = DOM_EVENT_MAKE("focus");
const FOCUSIN = DOM_EVENT_MAKE("focusin");
const FOCUSOUT = DOM_EVENT_MAKE("focusout");
DOM_EVENT_MAKE("blur");
DOM_EVENT_MAKE("paste");
DOM_EVENT_MAKE("resize");
const SCROLL = DOM_EVENT_MAKE("scroll");
DOM_EVENT_MAKE("submit");
const POINTERSTART = (...args) => {
  return CUSTOM("pointerdown")(...args) + LEFT_BUTTON;
};
const POINTEROVER = CUSTOM("pointerover");
const POINTERENTER = CUSTOM("pointerenter");
CUSTOM("pointerout");
const POINTERLEAVE = CUSTOM("pointerleave");
const POINTERMOVE = CUSTOM("pointermove");
const POINTEREND = CUSTOM("pointerup");
CUSTOM("change", "input");
CUSTOM("wheel", "mousewheel", "DOMMouseScroll");
DOM_EVENT_MAKE("animationstart");
DOM_EVENT_MAKE("animationend");
DOM_EVENT_MAKE("animationiteration");
DOM_EVENT_MAKE("transitionstart");
DOM_EVENT_MAKE("transitionend");
DOM_EVENT_MAKE("transitionrun");
DOM_EVENT_MAKE("transitioncancel");
CUSTOM("doubletab");
CUSTOM("popstate");
CUSTOM("orientationchange");
CUSTOM("hashchange");
const Event = {
  addDomEvent(eventTarget, eventName, callback, useCapture = false) {
    if (eventTarget) {
      eventTarget.addEventListener(eventName, callback, useCapture);
    }
  },
  removeDomEvent(eventTarget, eventName, callback) {
    if (eventTarget) {
      eventTarget.removeEventListener(eventName, callback);
    }
  },
  pos(e) {
    if (e.touches && e.touches[0]) {
      return e.touches[0];
    }
    return e;
  },
  posXY(e) {
    var pos = this.pos(e);
    return {
      x: pos.pageX,
      y: pos.pageY
    };
  }
};
class BaseHandler {
  constructor(context, options = {}) {
    this.context = context;
    this.options = options;
  }
  initialize() {
  }
  load() {
  }
  refresh() {
  }
  render() {
  }
  getRef(id) {
    return this.context.getRef(id);
  }
  run() {
  }
  destroy() {
  }
}
const scrollBlockingEvents = {
  touchstart: true,
  touchmove: true,
  mousedown: true,
  mouseup: true,
  mousemove: true
};
const eventConverts = {
  doubletab: "touchend"
};
const customEventNames = {
  doubletab: true
};
const selfCheckMethods = {
  self(e) {
    return e && e.$dt && e.$dt.is(e.target);
  },
  isAltKey(e) {
    return e.altKey;
  },
  isCtrlKey(e) {
    return e.ctrlKey;
  },
  isShiftKey(e) {
    return e.shiftKey;
  },
  isMetaKey(e) {
    return e.metaKey || e.key == "Meta" || e.code.indexOf("Meta") > -1;
  },
  isMouseLeftButton(e) {
    return e.buttons === 1;
  },
  isMouseRightButton(e) {
    return e.buttons === 2;
  },
  hasMouse(e) {
    return e.pointerType === "mouse";
  },
  hasTouch(e) {
    return e.pointerType === "touch";
  },
  hasPen(e) {
    return e.pointerType === "pen";
  },
  preventDefault(e) {
    e.preventDefault();
    return true;
  },
  stopPropagation(e) {
    e.stopPropagation();
    return true;
  }
};
class DomEventHandler extends BaseHandler {
  initialize() {
    var _a, _b;
    if (this._domEvents && this.context.notEventRedefine) {
      return;
    }
    if (!this._domEvents || this._domEvents.length === 0 || this._bindings.length === 0) {
      this._domEvents = this.context.filterMethodes("domevent");
    }
    if (!this._initialized && !((_a = this._bindings) == null ? void 0 : _a.length) && ((_b = this._domEvents) == null ? void 0 : _b.length)) {
      this._domEvents.forEach((it) => this.parseDomEvent(it));
      this._initialized = true;
    }
  }
  update() {
    this.initialize();
  }
  destroy() {
    if (this.context.notEventRedefine)
      ;
    else {
      this.removeEventAll();
    }
  }
  getCallback(field) {
    return this.context[field] || selfCheckMethods[field];
  }
  removeEventAll() {
    this.getBindings().forEach((obj) => {
      this.removeDomEvent(obj);
    });
    this.initBindings();
  }
  removeDomEvent({ eventName, dom, callback }) {
    Event.removeDomEvent(dom, eventName, callback);
  }
  getBindings() {
    if (!this._bindings) {
      this.initBindings();
    }
    return this._bindings;
  }
  addBinding(obj) {
    this.getBindings().push(obj);
  }
  initBindings() {
    this._bindings = [];
  }
  matchPath(el, selector) {
    if (el) {
      if (el.matches(selector)) {
        return el;
      }
      return this.matchPath(el.parentElement, selector);
    }
    return null;
  }
  hasDelegate(e, eventObject) {
    return this.matchPath(e.target || e.srcElement, eventObject.delegate);
  }
  makeCallback(eventObject, magicMethod, callback) {
    if (eventObject.delegate) {
      return this.makeDelegateCallback(eventObject, magicMethod, callback);
    } else {
      return this.makeDefaultCallback(eventObject, magicMethod, callback);
    }
  }
  makeDefaultCallback(eventObject, magicMethod, callback) {
    return (e) => {
      var returnValue = this.runEventCallback(
        e,
        eventObject,
        magicMethod,
        callback
      );
      if (isNotUndefined(returnValue)) {
        return returnValue;
      }
    };
  }
  makeDelegateCallback(eventObject, magicMethod, callback) {
    return (e) => {
      const delegateTarget = this.hasDelegate(e, eventObject);
      if (delegateTarget) {
        e.$dt = Dom.create(delegateTarget);
        var returnValue = this.runEventCallback(
          e,
          eventObject,
          magicMethod,
          callback
        );
        if (isNotUndefined(returnValue)) {
          return returnValue;
        }
      }
    };
  }
  runEventCallback(e, eventObject, magicMethod, callback) {
    const context = this.context;
    e.xy = Event.posXY(e);
    if (eventObject.beforeMethods.length) {
      eventObject.beforeMethods.every((before) => {
        var _a;
        return (_a = this.getCallback(before.target)) == null ? void 0 : _a.call(context, e, before.param);
      });
    }
    if (this.checkEventType(e, eventObject)) {
      var returnValue = callback(e, e.$dt, e.xy);
      if (returnValue !== false && eventObject.afterMethods.length) {
        eventObject.afterMethods.forEach((after) => {
          var _a;
          return (_a = this.getCallback(after.target)) == null ? void 0 : _a.call(context, e, after.param);
        });
      }
      return returnValue;
    }
  }
  checkEventType(e, eventObject) {
    const context = this.context;
    var hasKeyCode = true;
    if (eventObject.codes.length) {
      hasKeyCode = (e.code ? eventObject.codes.indexOf(e.code.toLowerCase()) > -1 : false) || (e.key ? eventObject.codes.indexOf(e.key.toLowerCase()) > -1 : false);
    }
    var isAllCheck = true;
    if (eventObject.checkMethodList.length) {
      isAllCheck = eventObject.checkMethodList.every((field) => {
        var fieldValue = this.getCallback(field);
        if (isFunction(fieldValue) && fieldValue) {
          return fieldValue.call(context, e);
        } else if (isNotUndefined(fieldValue)) {
          return !!fieldValue;
        }
        return true;
      });
    }
    return hasKeyCode && isAllCheck;
  }
  getDefaultDomElement(dom) {
    const context = this.context;
    let el;
    if (dom) {
      el = context.refs[dom] || context[dom] || window[dom];
    } else {
      el = context.el || context.$el || context.$root;
    }
    if (el instanceof Dom) {
      return el.getElement();
    }
    return el;
  }
  getRealEventName(eventName) {
    return eventConverts[eventName] || eventName;
  }
  getCustomEventName(eventName) {
    return customEventNames[eventName] ? eventName : "";
  }
  getDefaultEventObject(eventName, dom, delegate, magicMethod, callback) {
    var _a, _b;
    const obj = {
      eventName: this.getRealEventName(eventName),
      customEventName: this.getCustomEventName(eventName),
      callback
    };
    const [, , ...delegates] = magicMethod.args;
    obj.dom = this.getDefaultDomElement(dom);
    obj.delegate = delegates.join(SAPARATOR);
    obj.beforeMethods = [];
    obj.afterMethods = [];
    obj.codes = [];
    obj.checkMethodList = [];
    const debounceFunction = magicMethod.getFunction("debounce");
    const throttleFunction = magicMethod.getFunction("throttle");
    if (debounceFunction) {
      var debounceTime = +(((_a = debounceFunction.args) == null ? void 0 : _a[0]) || 0);
      obj.callback = debounce(callback, debounceTime);
    } else if (throttleFunction) {
      var throttleTime = +(((_b = throttleFunction.args) == null ? void 0 : _b[0]) || 0);
      obj.callback = throttle(callback, throttleTime);
    }
    const afterFunctionList = magicMethod.getFunctionList("after");
    const beforeFunctionList = magicMethod.getFunctionList("before");
    if (afterFunctionList.length) {
      afterFunctionList.forEach((afterFunction) => {
        var r = afterFunction.args[0].split(" ");
        var [target, param] = r;
        obj.afterMethods.push({
          target,
          param
        });
      });
    }
    if (beforeFunctionList.length) {
      beforeFunctionList.forEach((beforeFunction) => {
        var r = beforeFunction.args[0].split(" ");
        var [target, param] = r;
        obj.beforeMethods.push({
          target,
          param
        });
      });
    }
    magicMethod.keywords.forEach((keyword) => {
      const method = keyword;
      if (this.getCallback(method)) {
        obj.checkMethodList.push(method);
      } else {
        obj.codes.push(method.toLowerCase());
      }
    });
    return obj;
  }
  addDomEvent(eventObject, magicMethod, callback) {
    eventObject.callback = this.makeCallback(
      eventObject,
      magicMethod,
      callback
    );
    this.addBinding(eventObject);
    var options = false;
    if (magicMethod.hasKeyword("capture")) {
      options = true;
    }
    if (scrollBlockingEvents[eventObject.eventName]) {
      options = {
        passive: true,
        capture: options
      };
    }
    if (eventObject.dom) {
      Event.addDomEvent(
        eventObject.dom,
        eventObject.eventName,
        eventObject.callback,
        options
      );
    }
  }
  makeCustomEventCallback(eventObject, magicMethod, callback) {
    var _a;
    if (eventObject.customEventName === "doubletab") {
      var delay = 300;
      var delayFunction = magicMethod.getFunction("delay");
      if (delayFunction) {
        delay = +(((_a = delayFunction.args) == null ? void 0 : _a[0]) || 0);
      }
      return (...args) => {
        if (!this.doubleTab) {
          this.doubleTab = {
            time: window.performance.now()
          };
        } else {
          if (window.performance.now() - this.doubleTab.time < delay) {
            callback(...args);
          }
          this.doubleTab = null;
        }
      };
    }
    return callback;
  }
  bindingDomEvent([eventName, dom, ...delegate], magicMethod, callback) {
    let eventObject = this.getDefaultEventObject(
      eventName,
      dom,
      delegate,
      magicMethod,
      callback
    );
    eventObject.callback = this.makeCustomEventCallback(
      eventObject,
      magicMethod,
      eventObject.callback
    );
    this.addDomEvent(eventObject, magicMethod, eventObject.callback);
  }
  getEventNames(eventName) {
    let results = [];
    eventName.split(NAME_SAPARATOR).forEach((e) => {
      var arr = e.split(NAME_SAPARATOR);
      results.push.apply(results, arr);
    });
    return results;
  }
  parseDomEvent(it) {
    const context = this.context;
    var arr = it.args;
    if (arr) {
      var eventNames = this.getEventNames(arr[0]);
      var callback = context[it.originalMethod].bind(context);
      for (let i = 0, len = eventNames.length; i < len; i++) {
        arr[0] = eventNames[i];
        this.bindingDomEvent(arr, it, callback);
      }
    }
  }
}
class ObserverHandler extends BaseHandler {
  initialize() {
    var _a, _b;
    if (this._observers && this.context.notEventRedefine) {
      return;
    }
    if (!this._observers || this._observers.length === 0) {
      this._observers = this.context.filterMethodes("observer");
    }
    if (!((_a = this._bindings) == null ? void 0 : _a.length) && ((_b = this._observers) == null ? void 0 : _b.length)) {
      this._observers.forEach((it) => this.parseObserver(it));
    }
  }
  destroy() {
    if (this.context.notEventRedefine)
      ;
    else {
      this.removeEventAll();
    }
  }
  removeEventAll() {
    this.getBindings().forEach((observer) => {
      this.disconnectObserver(observer);
    });
    this.initBindings();
  }
  disconnectObserver(observer) {
    observer == null ? void 0 : observer.disconnect();
  }
  getBindings() {
    if (!this._bindings) {
      this.initBindings();
    }
    return this._bindings;
  }
  addBinding(obj) {
    this.getBindings().push(obj);
  }
  initBindings() {
    this._bindings = [];
  }
  addObserver(observer) {
    this.addBinding(observer);
  }
  getDefaultDomElement(dom) {
    const context = this.context;
    let el;
    if (dom) {
      el = context.refs[dom] || context[dom] || window[dom];
    } else {
      el = context.el || context.$el || context.$root;
    }
    if (el instanceof Dom) {
      return el.getElement();
    }
    return el;
  }
  createObserver(magicMethod, callback) {
    var _a;
    const [observerType, observerTarget] = magicMethod.args || ["intersection"];
    const $target = this.getDefaultDomElement(observerTarget);
    const params = magicMethod.getFunction("params");
    const options = getVariable((_a = params == null ? void 0 : params.args) == null ? void 0 : _a[0]);
    let observer;
    switch (observerType) {
      case "intersection":
        if (options.root) {
          options.root = this.getDefaultDomElement(options.root);
        }
        observer = new window.IntersectionObserver(callback, options || {});
        observer.observe($target);
        break;
      case "mutation":
        observer = new window.MutationObserver(callback);
        observer.observe(
          $target,
          options || {
            attributes: true,
            characterData: true,
            childList: true
          }
        );
        break;
      case "performance":
        observer = new window.PerformanceObserver(callback);
        observer.observe(
          options || {
            entryTypes: ["paint"]
          }
        );
        break;
    }
    return observer;
  }
  bindingObserver(magicMethod, callback) {
    this.addObserver(this.createObserver(magicMethod, callback));
  }
  parseObserver(it) {
    const context = this.context;
    var originalCallback = context[it.originalMethod].bind(context);
    this.bindingObserver(it, originalCallback);
  }
}
class PropsHandler extends BaseHandler {
  getProps() {
    var _a, _b;
    if (!this._props) {
      this._props = this.context.filterMethodes("props");
    }
    if (!((_a = this._bindings) == null ? void 0 : _a.length) && ((_b = this._props) == null ? void 0 : _b.length)) {
      this._props.forEach((it) => this.parseProps(it));
    }
    return this.getBindings();
  }
  destroy() {
    this.removeAll();
  }
  getCallback(field) {
    return this.context[field];
  }
  removeAll() {
    this.initBindings();
  }
  getBindings() {
    if (!this._bindings) {
      this.initBindings();
    }
    return this._bindings;
  }
  addBinding(obj) {
    this.getBindings().push(obj);
  }
  initBindings() {
    this._bindings = [];
  }
  bindingProps(propsObject) {
    this.addBinding(propsObject);
  }
  createProps(magicMethod, originalCallback) {
    const [refKey] = magicMethod.args || [];
    if (!refKey) {
      return void 0;
    }
    return {
      ref: refKey,
      props: originalCallback()
    };
  }
  parseProps(it) {
    const context = this.context;
    var originalCallback = this.getCallback(it.originalMethod).bind(context);
    this.bindingProps(this.createProps(it, originalCallback));
  }
}
class StoreHandler extends BaseHandler {
  initialize() {
    var _a, _b;
    if (!this._callbacks) {
      this._callbacks = this.context.filterMethodes("subscribe");
    }
    if (!((_a = this._bindings) == null ? void 0 : _a.length) && ((_b = this._callbacks) == null ? void 0 : _b.length)) {
      this._callbacks.forEach((key) => this.parseSubscribe(key));
    }
  }
  destroy() {
    if (this.context.notEventRedefine)
      ;
    else {
      this.context.$store.offAll(this.context);
      this._callbacks = null;
    }
  }
  getCallback(field) {
    return this.context[field];
  }
  getBindings() {
    if (!this._bindings) {
      this.initBindings();
    }
    return this._bindings;
  }
  addBinding(obj) {
    this.getBindings().push(obj);
  }
  initBindings() {
    this._bindings = [];
  }
  createLocalCallback(event, callback) {
    var newCallback = callback.bind(this.context);
    newCallback.displayName = `${this.context.sourceName}.${event}`;
    newCallback.source = this.context.source;
    return newCallback;
  }
  parseSubscribe(magicMethod) {
    var _a, _b;
    const events = magicMethod.args.join(" ");
    const checkMethodList = [];
    const eventList = [];
    let debounce2 = 0;
    let throttle2 = 0;
    let isAllTrigger = false;
    let isSelfTrigger = false;
    let isFrameTrigger = false;
    const debounceFunction = magicMethod.getFunction("debounce");
    const throttleFunction = magicMethod.getFunction("throttle");
    const allTriggerFunction = magicMethod.getFunction("allTrigger");
    const selfTriggerFunction = magicMethod.getFunction("selfTrigger");
    const frameFunction = magicMethod.getFunction("frame");
    if (debounceFunction) {
      debounce2 = +(((_a = debounceFunction.args) == null ? void 0 : _a[0]) || 0);
    }
    if (throttleFunction) {
      throttle2 = +(((_b = throttleFunction.args) == null ? void 0 : _b[0]) || 0);
    }
    if (allTriggerFunction) {
      isAllTrigger = true;
    }
    if (selfTriggerFunction) {
      isSelfTrigger = true;
    }
    if (frameFunction) {
      isFrameTrigger = true;
    }
    magicMethod.keywords.forEach((keyword) => {
      const method = keyword;
      if (this.context[method]) {
        checkMethodList.push(method);
      } else {
        eventList.push(method);
      }
    });
    const originalCallback = this.context[magicMethod.originalMethod];
    [...eventList, events].filter(Boolean).forEach((e) => {
      var callback = this.createLocalCallback(e, originalCallback);
      this.context.$store.on(
        e,
        callback,
        this.context,
        debounce2,
        throttle2,
        isAllTrigger,
        isSelfTrigger,
        checkMethodList,
        isFrameTrigger
      );
    });
    this.addBinding(magicMethod);
  }
}
const _EventMachine = class extends HookMachine {
  constructor(opt, props, state) {
    super();
    __privateAdd(this, _reloadInstance);
    __privateAdd(this, _state, {});
    __privateAdd(this, _cachedMethodList, void 0);
    __privateAdd(this, _functionCache, {});
    __privateAdd(this, _childObjectList, {});
    __privateAdd(this, _childObjectElements, /* @__PURE__ */ new WeakMap());
    __privateAdd(this, _cachedChildren, /* @__PURE__ */ new WeakMap());
    __publicField$1(this, "registerRef", (ref, el) => {
      if (typeof ref === "function") {
        ref(el);
      } else if (isObject(ref)) {
        ref.value = el;
      } else {
        this.refs[ref] = el;
      }
    });
    __publicField$1(this, "registerChildComponent", (el, childComponent, id, oldEl) => {
      let isEq = false;
      if (el === oldEl) {
        isEq = true;
      }
      el = el || oldEl;
      if (!__privateGet(this, _childObjectElements).has(el)) {
        __privateGet(this, _childObjectList)[id] = el;
        __privateGet(this, _childObjectElements).set(el, childComponent);
      }
      if (__privateGet(this, _childObjectElements).has(oldEl) && !isEq) {
        __privateGet(this, _childObjectElements).delete(oldEl);
      } else {
        __privateGet(this, _childObjectList)[id] = el;
        __privateGet(this, _childObjectElements).set(el, childComponent);
      }
    });
    __publicField$1(this, "checkRefClass", (oldEl, newVNode) => {
      const props2 = newVNode.props;
      if (newVNode.isComponentChanged) {
        return true;
      }
      let targetInstance = this.getTargetInstance(oldEl);
      if (targetInstance) {
        if (targetInstance.isInstanceOf(newVNode.Component)) {
          if (newVNode.isComponentChanged) {
            return true;
          }
          if (targetInstance.isForceRender(props2)) {
            return true;
          }
          __privateMethod(this, _reloadInstance, reloadInstance_fn).call(this, targetInstance, props2);
          return false;
        } else {
          return true;
        }
      }
      return true;
    });
    this.refs = {};
    this.id = uuid();
    this.sourceId = uuid();
    this.initializeProperty(opt, props, state);
  }
  get renderer() {
    return this.$store.get(COMPONENT_ROOT_CONTEXT).renderer;
  }
  setId(id) {
    this.id = id;
  }
  initializeHandler() {
    return super.initializeHandler({
      DomEventHandler,
      ObserverHandler,
      StoreHandler,
      PropsHandler
    });
  }
  get firstChild() {
    return Object.values(this.children)[0];
  }
  checkProps(props = {}) {
    return props;
  }
  initializeProperty(opt, props = {}, state = {}) {
    this.opt = opt || {};
    this.parent = this.opt;
    this.source = this.id;
    this.sourceName = this.constructor.name;
    this.props = props;
    __privateSet(this, _state, Object.assign({}, __privateGet(this, _state), state));
  }
  setProps(props) {
    this.props = props;
  }
  createFunction(funcName, func) {
    if (isFunction(func) && !__privateGet(this, _functionCache)[funcName]) {
      __privateGet(this, _functionCache)[funcName] = func;
    }
    return __privateGet(this, _functionCache)[funcName];
  }
  runFunction(funcName, func) {
    const cachedFunction = this.createFunction(funcName, func);
    if (cachedFunction == null ? void 0 : cachedFunction.running) {
      return;
    }
    if (isFunction(cachedFunction)) {
      if (!cachedFunction.running) {
        cachedFunction.running = true;
        cachedFunction.call(this);
      }
    }
    return cachedFunction;
  }
  initState() {
    return {};
  }
  setState(state = {}, isRefresh = true) {
    __privateSet(this, _state, Object.assign({}, __privateGet(this, _state), state));
    if (Boolean(isRefresh) === true) {
      renderComponent(this);
    }
  }
  toggleState(key, isLoad = true) {
    this.setState(
      {
        [key]: !__privateGet(this, _state)[key]
      },
      isLoad
    );
  }
  changedProps(newProps) {
    return !vnodePropsDiff(this.props, newProps);
  }
  _reload(props) {
    if (this.changedProps(props)) {
      this.props = props;
      renderComponent(this);
    }
  }
  get state() {
    return __privateGet(this, _state);
  }
  get ref() {
    return this.props.ref;
  }
  get children() {
    return Object.fromEntries(
      Object.entries(__privateGet(this, _childObjectList)).map(([id, child]) => {
        return [id, __privateGet(this, _childObjectElements).get(child)];
      })
    );
  }
  setChildren(children2) {
    Object.entries(children2).forEach(([id, instance]) => {
      __privateGet(this, _childObjectList)[id] = instance.$el.el;
      __privateGet(this, _childObjectElements).set(instance.$el.el, instance);
    });
  }
  get isPreLoaded() {
    return true;
  }
  getTargetInstance(oldEl) {
    const targetList = Object.values(this.children).filter(Boolean).filter((instance) => {
      var _a;
      return (instance == null ? void 0 : instance.id) !== this.id && ((_a = instance == null ? void 0 : instance.$el) == null ? void 0 : _a.el) === oldEl;
    });
    if (targetList.length) {
      return targetList[0];
    }
    return void 0;
  }
  isForceRender() {
    return false;
  }
  isInstanceOf(...args) {
    return args.some((TargetClass) => this instanceof TargetClass);
  }
  getChildrenInstanceOf(localClass) {
    return Object.values(this.children).filter((child) => {
      return child.isInstanceOf(localClass);
    });
  }
  async forceRender() {
    this.cleanHooks();
    await renderComponent(this);
  }
  setParentElement(parentElement) {
    this.parentElement = parentElement;
  }
  is(name, callback) {
    return this.sourceName === name && callback(this);
  }
  async render($container, isForceRender = false) {
    renderComponent(this, $container);
  }
  initialize() {
    __privateSet(this, _state, this.initState());
  }
  getRef(...args) {
    const key = args.join("");
    return this.refs[key];
  }
  getVNodeOptions() {
    return {
      context: this,
      registerRef: this.registerRef,
      registerChildComponent: this.registerChildComponent,
      checkRefClass: this.checkRefClass
    };
  }
  getFunctionComponent() {
    return this;
  }
  refresh() {
    renderComponent(this);
  }
  afterRender() {
  }
  template() {
    return null;
  }
  clear() {
    Object.entries(__privateGet(this, _childObjectList)).forEach(([_key, child]) => {
      if (!child.parentNode) {
        const childInstance = __privateGet(this, _childObjectElements).get(child);
        if (childInstance) {
          childInstance.destroy();
          __privateGet(this, _childObjectElements).delete(child);
          delete __privateGet(this, _childObjectList)[_key];
        }
      }
    });
  }
  clearAll() {
    Object.entries(__privateGet(this, _childObjectList)).forEach(([_key, child]) => {
      const childInstance = __privateGet(this, _childObjectElements).get(child);
      if (childInstance) {
        childInstance.destroy();
        __privateGet(this, _childObjectElements).delete(child);
        delete __privateGet(this, _childObjectList)[_key];
      }
    });
  }
  destroy(isRemoveElement = false) {
    var _a;
    removeRenderCallback(this);
    Object.entries(__privateGet(this, _childObjectList)).forEach(([_key, child]) => {
      const childInstance = __privateGet(this, _childObjectElements).get(child);
      if (childInstance) {
        childInstance.destroy();
        __privateGet(this, _childObjectElements).delete(child);
        delete __privateGet(this, _childObjectList)[_key];
      }
    });
    this.runHandlers("destroy");
    if (isRemoveElement) {
      (_a = this.$el) == null ? void 0 : _a.remove();
      this.$el = null;
      this.onUnmounted();
    }
    this.onDestroyed();
    this.refs = {};
  }
  collectMethodes(refreshCache = false) {
    if (!__privateGet(this, _cachedMethodList) || refreshCache) {
      __privateSet(this, _cachedMethodList, collectProps(
        this,
        _EventMachine,
        (name) => MagicMethod.check(name)
      ).map((it) => {
        return MagicMethod.parse(it, this);
      }));
    }
    return __privateGet(this, _cachedMethodList);
  }
  filterMethodes(methodKey, refreshCache = false) {
    return this.collectMethodes(refreshCache).filter((it) => {
      return it.method === methodKey;
    });
  }
  getChildContent(filterCallback, defaultValue2 = "") {
    var _a;
    return ((_a = this.getChild(filterCallback)) == null ? void 0 : _a.props.content) || defaultValue2;
  }
  getChild(filterCallback) {
    return this.props.content.find(filterCallback);
  }
  runMounted() {
    this.onMounted();
  }
  runUpdated() {
    this.onUpdated();
  }
  onMounted() {
    var _a;
    super.onMounted();
    const instance = this.getTargetInstance((_a = this.$el) == null ? void 0 : _a.el);
    if (instance) {
      instance.onMounted();
    }
  }
  onUpdated() {
    var _a;
    super.onUpdated();
    const instance = this.getTargetInstance((_a = this.$el) == null ? void 0 : _a.el);
    if (instance) {
      instance.onUpdated();
    }
  }
  onDestroyed() {
    var _a;
    super.onDestroyed();
    const instance = this.getTargetInstance((_a = this.$el) == null ? void 0 : _a.el);
    if (instance) {
      instance.onDestroyed();
    }
  }
  onUnmounted() {
    var _a;
    super.onUnmounted();
    const instance = this.getTargetInstance((_a = this.$el) == null ? void 0 : _a.el);
    if (instance) {
      instance.onUnmounted();
    }
  }
  initMagicMethod(methodName, callback) {
    if (!this[methodName]) {
      this[methodName] = callback;
    }
  }
};
let EventMachine = _EventMachine;
_state = /* @__PURE__ */ new WeakMap();
_cachedMethodList = /* @__PURE__ */ new WeakMap();
_functionCache = /* @__PURE__ */ new WeakMap();
_childObjectList = /* @__PURE__ */ new WeakMap();
_childObjectElements = /* @__PURE__ */ new WeakMap();
_cachedChildren = /* @__PURE__ */ new WeakMap();
_reloadInstance = /* @__PURE__ */ new WeakSet();
reloadInstance_fn = function(instance, props) {
  instance._reload(props);
};
class BaseStore {
  constructor() {
    this.id = uuidShort();
    this.cachedCallback = {};
    this.callbacks = {};
    this.settings = /* @__PURE__ */ new Map();
  }
  get(key, defaultValue2 = void 0) {
    if (this.settings.has(key) === false) {
      return defaultValue2;
    }
    return this.settings.get(key);
  }
  set(key, value, hasChangeMessage = true) {
    const oldValue = this.settings.get(key);
    if (oldValue !== value) {
      this.settings.set(key, value);
      if (hasChangeMessage) {
        this.sendMessage(this, key, value);
      }
    }
  }
  init(key, value) {
    this.set(key, value, false);
  }
  toggle(key) {
    this.set(key, !this.get(key));
  }
  toggleWith(key, firstValue, secondValue) {
    if (this.get(key) === firstValue) {
      this.set(key, secondValue);
    } else {
      this.set(key, firstValue);
    }
  }
  true(key) {
    return this.get(key) === true;
  }
  false(key) {
    return this.get(key) === false;
  }
  is(key, value) {
    return this.get(key) === value;
  }
  remove(key) {
    this.settings.delete(key);
  }
  hasCallback(event, callback) {
    var list2 = this.getCachedCallbacks(event);
    return list2.some((f) => f.originalCallback === callback);
  }
  getCallbacks(event) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    return this.callbacks[event];
  }
  setCallbacks(event, list2 = []) {
    this.callbacks[event] = list2;
  }
  on(event, originalCallback, context, debounceDelay = 0, throttleDelay = 0, enableAllTrigger = false, enableSelfTrigger = false, beforeMethods = [], frame = false) {
    var callback = originalCallback;
    if (debounceDelay > 0)
      callback = debounce(originalCallback, debounceDelay);
    else if (throttleDelay > 0)
      callback = throttle(originalCallback, throttleDelay);
    if (beforeMethods.length) {
      callback = ifCheck(callback, context, beforeMethods);
    }
    if (frame) {
      callback = makeRequestAnimationFrame(
        callback,
        context,
        originalCallback.name
      );
    }
    this.getCallbacks(event).push({
      event,
      callback,
      context,
      originalCallback,
      enableAllTrigger,
      enableSelfTrigger
    });
    return () => {
      this.off(event, originalCallback);
    };
  }
  off(event, originalCallback) {
    if (arguments.length == 1) {
      this.setCallbacks(event);
    } else if (arguments.length == 2) {
      this.setCallbacks(
        event,
        this.getCallbacks(event).filter((f) => {
          return f.originalCallback !== originalCallback;
        })
      );
    }
  }
  offAll(context) {
    Object.keys(this.callbacks).forEach((event) => {
      this.setCallbacks(
        event,
        this.getCallbacks(event).filter((f) => {
          return f.context !== context;
        })
      );
    });
  }
  getCachedCallbacks(event) {
    return this.getCallbacks(event);
  }
  sendMessage(source, event, ...args) {
    this.sendMessageList(source, [[event, ...args]]);
  }
  runMessage(runnableFunction, args) {
    const result = runnableFunction.callback.apply(
      runnableFunction.context,
      args
    );
    if (isNotUndefined(result)) {
      if (result === false) {
        return;
      } else if (isFunction(result)) {
        result();
        return;
      }
    }
  }
  sendMessageList(source, messages = []) {
    window.Promise.resolve().then(() => {
      messages.forEach(([event, ...args]) => {
        var list2 = this.getCachedCallbacks(event);
        if (list2 && list2.length) {
          const runnableFunctions = list2.filter((f) => !f.enableSelfTrigger).filter(
            (f) => f.enableAllTrigger || f.originalCallback.source !== source
          );
          let i = runnableFunctions.length;
          while (i--) {
            const f = runnableFunctions[i];
            this.runMessage(f, args);
          }
        }
      });
    });
  }
  nextSendMessage(source, callback, ...args) {
    window.Promise.resolve().then(() => {
      callback(...args);
    });
  }
  triggerMessage(source, event, ...args) {
    window.Promise.resolve().then(() => {
      var list2 = this.getCachedCallbacks(event);
      if (list2) {
        const runnableFunctions = list2.filter(
          (f) => f.context.source === source
        );
        runnableFunctions.forEach((f) => {
          f.callback.apply(f.context, args);
        });
      }
    });
  }
  emit(event, ...args) {
    if (isFunction(event)) {
      event(...args);
    } else if (isArray(event)) {
      this.sendMessageList(this.source, event);
    } else {
      this.sendMessage(this.source, event, ...args);
    }
  }
  nextTick(callback) {
    this.nextSendMessage(this.source, callback);
  }
  trigger(event, ...args) {
    if (isFunction(event)) {
      event(...args);
    } else {
      this.triggerMessage(this.source, event, ...args);
    }
  }
}
const _UIElement = class extends EventMachine {
  constructor(opt, props = {}, state = {}) {
    super(opt, props, state);
    __privateAdd(this, _storeInstance, void 0);
    if (props.store) {
      __privateSet(this, _storeInstance, props.store);
    } else {
      if (!this.parent.$store) {
        __privateSet(this, _storeInstance, new BaseStore());
      }
    }
    this.created();
    this.initialize();
    this.initializeContext(opt, props, state);
  }
  initializeContext(opt, props = {}) {
    if (!opt) {
      this.$store.init(COMPONENT_ROOT_CONTEXT, props);
    }
  }
  currentContext() {
    return this.contexts[this.contexts.length - 1];
  }
  setStore(storeInstance) {
    __privateSet(this, _storeInstance, storeInstance);
  }
  get $store() {
    return __privateGet(this, _storeInstance) || this.parent.$store;
  }
  async created() {
  }
  createLocalCallback(event, callback) {
    var newCallback = callback.bind(this);
    newCallback.displayName = `${this.sourceName}.${event}`;
    newCallback.source = this.source;
    return newCallback;
  }
  emit(messageName, ...args) {
    this.$store.source = this.source;
    this.$store.sourceContext = this;
    this.$store.emit(messageName, ...args);
  }
  nextTick(callback, delay = 0) {
    window.setTimeout(() => {
      this.$store.nextTick(callback);
    }, delay);
  }
  trigger(messageName, ...args) {
    this.$store.source = this.source;
    this.$store.trigger(messageName, ...args);
  }
  runCallback(callback, ...args) {
    if (this.parent) {
      this.parent.trigger(callback, ...args);
    }
  }
  on(message, callback, debounceDelay = 0, throttleDelay = 0, enableAllTrigger = false, enableSelfTrigger = false, frame = false) {
    this.$store.on(
      message,
      callback,
      this.source,
      debounceDelay,
      throttleDelay,
      enableAllTrigger,
      enableSelfTrigger,
      [],
      frame
    );
  }
  off(message, callback) {
    this.$store.off(message, callback, this.source);
  }
  subscribe(callback, debounceSecond = 0, throttleSecond = 0) {
    const id = `subscribe.${uuidShort()}`;
    const newCallback = this.createLocalCallback(id, callback);
    this.$store.on(
      id,
      newCallback,
      this,
      debounceSecond,
      throttleSecond,
      false,
      true
    );
    return id;
  }
  static createFunctionElementInstance(NewFunctionComponent, parentInstance, props, state = {}) {
    class FunctionElement extends _UIElement {
      initializeProperty(opt, props2 = {}, state2 = {}) {
        super.initializeProperty(opt, props2, state2);
        this.sourceName = this.getFunctionComponent().name || this.sourceName;
      }
      getFunctionComponent() {
        return NewFunctionComponent;
      }
      isInstanceOf(...args) {
        return args.some((TargetClass) => NewFunctionComponent === TargetClass);
      }
      template() {
        return NewFunctionComponent.call(this, this.props);
      }
    }
    return new FunctionElement(parentInstance, props, state);
  }
  static createElementInstance(ElementClass, parent, props, state) {
    if (ElementClass.__proto__.name === "") {
      return _UIElement.createFunctionElementInstance(
        ElementClass,
        parent,
        props,
        state
      );
    } else {
      return new ElementClass(parent, props, state);
    }
  }
};
let UIElement = _UIElement;
_storeInstance = /* @__PURE__ */ new WeakMap();
function createComponentInstance(ComponentClass, parent, props, state) {
  return UIElement.createElementInstance(ComponentClass, parent, props, state);
}
const NumberStyleKeys$1 = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontSize: true,
  lineClamp: true,
  lineHeight: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zoom: true,
  width: true,
  maxWidth: true,
  maxHeight: true,
  height: true,
  top: true,
  left: true,
  right: true,
  bottom: true,
  border: true,
  borderWidth: true,
  borderRadius: true,
  padding: true,
  margin: true,
  paddingLeft: true,
  paddingRight: true,
  paddingTop: true,
  paddingBottom: true,
  marginLeft: true,
  marginRight: true,
  marginTop: true,
  marginBottom: true,
  gap: true,
  columnGap: true,
  rowGap: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
const styleKeys$1 = {};
const uppercasePattern$1 = /([A-Z])/g;
const convertStyleKey$1 = (key) => {
  if (styleKeys$1[key]) {
    return styleKeys$1[key];
  }
  const upperKey = key.replace(uppercasePattern$1, "-$1").toLowerCase();
  styleKeys$1[key] = upperKey;
  return upperKey;
};
const ArrayNumberStyleKeys = {
  padding: true,
  border: true,
  margin: true,
  boxShadow: true
};
function convertNumberStyleValue$1(key, value) {
  if (typeof value === "number") {
    if (NumberStyleKeys$1[key]) {
      value = value + "px";
    }
  } else if (isArray(value)) {
    if (ArrayNumberStyleKeys[key]) {
      value = value.map((v2) => convertNumberStyleValue$1(key, v2)).join(" ");
    }
  }
  return value;
}
function styleKeyMap(key) {
  return convertStyleKey$1(key);
}
function css(style2) {
  const newStyles = {};
  Object.keys(style2).forEach((styleKey) => {
    newStyles[styleKeyMap(styleKey)] = convertNumberStyleValue$1(
      styleKey,
      style2[styleKey]
    );
  });
  return newStyles;
}
const EXPECT_ATTRIBUTES = {
  memoizedProps: true,
  parentElement: true,
  el: true,
  children: true,
  instance: true
};
function stringifyStyle$1(styleObject) {
  const newStyle = css(styleObject);
  return Object.keys(newStyle).map((key) => {
    return `${key}: ${newStyle[key]};`;
  }).join(" ");
}
function isEqual(obj1, obj2, count = 0, omitKeys = {}) {
  if (isFunction(obj1) && isFunction(obj2)) {
    return false;
  }
  const obj1Keys = Object.keys(obj1).filter(
    (key) => omitKeys[key] === void 0
  );
  const obj2Keys = Object.keys(obj2).filter(
    (key) => omitKeys[key] === void 0
  );
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }
  if (obj1Keys.length === 0 && obj2Keys.length === 0) {
    return true;
  }
  return obj1Keys.every((key) => {
    if (omitKeys[key]) {
      return true;
    }
    const obj1Value = obj1[key];
    const obj2Value = obj2[key];
    if (isArray(obj1Value) && isArray(obj2Value)) {
      if (obj1Value.length !== obj2Value.length) {
        return false;
      }
      if (obj1Value.length === 0 && obj2Value.length === 0) {
        return true;
      }
      const isTrue = obj1Value.every((value, index2) => {
        return isEqual(value, obj2Value[index2], count + 1, omitKeys);
      });
      return isTrue;
    } else if (isObject(obj1Value) && isObject(obj2Value)) {
      if (obj1Value instanceof EventMachine) {
        return obj1Value === obj2Value;
      }
      return isEqual(obj1Value, obj2Value, count + 1, omitKeys);
    }
    const result = obj1Value === obj2Value;
    return result;
  });
}
function vnodePropsDiff(oldProps, newProps) {
  return isEqual(oldProps, newProps, 0, EXPECT_ATTRIBUTES);
}
class VNode {
  constructor(type, tag, props, children2, Component) {
    this.type = type;
    this.tag = tag;
    this.nodeName = tag == null ? void 0 : tag.toUpperCase();
    this.props = props;
    this.children = children2;
    this.Component = Component;
    this.initializeProps();
    this.initializeChildren();
  }
  clone() {
    return new VNode(
      this.type,
      this.tag,
      { ...this.props },
      this.children.map((it) => it.clone()),
      this.Component
    );
  }
  find(callback) {
    return this.props.content.find(callback);
  }
  mounted() {
  }
  runMounted() {
    if (this.mounted) {
      if (!this.runnedMounted) {
        requestAnimationFrame(() => {
          this.mounted();
        });
        this.runnedMounted = true;
      } else {
        this.mounted();
      }
    }
  }
  runUpdated() {
    if (this.updated) {
      if (!this.runnedUpdated) {
        requestAnimationFrame(() => {
          this.updated();
        });
        this.runnedUpdated = true;
      } else {
        this.updated();
      }
    }
  }
  get stringifyStyle() {
    return this.memoizedProps.style;
  }
  initializeProps() {
    const newProps = Object.assign({}, this.props);
    if (!this.Component) {
      if (isObject(newProps.style)) {
        newProps.style = stringifyStyle$1(newProps.style);
      }
      if (newProps.className) {
        newProps.class = newProps.className;
        delete newProps.className;
      }
      this.memoizedProps = newProps;
    }
    if (this.props.enableHtml) {
      this.enableHtml = this.props.enableHtml;
      delete this.props.enableHtml;
    }
  }
  initializeChildren() {
    var _a;
    if (isArray(this.children)) {
      if ((_a = this.props.content) == null ? void 0 : _a.length)
        return;
      this.children = this.children.filter(isValue).map((child) => {
        if (isString(child) || isNumber(child)) {
          return createVNodeText(child);
        }
        return child;
      });
      this.props.content = this.children;
    }
  }
  setParentElement(parentElement) {
    this.parentElement = parentElement;
  }
  getContextProps(context, props) {
    const newProps = context.filterFunction("getProps").flat(Infinity);
    const newPropList = newProps.filter((it) => {
      return it.ref === props.ref;
    });
    newPropList.forEach((it) => {
      if (isObject(it.props)) {
        Object.assign(props, it.props);
      }
    });
  }
  makeText(divider = "") {
    const arr = this.children.map((child) => child.makeText(divider)).flat(Infinity);
    return arr.join(divider);
  }
  isType(type) {
    return this.type === type;
  }
  hasComponent() {
    return this.children.length === 1 && this.children[0].type === VNodeType.COMPONENT;
  }
  hasFragment() {
    return this.children.length === 1 && this.children[0].type === VNodeType.FRAGMENT;
  }
  get firstChild() {
    return this.children[0];
  }
  get lastChild() {
    return this.children[this.children.length - 1];
  }
}
class VNodeText extends VNode {
  constructor(value) {
    super(VNodeType.TEXT, null, {});
    this.value = value;
  }
  clone() {
    return new VNodeText(this.value);
  }
  get textContent() {
    return this.value;
  }
  runMounted() {
  }
  runUpdated() {
  }
  makeText() {
    return this.value;
  }
}
class VNodeComment extends VNode {
  constructor(value) {
    super(VNodeType.COMMENT, null, {});
    this.value = value;
  }
  clone() {
    return new VNodeComment(this.value);
  }
  get textContent() {
    return this.value;
  }
  runMounted() {
  }
  runUpdated() {
  }
  makeText() {
    return "";
  }
}
class VNodeFragment extends VNode {
  constructor(props = {}, children2) {
    super(VNodeType.FRAGMENT, "fragment", props || {}, children2);
  }
  clone() {
    return new VNodeFragment(
      this.props,
      this.children.map((it) => it.clone())
    );
  }
}
class VNodeComponent extends VNode {
  constructor(props = {}, children2, Component) {
    super(VNodeType.COMPONENT, "object", props || {}, children2);
    this.Component = Component;
    this.LastComponent = Component;
    this.instance = null;
  }
  clone() {
    return new VNodeComponent(
      this.props,
      this.children.map((it) => it.clone()),
      this.Component
    );
  }
  isFunctionComponent() {
    return this.LastComponent.__proto__.name === "";
  }
  mounted() {
    var _a;
    (_a = this.instance) == null ? void 0 : _a.onMounted();
  }
  updated() {
    var _a;
    (_a = this.instance) == null ? void 0 : _a.onUpdated();
  }
  getModule() {
    if (this.Component.__timestamp) {
      const a = getModule(this.Component);
      return a;
    }
    return this.Component;
  }
  setInstance(instance) {
    this.instance = instance;
  }
  get isComponentChanged() {
    const localComponent = this.getModule();
    if (!localComponent)
      return false;
    return this.LastComponent !== this.getModule();
  }
  makeClassInstance(options) {
    var _a;
    const props = { ...this.props };
    if (props.ref) {
      this.getContextProps(options.context, props);
    }
    const newComponent = this.getModule() || this.Component;
    this.LastComponent = newComponent;
    const oldInstance = this.instance;
    const hooks = oldInstance == null ? void 0 : oldInstance.copyHooks();
    const state = oldInstance == null ? void 0 : oldInstance.state;
    const oldId = oldInstance == null ? void 0 : oldInstance.id;
    const children2 = (oldInstance == null ? void 0 : oldInstance.children) || {};
    this.instance = createComponentInstance(
      newComponent,
      options.context,
      props,
      state
    );
    if (oldId) {
      this.instance.setId(oldId);
    }
    if (hooks && ((_a = hooks.__stateHooks) == null ? void 0 : _a.length)) {
      this.instance.reloadHooks(hooks);
    }
    if (state) {
      this.instance.setState(state, false);
    }
    if (Object.keys(children2).length) {
      this.instance.setChildren(children2);
    }
    oldInstance == null ? void 0 : oldInstance.destroy();
    return this.instance;
  }
  template() {
    var _a;
    return (_a = this.instance) == null ? void 0 : _a.template();
  }
  makeText() {
    return "";
  }
}
function createVNode({ tag, props = {}, children: children2 }) {
  return new VNode(VNodeType.NODE, tag, props, children2);
}
function createVNodeComponent({ props = {}, children: children2, Component }) {
  if (typeof Component === "undefined") {
    throw new Error("Component is undefined");
  }
  return new VNodeComponent(props, children2, Component);
}
function createVNodeFragment({ props = {}, children: children2 }) {
  return new VNodeFragment(props, children2);
}
function createVNodeText(text) {
  return new VNodeText(text);
}
function createVNodeComment(text) {
  return new VNodeComment(text);
}
let TEMP_COMMENT;
function makeTempComment() {
  if (!TEMP_COMMENT) {
    TEMP_COMMENT = document.createComment("");
  }
  return TEMP_COMMENT;
}
function makeNativeCommentDom(value) {
  const text = makeTempComment().cloneNode();
  text.textContent = value;
  return text;
}
function createElement$3(vNodeInstance) {
  return makeNativeCommentDom(vNodeInstance.value);
}
function makeElement$4(vNodeInstance) {
  vNodeInstance.el = createElement$3(vNodeInstance);
  return vNodeInstance;
}
function VNodeCommentRender$1(vNodeInstance, withChildren, options) {
  return makeElement$4(vNodeInstance);
}
const SVG_ELEMENTS = {
  svg: true,
  g: true,
  path: true,
  rect: true,
  circle: true,
  ellipse: true,
  line: true,
  polyline: true,
  polygon: true,
  text: true,
  tspan: true,
  textPath: true,
  tref: true,
  defs: true,
  clipPath: true,
  mask: true,
  pattern: true,
  image: true,
  linearGradient: true,
  radialGradient: true,
  stop: true,
  animate: true,
  animateMotion: true,
  animateColor: true,
  animateTransform: true,
  mpath: true,
  set: true,
  use: true,
  desc: true,
  metadata: true,
  title: true,
  marker: true,
  symbol: true,
  view: true,
  foreignObject: true,
  switch: true,
  link: true
};
const SVG_ELEMENTS_LIST = {};
Object.keys(SVG_ELEMENTS).forEach((key) => {
  SVG_ELEMENTS_LIST[key.toLowerCase()] = true;
  SVG_ELEMENTS_LIST[key.toUpperCase()] = true;
});
function isSVG(tagName) {
  return !!SVG_ELEMENTS[tagName];
}
function insertElement(childVNode, fragment, parentElement, withChildren, options = {}, isFragmentItem = false) {
  if (childVNode instanceof VNode || (childVNode == null ? void 0 : childVNode.makeElement)) {
    childVNode.setParentElement(parentElement);
    const el = DomRenderer(childVNode, options).el;
    if (el) {
      el[IS_FRAGMENT_ITEM] = isFragmentItem;
      fragment.appendChild(el);
    }
  } else if (isArray(childVNode)) {
    childVNode.forEach((it) => {
      if (it) {
        insertElement(
          it,
          fragment,
          parentElement,
          withChildren,
          options,
          isFragmentItem
        );
      }
    });
  } else if (isFunction(childVNode)) {
    const result = childVNode();
    if (result) {
      insertElement(
        result,
        fragment,
        parentElement,
        withChildren,
        options,
        isFragmentItem
      );
    }
  } else if (isValue(childVNode)) {
    fragment.appendChild(document.createTextNode(childVNode));
  } else
    ;
}
function makeChildren(vnode, withChildren, options, isFragmentItem = false) {
  const parentElement = vnode.el;
  const children2 = vnode.children;
  if (children2 && children2.length) {
    const fragment = document.createDocumentFragment();
    insertElement(
      children2,
      fragment,
      parentElement,
      withChildren,
      options,
      isFragmentItem
    );
    parentElement.appendChild(fragment);
    children2.forEach((child) => {
      if (isArray(child)) {
        child.forEach((it) => {
          if (isFunction(it == null ? void 0 : it.runMounted)) {
            it.runMounted();
          }
        });
      } else if (child) {
        if (isFunction(child == null ? void 0 : child.runMounted)) {
          child.runMounted();
        }
      }
    });
  }
}
let nativeDomCache = {};
const expectAttributes = {
  content: true
};
const ENABLE_PROPERTY = {
  indeterminate: true
};
function setAttribute(el, name, value) {
  if (expectAttributes[name])
    return;
  if (ENABLE_PROPERTY[name]) {
    el[name] = value;
  } else {
    el.setAttribute(name, value);
  }
}
function removeAttribute(el, name) {
  if (ENABLE_PROPERTY[name]) {
    el[name] = false;
  } else {
    el.removeAttribute(name);
  }
}
function setEventAttribute(el, name, value) {
  el[name.toLowerCase()] = value;
}
function setStyle(el, key, value) {
  if (key.indexOf("--") === 0) {
    if (typeof value === "undefined") {
      el.style.removeProperty(key);
    } else {
      el.style.setProperty(key, value);
    }
  } else {
    el.style[key] = value;
  }
}
function makeNativeDom(name) {
  if (!nativeDomCache[name]) {
    const el = isSVG(name) ? document.createElementNS("http://www.w3.org/2000/svg", name) : document.createElement(name);
    nativeDomCache[name] = el;
  }
  return nativeDomCache[name].cloneNode(false);
}
function createElement$2(vNodeInstance) {
  return makeNativeDom(vNodeInstance.tag);
}
function getContextProps$1(context, props) {
  const newProps = context.filterFunction("getProps").flat(Infinity);
  const newPropList = newProps.filter((it) => {
    return it.ref === props.ref;
  });
  newPropList.forEach((it) => {
    if (isObject(it.props)) {
      Object.assign(props, it.props);
    }
  });
}
function makeElement$3(vNodeInstance, withChildren, options) {
  const el = createElement$2(vNodeInstance);
  let props = vNodeInstance.memoizedProps;
  if (props) {
    if (props.ref) {
      getContextProps$1(options.context, props);
      vNodeInstance.ref = props.ref;
      if (vNodeInstance.ref instanceof RefClass) {
        vNodeInstance.ref.setCurrent(el);
      }
      isFunction(options.registerRef) && options.registerRef(props.ref, el);
    }
    Object.keys(props).forEach((key) => {
      const value = props[key];
      if (key === "style") {
        if (isString(value)) {
          el.style.cssText = value;
        } else {
          if (isObject(value) && Object.keys(value).length) {
            const styleValues = css(value);
            Object.entries(styleValues).forEach(([localKey, value2]) => {
              setStyle(el, localKey, value2);
            });
          } else {
            removeAttribute(el, "style");
          }
        }
      } else {
        if (key) {
          if (value !== void 0) {
            if (key.startsWith("on")) {
              setEventAttribute(el, key, value);
            } else {
              setAttribute(el, key, value);
            }
          }
        }
      }
    });
  }
  vNodeInstance.el = el;
  makeChildren(vNodeInstance, withChildren, options);
  return vNodeInstance;
}
function VNodeElementRender$1(vNodeInstance, withChildren, options) {
  return makeElement$3(vNodeInstance, withChildren, options);
}
function makeElement$2(obj, withChildren, options) {
  if (obj.el)
    return this;
  const el = document.createDocumentFragment();
  obj.el = el;
  makeChildren(obj, withChildren, options, true);
  return obj;
}
function VNodeFragmentRender$1(obj, withChildren, options) {
  return makeElement$2(obj, withChildren, options);
}
let TEMP_TEXT;
function makeTempText() {
  if (!TEMP_TEXT) {
    TEMP_TEXT = document.createTextNode("");
  }
  return TEMP_TEXT;
}
function makeNativeTextDom(value) {
  const text = makeTempText().cloneNode();
  text.textContent = value;
  return text;
}
function createElement$1(obj) {
  return makeNativeTextDom(obj.value);
}
function makeElement$1(obj) {
  obj.el = createElement$1(obj);
  return obj;
}
function VNodeTextRender$1(obj) {
  return makeElement$1(obj);
}
const RendererList$1 = {
  [VNodeType.TEXT]: VNodeTextRender$1,
  [VNodeType.NODE]: VNodeElementRender$1,
  [VNodeType.FRAGMENT]: VNodeFragmentRender$1,
  [VNodeType.COMPONENT]: VNodeComponentRender$1,
  [VNodeType.COMMENT]: VNodeCommentRender$1
};
function VNodeRender$1(vNodeInstance, withChildren, options) {
  if (isBoolean(options)) {
    throw new Error("options is boolean");
  }
  const CurrentRenderer = RendererList$1[vNodeInstance.type];
  if (CurrentRenderer) {
    return CurrentRenderer(vNodeInstance, withChildren, options);
  }
  return null;
}
function DomRenderer(obj, options = {}) {
  var _a;
  if (isString(obj)) {
    obj = createVNodeText(obj);
  }
  if (isArray(obj) && obj.length === 1) {
    return DomRenderer(obj[0], options);
  }
  if (obj) {
    return Dom.create((_a = VNodeRender$1(obj, true, options)) == null ? void 0 : _a.el);
  }
  return obj;
}
const IGNORE_SET_PROPS = {
  cx: true,
  cy: true
};
function isIgnoreProperty(key) {
  return IGNORE_SET_PROPS[key];
}
const booleanTypes = new Map(
  Object.entries({
    checked: true,
    disabled: true,
    selected: true,
    readonly: true,
    required: true,
    multiple: true,
    open: true,
    hidden: true,
    spellcheck: true,
    autofocus: true,
    autoplay: true,
    controls: true,
    loop: true,
    muted: true,
    default: true,
    defer: true,
    async: true,
    allowfullscreen: true,
    allowtransparency: true,
    allowpaymentrequest: true
  })
);
const expectKeys = {
  content: true,
  ref: true,
  [IS_FRAGMENT_ITEM]: true
};
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const KEY_STYLE = "style";
const KEY_CLASS = "class";
const PREFIX_EVENT = "on";
function isBooleanType(key) {
  return booleanTypes.has(key);
}
const patch = {
  setBooleanProp(el, name, value) {
    if (isNotUndefined(value)) {
      el.setAttribute(name, name);
      if (isIgnoreProperty(name))
        return;
      el[name] = value;
    } else {
      el.removeAttribute(name);
      if (isIgnoreProperty(name))
        return;
      el[name] = void 0;
    }
  },
  setProp(el, name, value) {
    if (isBooleanType(name)) {
      this.setBooleanProp(el, name, value);
    } else if (name.startsWith(PREFIX_EVENT)) {
      el[name.toLowerCase()] = value;
    } else if (name === KEY_STYLE) {
      const oldStyle = el.style.cssText;
      if (oldStyle != value) {
        el.style.cssText = value;
      } else if (oldStyle === "" && value === "") {
        this.removeProp(el, name);
      }
    } else if (name === KEY_CLASS) {
      if (el[name] === "" && value === "") {
        this.removeProp(el, name);
      } else {
        el.setAttribute(name, value);
      }
    } else {
      el.setAttribute(name, value);
      if (isSVG(el.tagName))
        return;
      el[name] = value;
    }
  },
  removeProp(el, name) {
    el.removeAttribute(name);
    if (name == KEY_STYLE)
      return;
    if (isBooleanType(name)) {
      el[name] = false;
    } else if (name) {
      el[name] = void 0;
    }
  },
  updateProp(node, name, newValue, oldValue) {
    if (isUndefined(newValue)) {
      if (oldValue) {
        this.removeProp(node, name);
      }
    } else if (!oldValue || newValue != oldValue) {
      this.setProp(node, name, newValue);
    }
  },
  makeComponent(oldEl, newVNode, options) {
    var _a;
    let oldInstance = oldEl[COMPONENT_INSTANCE];
    const isRootElement = ((_a = options.context.$el) == null ? void 0 : _a.el) === oldEl;
    newVNode.setInstance(oldInstance);
    newVNode.makeClassInstance(options);
    const instance = newVNode.instance;
    instance.$el = Dom.create(oldEl);
    instance.setParentElement(oldEl.parentElement);
    renderVNodeComponent(instance);
    if (isRootElement) {
      options.context.$el.el = oldEl;
    }
    if (isFunction(options.registerChildComponent)) {
      options.registerChildComponent(
        instance.$el.el,
        instance,
        instance.id,
        oldEl
      );
    }
  },
  makeComponentForFragment(oldInstance, newVNode, options) {
    newVNode.setInstance(oldInstance);
    newVNode.makeClassInstance(options);
    const instance = newVNode.instance;
    instance.$el = oldInstance.$el;
    instance.setParentElement(oldInstance.parentElement);
    renderVNodeComponent(instance);
    if (isFunction(options.registerChildComponent)) {
      options.registerChildComponent(
        instance.$el.el,
        instance,
        instance.id,
        oldInstance.$el.el
      );
    }
  },
  replaceWith(oldEl, newVNode, options) {
    const isRootElement = options.context.$el.el === oldEl;
    const objectElement = DomRenderer(newVNode, options).el;
    if (isRootElement) {
      options.context.$el.el = objectElement;
    }
    oldEl.replaceWith(objectElement);
    newVNode.runMounted();
  },
  replaceText(oldEl, newVNode) {
    if (oldEl.textContent != newVNode.textContent) {
      oldEl.textContent = newVNode.textContent;
    }
  },
  replaceComment(oldEl, newVNode) {
    patch.replaceText(oldEl, newVNode);
  },
  updateFragmentItem(el, isFragmentItem = false) {
    el[IS_FRAGMENT_ITEM] = isFragmentItem;
  },
  addNewVNode(parentElement, oldEl, newVNode, options) {
    parentElement.insertBefore(DomRenderer(newVNode, options).el, oldEl);
    parentElement.removeChild(oldEl);
    newVNode.runMounted();
  },
  appendChild(el, newVNode, options, isFragmentItem = false) {
    const newVNodeInstance = DomRenderer(newVNode, options);
    if (newVNodeInstance == null ? void 0 : newVNodeInstance.el) {
      if (isFragmentItem) {
        patch.updateFragmentItem(newVNodeInstance.el, isFragmentItem);
      }
      el.appendChild(newVNodeInstance.el);
      newVNode.runMounted();
    }
  },
  insertAfter(beforeElement, newVNode, options, isFragmentItem = false) {
    const newVNodeInstance = DomRenderer(newVNode, options);
    if (newVNodeInstance == null ? void 0 : newVNodeInstance.el) {
      if (isFragmentItem) {
        patch.updateFragmentItem(newVNodeInstance.el, isFragmentItem);
      }
      beforeElement.parentNode.insertBefore(
        newVNodeInstance.el,
        beforeElement.nextSibling
      );
      newVNode.runMounted();
    }
  },
  removeChild(parentElement, oldEl) {
    parentElement.removeChild(oldEl);
  }
};
const check = {
  isTextNode(node) {
    return node.nodeType === TEXT_NODE;
  },
  isCommentNode(node) {
    return node.nodeType === COMMENT_NODE;
  },
  isElementNode(node) {
    return node.nodeType === 1;
  },
  isVNodeText(node) {
    return node.type === VNodeType.TEXT;
  },
  isVNodeComment(node) {
    return node.type === VNodeType.COMMENT;
  },
  changed(vNode, node2) {
    return (vNode.type === VNodeType.TEXT || vNode.type === VNodeType.COMMENT) && vNode.textContent !== node2.textContent || vNode.nodeName !== node2.nodeName.toUpperCase();
  },
  hasPassed(vNode) {
    return vNode == null ? void 0 : vNode.pass;
  },
  hasRefClass(vNode) {
    return vNode.Component;
  }
};
const updateProps = (node, newProps = {}, oldProps = {}, options = {}, newVNode) => {
  const newPropsKeys = Object.keys(newProps);
  const oldPropsKeys = Object.keys(oldProps);
  if (newPropsKeys.length === 0 && oldPropsKeys.length === 0) {
    return;
  }
  if (newProps.ref) {
    if (newVNode.ref instanceof RefClass) {
      newVNode.ref.setCurrent(node);
    }
    isFunction(options.registerRef) && options.registerRef(newProps.ref, node);
  }
  newPropsKeys.filter((key) => !expectKeys[key]).forEach((key) => {
    const newValue = newProps[key];
    let oldValue;
    if (key === KEY_STYLE) {
      oldValue = node.style.cssText;
    } else {
      oldValue = oldProps[key];
    }
    patch.updateProp(node, key, newValue, oldValue);
  });
  oldPropsKeys.filter((key) => !expectKeys[key]).forEach((key) => {
    if (isUndefined(newProps[key])) {
      let oldValue;
      if (key === "style") {
        oldValue = node.style.cssText;
      } else {
        oldValue = oldProps[key];
      }
      if (oldValue) {
        patch.removeProp(node, key);
      }
    }
  });
};
function getProps$1(oldEl, attributes, newProps) {
  var results = {};
  const len = attributes.length;
  for (let i = 0; i < len; i++) {
    const t = attributes[i];
    const name = t.name;
    const value = t.value;
    results[name] = value;
  }
  const newPropKeys = Object.keys(newProps);
  for (let i = 0; i < newPropKeys.length; i++) {
    const key = newPropKeys[i];
    const checkKey = key.startsWith(PREFIX_EVENT) ? key.toLowerCase() : key;
    if (!results[checkKey]) {
      results[key] = oldEl[checkKey];
    }
  }
  return results;
}
function updateChangedElement(parentElement, oldEl, newVNode, options = {}) {
  if (check.isTextNode(oldEl) && !check.isVNodeText(newVNode) || check.isCommentNode(oldEl) && !check.isVNodeComment(newVNode)) {
    patch.addNewVNode(parentElement, oldEl, newVNode, options);
  } else if (!check.isTextNode(oldEl) && check.isVNodeText(newVNode) || !check.isCommentNode(oldEl) && check.isVNodeComment(newVNode)) {
    patch.addNewVNode(parentElement, oldEl, newVNode, options);
  } else if (check.isTextNode(oldEl) && check.isVNodeText(newVNode)) {
    patch.replaceText(oldEl, newVNode);
  } else if (check.isCommentNode(oldEl) && check.isVNodeComment(newVNode)) {
    patch.replaceComment(oldEl, newVNode);
  } else {
    if (check.hasRefClass(newVNode)) {
      if (isFunction(options.checkRefClass) && options.checkRefClass(oldEl, newVNode)) {
        patch.makeComponent(oldEl, newVNode, options);
      }
    } else {
      patch.replaceWith(oldEl, newVNode, options);
    }
  }
  return true;
}
function updatePropertyAndChildren(oldEl, newVNode, options = {}) {
  const newVNodeProps = newVNode.memoizedProps;
  updateProps(
    oldEl,
    newVNodeProps,
    getProps$1(oldEl, oldEl.attributes, newVNodeProps),
    options,
    newVNode
  );
  updateChildren(oldEl, newVNode, options);
}
function updateChildren(parentElement, newVNode, options = {}) {
  var _a;
  if (!(parentElement == null ? void 0 : parentElement.hasChildNodes()) && !newVNode.children.length) {
    return;
  }
  var oldChildren = children$1(parentElement);
  var newChildren = vNodeChildren(newVNode);
  if (newVNode.hasComponent()) {
    const hasFragmentItem = oldChildren.some((it) => it[IS_FRAGMENT_ITEM]);
    if (hasFragmentItem) {
      const findChildren = options.context.getChildrenInstanceOf(
        (_a = newVNode.firstChild) == null ? void 0 : _a.LastComponent
      );
      if (findChildren.length) {
        renderVNodeComponent(findChildren[0]);
        return;
      }
    }
  }
  var max = Math.max(oldChildren.length, newChildren.length);
  if (max === 0) {
    return;
  }
  if (oldChildren.length === 0 && newChildren.length > 0) {
    var fragment = document.createDocumentFragment();
    newChildren.forEach((it) => {
      const retElement = DomRenderer(it, options).el;
      if (retElement) {
        fragment.appendChild(retElement);
      }
    });
    parentElement.appendChild(fragment);
    newChildren.forEach((it) => {
      if (isFunction(it.runMounted)) {
        it.runMounted();
      }
    });
  } else if (oldChildren.length > 0 && newChildren.length === 0) {
    parentElement.textContent = "";
  } else {
    for (var i = 0; i < max; i++) {
      updateElement(parentElement, oldChildren[i], newChildren[i], options);
    }
  }
}
function updateFragment(parentElement, oldChild, newChild, options = {}) {
  let filteredInstance = null;
  let parentClassInstance = parentElement[COMPONENT_INSTANCE];
  const children2 = (parentClassInstance == null ? void 0 : parentClassInstance.children) || {};
  Object.entries(children2).forEach(([, instance]) => {
    if (newChild.isType(VNodeType.COMPONENT)) {
      filteredInstance = instance;
    }
  });
  if (filteredInstance) {
    patch.makeComponentForFragment(
      filteredInstance,
      newChild,
      parentElement[COMPONENT_INSTANCE].getVNodeOptions()
    );
    return;
  }
  let lastElement = null;
  const childMaxCount = Math.max(
    oldChild.items.length,
    newChild.children.length
  );
  for (var childIndex = 0; childIndex < childMaxCount; childIndex++) {
    const oldChildItem = oldChild.items[childIndex];
    const newChildItem = newChild.children[childIndex];
    if (oldChildItem)
      lastElement = oldChildItem;
    updateElementWithFragment(
      parentElement,
      oldChildItem,
      newChildItem,
      options,
      lastElement
    );
  }
}
function updateChildrenWithFragment(parentElement, oldChildren = [], newVNode, options = {}) {
  if (!oldChildren.length && !newVNode.children.length) {
    return;
  }
  var newChildren = vNodeChildren(newVNode);
  var max = Math.max(oldChildren.length, newChildren.length);
  if (max === 0) {
    return;
  }
  if (oldChildren.length === 0 && newChildren.length > 0) {
    var fragment = document.createDocumentFragment();
    newChildren.forEach((it) => {
      const retElement = DomRenderer(it, options).el;
      if (retElement) {
        fragment.appendChild(retElement);
      }
    });
    parentElement.appendChild(fragment);
    newChildren.forEach((it) => {
      if (isFunction(it.runMounted)) {
        it.runMounted();
      }
    });
  } else if (oldChildren.length > 0 && newChildren.length === 0) {
    parentElement.textContent = "";
  } else {
    for (var i = 0; i < max; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];
      if (!oldChild && newChild) {
        updateElement(parentElement, oldChild, newChild, options);
      } else if (oldChild && !newChild) {
        updateElement(parentElement, oldChild.items, newChild, options);
      } else {
        if (oldChild.type === CHILD_ITEM_TYPE_FRAGMENT) {
          updateFragment(parentElement, oldChild, newChild, options);
        } else if (oldChild.type === CHILD_ITEM_TYPE_ELEMENT) {
          updateElement(parentElement, oldChild.items, newChild, options);
        }
      }
    }
  }
}
function updateElement(parentElement, oldEl, newVNode, options = {}) {
  var _a;
  if (!newVNode && !oldEl) {
    return;
  }
  parentElement = parentElement || options.context.parentElement;
  if (!oldEl && newVNode) {
    patch.appendChild(parentElement, newVNode, options);
    return;
  }
  if (!newVNode && oldEl) {
    patch.removeChild(parentElement, oldEl, options);
    return;
  }
  if (!((_a = newVNode == null ? void 0 : newVNode.props) == null ? void 0 : _a.pass)) {
    if (check.hasPassed(newVNode)) {
      return;
    }
    if (check.changed(newVNode, oldEl) || check.hasRefClass(newVNode)) {
      updateChangedElement(parentElement, oldEl, newVNode, options);
      return;
    }
  }
  const newNodeType = newVNode.type;
  if (newNodeType !== VNodeType.TEXT && newNodeType !== VNodeType.COMMENT) {
    updatePropertyAndChildren(oldEl, newVNode, options);
  }
}
function updateElementWithFragment(parentElement, oldEl, newVNode, options = {}, lastElement) {
  var _a;
  if (!newVNode && !oldEl) {
    return;
  }
  parentElement = parentElement || options.context.parentElement;
  if (!oldEl && newVNode) {
    if (!lastElement) {
      patch.appendChild(parentElement, newVNode, options, true);
    } else {
      patch.insertAfter(lastElement, newVNode, options, true);
    }
    return;
  }
  if (!newVNode && oldEl) {
    patch.removeChild(parentElement, oldEl, options);
    return;
  }
  if (!((_a = newVNode == null ? void 0 : newVNode.props) == null ? void 0 : _a.pass)) {
    if (check.hasPassed(newVNode)) {
      return;
    }
    if (check.changed(newVNode, oldEl) || check.hasRefClass(newVNode)) {
      updateChangedElement(parentElement, oldEl, newVNode, options);
      return;
    }
  }
  const newNodeType = newVNode.type;
  if (newNodeType !== VNodeType.TEXT && newNodeType !== VNodeType.COMMENT) {
    updatePropertyAndChildren(oldEl, newVNode, options);
  }
}
const children$1 = (el) => {
  var element = el == null ? void 0 : el.firstChild;
  if (!element) {
    return [];
  }
  var results = [];
  do {
    results[results.length] = element;
    element = element.nextSibling;
  } while (element);
  return results;
};
const vNodeChildren = (vnode) => {
  if (!vnode.children.length) {
    return [];
  }
  return vnode.children;
};
const DefaultOption = {
  checkPassed: void 0,
  keyField: "key",
  removedElements: []
};
function Reconcile(oldEl, newVNode, options = {}) {
  options = Object.assign({}, DefaultOption, options);
  if (oldEl.nodeType !== 11) {
    updateElement(oldEl.parentElement, oldEl, newVNode, options);
    return;
  }
}
const children = (el) => {
  var element = el == null ? void 0 : el.firstChild;
  if (!element) {
    return [];
  }
  var results = [];
  do {
    results[results.length] = element;
    element = element.nextSibling;
  } while (element);
  return results;
};
function collectFragmentList(element) {
  const rootList = [];
  let rootListIndex = 0;
  children(element).forEach((it) => {
    if (it[IS_FRAGMENT_ITEM] === true) {
      if (!rootList[rootListIndex]) {
        rootList[rootListIndex] = {
          type: CHILD_ITEM_TYPE_FRAGMENT,
          items: [it]
        };
      } else {
        if (rootList[rootListIndex]) {
          if (rootList[rootListIndex].type === CHILD_ITEM_TYPE_FRAGMENT) {
            rootList[rootListIndex].items.push(it);
          } else {
            rootListIndex++;
            rootList[rootListIndex] = {
              type: CHILD_ITEM_TYPE_FRAGMENT,
              items: [it]
            };
          }
        }
      }
    } else {
      if (!rootList[rootListIndex]) {
        rootList[rootListIndex] = { type: CHILD_ITEM_TYPE_ELEMENT, items: it };
        rootListIndex++;
      } else {
        rootListIndex++;
        rootList[rootListIndex] = { type: CHILD_ITEM_TYPE_ELEMENT, items: it };
      }
    }
  });
  return rootList;
}
function flatTemplate(template) {
  let root = [template];
  root = root.filter(Boolean).map((it) => {
    if (it.type === VNodeType.FRAGMENT) {
      return it.children.map(flatTemplate);
    }
    return it;
  }).flat(Infinity);
  return root;
}
function hasFragmentInList(list2) {
  return list2.some((it) => it.type === CHILD_ITEM_TYPE_FRAGMENT);
}
function runningUpdateFragment(componentInstance, template) {
  const rootList = collectFragmentList(componentInstance.parentElement);
  if (hasFragmentInList(rootList)) {
    const length = 1;
    const fragmentList = [];
    for (let i = 0; i < rootList.length; i++) {
      if (rootList[i].type === CHILD_ITEM_TYPE_FRAGMENT) {
        fragmentList.push(rootList[i]);
      }
      if (fragmentList.length === length) {
        break;
      }
    }
    updateFragment(
      componentInstance.parentElement,
      fragmentList[0],
      template,
      componentInstance.getVNodeOptions()
    );
  }
}
async function runningUpdate(componentInstance, template) {
  if (template.isType(VNodeType.FRAGMENT)) {
    runningUpdateFragment(componentInstance, template);
  } else {
    const rootList = collectFragmentList(componentInstance.$el.el);
    const options = componentInstance.getVNodeOptions();
    if (hasFragmentInList(rootList)) {
      updateChildrenWithFragment(
        componentInstance.$el.el,
        rootList,
        template,
        options
      );
    } else if (template.isType(VNodeType.FRAGMENT)) {
      updateChildren(componentInstance.parentElement, template, options);
    } else {
      Reconcile(componentInstance.$el.el, template, options);
    }
  }
  componentInstance.$el.el[COMPONENT_INSTANCE] = componentInstance;
  componentInstance.runUpdated();
  await componentInstance.runHandlers("update");
}
async function runningMount(componentInstance, template, $container) {
  var _a;
  const newDomElement = DomRenderer(template, {
    ...componentInstance.getVNodeOptions()
  });
  componentInstance.$el = newDomElement;
  componentInstance.refs.$el = componentInstance.$el;
  if ((_a = componentInstance.$el) == null ? void 0 : _a.el) {
    componentInstance.$el.el[COMPONENT_INSTANCE] = componentInstance;
    if (componentInstance.$el.isFragment) {
      componentInstance.isFragment = true;
    }
  }
  if ($container) {
    if (!($container instanceof Dom)) {
      $container = Dom.create($container);
    }
    if ($container.hasChild(componentInstance.$el) === false) {
      $container.append(componentInstance.$el);
      componentInstance.runMounted();
    }
  }
  await componentInstance.runHandlers("initialize");
  await componentInstance.afterRender();
}
async function renderVNodeComponent(componentInstance, $container) {
  componentInstance.resetCurrentComponent();
  let template = componentInstance.template();
  template = flatTemplate(template);
  if (isArray(template) && template.length > 1) {
    console.log(template);
    throw new Error(
      [
        `Error Component - ${componentInstance.sourceName}`,
        "Template root is not must an array, however You can use Fragment instead of it",
        "Fragment Samples: ",
        " <>{list}</> ",
        " <Fragment>{list}</Fragment>"
      ].join("\n")
    );
  }
  const rootTemplate = template[0];
  if (componentInstance.$el) {
    await runningUpdate(componentInstance, rootTemplate);
  } else {
    await runningMount(componentInstance, rootTemplate, $container);
  }
  return componentInstance;
}
function render$1(vNode, options) {
  vNode.makeClassInstance(options);
  try {
    vNode.instance.setParentElement(vNode.parentElement);
    renderVNodeComponent(vNode.instance, options.$container);
  } catch (e) {
    console.error(e);
  }
}
function makeElement$5(vNode, withChildren, options = {}) {
  var _a, _b;
  render$1(vNode, options);
  vNode.el = (_b = (_a = vNode.instance) == null ? void 0 : _a.$el) == null ? void 0 : _b.el;
  if (vNode.el) {
    const id = isString(vNode.props.ref) ? vNode.props.ref : vNode.instance.id;
    if (vNode.props.ref instanceof RefClass) {
      vNode.props.ref.setCurrent(vNode.instance);
    }
    isFunction(options.registerChildComponent) && options.registerChildComponent(vNode.el, vNode.instance, id);
  }
  return vNode;
}
function VNodeComponentRender$1(vNode, withChildren, options) {
  return makeElement$5(vNode, withChildren, options);
}
const handlerMap = {};
const __rootInstance = /* @__PURE__ */ new Set();
const __rootInstanceMap = /* @__PURE__ */ new WeakMap();
const __tempVariables = /* @__PURE__ */ new Map();
const __tempVariablesGroup = /* @__PURE__ */ new Map();
const _modules = {};
const _moduleMap = /* @__PURE__ */ new WeakMap();
const RenderCallbackList = /* @__PURE__ */ new WeakMap();
const PendingComponentList = /* @__PURE__ */ new WeakMap();
const GlobalState = {
  currentComponent: null
};
function getCurrentComponent() {
  return GlobalState.currentComponent;
}
function resetCurrentComponent(component) {
  GlobalState.currentComponent = component;
}
function createRenderCallback(component) {
  if (!RenderCallbackList.has(component)) {
    RenderCallbackList.set(component, ($container = void 0) => {
      const Renderer = component.renderer;
      if (Renderer) {
        return Renderer(component, $container);
      }
    });
  }
  return RenderCallbackList.get(component);
}
function removeRenderCallback(component) {
  if (RenderCallbackList.has(component)) {
    RenderCallbackList.delete(component);
  }
}
function renderComponent(component, $container = void 0) {
  var _a;
  if (isPendingComponent(component)) {
    return;
  }
  (_a = createRenderCallback(component)) == null ? void 0 : _a($container);
}
function pendingComponent(component) {
  PendingComponentList.set(component, true);
}
function isPendingComponent(component) {
  return PendingComponentList.has(component);
}
function removePendingComponent(component) {
  PendingComponentList.delete(component);
}
const VARIABLE_SAPARATOR = "v:";
function variable(value, groupId = "") {
  const id = `${VARIABLE_SAPARATOR}${uuidShort()}`;
  __tempVariables.set(id, value);
  if (groupId) {
    __tempVariablesGroup.has(groupId) || __tempVariablesGroup.set(groupId, /* @__PURE__ */ new Set());
    __tempVariablesGroup.get(groupId).add(id);
  }
  return id;
}
function recoverVariable(id, removeVariable = true) {
  if (isString(id) === false) {
    return id;
  }
  let value = id;
  if (__tempVariables.has(id)) {
    value = __tempVariables.get(id);
    if (removeVariable) {
      __tempVariables.delete(id);
    }
  }
  return value;
}
function getVariable(idOrValue) {
  if (__tempVariables.has(idOrValue)) {
    return __tempVariables.get(idOrValue);
  }
  return idOrValue;
}
function registRootElementInstance(instance, containerElement) {
  const rootContainerElement = containerElement.el || containerElement;
  __rootInstance.add(instance);
  if (__rootInstanceMap.has(rootContainerElement)) {
    removeRootElementInstance(__rootInstanceMap.get(rootContainerElement));
  }
  __rootInstanceMap.set(rootContainerElement, instance);
}
function removeRootElementInstance(instance) {
  instance == null ? void 0 : instance.destroy();
  __rootInstance.delete(instance);
}
function createHandlerInstance(context, localHanders = {}) {
  return [
    ...Object.keys(handlerMap).map((key) => {
      const HandlerClass = handlerMap[key];
      return new HandlerClass(context);
    }),
    ...Object.keys(localHanders).map((key) => {
      const HandlerClass = localHanders[key];
      return new HandlerClass(context);
    })
  ];
}
function getModule(Component) {
  const id = _moduleMap.get(Component);
  if (!id) {
    return;
  }
  const m = _modules[id];
  if (!m) {
    return;
  }
  const newModule = m.new[Component.name];
  if (newModule) {
    return newModule;
  }
  const currentNewComponent = Object.values(m.new).find((it) => {
    return it === Component;
  });
  if (currentNewComponent) {
    return currentNewComponent;
  }
  let oldKey = "";
  const currentOldComponent = Object.entries(m.old).find(([key, it]) => {
    if (it === Component) {
      oldKey = key;
      return true;
    }
    return false;
  });
  if (currentOldComponent) {
    return m.new[oldKey];
  }
  return void 0;
}
class Dom {
  constructor(tag, className, attr) {
    if (typeof tag !== "string") {
      if (tag instanceof Dom) {
        this.el = tag.el;
      } else {
        this.el = tag;
      }
    } else {
      var el = document.createElement(tag);
      if (className) {
        el.className = className;
      }
      attr = attr || {};
      Object.assign(el, attr);
      this.el = el;
    }
  }
  static create(tag, className, attr) {
    return new Dom(tag, className, attr);
  }
  static createText(text) {
    return new Dom(document.createTextNode(text));
  }
  static createByHTML(htmlString) {
    var div = Dom.create("div");
    return div.html(htmlString).firstChild;
  }
  static getScrollTop() {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }
  static getScrollLeft() {
    return Math.max(
      window.pageXOffset,
      document.documentElement.scrollLeft,
      document.body.scrollLeft
    );
  }
  static parse(html) {
    var parser = window.DOMParser();
    return parser.parseFromString(html, "text/html");
  }
  static body() {
    return Dom.create(document.body);
  }
  get tagName() {
    return this.el.tagName;
  }
  get exists() {
    return Boolean(this.el);
  }
  setAttr(obj) {
    Object.keys(obj).forEach((key) => {
      this.attr(key, obj[key]);
    });
    return this;
  }
  setAttrNS(obj, namespace = "http://www.w3.org/2000/svg") {
    Object.keys(obj).forEach((key) => {
      this.attr(key, obj[key], namespace);
    });
    return this;
  }
  setProp(obj) {
    Object.keys(obj).forEach((key) => {
      if (this.el[key] != obj[key]) {
        this.el[key] = obj[key];
      }
    });
    return this;
  }
  data(key, value) {
    if (arguments.length === 1) {
      const value2 = this.attr("data-" + key);
      return recoverVariable(value2, false);
    } else if (arguments.length === 2) {
      return this.attr("data-" + key, value);
    }
    return this;
  }
  attr(...args) {
    if (args.length == 1) {
      return isFunction(this.el.getAttribute) && this.el.getAttribute(args[0]);
    }
    if (this.el.getAttribute(args[0]) != args[1]) {
      this.el.setAttribute(args[0], args[1]);
    }
    return this;
  }
  attrKeyValue(keyField) {
    return {
      [this.el.getAttribute(keyField)]: this.val()
    };
  }
  get attributes() {
    try {
      return [...this.el.attributes];
    } catch (e) {
      const length = this.el.attributes.length;
      const attributes = [];
      for (var i = 0; i < length; i++) {
        attributes.push(this.el.attributes[`${i}`]);
      }
      return attributes;
    }
  }
  attrs(...args) {
    return args.map((key) => {
      return this.el.getAttribute(key);
    });
  }
  styles(...args) {
    return args.map((key) => {
      return this.el.style[key];
    });
  }
  removeAttr(key) {
    this.el.removeAttribute(key);
    return this;
  }
  removeStyle(key) {
    this.el.style.removeProperty(key);
    return this;
  }
  get isFragment() {
    return this.el.nodeType === 11;
  }
  get isTemplate() {
    return this.el.nodeType === 1 && this.el.tagName === "TEMPLATE";
  }
  get content() {
    return this.isTemplate ? this.el.content : this.el;
  }
  is(checkElement) {
    if (checkElement instanceof Dom) {
      return this.el === checkElement.el;
    }
    return this.el === checkElement;
  }
  isTag(tag) {
    return this.el.tagName.toLowerCase() === tag.toLowerCase();
  }
  clone(withChildren = true) {
    return Dom.create(this.el.cloneNode(withChildren));
  }
  closest(cls) {
    var temp = this;
    var checkCls = false;
    while (!(checkCls = temp.hasClass(cls))) {
      if (temp.el.parentNode) {
        temp = Dom.create(temp.el.parentNode);
      } else {
        return null;
      }
    }
    if (checkCls) {
      return temp;
    }
    return null;
  }
  path() {
    if (!this.el)
      return [];
    let pathList = [this];
    let $parentNode = this.parent();
    if (!$parentNode.el)
      return pathList;
    while ($parentNode) {
      pathList.unshift($parentNode);
      $parentNode = $parentNode.parent();
      if (!$parentNode.el)
        break;
    }
    return pathList;
  }
  get $parent() {
    return this.parent();
  }
  parent() {
    return Dom.create(this.el.parentNode);
  }
  hasParent() {
    return !!this.el.parentNode;
  }
  get isUnlinked() {
    return !this.el.parentNode;
  }
  removeClass(...args) {
    this.el.classList.remove(...args);
    return this;
  }
  updateClass(className) {
    this.el.className = className;
    return this;
  }
  replaceClass(oldClass, newClass) {
    this.el.classList.replace(oldClass, newClass);
    return this;
  }
  hasClass(cls) {
    if (!this.el.classList)
      return false;
    return this.el.classList.contains(cls);
  }
  addClass(...args) {
    this.el.classList.add(...args);
    return this;
  }
  onlyOneClass(cls) {
    var parent = this.parent();
    parent.children().forEach((it) => {
      it.removeClass(cls);
    });
    this.addClass(cls);
  }
  toggleClass(cls, isForce) {
    this.el.classList.toggle(cls, isForce);
    return this;
  }
  outerHTML() {
    if (this.isTextNode) {
      return this.text();
    }
    return this.el.outerHTML;
  }
  html(html) {
    try {
      if (typeof html === "undefined") {
        return this.el.innerHTML;
      }
      if (typeof html === "string") {
        Object.assign(this.el, { innerHTML: html });
      } else {
        this.empty().append(html);
      }
      return this;
    } catch (e) {
      console.log(e, html);
      return this;
    }
  }
  find(selector, el = this.el) {
    if (this.isTextNode)
      return void 0;
    return el.querySelector(selector);
  }
  $(selector) {
    var node = this.find(selector, this.isTemplate ? this.el.content : this.el);
    return node ? Dom.create(node) : null;
  }
  findAll(selector, el = this.el) {
    if (this.isTextNode)
      return [];
    return Array.from(el.querySelectorAll(selector));
  }
  $$(selector) {
    var arr = this.findAll(
      selector,
      this.isTemplate ? this.el.content : this.el
    );
    return arr.map((node) => Dom.create(node));
  }
  empty() {
    while (this.el.firstChild)
      this.el.removeChild(this.el.firstChild);
    return this;
  }
  append(el) {
    if (!el)
      return this;
    if (isArray(el)) {
      this.el.append(...el.map((it) => it.el || it));
    } else if (typeof el === "string") {
      this.el.appendChild(document.createTextNode(el));
    } else {
      this.el.appendChild(el.el || el);
    }
    return this;
  }
  appendHTML(html) {
    var $dom = Dom.create("div").html(html);
    this.append($dom.createChildrenFragment());
    return $dom;
  }
  createChildrenFragment() {
    const list2 = this.childNodes;
    var fragment = document.createDocumentFragment();
    list2.forEach(($el) => fragment.appendChild($el.el));
    return fragment;
  }
  static createFragment(list2 = []) {
    var fragment = document.createDocumentFragment();
    list2.forEach((it) => fragment.appendChild(it));
    return fragment;
  }
  appendTo(target) {
    var t = target.el ? target.el : target;
    t.appendChild(this.el);
    return this;
  }
  remove() {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this;
  }
  removeChild(el) {
    this.el.removeChild(el.el || el);
    return this;
  }
  text(value) {
    if (typeof value === "undefined") {
      return this.el.textContent;
    } else {
      var tempText = value;
      if (value instanceof Dom) {
        tempText = value.text();
      }
      if (this.el.textContent !== tempText) {
        this.el.textContent = tempText;
      }
      return this;
    }
  }
  css(key, value) {
    if (typeof key !== "undefined" && typeof value !== "undefined") {
      if (key.indexOf("--") === 0 && typeof value !== "undefined") {
        this.el.style.setProperty(key, value);
      } else {
        this.el.style[key] = value;
      }
    } else if (typeof key !== "undefined") {
      if (typeof key === "string") {
        return window.getComputedStyle(this.el)[key];
      } else {
        Object.entries(key).forEach(([localKey, value2]) => {
          if (localKey.indexOf("--") === 0 && typeof value2 !== "undefined") {
            this.el.style.setProperty(localKey, value2);
          } else {
            this.el.style[localKey] = value2;
          }
        });
      }
    }
    return this;
  }
  cssText(value) {
    if (typeof value === "undefined") {
      return this.el.style.cssText;
    }
    if (value != this.el.tempCssText) {
      this.el.style.cssText = value;
      this.el.tempCssText = value;
    }
    return this;
  }
  cssFloat(key) {
    return parseFloat(this.css(key));
  }
  rect() {
    return this.el.getBoundingClientRect();
  }
  isSVG() {
    if (!this.el._cachedIsSVG) {
      this.el._cachedIsSVG = { value: this.el.tagName.toLowerCase() === "svg" };
    }
    return this.el._cachedIsSVG.value;
  }
  offsetRect() {
    if (this.isSVG()) {
      const parentBox = this.parent().rect();
      const box = this.rect();
      return {
        x: box.x - parentBox.x,
        y: box.y - parentBox.y,
        width: box.width,
        height: box.height
      };
    }
    const el = this.el;
    return {
      x: el.offsetLeft,
      y: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
  offsetClientRect() {
    if (this.isSVG()) {
      const parentBox2 = this.parent().rect();
      const box2 = this.rect();
      return {
        x: box2.x - parentBox2.x,
        y: box2.y - parentBox2.y,
        width: box2.width,
        height: box2.height
      };
    }
    const parentBox = this.parent().rect();
    const box = this.rect();
    return {
      x: box.x - parentBox.x,
      y: box.y - parentBox.y,
      width: box.width,
      height: box.height
    };
  }
  offset() {
    var rect = this.rect();
    var scrollTop = Dom.getScrollTop();
    var scrollLeft = Dom.getScrollLeft();
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }
  offsetLeft() {
    return this.offset().left;
  }
  offsetTop() {
    return this.offset().top;
  }
  position() {
    if (this.el.style.top) {
      return {
        top: parseFloat(this.css("top")),
        left: parseFloat(this.css("left"))
      };
    } else {
      return this.rect();
    }
  }
  size() {
    return [this.width(), this.height()];
  }
  width() {
    return this.el.offsetWidth || this.rect().width;
  }
  contentWidth() {
    return this.width() - this.cssFloat("padding-left") - this.cssFloat("padding-right");
  }
  height() {
    return this.el.offsetHeight || this.rect().height;
  }
  contentHeight() {
    return this.height() - this.cssFloat("padding-top") - this.cssFloat("padding-bottom");
  }
  val(value) {
    if (typeof value === "undefined") {
      return this.el.value;
    } else if (typeof value !== "undefined") {
      var tempValue = value;
      if (value instanceof Dom) {
        tempValue = value.val();
      }
      this.el.value = tempValue;
    }
    return this;
  }
  matches(selector) {
    if (this.el) {
      if (!this.el.matches)
        return null;
      if (this.el.matches(selector)) {
        return this;
      }
      return this.parent().matches(selector);
    }
    return null;
  }
  get value() {
    return this.el.value;
  }
  set value(v2) {
    this.el.value = v2;
  }
  get naturalWidth() {
    return this.el.naturalWidth;
  }
  get naturalHeight() {
    return this.el.naturalHeight;
  }
  get files() {
    return this.el.files ? [...this.el.files] : [];
  }
  get isTextNode() {
    return this.el.nodeType === 3;
  }
  get scrollTop() {
    return this.el.scrollTop;
  }
  set scrollTop(v2) {
    this.el.scrollTop = v2;
  }
  show(displayType = "block") {
    this.el.style.display = displayType != "none" ? displayType : "block";
    return this;
  }
  hide() {
    this.el.style.display = "none";
    return this;
  }
  isHide() {
    return this.el.style.display === "none";
  }
  isShow() {
    return !this.isHide();
  }
  toggle(isForce) {
    var currentHide = this.isHide();
    if (arguments.length == 1) {
      if (isForce) {
        return this.show();
      } else {
        return this.hide();
      }
    } else {
      if (currentHide) {
        return this.show();
      } else {
        return this.hide();
      }
    }
  }
  scrollIntoView() {
    this.el.scrollIntoView();
  }
  get scrollTop() {
    if (this.el === document.body) {
      return Dom.getScrollTop();
    }
    return this.el.scrollTop;
  }
  get scrollLeft() {
    if (this.el === document.body) {
      return Dom.getScrollLeft();
    }
    return this.el.scrollLeft;
  }
  get scrollHeight() {
    return this.el.scrollHeight;
  }
  get scrollWidth() {
    return this.el.scrollWidth;
  }
  on(eventName, callback, opt1, opt2) {
    this.el.addEventListener(eventName, callback, opt1, opt2);
    return this;
  }
  off(eventName, callback) {
    this.el.removeEventListener(eventName, callback);
    return this;
  }
  getElement() {
    return this.el;
  }
  get firstChild() {
    return Dom.create(this.el.firstElementChild);
  }
  get first() {
    return Dom.create(this.el.firstChild);
  }
  children() {
    var element = this.el.firstElementChild;
    if (!element) {
      return [];
    }
    var results = [];
    do {
      results.push(Dom.create(element));
      element = element.nextElementSibling;
    } while (element);
    return results;
  }
  hasChild(child) {
    var _a;
    const childNode = child.el || child;
    return this.el === childNode ? false : (_a = this.el) == null ? void 0 : _a.contains(childNode);
  }
  get childNodes() {
    const result = [];
    if (this.el.hasChildNodes()) {
      const childNodes = this.el.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        result.push(Dom.create(childNodes[i]));
      }
    }
    return result;
  }
  childLength() {
    return this.el.childNodes.length;
  }
  replace(newElement) {
    if (this.el.parentNode) {
      this.el.parentNode.replaceChild(newElement.el || newElement, this.el);
    }
    return this;
  }
  replaceChild(oldElement, newElement) {
    this.el.replaceChild(
      newElement.el || newElement,
      oldElement.el || oldElement
    );
    return this;
  }
  checked(isChecked = false) {
    if (arguments.length == 0) {
      return !!this.el.checked;
    }
    this.el.checked = !!isChecked;
    return this;
  }
  click() {
    this.el.click();
    return this;
  }
  focus() {
    this.el.focus();
    return this;
  }
  dispatchEvent(event, data) {
    const evt = new CustomEvent(event, { detail: data });
    this.el.dispatchEvent(evt);
    return this;
  }
  select() {
    if (this.attr("contenteditable") === "true") {
      var range = document.createRange();
      range.selectNodeContents(this.el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      this.el.select();
    }
    return this;
  }
  blur() {
    this.el.blur();
    return this;
  }
}
const start = (ElementClass, opt = {}) => {
  const $container = Dom.create(opt.container || document.body);
  const $targetElement = $container.children().find((it) => it.el[COMPONENT_INSTANCE]);
  if (ElementClass instanceof VNode) {
    const rootVNode = ElementClass;
    ElementClass = () => rootVNode;
  }
  const app = createComponentInstance(ElementClass, null, {
    ...opt,
    renderer: renderVNodeComponent
  });
  if ($targetElement) {
    app.$el = Dom.create($targetElement.el);
    app.id = $targetElement.el[COMPONENT_INSTANCE].id;
    renderComponent(app, null);
  } else {
    renderComponent(app, $container);
  }
  registRootElementInstance(app, $container);
  return app;
};
const potal = (ElementClass, opt = {}) => {
  const $container = Dom.create(opt.container || document.body);
  if (ElementClass instanceof VNode) {
    const rootVNode = ElementClass;
    ElementClass = () => rootVNode;
  }
  const app = createComponentInstance(ElementClass, null, {
    ...opt,
    renderer: renderVNodeComponent
  });
  renderComponent(app, $container);
  return app;
};
function createComponent(Component, props = {}, children2 = []) {
  children2 = children2.flat(Infinity);
  return createVNodeComponent({
    props: props || {},
    children: children2,
    Component
  });
}
function createComponentFragment(Component, props = {}, children2 = []) {
  children2 = children2.flat(Infinity);
  return createVNodeFragment({
    props: props || {},
    children: children2,
    Component
  });
}
function createComment(children2 = []) {
  children2 = children2.flat(Infinity);
  return createVNodeComment(children2[0] || "");
}
function createComponentList(...args) {
  return args.map((it) => {
    let ComponentName;
    let props = {};
    let children2 = [];
    if (isString(it)) {
      ComponentName = it;
    } else if (isArray(it)) {
      [ComponentName, props = {}, children2 = []] = it;
    }
    if (children2.length) {
      return createComponent(
        ComponentName,
        props || {},
        createComponentList(children2)
      );
    }
    return createComponent(ComponentName, props);
  });
}
function createElement(Component, props, children2 = []) {
  children2 = children2.flat(Infinity);
  return createVNode({ tag: Component, props, children: children2 });
}
function createElementJsx$1(Component, props = {}, ...children2) {
  children2 = children2.filter(isValue);
  if (Component === FragmentInstance$1) {
    return createComponentFragment(Component, props, children2);
  }
  if (Component === HTMLComment$1) {
    return createComment(children2);
  }
  props = props || {};
  if (typeof Component !== "string") {
    return createComponent(Component, props, children2);
  } else {
    return createElement(Component, props, children2);
  }
}
const FragmentInstance$1 = new Object();
const HTMLComment$1 = new Object();
const jsx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createComponent,
  createComponentFragment,
  createComment,
  createComponentList,
  createElement,
  createElementJsx: createElementJsx$1,
  FragmentInstance: FragmentInstance$1,
  HTMLComment: HTMLComment$1
}, Symbol.toStringTag, { value: "Module" }));
const createElementJsx = createElementJsx$1;
const index = {
  ...jsx
};
const style = "";
function l(r, n) {
  return n = typeof n > "u" ? 1 : n, Math.round(r * n) / n;
}
function w(r, n = r.type, e = "rgba(0, 0, 0, 0)") {
  return Array.isArray(r) && (r = { r: r[0], g: r[1], b: r[2], a: r[3] }), n == "hex" ? z(r) : n == "rgb" ? B(r, e) : n == "hsl" ? P(r) : n == "hsv" ? Z(r) : n == "cmyk" ? _(r) : `${n}(${r.r},${r.g},${r.b})`;
}
function z(r) {
  Array.isArray(r) && (r = { r: r[0], g: r[1], b: r[2], a: r[3] });
  var n = r.r.toString(16);
  r.r < 16 && (n = "0" + n);
  var e = r.g.toString(16);
  r.g < 16 && (e = "0" + e);
  var t = r.b.toString(16);
  if (r.b < 16 && (t = "0" + t), r.a == 1 || typeof r.a > "u")
    return `#${n}${e}${t}`;
  {
    const g = Math.ceil(r.a * 255);
    var a = g.toString(16);
    return g < 16 && (a = "0" + a), `#${n}${e}${t}${a}`;
  }
}
function B(r, n = "rgba(0, 0, 0, 0)") {
  if (Array.isArray(r) && (r = { r: r[0], g: r[1], b: r[2], a: r[3] }), !(typeof r > "u"))
    return r.a == 1 || typeof r.a > "u" ? isNaN(r.r) ? n : `rgb(${r.r},${r.g},${r.b})` : `rgba(${r.r},${r.g},${r.b},${r.a})`;
}
function P(r) {
  return Array.isArray(r) && (r = { h: r[0], s: r[1], l: r[2], a: r[3] }), r.a == 1 || typeof r.a > "u" ? `hsl(${r.h}, ${r.s}%, ${r.l}%)` : `hsla(${r.h}, ${r.s}%, ${r.l}%, ${r.a})`;
}
function Z(r) {
  Array.isArray(r) && (r = { h: r[0], s: r[1], v: r[2], a: r[3] });
  const n = l(r.h), e = r.a, t = l(r.s * 100), a = l(r.v * 100);
  return r.a == 1 || typeof r.a > "u" ? `hsv(${n}, ${t}%, ${a}%)` : `hsva(${n}, ${t}%, ${a}%, ${e})`;
}
function _(r) {
  Array.isArray(r) && (r = { c: r[0], m: r[1], y: r[2], k: r[3] });
  const n = l(r.c * 100, 100), e = l(r.m * 100, 100), t = l(r.y * 100, 100), a = l(r.k * 100, 100);
  return `cmyk(${n}%,${e}%,${t}%,${a}%)`;
}
function O(r, n, e) {
  if (arguments.length == 1)
    var { r, g: n, b: e } = arguments[0];
  const t = r / 255, a = n / 255, g = e / 255, f = Math.max(t, a, g), u = Math.min(t, a, g), i = f - u;
  var s = 0;
  i == 0 ? s = 0 : f == t ? s = 60 * ((a - g) / i % 6) : f == a ? s = 60 * ((g - t) / i + 2) : f == g && (s = 60 * ((t - a) / i + 4)), s < 0 && (s = 360 + s);
  var c = 0;
  f == 0 ? c = 0 : c = i / f;
  var b = f;
  return { h: s, s: c, v: b };
}
function p(r, n, e) {
  if (arguments.length == 1)
    var { r, g: n, b: e } = arguments[0];
  r /= 255, n /= 255, e /= 255;
  var t = Math.max(r, n, e), a = Math.min(r, n, e), g, f, u = (t + a) / 2;
  if (t == a)
    g = f = 0;
  else {
    var i = t - a;
    switch (f = u > 0.5 ? i / (2 - t - a) : i / (t + a), t) {
      case r:
        g = (n - e) / i + (n < e ? 6 : 0);
        break;
      case n:
        g = (e - r) / i + 2;
        break;
      case e:
        g = (r - n) / i + 4;
        break;
    }
    g /= 6;
  }
  return { h: l(g * 360), s: l(f * 100), l: l(u * 100) };
}
function M(r, n, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? r + (n - r) * 6 * e : e < 1 / 2 ? n : e < 2 / 3 ? r + (n - r) * (2 / 3 - e) * 6 : r;
}
function $(r, n, e) {
  if (arguments.length == 1)
    var { h: r, s: n, l: e } = arguments[0];
  var t, a, g;
  if (r /= 360, n /= 100, e /= 100, n == 0)
    t = a = g = e;
  else {
    var f = e < 0.5 ? e * (1 + n) : e + n - e * n, u = 2 * e - f;
    t = M(u, f, r + 1 / 3), a = M(u, f, r), g = M(u, f, r - 1 / 3);
  }
  return { r: l(t * 255), g: l(a * 255), b: l(g * 255) };
}
function H(r, n, e) {
  if (arguments.length == 1)
    var { h: r, s: n, v: e } = arguments[0];
  var t = r, a = n, g = e;
  t >= 360 && (t = 0);
  const f = a * g, u = f * (1 - Math.abs(t / 60 % 2 - 1)), i = g - f;
  let s = [];
  return 0 <= t && t < 60 ? s = [f, u, 0] : 60 <= t && t < 120 ? s = [u, f, 0] : 120 <= t && t < 180 ? s = [0, f, u] : 180 <= t && t < 240 ? s = [0, u, f] : 240 <= t && t < 300 ? s = [u, 0, f] : 300 <= t && t < 360 && (s = [f, 0, u]), {
    r: l((s[0] + i) * 255),
    g: l((s[1] + i) * 255),
    b: l((s[2] + i) * 255)
  };
}
function Ar(r, n, e) {
  if (arguments.length == 1)
    var { h: r, s: n, v: e } = arguments[0];
  const t = H(r, n, e);
  return p(t.r, t.g, t.b);
}
const I = {
  aliceblue: "rgb(240, 248, 255)",
  antiquewhite: "rgb(250, 235, 215)",
  aqua: "rgb(0, 255, 255)",
  aquamarine: "rgb(127, 255, 212)",
  azure: "rgb(240, 255, 255)",
  beige: "rgb(245, 245, 220)",
  bisque: "rgb(255, 228, 196)",
  black: "rgb(0, 0, 0)",
  blanchedalmond: "rgb(255, 235, 205)",
  blue: "rgb(0, 0, 255)",
  blueviolet: "rgb(138, 43, 226)",
  brown: "rgb(165, 42, 42)",
  burlywood: "rgb(222, 184, 135)",
  cadetblue: "rgb(95, 158, 160)",
  chartreuse: "rgb(127, 255, 0)",
  chocolate: "rgb(210, 105, 30)",
  coral: "rgb(255, 127, 80)",
  cornflowerblue: "rgb(100, 149, 237)",
  cornsilk: "rgb(255, 248, 220)",
  crimson: "rgb(237, 20, 61)",
  cyan: "rgb(0, 255, 255)",
  darkblue: "rgb(0, 0, 139)",
  darkcyan: "rgb(0, 139, 139)",
  darkgoldenrod: "rgb(184, 134, 11)",
  darkgray: "rgb(169, 169, 169)",
  darkgrey: "rgb(169, 169, 169)",
  darkgreen: "rgb(0, 100, 0)",
  darkkhaki: "rgb(189, 183, 107)",
  darkmagenta: "rgb(139, 0, 139)",
  darkolivegreen: "rgb(85, 107, 47)",
  darkorange: "rgb(255, 140, 0)",
  darkorchid: "rgb(153, 50, 204)",
  darkred: "rgb(139, 0, 0)",
  darksalmon: "rgb(233, 150, 122)",
  darkseagreen: "rgb(143, 188, 143)",
  darkslateblue: "rgb(72, 61, 139)",
  darkslategray: "rgb(47, 79, 79)",
  darkslategrey: "rgb(47, 79, 79)",
  darkturquoise: "rgb(0, 206, 209)",
  darkviolet: "rgb(148, 0, 211)",
  deeppink: "rgb(255, 20, 147)",
  deepskyblue: "rgb(0, 191, 255)",
  dimgray: "rgb(105, 105, 105)",
  dimgrey: "rgb(105, 105, 105)",
  dodgerblue: "rgb(30, 144, 255)",
  firebrick: "rgb(178, 34, 34)",
  floralwhite: "rgb(255, 250, 240)",
  forestgreen: "rgb(34, 139, 34)",
  fuchsia: "rgb(255, 0, 255)",
  gainsboro: "rgb(220, 220, 220)",
  ghostwhite: "rgb(248, 248, 255)",
  gold: "rgb(255, 215, 0)",
  goldenrod: "rgb(218, 165, 32)",
  gray: "rgb(128, 128, 128)",
  grey: "rgb(128, 128, 128)",
  green: "rgb(0, 128, 0)",
  greenyellow: "rgb(173, 255, 47)",
  honeydew: "rgb(240, 255, 240)",
  hotpink: "rgb(255, 105, 180)",
  indianred: "rgb(205, 92, 92)",
  indigo: "rgb(75, 0, 130)",
  ivory: "rgb(255, 255, 240)",
  khaki: "rgb(240, 230, 140)",
  lavender: "rgb(230, 230, 250)",
  lavenderblush: "rgb(255, 240, 245)",
  lawngreen: "rgb(124, 252, 0)",
  lemonchiffon: "rgb(255, 250, 205)",
  lightblue: "rgb(173, 216, 230)",
  lightcoral: "rgb(240, 128, 128)",
  lightcyan: "rgb(224, 255, 255)",
  lightgoldenrodyellow: "rgb(250, 250, 210)",
  lightgreen: "rgb(144, 238, 144)",
  lightgray: "rgb(211, 211, 211)",
  lightgrey: "rgb(211, 211, 211)",
  lightpink: "rgb(255, 182, 193)",
  lightsalmon: "rgb(255, 160, 122)",
  lightseagreen: "rgb(32, 178, 170)",
  lightskyblue: "rgb(135, 206, 250)",
  lightslategray: "rgb(119, 136, 153)",
  lightslategrey: "rgb(119, 136, 153)",
  lightsteelblue: "rgb(176, 196, 222)",
  lightyellow: "rgb(255, 255, 224)",
  lime: "rgb(0, 255, 0)",
  limegreen: "rgb(50, 205, 50)",
  linen: "rgb(250, 240, 230)",
  magenta: "rgb(255, 0, 255)",
  maroon: "rgb(128, 0, 0)",
  mediumaquamarine: "rgb(102, 205, 170)",
  mediumblue: "rgb(0, 0, 205)",
  mediumorchid: "rgb(186, 85, 211)",
  mediumpurple: "rgb(147, 112, 219)",
  mediumseagreen: "rgb(60, 179, 113)",
  mediumslateblue: "rgb(123, 104, 238)",
  mediumspringgreen: "rgb(0, 250, 154)",
  mediumturquoise: "rgb(72, 209, 204)",
  mediumvioletred: "rgb(199, 21, 133)",
  midnightblue: "rgb(25, 25, 112)",
  mintcream: "rgb(245, 255, 250)",
  mistyrose: "rgb(255, 228, 225)",
  moccasin: "rgb(255, 228, 181)",
  navajowhite: "rgb(255, 222, 173)",
  navy: "rgb(0, 0, 128)",
  oldlace: "rgb(253, 245, 230)",
  olive: "rgb(128, 128, 0)",
  olivedrab: "rgb(107, 142, 35)",
  orange: "rgb(255, 165, 0)",
  orangered: "rgb(255, 69, 0)",
  orchid: "rgb(218, 112, 214)",
  palegoldenrod: "rgb(238, 232, 170)",
  palegreen: "rgb(152, 251, 152)",
  paleturquoise: "rgb(175, 238, 238)",
  palevioletred: "rgb(219, 112, 147)",
  papayawhip: "rgb(255, 239, 213)",
  peachpuff: "rgb(255, 218, 185)",
  peru: "rgb(205, 133, 63)",
  pink: "rgb(255, 192, 203)",
  plum: "rgb(221, 160, 221)",
  powderblue: "rgb(176, 224, 230)",
  purple: "rgb(128, 0, 128)",
  rebeccapurple: "rgb(102, 51, 153)",
  red: "rgb(255, 0, 0)",
  rosybrown: "rgb(188, 143, 143)",
  royalblue: "rgb(65, 105, 225)",
  saddlebrown: "rgb(139, 69, 19)",
  salmon: "rgb(250, 128, 114)",
  sandybrown: "rgb(244, 164, 96)",
  seagreen: "rgb(46, 139, 87)",
  seashell: "rgb(255, 245, 238)",
  sienna: "rgb(160, 82, 45)",
  silver: "rgb(192, 192, 192)",
  skyblue: "rgb(135, 206, 235)",
  slateblue: "rgb(106, 90, 205)",
  slategray: "rgb(112, 128, 144)",
  slategrey: "rgb(112, 128, 144)",
  snow: "rgb(255, 250, 250)",
  springgreen: "rgb(0, 255, 127)",
  steelblue: "rgb(70, 130, 180)",
  tan: "rgb(210, 180, 140)",
  teal: "rgb(0, 128, 128)",
  thistle: "rgb(216, 191, 216)",
  tomato: "rgb(255, 99, 71)",
  turquoise: "rgb(64, 224, 208)",
  violet: "rgb(238, 130, 238)",
  wheat: "rgb(245, 222, 179)",
  white: "rgb(255, 255, 255)",
  whitesmoke: "rgb(245, 245, 245)",
  yellow: "rgb(255, 255, 0)",
  yellowgreen: "rgb(154, 205, 50)",
  transparent: "rgba(0, 0, 0, 0)",
  currentColor: "currentColor"
};
function Q(r) {
  return !!I[r];
}
function L(r) {
  return I[r];
}
const er = /^\s+|\s+$/g;
function h(r) {
  return r.replace(er, "");
}
function v(r) {
  if (typeof r == "string") {
    if (Q(r) && (r = L(r)), r.indexOf("rgb(") > -1) {
      for (var n = r.replace("rgb(", "").replace(")", "").split(","), e = 0, t = n.length; e < t; e++)
        n[e] = parseInt(h(n[e]), 10);
      var a = { type: "rgb", r: n[0], g: n[1], b: n[2], a: 1 };
      return a = { ...a, ...p(a) }, a;
    } else if (r.indexOf("rgba(") > -1) {
      for (var n = r.replace("rgba(", "").replace(")", "").split(","), e = 0, t = n.length; e < t; e++)
        t - 1 == e ? n[e] = parseFloat(h(n[e])) : n[e] = parseInt(h(n[e]), 10);
      var a = { type: "rgb", r: n[0], g: n[1], b: n[2], a: n[3] };
      return a = { ...a, ...p(a) }, a;
    } else if (r.indexOf("hsl(") > -1) {
      for (var n = r.replace("hsl(", "").replace(")", "").split(","), e = 0, t = n.length; e < t; e++)
        n[e] = parseFloat(h(n[e]));
      var a = { type: "hsl", h: n[0], s: n[1], l: n[2], a: 1 };
      return a = { ...a, ...$(a) }, a;
    } else if (r.indexOf("hsla(") > -1) {
      for (var n = r.replace("hsla(", "").replace(")", "").split(","), e = 0, t = n.length; e < t; e++)
        t - 1 == e ? n[e] = parseFloat(h(n[e])) : n[e] = parseInt(h(n[e]), 10);
      var a = { type: "hsl", h: n[0], s: n[1], l: n[2], a: n[3] };
      return a = { ...a, ...$(a) }, a;
    } else if (r.indexOf("#") == 0) {
      r = r.replace("#", "");
      var n = [], g = 1;
      if (r.length == 3)
        for (var e = 0, t = r.length; e < t; e++) {
          var f = r.substr(e, 1);
          n.push(parseInt(f + f, 16));
        }
      else if (r.length === 8) {
        for (var e = 0, t = r.length; e < t; e += 2)
          n.push(parseInt(r.substr(e, 2), 16));
        g = n.pop() / 255;
      } else {
        if (r.length !== 6)
          return;
        for (var e = 0, t = r.length; e < t; e += 2) {
          const b = parseInt(r.substr(e, 2), 16);
          n.push(b);
        }
      }
      var a = { type: "hex", r: n[0], g: n[1], b: n[2], a: g };
      return a = { ...a, ...p(a) }, a;
    }
  } else if (typeof r == "number") {
    if (0 <= r && r <= 16777215) {
      const u = (r & 16711680) >> 16, i = (r & 65280) >> 8, s = (r & 255) >> 0;
      var a = { type: "hex", r: u, g: i, b: s, a: 1 };
      return a = { ...a, ...p(a) }, a;
    } else if (0 <= r && r <= 4294967295) {
      const u = (r & 4278190080) >> 24, i = (r & 16711680) >> 16, s = (r & 65280) >> 8, c = (r & 255) / 255;
      var a = { type: "hex", r: u, g: i, b: s, a: c };
      return a = { ...a, ...p(a) }, a;
    }
  }
  return r;
}
function tr(r, n, e = 0.5, t = "hex") {
  var a = ar(r, n, e);
  return w(a, t);
}
function ar(r, n, e = 0.5) {
  const t = typeof r.a > "u" ? 1 : r.a, a = typeof n.a > "u" ? 1 : n.a;
  return {
    r: l(r.r + (n.r - r.r) * e),
    g: l(r.g + (n.g - r.g) * e),
    b: l(r.b + (n.b - r.b) * e),
    a: l(t + (a - t) * e, 100)
  };
}
function F(r, n, e = 0.5, t = "hex") {
  var a = v(r), g = v(n);
  return tr(a, g, e, t);
}
function gr(r, n, e = 0.5, t = "hex") {
  return F(r, n, e, t);
}
const d = [
  { rgb: "#ff0000", start: 0 },
  { rgb: "#ffff00", start: 0.17 },
  { rgb: "#00ff00", start: 0.33 },
  { rgb: "#00ffff", start: 0.5 },
  { rgb: "#0000ff", start: 0.67 },
  { rgb: "#ff00ff", start: 0.83 },
  { rgb: "#ff0000", start: 1 }
];
function Cr(r) {
  for (var n, e, t = 0; t < d.length; t++)
    if (d[t].start >= r) {
      n = d[t - 1], e = d[t];
      break;
    }
  return n && e ? gr(
    n,
    e,
    (r - n.start) / (e.start - n.start)
  ) : d[0].rgb;
}
function sr() {
  for (var r = 0, n = d.length; r < n; r++) {
    var e = d[r], t = v(e.rgb);
    e.r = t.r, e.g = t.g, e.b = t.b;
  }
}
sr();
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function usePointerStart(...args) {
  let [selector, downAction, moveAction, upAction] = args;
  if (isFunction(selector)) {
    [downAction, moveAction, upAction] = args;
    selector = null;
  }
  return useMagicMethod(POINTERSTART(selector), (evt) => {
    if (isFunction(downAction)) {
      const ret = downAction(evt);
      if (!isUndefined(ret)) {
        return ret;
      }
    }
    const move = (e) => {
      if (isFunction(moveAction)) {
        moveAction(e);
      }
    };
    const end = (e) => {
      if (isFunction(upAction))
        upAction(e);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", end);
    };
    if (isFunction(moveAction)) {
      document.addEventListener("mousemove", move);
    }
    if (isFunction(upAction) || isFunction(moveAction)) {
      document.addEventListener("mouseup", end);
    }
  });
}
const NumberStyleKeys = {
  width: true,
  height: true,
  top: true,
  left: true,
  right: true,
  bottom: true,
  maxWidth: true,
  maxHeight: true,
  minWidth: true,
  minHeight: true,
  margin: true,
  marginTop: true,
  marginRight: true,
  marginBottom: true,
  marginLeft: true,
  padding: true,
  paddingTop: true,
  paddingRight: true,
  paddingBottom: true,
  paddingLeft: true,
  border: true,
  borderTop: true,
  borderRight: true,
  borderBottom: true,
  borderLeft: true,
  borderWidth: true,
  borderTopWidth: true,
  borderRightWidth: true,
  borderBottomWidth: true,
  borderLeftWidth: true,
  gap: true
};
const ComponentPropsToStylePropsMap = {
  alignContent: "alignContent",
  alignItems: "alignItems",
  alignSelf: "alignSelf",
  area: "gridArea",
  autoColumns: "gridAutoColumns",
  autoFlow: "gridAutoFlow",
  autoRows: "gridAutoRows",
  backgroundColor: "backgroundColor",
  backgroundImage: "backgroundImage",
  basis: "flexBasis",
  border: "border",
  borderRadius: "borderRadius",
  bottom: "bottom",
  boxShadow: "boxShadow",
  color: "color",
  column: "gridColumn",
  columnEnd: "gridColumnEnd",
  columnGap: "columnGap",
  columnSpan: "gridColumn",
  columnStart: "gridColumnStart",
  direction: "flexDirection",
  display: "display",
  flex: "flex",
  fontFamily: "fontFamily",
  fontSize: "fontSize",
  fontStyle: "fontStyle",
  fontWeight: "fontWeight",
  gap: "gap",
  grow: "flexGrow",
  height: "height",
  justifyContent: "justifyContent",
  left: "left",
  letterSpacing: "letterSpacing",
  lineHeight: "lineHeight",
  margin: "margin",
  marginBlock: "marginBlock",
  marginBlockEnd: "marginBlockEnd",
  marginBlockStart: "marginBlockStart",
  marginBottom: "marginBlockEnd",
  marginInline: "marginInline",
  marginInlineEnd: "marginInlineEnd",
  marginInlineStart: "marginInlineStart",
  marginLeft: "marginInlineStart",
  marginRight: "marginInlineEnd",
  marginTop: "marginBlockStart",
  maxHeight: "maxHeight",
  maxWidth: "maxWidth",
  minHeight: "minHeight",
  minWidth: "minWidth",
  objectFit: "objectFit",
  objectPosition: "objectPosition",
  opacity: "opacity",
  order: "order",
  overflow: "overflow",
  padding: "padding",
  paddingBlock: "paddingBlock",
  paddingBlockEnd: "paddingBlockEnd",
  paddingBlockStart: "paddingBlockStart",
  paddingBottom: "paddingBlockEnd",
  paddingInline: "paddingInline",
  paddingInlineEnd: "paddingInlineEnd",
  paddingInlineStart: "paddingInlineStart",
  paddingLeft: "paddingInlineStart",
  paddingRight: "paddingInlineEnd",
  paddingTop: "paddingBlockStart",
  position: "position",
  resize: "resize",
  right: "right",
  row: "gridRow",
  rowEnd: "gridRowEnd",
  rowGap: "rowGap",
  rowSpan: "gridRow",
  rowStart: "gridRowStart",
  shrink: "flexShrink",
  templateAreas: "gridTemplateAreas",
  templateColumns: "gridTemplateColumns",
  templateRows: "gridTemplateRows",
  textAlign: "textAlign",
  textDecoration: "textDecoration",
  textTransform: "textTransform",
  top: "top",
  transform: "transform",
  transformOrigin: "transformOrigin",
  width: "width",
  whiteSpace: "whiteSpace",
  wrap: "flexWrap",
  zIndex: "zIndex"
};
const styleKeys = {};
const uppercasePattern = /([A-Z])/g;
const convertStyleKey = (key) => {
  if (styleKeys[key]) {
    return styleKeys[key];
  }
  const upperKey = key.replace(uppercasePattern, "-$1").toLowerCase();
  styleKeys[key] = upperKey;
  return upperKey;
};
function makeCssVariablePrefixMap(prefix, obj = {}) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = prefix + "-" + convertStyleKey(key);
  });
  return newObj;
}
function splitStyleKeyAndNoneStyleKey(properties) {
  const style2 = {};
  const noneStyle = {};
  Object.keys(properties).forEach((key) => {
    const value = properties[key];
    const styleKey = ComponentPropsToStylePropsMap[key];
    if (styleKey) {
      style2[styleKey] = value;
    } else {
      noneStyle[key] = value;
    }
  });
  return { style: style2, noneStyle };
}
function convertNumberStyleValue(key, value) {
  if (typeof value === "number") {
    if (NumberStyleKeys[key]) {
      value = value + "px";
    }
  }
  return value;
}
function propertyMap(styles = {}, mapper = {}) {
  const styleObj = {};
  Object.keys(styles).forEach((key) => {
    if (typeof styles[key] !== "undefined") {
      styleObj[mapper[key] || key] = convertNumberStyleValue(key, styles[key]);
    }
  });
  return Object.keys(styleObj).length ? styleObj : void 0;
}
const ADD_BODY_FIRST_MOUSEMOVE = "add/body/first/mousemove";
const ADD_BODY_MOUSEMOVE = "add/body/mousemove";
const ADD_BODY_MOUSEUP = "add/body/mouseup";
const BODY_MOVE_EVENT = "body/move/event";
const _components = {};
function registerComponent(key, Component) {
  if (key && Component) {
    if (_components[key]) {
      console.warn(
        `Component ${key} is already registered. Rename key string for  `,
        Component
      );
    } else {
      _components[key] = Component;
    }
  }
  return Component;
}
const cssProperties$U = makeCssVariablePrefixMap("--elf--alert", {
  borderColor: true,
  backgroundColor: true,
  selectedBackgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true
});
class Alert extends UIElement {
  template() {
    const {
      variant = "default",
      title: title2 = "",
      content = "",
      shape = "rect",
      style: style2 = {},
      closable = false,
      dismissable = false,
      delay = 0,
      actions,
      weak,
      icon,
      ...extrProps
    } = this.props;
    const [localDelay, setLocalDelay] = useState(delay);
    const [hide, setHide] = useState(false);
    this.state.hideCallback = useCallback(
      (hideDelay = 0) => {
        setLocalDelay(hideDelay);
      },
      [setLocalDelay]
    );
    const localClass = useMemo(() => {
      return classnames("elf--alert", {
        [variant]: true,
        weak,
        hide,
        closable,
        [shape]: true,
        dismissable
      });
    }, [variant, weak, hide, closable, shape, dismissable]);
    const styleObject = {
      class: localClass,
      style: {
        ...propertyMap(style2, cssProperties$U),
        ...{
          transition: `opacity ${localDelay}ms ease-in-out`,
          opacity: hide ? 0 : 1
        }
      },
      ...extrProps
    };
    const titleIcon = title2 && icon ? icon : void 0;
    const contentIcon = content && icon && !title2 ? icon : void 0;
    const titleActions = title2 && actions ? actions : void 0;
    const contentActions = content && actions && !title2 ? actions : void 0;
    return /* @__PURE__ */ createElementJsx(
      "div",
      {
        ...styleObject,
        onContextMenu: (e) => e.preventDefault(),
        onTransitionEnd: () => {
          this.props.onHide && this.props.onHide();
          this.destroy(true);
        }
      },
      title2 ? /* @__PURE__ */ createElementJsx("div", { class: "elf--alert-title" }, titleIcon, " ", /* @__PURE__ */ createElementJsx("span", null, title2), " ", titleActions ? /* @__PURE__ */ createElementJsx("div", { class: "elf--alert-actions" }, titleActions) : void 0) : null,
      content ? /* @__PURE__ */ createElementJsx("div", { class: "elf--alert-content" }, contentIcon, " ", /* @__PURE__ */ createElementJsx("span", null, content), " ", contentActions ? /* @__PURE__ */ createElementJsx("div", { class: "elf--alert-actions" }, contentActions) : void 0) : null,
      closable ? /* @__PURE__ */ createElementJsx(
        "div",
        {
          class: "elf--alert-close",
          onClick: () => {
            setHide(true);
            if (localDelay === 0) {
              this.props.onHide && this.props.onHide();
              this.destroy(true);
            }
          }
        },
        "×"
      ) : null
    );
  }
  hide(hideDelay = 0) {
    var _a;
    (_a = this.state) == null ? void 0 : _a.hideCallback(hideDelay);
  }
}
registerComponent("Alert", Alert);
registerComponent("alert", Alert);
const cssProperties$T = makeCssVariablePrefixMap("--elf--animation", {
  name: true,
  iterationCount: true,
  timingFunction: true,
  duration: true,
  delay: true,
  playState: true
});
class Animation extends UIElement {
  template() {
    const {
      name = "spin",
      delay = "0s",
      iterationCount,
      timingFunction,
      duration = "1s",
      style: style2 = {},
      content,
      play = false,
      onEnd: onAnimationEnd,
      onIteration: onAnimationIteration,
      onStart: onAnimationStart,
      onCancel: onAnimationCancel
    } = this.props;
    const styleObject = {
      class: "elf--animation",
      style: propertyMap(
        {
          ...style2,
          duration,
          name,
          iterationCount,
          timingFunction,
          delay,
          playState: play ? "running" : "paused"
        },
        cssProperties$T
      ),
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      onAnimationCancel
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, content);
  }
}
[
  "spin",
  "ping",
  "fade",
  "scaledown",
  "bounce",
  "flash",
  "pulse",
  "rubberBand",
  "shake",
  "headShake",
  "swing",
  "tada",
  "wobble",
  "jello",
  "heartBeat"
].forEach((name) => {
  Animation[name] = (props) => {
    return /* @__PURE__ */ createElementJsx(Animation, { ...props, name });
  };
});
registerComponent("animation", Animation);
registerComponent("Animation", Animation);
const cssProperties$S = makeCssVariablePrefixMap("--elf--progress-circle", {
  backgroundColor: true,
  color: true,
  duration: true,
  offset: true,
  width: true
});
class ProgressCircle extends UIElement {
  template() {
    const {
      min = 0,
      max = 100,
      value = min,
      variant = "default",
      size = "medium",
      style: style2 = {},
      indeterminate = false,
      animated = false,
      animationType = "normal"
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--progress-circle", {
        [variant]: true,
        [size]: true,
        animated,
        indeterminate,
        [animationType]: true
      });
    }, [variant, size, indeterminate, animated, animationType]);
    const percentValue = (value - min) / (max - min);
    const styleObject = {
      class: localClass,
      style: propertyMap(
        {
          ...style2,
          offset: percentValue
        },
        cssProperties$S
      )
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { class: "progress-area" }, /* @__PURE__ */ createElementJsx("svg", null, /* @__PURE__ */ createElementJsx("circle", { class: "progress-circle track", r: "50%", cx: "50%", cy: "50%" }), /* @__PURE__ */ createElementJsx("circle", { class: "progress-circle fill", r: "50%", cx: "50%", cy: "50%" }))));
  }
}
registerComponent("progress-circle", ProgressCircle);
registerComponent("progresscircle", ProgressCircle);
registerComponent("ProgressCircle", ProgressCircle);
const cssProperties$R = makeCssVariablePrefixMap("--elf--button", {
  borderColor: true,
  backgroundColor: true,
  selectedBackgroundColor: true,
  disabledColor: true,
  color: true,
  textColor: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true
});
class Button extends UIElement {
  template() {
    const {
      variant = "default",
      size = "medium",
      disabled,
      selected,
      focused,
      shape = "none",
      quiet = false,
      outline = false,
      thin = false,
      closable = false,
      place = "",
      style: style2 = {},
      href = "",
      target = "_blank",
      content,
      class: className,
      iconOnly = false,
      justified = false,
      pending = false,
      play = false,
      hover = false,
      as = "button",
      hasMinWidth = false,
      ...extraProps
    } = this.props;
    const localClass = useMemo(() => {
      return classnames([
        "elf--button",
        {
          selected,
          outline,
          focused,
          quiet,
          closable,
          justified,
          [variant]: true,
          [size]: true,
          [shape]: true,
          [place]: true,
          thin,
          hover,
          "icon-only": iconOnly,
          "has-min-width": hasMinWidth
        },
        className
      ]);
    }, [
      variant,
      size,
      selected,
      shape,
      quiet,
      outline,
      place,
      closable,
      iconOnly,
      className,
      justified,
      focused,
      hover,
      hasMinWidth,
      thin
    ]);
    const styleObject = {
      class: localClass,
      disabled: disabled ? "disabled" : void 0,
      style: propertyMap(style2, cssProperties$R),
      ...extraProps
    };
    const buttonContent = /* @__PURE__ */ createElementJsx("span", null, pending ? /* @__PURE__ */ createElementJsx(Animation.spin, { play }, /* @__PURE__ */ createElementJsx(ProgressCircle, { value: 80, size, variant })) : content || "");
    if (as === "link") {
      return /* @__PURE__ */ createElementJsx("a", { ...styleObject, href, target }, buttonContent);
    } else {
      return /* @__PURE__ */ createElementJsx("button", { ...styleObject }, buttonContent);
    }
  }
}
registerComponent("button", Button);
registerComponent("btn", Button);
registerComponent("Button", Button);
const cssProperties$Q = makeCssVariablePrefixMap("--elf--tooltip", {
  backgroundColor: true,
  color: true,
  height: true,
  hoverColor: true,
  borderColor: true,
  boxShadow: true,
  toolsBorderColor: true,
  toolsBorderRadius: true,
  hgap: true,
  vgap: true,
  delay: true,
  contentPadding: true,
  maxWidth: true,
  position: true
});
class Tooltip extends UIElement {
  initState() {
    const trigger = this.props.trigger || "hover";
    return {
      trigger: isString(trigger) ? [trigger] : trigger,
      delay: 1e3,
      show: this.props.show || false
    };
  }
  template() {
    const {
      style: style2 = {},
      message = "",
      content,
      placement = "bottom",
      animated = false,
      hideArrow = false,
      variant = "default",
      position = "relative",
      icon
    } = this.props;
    const { show } = this.state;
    const localClass = useMemo(() => {
      return classnames("elf--tooltip", {
        [placement]: true,
        animated,
        [variant]: true,
        [position]: true
      });
    }, [placement, animated, variant, position]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$Q)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { class: "content" }, content), show || this.props.show ? /* @__PURE__ */ createElementJsx("div", { class: "message" }, hideArrow ? void 0 : /* @__PURE__ */ createElementJsx("div", { class: "arrow" }), icon ? /* @__PURE__ */ createElementJsx("div", { class: "icon" }, icon) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "message-content" }, /* @__PURE__ */ createElementJsx("div", null, message))) : void 0);
  }
  show() {
    this.open();
  }
  hide() {
    this.close();
  }
  open() {
    this.setState({
      show: true
    });
  }
  close() {
    setTimeout(() => {
      this.setState({
        show: false
      });
    }, this.props.hideDelay);
  }
  toggle() {
    this.setState({
      show: !this.state.show
    });
  }
  checkClickable(e) {
    const $menu = Dom.create(e.target).closest("elf--tooltip-content");
    if ($menu)
      return false;
    return true;
  }
  checkTriggerClick() {
    return this.state.trigger.includes("click");
  }
  checkTriggerOver() {
    return this.state.trigger.includes("hover");
  }
  checkTriggerFocus() {
    return this.state.trigger.includes("focus");
  }
  [POINTERENTER("$el") + IF("checkTriggerOver")]() {
    this.open();
  }
  checkNotInTooltip(e) {
    const $menu = Dom.create(e.target).closest("elf--tooltip");
    if (!$menu)
      return true;
    return this.$el.is($menu) === false;
  }
  [POINTERLEAVE("$el") + IF("checkTriggerOver")]() {
    this.close();
  }
  [CLICK("$el") + IF("checkTriggerClick")]() {
    this.toggle();
  }
  [FOCUS("$el") + IF("checkTriggerFocus")]() {
    this.open();
  }
  remove() {
    this.$el.remove();
  }
}
function tooltip({
  content,
  message = "",
  delay = 0,
  position = "fixed",
  placement = "top",
  options = {},
  style: style2,
  variant = "default"
}) {
  const root = potal(
    /* @__PURE__ */ createElementJsx(
      Tooltip,
      {
        variant,
        delay,
        position,
        placement,
        message,
        style: style2,
        show: true
      },
      content || /* @__PURE__ */ createElementJsx("span", null, " ")
    ),
    options
  );
  return root.firstChild;
}
const cssProperties$P = makeCssVariablePrefixMap("--elf--action-group", {
  alignItems: true,
  gap: true
});
class ActionGroup extends UIElement {
  template() {
    const {
      direction = "horizontal",
      quiet = false,
      compact = false,
      justified = false,
      collapsed = false,
      moreIcon = null,
      boundary = 50,
      style: style2 = {},
      content,
      shape = "normal",
      ...extraStyle
    } = this.props;
    const [visibleTargetList, setVisibilityTargetList] = useState([]);
    const [rootRect, setRootRect] = useState(null);
    const { style: styleProperties } = splitStyleKeyAndNoneStyleKey(extraStyle);
    useEffect(() => {
      var _a;
      if (!collapsed)
        return;
      const list2 = [];
      let totalWidth = 0;
      const localRect = (_a = this.$el) == null ? void 0 : _a.rect();
      if (!localRect)
        return;
      this.$el.children().forEach((child, index2) => {
        if (child.hasClass("hidden-tools"))
          return;
        const rect = child.rect();
        let isVisible = rect.right + boundary < localRect.right;
        if (isVisible) {
          totalWidth += rect.width;
          if (totalWidth + boundary > localRect.width) {
            totalWidth = localRect.width - boundary;
            isVisible = false;
          }
        }
        list2[index2] = isVisible;
      });
      setVisibilityTargetList(list2);
    }, [collapsed, rootRect]);
    useEffect(() => {
      let resizeObserver;
      if (collapsed) {
        resizeObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            setRootRect(Dom.create(entry.target).rect());
          });
        });
        if (!this.$el)
          return;
        resizeObserver.observe(this.$el.el);
      }
      return () => {
        resizeObserver == null ? void 0 : resizeObserver.disconnect();
      };
    }, [collapsed]);
    const localClass = useMemo(() => {
      return classnames("elf--action-group", {
        [direction]: true,
        quiet,
        compact,
        collapsed,
        justified,
        [shape]: true
      });
    }, [direction, quiet, compact, collapsed, justified, shape]);
    const styleObject = {
      class: localClass,
      style: propertyMap(
        {
          ...style2,
          ...styleProperties
        },
        cssProperties$P
      )
    };
    const items2 = collapsed ? content.filter((item, index2) => {
      return visibleTargetList[index2];
    }) : content;
    const hiddenItems = collapsed ? content.filter((item, index2) => {
      return !visibleTargetList[index2];
    }) : [];
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, items2, hiddenItems.length ? /* @__PURE__ */ createElementJsx(
      Tooltip,
      {
        message: hiddenItems,
        trigger: "click",
        hideArrow: true,
        position: "bottom-left",
        style: { contentPadding: "0px" }
      },
      /* @__PURE__ */ createElementJsx(Button, { iconOnly: true }, moreIcon)
    ) : void 0);
  }
}
registerComponent("action-group", ActionGroup);
registerComponent("ActionGroup", ActionGroup);
function RoundButton({ content, ...props }) {
  return /* @__PURE__ */ createElementJsx(Button, { ...props, shape: "round" }, content);
}
function IconButton({ content, ...props }) {
  return /* @__PURE__ */ createElementJsx(RoundButton, { ...props, iconOnly: true }, content);
}
registerComponent("icon-button", IconButton);
registerComponent("iconbutton", IconButton);
registerComponent("IconButton", IconButton);
const cssProperties$O = makeCssVariablePrefixMap("--elf--link-button", {
  borderColor: true,
  backgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  padding: true
});
class LinkButton extends UIElement {
  template() {
    const { disabled, style: style2 = {}, content, onClick, href } = this.props;
    const styleObject = {
      class: "elf--link-button",
      disabled: disabled ? "disabled" : void 0,
      style: {
        ...propertyMap(style2, cssProperties$O)
      }
    };
    return /* @__PURE__ */ createElementJsx("a", { ...styleObject, onClick, href: href || "#" }, /* @__PURE__ */ createElementJsx("span", null, content || ""));
  }
}
registerComponent("link-button", LinkButton);
registerComponent("linkbutton", LinkButton);
registerComponent("LinkButton", LinkButton);
const cssProperties$N = makeCssVariablePrefixMap("--elf--radio", {
  borderColor: true,
  backgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true
});
class Radio extends UIElement {
  template() {
    const {
      disabled,
      style: style2 = {},
      value,
      content,
      name,
      checked = false,
      onChange,
      size = "medium",
      variant = "default"
    } = this.props;
    const localClass = useMemo(() => {
      return classnames([
        "elf--radio",
        {
          disabled,
          [size]: true,
          [variant]: true
        }
      ]);
    }, [disabled, size, variant]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$N)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("label", null, /* @__PURE__ */ createElementJsx(
      "input",
      {
        ref: "$input",
        type: "radio",
        ...{
          value,
          name,
          disabled: disabled ? "disabled" : void 0,
          checked: checked ? "checked" : void 0
        },
        onChange: (e) => onChange == null ? void 0 : onChange(e, value)
      }
    ), content));
  }
}
registerComponent("radio", Radio);
registerComponent("Radio", Radio);
const cssProperties$M = makeCssVariablePrefixMap("--elf--radio", {
  borderColor: true,
  backgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true
});
class RadioGroup extends UIElement {
  template() {
    const {
      disabled,
      style: style2 = {},
      name,
      value,
      options = [],
      onChange,
      direction = "horizontal",
      size = "medium",
      variant = "default"
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--radio-group", {
        [direction]: true
      });
    }, [direction]);
    const styleObject = {
      class: localClass,
      disabled: disabled ? "disabled" : void 0,
      style: propertyMap(style2, cssProperties$M)
    };
    const radioName = name || "name-" + this.id;
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, options.map((it, index2) => {
      const checked = it.value === value;
      return /* @__PURE__ */ createElementJsx(
        Radio,
        {
          ref: `$${index2}`,
          name: radioName,
          value: it.value,
          onChange: (e, v2) => {
            this.setState({ value: v2 }, false);
            onChange(e, v2);
          },
          checked,
          disabled,
          size,
          variant
        },
        it.label
      );
    }));
  }
  get value() {
    return this.state.value || this.props.value;
  }
  set value(value) {
    this.setState({ value });
  }
}
registerComponent("RadioGroup", RadioGroup);
registerComponent("radio-group", RadioGroup);
registerComponent("radiogroup", RadioGroup);
const cssProperties$L = {
  borderColor: "--elf--checkbox-border-color",
  backgroundColor: "--elf--checkbox-background",
  disabledColor: "--elf--checkbox-disabled-color",
  color: "--elf--checkbox-color",
  fontSize: "--elf--checkbox-font-size",
  fontWeight: "--elf--checkbox-font-weight",
  height: "--elf--checkbox-height",
  padding: "--elf--checkbox-padding",
  borderRadius: "--elf--checkbox-border-radius"
};
class Checkbox extends UIElement {
  template() {
    const {
      disabled,
      style: style2 = {},
      value,
      content,
      name,
      checked = false,
      onChange,
      indeterminate = false,
      variant = "default",
      size = "medium"
    } = this.props;
    const styleObject = {
      class: classnames([
        "elf--checkbox",
        {
          disabled,
          [variant]: true,
          [size]: true
        }
      ]),
      style: {
        ...propertyMap(style2, cssProperties$L)
      }
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("label", null, /* @__PURE__ */ createElementJsx(
      "input",
      {
        ref: "$input",
        type: "checkbox",
        ...{
          indeterminate,
          value,
          name,
          disabled: disabled ? "disabled" : void 0,
          checked: checked ? "checked" : void 0
        },
        onChange: (e) => onChange == null ? void 0 : onChange(e, value)
      }
    ), (content == null ? void 0 : content.length) ? /* @__PURE__ */ createElementJsx("span", { class: "text" }, content) : void 0));
  }
  get checked() {
    return this.refs.$input.checked;
  }
  get value() {
    return this.props.value;
  }
}
registerComponent("Checkbox", Checkbox);
registerComponent("checkbox", Checkbox);
const cssProperties$K = {
  borderColor: "--elf--checkbox-border-color",
  backgroundColor: "--elf--checkbox-background",
  disabledColor: "--elf--checkbox-disabled-color",
  color: "--elf--checkbox-color",
  fontSize: "--elf--checkbox-font-size",
  fontWeight: "--elf--checkbox-font-weight",
  height: "--elf--checkbox-height",
  padding: "--elf--checkbox-padding",
  borderRadius: "--elf--checkbox-border-radius"
};
class CheckboxGroup extends UIElement {
  initState() {
    return {
      value: this.props.value || []
    };
  }
  template() {
    const {
      disabled,
      style: style2 = {},
      value = [],
      options = [],
      onChange,
      direction = "horizontal",
      size = "medium",
      variant = "default"
    } = this.props;
    const styleObject = {
      class: classnames([
        "elf--checkbox-group",
        {
          [direction]: true
        }
      ]),
      disabled: disabled ? "disabled" : void 0,
      style: {
        ...propertyMap(style2, cssProperties$K)
      }
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, options.map((it, index2) => {
      return /* @__PURE__ */ createElementJsx(
        Checkbox,
        {
          ref: `checkbox-${index2}`,
          value: it.value,
          onChange: (e) => {
            onChange(e, this.getValues());
          },
          checked: value == null ? void 0 : value.includes(it.value),
          disabled,
          indeterminate: it.indeterminate,
          size,
          variant
        },
        it.label
      );
    }));
  }
  getValues() {
    const values = [];
    Object.keys(this.children).forEach((key) => {
      const child = this.children[key];
      if (child.checked) {
        values.push(child.value);
      }
    });
    return values;
  }
  get disabled() {
    return this.props.disabled;
  }
  get value() {
    return this.getValues();
  }
  set value(values = []) {
    this.setState({ values });
  }
}
registerComponent("checkbox-group", CheckboxGroup);
registerComponent("CheckboxGroup", CheckboxGroup);
const cssProperties$J = makeCssVariablePrefixMap("--elf--divider", {
  color: true,
  margin: true,
  height: true,
  borderStyle: true
});
class Divider extends UIElement {
  template() {
    const {
      style: style2 = {},
      variant = "default",
      size = "small",
      margin = "10px",
      orientation = "horizontal"
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--divider", {
        [size]: true,
        [variant]: true,
        [orientation]: true
      });
    }, [size, variant, orientation]);
    const styleObject = {
      class: localClass,
      style: {
        ...propertyMap(
          {
            ...style2,
            margin
          },
          cssProperties$J
        )
      }
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { className: "elf--divider-inner" }));
  }
}
registerComponent("divider", Divider);
registerComponent("Divider", Divider);
const MenuItemType = {
  DIVIDER: "divider",
  SECTION: "section",
  MENU: "menu",
  ITEM: "item",
  CUSTOM: "custom",
  LINK: "link"
};
function makeMenuItem(items2 = [], variant, rootClose) {
  return items2.map((it, index2) => {
    const ref = `${it.type || "item"}${index2}`;
    if (isString(it) && it === "-") {
      return /* @__PURE__ */ createElementJsx(DividerMenuItem, { ref, variant, rootClose });
    } else if (isFunction(it)) {
      return /* @__PURE__ */ createElementJsx(
        CustomMenuItem,
        {
          variant,
          ref: `custom${index2}`,
          render: it,
          rootClose
        }
      );
    } else if (it.type === MenuItemType.CUSTOM) {
      return /* @__PURE__ */ createElementJsx(
        CustomMenuItem,
        {
          variant,
          ref,
          ...it,
          rootClose
        }
      );
    } else if (it.type === MenuItemType.LINK) {
      return /* @__PURE__ */ createElementJsx(
        LinkMenuItem,
        {
          variant,
          ref,
          ...it,
          rootClose
        }
      );
    } else if (it.type === MenuItemType.SECTION) {
      return /* @__PURE__ */ createElementJsx(
        SectionMenuItem,
        {
          variant,
          ref,
          ...it,
          rootClose
        }
      );
    } else if (it.type === MenuItemType.DIVIDER) {
      return /* @__PURE__ */ createElementJsx(
        DividerMenuItem,
        {
          variant,
          ref,
          ...it,
          rootClose
        }
      );
    }
    return /* @__PURE__ */ createElementJsx(MenuItem, { ref, variant, ...it, rootClose });
  });
}
function DividerMenuItem({ dashed = false }) {
  return /* @__PURE__ */ createElementJsx("li", { class: "elf--divider", dashed });
}
function CustomMenuItem({ render, rootClose }) {
  return /* @__PURE__ */ createElementJsx("li", { class: "custom" }, render == null ? void 0 : render({ rootClose }));
}
function LinkMenuItem({ rootClose, title: title2, link }) {
  return /* @__PURE__ */ createElementJsx("li", { class: "link" }, /* @__PURE__ */ createElementJsx("a", { href: link, onClick: rootClose }, title2));
}
function SectionMenuItem({ title: title2 = "" }) {
  return /* @__PURE__ */ createElementJsx("li", { class: "section-title" }, title2);
}
class MenuItem extends UIElement {
  initState() {
    const {
      title: title2 = "",
      hover = false,
      shortcut,
      icon,
      items: items2 = [],
      disabled = false,
      selectable,
      selected,
      selectedIcon = "✓",
      closable = true,
      rootClose,
      description,
      variant
    } = this.props;
    return {
      title: title2,
      hover,
      shortcut,
      icon,
      items: items2,
      selectable,
      selected,
      selectedIcon,
      disabled,
      closable,
      rootClose,
      description,
      variant
    };
  }
  template() {
    const {
      title: title2 = "",
      shortcut,
      icon,
      expandIcon = "▶",
      items: items2 = [],
      hover,
      selected,
      selectable,
      selectedIcon,
      disabled,
      rootClose,
      description,
      variant,
      show = false
    } = this.state;
    const hasItems = items2.length > 0;
    const selectedValue = isFunction(selected) ? selected() : selected;
    const localClass = useMemo(() => {
      return classnames({
        hover
      });
    }, [hover]);
    return /* @__PURE__ */ createElementJsx("li", { class: localClass, disabled: disabled ? true : void 0 }, /* @__PURE__ */ createElementJsx("div", { class: "menu-item-content" }, selectable ? /* @__PURE__ */ createElementJsx("span", { class: "selected-icon" }, selectedValue ? selectedIcon : void 0) : null, icon ? /* @__PURE__ */ createElementJsx("div", { class: "icon" }, icon) : void 0, title2 ? /* @__PURE__ */ createElementJsx("div", { class: "menu-title" }, title2) : void 0, shortcut || hasItems ? /* @__PURE__ */ createElementJsx("div", { class: "value-area" }, shortcut ? /* @__PURE__ */ createElementJsx("div", { class: "shortcut" }, shortcut) : void 0, hasItems ? /* @__PURE__ */ createElementJsx("div", { class: "icon" }, expandIcon) : void 0) : void 0), description ? /* @__PURE__ */ createElementJsx("div", { class: "menu-item-description" }, description) : void 0, items2.length > 0 || show ? /* @__PURE__ */ createElementJsx(Menu, { items: items2, variant, rootClose }) : void 0);
  }
  checkClickable() {
    if (this.state.disabled) {
      return false;
    }
    const { type = MenuItemType.ITEM, items: items2 = [] } = this.props;
    return type === MenuItemType.ITEM && items2.length === 0;
  }
  [CLICK("$el") + IF("checkClickable") + PREVENT + STOP](e) {
    var _a, _b;
    const { selectable = false, onClick, closable = true } = this.props;
    if (selectable) {
      this.setSelected(!this.selected);
    }
    if (isFunction(onClick)) {
      onClick(e, this);
    }
    if (closable) {
      (_b = (_a = this.props).rootClose) == null ? void 0 : _b.call(_a);
    }
  }
  setSelected(isSelected = false) {
    this.setState({
      selected: isSelected
    });
  }
  get selected() {
    return this.state.selected;
  }
}
const cssProperties$I = makeCssVariablePrefixMap("--elf--menu", {
  left: true,
  top: true,
  backgroundColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true,
  borderColor: true,
  boxShadow: true,
  width: true,
  maxWidth: true,
  sectionTitleColor: true,
  sectionTitleBackgroundColor: true,
  dividerColor: true,
  directionLeft: true,
  itemPadding: true
});
class Menu extends UIElement {
  template() {
    let {
      style: style2 = {},
      type = "menu",
      x = 0,
      y = 0,
      direction = "left",
      items: items2 = [],
      rootClose,
      autoPosition = false,
      variant = "light",
      compact = false
    } = this.props;
    let itemStyle = { ...style2 };
    if (x !== 0)
      itemStyle = { ...itemStyle, left: x };
    if (y !== 0)
      itemStyle = { ...itemStyle, top: y };
    if (autoPosition) {
      const index2 = items2.findIndex((it) => {
        return it.selectable && it.selected;
      });
      itemStyle = { ...itemStyle, top: -1 * (index2 * 24 + 8) };
    }
    const localClass = useMemo(() => {
      return classnames("elf--menu", {
        [type]: true,
        [variant]: true,
        compact
      });
    }, [type, variant, compact]);
    const styleObject = {
      "data-direction": direction,
      class: localClass,
      style: propertyMap(itemStyle, cssProperties$I)
    };
    return /* @__PURE__ */ createElementJsx("menu", { ...styleObject, onContextMenu: (e) => e.preventDefault() }, makeMenuItem(items2, variant, rootClose));
  }
  [OBSERVER("intersection") + PARAMS({
    root: document.body
  })](intersects = []) {
    const item = intersects.find(
      (it) => it.isIntersecting && it.intersectionRatio < 1
    );
    if (item) {
      const { left: bLeft, right: bRight } = item.boundingClientRect;
      const { left: iLeft, right: iRight } = item.intersectionRect;
      let direction = "left";
      if (iRight != bRight && iLeft != bLeft) {
        direction = "center";
      } else if (iRight != bRight) {
        direction = "right";
      }
      this.$el.attr("data-direction", direction);
    }
  }
}
registerComponent("Menu", Menu);
registerComponent("MenuItem", MenuItem);
registerComponent("SectionMenuItem", SectionMenuItem);
registerComponent("DividerMenuItem", DividerMenuItem);
registerComponent("menu", Menu);
registerComponent("menuitem", MenuItem);
registerComponent("sectionmenuitem", SectionMenuItem);
registerComponent("dividermenuitem", DividerMenuItem);
registerComponent("menu-item", MenuItem);
registerComponent("section-menu-item", SectionMenuItem);
registerComponent("divider-menu-item", DividerMenuItem);
function ArrowIcon() {
  return /* @__PURE__ */ createElementJsx("svg", { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ createElementJsx("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }));
}
const cssProperties$H = makeCssVariablePrefixMap("--elf--option-menu", {
  backgroundColor: true,
  color: true,
  width: true
});
class OptionMenu extends UIElement {
  template() {
    const {
      icon,
      content,
      items: items2,
      quiet,
      menuStyle = {},
      disabled = void 0,
      autoPosition = false,
      style: style2
    } = this.props;
    const { isOpen } = this.state;
    const showMenu = isOpen && items2;
    const localClass = useMemo(() => {
      return classnames("elf--option-menu", {
        quiet
      });
    }, [quiet]);
    const styleObject = {
      class: localClass,
      disabled,
      style: propertyMap(style2, cssProperties$H)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "content",
        onClick: () => {
          this.setState({
            isOpen: !this.state.isOpen
          });
        }
      },
      icon ? /* @__PURE__ */ createElementJsx("div", { class: "elf--option-menu-icon" }, icon) : void 0,
      /* @__PURE__ */ createElementJsx("div", { class: "text" }, content),
      /* @__PURE__ */ createElementJsx("div", { class: "arrow" }, /* @__PURE__ */ createElementJsx(ArrowIcon, null))
    ), showMenu ? /* @__PURE__ */ createElementJsx("div", { class: "menu-area" }, /* @__PURE__ */ createElementJsx(
      Menu,
      {
        type: "dropdown",
        autoPosition,
        rootClose: () => {
          this.close();
        },
        style: menuStyle,
        items: items2
      }
    )) : void 0);
  }
  close() {
    this.setState({
      isOpen: false
    });
  }
  checkClickable(e) {
    const $menu = Dom.create(e.target).closest("menu-area");
    if ($menu)
      return false;
    return true;
  }
  checkNotInMenu(e) {
    const $menu = Dom.create(e.target).closest("elf--option-menu");
    if (!$menu)
      return true;
    return this.$el.is($menu) === false;
  }
  [CLICK("document") + IF("checkClickable") + IF("checkNotInMenu")]() {
    this.close();
  }
}
registerComponent("OptionMenu", OptionMenu);
registerComponent("optionmenu", OptionMenu);
registerComponent("option-menu", OptionMenu);
const cssProperties$G = makeCssVariablePrefixMap("--elf--dialog", {
  position: true,
  backgroundColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true,
  borderColor: true,
  boxShadow: true,
  width: true
});
class Dialog extends UIElement {
  initState() {
    const { visible = false, style: style2 = {}, center } = this.props;
    return {
      visible,
      style: style2,
      center
    };
  }
  close() {
    const { onClose } = this.props;
    if (isFunction(onClose)) {
      onClose(this);
    }
  }
  ok() {
    const { onOk } = this.props;
    if (isFunction(onOk)) {
      onOk(this);
    }
  }
  cancel() {
    const { onCancel } = this.props;
    if (isFunction(onCancel)) {
      onCancel(this);
    }
  }
  makeDefaultTools() {
    const {
      footer,
      cancelText = "Cancel",
      okText = "OK",
      okProps = {},
      cancelProps = {}
    } = this.props;
    if (!footer) {
      return [
        /* @__PURE__ */ createElementJsx(Button, { shape: "round", ...cancelProps, onClick: () => this.cancel() }, cancelText),
        /* @__PURE__ */ createElementJsx(
          Button,
          {
            shape: "round",
            variant: "primary",
            ...okProps,
            onClick: () => this.ok()
          },
          okText
        )
      ];
    }
    return "";
  }
  template() {
    const { style: style2 = {}, visible, center } = this.state;
    const { noBorder, title: title2, closable = true, footer } = this.props;
    const styleObject = {
      class: classnames("elf--dialog", {
        visible,
        center,
        "no-border": noBorder
      }),
      style: {
        ...propertyMap(style2, cssProperties$G)
      }
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { class: "elf--dialog-title" }, /* @__PURE__ */ createElementJsx("div", { class: "elf--dialog-title-text" }, title2), this.props.tools ? /* @__PURE__ */ createElementJsx("div", { class: "elf--dialog-title-tools", ref: "$tools" }, this.props.tools) : void 0, closable ? /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "elf--dialog-title-close",
        ref: "$close",
        onClick: () => this.close()
      },
      "×"
    ) : void 0), noBorder ? void 0 : /* @__PURE__ */ createElementJsx("div", { class: "elf--dialog-divider" }), /* @__PURE__ */ createElementJsx("div", { class: "elf--dialog-content" }, /* @__PURE__ */ createElementJsx("div", { class: "elf--dialog-text" }, this.props.content || ""), /* @__PURE__ */ createElementJsx("div", { class: "elf--dialog-content-tools" }, footer ? footer : this.makeDefaultTools())));
  }
}
registerComponent("dialog", Dialog);
registerComponent("Dialog", Dialog);
class Flex extends UIElement {
  template() {
    const {
      style: style2 = {},
      class: className = "",
      content,
      stack,
      wrap = false,
      sameWidth = false
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--flex", className, {
        stack,
        wrap,
        "same-width": sameWidth
      });
    }, [className, stack, wrap, sameWidth]);
    const styleObject = {
      class: localClass,
      style: {
        ...propertyMap(style2, {})
      }
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, content);
  }
}
registerComponent("flex", Flex);
registerComponent("Flex", Flex);
class ToolsItem extends UIElement {
  initialize() {
    super.initialize();
    const events = this.props.events || [];
    if (events.length) {
      events.forEach((event) => {
        this.on(event, () => {
          this.refresh();
        });
      });
    }
  }
  initState() {
    const { selected, selectedType } = this.props;
    return {
      selected,
      selectedType
    };
  }
  template() {
    const {
      title: title2 = "",
      icon,
      style: style2 = {},
      tooltip: tooltip2,
      hoverable = true
    } = this.props;
    const isIconOnly = !title2;
    const localClass = useMemo(() => {
      return classnames("elf--tools-item", {
        selected: this.state.selected ? true : void 0,
        "icon-only": isIconOnly,
        hoverable
      });
    }, [this.state.selected, isIconOnly, hoverable]);
    const buttonComponent = /* @__PURE__ */ createElementJsx("button", { type: "button", class: "tools-button" }, /* @__PURE__ */ createElementJsx(Flex, { style: { gap: 10 } }, [
      icon ? /* @__PURE__ */ createElementJsx("span", { class: "icon" }, isFunction(icon) ? icon() : icon) : void 0,
      title2 ? /* @__PURE__ */ createElementJsx("span", { class: "menu-title" }, isFunction(title2) ? title2() : title2) : void 0
    ].filter(Boolean)));
    let localTooltip = tooltip2;
    if (localTooltip) {
      if (typeof localTooltip === "string") {
        localTooltip = { message: localTooltip };
      }
    }
    return /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: localClass,
        "data-selected-type": this.state.selectedType,
        onClick: this.props.onClick,
        style: style2
      },
      localTooltip ? /* @__PURE__ */ createElementJsx(Tooltip, { ...localTooltip, style: { height: "100%" } }, buttonComponent) : buttonComponent
    );
  }
  setSelected(isSelected = false) {
    this.setState({
      selected: isSelected
    });
  }
  get selected() {
    if (isFunction(this.state.selected)) {
      return this.state.selected();
    }
    return this.state.selected;
  }
  set selected(value) {
    this.setSelected(value);
  }
}
registerComponent("tools-item", ToolsItem);
registerComponent("toolsitem", ToolsItem);
registerComponent("ToolsItem", ToolsItem);
class ToolsCustomItem extends ToolsItem {
  template() {
    var _a, _b;
    const { hoverable = true } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--tools-item custom", {
        hoverable
      });
    }, [hoverable]);
    return /* @__PURE__ */ createElementJsx("div", { class: localClass }, (_b = (_a = this.props).render) == null ? void 0 : _b.call(_a, this));
  }
}
registerComponent("tools-custom-item", ToolsCustomItem);
registerComponent("toolscustomitem", ToolsCustomItem);
registerComponent("ToolsCustomItem", ToolsCustomItem);
class ToolsMenuItem extends ToolsItem {
  initState() {
    const { selected, opened } = this.props;
    return {
      selected,
      opened,
      rootClose: this.close.bind(this)
    };
  }
  template() {
    const { selected, opened = false } = this.state;
    const {
      direction = "left",
      menuStyle,
      noArrow = false,
      title: title2 = "",
      icon,
      disabled,
      style: style2 = {},
      items: items2,
      class: className,
      hoverable = true
    } = this.props;
    const hasItems = items2.length > 0;
    const isSelected = selected ? isFunction(selected) ? selected() : selected : void 0;
    const localClass = useMemo(() => {
      return classnames(
        "elf--tools-item",
        {
          selected: isSelected,
          "has-items": hasItems,
          hoverable
        },
        className
      );
    }, [isSelected, hasItems, className, hoverable]);
    return /* @__PURE__ */ createElementJsx("div", { class: localClass, disabled, style: style2 }, /* @__PURE__ */ createElementJsx("button", { type: "button", class: "tools-button" }, /* @__PURE__ */ createElementJsx(Flex, { style: { columnGap: 4 } }, [
      icon ? /* @__PURE__ */ createElementJsx("span", { class: "icon" }, isFunction(icon) ? icon() : icon) : void 0,
      title2 ? /* @__PURE__ */ createElementJsx("span", { class: "menu-title" }, isFunction(title2) ? title2() : title2) : void 0
    ].filter(Boolean)), hasItems && !noArrow ? /* @__PURE__ */ createElementJsx("span", { class: classnames("arrow", { opened }) }, /* @__PURE__ */ createElementJsx(ArrowIcon, null)) : void 0), opened && !disabled ? /* @__PURE__ */ createElementJsx("div", { class: "menu-area" }, /* @__PURE__ */ createElementJsx("div", { class: "background", "data-direction": direction }), /* @__PURE__ */ createElementJsx(
      Menu,
      {
        ref: "$menu",
        items: items2,
        direction,
        rootClose: this.state.rootClose,
        style: {
          ...menuStyle || {},
          top: "100%"
        }
      }
    )) : void 0);
  }
  runCallback(callback, e) {
    if (isFunction(callback)) {
      callback(e, this);
    }
  }
  open() {
    if (!this.state.opened) {
      this.setState({
        rect: this.$el.rect(),
        opened: true
      });
    }
  }
  close() {
    if (this.state.opened) {
      this.setState({
        opened: false
      });
    }
  }
  toggle() {
    if (!this.state.opened) {
      this.setState(
        {
          rect: this.$el.rect()
        },
        false
      );
      this.open();
    } else {
      this.close();
    }
  }
  checkClickable(e) {
    const $menu = Dom.create(e.target).closest("menu-area");
    if ($menu)
      return false;
    return true;
  }
  checkTriggerClick() {
    const { trigger = "click", onClick } = this.props;
    return trigger === "click" || trigger === "hover" && isFunction(onClick);
  }
  checkTriggerOver() {
    return this.props.trigger === "hover";
  }
  [POINTEROVER("$el") + IF("checkTriggerOver")]() {
    this.open();
  }
  checkNotInMenu(e) {
    const $menu = Dom.create(e.target).closest("elf--tools-item");
    if (!$menu)
      return true;
    return this.$el.is($menu) === false;
  }
  [POINTERLEAVE("$el") + IF("checkTriggerOver")]() {
    this.close();
  }
  [CLICK("document") + IF("checkClickable") + IF("checkNotInMenu")]() {
    this.close();
  }
  [CLICK("$el") + IF("checkClickable") + IF("checkTriggerClick")](e) {
    if (Dom.create(e.target).hasClass("arrow") && !this.state.noArrow || this.state.noArrow) {
      this.toggle();
      if (this.state.opened) {
        this.runCallback(this.props.onOpen, e);
      } else {
        this.runCallback(this.props.onClose, e);
      }
      this.runCallback(this.props.onClick, e);
    } else {
      this.close();
      this.runCallback(this.props.onClick, e);
    }
  }
}
registerComponent("ToolsMenuItem", ToolsMenuItem);
registerComponent("tools-menu-item", ToolsMenuItem);
registerComponent("toolsmenuitem", ToolsMenuItem);
const ToolsItemType = {
  MENU: "menu",
  ITEM: "item",
  CUSTOM: "custom"
};
function makeToolsItem(items2 = [], options = {}) {
  return items2.map((it, index2) => {
    const ref = `${it.type}-${index2}`;
    let visibility = options.emphasized ? options.visibleTargetList[index2] ? "visible" : "hidden" : "visible";
    if (options.visibility) {
      visibility = "visible";
    }
    if (it.type === ToolsItemType.CUSTOM) {
      return /* @__PURE__ */ createElementJsx(
        ToolsCustomItem,
        {
          ref,
          ...it,
          style: { visibility, ...it.style || {} }
        }
      );
    }
    if (it.type === ToolsItemType.MENU) {
      return /* @__PURE__ */ createElementJsx(
        ToolsMenuItem,
        {
          ref,
          ...it,
          style: { visibility, ...it.style || {} }
        }
      );
    }
    return /* @__PURE__ */ createElementJsx(
      ToolsItem,
      {
        ref,
        ...it,
        style: { visibility, ...it.style || {} }
      }
    );
  });
}
function makeHiddenToolsItem(items2 = [], options = {}) {
  return items2.filter((it, index2) => {
    let visibility = options.emphasized ? options.visibleTargetList[index2] ? "visible" : "hidden" : "visible";
    if (options.visibility) {
      visibility = "visible";
    }
    return visibility === "hidden";
  });
}
const cssProperties$F = makeCssVariablePrefixMap("--elf--tools", {
  backgroundColor: true,
  color: true,
  height: true
});
class Tools extends UIElement {
  template() {
    const {
      style: style2 = {},
      vertical = false,
      emphasized = false,
      moreIcon
    } = this.props;
    const [visibleTargetList, setVisibilityTargetList] = useState([]);
    const [lastLeft, setLastLeft] = useState(0);
    const [visibility, setVisibility] = useState(true);
    const [rootRect, setRootRect] = useState(null);
    useEffect(() => {
      let observer, resizeObserver;
      if (emphasized) {
        const options = {
          root: this.parent.parent.$el.el,
          threshold: 1
        };
        observer = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.intersectionRatio < 1) {
              setVisibility(false);
            } else {
              setVisibility(true);
            }
            setRootRect(e.intersectionRect);
          });
        }, options);
        observer.observe(this.$el.el);
        resizeObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            setRootRect(Dom.create(entry.target).rect());
          });
        });
        resizeObserver.observe(this.parent.parent.$el.el);
      }
      return () => {
        observer == null ? void 0 : observer.disconnect();
        resizeObserver == null ? void 0 : resizeObserver.disconnect();
      };
    }, [emphasized]);
    useEffect(() => {
      var _a;
      if (emphasized && !visibility) {
        const list2 = [];
        let totalWidth = 0;
        const localRect = (_a = this.$el) == null ? void 0 : _a.rect();
        if (!localRect)
          return;
        this.$el.children().forEach((child, index2) => {
          if (child.hasClass("hidden-tools"))
            return;
          const rect = child.rect();
          let isVisible = rect.right + 50 < rootRect.right;
          if (isVisible) {
            totalWidth += rect.width;
            if (totalWidth + 50 > rootRect.width) {
              totalWidth = rootRect.width - 50;
              isVisible = false;
            }
          }
          list2[index2] = isVisible;
        });
        setVisibilityTargetList(list2);
        setLastLeft(localRect.width - (localRect.right - rootRect.right) - 50);
      }
    }, [emphasized, visibility, rootRect]);
    const localClass = useMemo(() => {
      return classnames("elf--tools", {
        vertical,
        emphasized
      });
    }, [vertical, emphasized]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$F)
    };
    const items2 = makeToolsItem(this.props.items, {
      visibleTargetList,
      rootRect,
      visibility,
      emphasized
    });
    const hiddenItems = makeHiddenToolsItem(this.props.items, {
      visibleTargetList,
      rootRect,
      visibility,
      emphasized
    });
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject, onContextMenu: (e) => e.preventDefault() }, items2, hiddenItems.length ? /* @__PURE__ */ createElementJsx(
      ToolsMenuItem,
      {
        class: "hidden-tools",
        items: hiddenItems,
        icon: moreIcon,
        direction: "right",
        noArrow: true,
        style: {
          position: "absolute",
          height: "100%",
          left: lastLeft
        }
      }
    ) : void 0);
  }
}
registerComponent("Tools", Tools);
registerComponent("tools", Tools);
function makeToolbarItem(items2 = [], options = {}) {
  return items2.map((it, index2) => {
    const ref = `${it.type || "item"}${index2}`;
    return /* @__PURE__ */ createElementJsx(ToolbarItem, { ref, ...it, ...options });
  });
}
class ToolbarItem extends UIElement {
  template() {
    const { items: items2, style: style2, emphasized, moreIcon } = this.props;
    return /* @__PURE__ */ createElementJsx("div", { class: "elf--toolbar-item" }, /* @__PURE__ */ createElementJsx(
      Tools,
      {
        items: items2,
        style: style2,
        emphasized,
        moreIcon
      }
    ));
  }
}
const cssProperties$E = makeCssVariablePrefixMap("--elf--toolbar", {
  backgroundColor: true,
  color: true,
  height: true,
  align: true
});
class Toolbar extends UIElement {
  template() {
    const {
      style: style2 = {},
      align = "space-between",
      variant = "default",
      rounded = false,
      emphasized = false,
      items: items2 = [],
      class: className
    } = this.props;
    const localClass = useMemo(() => {
      return classnames(
        "elf--toolbar",
        {
          [align]: true,
          rounded,
          emphasized,
          [variant]: true
        },
        className
      );
    }, [align, variant, rounded, emphasized, className]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$E)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject, onContextMenu: (e) => e.preventDefault() }, makeToolbarItem(items2, {
      emphasized
    }));
  }
}
registerComponent("toolbar", Toolbar);
registerComponent("Toolbar", Toolbar);
const cssProperties$D = makeCssVariablePrefixMap("--elf--notification", {
  backgroundColor: true,
  color: true,
  width: true,
  height: true,
  hoverColor: true,
  borderColor: true,
  boxShadow: true,
  toolsBorderColor: true,
  toolsBorderRadius: true
});
class Notification extends UIElement {
  template() {
    const {
      style: style2 = {},
      icon,
      content,
      tools,
      direction = "top-left"
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--notification", {
        [direction]: true,
        "has-icon": icon
      });
    }, [direction, icon]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$D)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject, onContextMenu: (e) => e.preventDefault() }, icon ? /* @__PURE__ */ createElementJsx("div", { class: "icon" }, icon) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "content" }, /* @__PURE__ */ createElementJsx("div", { class: "text" }, content)), /* @__PURE__ */ createElementJsx("div", { class: "tools" }, tools || []));
  }
}
registerComponent("notification", Notification);
const cssProperties$C = makeCssVariablePrefixMap("--elf--toast", {
  backgroundColor: true,
  color: true,
  height: true,
  hoverColor: true,
  borderColor: true,
  boxShadow: true,
  toolsBorderColor: true,
  toolsBorderRadius: true,
  hgap: true,
  vgap: true
});
class Toast extends UIElement {
  template() {
    const {
      style: style2 = {},
      content,
      delay = 0,
      animationDelay = 300,
      icon,
      direction = "bottom",
      closable,
      variant = void 0,
      onClose
    } = this.props;
    const [localDelay, setLocalDelay] = useState(delay);
    const [hide, setHide] = useState(false);
    this.state.hideCallback = useCallback(
      (hideDelay = 0) => {
        setLocalDelay(hideDelay);
      },
      [setLocalDelay]
    );
    const localClass = useMemo(() => {
      return classnames("elf--toast", {
        hide,
        [direction]: true,
        [variant]: true
      });
    }, [hide, direction, variant]);
    const styleObject = {
      class: localClass,
      style: {
        ...propertyMap(style2, cssProperties$C),
        transition: `opacity ${animationDelay}ms ease-in-out, transform  ${animationDelay}ms ease-in-out`,
        opacity: hide ? 0 : 1,
        transform: hide ? "translateY(10px)" : "translateY(0px)",
        transformOrigin: "center"
      }
    };
    useEffect(() => {
      if (localDelay > 0) {
        if (!hide) {
          this.props.onShow && this.props.onShow();
        }
        setTimeout(() => {
          if (!hide) {
            setHide(true);
          }
        }, localDelay);
      }
    }, [localDelay, hide]);
    return /* @__PURE__ */ createElementJsx(
      "div",
      {
        ...styleObject,
        onContextMenu: (e) => e.preventDefault(),
        onTransitionEnd: () => {
          isFunction(onClose) && onClose();
          this.destroy(true);
        }
      },
      icon ? /* @__PURE__ */ createElementJsx("div", { class: "icon" }, icon) : void 0,
      /* @__PURE__ */ createElementJsx("div", { class: "content" }, /* @__PURE__ */ createElementJsx("div", { class: "elf--toast-text" }, content)),
      /* @__PURE__ */ createElementJsx("div", { class: "tools" }, this.props.tools || []),
      closable ? /* @__PURE__ */ createElementJsx("div", { class: "close-area" }, /* @__PURE__ */ createElementJsx(
        Button,
        {
          size: "small",
          variant,
          iconOnly: true,
          quiet: true,
          closable: true,
          onClick: () => this.hide(1)
        },
        "×"
      )) : void 0
    );
  }
  hide(hideDelay = 0) {
    var _a;
    (_a = this.state) == null ? void 0 : _a.hideCallback(hideDelay);
  }
}
registerComponent("toast", Toast);
registerComponent("Toast", Toast);
function FixedTooltip({
  content,
  message,
  position = "fixed",
  options,
  ...tooltipProps
}) {
  const tooltipRef = useRef(null);
  const onMouseEnter = useCallback(
    (e) => {
      const target = Dom.create(e.target);
      const labelRect = target.rect();
      const { left, top, width, height, right, bottom } = labelRect;
      (options == null ? void 0 : options.container) || document.body;
      tooltipRef.current = tooltip({
        placement: "top",
        ...tooltipProps,
        message,
        position,
        style: {
          left,
          top,
          width,
          height,
          right,
          bottom
        },
        options
      });
    },
    [message]
  );
  const onMouseLeave = useCallback(() => {
    tooltipRef.current.close();
    tooltipRef.current.remove();
    tooltipRef.current = null;
  }, [message]);
  return /* @__PURE__ */ createElementJsx(
    "div",
    {
      class: "elf--fixed-tooltip",
      style: {
        display: "inline-block",
        width: "fit-content",
        height: "fit-content"
      },
      onMouseEnter,
      onMouseLeave
    },
    content
  );
}
const cssProperties$B = makeCssVariablePrefixMap("--elf--popover", {
  backgroundColor: true,
  color: true,
  height: true,
  hoverColor: true,
  borderColor: true,
  boxShadow: true,
  toolsBorderColor: true,
  toolsBorderRadius: true,
  hgap: true,
  vgap: true,
  delay: true,
  contentPadding: true
});
class Popover extends UIElement {
  initState() {
    return {
      trigger: this.props.trigger || "hover",
      delay: 1e3,
      show: this.props.show || false
    };
  }
  template() {
    const {
      style: style2 = {},
      body = "",
      content,
      placement = "bottom",
      showTip = false,
      animated = false
    } = this.props;
    const { show } = this.state;
    const styleObject = {
      class: classnames("elf--popover", { [placement]: true, animated }),
      style: {
        ...propertyMap(style2, cssProperties$B)
      }
    };
    const isPopoverShow = show || this.props.show;
    const isShowTip = isPopoverShow && showTip;
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { class: "elf--popover-content" }, content, isShowTip ? /* @__PURE__ */ createElementJsx("div", { class: "tip" }) : void 0), isPopoverShow ? /* @__PURE__ */ createElementJsx("div", { class: "elf--popover-message" }, /* @__PURE__ */ createElementJsx("div", { class: "elf--popover-message-content" }, body), /* @__PURE__ */ createElementJsx("div", { class: "event-panel" })) : void 0);
  }
  open() {
    this.setState({
      show: true
    });
  }
  close() {
    setTimeout(() => {
      this.setState({
        show: false
      });
    }, this.props.hideDelay);
  }
  toggle() {
    this.setState({
      show: !this.state.show
    });
  }
  checkClickable(e) {
    const $menu = Dom.create(e.target).closest("elf--popover-content");
    if ($menu)
      return false;
    return true;
  }
  checkTriggerClick() {
    return this.state.trigger === "click";
  }
  checkTriggerOver() {
    return this.state.trigger === "hover";
  }
  [POINTERENTER("$el") + IF("checkTriggerOver")]() {
    this.open();
  }
  checkNotInpopover(e) {
    const $menu = Dom.create(e.target).closest("elf--popover");
    if (!$menu)
      return true;
    return this.$el.is($menu) === false;
  }
  [POINTERLEAVE("$el") + IF("checkTriggerOver")]() {
    this.close();
  }
  [CLICK("$el") + IF("checkTriggerClick")]() {
    this.toggle();
  }
}
registerComponent("popover", Popover);
registerComponent("Popover", Popover);
const cssProperties$A = makeCssVariablePrefixMap("--elf--panel", {
  backgroundColor: true,
  color: true,
  height: true,
  hoverColor: true,
  borderColor: true,
  boxShadow: true,
  padding: true,
  borderRadius: true
});
class Panel extends UIElement {
  template() {
    const {
      style: style2 = {},
      content,
      theme,
      title: title2 = "",
      tools = [],
      mode = "default",
      footer
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--panel", { [mode]: true });
    }, [mode]);
    const styleObject = {
      class: localClass,
      "data-theme": theme,
      style: propertyMap(style2, cssProperties$A)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, title2 ? /* @__PURE__ */ createElementJsx("div", { class: "elf--panel-title" }, /* @__PURE__ */ createElementJsx("div", { class: "elf--panel-title-text" }, title2), tools ? /* @__PURE__ */ createElementJsx("div", { class: "elf--panel-title-tools" }, tools || []) : void 0) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "elf--panel-content" }, content), footer ? /* @__PURE__ */ createElementJsx("div", { class: "elf--panel-footer" }, footer) : void 0);
  }
}
registerComponent("panel", Panel);
registerComponent("Panel", Panel);
const cssProperties$z = makeCssVariablePrefixMap("--elf--tabstrip", {
  backgroundColor: true,
  color: true,
  height: true,
  borderColor: true,
  gap: true,
  offset: true,
  selectedColor: true
});
class TabStrip extends UIElement {
  template() {
    var _a;
    const {
      style: style2 = {},
      items: items2 = [],
      fitted = false,
      align = "left",
      orientation = "horizontal",
      activeKey,
      showIndicator = true,
      compact = false,
      size = "medium",
      variant = "default",
      quiet = false,
      stripType = "underline"
    } = this.props;
    const [indicatorInfo, setIndicatorInfo] = useState({
      left: 0,
      width: 0
    });
    const localClass = useMemo(() => {
      return classnames("elf--tabstrip", {
        "is-fitted": fitted,
        [orientation]: true,
        [size]: true,
        [variant]: true,
        [stripType]: true,
        quiet,
        compact
      });
    }, [fitted, orientation, size, variant, quiet, stripType, compact]);
    useEffect(() => {
      if (showIndicator) {
        const ref = this.refs[`tab-${activeKey}`];
        if (ref) {
          if (orientation === "horizontal") {
            const left = ref.offsetLeft;
            const width = ref.offsetWidth + (stripType === "group" ? 1 : 0);
            setIndicatorInfo({ left, width });
          } else {
            const top = ref.offsetTop;
            const height = ref.offsetHeight + (stripType === "group" ? 1 : 0);
            setIndicatorInfo({ top, height });
          }
        }
      }
    }, [activeKey, setIndicatorInfo, orientation, showIndicator, stripType]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$z)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: classnames("elf--tabstrip-content", {
          [`align-${align}`]: true
        })
      },
      items2.map((it) => {
        const isSelected = isUndefined(it.selected) ? activeKey === it.key : !!it.selected;
        const isDisabled = !!it.disabled;
        const selectedStyle = it.selectedStyle || {};
        const style22 = it.style || {};
        return /* @__PURE__ */ createElementJsx(
          "div",
          {
            class: classnames("elf--tabstrip-item", {
              selected: isSelected,
              disabled: isDisabled
            }),
            style: isSelected ? selectedStyle : style22
          },
          /* @__PURE__ */ createElementJsx("div", { ref: `tab-${it.key}`, onClick: it.onClick }, it.title)
        );
      }),
      showIndicator ? /* @__PURE__ */ createElementJsx("div", { class: "indicator" }, /* @__PURE__ */ createElementJsx("div", { class: "indicator-inner", style: indicatorInfo })) : void 0
    ), ((_a = this.props.tools) == null ? void 0 : _a.length) ? /* @__PURE__ */ createElementJsx("div", { class: "elf--tabstrip-tools" }, this.props.tools.map((it) => {
      return /* @__PURE__ */ createElementJsx("div", { class: "elf--tabstrip-tool" }, it);
    })) : void 0);
  }
}
registerComponent("tabstrip", TabStrip);
registerComponent("TabStrip", TabStrip);
registerComponent("tab-strip", TabStrip);
const cssProperties$y = makeCssVariablePrefixMap("--elf--tab", {
  backgroundColor: true,
  color: true,
  height: true,
  width: true,
  hoverColor: true,
  borderColor: true
});
function TabItem({ selected, content }) {
  return /* @__PURE__ */ createElementJsx(
    "div",
    {
      class: classnames("elf--tab-content-item", {
        selected
      })
    },
    content
  );
}
class Tab extends UIElement {
  initState() {
    return {
      activeKey: this.props.activeKey
    };
  }
  changeActiveKey(key) {
    const { onChange } = this.props;
    this.setState({ activeKey: key });
    if (isFunction(onChange)) {
      onChange(key);
    }
  }
  template() {
    const {
      style: style2 = {},
      content,
      full,
      fitted,
      align = "left",
      orientation = "horizontal",
      showIndicator = true,
      size = "medium",
      variant = "default",
      quiet = false,
      compact = false,
      stripType = "underline",
      stripStyle = {}
    } = this.props;
    const { activeKey } = this.state;
    const localClass = useMemo(() => {
      return classnames("elf--tab", {
        full
      });
    }, [full]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$y)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { class: "elf--tab-header" }, /* @__PURE__ */ createElementJsx(
      TabStrip,
      {
        fitted,
        align,
        orientation,
        activeKey,
        showIndicator,
        size,
        variant,
        quiet,
        stripType,
        compact,
        style: stripStyle,
        items: content.map((it) => {
          const { title: title2, key, onClick, disabled, style: style22, selectedStyle } = it.props;
          const selected = activeKey === key;
          return {
            title: title2,
            style: style22,
            disabled,
            selectedStyle,
            key,
            selected,
            onClick: () => {
              this.changeActiveKey(key);
              onClick && onClick();
            }
          };
        })
      }
    )), /* @__PURE__ */ createElementJsx("div", { class: "elf--tab-body" }, content.map((it) => {
      const { key, content: content2, disabled } = it.props;
      const selected = key === activeKey;
      return /* @__PURE__ */ createElementJsx(TabItem, { key, selected, disabled }, content2);
    })));
  }
}
registerComponent("tab", Tab);
registerComponent("Tab", Tab);
registerComponent("TabItem", TabItem);
registerComponent("tab-item", TabItem);
registerComponent("tabitem", TabItem);
class Layout extends UIElement {
  template() {
    const { style: style2 = {}, content, wrap = false } = this.props;
    const styleObject = {
      class: classnames("elf--layout", {
        stack: this.props.stack,
        wrap
      }),
      style: {
        ...propertyMap(style2, {
          backgroundColor: "--elf--layout-background-color",
          gap: "--elf--layout-gap"
        })
      }
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, content);
  }
}
registerComponent("layout", Layout);
registerComponent("Layout", Layout);
class VBox extends Flex {
  template() {
    const { style: style2 = {}, content } = this.props;
    return /* @__PURE__ */ createElementJsx(Flex, { stack: true, style: style2 }, content);
  }
}
registerComponent("vbox", VBox);
registerComponent("VBox", VBox);
function makeTemplates(arr) {
  if (typeof arr === "number") {
    arr = Array.from({ length: arr }, () => 1);
  } else if (Array.isArray(arr) === false) {
    arr = [arr];
  }
  if (arr.length === 0) {
    return void 0;
  }
  return arr.map((it) => isNumber(it) ? `${it}fr` : it).join(" ");
}
class Grid extends UIElement {
  template() {
    const {
      class: className = "",
      style: style2 = {},
      columns = [],
      rows = [],
      gap,
      columnGap,
      rowGap,
      content,
      ...extraStyle
    } = this.props;
    const { style: styleProperties, noneStyle } = splitStyleKeyAndNoneStyleKey(extraStyle);
    const styleObject = {
      class: classnames("elf--grid", className),
      style: {
        gridTemplateColumns: makeTemplates(columns),
        gridTemplateRows: makeTemplates(rows),
        gap,
        columnGap,
        rowGap,
        ...propertyMap({ ...style2, ...styleProperties }, {})
      },
      ...noneStyle
    };
    Object.keys(styleObject.style).forEach((key) => {
      if (styleObject.style[key] === void 0) {
        delete styleObject.style[key];
      }
    });
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, content);
  }
}
registerComponent("grid", Grid);
registerComponent("Grid", Grid);
const cssProperties$x = makeCssVariablePrefixMap("--elf--input-editor", {
  width: true,
  borderColor: true,
  backgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true,
  placeholderColor: true,
  emptyColor: true,
  paddingRight: true
});
class InputEditor extends UIElement {
  initState() {
    const { autoFocus = false, focused = false, hover = false } = this.props;
    return {
      autoFocus,
      focused,
      hover: hover || false
    };
  }
  template() {
    const {
      icon,
      tools,
      size = "medium",
      readOnly = false,
      invalid,
      style: style2,
      value,
      min,
      max,
      step,
      placeholder,
      disabled,
      type = "text"
    } = this.props;
    const { hover = false, focused = false } = this.state;
    const localClass = useMemo(() => {
      return classnames([
        "elf--input-editor",
        {
          focused,
          hover,
          disabled,
          icon,
          invalid,
          [size]: true,
          readonly: readOnly
        }
      ]);
    }, [focused, hover, disabled, icon, invalid, size, readOnly]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$x)
    };
    const inputEvents = {
      onInput: this.props.onInput,
      onChange: this.props.onChange,
      onKeyDown: this.props.onKeyDown,
      onKeyUp: this.props.onKeyUp,
      onKeyPress: this.props.onKeyPress,
      onSelect: this.props.onSelect,
      onPaste: this.props.onPaste,
      onCut: this.props.onCut,
      onCopy: this.props.onCopy,
      onClick: this.props.onClick,
      onDblClick: this.props.onDblClick,
      onMouseDown: this.props.onMouseDown,
      onMouseUp: this.props.onMouseUp,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onMouseOver: this.props.onMouseOver,
      onMouseOut: this.props.onMouseOut,
      onMouseMove: this.props.onMouseMove,
      onContextMenu: this.props.onContextMenu
    };
    const properties = {
      type,
      disabled,
      readonly: readOnly ? "readonly" : void 0,
      placeholder: placeholder || "",
      value: typeof value === "undefined" ? "" : value,
      min,
      max,
      step
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, icon ? /* @__PURE__ */ createElementJsx("div", { class: "elf--input-editor-icon" }, icon) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-area" }, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-item" }, /* @__PURE__ */ createElementJsx("input", { ref: "$input", ...properties, ...inputEvents }))), tools ? tools : void 0);
  }
  onMounted() {
    if (this.state.autoFocus) {
      setTimeout(() => {
        this.refs.$input.focus();
        this.refs.$input.select();
      }, 10);
    }
  }
  runCallback(callback, e) {
    if (isFunction(callback)) {
      callback(e, this);
    }
  }
  [FOCUSIN("$input")](e) {
    this.setState({
      focused: true
    });
    this.runCallback(this.props.onFocus, e);
  }
  [FOCUSOUT("$input")](e) {
    this.setState({
      focused: false
    });
    this.runCallback(this.props.onBlur, e);
  }
  get value() {
    return this.refs.$input.value;
  }
  set value(v2) {
    this.refs.$input.value = v2;
  }
  get selectedValue() {
    return document.getSelection().toString();
  }
}
registerComponent("input-editor", InputEditor);
registerComponent("InputEditor", InputEditor);
registerComponent("inputeditor", InputEditor);
function ColorView({ color }) {
  const parsedColor = v(color);
  const { r, g, b } = parsedColor;
  return /* @__PURE__ */ createElementJsx("div", { class: "elf--color-view" }, /* @__PURE__ */ createElementJsx(
    "div",
    {
      class: "elf--color-view-color",
      style: { backgroundColor: w({ r, g, b }, "rgb") }
    }
  ), /* @__PURE__ */ createElementJsx("div", { class: "elf--color-view-opacity-pattern" }, /* @__PURE__ */ createElementJsx(
    "div",
    {
      class: "elf--color-view-opacity",
      style: { backgroundColor: w(parsedColor, "rgb") }
    }
  )));
}
registerComponent("color-view", ColorView);
registerComponent("ColorView", ColorView);
registerComponent("colorview", ColorView);
const cssProperties$w = makeCssVariablePrefixMap("--elf--input-paint", {
  borderColor: true,
  backgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true,
  placeholderColor: true,
  emptyColor: true
});
function normalizeAlpha(a) {
  a = Math.round(a * 100) / 100;
  return Math.min(1, Math.max(0, a));
}
class InputPaint extends UIElement {
  initState() {
    const {
      autoFocus = false,
      focused,
      hover = false,
      hasOpacity = true,
      value
    } = this.props;
    return {
      autoFocus,
      hover: hover || false,
      focused: focused || false,
      hasOpacity,
      originalValue: value
    };
  }
  template() {
    const {
      icon,
      hideColorView = false,
      onClickColorView,
      disabled,
      placeholder,
      value,
      sync = false
    } = this.props;
    const { style: style2 = {}, focused = false, hover = false } = this.state;
    if (!this.state.parsedColor || sync) {
      this.state.parsedColor = v(value);
    }
    const localClass = useMemo(() => {
      return classnames([
        "elf--input-paint",
        {
          focused,
          hover,
          disabled,
          icon
        }
      ]);
    }, [focused, hover, disabled, icon]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$w)
    };
    const inputEvents = {
      onInput: this.props.onInput,
      onChange: this.props.onChange,
      onKeyDown: this.props.onKeyDown,
      onKeyUp: this.props.onKeyUp,
      onKeyPress: this.props.onKeyPress,
      onSelect: this.props.onSelect,
      onPaste: this.props.onPaste,
      onCut: this.props.onCut,
      onCopy: this.props.onCopy
    };
    const { r, g, b } = this.state.parsedColor;
    const properties = {
      disabled,
      placeholder: placeholder || "",
      value: w({ r, g, b }, "hex")
    };
    const colorString = w(
      this.state.parsedColor,
      this.state.parsedColor.type
    );
    this.state.parsedColor.a = normalizeAlpha(this.state.parsedColor.a);
    const opacityString = `${100 * this.state.parsedColor.a}%`;
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, hideColorView ? void 0 : /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "elf--input-paint-icon",
        onClick: (e) => {
          onClickColorView && onClickColorView(e, colorString);
        }
      },
      /* @__PURE__ */ createElementJsx(ColorView, { color: colorString })
    ), /* @__PURE__ */ createElementJsx("div", { class: "elf--input-area" }, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-item" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        class: "color",
        ref: "$input",
        ...properties,
        ...inputEvents,
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const parsedValue = v(e.target.value);
            if (isUndefined(parsedValue.r) || isUndefined(parsedValue.g) || isUndefined(parsedValue.b)) {
              return;
            }
            const a = normalizeAlpha(this.state.parsedColor.a);
            this.state.parsedColor = {
              ...parsedValue,
              a
            };
            this.state.originalValue = e.target.value;
            this.runOnChange();
            this.refresh();
          }
        }
      }
    ))), this.state.hasOpacity && /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "elf--input-opacity",
        "data-opacity-string-length": opacityString.length
      },
      /* @__PURE__ */ createElementJsx(
        "input",
        {
          class: "opacity",
          value: opacityString,
          onKeyDown: (e) => {
            e.preventDefault();
            switch (e.key) {
              case "ArrowUp":
                this.updateOpacity(0.01);
                break;
              case "ArrowDown":
                this.updateOpacity(-0.01);
                break;
            }
          }
        }
      )
    ));
  }
  runOnChange() {
    this.runCallback(this.props.onChange, w(this.state.parsedColor));
  }
  updateOpacity(num) {
    const color = this.state.parsedColor;
    console.log(color.a, num);
    color.a += num;
    color.a = normalizeAlpha(color.a);
    console.log(color.a);
    this.runOnChange();
    this.refresh();
  }
  onMounted() {
    super.onMounted();
    if (this.state.autoFocus) {
      setTimeout(() => {
        this.refs.$input.focus();
        this.refs.$input.select();
      }, 10);
    }
  }
  runCallback(callback, e) {
    if (isFunction(callback)) {
      callback(e, this);
    }
  }
  [FOCUSIN("$el input")](e) {
    this.setState({
      focused: true
    });
    e.target.select();
    this.runCallback(this.props.onFocus, e);
  }
  [FOCUSOUT("$el input")](e) {
    this.setState({
      focused: false
    });
    this.runCallback(this.props.onBlur, e);
  }
  get value() {
    return this.refs.$input.value;
  }
  set value(v2) {
    this.refs.$input.value = v2;
  }
  get selectedValue() {
    return document.getSelection().toString();
  }
}
registerComponent("InputPaint", InputPaint);
registerComponent("input-paint", InputPaint);
registerComponent("inputpaint", InputPaint);
const cssProperties$v = makeCssVariablePrefixMap("--elf--input-paint", {
  borderColor: true,
  backgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true,
  placeholderColor: true,
  emptyColor: true
});
class HexColorEditor extends UIElement {
  constructor() {
    super(...arguments);
    __publicField(this, "keydownColor", (e) => {
      const startIndex = Math.floor(e.target.selectionStart / 2) * 2;
      let type = "";
      if (startIndex < 2) {
        type = "r";
      } else if (startIndex < 4) {
        type = "g";
      } else {
        type = "b";
      }
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          this.increaseColor(type);
          e.target.setSelectionRange(startIndex, startIndex + 2);
          break;
        case "ArrowDown":
          e.preventDefault();
          this.decreaseColor(type);
          e.target.setSelectionRange(startIndex, startIndex + 2);
          break;
      }
    });
    __publicField(this, "keyupColor", (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown")
        ;
      else {
        if (e.target.value.length === 3 || e.target.value.length === 6) {
          const color = v("#" + e.target.value);
          if (color.type === "hex") {
            if (this.isInvalidColor(color) === false) {
              this.updateFullColor(color);
            }
          }
        }
      }
    });
    __publicField(this, "keydown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      switch (e.key) {
        case "ArrowUp":
          this.increaseOpacity(e);
          e.target.select();
          break;
        case "ArrowDown":
          this.decreaseOpacity(e);
          e.target.select();
          break;
      }
    });
  }
  initState() {
    const {
      style: style2 = {},
      autoFocus = false,
      focused,
      hover = false,
      value,
      placeholder,
      disabled,
      hasOpacity = true
    } = this.props;
    const parsedColor = v(value);
    return {
      style: style2,
      autoFocus,
      hover: hover || false,
      focused: focused || false,
      placeholder,
      value,
      parsedColor,
      disabled,
      hasOpacity
    };
  }
  template() {
    const { icon, value } = this.props;
    const {
      style: style2 = {},
      focused = false,
      hover = false,
      placeholder,
      disabled
    } = this.state;
    const { r, g, b, a } = v(value);
    const localClass = useMemo(() => {
      return classnames([
        "elf--input-paint",
        {
          focused,
          hover,
          disabled,
          icon,
          invalid: this.isInvalidColor({ r, g, b, a })
        }
      ]);
    }, [focused, hover, disabled, icon, r, g, b, a]);
    const styleObject = {
      class: localClass,
      style: {
        ...propertyMap(style2, cssProperties$v)
      }
    };
    const inputEvents = {
      onInput: this.props.onInput,
      onChange: this.props.onChange,
      onKeyDown: this.props.onKeyDown,
      onKeyUp: this.props.onKeyUp,
      onKeyPress: this.props.onKeyPress,
      onSelect: this.props.onSelect,
      onPaste: this.props.onPaste,
      onCut: this.props.onCut,
      onCopy: this.props.onCopy
    };
    const properties = {
      disabled,
      placeholder: placeholder || "",
      value: w({ r, g, b }, "hex").replace("#", "")
    };
    this.setState(
      {
        parsedColor: {
          r,
          g,
          b,
          a
        }
      },
      false
    );
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-area" }, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-item" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        class: "color",
        type: "text",
        "data-type": "hex",
        maxlength: 6,
        ...properties,
        ...inputEvents,
        onKeyDown: this.keydownColor,
        onKeyUp: this.keyupColor
      }
    ))), this.state.hasOpacity && /* @__PURE__ */ createElementJsx("div", { class: "elf--input-opacity" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        class: "opacity",
        value: `${Math.round(a * 100 * 100) / 100}%`,
        onKeyDown: this.keydown
      }
    )));
  }
  updateOpacity(num) {
    this.setState(
      {
        parsedColor: {
          ...this.state.parsedColor,
          a: Math.max(
            0,
            Math.min(
              1,
              Math.round((this.state.parsedColor.a + num) * 100) / 100
            )
          )
        }
      },
      false
    );
    this.runCallback(this.props.onChange);
  }
  updateFullColor(parsedColor) {
    this.setState(
      {
        parsedColor
      },
      false
    );
    this.runCallback(this.props.onChange);
  }
  updateColor(type, num) {
    const lastValue = Math.max(
      0,
      Math.min(255, this.state.parsedColor[type] + num)
    );
    if (this.state.parsedColor[type] === lastValue) {
      return;
    }
    this.setState(
      {
        parsedColor: {
          ...this.state.parsedColor,
          [type]: Math.max(
            0,
            Math.min(255, this.state.parsedColor[type] + num)
          )
        }
      },
      false
    );
    this.runCallback(this.props.onChange);
  }
  increaseColor(type) {
    this.updateColor(type, 1);
  }
  decreaseColor(type) {
    this.updateColor(type, -1);
  }
  increaseOpacity() {
    this.updateOpacity(0.01);
  }
  decreaseOpacity() {
    this.updateOpacity(-0.01);
  }
  isInvalidColor(color) {
    return isNaN(color.r) || isNaN(color.g) || isNaN(color.b) || isNaN(color.a) || isUndefined(color.r) || isUndefined(color.g) || isUndefined(color.b) || isUndefined(color.a);
  }
  onMounted() {
    if (this.state.autoFocus) {
      setTimeout(() => {
        const $el = this.$el.$("input[data-type='hex']");
        $el.focus();
        $el.select();
      }, 10);
    }
  }
  runCallback(callback) {
    if (isFunction(callback)) {
      callback(this.value, this);
    }
  }
  [CLICK("$el .elf--input-paint-icon")](e) {
    var _a, _b;
    (_b = (_a = this.props).onClickColorView) == null ? void 0 : _b.call(_a, e);
  }
  [FOCUSIN("$el input")](e) {
    this.setState({
      focused: true
    });
    e.target.select();
    this.runCallback(this.props.onFocus, e);
  }
  [FOCUSOUT("$el input")](e) {
    this.setState({
      focused: false
    });
    this.runCallback(this.props.onBlur, e);
  }
  get value() {
    const { parsedColor } = this.state;
    const { r, g, b, a } = parsedColor;
    return w({ r, g, b, a }, "hex");
  }
  set value(v2) {
    this.refs.$input.value = v2;
  }
  get selectedValue() {
    return document.getSelection().toString();
  }
}
registerComponent("HexColorEditor", HexColorEditor);
registerComponent("hex-color-editor", HexColorEditor);
registerComponent("hexcoloreditor", HexColorEditor);
const cssProperties$u = makeCssVariablePrefixMap("--elf--input-paint", {
  borderColor: true,
  backgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true,
  placeholderColor: true,
  emptyColor: true
});
class RGBColorEditor extends UIElement {
  constructor() {
    super(...arguments);
    __publicField(this, "keydownColor", (e) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          this.increaseColor(e.target.getAttribute("data-type"));
          e.target.select();
          break;
        case "ArrowDown":
          e.preventDefault();
          this.decreaseColor(e.target.getAttribute("data-type"));
          e.target.select();
          break;
      }
    });
    __publicField(this, "keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          this.increaseOpacity(e);
          e.target.select();
          break;
        case "ArrowDown":
          e.preventDefault();
          this.decreaseOpacity(e);
          e.target.select();
          break;
        case "Tab":
          e.preventDefault();
          var $el = this.$el.$("input[data-type='r']");
          $el.focus();
          $el.select();
          break;
      }
    });
  }
  initState() {
    const {
      style: style2 = {},
      autoFocus = false,
      focused,
      hover = false,
      placeholder,
      disabled,
      hasOpacity = true
    } = this.props;
    return {
      style: style2,
      autoFocus,
      hover: hover || false,
      focused: focused || false,
      placeholder,
      disabled,
      hasOpacity
    };
  }
  template() {
    const { icon, value } = this.props;
    const {
      style: style2 = {},
      focused = false,
      hover = false,
      placeholder,
      disabled
    } = this.state;
    const styleObject = {
      class: classnames([
        "elf--input-paint",
        {
          focused,
          hover,
          disabled,
          icon
        }
      ]),
      style: {
        ...propertyMap(style2, cssProperties$u)
      }
    };
    const { r, g, b, a } = v(value);
    const properties = {
      disabled,
      placeholder: placeholder || "",
      min: 0,
      max: 255
    };
    this.setState(
      {
        parsedColor: { r, g, b, a }
      },
      false
    );
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-area" }, /* @__PURE__ */ createElementJsx(Grid, { columns: 3 }, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-item" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        class: "color",
        "data-type": "r",
        tabIndex: 1,
        value: r,
        ...properties,
        onKeyDown: this.keydownColor
      }
    )), /* @__PURE__ */ createElementJsx("div", { class: "elf--input-item" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        class: "color",
        "data-type": "g",
        tabIndex: 2,
        value: g,
        ...properties,
        onKeyDown: this.keydownColor
      }
    )), /* @__PURE__ */ createElementJsx("div", { class: "elf--input-item" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        class: "color",
        "data-type": "b",
        tabIndex: 3,
        value: b,
        ...properties,
        onKeyDown: this.keydownColor
      }
    )))), this.state.hasOpacity && /* @__PURE__ */ createElementJsx("div", { class: "elf--input-opacity" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        type: "text",
        tabIndex: 4,
        class: "opacity",
        value: `${Math.round(a * 100 * 100) / 100}%`,
        onKeyDown: this.keydown
      }
    )));
  }
  updateOpacity(num) {
    this.setState(
      {
        parsedColor: {
          ...this.state.parsedColor,
          a: Math.max(
            0,
            Math.min(
              1,
              Math.round((this.state.parsedColor.a + num) * 100) / 100
            )
          )
        }
      },
      false
    );
    this.runCallback(this.props.onChange);
  }
  updateColor(type, num) {
    this.setState(
      {
        parsedColor: {
          ...this.state.parsedColor,
          [type]: Math.max(
            0,
            Math.min(255, this.state.parsedColor[type] + num)
          )
        }
      },
      false
    );
    this.runCallback(this.props.onChange);
  }
  increaseColor(type) {
    this.updateColor(type, 1);
  }
  decreaseColor(type) {
    this.updateColor(type, -1);
  }
  increaseOpacity() {
    this.updateOpacity(0.01);
  }
  decreaseOpacity() {
    this.updateOpacity(-0.01);
  }
  onMounted() {
    if (this.state.autoFocus) {
      setTimeout(() => {
        const $el = this.$el.$("input[data-type='r']");
        $el.focus();
        $el.select();
      }, 10);
    }
  }
  runCallback(callback) {
    if (isFunction(callback)) {
      callback(this.value, this);
    }
  }
  [CLICK("$el .elf--input-paint-icon")](e) {
    var _a, _b;
    (_b = (_a = this.props).onClickColorView) == null ? void 0 : _b.call(_a, e);
  }
  [FOCUSIN("$el input")](e) {
    this.setState({
      focused: true
    });
    e.target.select();
    this.runCallback(this.props.onFocus, e);
  }
  [FOCUSOUT("$el input")](e) {
    this.setState({
      focused: false
    });
    this.runCallback(this.props.onBlur, e);
  }
  get value() {
    const { parsedColor } = this.state;
    const { r, g, b, a } = parsedColor;
    return w({ r, g, b, a }, "rgb");
  }
  set value(v2) {
    this.refs.$input.value = v2;
  }
  get selectedValue() {
    return document.getSelection().toString();
  }
}
registerComponent("RGBColorEditor", RGBColorEditor);
registerComponent("rgb-color-editor", RGBColorEditor);
registerComponent("rgbcoloreditor", RGBColorEditor);
const cssProperties$t = makeCssVariablePrefixMap("--elf--input-editor", {
  borderColor: true,
  backgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true,
  placeholderColor: true,
  emptyColor: true,
  paddingRight: true
});
class TextAreaEditor extends UIElement {
  initState() {
    const {
      autoFocus = false,
      focused,
      hover = false,
      value,
      placeholder,
      disabled
    } = this.props;
    return {
      autoFocus,
      hover: hover || false,
      focused: focused || false,
      placeholder,
      value,
      disabled
    };
  }
  template() {
    const {
      icon,
      tools,
      size = "medium",
      readOnly = false,
      invalid,
      rows,
      style: style2,
      resizable
    } = this.props;
    const {
      focused = false,
      hover = false,
      value,
      placeholder,
      disabled
    } = this.state;
    const localClass = useMemo(() => {
      return classnames([
        "elf--input-editor textarea",
        {
          focused,
          hover,
          disabled,
          icon,
          invalid,
          resizable,
          [size]: true,
          readonly: readOnly
        }
      ]);
    }, [focused, hover, disabled, icon, invalid, size, readOnly, resizable]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$t)
    };
    const inputEvents = {
      onInput: this.props.onInput,
      onChange: this.props.onChange,
      onKeyDown: this.props.onKeyDown,
      onKeyUp: this.props.onKeyUp,
      onKeyPress: this.props.onKeyPress,
      onSelect: this.props.onSelect,
      onPaste: this.props.onPaste,
      onCut: this.props.onCut,
      onCopy: this.props.onCopy
    };
    const properties = {
      disabled,
      rows,
      readonly: readOnly ? "readonly" : void 0,
      placeholder: placeholder || "",
      value: value || ""
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, icon ? /* @__PURE__ */ createElementJsx("div", { class: "elf--input-editor-icon" }, icon) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-area" }, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-item" }, /* @__PURE__ */ createElementJsx("textarea", { ref: "$input", ...properties, ...inputEvents }, value))), tools ? tools : void 0);
  }
  onMounted() {
    if (this.state.autoFocus) {
      setTimeout(() => {
        this.refs.$input.focus();
        this.refs.$input.select();
      }, 10);
    }
  }
  runCallback(callback, e) {
    if (isFunction(callback)) {
      callback(e, this);
    }
  }
  [FOCUSIN("$input")](e) {
    this.setState({
      focused: true
    });
    this.runCallback(this.props.onFocus, e);
  }
  [FOCUSOUT("$input")](e) {
    this.setState({
      focused: false
    });
    this.runCallback(this.props.onBlur, e);
  }
  get value() {
    return this.refs.$input.value;
  }
  set value(v2) {
    this.refs.$input.value = v2;
  }
  get selectedValue() {
    return document.getSelection().toString();
  }
}
registerComponent("TextAreaEditor", TextAreaEditor);
registerComponent("textareaeditor", TextAreaEditor);
registerComponent("text-area-editor", TextAreaEditor);
const cssProperties$s = makeCssVariablePrefixMap("--elf--field", {
  width: true
});
function Field({
  label,
  content,
  help,
  position,
  required = false,
  requiredText = "*",
  optional = false,
  optionalText = "(optional)",
  size,
  disabled,
  validIcon,
  invalid,
  invalidIcon,
  invalidMessage,
  style: style2 = {}
}) {
  const localClass = useMemo(() => {
    return classnames("elf--field", {
      [position]: true,
      [size]: true,
      disabled
    });
  }, [position, size, disabled]);
  const styleObject = {
    class: localClass,
    style: {
      ...propertyMap(style2, cssProperties$s)
    }
  };
  return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, label ? /* @__PURE__ */ createElementJsx("label", { class: "label" }, label, required ? /* @__PURE__ */ createElementJsx("span", { class: "required" }, requiredText) : null, optional ? /* @__PURE__ */ createElementJsx("span", { class: "optional" }, optionalText) : null) : void 0, (content == null ? void 0 : content.length) ? /* @__PURE__ */ createElementJsx("div", { class: "field-area" }, (content == null ? void 0 : content.length) ? /* @__PURE__ */ createElementJsx("div", { class: "field-area-content" }, content, !invalid && validIcon ? /* @__PURE__ */ createElementJsx("div", { class: "valid-icon" }, validIcon) : null, invalid && invalidIcon ? /* @__PURE__ */ createElementJsx("div", { class: "invalid-icon" }, invalidIcon) : null) : void 0, help ? /* @__PURE__ */ createElementJsx("div", { class: "help" }, help) : void 0, invalid ? /* @__PURE__ */ createElementJsx("div", { class: "invalid" }, invalidMessage) : void 0) : void 0);
}
function TextArea({
  help,
  label,
  size,
  style: style2,
  disabled,
  required,
  requiredText,
  position,
  optional,
  optionalText,
  validIcon,
  invalid,
  invalidIcon,
  invalidMessage,
  inputStyle,
  resizable,
  ...extraProps
}) {
  const FieldProps = {
    label,
    help,
    size,
    style: style2,
    disabled,
    required,
    requiredText,
    position,
    optional,
    optionalText,
    invalid,
    validIcon,
    invalidIcon,
    invalidMessage
  };
  const hasIcon = !invalid && validIcon || invalid && invalidIcon;
  return /* @__PURE__ */ createElementJsx(Field, { ...FieldProps }, /* @__PURE__ */ createElementJsx(
    TextAreaEditor,
    {
      ...extraProps,
      disabled,
      required,
      size,
      invalid,
      resizable,
      style: {
        ...inputStyle,
        paddingRight: hasIcon ? "2.6em" : void 0
      }
    }
  ));
}
registerComponent("text-area", TextArea);
registerComponent("TextArea", TextArea);
registerComponent("textarea", TextArea);
function TextField({
  help,
  label,
  size,
  style: style2,
  disabled,
  required,
  requiredText,
  position,
  optional,
  optionalText,
  validIcon,
  invalid,
  invalidIcon,
  invalidMessage,
  inputStyle,
  ...extraProps
}) {
  const FieldProps = {
    label,
    help,
    size,
    style: style2,
    disabled,
    required,
    requiredText,
    position,
    optional,
    optionalText,
    invalid,
    validIcon,
    invalidIcon,
    invalidMessage
  };
  const hasIcon = !invalid && validIcon || invalid && invalidIcon;
  return /* @__PURE__ */ createElementJsx(Field, { ...FieldProps }, /* @__PURE__ */ createElementJsx(
    InputEditor,
    {
      ...extraProps,
      disabled,
      required,
      size,
      invalid,
      style: {
        ...inputStyle,
        paddingRight: hasIcon ? "2.6em" : void 0
      }
    }
  ));
}
registerComponent("text-field", TextField);
registerComponent("TextField", TextField);
registerComponent("textfield", TextField);
const cssProperties$r = makeCssVariablePrefixMap("--elf--virtual-scroll", {
  backgroundColor: true,
  color: true,
  height: true,
  hoverColor: true,
  borderColor: true,
  boxShadow: true,
  toolsBorderColor: true,
  toolsBorderRadius: true,
  hgap: true,
  vgap: true
});
const DEFAULT_SCROLL_HEIGHT = 32;
class VirtualScroll extends UIElement {
  initState() {
    return {
      scrollHeight: DEFAULT_SCROLL_HEIGHT
    };
  }
  template() {
    const {
      class: className,
      style: style2 = {},
      itemHeight = DEFAULT_SCROLL_HEIGHT,
      items: items2 = [],
      hideScrollbar = false
    } = this.props;
    const totalCount = items2.length;
    const localClass = useMemo(() => {
      return classnames("elf--virtual-scroll", className, {
        "hide-scrollbar": hideScrollbar
      });
    }, [hideScrollbar, className]);
    const styleObject = {
      class: localClass,
      style: {
        ...propertyMap(style2, cssProperties$r),
        "--elf--virtual-scroll-item-width": "100%",
        "--elf--virtual-scroll-item-height": `${itemHeight}px`,
        "--elf--virtual-scroll-item-count": totalCount,
        "--elf--virtual-scroll-panel-height": `${totalCount * itemHeight}px`
      }
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { class: "elf--virtual-scroll-panel" }, /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "elf--virtual-scroll-content-area",
        "data-scrolling": this.state.scrolling ? "true" : "false"
      },
      this.makeItemView()
    )));
  }
  refreshSize() {
    var _a;
    const rect = (_a = this.$el) == null ? void 0 : _a.offsetRect();
    if (rect) {
      this.setState(
        {
          width: rect.width,
          height: rect.height
        },
        false
      );
    }
  }
  onMounted() {
    window.setTimeout(() => {
      const rect = this.$el.offsetRect();
      this.setState({
        width: rect.width,
        height: rect.height
      });
    }, 20);
  }
  filterItems(items2, startIndex, endIndex) {
    return items2.filter((it, index2) => {
      return index2 >= startIndex && index2 <= endIndex;
    });
  }
  makeItemView() {
    const { itemHeight, items: items2, overscanRowCount = 10 } = this.props;
    const { width, height, isRenderingItems } = this.state;
    if (!isRenderingItems) {
      if (typeof width !== "number")
        return [];
      const scrollHeight = items2.length * itemHeight;
      const itemCount = Math.floor(height / itemHeight);
      const totalCount = items2.length;
      this.setState(
        {
          scrollHeight,
          itemCount
        },
        false
      );
      const startIndex = Math.max(
        Math.floor((this.state.scrollTop || 0) / itemHeight) - overscanRowCount,
        0
      );
      const endIndex = Math.min(
        Math.floor(startIndex + itemCount + 2 * overscanRowCount),
        totalCount - 1
      );
      this.state.renderItems = this.filterItems(items2, startIndex, endIndex);
    }
    return this.state.renderItems.map((item, index2) => {
      var _a, _b;
      return (_b = (_a = this.props).itemRenderer) == null ? void 0 : _b.call(
        _a,
        item,
        item.index * itemHeight,
        index2,
        items2,
        this
      );
    });
  }
  checkScrollTop() {
    const { scrollTop, height, scrollHeight } = this.state;
    this.setState(
      {
        scrollTop: this.$el.scrollTop
      },
      false
    );
    if (scrollTop > scrollHeight - height) {
      this.setState({
        scrolling: false
      });
      return false;
    }
    return true;
  }
  [SCROLL("$el") + IF("checkScrollTop")]() {
    this.trigger("reloadItems");
  }
  [SUBSCRIBE_SELF("checkScrolling") + DEBOUNCE(100)]() {
    this.setState({
      scrolling: false
    });
  }
  [SUBSCRIBE_SELF("reloadItems") + FRAME]() {
    this.setState({
      scrolling: true
    });
    this.trigger("checkScrolling");
  }
  refresh() {
    this.setState(
      {
        isRenderingItems: false
      },
      false
    );
    this.refresh();
  }
  refreshItems() {
    this.setState(
      {
        isRenderingItems: true
      },
      false
    );
    this.refresh();
  }
  scrollIntoView(index2) {
    const { itemHeight } = this.props;
    const scrollTop = index2 * itemHeight;
    this.$el.scrollTop = scrollTop;
    this.setState(
      {
        scrollTop: this.$el.scrollTop
      },
      false
    );
    this.refreshItems();
  }
}
registerComponent("VirtualScroll", VirtualScroll);
registerComponent("virtual-scroll", VirtualScroll);
registerComponent("virtualscroll", VirtualScroll);
class Layer extends UIElement {
  template() {
    const {
      top,
      id,
      topLevel,
      group,
      selected,
      icon,
      content,
      lock,
      visible,
      lockIcon,
      lockOpenIcon,
      visibleIcon,
      isComponent = false,
      number = 10,
      onClick,
      onDoubleClick,
      onContextMenu,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onMouseEnter,
      onMouseLeave
    } = this.props;
    return /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "elf--virtual-scroll-item elf--layer",
        style: {
          "--elf--virtual-scroll-item-top": `${top}px`
        },
        "data-id": id,
        "data-number": number
      },
      /* @__PURE__ */ createElementJsx(
        "div",
        {
          class: "container",
          "data-top-level": topLevel ? "true" : void 0,
          "data-hidden": !visible ? "true" : void 0,
          "data-component": isComponent ? "true" : void 0,
          "data-selected": selected ? "true" : void 0
        },
        /* @__PURE__ */ createElementJsx("div", { class: "group" }, group),
        icon && /* @__PURE__ */ createElementJsx("div", { class: "icon" }, icon),
        /* @__PURE__ */ createElementJsx(
          "div",
          {
            class: "text",
            ref: "$text",
            ...{
              onClick,
              onDoubleClick,
              onContextMenu,
              onMouseDown,
              onMouseUp,
              onMouseMove,
              onMouseEnter,
              onMouseLeave
            }
          },
          content
        ),
        /* @__PURE__ */ createElementJsx("div", { class: "tools" }, /* @__PURE__ */ createElementJsx("div", { class: "lock" }, lock ? lockIcon : lockOpenIcon), /* @__PURE__ */ createElementJsx("div", { class: "visible" }, visibleIcon))
      )
    );
  }
}
registerComponent("layer", Layer);
registerComponent("Layer", Layer);
const cssProperties$q = makeCssVariablePrefixMap("--elf--input-paint", {
  borderColor: true,
  backgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true,
  placeholderColor: true,
  emptyColor: true
});
class HSLColorEditor extends UIElement {
  constructor() {
    super(...arguments);
    __publicField(this, "keydownColor", (e) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          this.increaseColor(e.target.getAttribute("data-type"));
          e.target.select();
          break;
        case "ArrowDown":
          e.preventDefault();
          this.decreaseColor(e.target.getAttribute("data-type"));
          e.target.select();
          break;
      }
    });
    __publicField(this, "keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          this.increaseOpacity(e);
          e.target.select();
          break;
        case "ArrowDown":
          e.preventDefault();
          this.decreaseOpacity(e);
          e.target.select();
          break;
        case "Tab":
          e.preventDefault();
          var $el = this.$el.$("input[data-type='h']");
          $el.focus();
          $el.select();
          break;
      }
    });
  }
  initState() {
    const {
      style: style2 = {},
      autoFocus = false,
      focused,
      hover = false,
      placeholder,
      disabled,
      hasOpacity = true
    } = this.props;
    return {
      style: style2,
      autoFocus,
      hover: hover || false,
      focused: focused || false,
      placeholder,
      disabled,
      hasOpacity
    };
  }
  template() {
    const { icon, value } = this.props;
    const {
      style: style2 = {},
      focused = false,
      hover = false,
      placeholder,
      disabled
    } = this.state;
    const { r, g, b, a } = v(value);
    const { h: h2, s, l: l2 } = p(r, g, b);
    const localClass = useMemo(() => {
      return classnames([
        "elf--input-paint",
        {
          focused,
          hover,
          disabled,
          icon
        }
      ]);
    }, [focused, hover, disabled, icon]);
    const styleObject = {
      class: localClass,
      style: {
        ...propertyMap(style2, cssProperties$q)
      }
    };
    const properties = {
      disabled,
      placeholder: placeholder || "",
      min: 0,
      max: 255
    };
    this.setState(
      {
        parsedColor: {
          h: h2,
          s,
          l: l2,
          a
        }
      },
      false
    );
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-area" }, /* @__PURE__ */ createElementJsx(Grid, { columns: 3 }, /* @__PURE__ */ createElementJsx("div", { class: "elf--input-item" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        class: "color",
        type: "text",
        tabIndex: 1,
        "data-type": "h",
        value: h2,
        ...properties,
        onKeyDown: this.keydownColor
      }
    )), /* @__PURE__ */ createElementJsx("div", { class: "elf--input-item" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        class: "color",
        type: "text",
        tabIndex: 2,
        "data-type": "s",
        value: s,
        ...properties,
        onKeyDown: this.keydownColor
      }
    )), /* @__PURE__ */ createElementJsx("div", { class: "elf--input-item" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        class: "color",
        type: "text",
        tabIndex: 3,
        "data-type": "l",
        value: l2,
        ...properties,
        onKeyDown: this.keydownColor
      }
    )))), this.state.hasOpacity && /* @__PURE__ */ createElementJsx("div", { class: "elf--input-opacity" }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        type: "text",
        tabIndex: 4,
        class: "opacity",
        value: `${Math.round(a * 100 * 100) / 100}%`,
        onKeyDown: this.keydown
      }
    )));
  }
  updateOpacity(num) {
    this.setState({
      parsedColor: {
        ...this.state.parsedColor,
        a: Math.max(
          0,
          Math.min(1, Math.round((this.state.parsedColor.a + num) * 100) / 100)
        )
      }
    });
    this.runCallback(this.props.onChange);
  }
  updateColor(type, num) {
    const data = {};
    if (type === "h") {
      data[type] = Math.max(
        0,
        Math.min(360, this.state.parsedColor[type] + num)
      );
    } else if (type === "s") {
      data[type] = Math.max(
        0,
        Math.min(100, this.state.parsedColor[type] + num)
      );
    } else if (type === "l") {
      data[type] = Math.max(
        0,
        Math.min(100, this.state.parsedColor[type] + num)
      );
    }
    this.setState(
      {
        parsedColor: {
          ...this.state.parsedColor,
          ...data
        }
      },
      false
    );
    this.runCallback(this.props.onChange);
  }
  increaseColor(type) {
    this.updateColor(type, 1);
  }
  decreaseColor(type) {
    this.updateColor(type, -1);
  }
  increaseOpacity() {
    this.updateOpacity(0.01);
  }
  decreaseOpacity() {
    this.updateOpacity(-0.01);
  }
  onMounted() {
    if (this.state.autoFocus) {
      setTimeout(() => {
        const $el = this.$el.$("input[data-type='h']");
        $el.focus();
        $el.select();
      }, 10);
    }
  }
  runCallback(callback) {
    if (isFunction(callback)) {
      callback(this.value, this);
    }
  }
  [CLICK("$el .elf--input-paint-icon")](e) {
    var _a, _b;
    (_b = (_a = this.props).onClickColorView) == null ? void 0 : _b.call(_a, e);
  }
  [FOCUSIN("$el input")](e) {
    this.setState({
      focused: true
    });
    e.target.select();
    this.runCallback(this.props.onFocus, e);
  }
  [FOCUSOUT("$el input")](e) {
    this.setState({
      focused: false
    });
    this.runCallback(this.props.onBlur, e);
  }
  get value() {
    const { parsedColor } = this.state;
    const { h: h2, s, l: l2, a } = parsedColor;
    return w({ h: h2, s, l: l2, a }, "hsl");
  }
  set value(v2) {
    this.refs.$input.value = v2;
  }
  get selectedValue() {
    return document.getSelection().toString();
  }
}
registerComponent("HSLColorEditor", HSLColorEditor);
registerComponent("hsl-color-editor", HSLColorEditor);
registerComponent("hslcoloreditor", HSLColorEditor);
const COLOR_TYPES = ["hex", "rgb", "hsl"];
class ColorInput extends UIElement {
  initState() {
    const { type } = this.props;
    return { type };
  }
  makeTypedColorInput() {
    const { r, g, b, a, onChange } = this.props;
    const { type } = this.state;
    const { h: h2, s, l: l2 } = p(r, g, b);
    switch (type) {
      case "hex":
        return /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(
          HexColorEditor,
          {
            autoFocus: true,
            value: w({ r, g, b, a }, "hex"),
            onChange
          }
        ));
      case "rgb":
        return /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(
          RGBColorEditor,
          {
            autoFocus: true,
            value: w({ r, g, b, a }, "rgb"),
            onChange
          }
        ));
      case "hsl":
        return /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(
          HSLColorEditor,
          {
            autoFocus: true,
            value: w({ h: h2, s, l: l2, a }, "hsl"),
            onChange
          }
        ));
    }
    return void 0;
  }
  template() {
    const { type } = this.state;
    const input = this.makeTypedColorInput();
    return /* @__PURE__ */ createElementJsx("div", { class: "color-input" }, /* @__PURE__ */ createElementJsx(
      OptionMenu,
      {
        autoPosition: true,
        quiet: true,
        menuStyle: {
          width: 80,
          itemPadding: "10px"
        },
        items: COLOR_TYPES.map((it) => {
          return {
            title: it.toUpperCase(),
            selectable: true,
            closable: true,
            selected: type === it,
            onClick: () => {
              this.setState({
                type: it
              });
            }
          };
        })
      },
      type.toUpperCase()
    ), input);
  }
}
registerComponent("ColorInput", ColorInput);
registerComponent("color-input", ColorInput);
registerComponent("colorinput", ColorInput);
function EyeDropper(props) {
  return /* @__PURE__ */ createElementJsx("div", { class: "eye-dropper" }, /* @__PURE__ */ createElementJsx(
    IconButton,
    {
      shape: "rect",
      quiet: true,
      style: {
        color: "var(--color-gray-9)"
      },
      onClick: async () => {
        const eyeDropper = new window.EyeDropper();
        try {
          const result = await eyeDropper.open();
          isFunction(props.onChange) && props.onChange(result.sRGBHex);
        } catch (e) {
          console.warn(e);
        }
      }
    },
    /* @__PURE__ */ createElementJsx(
      "svg",
      {
        width: "15",
        height: "15",
        viewBox: "0 0 15 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      },
      /* @__PURE__ */ createElementJsx(
        "path",
        {
          d: "M13.4473 0.6C12.6473 -0.2 11.4473 -0.2 10.6473 0.6L7.84725 3.4L7.04725 2.7C6.64725 2.3 6.04725 2.3 5.64725 2.7C5.24725 3.1 5.24725 3.7 5.64725 4.1L6.34725 4.8L0.547255 10.6C0.147255 11 -0.452745 12.5 0.547255 13.5C1.54725 14.5 3.04725 13.9 3.44725 13.5L9.24725 7.7L9.94725 8.4C10.3473 8.8 10.9473 8.8 11.3473 8.4C11.7473 8 11.7473 7.4 11.3473 7L10.6473 6.3L13.4473 3.5C14.2473 2.6 14.2473 1.4 13.4473 0.6ZM2.54725 12.5H1.54725V11.5L7.34725 5.7L8.34725 6.7C8.24725 6.7 2.54725 12.5 2.54725 12.5Z",
          fill: "currentColor"
        }
      )
    )
  ));
}
registerComponent("eye-dropper", EyeDropper);
registerComponent("eyedropper", EyeDropper);
registerComponent("EyeDropper", EyeDropper);
class BaseSlide extends UIElement {
  template() {
    const { value, containerClass, slideClass } = this.props;
    return /* @__PURE__ */ createElementJsx("div", { class: `${containerClass} slide-view` }, /* @__PURE__ */ createElementJsx("div", { class: `${slideClass} slide-bg` }, /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "drag-pointer",
        style: {
          "--drag-point-left": value
        }
      }
    )));
  }
  updateValue(e) {
    const { onChange } = this.props;
    const { x, width } = this.state.rect;
    const minX = x;
    const maxX = minX + width;
    const targetX = Math.min(Math.max(minX, e.clientX), maxX);
    const value = (targetX - minX) / width;
    if (isFunction(onChange)) {
      onChange(value);
    }
  }
  [POINTERSTART("$el .slide-bg")](e) {
    this.setState(
      {
        clicked: true,
        rect: this.$el.$(".slide-bg").rect()
      },
      false
    );
    this.updateValue(e);
  }
  checkClicked() {
    return this.state.clicked;
  }
  [POINTERMOVE("document") + IF("checkClicked")](e) {
    this.updateValue(e);
  }
  [POINTEREND("document") + IF("checkClicked")]() {
    this.setState(
      {
        clicked: false
      },
      false
    );
  }
}
registerComponent("base-slide", BaseSlide);
registerComponent("baseslide", BaseSlide);
function HueSlide({ value, onChange }) {
  return /* @__PURE__ */ createElementJsx(
    BaseSlide,
    {
      value,
      containerClass: "hue-slide",
      slideClass: "hue-slide-bg",
      onChange
    }
  );
}
registerComponent("HueSlide", HueSlide);
registerComponent("hue-slide", HueSlide);
registerComponent("hueslide", HueSlide);
function OpacitySlide({ value, onChange }) {
  return /* @__PURE__ */ createElementJsx(
    BaseSlide,
    {
      value,
      containerClass: "opacity-slide",
      slideClass: "opacity-slide-bg",
      onChange
    }
  );
}
registerComponent("OpacitySlide", OpacitySlide);
registerComponent("opacity-slide", OpacitySlide);
registerComponent("opacityslide", OpacitySlide);
const cssProperties$p = {
  height: "--elf--color-mixer-height",
  width: "--elf--color-mixer-width"
};
class ColorMixer extends UIElement {
  constructor() {
    super(...arguments);
    __publicField(this, "updateOpacity", (a) => {
      this.setState({
        a
      });
      this.changeColor();
    });
    __publicField(this, "updateHueColor", (h2) => {
      h2 = h2 * 360;
      const { s, v: v2, a } = this.state;
      const { r, g, b } = H(h2, s, v2);
      this.setState({
        color: w({ r, g, b }, "rgb"),
        r,
        g,
        b,
        a,
        hueColor: Cr(h2 / 360),
        h: h2,
        s,
        v: v2
      });
      this.changeColor();
    });
    __publicField(this, "updateColor", (color) => {
      const parsedColor = v(color);
      const { r, g, b, a } = parsedColor;
      const { h: h2, s, v: v$1 } = O(r, g, b);
      this.setState({
        color: w({ r, g, b }, "rgb"),
        r,
        g,
        b,
        a,
        hueColor: Cr(h2 / 360),
        h: h2,
        s,
        v: v$1
      });
      this.changeColor();
    });
  }
  initState() {
    const { color = "red", width = 240, height = width } = this.props;
    const parsedColor = v(color);
    const { r, g, b, a } = parsedColor;
    const { h: h2, s, v: v$1 } = O(r, g, b);
    return {
      type: parsedColor.type,
      color: w({ r, g, b }, "rgb"),
      width,
      height,
      r,
      g,
      b,
      a,
      hueColor: Cr(h2),
      h: h2,
      s,
      v: v$1
    };
  }
  template() {
    const { type, h: h2, s, v: v2, width, height, r, g, b, a, hueColor, color } = this.state;
    const {
      hideSlide = false,
      hideInput = false,
      shadow,
      style: style2 = {},
      disabled
    } = this.props;
    const x = width * s;
    const y = height * (1 - v2);
    const localClass = useMemo(() => {
      return classnames("elf--color-mixer", {
        shadow,
        disabled
      });
    }, [shadow, disabled]);
    const styleObject = {
      class: localClass,
      style: {
        ...propertyMap(
          {
            ...style2,
            width,
            height
          },
          cssProperties$p
        )
      }
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "elf--color-area",
        style: {
          backgroundColor: hueColor
        }
      },
      /* @__PURE__ */ createElementJsx("div", { class: "saturation" }, /* @__PURE__ */ createElementJsx("div", { class: "value" }, /* @__PURE__ */ createElementJsx(
        "div",
        {
          class: "drag-pointer",
          style: {
            backgroundColor: color,
            left: x,
            top: y
          }
        }
      )))
    ), hideSlide === false ? /* @__PURE__ */ createElementJsx("div", { class: "elf--color-slide-area" }, window.EyeDropper ? /* @__PURE__ */ createElementJsx(EyeDropper, { onChange: this.updateColor }) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "slide" }, /* @__PURE__ */ createElementJsx(
      HueSlide,
      {
        value: h2 / 360,
        onChange: this.updateHueColor,
        disabled
      }
    ), /* @__PURE__ */ createElementJsx(
      OpacitySlide,
      {
        r,
        g,
        b,
        value: a,
        disabled,
        onChange: this.updateOpacity
      }
    ))) : void 0, hideInput === false ? /* @__PURE__ */ createElementJsx("div", { class: "elf--color-input-area" }, /* @__PURE__ */ createElementJsx(
      ColorInput,
      {
        ...{
          type,
          h: h2,
          s,
          v: v2,
          r,
          g,
          b,
          a,
          disabled
        },
        onChange: this.updateColor
      }
    )) : void 0);
  }
  formatedColor() {
    const { type, r, g, b, h: h2, s, v: v2, a } = this.state;
    let color = "";
    switch (type) {
      case "hex":
      case "rgb":
        color = w({ r, g, b, a }, type);
        break;
      case "hsl":
        var { h: hslH, s: hslS, l: hslL } = Ar(h2, s, v2);
        color = w({ h: hslH, s: hslS, l: hslL, a }, type);
        break;
      case "hsv":
        color = w({ h: h2, s, v: v2, a }, type);
        break;
    }
    return color;
  }
  changeColor() {
    const { onChange } = this.props;
    let color = this.formatedColor();
    if (isFunction(onChange)) {
      onChange(color);
    }
  }
  lastChangeColor() {
    const { onLastChange } = this.props;
    let color = this.formatedColor();
    if (isFunction(onLastChange)) {
      onLastChange(color);
    }
  }
  async openEyeDropper() {
    const eyeDropper = new window.EyeDropper();
    try {
      const result = await eyeDropper.open();
      this.updateColor(result.sRGBHex);
    } catch (e) {
      console.warn(e);
    }
  }
  [POINTERSTART("$el .elf--color-area")](e) {
    this.setState(
      {
        clicked: true,
        rect: this.$el.$(".elf--color-area").rect(),
        clientX: e.clientX,
        clientY: e.clientY
      },
      false
    );
    this.updateSaturationValueByEvent(e);
  }
  checkClicked() {
    return this.state.clicked;
  }
  updateSaturationValueByEvent(e) {
    const { x, y, width, height } = this.state.rect;
    const minX = x;
    const maxX = minX + width;
    const minY = y;
    const maxY = minY + height;
    const targetX = Math.min(Math.max(minX, e.clientX), maxX);
    const targetY = Math.min(Math.max(minY, e.clientY), maxY);
    const s = (targetX - minX) / width;
    const v2 = 1 - (targetY - minY) / height;
    this.updateSaturationValue(s, v2);
  }
  [POINTERMOVE("document") + IF("checkClicked")](e) {
    this.updateSaturationValueByEvent(e);
  }
  [POINTEREND("document") + IF("checkClicked")](e) {
    this.setState(
      {
        clicked: false
      },
      false
    );
    if (this.state.clientX === e.clientX && this.state.clientY === e.clientY) {
      return;
    }
    this.lastChangeColor();
  }
  updateSaturationValue(s, v2) {
    const { r, g, b } = H(this.state.h, s, v2);
    this.setState({
      r,
      g,
      b,
      s,
      v: v2,
      color: w({ r, g, b }, "rgb")
    });
    this.changeColor();
  }
}
registerComponent("ColorMixer", ColorMixer);
registerComponent("color-mixer", ColorMixer);
registerComponent("colormixer", ColorMixer);
class ColorGrid extends UIElement {
  initState() {
    return {
      selectedValue: this.props.selectedValue
    };
  }
  makeItems() {
    const { items: items2 } = this.props;
    const { selectedValue } = this.state;
    return items2.map((it) => {
      return {
        title: it.title,
        selectable: true,
        closable: true,
        selected: it.value === selectedValue,
        onClick: () => {
          this.setState({
            selectedValue: it.value
          });
        }
      };
    });
  }
  template() {
    const { items: items2 } = this.props;
    const { selectedValue } = this.state;
    const colorItem = items2.find((it) => it.value === selectedValue) || items2[0] || { title: "" };
    return /* @__PURE__ */ createElementJsx("div", { class: "elf--color-grid" }, /* @__PURE__ */ createElementJsx("div", { class: "elf--color-grid-header" }, /* @__PURE__ */ createElementJsx(OptionMenu, { items: this.makeItems() }, colorItem.title)), /* @__PURE__ */ createElementJsx("div", { class: "elf--color-grid-list" }, colorItem.colors.map((color) => /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "elf--color-grid-item",
        onClick: () => this.selectColor(color)
      },
      /* @__PURE__ */ createElementJsx(ColorView, { color })
    ))));
  }
  selectColor(color) {
    this.setState({ selectedColor: color }, false);
    this.props.onSelect && this.props.onSelect(color);
  }
}
registerComponent("ColorGrid", ColorGrid);
registerComponent("color-grid", ColorGrid);
registerComponent("colorgrid", ColorGrid);
class View extends UIElement {
  template() {
    const {
      as = "div",
      id,
      class: className = "",
      style: style2 = {},
      content,
      ...extraStyle
    } = this.props;
    const { style: styleProperties, noneStyle } = splitStyleKeyAndNoneStyleKey(extraStyle);
    const styleObject = {
      class: classnames(className),
      id,
      style: propertyMap({ ...style2, ...styleProperties }, {}),
      ...noneStyle
    };
    Object.keys(styleObject).forEach((key) => {
      if (styleObject[key] === void 0) {
        delete styleObject[key];
      }
    });
    return createElementJsx(as, styleObject, content);
  }
}
registerComponent("view", View);
registerComponent("View", View);
const cssProperties$o = makeCssVariablePrefixMap("--elf--radio", {
  borderColor: true,
  backgroundColor: true,
  disabledColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true
});
class Select extends UIElement {
  template() {
    const {
      disabled,
      style: style2 = {},
      value,
      options = [],
      onChange,
      size = "medium",
      variant = "default"
    } = this.props;
    const localClass = useMemo(() => {
      return classnames([
        "elf--select",
        {
          disabled,
          [size]: true,
          [variant]: true
        }
      ]);
    }, [disabled, size, variant]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$o)
    };
    useEffect(() => {
      this.refs.$select.value = value;
    }, [value]);
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx(
      "select",
      {
        ref: "$select",
        onChange: (e) => onChange && onChange(e.target.value)
      },
      options.map((option) => {
        return /* @__PURE__ */ createElementJsx("option", { value: option.value }, option.label);
      })
    ));
  }
}
registerComponent("select", Select);
registerComponent("Select", Select);
const cssProperties$n = makeCssVariablePrefixMap("--elf--switch", {
  backgroundColor: true,
  borderRadius: true,
  fontSize: true,
  duration: true,
  activeColor: true,
  width: true,
  height: true,
  handlBackgroundColor: true,
  gap: true
});
class Switch extends UIElement {
  template() {
    const {
      checked = false,
      disabled = false,
      variant = "default",
      size = "medium",
      style: style2 = {},
      content,
      withLabel = false,
      labels = void 0,
      onClick,
      onChange,
      readOnly = false
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--switch", {
        [variant]: true,
        [size]: true,
        disabled,
        readonly: readOnly,
        "with-label": withLabel
      });
    }, [variant, size, disabled, readOnly, withLabel]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$n)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx(
      "input",
      {
        ref: "$input",
        id: "switch-checkbox-" + this.id,
        type: "checkbox",
        onClick,
        onChange,
        ...{
          disabled: disabled ? "disabled" : void 0,
          checked: checked ? "checked" : void 0
        }
      }
    ), /* @__PURE__ */ createElementJsx("span", { class: "tools" }, /* @__PURE__ */ createElementJsx("span", { class: "track" }), withLabel ? /* @__PURE__ */ createElementJsx("div", { class: "label-area" }, /* @__PURE__ */ createElementJsx("div", { class: "unchecked" }, labels == null ? void 0 : labels[0]), /* @__PURE__ */ createElementJsx("div", { class: "checked" }, labels == null ? void 0 : labels[1])) : void 0, /* @__PURE__ */ createElementJsx("span", { class: "handle" })), (content == null ? void 0 : content.length) ? /* @__PURE__ */ createElementJsx("label", { for: "switch-checkbox-" + this.id }, content) : void 0);
  }
  get checked() {
    return this.refs.$input.checked;
  }
}
registerComponent("switch", Switch);
registerComponent("Switch", Switch);
const cssProperties$m = makeCssVariablePrefixMap("--elf--slider", {
  backgroundColor: true,
  backgroundImage: true,
  borderRadius: true,
  fontSize: true,
  duration: true,
  activeColor: true,
  width: true,
  height: true,
  handlBackgroundColor: true,
  gap: true
});
function initValue(v2) {
  return v2;
}
function calculateRoundValue(min, max, step, value) {
  if (value === 0)
    return value;
  if (max < value)
    return max;
  if (min > value)
    return min;
  if (step % 1 !== 0) {
    const total = max - min;
    const count = total / step;
    const realValueCount = Math.floor(count * ((value - min) / total));
    const precison = 1 / step;
    const result = Math.round(realValueCount * step * precison);
    const minResult = min * precison;
    return (result + minResult) / precison;
  }
  return value - value % step;
}
function calculateValue({ min = 0, max = 100, step, left, width, currentX }) {
  const currentValue = calculateRoundValue(
    min,
    max,
    step,
    (currentX - left) / width * (max - min) + min
  );
  const value = Math.max(min, Math.min(max, currentValue));
  return value;
}
class SingleSlider extends UIElement {
  template() {
    const {
      label,
      labelPosition = "top",
      min = 0,
      max = 100,
      step = 1,
      value = min,
      valuePlacement = "none",
      showTrigger = "always",
      showValue = false,
      size = "medium",
      variant = "default",
      fill = false,
      fillOffset = 0,
      disabled = false,
      readOnly = false,
      style: style2 = {},
      valueFunc = initValue,
      onInput,
      fitted = false
    } = this.props;
    const onInputCallback = useCallback(
      (e) => {
        const { left, width: width2 } = this.state;
        const value2 = calculateValue({
          min,
          max,
          step,
          left,
          width: width2,
          currentX: e.clientX
        });
        if (value2 !== this.props.value) {
          onInput && onInput(value2);
        }
      },
      [onInput, min, max, step]
    );
    usePointerStart(
      "$el .range-track",
      (e) => {
        const { left, width: width2 } = this.refs.$track.getBoundingClientRect();
        this.setState(
          {
            left,
            width: width2
          },
          false
        );
        onInputCallback(e);
      },
      (e) => {
        onInputCallback(e);
      }
    );
    const localClass = useMemo(() => {
      return classnames("elf--slider", {
        [variant]: true,
        [size]: true,
        disabled,
        readonly: readOnly,
        ["placement-" + valuePlacement]: true,
        [showTrigger]: true,
        ["show-value"]: showValue,
        ["label-position-" + labelPosition]: true,
        fitted
      });
    }, [
      variant,
      size,
      disabled,
      readOnly,
      valuePlacement,
      showTrigger,
      showValue,
      labelPosition,
      fitted
    ]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$m)
    };
    const currentValue = Math.max(min, Math.min(max, value));
    const currenValueOffset = (currentValue - min) / (max - min) * 100;
    const progressStartOffset = (fillOffset - min) / (max - min) * 100;
    const isPrevValue = currentValue < fillOffset;
    const startOffset = Math.min(currenValueOffset, progressStartOffset);
    const width = Math.abs(currenValueOffset - progressStartOffset);
    const lastValue = isFunction(valueFunc) ? valueFunc(currentValue) : currentValue;
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, label ? /* @__PURE__ */ createElementJsx("div", { class: "label-area" }, /* @__PURE__ */ createElementJsx("label", { class: "label" }, label), labelPosition === "top" ? /* @__PURE__ */ createElementJsx("span", { class: "value" }, lastValue) : void 0) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "range-area" }, /* @__PURE__ */ createElementJsx("div", { class: "range-track", ref: "$track" }, fill ? /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "range-progress",
        style: { left: `${startOffset}%`, width: `${width}%` }
      }
    ) : void 0, /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "thumb",
        ref: "$thumb",
        style: {
          left: isPrevValue ? `${startOffset}%` : `${startOffset + width}%`
        }
      },
      showValue && !label ? /* @__PURE__ */ createElementJsx("div", { class: "thumb-value" }, lastValue) : void 0
    ))), label && labelPosition === "side" ? /* @__PURE__ */ createElementJsx("div", { class: "value-area" }, /* @__PURE__ */ createElementJsx("span", { class: "value" }, lastValue)) : void 0);
  }
}
class RangeSlider extends UIElement {
  template() {
    return /* @__PURE__ */ createElementJsx("div", null);
  }
}
class Slider extends UIElement {
  template() {
    const { type = "single", ...extraProps } = this.props;
    return type === "single" ? /* @__PURE__ */ createElementJsx(SingleSlider, { ...extraProps }) : /* @__PURE__ */ createElementJsx(RangeSlider, { ...extraProps });
  }
}
registerComponent("slider", Slider);
registerComponent("Slider", Slider);
makeCssVariablePrefixMap("--elf--property-editor", {
  backgroundColor: true,
  color: true,
  height: true,
  width: true,
  hoverColor: true,
  borderColor: true,
  gap: true,
  itemLabelWidth: true
});
const EMPTY_POS = { x: 0, y: 0 };
const DEFAULT_POS = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER };
const MOVE_CHECK_MS = 0;
function getDist(startPos, endPos) {
  return Math.sqrt(
    Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2)
  );
}
class EventPanel extends UIElement {
  initialize() {
    super.initialize();
    this.__initBodyMoves();
  }
  __initBodyMoves() {
    this.__firstMove = /* @__PURE__ */ new Set();
    this.__moves = /* @__PURE__ */ new Set();
    this.__ends = /* @__PURE__ */ new Set();
    this.__modifyBodyMoveSecond(MOVE_CHECK_MS);
  }
  __modifyBodyMoveSecond(ms = MOVE_CHECK_MS) {
    const callback = ms === 0 ? this.__loopBodyMoves.bind(this) : debounce(this.__loopBodyMoves.bind(this), ms);
    this.__funcBodyMoves = callback;
  }
  __loopBodyMoves() {
    var pos = this.pos;
    var e = this.$store.get(BODY_MOVE_EVENT);
    var lastPos = this.lastPos || DEFAULT_POS;
    var isNotEqualLastPos = !(lastPos.x === pos.x && lastPos.y === pos.y);
    if (isNotEqualLastPos && this.__firstMove.size) {
      let i = 0;
      this.__firstMove.forEach((v2) => {
        const dist = getDist(pos, v2.xy);
        if (Math.abs(dist) > 0) {
          var dx = pos.x - v2.xy.x;
          var dy = pos.y - v2.xy.y;
          v2.func.call(v2.context, dx, dy, "move", e.pressure);
          i++;
        }
      });
      if (i > 0) {
        this.__firstMove.clear();
      }
    }
    if (isNotEqualLastPos && this.__moves.size) {
      this.__moves.forEach((v2) => {
        const dist = getDist(pos, v2.xy);
        if (Math.abs(dist) > 0.5) {
          var dx = pos.x - v2.xy.x;
          var dy = pos.y - v2.xy.y;
          v2.func.call(v2.context, dx, dy, "move", e.pressure);
        }
      });
      this.lastPos = pos;
    }
    window.requestAnimationFrame(this.__funcBodyMoves);
  }
  __removeBodyMoves() {
    var pos = this.lastPos;
    var e = this.$store.get(BODY_MOVE_EVENT);
    if (pos) {
      this.__ends.forEach((v2) => {
        v2.func.call(
          v2.context,
          pos.x - v2.xy.x,
          pos.y - v2.xy.y,
          "end",
          e.pressure
        );
      });
    }
    this.__firstMove.clear();
    this.__moves.clear();
    this.__ends.clear();
  }
  [SUBSCRIBE_ALL(ADD_BODY_FIRST_MOUSEMOVE)](func, context, xy) {
    this.__firstMove.add({ func, context, xy });
  }
  [SUBSCRIBE_ALL(ADD_BODY_MOUSEMOVE)](func, context, xy) {
    this.__moves.add({ func, context, xy });
  }
  [SUBSCRIBE_ALL(ADD_BODY_MOUSEUP)](func, context, xy) {
    this.__ends.add({ func, context, xy });
  }
  [POINTERSTART()](e) {
    var newPos = e.xy || EMPTY_POS;
    this.$store.init(BODY_MOVE_EVENT, e);
    this.pos = newPos;
  }
  [POINTERMOVE()](e) {
    var newPos = e.xy || EMPTY_POS;
    this.$store.init(BODY_MOVE_EVENT, e);
    this.pos = newPos;
    if (!this.__requestId) {
      this.__requestId = window.requestAnimationFrame(this.__funcBodyMoves);
    }
  }
  [POINTEREND()](e) {
    this.$store.set(BODY_MOVE_EVENT, e);
    this.__removeBodyMoves();
    window.cancelAnimationFrame(this.__requestId);
    this.__requestId = null;
  }
}
registerComponent("event-panel", EventPanel);
registerComponent("EventPanel", EventPanel);
registerComponent("eventpanel", EventPanel);
class EventControlPanel extends UIElement {
  bodyMouseFirstMove(e, methodName) {
    if (this[methodName]) {
      this.emit(ADD_BODY_FIRST_MOUSEMOVE, this[methodName], this, e.xy);
    }
  }
  bodyMouseMove(e, methodName) {
    if (this[methodName]) {
      this.emit(ADD_BODY_MOUSEMOVE, this[methodName], this, e.xy);
    }
  }
  bodyMouseUp(e, methodName) {
    if (this[methodName]) {
      this.emit(ADD_BODY_MOUSEUP, this[methodName], this, e.xy);
    }
  }
}
registerComponent("event-control-panel", EventControlPanel);
registerComponent("EventControlPanel", EventControlPanel);
registerComponent("eventcontrolpanel", EventControlPanel);
const cssProperties$k = makeCssVariablePrefixMap("--elf--app-layout", {
  backgroundColor: true,
  color: true,
  height: true,
  align: true
});
class AppLayout extends UIElement {
  getItem(direction) {
    return this.props.content.find((it) => it.props.direction === direction);
  }
  template() {
    const { style: style2 = {} } = this.props;
    const styleObject = {
      class: "elf--app-layout",
      style: propertyMap(style2, cssProperties$k)
    };
    const topLayoutItem = this.getItem("top");
    const bottomLayoutItem = this.getItem("bottom");
    const leftLayoutItem = this.getItem("left");
    const rightLayoutItem = this.getItem("right");
    const centerLayoutItem = this.getItem("center");
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, topLayoutItem ? topLayoutItem : void 0, /* @__PURE__ */ createElementJsx("div", { class: "elf--app-layout-body" }, leftLayoutItem ? leftLayoutItem : void 0, centerLayoutItem ? centerLayoutItem : void 0, rightLayoutItem ? rightLayoutItem : void 0), bottomLayoutItem ? bottomLayoutItem : void 0);
  }
}
registerComponent("app-layout", AppLayout);
registerComponent("AppLayout", AppLayout);
registerComponent("appLayout", AppLayout);
class AppResizeBar extends UIElement {
  template() {
    const styleObject = {
      class: "elf--app-layout-resize-bar"
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject });
  }
  [POINTERSTART()](e) {
    this.startXY = e.xy;
  }
  isMoved(e) {
    if (!this.startXY)
      return false;
    const { xy } = e;
    const diffX = xy.x - this.startXY.x;
    const diffY = xy.y - this.startXY.y;
    if (diffX !== 0 || diffY !== 0) {
      return true;
    }
    return false;
  }
  [POINTERMOVE("document") + IF("isMoved")](e) {
    const { xy } = e;
    const diffX = xy.x - this.startXY.x;
    const diffY = xy.y - this.startXY.y;
    if (isFunction(this.props.onResize)) {
      this.props.onResize(diffX, diffY);
    }
  }
  [POINTEREND("document") + IF("isMoved")](e) {
    const { xy } = e;
    const diffX = xy.x - this.startXY.x;
    const diffY = xy.y - this.startXY.y;
    if (isFunction(this.props.onResizeEnd)) {
      this.props.onResizeEnd(diffX, diffY);
    }
    this.startXY = void 0;
  }
}
registerComponent("app-resize-bar", AppResizeBar);
registerComponent("AppResizeBar", AppResizeBar);
registerComponent("appresizebar", AppResizeBar);
function AppLayoutItem({
  direction,
  content,
  width = "auto",
  height = "auto",
  maxWidth = 500,
  minWidth = 0,
  maxHeight = 500,
  minHeight = 0,
  resizable = false,
  style: style2,
  onResize,
  onResizeEnd
}) {
  const [initWidth, setWidth] = useState(width);
  const [initHeight, setHeight] = useState(height);
  const [itemWidth, setLastWidth] = useState(initWidth);
  const [itemHeight, setLastHeight] = useState(initHeight);
  const setSize = useCallback(
    (size) => {
      pendingComponent(this);
      if (direction === "left" || direction === "right") {
        const lastWidth = Math.min(Math.max(minWidth, size), maxWidth);
        setLastWidth(lastWidth);
        if (itemWidth != lastWidth) {
          isFunction(onResize) && onResize(lastWidth, itemHeight);
        }
        this.$el.css("width", lastWidth + "px");
      } else if (direction === "top" || direction === "bottom") {
        const lastHeight = Math.min(Math.max(minHeight, size), maxHeight);
        setLastHeight(lastHeight);
        this.$el.css("height", lastHeight + "px");
        if (itemHeight != lastHeight) {
          isFunction(onResize) && onResize(itemWidth, lastHeight);
        }
      }
      removePendingComponent(this);
    },
    [itemWidth, itemHeight]
  );
  const onResizeCallback = useCallback(
    (diffX, diffY) => {
      if (direction === "left" || direction === "right") {
        setSize(direction === "left" ? initWidth + diffX : initWidth - diffX);
      } else {
        setSize(direction === "top" ? initHeight + diffY : initHeight - diffY);
      }
    },
    [direction, initWidth, initHeight, setSize]
  );
  const onResizeEndCallback = useCallback(() => {
    setWidth(itemWidth);
    setHeight(itemHeight);
    isFunction(onResizeEnd) && onResizeEnd(itemWidth, itemHeight);
  }, [itemWidth, itemHeight, setWidth, setHeight]);
  useEffect(() => {
    pendingComponent(this);
    let hasChanged = false;
    if (itemWidth != width) {
      setLastWidth(width);
      hasChanged = true;
    }
    if (itemHeight != height) {
      setLastHeight(height);
      hasChanged = true;
    }
    removePendingComponent(this);
    if (hasChanged) {
      useRender(this);
    }
  }, [itemWidth, itemHeight, width, height]);
  return /* @__PURE__ */ createElementJsx(
    "div",
    {
      class: "elf--app-layout-item",
      "data-direction": direction,
      "data-resizable": resizable,
      style: { ...style2, width: itemWidth, height: itemHeight }
    },
    content,
    resizable ? /* @__PURE__ */ createElementJsx(
      AppResizeBar,
      {
        onResize: onResizeCallback,
        onResizeEnd: onResizeEndCallback
      }
    ) : void 0
  );
}
registerComponent("AppLayoutItem", AppLayoutItem);
registerComponent("app-layout-item", AppLayoutItem);
registerComponent("applayoutitem", AppLayoutItem);
const cssProperties$j = makeCssVariablePrefixMap("--elf--help-text", {
  color: true
});
class HelpText extends UIElement {
  template() {
    const {
      variant = "default",
      size = "medium",
      content = "",
      icon,
      style: style2 = {},
      disabled = false,
      ...extrProps
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--help-text", {
        [variant]: true,
        [size]: true,
        disabled
      });
    }, [variant, size, disabled]);
    const styleObject = {
      class: localClass,
      style: {
        ...propertyMap(style2, cssProperties$j)
      },
      ...extrProps
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, icon && /* @__PURE__ */ createElementJsx("span", { class: "icon" }, icon), content ? /* @__PURE__ */ createElementJsx("div", { class: "content" }, content) : null);
  }
}
registerComponent("help-text", HelpText);
registerComponent("HelpText", HelpText);
registerComponent("helptext", HelpText);
makeCssVariablePrefixMap("--elf--breadcrumbs", {});
makeCssVariablePrefixMap("--elf--breadcrumbs-item", {
  color: true
});
const cssProperties$h = makeCssVariablePrefixMap("--elf--ghost", {
  width: true,
  height: true,
  animationName: true,
  animationDuration: true
});
class Ghost extends UIElement {
  template() {
    const { style: style2 = {}, animated = false, content } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--ghost", {
        animated
      });
    }, [animated]);
    const styleObject = {
      class: localClass,
      style: {
        ...propertyMap(
          {
            ...style2
          },
          cssProperties$h
        )
      }
    };
    if (content == null ? void 0 : content.length) {
      return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, content);
    } else {
      return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, " ");
    }
  }
}
registerComponent("ghost", Ghost);
registerComponent("Ghost", Ghost);
const cssProperties$g = makeCssVariablePrefixMap("--elf--avatar", {
  backgroundColor: true,
  backgroundImage: true
});
class Avatar extends UIElement {
  template() {
    const {
      style: style2 = {},
      content,
      size = "medium",
      shape = "circle",
      variant = "default",
      disabled = false,
      ghost = false,
      ...extraProps
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--avatar", {
        [`size-${size}`]: true,
        [shape]: true,
        [variant]: true,
        disabled
      });
    }, [shape, size, variant, disabled]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$g),
      ...extraProps
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("div", { class: "elf--avatar-inner" }, ghost ? /* @__PURE__ */ createElementJsx(Ghost, { animated: true }) : content));
  }
}
const cssProperties$f = makeCssVariablePrefixMap("--elf--tag", {
  backgroundColor: true,
  color: true,
  borderColor: true,
  borderRadius: true,
  fontSize: true
});
makeCssVariablePrefixMap("--elf--tag-group", {
  gap: true,
  width: true
});
class Tag extends UIElement {
  template() {
    const {
      style: style2 = {},
      content,
      removable = false,
      variant = "default",
      filled = false,
      disabled = false,
      readOnly = false
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--tag", {
        [variant]: true,
        filled,
        disabled,
        readonly: readOnly
      });
    }, [variant, filled, disabled, readOnly]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$f)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("label", null, content), removable && /* @__PURE__ */ createElementJsx("span", { class: "close", title: "Close", onClick: this.props.onClose }, "×"));
  }
}
registerComponent("tag", Tag);
registerComponent("Tag", Tag);
const cssProperties$e = makeCssVariablePrefixMap("--elf--badge", {
  backgroundColor: true,
  color: true,
  borderColor: true,
  borderRadius: true,
  fontSize: true,
  offset: true
});
class Badge extends UIElement {
  template() {
    const {
      style: style2 = {},
      content,
      variant = "default",
      filled = false,
      disabled = false,
      readOnly = false,
      size = "small",
      fixed = false,
      placement = "none"
    } = this.props;
    const localClass = useMemo(() => {
      const placementClass = fixed ? `placement-${placement}` : "";
      return classnames(
        "elf--badge",
        {
          [variant]: true,
          filled,
          disabled,
          readonly: readOnly,
          [size]: true,
          fixed
        },
        placementClass
      );
    }, [variant, filled, disabled, readOnly, size, fixed, placement]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$e)
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, /* @__PURE__ */ createElementJsx("label", null, content));
  }
}
registerComponent("badge", Badge);
registerComponent("Badge", Badge);
const cssProperties$d = makeCssVariablePrefixMap("--elf--progressbar", {
  backgroundColor: true,
  color: true,
  borderRadius: true,
  fontSize: true,
  duration: true
});
const PERCENT_NUMBER = 100;
function converValueToPercent(value) {
  return value + "%";
}
class ProgressBar extends UIElement {
  template() {
    const {
      min = 0,
      max = PERCENT_NUMBER,
      value = min,
      showValue = true,
      valueFunction = converValueToPercent,
      title: title2,
      variant = "default",
      size = "medium",
      style: style2 = {},
      shape = "round",
      indeterminate = false
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--progressbar", {
        [variant]: true,
        [size]: true,
        [shape]: true,
        indeterminate
      });
    }, [variant, size, indeterminate, shape]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$d)
    };
    const localValue = (value - min) / (max - min);
    const percentValue = Math.round(localValue * PERCENT_NUMBER);
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, title2 ? /* @__PURE__ */ createElementJsx("div", { class: "title-area" }, /* @__PURE__ */ createElementJsx("label", null, title2), showValue && !indeterminate ? /* @__PURE__ */ createElementJsx("span", null, " ", valueFunction(percentValue), " ") : void 0) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "progress-area" }, /* @__PURE__ */ createElementJsx("div", { class: "progress", style: { width: `${percentValue}%` } })));
  }
}
registerComponent("progressbar", ProgressBar);
registerComponent("ProgressBar", ProgressBar);
registerComponent("progress-bar", ProgressBar);
const cssProperties$c = makeCssVariablePrefixMap("--elf--treeview", {
  backgroundColor: true,
  backgroundImage: true,
  borderRadius: true,
  fontSize: true,
  duration: true,
  activeColor: true,
  width: true,
  height: true,
  handlBackgroundColor: true,
  gap: true
});
const tooltipMap = /* @__PURE__ */ new WeakMap();
const isEllipsisActive = (el) => {
  return el.offsetWidth < el.scrollWidth;
};
function displayTooltip(label, target) {
  const $label = Dom.create(target).$(".label");
  if (isEllipsisActive($label.el)) {
    const labelRect = $label.rect();
    const { left, top, width, height, right, bottom } = labelRect;
    const $tooltip = tooltip({
      message: label,
      placement: "top",
      style: {
        left,
        top,
        width,
        height,
        right,
        bottom
      }
    });
    tooltipMap.set(target, $tooltip);
  }
}
function hideTooltip(target) {
  const $tooltip = tooltipMap.get(target);
  if ($tooltip) {
    $tooltip.close();
    $tooltip.remove();
    tooltipMap.delete(target);
  }
}
function itemRenderer(item, top, renderIndex, {
  onSelect,
  onDoubleClick,
  selectionStyle,
  editable,
  onEditStart,
  onEditCancel,
  onEdit,
  onEditEnd,
  variant,
  renderActions,
  renderArrow,
  renderLabel,
  renderLoading,
  onToggle,
  renderContext,
  draggable,
  showTooltip
}) {
  const { data, depth } = item;
  const arrow = renderArrow == null ? void 0 : renderArrow(item);
  const contextView = renderContext == null ? void 0 : renderContext(item);
  const actions = renderActions == null ? void 0 : renderActions(item);
  const label = (renderLabel == null ? void 0 : renderLabel(item)) || data.title;
  const loadingText = (renderLoading == null ? void 0 : renderLoading(item)) || "Loading....";
  return /* @__PURE__ */ createElementJsx(
    "div",
    {
      class: classnames("elf--treeview-item", {
        selected: data.selected,
        [variant]: true,
        loading: data.loading
      }),
      "data-depth": depth,
      key: data.id,
      draggable: draggable ? true : void 0,
      style: {
        "--elf--virtual-scroll-item-top": `${top}px`,
        "--elf--treeview-item-depth": depth
      }
    },
    draggable ? /* @__PURE__ */ createElementJsx("div", { class: "drag-handle" }, "⋮") : void 0,
    selectionStyle === "checkbox" ? /* @__PURE__ */ createElementJsx("div", { class: "checkbox-area" }, /* @__PURE__ */ createElementJsx(
      Checkbox,
      {
        ...{
          checked: data.selected ? "checked" : void 0
        },
        onClick: (e) => onSelect(item, "checkbox", e)
      }
    )) : void 0,
    /* @__PURE__ */ createElementJsx("div", { class: "depth-area" }),
    data.children ? /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "collapse-area",
        onClick: (e) => {
          onToggle(item, e);
        }
      },
      /* @__PURE__ */ createElementJsx(
        "div",
        {
          class: classnames({
            collapsed: data.collapsed
          })
        },
        arrow || /* @__PURE__ */ createElementJsx("span", null, "›")
      )
    ) : /* @__PURE__ */ createElementJsx("div", { class: "collapse-area" }, " "),
    contextView ? /* @__PURE__ */ createElementJsx("div", { class: "context-area" }, contextView) : void 0,
    (data == null ? void 0 : data.loading) ? /* @__PURE__ */ createElementJsx("div", { class: "loading-area" }, loadingText) : item.edit ? /* @__PURE__ */ createElementJsx("label", { class: "label-area" }, /* @__PURE__ */ createElementJsx(
      InputEditor,
      {
        type: "text",
        value: item.data.title,
        onFocusOut: (e) => {
          console.log("onFocusOut", e);
          onEditCancel(item, e);
        },
        onKeyUp: (e) => {
          if (editable) {
            if (e.key === "Enter") {
              e.target.blur();
              item.data.title = e.target.value;
              onEditEnd(item, e);
              return;
            } else if (e.key === "Escape") {
              onEditCancel(item, e);
              return;
            }
            onEdit(item, e.target.value);
          }
        }
      }
    )) : /* @__PURE__ */ createElementJsx(
      "label",
      {
        class: "label-area",
        onDblClick: (e) => {
          if (editable) {
            if (!item.edit) {
              onEditStart(item, e);
            }
          }
          onDoubleClick(item, e);
        },
        onClick: (e) => onSelect(item, "highlight", e),
        onMouseEnter: (e) => {
          if (label) {
            showTooltip && displayTooltip(label, e.target);
          }
        },
        onMouseLeave: (e) => {
          showTooltip && hideTooltip(e.target);
        }
      },
      /* @__PURE__ */ createElementJsx("div", { class: "label" }, label)
    ),
    actions ? /* @__PURE__ */ createElementJsx("div", { class: "actions-area" }, actions) : void 0,
    /* @__PURE__ */ createElementJsx("div", { class: "tail-area" })
  );
}
function treeToList(items2 = [], depth = 0, command = { index: 0 }) {
  const result = [];
  items2.forEach((it) => {
    result.push({
      data: it,
      depth,
      edit: it.id === command.editId,
      editing: it.id === command.editingId,
      index: command.index
    });
    command.up();
    if (!it.collapsed && it.children) {
      result.push(...treeToList(it.children, depth + 1, command));
    }
  });
  return result;
}
class TreeView extends UIElement {
  initState() {
    const { items: items2 } = this.props;
    return {
      originalItems: items2,
      items: this.updateItems(items2),
      isInDraggable: false
    };
  }
  updateItems(items2 = []) {
    return treeToList(items2, 0, {
      index: 0,
      editId: this.state.editId,
      editingId: this.state.editingId,
      up() {
        this.index += 1;
      }
    });
  }
  template() {
    const {
      style: style2,
      variant = "default",
      itemHeight = 32,
      overscanRowCount = 30,
      renderContext,
      selectionStyle = "highlight",
      showTooltip = false,
      renderActions,
      renderArrow,
      renderLoading,
      draggable = false,
      onClickNode,
      onDoubleClickNode,
      onToggleNode,
      onDropNode,
      onEditStart,
      onEdit,
      onEditEnd,
      onEditCancel,
      editable,
      items: originalItems
    } = this.props;
    const items2 = this.updateItems(originalItems);
    const localClass = "elf--treeview";
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$c)
    };
    const itemRendererProps = {
      onDoubleClick: useCallback(
        (item, e) => {
          onDoubleClickNode == null ? void 0 : onDoubleClickNode(item, e);
        },
        [onDoubleClickNode]
      ),
      onSelect: useCallback(
        (item, style22, e) => {
          if (style22 === selectionStyle) {
            onClickNode == null ? void 0 : onClickNode(item, e);
          }
        },
        [onClickNode]
      ),
      onToggle: useCallback(
        (item, e) => {
          onToggleNode == null ? void 0 : onToggleNode(item, e);
        },
        [onToggleNode]
      ),
      onEdit: useCallback(
        (item, value) => {
          if (this.state.editingId !== item.data.id) {
            this.state.editingId = item.data.id;
          }
          onEdit == null ? void 0 : onEdit(item, value);
        },
        [onEdit]
      ),
      onEditStart: useCallback(
        (item, e) => {
          this.state.editId = item.data.id;
          this.state.target = e.target;
          this.refresh();
          onEditStart == null ? void 0 : onEditStart(item, e);
        },
        [onEditStart]
      ),
      onEditEnd: useCallback(
        (item, e) => {
          this.state.editId = "";
          this.state.editingId = "";
          this.state.target = null;
          this.refresh();
          onEditEnd == null ? void 0 : onEditEnd(item, e);
        },
        [onEditEnd]
      ),
      onEditCancel: useCallback(
        (item, e) => {
          this.state.editId = "";
          this.state.editingId = "";
          this.state.target = null;
          this.refresh();
          onEditCancel == null ? void 0 : onEditCancel(item, e);
        },
        [onEditCancel]
      ),
      editable,
      variant,
      draggable,
      showTooltip,
      renderContext,
      selectionStyle,
      renderActions,
      renderArrow,
      renderLoading
    };
    const onDrag = useCallback(() => {
    }, []);
    const onDragStart = useCallback((e) => {
      const $item = Dom.create(e.target).closest("elf--treeview-item");
      const ghost = this.setGhost($item, e);
      this.setState(
        {
          isInDraggable: true,
          startId: $item.attr("key"),
          rect: this.$el.rect(),
          ghost
        },
        false
      );
      e.target.style.opacity = 0.5;
      this.$el.addClass("dragging");
    }, []);
    const onDragEnd = useCallback((e) => {
      Dom.create(this.state.ghost).remove();
      e.target.style.opacity = 1;
      this.$el.removeClass("dragging");
      this.$el.removeClass("dragovered");
    }, []);
    const onDragEnter = useCallback(() => {
    }, []);
    const onDragOver = useCallback((e) => {
      e.preventDefault();
      this.$el.addClass("dragovered");
      const $item = Dom.create(e.target).closest("elf--treeview-item");
      if (!$item) {
        return;
      }
      const $depthArea = $item == null ? void 0 : $item.$(".depth-area");
      this.setState(
        {
          endId: $item.attr("key")
        },
        false
      );
      if (this.state.endId === this.state.startId) {
        return;
      }
      const rect = $item.rect();
      const depthRect = $depthArea.rect();
      const left = depthRect.right - rect.left;
      const rate = (e.clientY - rect.top) / (rect.bottom - rect.top);
      this.setState(
        {
          rate
        },
        false
      );
      let top = rect.top;
      if (0.33 < rate && rate < 0.66) {
        this.$el.removeClass("line");
        this.$el.addClass("area");
        Dom.create(this.refs.$dragArea).css({
          top: `${rect.top - this.state.rect.top}px`,
          left: `${left}px`,
          width: `${rect.width - left}px`,
          height: `${rect.height}px`
        });
      } else {
        this.$el.removeClass("area");
        this.$el.addClass("line");
        if (rate > 0.66) {
          top = rect.bottom;
        }
        Dom.create(this.refs.$dragline).css({
          top: `${top - this.state.rect.top}px`,
          left: `${left}px`
        });
      }
    }, []);
    const onDragLeave = useCallback(() => {
    }, []);
    const onDrop = useCallback(
      (e) => {
        e.preventDefault();
        this.setState(
          {
            isInDraggable: false,
            endId: Dom.create(e.target).closest("elf--treeview-item").attr("key")
          },
          false
        );
        if (this.state.startId === this.state.endId) {
          return;
        }
        onDropNode(
          {
            startId: this.state.startId,
            endId: this.state.endId,
            rate: this.state.rate,
            targetPosition: this.targetPosition
          },
          e
        );
      },
      [onDropNode]
    );
    useEffect(() => {
      if (this.state.editId) {
        setTimeout(() => {
          const $input = Dom.create(this.state.target).$("input");
          if ($input) {
            $input.focus();
            $input.select();
          }
        }, 10);
      }
    }, [this.state.editId, this.state.editingId]);
    const events = {
      droppable: true,
      onDrag,
      onDragStart,
      onDragEnd,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject, ...events }, /* @__PURE__ */ createElementJsx(
      VirtualScroll,
      {
        itemHeight,
        overscanRowCount,
        items: items2,
        itemRenderer: (item, top, renderIndex) => {
          return itemRenderer(item, top, renderIndex, itemRendererProps);
        }
      }
    ), /* @__PURE__ */ createElementJsx("div", { class: "drag-line", ref: "$dragline" }, /* @__PURE__ */ createElementJsx("div", { class: "drag-line-inner left" }), /* @__PURE__ */ createElementJsx("div", { class: "drag-line-inner right" })), /* @__PURE__ */ createElementJsx("div", { class: "drag-inner-area", ref: "$dragArea" }));
  }
  get targetPosition() {
    if (this.state.rate < 0.33) {
      return "top";
    } else if (this.state.rate < 0.66) {
      return "middle";
    } else {
      return "bottom";
    }
  }
  setGhost($item, e) {
    const itemRect = $item.rect();
    const ghost = $item.clone(true).el;
    ghost.style.position = "absolute";
    ghost.style.top = "auto";
    ghost.style.left = "-100000px";
    ghost.style.width = `${itemRect.width}px`;
    ghost.style.height = `${itemRect.height}px`;
    ghost.style.opacity = 1;
    ghost.style.pointerEvents = "none";
    ghost.style.zIndex = 9999;
    ghost.classList.add("ghost");
    const ghostLeft = e.clientX - itemRect.left;
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, ghostLeft, -10);
    return ghost;
  }
}
registerComponent("treeview", TreeView);
registerComponent("tree-view", TreeView);
registerComponent("TreeView", TreeView);
const cssProperties$b = makeCssVariablePrefixMap("--elf--table", {
  backgroundColor: true,
  color: true,
  duration: true,
  offset: true,
  width: true,
  cellTextAlign: true
});
const headCssProperties = makeCssVariablePrefixMap("--elf--table-head", {
  cellAlign: true,
  cellPadding: true
});
class Table extends UIElement {
  template() {
    const {
      quiet = false,
      columns = [],
      data = [],
      style: style2 = {},
      selectionStyle = "highlight",
      selectionType = "multiple"
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--table", {
        quiet,
        [selectionStyle]: true,
        [selectionType]: true
      });
    }, [quiet, selectionStyle, selectionType]);
    const styleObject = {
      class: localClass,
      style: propertyMap(style2, cssProperties$b)
    };
    let allChecked = false;
    let indeterminate = false;
    if (selectionStyle === "checkbox") {
      const filterData = data.filter((item) => item.selected);
      if (filterData.length === data.length) {
        allChecked = true;
      } else if (filterData.length > 0 && filterData.length < data.length) {
        indeterminate = true;
      }
    }
    return /* @__PURE__ */ createElementJsx("table", { ...styleObject }, /* @__PURE__ */ createElementJsx("thead", null, /* @__PURE__ */ createElementJsx("tr", null, selectionStyle === "checkbox" ? /* @__PURE__ */ createElementJsx("th", { class: "elf--table-head-cell" }, /* @__PURE__ */ createElementJsx(Checkbox, { checked: allChecked, indeterminate })) : void 0, columns.map((column) => {
      var _a;
      if (((_a = column.style) == null ? void 0 : _a.display) === "none") {
        return void 0;
      }
      return /* @__PURE__ */ createElementJsx(
        "th",
        {
          class: classnames({
            divider: column.showDivider
          }),
          style: propertyMap(column == null ? void 0 : column.style, headCssProperties)
        },
        /* @__PURE__ */ createElementJsx("div", { class: "head-content" }, /* @__PURE__ */ createElementJsx("label", null, column.title), column.tools ? /* @__PURE__ */ createElementJsx("div", { class: "tools" }, column.tools) : void 0)
      );
    }))), /* @__PURE__ */ createElementJsx("tbody", null, data.map((row) => {
      return /* @__PURE__ */ createElementJsx(
        "tr",
        {
          class: classnames({
            selected: row.selected
          })
        },
        selectionStyle === "checkbox" ? /* @__PURE__ */ createElementJsx("td", { class: "elf--table-cell" }, /* @__PURE__ */ createElementJsx(
          Checkbox,
          {
            checked: row.selected,
            indeterminate: row.indeterminate
          }
        )) : void 0,
        columns.map((column) => {
          var _a, _b, _c;
          if (((_a = column.style) == null ? void 0 : _a.display) === "none") {
            return void 0;
          }
          return /* @__PURE__ */ createElementJsx(
            "td",
            {
              class: classnames({
                divider: column.showDivider
              }),
              style: {
                textAlign: (_b = column.style) == null ? void 0 : _b.textAlign,
                display: (_c = column.style) == null ? void 0 : _c.display
              }
            },
            column.render ? column.render(column.key, row[column.key], row, data) : row[column.key]
          );
        })
      );
    })));
  }
}
registerComponent("table", Table);
registerComponent("Table", Table);
makeCssVariablePrefixMap("--elf--card", {
  borderColor: true,
  backgroundColor: true,
  padding: true,
  borderRadius: true,
  width: true,
  height: true,
  shadow: true
});
makeCssVariablePrefixMap("--elf--card-preview", {
  height: true,
  width: true,
  ratio: true,
  backgroundColor: true
});
makeCssVariablePrefixMap("--elf--card-header", {
  textAlign: true
});
makeCssVariablePrefixMap("--elf--card-container", {
  height: true,
  ratio: true,
  backgroundColor: true
});
makeCssVariablePrefixMap("--elf--card-footer", {
  textAlign: true,
  sideOffset: true
});
makeCssVariablePrefixMap("--elf--card-body", {
  textAlign: true
});
makeCssVariablePrefixMap("--elf--card-avatar", {
  height: true,
  width: true,
  ratio: true,
  backgroundColor: true
});
makeCssVariablePrefixMap("--elf--card-actions", {
  height: true,
  width: true,
  ratio: true,
  backgroundColor: true
});
const cssProperties$2 = makeCssVariablePrefixMap("--elf--blank", {
  width: true,
  height: true,
  backgroundColor: true
});
class Blank extends UIElement {
  template() {
    const {
      style: style2 = {},
      stripe = "none",
      color = "transparent",
      content,
      ...extraProps
    } = this.props;
    const localClass = useMemo(() => {
      return classnames("elf--blank", {
        [stripe]: true
      });
    }, [stripe]);
    const styleObject = {
      class: localClass,
      style: propertyMap(
        {
          ...style2,
          backgroundColor: color
        },
        cssProperties$2
      ),
      ...extraProps
    };
    return /* @__PURE__ */ createElementJsx("div", { ...styleObject }, content || /* @__PURE__ */ createElementJsx("span", null, " "));
  }
}
registerComponent("blank", Blank);
registerComponent("Blank", Blank);
const cssProperties$1 = makeCssVariablePrefixMap("--elf--sidebar", {
  left: true,
  top: true,
  backgroundColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true,
  borderColor: true,
  boxShadow: true,
  width: true,
  maxWidth: true,
  sectionTitleColor: true,
  sectionTitleBackgroundColor: true,
  dividerColor: true,
  directionLeft: true,
  itemPadding: true
});
function makeSidebarItem$1(list2, depth = 0, hasSelected) {
  return list2.map((it) => {
    if (it === "-") {
      it = { type: "divider" };
    }
    if (it === "") {
      it = { type: "blank" };
    }
    if (typeof it === "string") {
      it = { type: "section", title: it };
    }
    if (it.type === "divider") {
      return /* @__PURE__ */ createElementJsx(Divider, { style: it.style });
    }
    if (it.type === "blank") {
      return /* @__PURE__ */ createElementJsx(Blank, { style: it.style });
    }
    if (it.type === "custom") {
      return /* @__PURE__ */ createElementJsx(
        CustomSidebarItem,
        {
          ...it,
          depth,
          hasSelected,
          selected: (hasSelected == null ? void 0 : hasSelected(it)) || (it == null ? void 0 : it.selected)
        }
      );
    }
    if (it.type === "section") {
      return /* @__PURE__ */ createElementJsx(SidebarItem$1, { depth, title: it.title, icon: it.icon });
    }
    return /* @__PURE__ */ createElementJsx(
      LinkSidebarItem$1,
      {
        link: it.link,
        title: it.title,
        target: it.target,
        items: it.items,
        depth,
        icon: it.icon,
        onClick: it.onClick,
        hasSelected,
        selected: (hasSelected == null ? void 0 : hasSelected(it)) || (it == null ? void 0 : it.selected)
      }
    );
  });
}
function LinkSidebarItem$1({
  link = "#",
  icon,
  target,
  title: title2,
  selected,
  depth = 0,
  items: items2 = [],
  onClick,
  hasSelected
}) {
  return /* @__PURE__ */ createElementJsx(
    "div",
    {
      class: classnames("elf--sidebar-item sidebar-link", {
        selected: isFunction(hasSelected) ? hasSelected({ title: title2, icon, link, depth }) : selected
      })
    },
    /* @__PURE__ */ createElementJsx("div", { class: "item-title" }, /* @__PURE__ */ createElementJsx("span", { class: "depth", "data-depth": depth }), /* @__PURE__ */ createElementJsx("span", { class: "selected-area" }, icon ? /* @__PURE__ */ createElementJsx("span", { class: "icon" }, icon) : void 0, !items2.length && link ? /* @__PURE__ */ createElementJsx("a", { href: link, target }, title2) : /* @__PURE__ */ createElementJsx("div", { onClick }, title2))),
    /* @__PURE__ */ createElementJsx("div", { class: "items" }, items2.length ? makeSidebarItem$1(items2, depth + 1, hasSelected) : void 0)
  );
}
function SidebarItem$1({ title: title2, depth, icon }) {
  return /* @__PURE__ */ createElementJsx("div", { class: "elf--sidebar-item section-title" }, /* @__PURE__ */ createElementJsx("div", { class: "item-title" }, /* @__PURE__ */ createElementJsx("span", { class: "depth", "data-depth": depth }), icon ? /* @__PURE__ */ createElementJsx("span", { class: "icon" }, icon) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "title" }, title2)));
}
function CustomSidebarItem(props) {
  const { render, depth, icon, hasSelected, selected } = props;
  return /* @__PURE__ */ createElementJsx(
    "div",
    {
      class: classnames("elf--sidebar-item custom", {
        selected: isFunction(hasSelected) ? hasSelected(props) : selected
      })
    },
    /* @__PURE__ */ createElementJsx("div", { class: "item-title" }, /* @__PURE__ */ createElementJsx("span", { class: "depth", "data-depth": depth }), icon ? /* @__PURE__ */ createElementJsx("span", { class: "icon" }, icon) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "title" }, render(props)))
  );
}
function BaseSidebar(props) {
  let {
    style: style2 = {},
    direction = "left",
    variant = "light",
    compact = false,
    items: items2 = [],
    header,
    footer,
    hasSelected
  } = props;
  let itemStyle = { ...style2 };
  const localClass = useMemo(() => {
    return classnames("elf--sidebar base-sidebar", {
      [variant]: true,
      compact
    });
  }, [variant, compact]);
  const styleObject = {
    "data-direction": direction,
    class: localClass,
    style: propertyMap(itemStyle, cssProperties$1)
  };
  return /* @__PURE__ */ createElementJsx("menu", { ...styleObject }, header ? /* @__PURE__ */ createElementJsx("div", { class: "header" }, header) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "body" }, makeSidebarItem$1(items2, 0, hasSelected)), footer ? /* @__PURE__ */ createElementJsx("div", { class: "footer" }, footer) : void 0);
}
const cssProperties$3 = makeCssVariablePrefixMap("--elf--sidebar", {
  left: true,
  top: true,
  backgroundColor: true,
  color: true,
  fontSize: true,
  fontWeight: true,
  height: true,
  padding: true,
  borderRadius: true,
  borderColor: true,
  boxShadow: true,
  width: true,
  maxWidth: true,
  sectionTitleColor: true,
  sectionTitleBackgroundColor: true,
  dividerColor: true,
  directionLeft: true,
  itemPadding: true
});
function makeSidebarItem(list2, depth = 0, hasSelected) {
  return list2.map((it) => {
    if (it === "-") {
      it = { type: "divider" };
    }
    if (it === "") {
      it = { type: "blank" };
    }
    if (typeof it === "string") {
      it = { type: "section", title: it };
    }
    if (it.type === "divider") {
      return /* @__PURE__ */ createElementJsx(Divider, { style: it.style });
    }
    if (it.type === "blank") {
      return /* @__PURE__ */ createElementJsx(Blank, { style: it.style });
    }
    if (it.type === "section") {
      return /* @__PURE__ */ createElementJsx(SidebarItem, { depth, title: it.title, icon: it.icon });
    }
    return /* @__PURE__ */ createElementJsx(
      LinkSidebarItem,
      {
        link: it.link,
        title: it.title,
        target: it.target,
        items: it.items,
        depth,
        icon: it.icon,
        tooltip: it.tooltip,
        onClick: it.onClick,
        hasSelected,
        selected: (hasSelected == null ? void 0 : hasSelected(it)) || (it == null ? void 0 : it.selected)
      }
    );
  });
}
function LinkSidebarItem({
  link = "#",
  icon,
  target,
  title: title2,
  selected,
  depth = 0,
  onClick,
  tooltip: tooltip2,
  hasSelected
}) {
  const sidebarItem = /* @__PURE__ */ createElementJsx(
    "div",
    {
      class: classnames("elf--sidebar-item sidebar-link", {
        selected: isFunction(hasSelected) ? hasSelected({ title: title2, icon, link, depth }) : selected
      })
    },
    /* @__PURE__ */ createElementJsx("div", { class: "item-title" }, /* @__PURE__ */ createElementJsx("span", { class: "selected-area" }, link ? /* @__PURE__ */ createElementJsx("a", { class: "icon", href: link, target }, icon) : /* @__PURE__ */ createElementJsx("div", { class: "icon", onClick }, icon)))
  );
  if (typeof tooltip2 === "string") {
    tooltip2 = { message: tooltip2 };
  }
  return tooltip2 ? /* @__PURE__ */ createElementJsx(FixedTooltip, { ...tooltip2, placement: "right", variant: "dark", show: true }, sidebarItem) : sidebarItem;
}
function SidebarItem({ icon }) {
  return /* @__PURE__ */ createElementJsx("div", { class: "elf--sidebar-item section-title" }, /* @__PURE__ */ createElementJsx("div", { class: "item-title" }, icon ? /* @__PURE__ */ createElementJsx("span", { class: "icon" }, icon) : void 0));
}
function CompactSidebar(props) {
  let {
    style: style2 = {},
    direction = "left",
    variant = "light",
    compact = false,
    items: items2 = [],
    header,
    footer,
    hasSelected
  } = props;
  let itemStyle = { ...style2 };
  const localClass = useMemo(() => {
    return classnames("elf--sidebar compact-sidebar", {
      [variant]: true,
      compact
    });
  }, [variant, compact]);
  const styleObject = {
    "data-direction": direction,
    class: localClass,
    style: propertyMap(itemStyle, cssProperties$3)
  };
  return /* @__PURE__ */ createElementJsx("menu", { ...styleObject }, header ? /* @__PURE__ */ createElementJsx("div", { class: "header" }, header) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "body" }, makeSidebarItem(items2, 0, hasSelected)), footer ? /* @__PURE__ */ createElementJsx("div", { class: "footer" }, footer) : void 0);
}
function Sidebar(props) {
  let { compact = false, ...otherProps } = props;
  return compact ? /* @__PURE__ */ createElementJsx(CompactSidebar, { ...otherProps }) : /* @__PURE__ */ createElementJsx(BaseSidebar, { ...otherProps });
}
registerComponent("sidebar", Sidebar);
function traverseTree(list2, callback, depth = 0, parent = void 0) {
  if (Array.isArray(list2)) {
    return list2.map((it) => traverseTree(it, callback)).flat(Infinity);
  } else if (Array.isArray(list2 == null ? void 0 : list2.items)) {
    return [
      callback(list2, depth, parent),
      ...list2.items.map((it) => traverseTree(it, callback, depth + 1, list2)).flat(Infinity)
    ];
  } else {
    return [callback(list2, depth, parent)];
  }
}
const MarkdownPage$1 = "";
const TableOfContents$1 = "";
function TableOfContents({ items: items2 }) {
  return /* @__PURE__ */ createElementJsx("div", { class: "table-of-contents" }, /* @__PURE__ */ createElementJsx("div", { class: "items" }, /* @__PURE__ */ createElementJsx("div", { class: "title" }, "Table of contents"), items2.map((it) => {
    const selected = location.hash.split("#")[1] === encodeURIComponent(it.id);
    return /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: classnames("toc-item", {
          selected
        }),
        "data-level": it.level
      },
      /* @__PURE__ */ createElementJsx("a", { href: `#${it.id}` }, it.text)
    );
  })));
}
function FileEditorLink({ filename }) {
  return filename ? /* @__PURE__ */ createElementJsx("div", { class: "filename" }, /* @__PURE__ */ createElementJsx(
    "a",
    {
      href: `https://github.com/elf-framework/editor/tree/develop/apps/ui-dev/${filename}`
    },
    "[Edit on the github]"
  )) : "";
}
function LinkView({ class: className, link, title: title2, category }) {
  return /* @__PURE__ */ createElementJsx("a", { href: link, class: classnames("link", className) }, category ? /* @__PURE__ */ createElementJsx("small", { class: "category" }, category || /* @__PURE__ */ createElementJsx("span", null, " ")) : void 0, /* @__PURE__ */ createElementJsx("span", { class: "title" }, title2));
}
function PrevNextLink({ prev, next }) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  return /* @__PURE__ */ createElementJsx(
    Flex,
    {
      style: {
        gap: "var(--gap-32)",
        height: 80,
        marginTop: 30,
        justifyContent: "space-between"
      }
    },
    prev ? /* @__PURE__ */ createElementJsx(
      LinkView,
      {
        class: "prev",
        link: (_a = prev.item) == null ? void 0 : _a.link,
        title: (_b = prev.item) == null ? void 0 : _b.title,
        category: ((_c = prev.parent) == null ? void 0 : _c.title) || ((_d = prev.item) == null ? void 0 : _d.category)
      }
    ) : /* @__PURE__ */ createElementJsx("div", null),
    next ? /* @__PURE__ */ createElementJsx(
      LinkView,
      {
        class: "next",
        link: (_e = next.item) == null ? void 0 : _e.link,
        title: (_f = next.item) == null ? void 0 : _f.title,
        category: ((_g = next.parent) == null ? void 0 : _g.title) || ((_h = next.item) == null ? void 0 : _h.category)
      }
    ) : /* @__PURE__ */ createElementJsx("div", null)
  );
}
function LinkedPage({ menu: menu2 }) {
  const { pathname } = location;
  const links = traverseTree(menu2, (item, depth, parent) => {
    return { item, depth, parent };
  });
  const pages = links.filter((it) => !isString(it.item));
  const index2 = pages.findIndex((it) => {
    var _a;
    return ((_a = it.item) == null ? void 0 : _a.link) === pathname;
  });
  const prev = index2 > 0 ? pages[index2 - 1] : void 0;
  const next = index2 < pages.length - 1 ? pages[index2 + 1] : void 0;
  return /* @__PURE__ */ createElementJsx(PrevNextLink, { prev, next });
}
function MarkdownPage({
  page: Page,
  filename,
  menu: menu2,
  tableOfContents = false,
  menuLink = false,
  editableSourceLink = false
}) {
  const template = Page();
  const items2 = [];
  template.children.forEach((child) => {
    var _a;
    if ((_a = child.nodeName) == null ? void 0 : _a.startsWith("H")) {
      const text = child.makeText(" ");
      const id = child.makeText("-");
      const targetId = encodeURIComponent(id);
      child.props.id = targetId;
      child.memoizedProps.id = targetId;
      const level = child.nodeName.replace("H", "");
      items2.push({ id, text, level });
    }
  });
  return /* @__PURE__ */ createElementJsx("div", { class: "markdown-page" }, /* @__PURE__ */ createElementJsx("div", { class: "markdown-page-content" }, /* @__PURE__ */ createElementJsx("div", { class: "content-container" }, editableSourceLink ? /* @__PURE__ */ createElementJsx(FileEditorLink, { filename }) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "content-inner", ref: "$inner" }, template.children || template), menuLink ? /* @__PURE__ */ createElementJsx(LinkedPage, { menu: menu2 }) : void 0, editableSourceLink ? /* @__PURE__ */ createElementJsx(FileEditorLink, { filename }) : void 0), items2.length && tableOfContents ? /* @__PURE__ */ createElementJsx(TableOfContents, { items: items2 }) : void 0));
}
const ApplicationLayout$1 = "";
const ROOT_URL = "/";
function url(urlString) {
  return ROOT_URL + urlString;
}
const Logo$1 = "";
function Logo({ link = url("") }) {
  return /* @__PURE__ */ createElementJsx("div", { class: "logo" }, /* @__PURE__ */ createElementJsx("a", { href: link }, /* @__PURE__ */ createElementJsx("span", { class: "symbol" }, "E"), /* @__PURE__ */ createElementJsx("div", null, "LF")));
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Logo
}, Symbol.toStringTag, { value: "Module" }));
function Navigation({ menu: menu2 = [], header, footer }) {
  const { href, pathname } = location;
  useEffect(() => {
    setTimeout(() => {
      const el = document.querySelector(".elf--sidebar-item.selected");
      if (el) {
        el.scrollIntoView();
      }
    }, 100);
  }, [href]);
  return /* @__PURE__ */ createElementJsx(
    Sidebar,
    {
      items: menu2,
      header,
      footer,
      hasSelected: (it) => {
        return it.link === pathname;
      }
    }
  );
}
const mainMenus = [
  {
    type: "link",
    title: "Application",
    category: "/pages/application",
    link: url("pages/application/")
  },
  {
    type: "link",
    title: "Feature Page",
    category: "/pages/page",
    link: url("pages/page/")
  },
  {
    type: "link",
    title: "Document",
    category: "/pages/document",
    link: url("pages/document/")
  },
  {
    type: "link",
    title: "Article",
    category: "/pages/article",
    link: url("pages/article/")
  },
  {
    type: "link",
    title: "Blog",
    category: "/pages/blog",
    link: url("pages/blog/")
  },
  {
    type: "link",
    title: "Simple",
    category: "/pages/simple",
    link: url("pages/simple/")
  },
  {
    type: "link",
    title: "Embeded",
    category: "/pages/embeded",
    link: url("pages/embeded/")
  }
];
const PageTools$1 = "";
function makeElement(node) {
  return createElementJsx(node.tag, node.attributes, node.children.map(makeElement));
}
function SvgIcon(node, props = {}) {
  if (props.width && !props.height) {
    props.height = props.width;
  }
  return /* @__PURE__ */ createElementJsx("span", {
    class: `elf--icon ${node.theme}`,
    "data-name": node.name
  }, /* @__PURE__ */ createElementJsx("svg", {
    ...node.icon.attributes,
    fill: "currentColor",
    ...props
  }, node.icon.children.map(makeElement)));
}
const DarkModeFilled = (props = {}) => {
  return SvgIcon({ "name": "DarkMode", "theme": "filled", "icon": { "tag": "svg", "attributes": { "xmlns": "http://www.w3.org/2000/svg", "width": "24", "height": "24", "viewBox": "0 0 24 24" }, "children": [{ "tag": "path", "attributes": { "d": "M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" }, "children": [] }] } }, props);
};
DarkModeFilled.displayName = "DarkModeFilled";
const LightModeFilled = (props = {}) => {
  return SvgIcon({ "name": "LightMode", "theme": "filled", "icon": { "tag": "svg", "attributes": { "xmlns": "http://www.w3.org/2000/svg", "width": "24", "height": "24", "viewBox": "0 0 24 24" }, "children": [{ "tag": "path", "attributes": { "d": "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" }, "children": [] }] } }, props);
};
LightModeFilled.displayName = "LightModeFilled";
function ThemeButton() {
  const mode = window.localStorage.getItem("view-mode") || "light";
  const [viewMode, setViewMode] = useState(mode);
  useSubscribe("view-mode", (mode2) => {
    setViewMode(mode2);
  });
  return /* @__PURE__ */ createElementJsx("div", { style: { justifyContent: "flex-end", color: "inherit" } }, viewMode === "dark" ? /* @__PURE__ */ createElementJsx(
    RoundButton,
    {
      iconOnly: true,
      quiet: true,
      onClick: () => {
        setViewMode("light");
        useEmit("view-mode", "light");
        window.localStorage.setItem("view-mode", "light");
        document.body.classList.toggle("theme-dark", false);
      }
    },
    /* @__PURE__ */ createElementJsx(DarkModeFilled, null)
  ) : /* @__PURE__ */ createElementJsx(
    RoundButton,
    {
      iconOnly: true,
      quiet: true,
      onClick: () => {
        setViewMode("dark");
        useEmit("view-mode", "dark");
        window.localStorage.setItem("view-mode", "dark");
        document.body.classList.toggle("theme-dark", true);
      }
    },
    /* @__PURE__ */ createElementJsx(LightModeFilled, null)
  ));
}
function PageTools({ menu: menu2, showThemeButton = true }) {
  const pathname = location.pathname;
  return /* @__PURE__ */ createElementJsx("div", { class: "page-tools" }, /* @__PURE__ */ createElementJsx("div", { class: "sm" }, /* @__PURE__ */ createElementJsx(
    Tools,
    {
      items: [
        {
          type: "menu",
          title: "Menu",
          items: [
            {
              type: "item",
              title: "Documents",
              items: [{ type: "group", title: "Docs" }, ...mainMenus]
            },
            "-",
            ...menu2.map((it) => {
              if (typeof it === "string") {
                return { type: "group", title: it };
              }
              return {
                type: "link",
                selected: pathname.startsWith(it.category),
                ...it
              };
            })
          ]
        }
      ]
    }
  )), /* @__PURE__ */ createElementJsx("div", { class: "lg" }, /* @__PURE__ */ createElementJsx("div", null, mainMenus.map((it, index2) => {
    const selected = pathname.startsWith(it.category);
    return [
      index2 === 0 ? void 0 : /* @__PURE__ */ createElementJsx("span", { class: "divider" }),
      /* @__PURE__ */ createElementJsx(
        "a",
        {
          href: it.link,
          class: classnames({
            selected
          })
        },
        it.title
      )
    ];
  })), showThemeButton ? /* @__PURE__ */ createElementJsx("div", { style: { justifyContent: "flex-end", color: "inherit" } }, /* @__PURE__ */ createElementJsx(ThemeButton, null)) : void 0));
}
function changeTheme(mode) {
  if (mode === "light") {
    document.body.classList.toggle("theme-dark", false);
  } else {
    document.body.classList.toggle("theme-dark", true);
  }
}
function useTheme() {
  useEffect(() => {
    const media = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const mode = media ? "dark" : localStorage.getItem("view-mode") || "light";
    changeTheme(mode);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      const mode2 = event.matches ? "dark" : "light";
      useEmit("view-mode", mode2);
      localStorage.setItem("view-mode", mode2);
      changeTheme(mode2);
    });
  }, []);
}
function LogoView$2() {
  return /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(Logo, null));
}
function ApplicationLayout(props) {
  let {
    content,
    menu: menu2 = [],
    logo = void 0,
    toolbar = void 0,
    sidebar = void 0,
    title: title2 = "",
    class: className = ""
  } = props;
  logo = logo || /* @__PURE__ */ createElementJsx(LogoView$2, { title: title2 });
  toolbar = toolbar || /* @__PURE__ */ createElementJsx(PageTools, { menu: menu2, showThemeButton: false });
  sidebar = sidebar || /* @__PURE__ */ createElementJsx(Navigation, { menu: menu2 });
  useTheme();
  return /* @__PURE__ */ createElementJsx("div", { class: `application-layout layout ${className}` }, /* @__PURE__ */ createElementJsx("div", { class: "top" }, /* @__PURE__ */ createElementJsx("div", { class: "layout-header" }, /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(Flex, { class: "layout-logo" }, logo), /* @__PURE__ */ createElementJsx(Flex, { class: "layout-tools" }, toolbar)), /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(ThemeButton, null)))), /* @__PURE__ */ createElementJsx("div", { class: "body" }, /* @__PURE__ */ createElementJsx("div", { class: "left" }, /* @__PURE__ */ createElementJsx(View, { class: "layout-menu" }, sidebar)), /* @__PURE__ */ createElementJsx("div", { class: "center" }, /* @__PURE__ */ createElementJsx(View, { class: "layout-content" }, content.map((it) => {
    return isFunction(it) ? it(menu2) : it;
  }))), /* @__PURE__ */ createElementJsx("div", { class: "right" }, /* @__PURE__ */ createElementJsx(View, { class: "layout-menu" }, sidebar))));
}
const __vite_glob_0_0$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ApplicationLayout
}, Symbol.toStringTag, { value: "Module" }));
const menu$1 = [
  "Introduction",
  {
    link: "/pages/article/core/",
    title: "Core Concept"
  },
  {
    link: "/pages/article/install/",
    title: "Install",
    items: [
      {
        link: "/pages/article/install/vite/",
        title: "Vite"
      },
      {
        link: "/pages/article/install/webpack/",
        title: "webpack",
        disabled: true
      },
      {
        link: "/pages/article/install/create-sapa-app/",
        title: "create-sapa-app",
        disabled: true
      }
    ]
  },
  {
    link: "/pages/article/development/",
    title: "Development"
  },
  {
    link: "/pages/article/contribute/",
    title: "Contribute"
  }
];
function ApplicationReadLayout({ content, ...extraProps }) {
  return /* @__PURE__ */ createElementJsx(ApplicationLayout, { ...extraProps, title: "Application", menu: menu$1 }, content);
}
const __vite_glob_0_1$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ApplicationReadLayout
}, Symbol.toStringTag, { value: "Module" }));
const SimpleLayout$1 = "";
const PageSelectTools$1 = "";
function PageSelectTools() {
  const pathname = location.pathname;
  return /* @__PURE__ */ createElementJsx("div", { class: "page-select-tools" }, /* @__PURE__ */ createElementJsx(
    "select",
    {
      class: "select",
      onChange: (e) => {
        if (e.target.value) {
          location.href = e.target.value;
        }
      }
    },
    /* @__PURE__ */ createElementJsx("option", { value: "/" }, "Main"),
    mainMenus.map((it) => {
      const selected = pathname.startsWith(it.category);
      const props = {
        selected: selected ? "selected" : void 0
      };
      return /* @__PURE__ */ createElementJsx("option", { value: it.link, ...props }, it.title);
    })
  ));
}
function SimpleLayout(props) {
  let {
    content,
    menu: menu2 = [],
    logo = void 0,
    toolbar = void 0,
    sidebar = void 0,
    title: title2 = "",
    class: className = ""
  } = props;
  logo = logo || /* @__PURE__ */ createElementJsx(Logo, { title: title2 });
  toolbar = toolbar || /* @__PURE__ */ createElementJsx(PageSelectTools, { menu: menu2 });
  sidebar = sidebar || /* @__PURE__ */ createElementJsx(Navigation, { menu: menu2 });
  useTheme();
  return /* @__PURE__ */ createElementJsx("div", { class: `simple-layout layout ${className}` }, /* @__PURE__ */ createElementJsx(View, { class: "layout-menu" }, /* @__PURE__ */ createElementJsx("div", { class: "logo-area" }, logo, /* @__PURE__ */ createElementJsx(ThemeButton, null)), /* @__PURE__ */ createElementJsx("div", { class: "tools-area" }, toolbar), /* @__PURE__ */ createElementJsx("div", { class: "sidebar-area" }, sidebar)), /* @__PURE__ */ createElementJsx(View, { class: "layout-content" }, /* @__PURE__ */ createElementJsx("div", null, content.map((it) => {
    return isFunction(it) ? it(menu2) : it;
  }))));
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SimpleLayout
}, Symbol.toStringTag, { value: "Module" }));
function ArticleLayout({ content, ...extraProps }) {
  return /* @__PURE__ */ createElementJsx(SimpleLayout, { ...extraProps, title: "Article", menu: menu$1 }, content);
}
const __vite_glob_0_2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArticleLayout
}, Symbol.toStringTag, { value: "Module" }));
const BlankLayout$1 = "";
const cssProperties = makeCssVariablePrefixMap("--blank-layout", {
  contentBackgroundColor: true
});
function BlankLayout(props) {
  const { content, style: style2 = {} } = props;
  useTheme();
  return /* @__PURE__ */ createElementJsx("div", { class: "blank-layout", style: propertyMap(style2, cssProperties) }, /* @__PURE__ */ createElementJsx(View, { class: "layout-content" }, /* @__PURE__ */ createElementJsx("div", { class: "container-lg" }, content.map((it) => {
    return isFunction(it) ? it([]) : it;
  }))));
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BlankLayout
}, Symbol.toStringTag, { value: "Module" }));
const BlogLayout$1 = "";
const createdAt$2 = 1671072784171;
const title$2 = "블로그를  처음 적어보아요.";
const date = "2022-12-16T00:00:00.000Z";
const layout$2 = "BlogReadLayout";
const tags = [
  "hello",
  "world",
  "blog",
  "elf"
];
const account = {
  imageUrl: "https://avatars.githubusercontent.com/u/1234567?v=4",
  name: "elf"
};
const updatedAt$2 = 1671073785215;
const index_meta$2 = {
  createdAt: createdAt$2,
  title: title$2,
  date,
  layout: layout$2,
  tags,
  account,
  updatedAt: updatedAt$2
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createdAt: createdAt$2,
  title: title$2,
  date,
  layout: layout$2,
  tags,
  account,
  updatedAt: updatedAt$2,
  default: index_meta$2
}, Symbol.toStringTag, { value: "Module" }));
const createdAt$1 = 1671073867448;
const title$1 = "2번째 블로그입니다.";
const layout$1 = "BlogReadLayout";
const updatedAt$1 = 1671073885793;
const index_meta$1 = {
  createdAt: createdAt$1,
  title: title$1,
  layout: layout$1,
  updatedAt: updatedAt$1
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createdAt: createdAt$1,
  title: title$1,
  layout: layout$1,
  updatedAt: updatedAt$1,
  default: index_meta$1
}, Symbol.toStringTag, { value: "Module" }));
const createdAt = 1671081383380;
const title = "최신 블로그 리스트";
const layout = "BlogReadLayout";
const updatedAt = 1671097109035;
const index_meta = {
  createdAt,
  title,
  layout,
  updatedAt
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createdAt,
  title,
  layout,
  updatedAt,
  default: index_meta
}, Symbol.toStringTag, { value: "Module" }));
const metaList = /* @__PURE__ */ Object.assign({
  "/pages/blog/2022-12-15/index.meta.json": __vite_glob_0_0,
  "/pages/blog/2022-12-16/index.meta.json": __vite_glob_0_1,
  "/pages/blog/index.meta.json": __vite_glob_0_2
});
let list$1 = Object.entries(metaList).map(([key, value]) => {
  if (key.startsWith("/pages/blog/index"))
    return void 0;
  return {
    link: key.replace("meta.json", "html"),
    ...value
  };
}).filter(Boolean);
list$1.sort((a, b) => {
  return a.updateAt < b.updateAt ? 1 : -1;
});
list$1 = list$1.slice(0, 5);
const currentBlogList = list$1;
const meta = {
  currentBlogList
};
console.log(meta);
function BlogLayout(props) {
  let {
    content,
    date: date2,
    menu: menu2 = [],
    tags: tags2,
    logo,
    toolbar,
    account: account2,
    title: title2 = "",
    class: className = ""
  } = props;
  logo = logo || /* @__PURE__ */ createElementJsx(Logo, { title: title2 });
  toolbar = toolbar || /* @__PURE__ */ createElementJsx(PageTools, { menu: menu2 });
  return /* @__PURE__ */ createElementJsx("div", { class: `blog-layout ${className}` }, /* @__PURE__ */ createElementJsx("div", { class: "layout-header" }, /* @__PURE__ */ createElementJsx(Flex, { class: `layout-tools` }, logo, toolbar)), /* @__PURE__ */ createElementJsx("div", { class: "application-main" }, /* @__PURE__ */ createElementJsx("main", null, /* @__PURE__ */ createElementJsx("div", { class: "application-content" }, /* @__PURE__ */ createElementJsx("div", { class: "container-lg" }, /* @__PURE__ */ createElementJsx(Flex, { style: { gap: 10 } }, /* @__PURE__ */ createElementJsx("div", { class: "blog-area", style: { flex: "1 1 auto" } }, /* @__PURE__ */ createElementJsx("div", { class: "blog-header" }, /* @__PURE__ */ createElementJsx("div", { class: "blog-title" }, title2), account2 ? /* @__PURE__ */ createElementJsx("div", { class: "blog-account" }, /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(Avatar, null, /* @__PURE__ */ createElementJsx("img", { src: account2 == null ? void 0 : account2.imageUrl })), account2 == null ? void 0 : account2.name), date2 ? /* @__PURE__ */ createElementJsx("span", { class: "blog-date" }, " ", date2, " ") : void 0) : void 0, /* @__PURE__ */ createElementJsx("div", { class: "blog-divider" }), tags2 ? /* @__PURE__ */ createElementJsx("div", { class: "blog-tags" }, "Tags:", " ", tags2.map((it) => /* @__PURE__ */ createElementJsx(Badge, null, it))) : void 0), /* @__PURE__ */ createElementJsx(Flex, { style: { gap: 10 } }, /* @__PURE__ */ createElementJsx("div", { class: "blog-content", style: { flex: "1 1 auto" } }, content.map((it) => {
    return isFunction(it) ? it(menu2) : it;
  })))), /* @__PURE__ */ createElementJsx(
    "div",
    {
      style: {
        flex: "none",
        width: 240,
        paddingTop: 30,
        position: "relative"
      }
    },
    /* @__PURE__ */ createElementJsx(
      "div",
      {
        class: "blog-sidebar",
        style: {
          position: "sticky",
          top: 20,
          flex: "none",
          width: 240,
          backgroundColor: "var(--color-background-default)",
          border: "1px solid var(--color-gray-9)",
          borderRadius: 10,
          padding: 10
        }
      },
      /* @__PURE__ */ createElementJsx("div", { class: "blog-sidebar-title" }, "Recent Posts"),
      /* @__PURE__ */ createElementJsx("div", { class: "blog-sidebar-list" }, meta.currentBlogList.map((it) => /* @__PURE__ */ createElementJsx("div", { class: "blog-sidebar-item" }, /* @__PURE__ */ createElementJsx("a", { href: it.link }, it.title))))
    )
  )))))));
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BlogLayout
}, Symbol.toStringTag, { value: "Module" }));
function BlogReadLayout({ content, ...extraProps }) {
  return /* @__PURE__ */ createElementJsx(BlogLayout, { ...extraProps, menu: menu$1 }, content);
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BlogReadLayout
}, Symbol.toStringTag, { value: "Module" }));
const DocumentLayout$1 = "";
function LogoView$1() {
  return /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(Logo, null));
}
function DocumentLayout(props) {
  let {
    content,
    menu: menu2 = [],
    logo = void 0,
    toolbar = void 0,
    sidebar = void 0,
    title: title2 = "",
    class: className = ""
  } = props;
  logo = logo || /* @__PURE__ */ createElementJsx(LogoView$1, { title: title2 });
  toolbar = toolbar || /* @__PURE__ */ createElementJsx(PageTools, { menu: menu2 });
  sidebar = sidebar || /* @__PURE__ */ createElementJsx(Navigation, { menu: menu2 });
  useTheme();
  return /* @__PURE__ */ createElementJsx("div", { class: `document-layout layout ${className}` }, /* @__PURE__ */ createElementJsx("div", { class: "layout-header" }, /* @__PURE__ */ createElementJsx(Flex, { class: "layout-logo" }, logo), /* @__PURE__ */ createElementJsx(Flex, { class: "layout-tools" }, toolbar)), /* @__PURE__ */ createElementJsx(View, { class: "layout-menu" }, sidebar), /* @__PURE__ */ createElementJsx(View, { class: "layout-content" }, content.map((it) => {
    return isFunction(it) ? it(menu2) : it;
  })));
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DocumentLayout
}, Symbol.toStringTag, { value: "Module" }));
function DocumentReadLayout({ content, ...extraProps }) {
  return /* @__PURE__ */ createElementJsx(DocumentLayout, { ...extraProps, title: "Document", menu: menu$1 }, content);
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DocumentReadLayout
}, Symbol.toStringTag, { value: "Module" }));
const EmbededLayout$1 = "";
function EmbededLayout(props) {
  const { content } = props;
  useTheme();
  return /* @__PURE__ */ createElementJsx("div", { class: "embeded-layout" }, /* @__PURE__ */ createElementJsx(View, { class: "layout-content" }, content.map((it) => {
    return isFunction(it) ? it([]) : it;
  })));
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EmbededLayout
}, Symbol.toStringTag, { value: "Module" }));
function EmbededReadLayout({ content, ...extraProps }) {
  return /* @__PURE__ */ createElementJsx(EmbededLayout, { ...extraProps, title: "Document", menu: menu$1 }, content);
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EmbededReadLayout
}, Symbol.toStringTag, { value: "Module" }));
const HomeLayout$1 = "";
const Footer$1 = "";
function Footer() {
  return /* @__PURE__ */ createElementJsx("footer", { class: "layout-footer" }, /* @__PURE__ */ createElementJsx("div", { class: "container-lg" }, /* @__PURE__ */ createElementJsx(Grid, { columns: [1, 1, 1] }, /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx("a", { href: "https://elf-framework.com", class: "logo" }, "ELF"), /* @__PURE__ */ createElementJsx("div", { class: "text" }, /* @__PURE__ */ createElementJsx("span", { class: "main-text" }, "E"), "asy", /* @__PURE__ */ createElementJsx("span", { class: "main-text" }, "L"), "ogic ", /* @__PURE__ */ createElementJsx("span", { class: "main-text" }, "F"), "ramework")), /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(VBox, null, /* @__PURE__ */ createElementJsx("div", { class: "title" }, "Docs"))), /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(VBox, null, /* @__PURE__ */ createElementJsx("div", { class: "title" }, "Contact"), /* @__PURE__ */ createElementJsx("a", { href: "https://github.com/elf-framework/starter-kit/issues" }, "Github"))))));
}
function HomeLayout({ content, menu: menu2 = [] }) {
  useTheme();
  return /* @__PURE__ */ createElementJsx("div", { class: "home-layout" }, /* @__PURE__ */ createElementJsx("div", { class: "home-layout-header" }, /* @__PURE__ */ createElementJsx("div", { class: "background" }), /* @__PURE__ */ createElementJsx("div", { class: "layout-header" }, /* @__PURE__ */ createElementJsx("div", { class: "container-lg" }, /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(Logo, null)), /* @__PURE__ */ createElementJsx("nav", { class: "tools" }, /* @__PURE__ */ createElementJsx("ul", null, mainMenus.map((it) => {
    return /* @__PURE__ */ createElementJsx("li", null, /* @__PURE__ */ createElementJsx("a", { href: it.link }, it.title));
  }), /* @__PURE__ */ createElementJsx("li", null, /* @__PURE__ */ createElementJsx(ThemeButton, null))))))), /* @__PURE__ */ createElementJsx("div", { class: "layout-content" }, /* @__PURE__ */ createElementJsx("section", { class: "content", style: { paddingTop: 0 } }, /* @__PURE__ */ createElementJsx(
    "div",
    {
      style: {
        fontSize: "9rem",
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: "0.2rem",
        padding: "2rem 0",
        paddingTop: 0,
        borderBottom: "1px solid #c4c4c4"
      }
    },
    "READ & WORK"
  ), /* @__PURE__ */ createElementJsx("div", { class: "hero" }, /* @__PURE__ */ createElementJsx("h1", null, "Let's make the editor easy and fun.")), /* @__PURE__ */ createElementJsx("div", { class: "description" }, "Sapa, UI component, Base editor system for web."), /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(
    Button,
    {
      size: "extra-large",
      outline: true,
      variant: "primary",
      as: "link",
      href: url("pages/introduction/")
    },
    "Go to introduction"
  )), /* @__PURE__ */ createElementJsx(Blank, { style: { height: 30 } }), /* @__PURE__ */ createElementJsx(Divider, null)), /* @__PURE__ */ createElementJsx("section", null, content.map((it) => {
    return isFunction(it) ? it(menu2) : it;
  }))), /* @__PURE__ */ createElementJsx("div", { class: "layout-footer" }, /* @__PURE__ */ createElementJsx(Footer, null)));
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HomeLayout
}, Symbol.toStringTag, { value: "Module" }));
const menu = [
  "Introduction",
  {
    link: "/pages/introduction/core/",
    title: "Core Concept"
  },
  {
    link: "/pages/introduction/getting-started/",
    title: "Getting Started"
  },
  {
    link: "/pages/introduction/install/",
    title: "Install",
    items: [
      {
        link: "/pages/introduction/install/vite/",
        title: "Vite"
      },
      {
        link: "/pages/introduction/install/webpack/",
        title: "! webpack",
        disabled: true
      },
      {
        link: "/pages/introduction/install/create-sapa-app/",
        title: "! create-sapa-app",
        disabled: true
      }
    ]
  },
  {
    link: "/pages/introduction/develop/",
    title: "Development"
  },
  {
    link: "/pages/introduction/contribute/",
    title: "Contribute"
  }
];
function MainLayout({ content, ...extraProps }) {
  return /* @__PURE__ */ createElementJsx(DocumentLayout, { ...extraProps, menu }, content.map((it) => {
    return isFunction(it) ? it(menu) : it;
  }));
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MainLayout
}, Symbol.toStringTag, { value: "Module" }));
const PageLayout$1 = "";
function LogoView() {
  return /* @__PURE__ */ createElementJsx("div", null, /* @__PURE__ */ createElementJsx(Logo, null));
}
function PageLayout(props) {
  let {
    content,
    menu: menu2 = [],
    logo = void 0,
    toolbar = void 0,
    navigator = void 0,
    title: title2 = "",
    class: className = ""
  } = props;
  logo = logo || /* @__PURE__ */ createElementJsx(LogoView, { title: title2 });
  toolbar = toolbar || /* @__PURE__ */ createElementJsx(PageTools, { menu: menu2 });
  navigator = navigator || "Navigation";
  useTheme();
  return /* @__PURE__ */ createElementJsx("div", { class: `page-layout ${className}` }, /* @__PURE__ */ createElementJsx("div", { class: "layout-header" }, /* @__PURE__ */ createElementJsx("div", { class: "container-lg" }, /* @__PURE__ */ createElementJsx(Flex, { class: `layout-tools` }, logo, toolbar))), /* @__PURE__ */ createElementJsx("div", { class: "application-main" }, /* @__PURE__ */ createElementJsx("main", null, /* @__PURE__ */ createElementJsx("div", { class: "navigation" }, /* @__PURE__ */ createElementJsx("div", { class: "container-lg" }, /* @__PURE__ */ createElementJsx("div", null, navigator))), /* @__PURE__ */ createElementJsx("div", { class: "application-content" }, /* @__PURE__ */ createElementJsx("div", { class: "container-lg" }, content.map((it) => {
    return isFunction(it) ? it(menu2) : it;
  }))))), /* @__PURE__ */ createElementJsx(Footer, null));
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PageLayout
}, Symbol.toStringTag, { value: "Module" }));
function PageReadLayout({ content, ...extraProps }) {
  return /* @__PURE__ */ createElementJsx(PageLayout, { ...extraProps, title: "Document", menu: menu$1 }, content);
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PageReadLayout
}, Symbol.toStringTag, { value: "Module" }));
function SimpleReadLayout({ content, ...extraProps }) {
  return /* @__PURE__ */ createElementJsx(BlankLayout, { ...extraProps, title: "Document", menu: menu$1 }, content);
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SimpleReadLayout
}, Symbol.toStringTag, { value: "Module" }));
const layouts = {
  "pages/article": "ArticleReadLayout",
  "pages/blog": "BlogReadLayout",
  "pages/main": "MainLayout",
  "pages/document": "DocumentReadLayout",
  "pages/page": "PageReadLayout",
  "pages/simple": "SimpleReadLayout",
  "pages/embeded": "EmbededReadLayout",
  "pages/application": "ApplicationReadLayout"
};
const items = {};
const list = /* @__PURE__ */ Object.assign({
  "./items/ApplicationLayout.jsx": __vite_glob_0_0$1,
  "./items/ApplicationReadLayout.jsx": __vite_glob_0_1$1,
  "./items/ArticleReadLayout.jsx": __vite_glob_0_2$1,
  "./items/BlankLayout.jsx": __vite_glob_0_3,
  "./items/BlogLayout.jsx": __vite_glob_0_4,
  "./items/BlogReadLayout.jsx": __vite_glob_0_5,
  "./items/DocumentLayout.jsx": __vite_glob_0_6,
  "./items/DocumentReadLayout.jsx": __vite_glob_0_7,
  "./items/EmbededLayout.jsx": __vite_glob_0_8,
  "./items/EmbededReadLayout.jsx": __vite_glob_0_9,
  "./items/HomeLayout.jsx": __vite_glob_0_10,
  "./items/Logo.jsx": __vite_glob_0_11,
  "./items/MainLayout.jsx": __vite_glob_0_12,
  "./items/PageLayout.jsx": __vite_glob_0_13,
  "./items/PageReadLayout.jsx": __vite_glob_0_14,
  "./items/SimpleLayout.jsx": __vite_glob_0_15,
  "./items/SimpleReadLayout.jsx": __vite_glob_0_16
});
Object.values(list).forEach((module) => {
  Object.assign(items, module);
});
const LayoutManager = {
  items,
  get(layout2) {
    let currentLayout = this.items[layout2];
    if (!currentLayout) {
      const currentPath = window.location.pathname.substring(1);
      Object.keys(layouts).forEach((key) => {
        if (currentPath.startsWith(key)) {
          currentLayout = this.items[layouts[key]];
        }
      });
    }
    return currentLayout;
  }
};
const Site$1 = "";
function Site({ layout: layout2, page: CurrentPage, filename, ...props }) {
  const CurrentLayout = LayoutManager.get(layout2 || "BasicLayout");
  if (!CurrentLayout) {
    return /* @__PURE__ */ createElementJsx("div", null, "Layout not found");
  }
  return /* @__PURE__ */ createElementJsx(CurrentLayout, { ...props }, (menu2) => {
    let content = /* @__PURE__ */ createElementJsx(CurrentPage, { menu: menu2, ...props });
    if (CurrentPage.name === "MDXContent") {
      content = /* @__PURE__ */ createElementJsx(
        MarkdownPage,
        {
          page: CurrentPage,
          filename,
          menu: menu2,
          ...props
        }
      );
    }
    return /* @__PURE__ */ createElementJsx("div", null, content);
  });
}
export {
  Site as S,
  currentBlogList as a,
  createElementJsx as c,
  index as i,
  start as s
};
