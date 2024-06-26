// @ts-ignore
/// <reference types="@quasar/app" />
/// <reference types="@quasar/app-webpack" />
/// <reference types="@quasar/app-vite" />
import { App, Component, ComponentPublicInstance, Directive, VNode } from "vue";
import { ComponentConstructor, GlobalComponentConstructor } from "./ts-helpers";

export interface AddressbarColor {
  /**
   * Sets addressbar color (for browsers that support it)
   * @param hexColor Color in hex format
   */
  set: (hexColor: string) => void;
}

export interface AppFullscreen {
  /**
   * Does browser support it?
   */
  isCapable: boolean;
  /**
   * Is Fullscreen active?
   */
  isActive: boolean;
  /**
   * The DOM element used as root for fullscreen, otherwise 'null'
   */
  activeEl: Element | null;
  /**
   * Request going into Fullscreen (with optional target)
   * @param target Optional Element of target to request Fullscreen on
   * @returns A Promise which is resolved when transitioned to fullscreen mode. It gets rejected with 'Not capable' if the browser is not capable, and with an Error object if something else went wrong.
   */
  request: (target?: Element) => Promise<void>;
  /**
   * Request exiting out of Fullscreen mode
   * @returns A Promise which is resolved when exited out of fullscreen mode. It gets rejected with 'Not capable' if the browser is not capable, and with an Error object if something else went wrong.
   */
  exit: () => Promise<void>;
  /**
   * Request toggling Fullscreen mode (with optional target if requesting going into Fullscreen only)
   * @param target Optional Element of target to request Fullscreen on
   * @returns A Promise which is resolved when transitioned to / exited out of fullscreen mode. It gets rejected with 'Not capable' if the browser is not capable, and with an Error object if something else went wrong.
   */
  toggle: (target?: Element) => Promise<void>;
}

export interface AppVisibility {
  /**
   * Does the app have user focus? Or the app runs in the background / another tab has the user's attention
   */
  appVisible: boolean;
}

export interface BottomSheet {
  /**
   * Creates an ad-hoc Bottom Sheet; Same as calling $q.bottomSheet(...)
   * @param opts Bottom Sheet options
   * @returns Chainable Object
   */
  create: (opts: {
    /**
     * CSS Class name to apply to the Dialog's QCard
     */
    class?: VueClassProp;
    /**
     * CSS style to apply to the Dialog's QCard
     */
    style?: VueStyleProp;
    /**
     * Title
     */
    title?: string;
    /**
     * Message
     */
    message?: string;
    /**
     * Array of Objects, each Object defining an action
     */
    actions?: {
      /**
       * CSS classes for this action
       */
      classes?: VueClassProp;
      /**
       * Style definitions to be attributed to this action element
       */
      style?: VueStyleProp;
      /**
       * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
       */
      icon?: string;
      /**
       * Path to an image for this action
       */
      img?: string;
      /**
       * Path to an avatar image for this action
       */
      avatar?: string;
      /**
       * Action label
       */
      label?: string | number;
      /**
       * Any other custom props
       */
      [key: string]: any | undefined;
    }[];
    /**
     * Display actions as a grid instead of as a list
     */
    grid?: boolean;
    /**
     * Apply dark mode
     */
    dark?: boolean;
    /**
     * Put Bottom Sheet into seamless mode; Does not use a backdrop so user is able to interact with the rest of the page too
     */
    seamless?: boolean;
    /**
     * User cannot dismiss Bottom Sheet if clicking outside of it or hitting ESC key
     */
    persistent?: boolean;
  }) => DialogChainObject;
}

export interface Cookies {
  /**
   * Get cookie
   * @param name Cookie name
   * @returns Cookie value; Returns null if cookie not found
   */
  get: CookiesGetMethodType;
  /**
   * Get all cookies
   * @returns Object with cookie names (as keys) and their values
   */
  getAll: () => any;
  /**
   * Set cookie
   * @param name Cookie name
   * @param value Cookie value
   * @param options Cookie options
   */
  set: (
    name: string,
    value: string,
    options?: {
      /**
       * Cookie expires detail; If specified as Number, then the unit is days; If specified as String, it can either be raw stringified date or in Xd Xh Xm Xs format (see examples)
       */
      expires?: number | string | Date;
      /**
       * Cookie path
       */
      path?: string;
      /**
       * Cookie domain
       */
      domain?: string;
      /**
       * SameSite cookie option
       */
      sameSite?: "Lax" | "Strict" | "None";
      /**
       * Is cookie Http Only?
       */
      httpOnly?: boolean;
      /**
       * Is cookie secure? (https only)
       */
      secure?: boolean;
      /**
       * Raw string for other cookie options; To be used as a last resort for possible newer props that are currently not yet implemented in Quasar
       */
      other?: string;
    }
  ) => void;
  /**
   * Check if cookie exists
   * @param name Cookie name
   * @returns Does cookie exists or not?
   */
  has: (name: string) => boolean;
  /**
   * Remove a cookie
   * @param name Cookie name
   * @param options Cookie options
   */
  remove: (
    name: string,
    options?: {
      /**
       * Cookie path
       */
      path?: string;
      /**
       * Cookie domain
       */
      domain?: string;
    }
  ) => void;
  /**
   * For SSR usage only, and only on the global import (not on $q.cookies)
   * @param ssrContext SSR Context Object
   * @returns Cookie object (like $q.cookies) for SSR usage purposes
   */
  parseSSR: (ssrContext: any) => Cookies;
}

export interface Dark {
  /**
   * Is Dark mode active?
   */
  isActive: boolean;
  /**
   * Dark mode configuration (not status)
   */
  mode: boolean | "auto";
  /**
   * Set dark mode status
   * @param status Dark mode status
   */
  set: (status: boolean | "auto") => void;
  /**
   * Toggle dark mode status
   */
  toggle: () => void;
}

export interface Dialog {
  /**
   * Creates an ad-hoc Dialog; Same as calling $q.dialog(...)
   * @param opts Dialog options
   * @returns Chainable Object
   */
  create: (opts: QDialogOptions) => DialogChainObject;
}

export interface Loading {
  /**
   * Is Loading active?
   */
  isActive: boolean;
  /**
   * Activate and show
   * @param opts All props are optional
   * @returns Calling this function with no parameters hides the group; When called with one Object parameter then it updates the Loading group (specified properties are shallow merged with the group ones; note that group cannot be changed while updating and it is ignored)
   */
  show: (opts?: QLoadingShowOptions) => (props?: QLoadingUpdateOptions) => void;
  /**
   * Hide it
   * @param group Optional Loading group name to hide instead of hiding all groups
   */
  hide: (group?: string) => void;
  /**
   * Merge options into the default ones
   * @param opts Pick the subprop you want to define
   */
  setDefaults: (opts: {
    /**
     * Wait a number of millisecond before showing; Not worth showing for 100ms for example then hiding it, so wait until you're sure it's a process that will take some considerable amount of time
     */
    delay?: number;
    /**
     * Message to display
     */
    message?: string;
    /**
     * Default Loading group name
     * Default value: __default_quasar_group__
     */
    group?: string;
    /**
     * Spinner size (in pixels)
     */
    spinnerSize?: number;
    /**
     * Color name for spinner from the Quasar Color Palette
     */
    spinnerColor?: NamedColor;
    /**
     * Color name for text from the Quasar Color Palette
     */
    messageColor?: NamedColor;
    /**
     * Color name for background from the Quasar Color Palette
     */
    backgroundColor?: NamedColor;
    /**
     * One of the QSpinners
     */
    spinner?: Component;
    /**
     * Add a CSS class to easily customize the component
     */
    customClass?: string;
  }) => void;
}

export interface LoadingBar {
  /**
   * Is LoadingBar active?
   */
  isActive: boolean;
  /**
   * Notify bar you've started a background activity
   * @param speed Delay (in milliseconds) between bar progress increments
   */
  start: (speed?: number) => void;
  /**
   * Notify bar one background activity has finalized
   */
  stop: () => void;
  /**
   * Manually trigger a bar progress increment
   * @param amount Amount (0.0 < x < 1.0) to increment with
   */
  increment: (amount?: number) => void;
  /**
   * Set the inner QAjaxBar's props
   * @param props QAjaxBar component props
   */
  setDefaults: (props: QLoadingBarOptions) => void;
}

export interface LocalStorage {
  /**
   * Check if storage item exists
   * @param key Entry key
   * @returns Does the item exists or not?
   */
  has: (key: string) => boolean;
  /**
   * Get storage number of entries
   * @returns Number of entries
   */
  getLength: () => number;
  /**
   * Get a storage item value
   * @param key Entry key
   * @returns Storage item value
   */
  getItem: WebStorageGetItemMethodType;
  /**
   * Get the storage item value at specific index
   * @param index Entry index
   * @returns Storage item index
   */
  getIndex: WebStorageGetIndexMethodType;
  /**
   * Get the storage key at specific index
   * @param index Entry index
   * @returns Storage key
   */
  getKey: WebStorageGetKeyMethodType;
  /**
   * Retrieve all items in storage
   * @returns Object syntax: item name as Object key and its value
   */
  getAll: () => any;
  /**
   * Retrieve all keys in storage
   * @returns Storage keys (Array of Strings)
   */
  getAllKeys: WebStorageGetAllKeysMethodType;
  /**
   * Set item in storage
   * @param key Entry key
   * @param value Entry value
   */
  set: (
    key: string,
    value:
      | Date
      | RegExp
      | number
      | boolean
      | ((...params: readonly any[]) => any)
      | any
      | readonly any[]
      | string
      | null
  ) => void;
  /**
   * Remove a storage item
   * @param key Storage key
   */
  remove: (key: string) => void;
  /**
   * Remove everything from the storage
   */
  clear: () => void;
  /**
   * Determine if storage has any items
   * @returns Tells if storage is empty or not
   */
  isEmpty: () => boolean;
}

export interface Meta {}

export interface Notify {
  /**
   * Creates a notification; Same as calling $q.notify(...)
   * @param opts Notification options
   * @returns Calling this function with no parameters hides the notification; When called with one Object parameter (the original notification must NOT be grouped), it updates the notification (specified properties are shallow merged with previous ones; note that group and position cannot be changed while updating and so they are ignored)
   */
  create: (
    opts: QNotifyCreateOptions | string
  ) => (props?: QNotifyUpdateOptions) => void;
  /**
   * Merge options into the default ones
   * @param opts Notification options except 'ignoreDefaults' (See 'opts' param of 'create()' for object properties)
   */
  setDefaults: (opts: QNotifyOptions) => void;
  /**
   * Register a new type of notification (or override an existing one)
   * @param typeName Name of the type (to be used as 'type' prop later on)
   * @param typeOpts Notification options except 'ignoreDefaults' (See 'opts' param of 'create()' for object properties)
   */
  registerType: (typeName: string, typeOpts: QNotifyOptions) => void;
}

export interface Platform {
  /**
   * Client browser User Agent
   */
  userAgent: string;
  /**
   * Client browser details (property names depend on browser)
   */
  is: {
    /**
     * Browser name
     */
    name: string;
    /**
     * Platform name
     */
    platform: string;
    /**
     * Detailed browser version
     */
    version?: string;
    /**
     * Major browser version as a number
     */
    versionNumber?: number;
    /**
     * Whether the platform is desktop
     */
    desktop?: boolean;
    /**
     * Whether the platform is mobile
     */
    mobile?: boolean;
    /**
     * Whether the platform is Electron
     */
    electron?: boolean;
    /**
     * Whether the platform is BEX(Browser Extension)
     */
    bex?: boolean;
    /**
     * Whether the platform is Capacitor
     */
    capacitor?: boolean;
    /**
     * Whether the platform is Cordova
     */
    cordova?: boolean;
    /**
     * Whether the platform is a native mobile wrapper
     */
    nativeMobile?: boolean;
    /**
     * Type of the native mobile wrapper
     */
    nativeMobileWrapper?: "cordova" | "capacitor";
    /**
     * Whether the browser is Google Chrome
     */
    chrome?: boolean;
    /**
     * Whether the browser is Firefox
     */
    firefox?: boolean;
    /**
     * Whether the browser is Safari
     */
    safari?: boolean;
    /**
     * Whether the browser is Microsoft Edge (Chromium)
     */
    edgeChromium?: boolean;
    /**
     * Whether the browser is Microsoft Edge Legacy
     */
    edge?: boolean;
    /**
     * Whether the browser is Opera
     */
    opera?: boolean;
    /**
     * Whether the browser is Vivaldi
     */
    vivaldi?: boolean;
    /**
     * Whether the operating system is Windows
     */
    win?: boolean;
    /**
     * Whether the operating system is Linux
     */
    linux?: boolean;
    /**
     * Whether the operating system is Mac OS
     */
    mac?: boolean;
    /**
     * Whether the operating system is Chrome OS
     */
    cros?: boolean;
    /**
     * Whether the operating system is Android
     */
    android?: boolean;
    /**
     * Whether the operating system is iOS
     */
    ios?: boolean;
    /**
     * Whether the operating system is Windows Phone
     */
    winphone?: boolean;
    /**
     * Whether the device is an iPhone
     */
    iphone?: boolean;
    /**
     * Whether the device is an iPad
     */
    ipad?: boolean;
    /**
     * Whether the device is an iPod
     */
    ipod?: boolean;
    /**
     * Whether the device is a Kindle
     */
    kindle?: boolean;
    /**
     * Whether the browser is Amazon Silk
     */
    silk?: boolean;
  };
  /**
   * Client browser detectable properties
   */
  has: {
    /**
     * Client browser runs on device with touch support
     */
    touch: boolean;
    /**
     * Client browser has Web Storage support
     */
    webStorage: boolean;
  };
  /**
   * Client browser environment
   */
  within: {
    /**
     * Does the app run under an iframe?
     */
    iframe: boolean;
  };
  /**
   * For SSR usage only, and only on the global import (not on $q.platform)
   * @param ssrContext SSR Context Object
   * @returns Platform object (like $q.platform) for SSR usage purposes
   */
  parseSSR: (ssrContext: any) => Platform;
}

export interface Screen {
  /**
   * Screen width (in pixels)
   */
  width: number;
  /**
   * Screen height (in pixels)
   */
  height: number;
  /**
   * Tells current window breakpoint
   */
  name: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Breakpoints (in pixels)
   */
  sizes: {
    /**
     * Breakpoint width size (minimum size)
     */
    sm: number;
    /**
     * Breakpoint width size (minimum size)
     */
    md: number;
    /**
     * Breakpoint width size (minimum size)
     */
    lg: number;
    /**
     * Breakpoint width size (minimum size)
     */
    xl: number;
  };
  /**
   * Tells if current screen width is lower than breakpoint-name
   */
  lt: {
    /**
     * Is current screen width lower than this breakpoint's lowest limit?
     */
    sm: boolean;
    /**
     * Is current screen width lower than this breakpoint's lowest limit?
     */
    md: boolean;
    /**
     * Is current screen width lower than this breakpoint's lowest limit?
     */
    lg: boolean;
    /**
     * Is current screen width lower than this breakpoint's lowest limit?
     */
    xl: boolean;
  };
  /**
   * Tells if current screen width is greater than breakpoint-name
   */
  gt: {
    /**
     * Is current screen width greater than this breakpoint's max limit?
     */
    xs: boolean;
    /**
     * Is current screen width greater than this breakpoint's max limit?
     */
    sm: boolean;
    /**
     * Is current screen width greater than this breakpoint's max limit?
     */
    md: boolean;
    /**
     * Is current screen width greater than this breakpoint's max limit?
     */
    lg: boolean;
  };
  /**
   * Current screen width fits exactly 'xs' breakpoint
   */
  xs: boolean;
  /**
   * Current screen width fits exactly 'sm' breakpoint
   */
  sm: boolean;
  /**
   * Current screen width fits exactly 'md' breakpoint
   */
  md: boolean;
  /**
   * Current screen width fits exactly 'lg' breakpoint
   */
  lg: boolean;
  /**
   * Current screen width fits exactly 'xl' breakpoint
   */
  xl: boolean;
  /**
   * Override default breakpoint sizes
   * @param breakpoints Pick what you want to override
   */
  setSizes: (breakpoints: {
    /**
     * Breakpoint width size (minimum size)
     */
    sm?: number;
    /**
     * Breakpoint width size (minimum size)
     */
    md?: number;
    /**
     * Breakpoint width size (minimum size)
     */
    lg?: number;
    /**
     * Breakpoint width size (minimum size)
     */
    xl?: number;
  }) => void;
  /**
   * Debounce update of all props when screen width/height changes
   * @param amount Amount in milliseconds
   */
  setDebounce: (amount: number) => void;
}

export interface SessionStorage {
  /**
   * Check if storage item exists
   * @param key Entry key
   * @returns Does the item exists or not?
   */
  has: (key: string) => boolean;
  /**
   * Get storage number of entries
   * @returns Number of entries
   */
  getLength: () => number;
  /**
   * Get a storage item value
   * @param key Entry key
   * @returns Storage item value
   */
  getItem: WebStorageGetItemMethodType;
  /**
   * Get the storage item value at specific index
   * @param index Entry index
   * @returns Storage item index
   */
  getIndex: WebStorageGetIndexMethodType;
  /**
   * Get the storage key at specific index
   * @param index Entry index
   * @returns Storage key
   */
  getKey: WebStorageGetKeyMethodType;
  /**
   * Retrieve all items in storage
   * @returns Object syntax: item name as Object key and its value
   */
  getAll: () => any;
  /**
   * Retrieve all keys in storage
   * @returns Storage keys (Array of Strings)
   */
  getAllKeys: WebStorageGetAllKeysMethodType;
  /**
   * Set item in storage
   * @param key Entry key
   * @param value Entry value
   */
  set: (
    key: string,
    value:
      | Date
      | RegExp
      | number
      | boolean
      | ((...params: readonly any[]) => any)
      | any
      | readonly any[]
      | string
      | null
  ) => void;
  /**
   * Remove a storage item
   * @param key Storage key
   */
  remove: (key: string) => void;
  /**
   * Remove everything from the storage
   */
  clear: () => void;
  /**
   * Determine if storage has any items
   * @returns Tells if storage is empty or not
   */
  isEmpty: () => boolean;
}

/**
 * If value is 0 or 'false' then directive is disabled; if value is < 0 then it closes all popups in the chain; if value is 1 or 'true' or undefined then it closes only the parent popup; if value is > 1 it closes the specified number of parent popups in the chain (note that chained QMenus are considered 1 popup only & QPopupProxy separates chained menus)
 *
 * @see https://v2.quasar.dev/vue-directives/close-popup
 */
export type ClosePopupValue = boolean | number | string;
/**
 * If value is 0 or 'false' then directive is disabled; if value is < 0 then it closes all popups in the chain; if value is 1 or 'true' or undefined then it closes only the parent popup; if value is > 1 it closes the specified number of parent popups in the chain (note that chained QMenus are considered 1 popup only & QPopupProxy separates chained menus)
 *
 * @see https://v2.quasar.dev/vue-directives/close-popup
 */
export type ClosePopup = Directive<any, ClosePopupValue>;
/**
 * Function to call when scrolling occurs (identical to description of 'handler' prop of the Object form); If using the Object form, it is HIGHLY recommended to reference it from your vue component scope, otherwise the directive update cycle will continuously recreate the observer which hits performance hard
 *
 * @see https://v2.quasar.dev/vue-directives/intersection
 */
export type IntersectionValue =
  | {
      /**
       * The handler function to be called
       * @param entry The IntersectionObserverEntry object
       * @returns If you return Boolean false from the handler, the observer stops
       */
      handler?: (entry?: {
        /**
         * Object containing the client rect information
         */
        boundingClientRect?: {
          /**
           * The bottom of the client rect
           */
          bottom?: number;
          /**
           * The height of the client rect
           */
          height?: number;
          /**
           * The left of the client rect
           */
          left?: number;
          /**
           * The right of the client rect
           */
          right?: number;
          /**
           * The top of the client rect
           */
          top?: number;
          /**
           * The width of the client rect
           */
          width?: number;
          /**
           * The x position of the client rect
           */
          x?: number;
          /**
           * The y position of the client rect
           */
          y?: number;
        };
        /**
         * The ratio of the observed objects visibility
         */
        intersectionRatio?: number;
        /**
         * Object containing the client rect information
         */
        intersectionRect?: {
          /**
           * The bottom of the client rect
           */
          bottom?: number;
          /**
           * The height of the client rect
           */
          height?: number;
          /**
           * The left of the client rect
           */
          left?: number;
          /**
           * The right of the client rect
           */
          right?: number;
          /**
           * The top of the client rect
           */
          top?: number;
          /**
           * The width of the client rect
           */
          width?: number;
          /**
           * The x position of the client rect
           */
          x?: number;
          /**
           * The y position of the client rect
           */
          y?: number;
        };
        /**
         * It is Boolean true if intersecting the scrollable area
         */
        isIntersecting?: boolean;
        /**
         * Object containing the client rect information
         */
        rootBounds?: {
          /**
           * The bottom of the client rect
           */
          bottom?: number;
          /**
           * The height of the client rect
           */
          height?: number;
          /**
           * The left of the client rect
           */
          left?: number;
          /**
           * The right of the client rect
           */
          right?: number;
          /**
           * The top of the client rect
           */
          top?: number;
          /**
           * The width of the client rect
           */
          width?: number;
          /**
           * The x position of the client rect
           */
          x?: number;
          /**
           * The y position of the client rect
           */
          y?: number;
        };
        /**
         * The target element
         */
        target?: Element;
        /**
         * The timestamp of the event
         */
        time?: number;
      }) => boolean;
      /**
       * Intersection observer options (can be omitted and all its props are optional)
       */
      cfg?: {
        /**
         * Lets you define an alternative to the viewport as your root (through its DOM element); It is important to keep in mind that root needs to be an ancestor of the observed element
         */
        root?: Element;
        /**
         * Allows you to specify the margins for the root, effectively allowing you to either grow or shrink the area used for intersections
         */
        rootMargin?: string;
        /**
         * Threshold(s) at which to trigger callback, specified as a ratio, or list of ratios, of (visible area / total area) of the observed element
         */
        threshold?: readonly any[];
      };
    }
  | (() => void);
/**
 * Function to call when scrolling occurs (identical to description of 'handler' prop of the Object form); If using the Object form, it is HIGHLY recommended to reference it from your vue component scope, otherwise the directive update cycle will continuously recreate the observer which hits performance hard
 *
 * Modifiers:
 *  - once:
 *    - type: boolean
 *    - description: Call handler only once, when the conditions are first met
 *    - examples:
 *      - v-intersection.once
 *
 * @see https://v2.quasar.dev/vue-directives/intersection
 */
export type Intersection = Directive<any, IntersectionValue>;
/**
 * Configuration object or trigger value
 *
 * @see https://v2.quasar.dev/vue-directives/morph
 */
export type MorphValue =
  | {
      /**
       * Name of the morph group the element belongs to
       */
      group?: string;
      /**
       * Name of the morph inside the group that the element belongs to
       */
      name?: string;
      /**
       * Current value of the group model; when it becomes the same as the 'name' it triggers the morphing
       */
      model?: string;
      /**
       * Duration of the animation (in milliseconds)
       * Default value: 300
       */
      duration?: number;
      /**
       * Delay for the animation (in milliseconds)
       * Default value: 0
       */
      delay?: number;
      /**
       * Timing function for the animation (CSS easing format)
       * Default value: ease-in-out
       */
      easing?: string;
      /**
       * Fill mode for the animation
       * Default value: none
       */
      fill?: string;
      /**
       * Class names to be added to the destination element during the animation
       */
      classes?: string;
      /**
       * Styles to be added to the destination element during the animation
       */
      style?: string | any;
      /**
       * Use resize instead of scaling during animation
       */
      resize?: boolean;
      /**
       * Use CSS animations instead of the Animation API
       */
      useCSS?: boolean;
      /**
       * Hide the spacer for the initial element during animation; Use it if the initial element is not removed or resizing of the space occupied by the initial element is not desired
       */
      hideFromClone?: boolean;
      /**
       * Keep a clone of the final element visible during animation
       */
      keepToClone?: boolean;
      /**
       * Use an opacity tween between the initial and final elements
       */
      tween?: boolean;
      /**
       * If using tween it is the initial opacity of the initial element (will be animated to 0) - the initial element is placed on top of the final element
       * Default value: 0.6
       */
      tweenFromOpacity?: number;
      /**
       * If using tween it is the initial opacity of the final element (will be animated to 1)
       * Default value: 0.5
       */
      tweenToOpacity?: number;
      /**
       * Delay animation start for that number of milliseconds, or until a 'transitionend' event is emitted by the destination element, or until the promise is resolved (if the promise is rejected the morphing will abort, but the `toggle function` was already called)
       * Default value: 0
       */
      waitFor?: number | string | Promise<void>;
      /**
       * A function that will be called once the morphing is finished; Not called if morphing is aborted
       * @param direction 'to' if the morphing was finished in the final state or 'from' if it was finished in the initial state
       * @param aborted Was the morphing aborted?
       */
      onEnd?: (direction?: "to" | "from", aborted?: boolean) => void;
    }
  | any;
/**
 * Configuration object or trigger value
 *
 * Directive argument:
 *  - type: string
 *  - description: x:x2:y:z, where x is the morph element name, x2 is the morph group, y is the animation duration (in milliseconds) and z is the amount of time to wait (in milliseconds) or the 'transitionend' string
 *  - examples:
 *    - v-morph:name="options"
 *    - v-morph:name:groupName="options"
 *    - v-morph:name:groupName:400="options"
 *    - v-morph:name:groupName:400:100="options"
 *    - v-morph:name:groupName:400:transitionend="options"
 *
 * Modifiers:
 *  - resize:
 *    - type: boolean
 *    - description: Use resize instead of scale transform for morph (forceResize option of the morph function)
 *  - useCSS:
 *    - type: boolean
 *    - description: Use CSS animations for morph (forceCssAnimation option of the morph function)
 *  - hideFromClone:
 *    - type: boolean
 *    - description: Hide the spacer for the initial element (hideFromClone option of the morph function)
 *  - keepToClone:
 *    - type: boolean
 *    - description: Keep the final element visible while morphing (keepToClone option of the morph function)
 *  - tween:
 *    - type: boolean
 *    - description: Use opacity tween morphing between initial and final elements (tween option of the morph function)
 *
 * @see https://v2.quasar.dev/vue-directives/morph
 */
export type Morph = Directive<any, MorphValue>;
/**
 * Function to call when mutation occurs; It is HIGHLY recommended to reference it from your vue component scope, otherwise the directive update cycle will continuously recreate the observer which hits performance hard
 *
 * @see https://v2.quasar.dev/vue-directives/mutation
 */
export type MutationValue = (
  mutationList: {
    /**
     * Type of mutation
     */
    type?: "childList" | "attributes" | "characterData";
    /**
     * The DOM element that the mutation affected, depending on the mutation type
     */
    target?: Element;
    /**
     * The NodeList of the nodes that have been added
     */
    addedNodes?: readonly any[];
    /**
     * The NodeList of the nodes that have been removed
     */
    removedNodes?: readonly any[];
    /**
     * The previous sibling of the added or removed nodes, or null
     */
    previousSibling?: any;
    /**
     * The next sibling of the added or removed nodes, or null
     */
    nextSibling?: any;
    /**
     * The local name of the changed attribute, or null
     */
    attributeName?: string;
    /**
     * The namespace of the changed attribute, or null
     */
    attributeNamespace?: string;
    /**
     * Value depends on the mutation type; For attributes, it is the value of the changed attribute before the change; For characterData it is data of the changed node before the change; For childList it is null; Note that for this to work as expected, attributeOldValue or characterDataOldValue must be set
     */
    oldValue?: string;
  }[]
) => boolean;
/**
 * Function to call when mutation occurs; It is HIGHLY recommended to reference it from your vue component scope, otherwise the directive update cycle will continuously recreate the observer which hits performance hard
 *
 * Modifiers:
 *  - once:
 *    - type: boolean
 *    - description: Call handler only once, when the first mutation was triggered, then stop monitoring
 *    - examples:
 *      - v-mutation.once
 *  - childList:
 *    - type: boolean
 *    - description: Monitor the target node (and, if 'subtree' is also set, its descendants) for the addition of new child nodes or removal of existing child nodes
 *    - examples:
 *      - v-mutation.childList
 *  - subtree:
 *    - type: boolean
 *    - description: Extend monitoring to the entire subtree of nodes rooted at target
 *    - examples:
 *      - v-mutation.subtree
 *  - attributes:
 *    - type: boolean
 *    - description: Watch for changes to the value of attributes on the node or nodes being monitored
 *    - examples:
 *      - v-mutation.attributes
 *  - characterData:
 *    - type: boolean
 *    - description: Monitor the specified target node or subtree for changes to the character data contained within the node or nodes
 *    - examples:
 *      - v-mutation.characterData
 *  - attributeOldValue:
 *    - type: boolean
 *    - description: Record the previous value of any attribute that changes when monitoring the node or nodes for attribute changes
 *    - examples:
 *      - v-mutation.attributeOldValue
 *  - characterDataOldValue:
 *    - type: boolean
 *    - description: Record the previous value of a node's text whenever the text changes on nodes being monitored
 *    - examples:
 *      - v-mutation.characterDataOldValue
 *
 * @see https://v2.quasar.dev/vue-directives/mutation
 */
export type Mutation = Directive<any, MutationValue>;
/**
 * Boolean (if just wanting to enable/disable) or Object for configuring more options
 *
 * @see https://v2.quasar.dev/vue-directives/material-ripple
 */
export type RippleValue =
  | boolean
  | {
      /**
       * Trigger early/immediately on user interaction
       */
      early?: boolean;
      /**
       * Stop click/touch event propagation
       */
      stop?: boolean;
      /**
       * Ripple starts from the absolute center
       */
      center?: boolean;
      /**
       * Color name from Quasar Color Palette; Overrides default dynamic color
       */
      color?: string;
      /**
       * List of keyCode that should trigger the ripple
       */
      keyCodes?: readonly any[] | number;
    };
/**
 * Boolean (if just wanting to enable/disable) or Object for configuring more options
 *
 * Directive argument:
 *  - type: string
 *  - description: Color name from Quasar Color Palette; Overrides default dynamic color
 *  - examples:
 *    - v-ripple:orange-5
 *
 * Modifiers:
 *  - early:
 *    - type: boolean
 *    - description: Trigger early/immediately on user interaction
 *  - stop:
 *    - type: boolean
 *    - description: Stop click/touch event propagation
 *    - examples:
 *      - v-ripple.stop
 *  - center:
 *    - type: boolean
 *    - description: Ripple starts from the absolute center
 *    - examples:
 *      - v-ripple.center
 *
 * @see https://v2.quasar.dev/vue-directives/material-ripple
 */
export type Ripple = Directive<any, RippleValue>;
/**
 * Function to call when scrolling occurs (use undefined to disable)
 *
 * @see https://v2.quasar.dev/vue-directives/scroll
 */
export type ScrollValue =
  | ((verticalScrollPosition: number, horizontalScrollPosition: number) => void)
  | undefined;
/**
 * Function to call when scrolling occurs (use undefined to disable)
 *
 * @see https://v2.quasar.dev/vue-directives/scroll
 */
export type Scroll = Directive<any, ScrollValue>;
/**
 * Function to call when scrolling and element comes into the viewport (use undefined to disable)
 *
 * @see https://v2.quasar.dev/vue-directives/scroll-fire
 */
export type ScrollFireValue = ((el: Element) => void) | undefined;
/**
 * Function to call when scrolling and element comes into the viewport (use undefined to disable)
 *
 * @see https://v2.quasar.dev/vue-directives/scroll-fire
 */
export type ScrollFire = Directive<any, ScrollFireValue>;
/**
 * Function to call after user has hold touch/click for the specified amount of time (use undefined to disable)
 *
 * @see https://v2.quasar.dev/vue-directives/touch-hold
 */
export type TouchHoldValue =
  | ((details: {
      /**
       * Original JS event Object
       */
      evt?: Event;
      /**
       * Triggered by a touch event
       */
      touch?: boolean;
      /**
       * Triggered by a mouse event
       */
      mouse?: boolean;
      /**
       * Event Position Object
       */
      position?: {
        /**
         * Vertical offset from top of window
         */
        top?: number;
        /**
         * Horizontal offset from left of window
         */
        left?: number;
      };
      /**
       * How long it took to trigger the event (in milliseconds)
       */
      duration?: number;
    }) => void)
  | undefined;
/**
 * Function to call after user has hold touch/click for the specified amount of time (use undefined to disable)
 *
 * Directive argument:
 *  - type: string
 *  - default: 600:5:7
 *  - description: x:y:z, where x is the amount of time to wait (in milliseconds), y is the touch event sensitivity (in pixels) and z is the mouse event sensitivity (in pixels)
 *  - examples:
 *    - v-touch-hold:400="fnToCall"
 *    - v-touch-hold:400:15="fnToCall"
 *    - v-touch-hold:400:10:10="fnToCall"
 *
 * Modifiers:
 *  - capture:
 *    - type: boolean
 *    - description: Use capture for touchstart event
 *  - mouse:
 *    - type: boolean
 *    - description: Listen for mouse events too
 *  - mouseCapture:
 *    - type: boolean
 *    - description: Use capture for mousedown event
 *
 * @see https://v2.quasar.dev/vue-directives/touch-hold
 */
export type TouchHold = Directive<any, TouchHoldValue>;
/**
 * Handler for panning (use undefined to disable)
 *
 * @see https://v2.quasar.dev/vue-directives/touch-pan
 */
export type TouchPanValue =
  | ((details: {
      /**
       * Original JS event Object
       */
      evt?: Event;
      /**
       * Triggered by a touch event
       */
      touch?: boolean;
      /**
       * Triggered by a mouse event
       */
      mouse?: boolean;
      /**
       * Event Position Object
       */
      position?: {
        /**
         * Vertical offset from top of window
         */
        top?: number;
        /**
         * Horizontal offset from left of window
         */
        left?: number;
      };
      /**
       * Direction of movement
       */
      direction?: "up" | "right" | "down" | "left";
      /**
       * Is first time the handler is called since movement started
       */
      isFirst?: boolean;
      /**
       * Is last time the handler is called since movement ended
       */
      isFinal?: boolean;
      /**
       * How long it took to trigger the event (in milliseconds)
       */
      duration?: number;
      /**
       * Absolute distance (in pixels) since movement started from initial point
       */
      distance?: {
        /**
         * Absolute distance horizontally
         */
        x?: number;
        /**
         * Absolute distance vertically
         */
        y?: number;
      };
      /**
       * Distance (in pixels) since movement started from initial point
       */
      offset?: {
        /**
         * Distance horizontally
         */
        x?: number;
        /**
         * Distance vertically
         */
        y?: number;
      };
      /**
       * Delta of distance (in pixels) since handler was called last time
       */
      delta?: {
        /**
         * Distance horizontally
         */
        x?: number;
        /**
         * Distance vertically
         */
        y?: number;
      };
    }) => void)
  | undefined;
/**
 * Handler for panning (use undefined to disable)
 *
 * Modifiers:
 *  - stop:
 *    - type: boolean
 *    - description: Stop event propagation for touch events
 *  - prevent:
 *    - type: boolean
 *    - description: Calls event.preventDefault() for touch events
 *  - capture:
 *    - type: boolean
 *    - description: Use capture for touchstart event
 *  - mouse:
 *    - type: boolean
 *    - description: Listen for mouse events too
 *  - mouseCapture:
 *    - type: boolean
 *    - description: Use capture for mousedown event
 *  - mouseAllDir:
 *    - type: boolean
 *    - description: Ignore initial mouse move direction (do not abort if the first mouse move is in an unaccepted direction)
 *  - preserveCursor:
 *    - type: boolean
 *    - description: Prevent the mouse cursor from automatically displaying as grabbing when panning
 *  - horizontal:
 *    - type: boolean
 *    - description: Catch horizontal (left/right) movement
 *  - vertical:
 *    - type: boolean
 *    - description: Catch vertical (up/down) movement
 *  - up:
 *    - type: boolean
 *    - description: Catch panning to up
 *  - right:
 *    - type: boolean
 *    - description: Catch panning to right
 *  - down:
 *    - type: boolean
 *    - description: Catch panning to down
 *  - left:
 *    - type: boolean
 *    - description: Catch panning to left
 *
 * @see https://v2.quasar.dev/vue-directives/touch-pan
 */
export type TouchPan = Directive<any, TouchPanValue>;
/**
 * Handler for touch-repeat (use undefined to disable)
 *
 * @see https://v2.quasar.dev/vue-directives/touch-repeat
 */
export type TouchRepeatValue =
  | ((details: {
      /**
       * Original JS event Object
       */
      evt?: Event;
      /**
       * Triggered by a touch event
       */
      touch?: boolean;
      /**
       * Triggered by a mouse event
       */
      mouse?: boolean;
      /**
       * Triggered by a keyboard event
       */
      keyboard?: boolean;
      /**
       * Event Position Object; Supplied ONLY if it's a touch or mouse event
       */
      position?: {
        /**
         * Vertical offset from top of window
         */
        top?: number;
        /**
         * Horizontal offset from left of window
         */
        left?: number;
      };
      /**
       * Keycode; Supplied ONLY if it's a keyboard event
       */
      keyCode?: number;
      /**
       * How long it took to trigger the event (in milliseconds)
       */
      duration?: number;
      /**
       * Handler called for nth time
       */
      repeatCount?: number;
      /**
       * Unix timestamp of the moment when event started; Equivalent to Date.now()
       */
      startTime?: number;
    }) => void)
  | undefined;
/**
 * Handler for touch-repeat (use undefined to disable)
 *
 * Directive argument:
 *  - type: string
 *  - default: 0:600:300
 *  - description: String of numbers (at least one number) separated by ':' which defines the amount of time to wait for 1st handler call, 2nd, 3rd and so on; All subsequent calls will use last value as time to wait until triggering
 *  - examples:
 *    - v-touch-repeat:0:400="fnToCall"
 *
 * Modifiers:
 *  - capture:
 *    - type: boolean
 *    - description: Use capture for touchstart event
 *  - mouse:
 *    - type: boolean
 *    - description: Listen for mouse events too
 *  - mouseCapture:
 *    - type: boolean
 *    - description: Use capture for mousedown event
 *  - keyCapture:
 *    - type: boolean
 *    - description: Use capture for keydown event
 *  - esc:
 *    - type: boolean
 *    - description: Catch ESC key
 *  - tab:
 *    - type: boolean
 *    - description: Catch TAB key
 *  - enter:
 *    - type: boolean
 *    - description: Catch ENTER key
 *  - space:
 *    - type: boolean
 *    - description: Catch SPACE key
 *  - up:
 *    - type: boolean
 *    - description: Catch UP arrow key
 *  - left:
 *    - type: boolean
 *    - description: Catch LEFT arrow key
 *  - right:
 *    - type: boolean
 *    - description: Catch RIGHT arrow key
 *  - down:
 *    - type: boolean
 *    - description: Catch DOWN key
 *  - delete:
 *    - type: boolean
 *    - description: Catch DELETE key
 *  - [keycode]:
 *    - type: number
 *    - description: Key code to catch
 *    - examples:
 *      - v-touch-repeat.68="fnToCall"
 *
 * @see https://v2.quasar.dev/vue-directives/touch-repeat
 */
export type TouchRepeat = Directive<any, TouchRepeatValue>;
/**
 * Handler for swipe (use undefined to disable)
 *
 * @see https://v2.quasar.dev/vue-directives/touch-swipe
 */
export type TouchSwipeValue =
  | ((details: {
      /**
       * Original JS event Object
       */
      evt?: Event;
      /**
       * Triggered by a touch event
       */
      touch?: boolean;
      /**
       * Triggered by a mouse event
       */
      mouse?: boolean;
      /**
       * Direction of movement
       */
      direction?: "up" | "right" | "down" | "left";
      /**
       * How long it took to trigger the event (in milliseconds)
       */
      duration?: number;
      /**
       * Absolute distance (in pixels) since movement started from initial point
       */
      distance?: {
        /**
         * Absolute distance horizontally
         */
        x?: number;
        /**
         * Absolute distance vertically
         */
        y?: number;
      };
    }) => void)
  | undefined;
/**
 * Handler for swipe (use undefined to disable)
 *
 * Directive argument:
 *  - type: string
 *  - default: 6e-2:6:50
 *  - description: x:y:z, where x is minimum velocity (dist/time; please use float without a dot, example: 6e-2 which is equivalent to 6 * 10^-2 = 0.06), y is minimum distance on first move on mobile, z is minimum distance on desktop until deciding if it's a swipe indeed
 *  - examples:
 *    - v-touch-swipe:7e-2:10:100="fnToCall"
 *
 * Modifiers:
 *  - capture:
 *    - type: boolean
 *    - description: Use capture for touchstart event
 *  - mouse:
 *    - type: boolean
 *    - description: Listen for mouse events too
 *  - mouseCapture:
 *    - type: boolean
 *    - description: Use capture for mousedown event
 *  - horizontal:
 *    - type: boolean
 *    - description: Catch horizontal (left/right) movement
 *  - vertical:
 *    - type: boolean
 *    - description: Catch vertical (up/down) movement
 *  - up:
 *    - type: boolean
 *    - description: Catch swipe to up
 *  - right:
 *    - type: boolean
 *    - description: Catch swipe to right
 *  - down:
 *    - type: boolean
 *    - description: Catch swipe to down
 *  - left:
 *    - type: boolean
 *    - description: Catch swipe to left
 *
 * @see https://v2.quasar.dev/vue-directives/touch-swipe
 */
export type TouchSwipe = Directive<any, TouchSwipeValue>;
export interface QAjaxBarProps {
  /**
   * Position within window of where QAjaxBar should be displayed
   * Default value: top
   */
  position?: "top" | "right" | "bottom" | "left" | undefined;
  /**
   * Size in CSS units, including unit name
   * Default value: 2px
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Reverse direction of progress
   */
  reverse?: boolean | undefined;
  /**
   * Skip Ajax hijacking (not a reactive prop)
   */
  skipHijack?: boolean | undefined;
  /**
   * Filter which URL should trigger start() + stop()
   * @param url The URL being triggered
   * @returns Should the URL received as param trigger start() + stop()?
   */
  hijackFilter?: ((url: string) => boolean) | undefined;
  /**
   * Emitted when bar is triggered to appear
   */
  onStart?: () => void;
  /**
   * Emitted when bar has finished its job
   */
  onStop?: () => void;
}

export interface QAjaxBarSlots {}

export interface QAjaxBar extends ComponentPublicInstance<QAjaxBarProps> {
  /**
   * Notify bar you are waiting for a new process to finish
   * @param speed Delay (in milliseconds) between progress auto-increments; If delay is 0 then it disables auto-incrementing
   * @returns Number of active simultaneous sessions
   */
  start: (speed?: number) => number;
  /**
   * Manually trigger a bar progress increment
   * @param amount Amount (0 < x <= 100) to increment with
   * @returns Number of active simultaneous sessions
   */
  increment: (amount?: number) => number;
  /**
   * Notify bar that one process you were waiting has finished
   * @returns Number of active simultaneous sessions
   */
  stop: () => number;
}

export interface QAvatarProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * The size in CSS units, including unit name, of the content (icon, text)
   */
  fontSize?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
}

export interface QAvatarSlots {
  /**
   * Optional; Suggestions: one character string, <img> tag
   */
  default: () => VNode[];
}

export interface QAvatar extends ComponentPublicInstance<QAvatarProps> {}

export interface QBadgeProps {
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Tell QBadge if it should float to the top right side of the relative positioned parent element or not
   */
  floating?: boolean | undefined;
  /**
   * Applies a 0.8 opacity; Useful especially for floating QBadge
   */
  transparent?: boolean | undefined;
  /**
   * Content can wrap to multiple lines
   */
  multiLine?: boolean | undefined;
  /**
   * Badge's content as string; overrides default slot if specified
   */
  label?: string | number | undefined;
  /**
   * Sets vertical-align CSS prop
   */
  align?: "top" | "middle" | "bottom" | undefined;
  /**
   * Use 'outline' design (colored text and borders only)
   */
  outline?: boolean | undefined;
  /**
   * Makes a rounded shaped badge
   */
  rounded?: boolean | undefined;
}

export interface QBadgeSlots {
  /**
   * This is where QBadge content goes, if not using 'label' property
   */
  default: () => VNode[];
}

export interface QBadge extends ComponentPublicInstance<QBadgeProps> {}

export interface QBannerProps {
  /**
   * Display actions on same row as content
   */
  inlineActions?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
}

export interface QBannerSlots {
  /**
   * This is where Banner content goes
   */
  default: () => VNode[];
  /**
   * Slot for displaying an avatar (suggestions: QIcon, QAvatar)
   */
  avatar: () => VNode[];
  /**
   * Slot for Banner action (suggestions: QBtn)
   */
  action: () => VNode[];
}

export interface QBanner extends ComponentPublicInstance<QBannerProps> {}

export interface QBarProps {
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * The component background color lights up the parent's background (as opposed to default behavior which is to darken it); Works unless you specify a CSS background color for it
   */
  dark?: boolean | undefined;
}

export interface QBarSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QBar extends ComponentPublicInstance<QBarProps> {}

export interface QBreadcrumbsProps {
  /**
   * The string used to separate the breadcrumbs
   * Default value: /
   */
  separator?: string | undefined;
  /**
   * The color of the active breadcrumb, which can be any color from the Quasar Color Palette
   * Default value: primary
   */
  activeColor?: NamedColor | undefined;
  /**
   * The gutter value allows you control over the space between the breadcrumb elements.
   * Default value: sm
   */
  gutter?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  /**
   * The color used to color the separator, which can be any color from the Quasar Color Palette
   */
  separatorColor?: NamedColor | undefined;
  /**
   * Specify how to align the breadcrumbs horizontally
   * Default value: left
   */
  align?:
    | "left"
    | "center"
    | "right"
    | "between"
    | "around"
    | "evenly"
    | undefined;
}

export interface QBreadcrumbsSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
  /**
   * HTML or component you can slot in to separate the breadcrumbs
   */
  separator: () => VNode[];
}

export interface QBreadcrumbs
  extends ComponentPublicInstance<QBreadcrumbsProps> {}

export interface QBreadcrumbsElProps {
  /**
   * Equivalent to Vue Router <router-link> 'to' property; Superseded by 'href' prop if used
   */
  to?: string | any | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'exact' property; Superseded by 'href' prop if used
   */
  exact?: boolean | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'replace' property; Superseded by 'href' prop if used
   */
  replace?: boolean | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used
   */
  activeClass?: string | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used
   */
  exactActiveClass?: string | undefined;
  /**
   * Native <a> link href attribute; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props
   */
  href?: string | undefined;
  /**
   * Native <a> link target attribute; Use it only along with 'href' prop; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props
   */
  target?: string | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * The label text for the breadcrumb
   */
  label?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * HTML tag to use
   * Default value: span
   */
  tag?: string | undefined;
  /**
   * Emitted when the component is clicked
   * @param evt JS event object; If you are using route navigation ('to'/'replace' props) and you want to cancel navigation then call evt.preventDefault() synchronously in your event handler
   * @param go Available ONLY if you are using route navigation ('to'/'replace' props); When you need to control the time at which the component should trigger the route navigation then call evt.preventDefault() synchronously and then call this function at your convenience; Useful if you have async work to be done before the actual route navigation or if you want to redirect somewhere else
   */
  onClick?: (
    evt: Event,
    go?: (opts?: {
      /**
       * Equivalent to Vue Router <router-link> 'to' property; Specify it explicitly otherwise it will be set with same value as component's 'to' prop
       */
      to?: string | any;
      /**
       * Equivalent to Vue Router <router-link> 'replace' property; Specify it explicitly otherwise it will be set with same value as component's 'replace' prop
       */
      replace?: boolean;
      /**
       * Return the router error, if any; Otherwise the returned Promise will always fulfill
       */
      returnRouterError?: boolean;
    }) => Promise<any>
  ) => void;
}

export interface QBreadcrumbsElSlots {
  /**
   * This is where custom content goes, unless 'icon' and 'label' props are not enough
   */
  default: () => VNode[];
}

export interface QBreadcrumbsEl
  extends ComponentPublicInstance<QBreadcrumbsElProps> {}

export interface QBtnProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * 1) Define the button native type attribute (submit, reset, button) or 2) render component with <a> tag so you can access events even if disable or 3) Use 'href' prop and specify 'type' as a media tag
   * Default value: button
   */
  type?: string | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'to' property; Superseded by 'href' prop if used
   */
  to?: string | any | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'replace' property; Superseded by 'href' prop if used
   */
  replace?: boolean | undefined;
  /**
   * Native <a> link href attribute; Has priority over the 'to' and 'replace' props
   */
  href?: string | undefined;
  /**
   * Native <a> link target attribute; Use it only with 'to' or 'href' props
   */
  target?: string | undefined;
  /**
   * The text that will be shown on the button
   */
  label?: string | number | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  iconRight?: string | undefined;
  /**
   * Use 'outline' design
   */
  outline?: boolean | undefined;
  /**
   * Use 'flat' design
   */
  flat?: boolean | undefined;
  /**
   * Remove shadow
   */
  unelevated?: boolean | undefined;
  /**
   * Applies a more prominent border-radius for a squared shape button
   */
  rounded?: boolean | undefined;
  /**
   * Use 'push' design
   */
  push?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a glossy effect
   */
  glossy?: boolean | undefined;
  /**
   * Makes button size and shape to fit a Floating Action Button
   */
  fab?: boolean | undefined;
  /**
   * Makes button size and shape to fit a small Floating Action Button
   */
  fabMini?: boolean | undefined;
  /**
   * Apply custom padding (vertical [horizontal]); Size in CSS units, including unit name or standard size name (none|xs|sm|md|lg|xl); Also removes the min width and height when set
   */
  padding?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Avoid turning label text into caps (which happens by default)
   */
  noCaps?: boolean | undefined;
  /**
   * Avoid label text wrapping
   */
  noWrap?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Configure material ripple (disable it by setting it to 'false' or supply a config object)
   * Default value: true
   */
  ripple?: boolean | any | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Label or content alignment
   * Default value: center
   */
  align?:
    | "left"
    | "right"
    | "center"
    | "around"
    | "between"
    | "evenly"
    | undefined;
  /**
   * Stack icon and label vertically instead of on same line (like it is by default)
   */
  stack?: boolean | undefined;
  /**
   * When used on flexbox parent, button will stretch to parent's height
   */
  stretch?: boolean | undefined;
  /**
   * Put button into loading state (displays a QSpinner -- can be overridden by using a 'loading' slot)
   */
  loading?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Makes a circle shaped button
   */
  round?: boolean | undefined;
  /**
   * Percentage (0.0 < x < 100.0); To be used along 'loading' prop; Display a progress bar on the background
   */
  percentage?: number | undefined;
  /**
   * Progress bar on the background should have dark color; To be used along with 'percentage' and 'loading' props
   */
  darkPercentage?: boolean | undefined;
  /**
   * Emitted when the component is clicked
   * @param evt JS event object; If you are using route navigation ('to'/'replace' props) and you want to cancel navigation then call evt.preventDefault() synchronously in your event handler
   * @param go Available ONLY if you are using route navigation ('to'/'replace' props); When you need to control the time at which the component should trigger the route navigation then call evt.preventDefault() synchronously and then call this function at your convenience; Useful if you have async work to be done before the actual route navigation or if you want to redirect somewhere else
   */
  onClick?: (
    evt: Event,
    go?: (opts?: {
      /**
       * Equivalent to Vue Router <router-link> 'to' property; Specify it explicitly otherwise it will be set with same value as component's 'to' prop
       */
      to?: string | any;
      /**
       * Equivalent to Vue Router <router-link> 'replace' property; Specify it explicitly otherwise it will be set with same value as component's 'replace' prop
       */
      replace?: boolean;
      /**
       * Return the router error, if any; Otherwise the returned Promise will always fulfill
       */
      returnRouterError?: boolean;
    }) => Promise<any>
  ) => void;
}

export interface QBtnSlots {
  /**
   * Use for custom content, instead of relying on 'icon' and 'label' props
   */
  default: () => VNode[];
  /**
   * Override the default QSpinner when in 'loading' state
   */
  loading: () => VNode[];
}

export interface QBtn extends ComponentPublicInstance<QBtnProps> {
  /**
   * Emulate click on QBtn
   * @param evt JS event object
   */
  click: (evt?: Event) => void;
}

export interface QBtnDropdownProps {
  /**
   * One of Quasar's embedded transitions
   * Default value: fade
   */
  transitionShow?: string | undefined;
  /**
   * One of Quasar's embedded transitions
   * Default value: fade
   */
  transitionHide?: string | undefined;
  /**
   * Transition duration (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Controls Menu show/hidden state; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue?: boolean;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * 1) Define the button native type attribute (submit, reset, button) or 2) render component with <a> tag so you can access events even if disable or 3) Use 'href' prop and specify 'type' as a media tag
   * Default value: button
   */
  type?: string | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'to' property; Superseded by 'href' prop if used
   */
  to?: string | any | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'replace' property; Superseded by 'href' prop if used
   */
  replace?: boolean | undefined;
  /**
   * Native <a> link href attribute; Has priority over the 'to' and 'replace' props
   */
  href?: string | undefined;
  /**
   * Native <a> link target attribute; Use it only with 'to' or 'href' props
   */
  target?: string | undefined;
  /**
   * The text that will be shown on the button
   */
  label?: string | number | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  iconRight?: string | undefined;
  /**
   * Use 'outline' design
   */
  outline?: boolean | undefined;
  /**
   * Use 'flat' design
   */
  flat?: boolean | undefined;
  /**
   * Remove shadow
   */
  unelevated?: boolean | undefined;
  /**
   * Applies a more prominent border-radius for a squared shape button
   */
  rounded?: boolean | undefined;
  /**
   * Use 'push' design
   */
  push?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a glossy effect
   */
  glossy?: boolean | undefined;
  /**
   * Makes button size and shape to fit a Floating Action Button
   */
  fab?: boolean | undefined;
  /**
   * Makes button size and shape to fit a small Floating Action Button
   */
  fabMini?: boolean | undefined;
  /**
   * Apply custom padding (vertical [horizontal]); Size in CSS units, including unit name or standard size name (none|xs|sm|md|lg|xl); Also removes the min width and height when set
   */
  padding?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Avoid turning label text into caps (which happens by default)
   */
  noCaps?: boolean | undefined;
  /**
   * Avoid label text wrapping
   */
  noWrap?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Configure material ripple (disable it by setting it to 'false' or supply a config object)
   * Default value: true
   */
  ripple?: boolean | any | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Label or content alignment
   * Default value: center
   */
  align?:
    | "left"
    | "right"
    | "center"
    | "around"
    | "between"
    | "evenly"
    | undefined;
  /**
   * Stack icon and label vertically instead of on same line (like it is by default)
   */
  stack?: boolean | undefined;
  /**
   * When used on flexbox parent, button will stretch to parent's height
   */
  stretch?: boolean | undefined;
  /**
   * Put button into loading state (displays a QSpinner -- can be overridden by using a 'loading' slot)
   */
  loading?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Split dropdown icon into its own button
   */
  split?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  dropdownIcon?: string | undefined;
  /**
   * Disable main button (useful along with 'split' prop)
   */
  disableMainBtn?: boolean | undefined;
  /**
   * Disables dropdown (dropdown button if using along 'split' prop)
   */
  disableDropdown?: boolean | undefined;
  /**
   * Disables the rotation of the dropdown icon when state is toggled
   */
  noIconAnimation?: boolean | undefined;
  /**
   * Style definitions to be attributed to the menu
   */
  contentStyle?: VueStyleProp | undefined;
  /**
   * Class definitions to be attributed to the menu
   */
  contentClass?: VueClassProp | undefined;
  /**
   * Allows the menu to cover the button. When used, the 'menu-self' and 'menu-fit' props are no longer effective
   */
  cover?: boolean | undefined;
  /**
   * Allows the menu to not be dismissed by a click/tap outside of the menu or by hitting the ESC key
   */
  persistent?: boolean | undefined;
  /**
   * Changing route app won't dismiss the popup; No need to set it if 'persistent' prop is also set
   */
  noRouteDismiss?: boolean | undefined;
  /**
   * Allows any click/tap in the menu to close it; Useful instead of attaching events to each menu item that should close the menu on click/tap
   */
  autoClose?: boolean | undefined;
  /**
   * Two values setting the starting position or anchor point of the menu relative to its target
   * Default value: bottom end
   */
  menuAnchor?:
    | "top left"
    | "top middle"
    | "top right"
    | "top start"
    | "top end"
    | "center left"
    | "center middle"
    | "center right"
    | "center start"
    | "center end"
    | "bottom left"
    | "bottom middle"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | undefined;
  /**
   * Two values setting the menu's own position relative to its target
   * Default value: top end
   */
  menuSelf?:
    | "top left"
    | "top middle"
    | "top right"
    | "top start"
    | "top end"
    | "center left"
    | "center middle"
    | "center right"
    | "center start"
    | "center end"
    | "bottom left"
    | "bottom middle"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | undefined;
  /**
   * An array of two numbers to offset the menu horizontally and vertically in pixels
   */
  menuOffset?: readonly any[] | undefined;
  /**
   * aria-label to be used on the dropdown toggle element
   */
  toggleAriaLabel?: string | undefined;
  /**
   * Emitted when showing/hidden state changes; Is also used by v-model
   * @param value New state (showing/hidden)
   */
  "onUpdate:modelValue"?: (value: boolean) => void;
  /**
   * Emitted after component has triggered show()
   * @param evt JS event object
   */
  onShow?: (evt: Event) => void;
  /**
   * Emitted when component triggers show() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeShow?: (evt: Event) => void;
  /**
   * Emitted after component has triggered hide()
   * @param evt JS event object
   */
  onHide?: (evt: Event) => void;
  /**
   * Emitted when component triggers hide() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeHide?: (evt: Event) => void;
  /**
   * Emitted when user clicks/taps on the main button (not the icon one, if using 'split')
   * @param evt JS event object
   */
  onClick?: (evt: Event) => void;
}

export interface QBtnDropdownSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
  /**
   * Customize main button's content through this slot, unless you're using the 'icon' and 'label' props
   */
  label: () => VNode[];
  /**
   * Override the default QSpinner when in 'loading' state
   */
  loading: () => VNode[];
}

export interface QBtnDropdown
  extends ComponentPublicInstance<QBtnDropdownProps> {
  /**
   * Triggers component to show
   * @param evt JS event object
   */
  show: (evt?: Event) => void;
  /**
   * Triggers component to hide
   * @param evt JS event object
   */
  hide: (evt?: Event) => void;
  /**
   * Triggers component to toggle between show/hide
   * @param evt JS event object
   */
  toggle: (evt?: Event) => void;
}

export interface QBtnGroupProps {
  /**
   * Spread horizontally to all available space
   */
  spread?: boolean | undefined;
  /**
   * Use 'outline' design for buttons
   */
  outline?: boolean | undefined;
  /**
   * Use 'flat' design for buttons
   */
  flat?: boolean | undefined;
  /**
   * Remove shadow on buttons
   */
  unelevated?: boolean | undefined;
  /**
   * Applies a more prominent border-radius for squared shape buttons
   */
  rounded?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Use 'push' design for buttons
   */
  push?: boolean | undefined;
  /**
   * When used on flexbox parent, buttons will stretch to parent's height
   */
  stretch?: boolean | undefined;
  /**
   * Applies a glossy effect
   */
  glossy?: boolean | undefined;
}

export interface QBtnGroupSlots {
  /**
   * Suggestion: QBtn
   */
  default: () => VNode[];
}

export interface QBtnGroup extends ComponentPublicInstance<QBtnGroupProps> {}

export interface QBtnToggleProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Model of the component; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue: any;
  /**
   * Array of Objects defining each option
   */
  options: {
    /**
     * Key-value for attributes to be set on the button
     */
    attrs?: any;
    /**
     * Label of option button; Use this prop and/or 'icon', but at least one is required
     */
    label?: string;
    /**
     * Icon of option button; Use this prop and/or 'label', but at least one is required
     */
    icon?: string;
    /**
     * Value of the option that will be used by component model
     */
    value: any;
    /**
     * Slot name to use for this button content; Useful for customizing content or even add tooltips
     */
    slot?: string;
    /**
     * Any other QBtn props (including class and style)
     */
    [props: string]: any | undefined;
  }[];
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   * Default value: primary
   */
  toggleColor?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  toggleTextColor?: NamedColor | undefined;
  /**
   * Spread horizontally to all available space
   */
  spread?: boolean | undefined;
  /**
   * Use 'outline' design
   */
  outline?: boolean | undefined;
  /**
   * Use 'flat' design
   */
  flat?: boolean | undefined;
  /**
   * Remove shadow
   */
  unelevated?: boolean | undefined;
  /**
   * Applies a more prominent border-radius for a squared shape button
   */
  rounded?: boolean | undefined;
  /**
   * Use 'push' design
   */
  push?: boolean | undefined;
  /**
   * Applies a glossy effect
   */
  glossy?: boolean | undefined;
  /**
   * Button size name or a CSS unit including unit name
   */
  size?: string | undefined;
  /**
   * Apply custom padding (vertical [horizontal]); Size in CSS units, including unit name or standard size name (none|xs|sm|md|lg|xl); Also removes the min width and height when set
   */
  padding?: string | undefined;
  /**
   * Avoid turning label text into caps (which happens by default)
   */
  noCaps?: boolean | undefined;
  /**
   * Avoid label text wrapping
   */
  noWrap?: boolean | undefined;
  /**
   * Configure material ripple (disable it by setting it to 'false' or supply a config object)
   * Default value: true
   */
  ripple?: boolean | any | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Stack icon and label vertically instead of on same line (like it is by default)
   */
  stack?: boolean | undefined;
  /**
   * When used on flexbox parent, button will stretch to parent's height
   */
  stretch?: boolean | undefined;
  /**
   * Clears model on click of the already selected button
   */
  clearable?: boolean | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: any) => void;
  /**
   * When using the 'clearable' property, this event is emitted when the already selected button is clicked
   */
  onClear?: () => void;
}

export interface QBtnToggleSlots {
  /**
   * Suggestions: QTooltip, QBadge
   */
  default: () => VNode[];
  /**
   * Any other dynamic slots to be used with 'slot' property of the 'options' prop
   */
  [key: string]: () => VNode[];
}

export interface QBtnToggle extends ComponentPublicInstance<QBtnToggleProps> {}

export interface QCardProps {
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a 'flat' design (no default shadow)
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * HTML tag to use
   * Default value: div
   */
  tag?: string | undefined;
}

export interface QCardSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QCard extends ComponentPublicInstance<QCardProps> {}

export interface QCardActionsProps {
  /**
   * Specify how to align the actions
   * Default value: left (for horizontal mode) / stretch (for vertical mode)
   */
  align?:
    | "left"
    | "center"
    | "right"
    | "between"
    | "around"
    | "evenly"
    | "stretch"
    | undefined;
  /**
   * Display actions one below the other
   */
  vertical?: boolean | undefined;
}

export interface QCardActionsSlots {
  /**
   * Suggestions: QBtn
   */
  default: () => VNode[];
}

export interface QCardActions
  extends ComponentPublicInstance<QCardActionsProps> {}

export interface QCardSectionProps {
  /**
   * Display a horizontal section (will have no padding and can contain other QCardSection)
   */
  horizontal?: boolean | undefined;
  /**
   * HTML tag to use
   * Default value: div
   */
  tag?: string | undefined;
}

export interface QCardSectionSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QCardSection
  extends ComponentPublicInstance<QCardSectionProps> {}

export interface QCarouselProps {
  /**
   * Fullscreen mode
   */
  fullscreen?: boolean | undefined;
  /**
   * Changing route app won't exit fullscreen
   */
  noRouteFullscreenExit?: boolean | undefined;
  /**
   * Model of the component defining the current panel's name; If a Number is used, it does not define the panel's index, but rather the panel's name which can also be an Integer; Either use this property (along with a listener for 'update:model-value' event) OR use the v-model directive.
   */
  modelValue?: any;
  /**
   * Equivalent to using Vue's native <keep-alive> component on the content
   */
  keepAlive?: boolean | undefined;
  /**
   * Equivalent to using Vue's native include prop for <keep-alive>; Values must be valid Vue component names
   */
  keepAliveInclude?: string | readonly any[] | RegExp | undefined;
  /**
   * Equivalent to using Vue's native exclude prop for <keep-alive>; Values must be valid Vue component names
   */
  keepAliveExclude?: string | readonly any[] | RegExp | undefined;
  /**
   * Equivalent to using Vue's native max prop for <keep-alive>
   */
  keepAliveMax?: number | undefined;
  /**
   * Enable transitions between panel (also see 'transition-prev' and 'transition-next' props)
   */
  animated?: boolean | undefined;
  /**
   * Makes component appear as infinite (when reaching last panel, next one will become the first one)
   */
  infinite?: boolean | undefined;
  /**
   * Enable swipe events (may interfere with content's touch/mouse events)
   */
  swipeable?: boolean | undefined;
  /**
   * Default transitions and swipe actions will be on the vertical axis
   */
  vertical?: boolean | undefined;
  /**
   * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
   * Default value: fade
   */
  transitionPrev?: string | undefined;
  /**
   * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
   * Default value: fade
   */
  transitionNext?: string | undefined;
  /**
   * Transition duration (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Height of Carousel in CSS units, including unit name
   */
  height?: string | undefined;
  /**
   * Applies a default padding to each slide, according to the usage of 'arrows' and 'navigation' props
   */
  padding?: boolean | undefined;
  /**
   * Color name for QCarousel button controls (arrows, navigation) from the Quasar Color Palette
   */
  controlColor?: NamedColor | undefined;
  /**
   * Color name for text color of QCarousel button controls (arrows, navigation) from the Quasar Color Palette
   */
  controlTextColor?: NamedColor | undefined;
  /**
   * Type of button to use for controls (arrows, navigation)
   */
  controlType?:
    | "regular"
    | "flat"
    | "outline"
    | "push"
    | "unelevated"
    | undefined;
  /**
   * Jump to next slide (if 'true' or val > 0) or previous slide (if val < 0) at fixed time intervals (in milliseconds); 'false' disables autoplay, 'true' enables it for 5000ms intervals
   */
  autoplay?: number | boolean | undefined;
  /**
   * Show navigation arrow buttons
   */
  arrows?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  prevIcon?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  nextIcon?: string | undefined;
  /**
   * Show navigation dots
   */
  navigation?: boolean | undefined;
  /**
   * Side to stick navigation to
   * Default value: bottom/right
   */
  navigationPosition?: "top" | "right" | "bottom" | "left" | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  navigationIcon?: string | undefined;
  /**
   * Icon name following Quasar convention for the active (current slide) navigation icon; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  navigationActiveIcon?: string | undefined;
  /**
   * Show thumbnails
   */
  thumbnails?: boolean | undefined;
  /**
   * Emitted when fullscreen state changes
   * @param value Fullscreen state (showing/hidden)
   */
  onFullscreen?: (value: boolean) => void;
  /**
   * Emitted when the component changes the model; This event _isn't_ fired if the model is changed externally; Is also used by v-model
   * @param value New current panel name
   */
  "onUpdate:modelValue"?: (value: string | number) => void;
  /**
   * Emitted before transitioning to a new panel
   * @param newVal Panel name towards transition is going
   * @param oldVal Panel name from which transition is happening
   */
  onBeforeTransition?: (
    newVal: string | number,
    oldVal: string | number
  ) => void;
  /**
   * Emitted after component transitioned to a new panel
   * @param newVal Panel name towards transition has occurred
   * @param oldVal Panel name from which transition has happened
   */
  onTransition?: (newVal: string | number, oldVal: string | number) => void;
}

export interface QCarouselSlots {
  /**
   * Suggestion: QCarouselSlide
   */
  default: () => VNode[];
  /**
   * Slot specific for QCarouselControl
   */
  control: () => VNode[];
  /**
   * Slot for navigation icon/btn; Suggestion: QBtn
   * @param scope
   */
  "navigation-icon": (scope: {
    /**
     * The 0-based index of corresponding slide
     */
    index: number;
    /**
     * The available number of slides
     */
    maxIndex: number;
    /**
     * The name of the corresponding slide
     */
    name: any;
    /**
     * Is this the current slide?
     */
    active: boolean;
    /**
     * Default QBtn props that can be binded to your own QBtn
     */
    btnProps: any;
    /**
     * Default trigger when clicked/tapped on
     * @param evt JS event object
     */
    onClick: (evt: Event) => void;
  }) => VNode[];
}

export interface QCarousel extends ComponentPublicInstance<QCarouselProps> {
  /**
   * Toggle the view to be fullscreen or not fullscreen
   */
  toggleFullscreen: () => void;
  /**
   * Enter the fullscreen view
   */
  setFullscreen: () => void;
  /**
   * Leave the fullscreen view
   */
  exitFullscreen: () => void;
  /**
   * Go to next panel
   */
  next: () => void;
  /**
   * Go to previous panel
   */
  previous: () => void;
  /**
   * Go to specific panel
   * @param panelName Panel's name, which may be a String or Number; Number does not refers to panel index, but to its name, which may be an Integer
   */
  goTo: (panelName: string | number) => void;
}

export interface QCarouselControlProps {
  /**
   * Side/corner to stick to
   * Default value: bottom-right
   */
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | undefined;
  /**
   * An array of two numbers to offset the component horizontally and vertically (in pixels)
   * Default value: [18, 18]
   */
  offset?: readonly any[] | undefined;
}

export interface QCarouselControlSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QCarouselControl
  extends ComponentPublicInstance<QCarouselControlProps> {}

export interface QCarouselSlideProps {
  /**
   * Slide name
   */
  name: any;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * URL pointing to a slide background image (use public folder)
   */
  imgSrc?: string | undefined;
}

export interface QCarouselSlideSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QCarouselSlide
  extends ComponentPublicInstance<QCarouselSlideProps> {}

export interface QChatMessageProps {
  /**
   * Render as a sent message (so from current user)
   */
  sent?: boolean | undefined;
  /**
   * Renders a label header/section only
   */
  label?: string | undefined;
  /**
   * Color name (from the Quasar Color Palette) for chat bubble background
   */
  bgColor?: NamedColor | undefined;
  /**
   * Color name (from the Quasar Color Palette) for chat bubble text
   */
  textColor?: NamedColor | undefined;
  /**
   * Author's name
   */
  name?: string | undefined;
  /**
   * URL to the avatar image of the author
   */
  avatar?: string | undefined;
  /**
   * Array of strings that are the message body. Strings are not sanitized (see details in docs)
   */
  text?: readonly any[] | undefined;
  /**
   * Creation timestamp
   */
  stamp?: string | undefined;
  /**
   * 1-12 out of 12 (same as col-*)
   */
  size?: string | undefined;
  /**
   * Render the label as HTML; This can lead to XSS attacks so make sure that you sanitize the message first
   */
  labelHtml?: boolean | undefined;
  /**
   * Render the name as HTML; This can lead to XSS attacks so make sure that you sanitize the message first
   */
  nameHtml?: boolean | undefined;
  /**
   * Render the text as HTML; This can lead to XSS attacks so make sure that you sanitize the message first
   */
  textHtml?: boolean | undefined;
  /**
   * Render the stamp as HTML; This can lead to XSS attacks so make sure that you sanitize the message first
   */
  stampHtml?: boolean | undefined;
}

export interface QChatMessageSlots {
  /**
   * You can use this slot to define a custom message (overrides props)
   */
  default: () => VNode[];
  /**
   * Slot for avatar; Suggestion: QAvatar, img
   */
  avatar: () => VNode[];
  /**
   * Slot for name; Overrides the 'name' prop
   */
  name: () => VNode[];
  /**
   * Slot for stamp; Overrides the 'stamp' prop
   */
  stamp: () => VNode[];
  /**
   * Slot for label; Overrides the 'label' prop
   */
  label: () => VNode[];
}

export interface QChatMessage
  extends ComponentPublicInstance<QChatMessageProps> {}

export interface QCheckboxProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue: any | any[];
  /**
   * Works when model ('value') is Array. It tells the component which value should add/remove when ticked/unticked
   */
  val?: any | undefined;
  /**
   * What model value should be considered as checked/ticked/on?
   * Default value: true
   */
  trueValue?: any | undefined;
  /**
   * What model value should be considered as unchecked/unticked/off?
   */
  falseValue?: any | undefined;
  /**
   * What model value should be considered as 'indeterminate'?
   */
  indeterminateValue?: any | undefined;
  /**
   * Determines toggle order of the two states ('t' stands for state of true, 'f' for state of false); If 'toggle-indeterminate' is true, then the order is: indet -> first state -> second state -> indet (and repeat), otherwise: indet -> first state -> second state -> first state -> second state -> ...
   * Default value: tf
   */
  toggleOrder?: "tf" | "ft" | undefined;
  /**
   * When user clicks/taps on the component, should we toggle through the indeterminate state too?
   */
  toggleIndeterminate?: boolean | undefined;
  /**
   * Label to display along the component (or use the default slot instead of this prop)
   */
  label?: string | undefined;
  /**
   * Label (if any specified) should be displayed on the left side of the component
   */
  leftLabel?: boolean | undefined;
  /**
   * The icon to be used when the model is truthy (instead of the default design)
   */
  checkedIcon?: string | undefined;
  /**
   * The icon to be used when the toggle is falsy (instead of the default design)
   */
  uncheckedIcon?: string | undefined;
  /**
   * The icon to be used when the model is indeterminate (instead of the default design)
   */
  indeterminateIcon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Should the color (if specified any) be kept when the component is unticked/ off?
   */
  keepColor?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   * @param evt JS event object
   */
  "onUpdate:modelValue"?: (value: any, evt: Event) => void;
}

export interface QCheckboxSlots {
  /**
   * Default slot can be used as label, unless 'label' prop is specified; Suggestion: string
   */
  default: () => VNode[];
}

export interface QCheckbox extends ComponentPublicInstance<QCheckboxProps> {
  /**
   * Toggle the state (of the model)
   */
  toggle: () => void;
}

export interface QChipProps {
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * QChip size name or a CSS unit including unit name
   */
  size?: string | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  iconRight?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  iconRemove?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  iconSelected?: string | undefined;
  /**
   * Chip's content as string; overrides default slot if specified
   */
  label?: string | number | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Model of the component determining if QChip should be rendered or not
   * Default value: true
   */
  modelValue?: boolean;
  /**
   * Model for QChip if it's selected or not
   */
  selected?: boolean | undefined;
  /**
   * Sets a low value for border-radius instead of the default one, making it close to a square
   */
  square?: boolean | undefined;
  /**
   * Display using the 'outline' design
   */
  outline?: boolean | undefined;
  /**
   * Is QChip clickable? If it's the case, then it will add hover effects and emit 'click' events
   */
  clickable?: boolean | undefined;
  /**
   * If set, then it displays a 'remove' icon that when clicked the QChip emits 'remove' event
   */
  removable?: boolean | undefined;
  /**
   * Configure material ripple (disable it by setting it to 'false' or supply a config object)
   * Default value: true
   */
  ripple?: boolean | any | undefined;
  /**
   * aria-label to be used on the remove icon
   */
  removeAriaLabel?: string | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Emitted on QChip click if 'clickable' property is set
   * @param evt JS event object
   */
  onClick?: (evt: Event) => void;
  /**
   * Used by Vue on 'v-model:selected' for updating its value
   * @param state Selected state
   */
  "onUpdate:selected"?: (state: boolean) => void;
  /**
   * Works along with 'value' and 'removable' prop. Emitted when toggling rendering state of the QChip
   * @param state Render state (render or not)
   */
  onRemove?: (state: boolean) => void;
}

export interface QChipSlots {
  /**
   * This is where QChip content goes, if not using 'label' property
   */
  default: () => VNode[];
}

export interface QChip extends ComponentPublicInstance<QChipProps> {}

export interface QCircularProgressProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Current progress (must be between min/max)
   */
  value?: number | undefined;
  /**
   * Minimum value defining 'no progress' (must be lower than 'max')
   */
  min?: number | undefined;
  /**
   * Maximum value defining 100% progress made (must be higher than 'min')
   * Default value: 100
   */
  max?: number | undefined;
  /**
   * Color name for the arc progress from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for the center part of the component from the Quasar Color Palette
   */
  centerColor?: NamedColor | undefined;
  /**
   * Color name for the track of the component from the Quasar Color Palette
   */
  trackColor?: NamedColor | undefined;
  /**
   * Size of text in CSS units, including unit name. Suggestion: use 'em' units to sync with component size
   * Default value: 0.25em
   */
  fontSize?: string | undefined;
  /**
   * Rounding the arc of progress
   */
  rounded?: boolean | undefined;
  /**
   * Thickness of progress arc as a ratio (0.0 < x < 1.0) of component size
   * Default value: 0.2
   */
  thickness?: number | undefined;
  /**
   * Angle to rotate progress arc by
   */
  angle?: number | undefined;
  /**
   * Put component into 'indeterminate' state; Ignores 'value' prop
   */
  indeterminate?: boolean | undefined;
  /**
   * Enables the default slot and uses it (if available), otherwise it displays the 'value' prop as text; Make sure the text has enough space to be displayed inside the component
   */
  showValue?: boolean | undefined;
  /**
   * Reverses the direction of progress; Only for determined state
   */
  reverse?: boolean | undefined;
  /**
   * No animation when model changes
   */
  instantFeedback?: boolean | undefined;
  /**
   * Animation speed (in milliseconds, without unit)
   * Default value: 600
   */
  animationSpeed?: string | number | undefined;
}

export interface QCircularProgressSlots {
  /**
   * Used for component content only if 'show-value' prop is set; Make sure the content has enough space to be displayed inside the component
   */
  default: () => VNode[];
}

export interface QCircularProgress
  extends ComponentPublicInstance<QCircularProgressProps> {}

export interface QColorProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue: string | null | undefined;
  /**
   * The default value to show when the model doesn't have one
   */
  defaultValue?: string | undefined;
  /**
   * The default view of the picker
   * Default value: spectrum
   */
  defaultView?: "spectrum" | "tune" | "palette" | undefined;
  /**
   * Forces a certain model format upon the model
   * Default value: auto
   */
  formatModel?: "auto" | "hex" | "rgb" | "hexa" | "rgba" | undefined;
  /**
   * Use a custom palette of colors for the palette tab
   * Default value: (hard-coded palette)
   */
  palette?: readonly any[] | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a 'flat' design (no default shadow)
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Do not render header
   */
  noHeader?: boolean | undefined;
  /**
   * Do not render header tabs (only the input)
   */
  noHeaderTabs?: boolean | undefined;
  /**
   * Do not render footer; Useful when you want a specific view ('default-view' prop) and don't want the user to be able to switch it
   */
  noFooter?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: string | null) => void;
  /**
   * Emitted on lazy model value change (after user finishes selecting a color)
   * @param value New model value
   */
  onChange?: (value: any) => void;
}

export interface QColorSlots {}

export interface QColor extends ComponentPublicInstance<QColorProps> {}

export interface QDateProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Display the component in landscape mode
   */
  landscape?: boolean | undefined;
  /**
   * Mask (formatting string) used for parsing and formatting value
   * Default value: YYYY/MM/DD
   */
  mask?: string | undefined;
  /**
   * Locale formatting options
   */
  locale?:
    | {
        /**
         * List of full day names (DDDD), starting with Sunday
         */
        days?: readonly any[];
        /**
         * List of short day names (DDD), starting with Sunday
         */
        daysShort?: readonly any[];
        /**
         * List of full month names (MMMM), starting with January
         */
        months?: readonly any[];
        /**
         * List of short month names (MMM), starting with January
         */
        monthsShort?: readonly any[];
      }
    | undefined;
  /**
   * Specify calendar type
   * Default value: gregorian
   */
  calendar?: "gregorian" | "persian" | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a 'flat' design (no default shadow)
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Date(s) of the component; Must be Array if using 'multiple' prop; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue: string | any[] | any | null | undefined;
  /**
   * When specified, it overrides the default header title; Makes sense when not in 'minimal' mode
   */
  title?: string | undefined;
  /**
   * When specified, it overrides the default header subtitle; Makes sense when not in 'minimal' mode
   */
  subtitle?: string | undefined;
  /**
   * The default year and month to display (in YYYY/MM format) when model is unfilled (undefined or null); Please ensure it is within the navigation min/max year-month (if using them)
   */
  defaultYearMonth?: string | undefined;
  /**
   * The view which will be displayed by default
   * Default value: Calendar
   */
  defaultView?: "Calendar" | "Months" | "Years" | undefined;
  /**
   * Show the years selector in months view
   */
  yearsInMonthView?: boolean | undefined;
  /**
   * A list of events to highlight on the calendar; If using a function, it receives the date as a String and must return a Boolean (matches or not); If using a function then for best performance, reference it from your scope and do not define it inline
   * @param date The current date being processed.
   * @returns If true, the current date will be highlighted
   */
  events?: readonly any[] | ((date: string) => boolean) | undefined;
  /**
   * Color name (from the Quasar Color Palette); If using a function, it receives the date as a String and must return a String (color for the received date); If using a function then for best performance, reference it from your scope and do not define it inline
   * @param date The current date being processed.
   * @returns Color for the current date.
   */
  eventColor?: string | ((date: string) => string) | undefined;
  /**
   * Optionally configure the days that are selectable; If using a function, it receives the date as a String and must return a Boolean (is date acceptable or not); If using a function then for best performance, reference it from your scope and do not define it inline; Incompatible with 'range' prop
   * @param date The current date being processed.
   * @returns If true, the current date will be made available for selection
   */
  options?: readonly any[] | ((date: string) => boolean) | undefined;
  /**
   * Lock user from navigating below a specific year+month (in YYYY/MM format); This prop is not used to correct the model; You might want to also use 'default-year-month' prop
   */
  navigationMinYearMonth?: string | undefined;
  /**
   * Lock user from navigating above a specific year+month (in YYYY/MM format); This prop is not used to correct the model; You might want to also use 'default-year-month' prop
   */
  navigationMaxYearMonth?: string | undefined;
  /**
   * Remove ability to unselect a date; It does not apply to selecting a range over already selected dates
   */
  noUnset?: boolean | undefined;
  /**
   * Sets the day of the week that is considered the first day (0 - Sunday, 1 - Monday, ...); This day will show in the left-most column of the calendar
   * Default value: (based on configured Quasar lang language)
   */
  firstDayOfWeek?: string | number | undefined;
  /**
   * Display a button that selects the current day
   */
  todayBtn?: boolean | undefined;
  /**
   * Don’t display the header
   */
  minimal?: boolean | undefined;
  /**
   * Allow multiple selection; Model must be Array
   */
  multiple?: boolean | undefined;
  /**
   * Allow range selection; Partial compatibility with 'options' prop: selected ranges might also include 'unselectable' days
   */
  range?: boolean | undefined;
  /**
   * Emit model when user browses month and year too; ONLY for single selection (non-multiple, non-range)
   */
  emitImmediately?: boolean | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   * @param reason Reason of the user interaction (what was picked)
   * @param details Object of properties on the new model
   */
  "onUpdate:modelValue"?: (
    value: string | readonly any[] | any | null,
    reason:
      | "add-day"
      | "remove-day"
      | "add-range"
      | "remove-range"
      | "mask"
      | "locale"
      | "year"
      | "month",
    details: {
      /**
       * The year of the date that the user has clicked/tapped on
       */
      year: number;
      /**
       * The month of the date that the user has clicked/tapped on
       */
      month: number;
      /**
       * The day of the month that the user has clicked/tapped on
       */
      day: number;
      /**
       * Object of properties of the range starting point (only if range)
       */
      from?: {
        /**
         * The year
         */
        year: number;
        /**
         * The month
         */
        month: number;
        /**
         * The day of month
         */
        day: number;
      };
      /**
       * Object of properties of the range ending point (only if range)
       */
      to?: {
        /**
         * The year
         */
        year: number;
        /**
         * The month
         */
        month: number;
        /**
         * The day of month
         */
        day: number;
      };
    }
  ) => void;
  /**
   * Emitted when user navigates to a different month or year (and even when the model changes from an outside source)
   * @param view Definition of the current view (year, month)
   */
  onNavigation?: (view: {
    /**
     * The year
     */
    year: number;
    /**
     * The month
     */
    month: number;
  }) => void;
  /**
   * User has started a range selection
   * @param from Definition of date from where the range begins
   */
  onRangeStart?: (from: {
    /**
     * The year
     */
    year: number;
    /**
     * The month
     */
    month: number;
    /**
     * The day of month
     */
    day: number;
  }) => void;
  /**
   * User has ended a range selection
   * @param range Definition of the range
   */
  onRangeEnd?: (range: {
    /**
     * Definition of date from where the range begins
     */
    from: {
      /**
       * The year
       */
      year: number;
      /**
       * The month
       */
      month: number;
      /**
       * The day of month
       */
      day: number;
    };
    /**
     * Definition of date to where the range ends
     */
    to: {
      /**
       * The year
       */
      year: number;
      /**
       * The month
       */
      month: number;
      /**
       * The day of month
       */
      day: number;
    };
  }) => void;
}

export interface QDateSlots {
  /**
   * This is where additional buttons can go
   */
  default: () => VNode[];
}

export interface QDate extends ComponentPublicInstance<QDateProps> {
  /**
   * Change model to today
   */
  setToday: () => void;
  /**
   * Change current view
   * @param view QDate view name
   */
  setView: (view: "Calendar" | "Months" | "Years") => void;
  /**
   * Increment or decrement calendar view's month or year
   * @param type What to increment/decrement
   * @param descending Decrement?
   */
  offsetCalendar: (type: "month" | "year", descending?: boolean) => void;
  /**
   * Change current year and month of the Calendar view; It gets corrected if using navigation-min/max-year-month and sets the current view to Calendar
   * @param year The year
   * @param month The month
   */
  setCalendarTo: (year?: number, month?: number) => void;
  /**
   * Configure the current editing range
   * @param from Definition of date from where the range begins
   * @param to Definition of date to where the range ends
   */
  setEditingRange: (
    from?: {
      /**
       * The year
       */
      year?: number;
      /**
       * The month
       */
      month?: number;
      /**
       * The day of month
       */
      day?: number;
    },
    to?: {
      /**
       * The year
       */
      year?: number;
      /**
       * The month
       */
      month?: number;
      /**
       * The day of month
       */
      day?: number;
    }
  ) => void;
}

export interface QDialogProps {
  /**
   * One of Quasar's embedded transitions
   * Default value: fade
   */
  transitionShow?: string | undefined;
  /**
   * One of Quasar's embedded transitions
   * Default value: fade
   */
  transitionHide?: string | undefined;
  /**
   * Transition duration (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Model of the component defining shown/hidden state; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue?: boolean;
  /**
   * User cannot dismiss Dialog if clicking outside of it or hitting ESC key; Also, an app route change won't dismiss it
   */
  persistent?: boolean | undefined;
  /**
   * User cannot dismiss Dialog by hitting ESC key; No need to set it if 'persistent' prop is also set
   */
  noEscDismiss?: boolean | undefined;
  /**
   * User cannot dismiss Dialog by clicking outside of it; No need to set it if 'persistent' prop is also set
   */
  noBackdropDismiss?: boolean | undefined;
  /**
   * Changing route app won't dismiss Dialog; No need to set it if 'persistent' prop is also set
   */
  noRouteDismiss?: boolean | undefined;
  /**
   * Any click/tap inside of the dialog will close it
   */
  autoClose?: boolean | undefined;
  /**
   * Put Dialog into seamless mode; Does not use a backdrop so user is able to interact with the rest of the page too
   */
  seamless?: boolean | undefined;
  /**
   * Put Dialog into maximized mode
   */
  maximized?: boolean | undefined;
  /**
   * Dialog will try to render with same width as the window
   */
  fullWidth?: boolean | undefined;
  /**
   * Dialog will try to render with same height as the window
   */
  fullHeight?: boolean | undefined;
  /**
   * Stick dialog to one of the sides (top, right, bottom or left)
   * Default value: standard
   */
  position?: "standard" | "top" | "right" | "bottom" | "left" | undefined;
  /**
   * Forces content to have squared borders
   */
  square?: boolean | undefined;
  /**
   * (Accessibility) When Dialog gets hidden, do not refocus on the DOM element that previously had focus
   */
  noRefocus?: boolean | undefined;
  /**
   * (Accessibility) When Dialog gets shown, do not switch focus on it
   */
  noFocus?: boolean | undefined;
  /**
   * Do not shake up the Dialog to catch user's attention
   */
  noShake?: boolean | undefined;
  /**
   * Allow elements outside of the Dialog to be focusable; By default, for accessibility reasons, QDialog does not allow outer focus
   */
  allowFocusOutside?: boolean | undefined;
  /**
   * Emitted when showing/hidden state changes; Is also used by v-model
   * @param value New state (showing/hidden)
   */
  "onUpdate:modelValue"?: (value: boolean) => void;
  /**
   * Emitted after component has triggered show()
   * @param evt JS event object
   */
  onShow?: (evt: Event) => void;
  /**
   * Emitted when component triggers show() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeShow?: (evt: Event) => void;
  /**
   * Emitted after component has triggered hide()
   * @param evt JS event object
   */
  onHide?: (evt: Event) => void;
  /**
   * Emitted when component triggers hide() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeHide?: (evt: Event) => void;
  /**
   * Emitted when the Dialog shakes in order to catch user's attention, unless the 'no-shake' property is set
   */
  onShake?: () => void;
  /**
   * Emitted when ESC key is pressed; Does not get emitted if Dialog is 'persistent' or it has 'no-esc-key' set
   */
  onEscapeKey?: () => void;
}

export interface QDialogSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QDialog extends ComponentPublicInstance<QDialogProps> {
  /**
   * Triggers component to show
   * @param evt JS event object
   */
  show: (evt?: Event) => void;
  /**
   * Triggers component to hide
   * @param evt JS event object
   */
  hide: (evt?: Event) => void;
  /**
   * Triggers component to toggle between show/hide
   * @param evt JS event object
   */
  toggle: (evt?: Event) => void;
  /**
   * Focus dialog; if you have content with autofocus attribute, it will directly focus it
   * @param selector Optional CSS selector to override default focusable element
   */
  focus: (selector?: string) => void;
  /**
   * Shakes dialog
   * @param focusTarget Optional DOM Element to be focused after shake
   */
  shake: (focusTarget?: Element) => void;
  /**
   * The DOM Element of the rendered content
   */
  readonly contentEl: Element;
}

export interface QDrawerProps {
  /**
   * Model of the component defining shown/hidden state; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue?: boolean;
  /**
   * Side to attach to
   * Default value: left
   */
  side?: "left" | "right" | undefined;
  /**
   * Puts drawer into overlay mode (does not occupy space on screen, narrowing the page)
   */
  overlay?: boolean | undefined;
  /**
   * Width of drawer (in pixels)
   * Default value: 300
   */
  width?: number | undefined;
  /**
   * Puts drawer into mini mode
   */
  mini?: boolean | undefined;
  /**
   * Width of drawer (in pixels) when in mini mode
   * Default value: 60
   */
  miniWidth?: number | undefined;
  /**
   * Mini mode will expand as an overlay
   */
  miniToOverlay?: boolean | undefined;
  /**
   * Disables animation of the drawer when toggling mini mode
   */
  noMiniAnimation?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Breakpoint (in pixels) of layout width up to which mobile mode is used
   * Default value: 1023
   */
  breakpoint?: number | undefined;
  /**
   * Overrides the default dynamic mode into which the drawer is put on
   * Default value: default
   */
  behavior?: "default" | "desktop" | "mobile" | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Adds a default shadow to the header
   */
  elevated?: boolean | undefined;
  /**
   * Prevents drawer from auto-closing when app's route changes
   */
  persistent?: boolean | undefined;
  /**
   * Forces drawer to be shown on screen on initial render if the layout width is above breakpoint, regardless of v-model; This is the default behavior when SSR is taken over by client on initial render
   */
  showIfAbove?: boolean | undefined;
  /**
   * Disables the default behavior where drawer can be swiped into view; Useful for iOS platforms where it might interfere with Safari's 'swipe to go to previous/next page' feature
   */
  noSwipeOpen?: boolean | undefined;
  /**
   * Disables the default behavior where drawer can be swiped out of view (applies to drawer content only); Useful for iOS platforms where it might interfere with Safari's 'swipe to go to previous/next page' feature
   */
  noSwipeClose?: boolean | undefined;
  /**
   * Disables the default behavior where drawer backdrop can be swiped
   */
  noSwipeBackdrop?: boolean | undefined;
  /**
   * Emitted when showing/hidden state changes; Is also used by v-model
   * @param value New state (showing/hidden)
   */
  "onUpdate:modelValue"?: (value: boolean) => void;
  /**
   * Emitted after component has triggered show()
   * @param evt JS event object
   */
  onShow?: (evt: Event) => void;
  /**
   * Emitted when component triggers show() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeShow?: (evt: Event) => void;
  /**
   * Emitted after component has triggered hide()
   * @param evt JS event object
   */
  onHide?: (evt: Event) => void;
  /**
   * Emitted when component triggers hide() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeHide?: (evt: Event) => void;
  /**
   * Emitted when drawer toggles between occupying space on page or not
   * @param state New state
   */
  onOnLayout?: (state: boolean) => void;
  /**
   * Emitted when user clicks/taps on the component and drawer is NOT in mobile mode; Useful for when taking a decision to toggle mini mode
   * @param evt JS event object
   */
  onClick?: (evt: Event) => void;
  /**
   * Emitted when user moves mouse cursor over the component and drawer is NOT in mobile mode; Useful for when taking a decision to toggle mini mode
   * @param evt JS event object
   */
  onMouseover?: (evt: Event) => void;
  /**
   * Emitted when user moves mouse cursor out of the component and drawer is NOT in mobile mode; Useful for when taking a decision to toggle mini mode
   * @param evt JS event object
   */
  onMouseout?: (evt: Event) => void;
  /**
   * Emitted when drawer changes the mini-mode state (sometimes it is forced to do so)
   * @param state New state
   */
  onMiniState?: (state: boolean) => void;
}

export interface QDrawerSlots {
  /**
   * Default slot in the devland unslotted content of the component (overridden by 'mini' slot if used and drawer is in mini mode)
   */
  default: () => VNode[];
  /**
   * Content to show when in mini mode (overrides 'default' slot)
   */
  mini: () => VNode[];
}

export interface QDrawer extends ComponentPublicInstance<QDrawerProps> {
  /**
   * Triggers component to show
   * @param evt JS event object
   */
  show: (evt?: Event) => void;
  /**
   * Triggers component to hide
   * @param evt JS event object
   */
  hide: (evt?: Event) => void;
  /**
   * Triggers component to toggle between show/hide
   * @param evt JS event object
   */
  toggle: (evt?: Event) => void;
}

export interface QEditorProps {
  /**
   * Fullscreen mode
   */
  fullscreen?: boolean | undefined;
  /**
   * Changing route app won't exit fullscreen
   */
  noRouteFullscreenExit?: boolean | undefined;
  /**
   * Model of the component; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue: string;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a 'flat' design (no borders)
   */
  flat?: boolean | undefined;
  /**
   * Dense mode; toolbar buttons are shown on one-line only
   */
  dense?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * CSS unit for the minimum height of the editable area
   * Default value: 10rem
   */
  minHeight?: string | undefined;
  /**
   * CSS unit for maximum height of the input area
   */
  maxHeight?: string | undefined;
  /**
   * CSS value to set the height of the editable area
   */
  height?: string | undefined;
  /**
   * Definition of commands and their buttons to be included in the 'toolbar' prop
   */
  definitions?: {
    /**
     * Command definition
     */
    [commandName: string]: QEditorCommand | undefined;
  };
  /**
   * Object with definitions of fonts
   */
  fonts?: any | undefined;
  /**
   * An array of arrays of Objects/Strings that you use to define the construction of the elements and commands available in the toolbar
   * Default value: left,center,right,justify,bold,italic,underline,strike,undo,redo
   */
  toolbar?: readonly any[] | undefined;
  /**
   * Font color (from the Quasar Palette) of buttons and text in the toolbar
   */
  toolbarColor?: NamedColor | undefined;
  /**
   * Text color (from the Quasar Palette) of toolbar commands
   */
  toolbarTextColor?: NamedColor | undefined;
  /**
   * Choose the active color (from the Quasar Palette) of toolbar commands button
   * Default value: primary
   */
  toolbarToggleColor?: string | undefined;
  /**
   * Toolbar background color (from Quasar Palette)
   * Default value: grey-3
   */
  toolbarBg?: string | undefined;
  /**
   * Toolbar buttons are rendered "outlined"
   */
  toolbarOutline?: boolean | undefined;
  /**
   * Toolbar buttons are rendered as a "push-button" type
   */
  toolbarPush?: boolean | undefined;
  /**
   * Toolbar buttons are rendered "rounded"
   */
  toolbarRounded?: boolean | undefined;
  /**
   * Paragraph tag to be used
   */
  paragraphTag?: "div" | "p" | undefined;
  /**
   * Object with CSS properties and values for styling the container of QEditor
   */
  contentStyle?: VueStyleObjectProp | undefined;
  /**
   * CSS classes for the input area
   */
  contentClass?: VueClassProp | undefined;
  /**
   * Text to display as placeholder
   */
  placeholder?: string | undefined;
  /**
   * Emitted when fullscreen state changes
   * @param value Fullscreen state (showing/hidden)
   */
  onFullscreen?: (value: boolean) => void;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value The pure HTML of the content
   */
  "onUpdate:modelValue"?: (value: string) => void;
  /**
   * Emitted after a dropdown in the toolbar has triggered show()
   * @param evt JS event object
   */
  onDropdownShow?: (evt: Event) => void;
  /**
   * Emitted when a dropdown in the toolbar triggers show() but before it finishes doing it
   * @param evt JS event object
   */
  onDropdownBeforeShow?: (evt: Event) => void;
  /**
   * Emitted after a dropdown in the toolbar has triggered hide()
   * @param evt JS event object
   */
  onDropdownHide?: (evt: Event) => void;
  /**
   * Emitted when a dropdown in the toolbar triggers hide() but before it finishes doing it
   * @param evt JS event object
   */
  onDropdownBeforeHide?: (evt: Event) => void;
  /**
   * Emitted when the toolbar for editing a link is shown
   */
  onLinkShow?: () => void;
  /**
   * Emitted when the toolbar for editing a link is hidden
   */
  onLinkHide?: () => void;
}

export interface QEditorSlots {
  /**
   * Content for the given command in the toolbar
   */
  [key: `${string}`]: () => VNode[];
}

export interface QEditor extends ComponentPublicInstance<QEditorProps> {
  /**
   * Toggle the view to be fullscreen or not fullscreen
   */
  toggleFullscreen: () => void;
  /**
   * Enter the fullscreen view
   */
  setFullscreen: () => void;
  /**
   * Leave the fullscreen view
   */
  exitFullscreen: () => void;
  /**
   * Run contentEditable command at caret position and range
   * @param cmd Must be a valid execCommand method according to the designMode API
   * @param param The argument to pass to the command
   * @param update Refresh the toolbar
   */
  runCmd: (cmd: string, param?: string, update?: boolean) => void;
  /**
   * Hide the link editor if visible and force the instance to re-render
   */
  refreshToolbar: () => void;
  /**
   * Focus on the contentEditable at saved cursor position
   */
  focus: () => void;
  /**
   * Retrieve the content of the Editor
   * @returns Provides the pure HTML within the editable area
   */
  getContentEl: () => Element;
  /**
   * The current caret state
   */
  readonly caret: QEditorCaret;
}

export interface QExpansionItemProps {
  /**
   * Equivalent to Vue Router <router-link> 'to' property; Superseded by 'href' prop if used
   */
  to?: string | any | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'exact' property; Superseded by 'href' prop if used
   */
  exact?: boolean | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'replace' property; Superseded by 'href' prop if used
   */
  replace?: boolean | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used
   */
  activeClass?: string | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used
   */
  exactActiveClass?: string | undefined;
  /**
   * Native <a> link href attribute; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props
   */
  href?: string | undefined;
  /**
   * Native <a> link target attribute; Use it only along with 'href' prop; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props
   */
  target?: string | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Model of the component defining 'open' state; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue?: boolean;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  expandIcon?: string | undefined;
  /**
   * Expand icon name (following Quasar convention) for when QExpansionItem is expanded; When used, it also disables the rotation animation of the expand icon; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  expandedIcon?: string | undefined;
  /**
   * Apply custom class(es) to the expand icon item section
   */
  expandIconClass?: VueClassProp | undefined;
  /**
   * aria-label to be used on the expansion toggle element
   */
  toggleAriaLabel?: string | undefined;
  /**
   * Header label (unless using 'header' slot)
   */
  label?: string | undefined;
  /**
   * Apply ellipsis when there's not enough space to render on the specified number of lines; If more than one line specified, then it will only work on webkit browsers because it uses the '-webkit-line-clamp' CSS property!
   */
  labelLines?: number | string | undefined;
  /**
   * Header sub-label (unless using 'header' slot)
   */
  caption?: string | undefined;
  /**
   * Apply ellipsis when there's not enough space to render on the specified number of lines; If more than one line specified, then it will only work on webkit browsers because it uses the '-webkit-line-clamp' CSS property!
   */
  captionLines?: number | string | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Animation duration (in milliseconds)
   * Default value: 300
   */
  duration?: number | undefined;
  /**
   * Apply an inset to header (unless using 'header' slot); Useful when header avatar/left side is missing but you want to align content with other items that do have a left side, or when you're building a menu
   */
  headerInsetLevel?: number | undefined;
  /**
   * Apply an inset to content (changes content padding)
   */
  contentInsetLevel?: number | undefined;
  /**
   * Apply a top and bottom separator when expansion item is opened
   */
  expandSeparator?: boolean | undefined;
  /**
   * Puts expansion item into open state on initial render; Overridden by v-model if used
   */
  defaultOpened?: boolean | undefined;
  /**
   * Do not show the expand icon
   */
  hideExpandIcon?: boolean | undefined;
  /**
   * Applies the expansion events to the expand icon only and not to the whole header
   */
  expandIconToggle?: boolean | undefined;
  /**
   * Switch expand icon side (from default 'right' to 'left')
   */
  switchToggleSide?: boolean | undefined;
  /**
   * Use dense mode for expand icon
   */
  denseToggle?: boolean | undefined;
  /**
   * Register expansion item into a group (unique name that must be applied to all expansion items in that group) for coordinated open/close state within the group a.k.a. 'accordion mode'
   */
  group?: string | undefined;
  /**
   * Put expansion list into 'popup' mode
   */
  popup?: boolean | undefined;
  /**
   * Apply custom style to the header
   */
  headerStyle?: VueStyleProp | undefined;
  /**
   * Apply custom class(es) to the header
   */
  headerClass?: VueClassProp | undefined;
  /**
   * Emitted when showing/hidden state changes; Is also used by v-model
   * @param value New state (showing/hidden)
   */
  "onUpdate:modelValue"?: (value: boolean) => void;
  /**
   * Emitted after component has triggered show()
   * @param evt JS event object
   */
  onShow?: (evt: Event) => void;
  /**
   * Emitted when component triggers show() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeShow?: (evt: Event) => void;
  /**
   * Emitted after component has triggered hide()
   * @param evt JS event object
   */
  onHide?: (evt: Event) => void;
  /**
   * Emitted when component triggers hide() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeHide?: (evt: Event) => void;
  /**
   * Emitted when component show animation is finished
   */
  onAfterShow?: () => void;
  /**
   * Emitted when component hide animation is finished
   */
  onAfterHide?: () => void;
}

export interface QExpansionItemSlots {
  /**
   * Slot used for expansion item's content
   */
  default: () => VNode[];
  /**
   * Slot used for overriding default header
   * @param scope
   */
  header: (scope: {
    /**
     * QExpansionItem expanded status
     */
    expanded: boolean;
    /**
     * QExpansionItem details panel id (for use in aria-controls)
     */
    detailsId: string;
    /**
     * Triggers component to show
     * @param evt JS event object
     */
    show: (evt?: any) => void;
    /**
     * Triggers component to hide
     * @param evt JS event object
     */
    hide: (evt?: any) => void;
    /**
     * Triggers component to toggle between show/hide
     * @param evt JS event object
     */
    toggle: (evt?: any) => void;
  }) => VNode[];
}

export interface QExpansionItem
  extends ComponentPublicInstance<QExpansionItemProps> {
  /**
   * Triggers component to show
   * @param evt JS event object
   */
  show: (evt?: Event) => void;
  /**
   * Triggers component to hide
   * @param evt JS event object
   */
  hide: (evt?: Event) => void;
  /**
   * Triggers component to toggle between show/hide
   * @param evt JS event object
   */
  toggle: (evt?: Event) => void;
}

export interface QFabProps {
  /**
   * Define the button HTML DOM type
   * Default value: a
   */
  type?: "a" | "submit" | "button" | "reset" | undefined;
  /**
   * Use 'outline' design for Fab button
   */
  outline?: boolean | undefined;
  /**
   * Use 'push' design for Fab button
   */
  push?: boolean | undefined;
  /**
   * Use 'flat' design for Fab button
   */
  flat?: boolean | undefined;
  /**
   * Remove shadow
   */
  unelevated?: boolean | undefined;
  /**
   * Apply custom padding (vertical [horizontal]); Size in CSS units, including unit name or standard size name (none|xs|sm|md|lg|xl); Also removes the min width and height when set
   */
  padding?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Apply the glossy effect over the button
   */
  glossy?: boolean | undefined;
  /**
   * Display label besides the FABs, as external content
   */
  externalLabel?: boolean | undefined;
  /**
   * The label that will be shown when Fab is extended
   */
  label?: string | number | undefined;
  /**
   * Position of the label around the icon
   */
  labelPosition?: "top" | "right" | "bottom" | "left" | undefined;
  /**
   * Hide the label; Useful for animation purposes where you toggle the visibility of the label
   */
  hideLabel?: boolean | undefined;
  /**
   * Class definitions to be attributed to the label container
   */
  labelClass?: VueClassProp | undefined;
  /**
   * Style definitions to be attributed to the label container
   */
  labelStyle?: VueStyleProp | undefined;
  /**
   * Apply a rectangle aspect to the FAB
   */
  square?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Controls state of fab actions (showing/hidden); Works best with v-model directive, otherwise use along listening to 'update:modelValue' event
   */
  modelValue?: boolean;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  activeIcon?: string | undefined;
  /**
   * Hide the icon (don't use any)
   */
  hideIcon?: boolean | undefined;
  /**
   * Direction to expand Fab Actions to
   * Default value: right
   */
  direction?: "up" | "right" | "down" | "left" | undefined;
  /**
   * The side of the Fab where Fab Actions will expand (only when direction is 'up' or 'down')
   * Default value: center
   */
  verticalActionsAlign?: "left" | "center" | "right" | undefined;
  /**
   * By default, Fab Actions are hidden when user navigates to another route and this prop disables this behavior
   */
  persistent?: boolean | undefined;
  /**
   * Emitted when fab actions are shown/hidden; Captured by v-model directive
   * @param value New state (showing/hidden)
   */
  "onUpdate:modelValue"?: (value: boolean) => void;
  /**
   * Emitted after component has triggered show()
   * @param evt JS event object
   */
  onShow?: (evt: Event) => void;
  /**
   * Emitted when component triggers show() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeShow?: (evt: Event) => void;
  /**
   * Emitted after component has triggered hide()
   * @param evt JS event object
   */
  onHide?: (evt: Event) => void;
  /**
   * Emitted when component triggers hide() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeHide?: (evt: Event) => void;
}

export interface QFabSlots {
  /**
   * This is where QFabActions may go into
   */
  default: () => VNode[];
  /**
   * Slot specifically designed for a QTooltip
   */
  tooltip: () => VNode[];
  /**
   * Slot for icon shown when FAB is closed; Suggestion: QIcon
   * @param scope
   */
  icon: (scope: {
    /**
     * FAB is opened
     */
    opened: boolean;
  }) => VNode[];
  /**
   * Slot for icon shown when FAB is opened; Suggestion: QIcon
   * @param scope
   */
  "active-icon": (scope: {
    /**
     * FAB is opened
     */
    opened: boolean;
  }) => VNode[];
  /**
   * Slot for label
   * @param scope
   */
  label: (scope: {
    /**
     * FAB is opened
     */
    opened: boolean;
  }) => VNode[];
}

export interface QFab extends ComponentPublicInstance<QFabProps> {
  /**
   * Expands fab actions list
   * @param evt JS event object
   */
  show: (evt?: Event) => void;
  /**
   * Collapses fab actions list
   * @param evt JS event object
   */
  hide: (evt?: Event) => void;
  /**
   * Triggers component to toggle between show/hide
   * @param evt JS event object
   */
  toggle: (evt?: Event) => void;
}

export interface QFabActionProps {
  /**
   * Define the button HTML DOM type
   * Default value: a
   */
  type?: "a" | "submit" | "button" | "reset" | undefined;
  /**
   * Use 'outline' design for Fab button
   */
  outline?: boolean | undefined;
  /**
   * Use 'push' design for Fab button
   */
  push?: boolean | undefined;
  /**
   * Use 'flat' design for Fab button
   */
  flat?: boolean | undefined;
  /**
   * Remove shadow
   */
  unelevated?: boolean | undefined;
  /**
   * Apply custom padding (vertical [horizontal]); Size in CSS units, including unit name or standard size name (none|xs|sm|md|lg|xl); Also removes the min width and height when set
   */
  padding?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Apply the glossy effect over the button
   */
  glossy?: boolean | undefined;
  /**
   * Display label besides the FABs, as external content
   */
  externalLabel?: boolean | undefined;
  /**
   * The label that will be shown when Fab is extended
   */
  label?: string | number | undefined;
  /**
   * Position of the label around the icon
   */
  labelPosition?: "top" | "right" | "bottom" | "left" | undefined;
  /**
   * Hide the label; Useful for animation purposes where you toggle the visibility of the label
   */
  hideLabel?: boolean | undefined;
  /**
   * Class definitions to be attributed to the label container
   */
  labelClass?: VueClassProp | undefined;
  /**
   * Style definitions to be attributed to the label container
   */
  labelStyle?: VueStyleProp | undefined;
  /**
   * Apply a rectangle aspect to the FAB
   */
  square?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * How to align the Fab Action relative to Fab expand side; By default it uses the align specified in QFab
   */
  anchor?: "start" | "center" | "end" | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'to' property
   */
  to?: string | any | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'replace' property
   */
  replace?: boolean | undefined;
  /**
   * Emitted when user clicks/taps on the component
   * @param evt JS event object
   */
  onClick?: (evt: Event) => void;
}

export interface QFabActionSlots {
  /**
   * Suggestion for this slot: QTooltip
   */
  default: () => VNode[];
  /**
   * Slot for icon; Suggestion: QIcon
   */
  icon: () => VNode[];
  /**
   * Slot for label
   */
  label: () => VNode[];
}

export interface QFabAction extends ComponentPublicInstance<QFabActionProps> {
  /**
   * Emulate click on QFabAction
   * @param evt JS event object
   */
  click: (evt?: Event) => void;
}

export interface QFieldProps {
  /**
   * Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue?: any;
  /**
   * Does field have validation errors?
   */
  error?: boolean | undefined;
  /**
   * Validation error message (gets displayed only if 'error' is set to 'true')
   */
  errorMessage?: string | undefined;
  /**
   * Hide error icon when there is an error
   */
  noErrorIcon?: boolean | undefined;
  /**
   * Array of Functions/Strings; If String, then it must be a name of one of the embedded validation rules
   */
  rules?: ValidationRule[] | undefined;
  /**
   * By default a change in the rules does not trigger a new validation until the model changes; If set to true then a change in the rules will trigger a validation; Has a performance penalty, so use it only when you really need it
   */
  reactiveRules?: boolean | undefined;
  /**
   * If set to boolean true then it checks validation status against the 'rules' only after field loses focus for first time; If set to 'ondemand' then it will trigger only when component's validate() method is manually called or when the wrapper QForm submits itself
   */
  lazyRules?: boolean | "ondemand" | undefined;
  /**
   * A text label that will “float” up above the input field, once the field gets focus
   */
  label?: string | undefined;
  /**
   * Label will be always shown above the field regardless of field content (if any)
   */
  stackLabel?: boolean | undefined;
  /**
   * Helper (hint) text which gets placed below your wrapped form component
   */
  hint?: string | undefined;
  /**
   * Hide the helper (hint) text when field doesn't have focus
   */
  hideHint?: boolean | undefined;
  /**
   * Prefix
   */
  prefix?: string | undefined;
  /**
   * Suffix
   */
  suffix?: string | undefined;
  /**
   * Color name for the label from the Quasar Color Palette; Overrides the 'color' prop; The difference from 'color' prop is that the label will always have this color, even when field is not focused
   */
  labelColor?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  bgColor?: NamedColor | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Signals the user a process is in progress by displaying a spinner; Spinner can be customized by using the 'loading' slot.
   */
  loading?: boolean | undefined;
  /**
   * Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null
   */
  clearable?: boolean | undefined;
  /**
   * Custom icon to use for the clear button when using along with 'clearable' prop
   */
  clearIcon?: string | undefined;
  /**
   * Use 'filled' design for the field
   */
  filled?: boolean | undefined;
  /**
   * Use 'outlined' design for the field
   */
  outlined?: boolean | undefined;
  /**
   * Use 'borderless' design for the field
   */
  borderless?: boolean | undefined;
  /**
   * Use 'standout' design for the field; Specifies classes to be applied when focused (overriding default ones)
   */
  standout?: boolean | string | undefined;
  /**
   * Enables label slot; You need to set it to force use of the 'label' slot if the 'label' prop is not set
   */
  labelSlot?: boolean | undefined;
  /**
   * Enables bottom slots ('error', 'hint', 'counter')
   */
  bottomSlots?: boolean | undefined;
  /**
   * Do not reserve space for hint/error/counter anymore when these are not used; As a result, it also disables the animation for those; It also allows the hint/error area to stretch vertically based on its content
   */
  hideBottomSpace?: boolean | undefined;
  /**
   * Show an automatic counter on bottom right
   */
  counter?: boolean | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
  /**
   * Remove border-radius so borders are squared; Overrides 'rounded' prop
   */
  square?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Match inner content alignment to that of QItem
   */
  itemAligned?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Focus field on initial component render
   */
  autofocus?: boolean | undefined;
  /**
   * Used to specify the 'id' of the control and also the 'for' attribute of the label that wraps it; If no 'name' prop is specified, then it is used for this attribute as well
   */
  for?: string | undefined;
  /**
   * Used to specify the name of the control; Useful if dealing with forms; If not specified, it takes the value of 'for' prop, if it exists
   */
  name?: string | undefined;
  /**
   * Specify a max length of model
   */
  maxlength?: string | number | undefined;
  /**
   * When using the 'clearable' property, this event is emitted when the clear icon is clicked
   * @param value The previous value before clearing it
   */
  onClear?: (value: any) => void;
  /**
   * Emitted when the model changes, only when used with 'clearable' or the 'control' scoped slot.
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: any) => void;
  /**
   * Emitted when component gets focused
   * @param evt JS event object
   */
  onFocus?: (evt: Event) => void;
  /**
   * Emitted when component loses focus
   * @param evt JS event object
   */
  onBlur?: (evt: Event) => void;
}

export interface QFieldSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
  /**
   * Prepend inner field; Suggestions: QIcon, QBtn
   */
  prepend: () => VNode[];
  /**
   * Append to inner field; Suggestions: QIcon, QBtn
   */
  append: () => VNode[];
  /**
   * Prepend outer field; Suggestions: QIcon, QBtn
   */
  before: () => VNode[];
  /**
   * Append outer field; Suggestions: QIcon, QBtn
   */
  after: () => VNode[];
  /**
   * Slot for label; Used only if 'label-slot' prop is set or the 'label' prop is set; When it is used the text in the 'label' prop is ignored
   */
  label: () => VNode[];
  /**
   * Slot for errors; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  error: () => VNode[];
  /**
   * Slot for hint text; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  hint: () => VNode[];
  /**
   * Slot for counter text; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  counter: () => VNode[];
  /**
   * Override default spinner when component is in loading mode; Use in conjunction with 'loading' prop
   */
  loading: () => VNode[];
  /**
   * Slot for controls; Suggestion QSlider, QRange, QKnob, ...
   * @param scope
   */
  control: (scope: {
    /**
     * Element id used in the `for` attribute of the field label. Can be used to link the control to the label
     */
    id: string;
    /**
     * DOM element of the field
     */
    field: Element;
    /**
     * Field is editable
     */
    editable: boolean;
    /**
     * Field has focus
     */
    focused: boolean;
    /**
     * Field's label is floating
     */
    floatingLabel: boolean;
    /**
     * Field's value
     */
    modelValue: any;
    /**
     * Function that emits an @input event in the context of the field
     * @param value Value to be emitted
     */
    emitValue: (value: any) => void;
  }) => VNode[];
}

export interface QField extends ComponentPublicInstance<QFieldProps> {
  /**
   * Reset validation status
   */
  resetValidation: () => void;
  /**
   * Trigger a validation
   * @param value Optional value to validate against
   * @returns True/false if no async rules, otherwise a Promise with the outcome (true -> validation was a success, false -> invalid models detected)
   */
  validate: (value?: any) => boolean | Promise<boolean>;
  /**
   * Focus field
   */
  focus: () => void;
  /**
   * Blur field (lose focus)
   */
  blur: () => void;
  /**
   * Whether the component is in error state
   */
  readonly hasError: boolean;
}

export interface QFileProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms; If not specified, it takes the value of 'for' prop, if it exists
   */
  name?: string | undefined;
  /**
   * Allow multiple file uploads
   */
  multiple?: boolean | undefined;
  /**
   * Comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element
   */
  accept?: string | undefined;
  /**
   * Optionally, specify that a new file should be captured, and which device should be used to capture that new media of a type defined by the 'accept' prop. Maps to 'capture' attribute of native input type=file element
   */
  capture?: "user" | "environment" | undefined;
  /**
   * Maximum size of individual file in bytes
   */
  maxFileSize?: number | string | undefined;
  /**
   * Maximum size of all files combined in bytes
   */
  maxTotalSize?: number | string | undefined;
  /**
   * Maximum number of files to contain
   */
  maxFiles?: number | string | undefined;
  /**
   * Custom filter for added files; Only files that pass this filter will be added to the queue and uploaded; For best performance, reference it from your scope and do not define it inline
   * @param files Candidate files to be added to queue
   * @returns Filtered files to be added to queue
   */
  filter?: ((files: FileList | readonly any[]) => readonly any[]) | undefined;
  /**
   * Model of the component; Must be FileList or Array if using 'multiple' prop; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue: File | FileList | any[] | null | undefined;
  /**
   * Does field have validation errors?
   */
  error?: boolean | undefined;
  /**
   * Validation error message (gets displayed only if 'error' is set to 'true')
   */
  errorMessage?: string | undefined;
  /**
   * Hide error icon when there is an error
   */
  noErrorIcon?: boolean | undefined;
  /**
   * Array of Functions/Strings; If String, then it must be a name of one of the embedded validation rules
   */
  rules?: ValidationRule[] | undefined;
  /**
   * By default a change in the rules does not trigger a new validation until the model changes; If set to true then a change in the rules will trigger a validation; Has a performance penalty, so use it only when you really need it
   */
  reactiveRules?: boolean | undefined;
  /**
   * If set to boolean true then it checks validation status against the 'rules' only after field loses focus for first time; If set to 'ondemand' then it will trigger only when component's validate() method is manually called or when the wrapper QForm submits itself
   */
  lazyRules?: boolean | "ondemand" | undefined;
  /**
   * A text label that will “float” up above the input field, once the field gets focus
   */
  label?: string | undefined;
  /**
   * Label will be always shown above the field regardless of field content (if any)
   */
  stackLabel?: boolean | undefined;
  /**
   * Helper (hint) text which gets placed below your wrapped form component
   */
  hint?: string | undefined;
  /**
   * Hide the helper (hint) text when field doesn't have focus
   */
  hideHint?: boolean | undefined;
  /**
   * Prefix
   */
  prefix?: string | undefined;
  /**
   * Suffix
   */
  suffix?: string | undefined;
  /**
   * Color name for the label from the Quasar Color Palette; Overrides the 'color' prop; The difference from 'color' prop is that the label will always have this color, even when field is not focused
   */
  labelColor?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  bgColor?: NamedColor | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Signals the user a process is in progress by displaying a spinner; Spinner can be customized by using the 'loading' slot.
   */
  loading?: boolean | undefined;
  /**
   * Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null
   */
  clearable?: boolean | undefined;
  /**
   * Custom icon to use for the clear button when using along with 'clearable' prop
   */
  clearIcon?: string | undefined;
  /**
   * Use 'filled' design for the field
   */
  filled?: boolean | undefined;
  /**
   * Use 'outlined' design for the field
   */
  outlined?: boolean | undefined;
  /**
   * Use 'borderless' design for the field
   */
  borderless?: boolean | undefined;
  /**
   * Use 'standout' design for the field; Specifies classes to be applied when focused (overriding default ones)
   */
  standout?: boolean | string | undefined;
  /**
   * Enables label slot; You need to set it to force use of the 'label' slot if the 'label' prop is not set
   */
  labelSlot?: boolean | undefined;
  /**
   * Enables bottom slots ('error', 'hint', 'counter')
   */
  bottomSlots?: boolean | undefined;
  /**
   * Do not reserve space for hint/error/counter anymore when these are not used; As a result, it also disables the animation for those; It also allows the hint/error area to stretch vertically based on its content
   */
  hideBottomSpace?: boolean | undefined;
  /**
   * Show an automatic counter on bottom right
   */
  counter?: boolean | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
  /**
   * Remove border-radius so borders are squared; Overrides 'rounded' prop
   */
  square?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Match inner content alignment to that of QItem
   */
  itemAligned?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Focus field on initial component render
   */
  autofocus?: boolean | undefined;
  /**
   * Used to specify the 'id' of the control and also the 'for' attribute of the label that wraps it; If no 'name' prop is specified, then it is used for this attribute as well
   */
  for?: string | undefined;
  /**
   * Append file(s) to current model rather than replacing them; Has effect only when using 'multiple' mode
   */
  append?: boolean | undefined;
  /**
   * Override default selection string, if not using 'file' or 'selected' scoped slots and if not using 'use-chips' prop
   */
  displayValue?: number | string | undefined;
  /**
   * Use QChip to show picked files
   */
  useChips?: boolean | undefined;
  /**
   * Label for the counter; The 'counter' prop is necessary to enable this one
   * @param props Object containing counter label information
   * @returns String to display for the counter label
   */
  counterLabel?:
    | ((props: {
        /**
         * The total size of files in human readable format
         */
        totalSize: string;
        /**
         * Number of picked files
         */
        filesNumber: number;
        /**
         * Maximum number of files (same as 'max-files' prop, if specified); When 'max-files' is not specified, this has 'void 0' as value
         */
        maxFiles: number | string;
      }) => string)
    | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Class definitions to be attributed to the underlying selection container
   */
  inputClass?: VueClassProp | undefined;
  /**
   * Style definitions to be attributed to the underlying selection container
   */
  inputStyle?: VueStyleProp | undefined;
  /**
   * Emitted after files are picked and some do not pass the validation props (accept, max-file-size, max-total-size, filter, etc)
   * @param rejectedEntries Array of { failedPropValidation: string, file: File } Objects for files that do not pass the validation
   */
  onRejected?: (rejectedEntries: QRejectedEntry[]) => void;
  /**
   * When using the 'clearable' property, this event is emitted when the clear icon is clicked
   * @param value The previous value before clearing it
   */
  onClear?: (value: any) => void;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: any) => void;
}

export interface QFileSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
  /**
   * Prepend inner field; Suggestions: QIcon, QBtn
   */
  prepend: () => VNode[];
  /**
   * Append to inner field; Suggestions: QIcon, QBtn
   */
  append: () => VNode[];
  /**
   * Prepend outer field; Suggestions: QIcon, QBtn
   */
  before: () => VNode[];
  /**
   * Append outer field; Suggestions: QIcon, QBtn
   */
  after: () => VNode[];
  /**
   * Slot for label; Used only if 'label-slot' prop is set or the 'label' prop is set; When it is used the text in the 'label' prop is ignored
   */
  label: () => VNode[];
  /**
   * Slot for errors; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  error: () => VNode[];
  /**
   * Slot for hint text; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  hint: () => VNode[];
  /**
   * Slot for counter text; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  counter: () => VNode[];
  /**
   * Override default spinner when component is in loading mode; Use in conjunction with 'loading' prop
   */
  loading: () => VNode[];
  /**
   * Override default node to render a file from the user picked list
   * @param scope
   */
  file: (scope: {
    /**
     * Selection index
     */
    index: number;
    /**
     * File object
     */
    file: File;
    /**
     * Reference to the QFile component
     */
    ref: QFile;
  }) => VNode[];
  /**
   * Override default selection slot; Suggestion: QChip
   * @param scope
   */
  selected: (scope: {
    /**
     * Array of File objects
     */
    files: FileList | readonly any[];
    /**
     * Reference to the QFile component
     */
    ref: QFile;
  }) => VNode[];
}

export interface QFile extends ComponentPublicInstance<QFileProps> {
  /**
   * Trigger file pick; Must be called as a direct consequence of user interaction (eg. in a click handler), due to browsers security policy
   * @param evt JS event object
   */
  pickFiles: (evt?: Event) => void;
  /**
   * Add files programmatically
   * @param files Array of files (instances of File)
   */
  addFiles: (files: FileList | readonly any[]) => void;
  /**
   * Reset validation status
   */
  resetValidation: () => void;
  /**
   * Trigger a validation
   * @param value Optional value to validate against
   * @returns True/false if no async rules, otherwise a Promise with the outcome (true -> validation was a success, false -> invalid models detected)
   */
  validate: (value?: any) => boolean | Promise<boolean>;
  /**
   * Focus component
   */
  focus: () => void;
  /**
   * Blur component (lose focus)
   */
  blur: () => void;
  /**
   * Remove file located at specific index in the model
   * @param index Index at which to remove selection
   */
  removeAtIndex: (index: number) => void;
  /**
   * Remove specified file from the model
   * @param file File to remove (instance of File)
   */
  removeFile: (file: File) => void;
  /**
   * DEPRECATED; Access 'nativeEl' directly; Gets the native input DOM Element
   * @returns The underlying native input DOM Element
   */
  getNativeElement: () => QFileNativeElement;
  /**
   * Whether the component is in error state
   */
  readonly hasError: boolean;
  /**
   * The native input DOM Element
   */
  readonly nativeEl: QFileNativeElement;
}

export interface QFooterProps {
  /**
   * Model of the component defining if it is shown or hidden to the user; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   * Default value: true
   */
  modelValue?: boolean;
  /**
   * Enable 'reveal' mode; Takes into account user scroll to temporarily show/hide footer
   */
  reveal?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Adds a default shadow to the footer
   */
  elevated?: boolean | undefined;
  /**
   * When using SSR, you can optionally hint of the height (in pixels) of the QFooter
   * Default value: 50
   */
  heightHint?: number | string | undefined;
  /**
   * Emitted when 'reveal' state gets changed
   * @param value New 'reveal' state
   */
  onReveal?: (value: boolean) => void;
}

export interface QFooterSlots {
  /**
   * Default slot in the devland unslotted content of the component; Suggestion: QToolbar
   */
  default: () => VNode[];
}

export interface QFooter extends ComponentPublicInstance<QFooterProps> {}

export interface QFormProps {
  /**
   * Focus first focusable element on initial component render
   */
  autofocus?: boolean | undefined;
  /**
   * Do not try to focus on first component that has a validation error when submitting form
   */
  noErrorFocus?: boolean | undefined;
  /**
   * Do not try to focus on first component when resetting form
   */
  noResetFocus?: boolean | undefined;
  /**
   * Validate all fields in form (by default it stops after finding the first invalid field with synchronous validation)
   */
  greedy?: boolean | undefined;
  /**
   * Emitted when all validations have passed when tethered to a submit button
   * @param evt Form submission event object
   */
  onSubmit?: (evt: Event | SubmitEvent) => void;
  /**
   * Emitted when all validations have been reset when tethered to a reset button; It is recommended to manually reset the wrapped components models in this handler
   */
  onReset?: () => void;
  /**
   * Emitted after a validation was triggered and all inner Quasar components models are valid
   */
  onValidationSuccess?: () => void;
  /**
   * Emitted after a validation was triggered and at least one of the inner Quasar components models are NOT valid
   * @param ref Vue reference to the first component that triggered the validation error
   */
  onValidationError?: (ref: Component) => void;
}

export interface QFormSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QForm extends ComponentPublicInstance<QFormProps> {
  /**
   * Focus on first focusable element/component in the form
   */
  focus: () => void;
  /**
   * Triggers a validation on all applicable inner Quasar components
   * @param shouldFocus Tell if it should focus or not on component with error on submitting form; Overrides 'no-focus-error' prop if specified
   * @returns Promise is always fulfilled and receives the outcome (true -> validation was a success, false -> invalid models detected)
   */
  validate: (shouldFocus?: boolean) => Promise<boolean>;
  /**
   * Resets the validation on all applicable inner Quasar components
   */
  resetValidation: () => void;
  /**
   * Manually trigger form validation and submit
   * @param evt JS event object
   */
  submit: (evt?: Event) => void;
  /**
   * Manually trigger form reset
   * @param evt JS event object
   */
  reset: (evt?: Event) => void;
  /**
   * Get an array of children Vue component instances that support Quasar validation API (derived from QField, or using useFormChild()/QFormChildMixin)
   * @returns Quasar validation API-compatible Vue component instances
   */
  getValidationComponents: () => QFormChildComponent[];
}

export interface QFormChildMixinProps {}

export interface QFormChildMixinSlots {}

export interface QFormChildMixin
  extends ComponentPublicInstance<QFormChildMixinProps> {
  /**
   * Needs to be overwritten when getting extended/mixed in
   * @returns Promise is always fulfilled and receives the outcome (true -> validation was a success, false -> invalid models detected)
   */
  validate: () => boolean | Promise<boolean>;
  /**
   * Needs to be overwritten when getting extended/mixed in
   */
  resetValidation: () => void;
}

export interface QHeaderProps {
  /**
   * Model of the component defining if it is shown or hidden to the user; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   * Default value: true
   */
  modelValue?: boolean;
  /**
   * Enable 'reveal' mode; Takes into account user scroll to temporarily show/hide header
   */
  reveal?: boolean | undefined;
  /**
   * Amount of scroll (in pixels) that should trigger a 'reveal' state change
   * Default value: 250
   */
  revealOffset?: number | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Adds a default shadow to the header
   */
  elevated?: boolean | undefined;
  /**
   * When using SSR, you can optionally hint of the height (in pixels) of the QHeader
   * Default value: 50
   */
  heightHint?: number | string | undefined;
  /**
   * Emitted when 'reveal' state gets changed
   * @param value New 'reveal' state
   */
  onReveal?: (value: boolean) => void;
}

export interface QHeaderSlots {
  /**
   * Default slot in the devland unslotted content of the component; Suggestion: QToolbar
   */
  default: () => VNode[];
}

export interface QHeader extends ComponentPublicInstance<QHeaderProps> {}

export interface QIconProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * HTML tag to render, unless no icon is supplied or it's an svg icon
   * Default value: i
   */
  tag?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  name?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Useful if icon is on the left side of something: applies a standard margin on the right side of Icon
   */
  left?: boolean | undefined;
  /**
   * Useful if icon is on the right side of something: applies a standard margin on the left side of Icon
   */
  right?: boolean | undefined;
}

export interface QIconSlots {
  /**
   * Suggestions: QTooltip or QMenu
   */
  default: () => VNode[];
}

export interface QIcon extends ComponentPublicInstance<QIconProps> {}

export interface QImgProps {
  /**
   * Force the component to maintain an aspect ratio
   */
  ratio?: string | number | undefined;
  /**
   * Path to image
   */
  src?: string | undefined;
  /**
   * Same syntax as <img> srcset attribute
   */
  srcset?: string | undefined;
  /**
   * Same syntax as <img> sizes attribute
   */
  sizes?: string | undefined;
  /**
   * While waiting for your image to load, you can use a placeholder image
   */
  placeholderSrc?: string | undefined;
  /**
   * Use it when not specifying 'ratio' but still wanting an initial aspect ratio
   * Default value: 16/9
   */
  initialRatio?: string | number | undefined;
  /**
   * Forces image width; Must also include the unit (px or %)
   */
  width?: string | undefined;
  /**
   * Forces image height; Must also include the unit (px or %)
   */
  height?: string | undefined;
  /**
   * Lazy or immediate load; Same syntax as <img> loading attribute
   * Default value: lazy
   */
  loading?: "lazy" | "eager" | undefined;
  /**
   * Same syntax as <img> crossorigin attribute
   */
  crossorigin?: "anonymous" | "use-credentials" | undefined;
  /**
   * Same syntax as <img> decoding attribute
   */
  decoding?: "sync" | "async" | "auto" | undefined;
  /**
   * Same syntax as <img> referrerpolicy attribute
   */
  referrerpolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url"
    | undefined;
  /**
   * Provides a hint of the relative priority to use when fetching the image
   * Default value: auto
   */
  fetchpriority?: "high" | "low" | "auto" | undefined;
  /**
   * How the image will fit into the container; Equivalent of the object-fit prop; Can be coordinated with 'position' prop
   * Default value: cover
   */
  fit?: "cover" | "fill" | "contain" | "none" | "scale-down" | undefined;
  /**
   * The alignment of the image into the container; Equivalent of the object-position CSS prop
   * Default value: 50% 50%
   */
  position?: string | undefined;
  /**
   * Specifies an alternate text for the image, if the image cannot be displayed
   */
  alt?: string | undefined;
  /**
   * Adds the native 'draggable' attribute
   */
  draggable?: boolean | undefined;
  /**
   * CSS classes to be attributed to the native img element
   */
  imgClass?: string | undefined;
  /**
   * Apply CSS to the native img element
   */
  imgStyle?: VueStyleObjectProp | undefined;
  /**
   * Color name for default Spinner (unless using a 'loading' slot)
   */
  spinnerColor?: NamedColor | undefined;
  /**
   * Size in CSS units, including unit name, for default Spinner (unless using a 'loading' slot)
   */
  spinnerSize?: string | undefined;
  /**
   * Do not display the default spinner while waiting for the image to be loaded; It is overriden by the 'loading' slot when one is present
   */
  noSpinner?: boolean | undefined;
  /**
   * Disables the native context menu for the image
   */
  noNativeMenu?: boolean | undefined;
  /**
   * Disable default transition when switching between old and new image
   */
  noTransition?: boolean | undefined;
  /**
   * Emitted when image has been loaded by the browser
   * @param src URL of image that has been loaded; useful when using 'srcset' and/or 'sizes'
   */
  onLoad?: (src: string) => void;
  /**
   * Emitted when browser could not load the image
   * @param src JS Error object
   */
  onError?: (src: Error) => void;
}

export interface QImgSlots {
  /**
   * Default slot can be used for captions. See examples
   */
  default: () => VNode[];
  /**
   * While image is loading, this slot is being displayed on top of the component; Suggestions: a spinner or text
   */
  loading: () => VNode[];
  /**
   * Optional slot to be used when image could not be loaded; make sure you assign a min-height and min-width to the component through CSS
   */
  error: () => VNode[];
}

export interface QImg extends ComponentPublicInstance<QImgProps> {}

export interface QInfiniteScrollProps {
  /**
   * Offset (pixels) to bottom of Infinite Scroll container from which the component should start loading more content in advance
   * Default value: 500
   */
  offset?: number | undefined;
  /**
   * Debounce amount (in milliseconds)
   * Default value: 100
   */
  debounce?: string | number | undefined;
  /**
   * Initialize the pagination index (used for the @load event)
   */
  initialIndex?: number | undefined;
  /**
   * CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one
   */
  scrollTarget?: Element | string | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Scroll area should behave like a messenger - starting scrolled to bottom and loading when reaching the top
   */
  reverse?: boolean | undefined;
  /**
   * Emitted when Infinite Scroll needs to load more data
   * @param index The index parameter can be used to make some sort of pagination on the content you load. It takes numeric values starting with 1 and incrementing with each call
   * @param done Function to call when you made all necessary updates. DO NOT forget to call it otherwise your loading message will continue to be displayed
   */
  onLoad?: (index: number, done: (stop?: boolean) => void) => void;
}

export interface QInfiniteScrollSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
  /**
   * Slot displaying something while loading content; Example: QSpinner
   */
  loading: () => VNode[];
}

export interface QInfiniteScroll
  extends ComponentPublicInstance<QInfiniteScrollProps> {
  /**
   * Checks scroll position and loads more content if necessary
   */
  poll: () => void;
  /**
   * Tells Infinite Scroll to load more content, regardless of the scroll position
   */
  trigger: () => void;
  /**
   * Resets calling index to 0
   */
  reset: () => void;
  /**
   * Stops working, regardless of scroll position
   */
  stop: () => void;
  /**
   * Starts working. Checks scroll position upon call and if trigger is hit, it loads more content
   */
  resume: () => void;
  /**
   * Overwrite the current pagination index
   * @param newIndex New pagination index
   */
  setIndex: (newIndex: number) => void;
  /**
   * Updates the scroll target; Useful when the parent elements change so that the scrolling target also changes
   */
  updateScrollTarget: () => void;
}

export interface QInnerLoadingProps {
  /**
   * One of Quasar's embedded transitions
   * Default value: fade
   */
  transitionShow?: string | undefined;
  /**
   * One of Quasar's embedded transitions
   * Default value: fade
   */
  transitionHide?: string | undefined;
  /**
   * Transition duration (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Size in CSS units, including unit name, or standard size name (xs|sm|md|lg|xl), for the inner Spinner (unless using the default slot)
   * Default value: 42px
   */
  size?: string | undefined;
  /**
   * State - loading or not
   */
  showing?: boolean | undefined;
  /**
   * Color name for component from the Quasar Color Palette for the inner Spinner (unless using the default slot)
   */
  color?: NamedColor | undefined;
  /**
   * Add a label; Gets overriden when using the default slot
   */
  label?: string | undefined;
  /**
   * Add CSS class(es) to the label; Works along the 'label' prop only
   */
  labelClass?: string | undefined;
  /**
   * Apply custom style to the label; Works along the 'label' prop only
   */
  labelStyle?: VueStyleProp | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
}

export interface QInnerLoadingSlots {
  /**
   * Default slot is used for replacing default Spinner; Suggestions: a spinner or text
   */
  default: () => VNode[];
}

export interface QInnerLoading
  extends ComponentPublicInstance<QInnerLoadingProps> {}

export interface QInputProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms; If not specified, it takes the value of 'for' prop, if it exists
   */
  name?: string | undefined;
  /**
   * Custom mask or one of the predefined mask names
   */
  mask?: string | undefined;
  /**
   * Fills string with specified characters (or underscore if value is not string) to fill mask's length
   */
  fillMask?: boolean | string | undefined;
  /**
   * Fills string from the right side of the mask
   */
  reverseFillMask?: boolean | undefined;
  /**
   * Model will be unmasked (won't contain tokens/separation characters)
   */
  unmaskedValue?: boolean | undefined;
  /**
   * Model of the component; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue: string | number | null | undefined;
  /**
   * Does field have validation errors?
   */
  error?: boolean | undefined;
  /**
   * Validation error message (gets displayed only if 'error' is set to 'true')
   */
  errorMessage?: string | undefined;
  /**
   * Hide error icon when there is an error
   */
  noErrorIcon?: boolean | undefined;
  /**
   * Array of Functions/Strings; If String, then it must be a name of one of the embedded validation rules
   */
  rules?: ValidationRule[] | undefined;
  /**
   * By default a change in the rules does not trigger a new validation until the model changes; If set to true then a change in the rules will trigger a validation; Has a performance penalty, so use it only when you really need it
   */
  reactiveRules?: boolean | undefined;
  /**
   * If set to boolean true then it checks validation status against the 'rules' only after field loses focus for first time; If set to 'ondemand' then it will trigger only when component's validate() method is manually called or when the wrapper QForm submits itself
   */
  lazyRules?: boolean | "ondemand" | undefined;
  /**
   * A text label that will “float” up above the input field, once the field gets focus
   */
  label?: string | undefined;
  /**
   * Label will be always shown above the field regardless of field content (if any)
   */
  stackLabel?: boolean | undefined;
  /**
   * Helper (hint) text which gets placed below your wrapped form component
   */
  hint?: string | undefined;
  /**
   * Hide the helper (hint) text when field doesn't have focus
   */
  hideHint?: boolean | undefined;
  /**
   * Prefix
   */
  prefix?: string | undefined;
  /**
   * Suffix
   */
  suffix?: string | undefined;
  /**
   * Color name for the label from the Quasar Color Palette; Overrides the 'color' prop; The difference from 'color' prop is that the label will always have this color, even when field is not focused
   */
  labelColor?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  bgColor?: NamedColor | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Signals the user a process is in progress by displaying a spinner; Spinner can be customized by using the 'loading' slot.
   */
  loading?: boolean | undefined;
  /**
   * Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null
   */
  clearable?: boolean | undefined;
  /**
   * Custom icon to use for the clear button when using along with 'clearable' prop
   */
  clearIcon?: string | undefined;
  /**
   * Use 'filled' design for the field
   */
  filled?: boolean | undefined;
  /**
   * Use 'outlined' design for the field
   */
  outlined?: boolean | undefined;
  /**
   * Use 'borderless' design for the field
   */
  borderless?: boolean | undefined;
  /**
   * Use 'standout' design for the field; Specifies classes to be applied when focused (overriding default ones)
   */
  standout?: boolean | string | undefined;
  /**
   * Enables label slot; You need to set it to force use of the 'label' slot if the 'label' prop is not set
   */
  labelSlot?: boolean | undefined;
  /**
   * Enables bottom slots ('error', 'hint', 'counter')
   */
  bottomSlots?: boolean | undefined;
  /**
   * Do not reserve space for hint/error/counter anymore when these are not used; As a result, it also disables the animation for those; It also allows the hint/error area to stretch vertically based on its content
   */
  hideBottomSpace?: boolean | undefined;
  /**
   * Show an automatic counter on bottom right
   */
  counter?: boolean | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
  /**
   * Remove border-radius so borders are squared; Overrides 'rounded' prop
   */
  square?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Match inner content alignment to that of QItem
   */
  itemAligned?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Focus field on initial component render
   */
  autofocus?: boolean | undefined;
  /**
   * Used to specify the 'id' of the control and also the 'for' attribute of the label that wraps it; If no 'name' prop is specified, then it is used for this attribute as well
   */
  for?: string | undefined;
  /**
   * Text to be displayed as shadow at the end of the text in the control; Does NOT applies to type=file
   */
  shadowText?: string | undefined;
  /**
   * Input type
   * Default value: text
   */
  type?:
    | "text"
    | "password"
    | "textarea"
    | "email"
    | "search"
    | "tel"
    | "file"
    | "number"
    | "url"
    | "time"
    | "date"
    | undefined;
  /**
   * Debounce amount (in milliseconds) when updating model
   */
  debounce?: string | number | undefined;
  /**
   * Specify a max length of model
   */
  maxlength?: string | number | undefined;
  /**
   * Make field autogrow along with its content (uses a textarea)
   */
  autogrow?: boolean | undefined;
  /**
   * Class definitions to be attributed to the underlying input tag
   */
  inputClass?: VueClassProp | undefined;
  /**
   * Style definitions to be attributed to the underlying input tag
   */
  inputStyle?: VueStyleProp | undefined;
  /**
   * When using the 'clearable' property, this event is emitted when the clear icon is clicked
   * @param value The previous value before clearing it
   */
  onClear?: (value: any) => void;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: string | number | null) => void;
  /**
   * Emitted when component gets focused
   * @param evt JS event object
   */
  onFocus?: (evt: Event) => void;
  /**
   * Emitted when component loses focus
   * @param evt JS event object
   */
  onBlur?: (evt: Event) => void;
}

export interface QInputSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
  /**
   * Prepend inner field; Suggestions: QIcon, QBtn
   */
  prepend: () => VNode[];
  /**
   * Append to inner field; Suggestions: QIcon, QBtn
   */
  append: () => VNode[];
  /**
   * Prepend outer field; Suggestions: QIcon, QBtn
   */
  before: () => VNode[];
  /**
   * Append outer field; Suggestions: QIcon, QBtn
   */
  after: () => VNode[];
  /**
   * Slot for label; Used only if 'label-slot' prop is set or the 'label' prop is set; When it is used the text in the 'label' prop is ignored
   */
  label: () => VNode[];
  /**
   * Slot for errors; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  error: () => VNode[];
  /**
   * Slot for hint text; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  hint: () => VNode[];
  /**
   * Slot for counter text; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  counter: () => VNode[];
  /**
   * Override default spinner when component is in loading mode; Use in conjunction with 'loading' prop
   */
  loading: () => VNode[];
}

export interface QInput extends ComponentPublicInstance<QInputProps> {
  /**
   * Reset validation status
   */
  resetValidation: () => void;
  /**
   * Trigger a validation
   * @param value Optional value to validate against
   * @returns True/false if no async rules, otherwise a Promise with the outcome (true -> validation was a success, false -> invalid models detected)
   */
  validate: (value?: any) => boolean | Promise<boolean>;
  /**
   * Focus underlying input tag
   */
  focus: () => void;
  /**
   * Lose focus on underlying input tag
   */
  blur: () => void;
  /**
   * Select input text
   */
  select: () => void;
  /**
   * DEPRECATED; Access 'nativeEl' directly instead; Get the native input/textarea DOM Element
   * @returns The underlying native input/textarea DOM Element
   */
  getNativeElement: () => QInputNativeElement;
  /**
   * Whether the component is in error state
   */
  readonly hasError: boolean;
  /**
   * The native input/textarea DOM Element
   */
  readonly nativeEl: QInputNativeElement;
}

export interface QIntersectionProps {
  /**
   * HTML tag to use
   * Default value: div
   */
  tag?: string | undefined;
  /**
   * Get triggered only once
   */
  once?: boolean | undefined;
  /**
   * Pre-render content on server side if using SSR (use it to pre-render above the fold content)
   */
  ssrPrerender?: boolean | undefined;
  /**
   * [Intersection API root prop] Lets you define an alternative to the viewport as your root (through its DOM element); It is important to keep in mind that root needs to be an ancestor of the observed element
   */
  root?: Element | undefined;
  /**
   * [Intersection API rootMargin prop] Allows you to specify the margins for the root, effectively allowing you to either grow or shrink the area used for intersections
   */
  margin?: string | undefined;
  /**
   * [Intersection API threshold prop] Threshold(s) at which to trigger, specified as a ratio, or list of ratios, of (visible area / total area) of the observed element
   */
  threshold?: readonly any[] | number | undefined;
  /**
   * One of Quasar's embedded transitions
   */
  transition?: string | undefined;
  /**
   * Transition duration (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Disable visibility observable (content will remain as it was, visible or hidden)
   */
  disable?: boolean | undefined;
  /**
   * Fires when visibility changes
   * @param isVisible Visibility status (true/false)
   */
  onVisibility?: (isVisible: boolean) => void;
}

export interface QIntersectionSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
  /**
   * Slot for content to render when component is not on screen; Example: a text that the user can search for with the browser's search function
   */
  hidden: () => VNode[];
}

export interface QIntersection
  extends ComponentPublicInstance<QIntersectionProps> {}

export interface QItemProps {
  /**
   * Equivalent to Vue Router <router-link> 'to' property; Superseded by 'href' prop if used
   */
  to?: string | any | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'exact' property; Superseded by 'href' prop if used
   */
  exact?: boolean | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'replace' property; Superseded by 'href' prop if used
   */
  replace?: boolean | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used
   */
  activeClass?: string | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used
   */
  exactActiveClass?: string | undefined;
  /**
   * Native <a> link href attribute; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props
   */
  href?: string | undefined;
  /**
   * Native <a> link target attribute; Use it only along with 'href' prop; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props
   */
  target?: string | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put item into 'active' state
   */
  active?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Is QItem clickable? If it's the case, then it will add hover effects and emit 'click' events
   */
  clickable?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Apply an inset; Useful when avatar/left side is missing but you want to align content with other items that do have a left side, or when you're building a menu
   */
  insetLevel?: number | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * HTML tag to render; Suggestion: use 'label' when encapsulating a QCheckbox/QRadio/QToggle so that when user clicks/taps on the whole item it will trigger a model change for the mentioned components
   * Default value: div
   */
  tag?: string | undefined;
  /**
   * Put item into a manual focus state; Enables 'focused' prop which will determine if item is focused or not, rather than relying on native hover/focus states
   */
  manualFocus?: boolean | undefined;
  /**
   * Determines focus state, ONLY if 'manual-focus' is enabled / set to true
   */
  focused?: boolean | undefined;
  /**
   * Emitted when the component is clicked
   * @param evt JS event object; If you are using route navigation ('to'/'replace' props) and you want to cancel navigation then call evt.preventDefault() synchronously in your event handler
   * @param go Available ONLY if you are using route navigation ('to'/'replace' props); When you need to control the time at which the component should trigger the route navigation then call evt.preventDefault() synchronously and then call this function at your convenience; Useful if you have async work to be done before the actual route navigation or if you want to redirect somewhere else
   */
  onClick?: (
    evt: Event,
    go?: (opts?: {
      /**
       * Equivalent to Vue Router <router-link> 'to' property; Specify it explicitly otherwise it will be set with same value as component's 'to' prop
       */
      to?: string | any;
      /**
       * Equivalent to Vue Router <router-link> 'replace' property; Specify it explicitly otherwise it will be set with same value as component's 'replace' prop
       */
      replace?: boolean;
      /**
       * Return the router error, if any; Otherwise the returned Promise will always fulfill
       */
      returnRouterError?: boolean;
    }) => Promise<any>
  ) => void;
}

export interface QItemSlots {
  /**
   * This is where QItem's content goes
   */
  default: () => VNode[];
}

export interface QItem extends ComponentPublicInstance<QItemProps> {}

export interface QItemLabelProps {
  /**
   * Renders an overline label
   */
  overline?: boolean | undefined;
  /**
   * Renders a caption label
   */
  caption?: boolean | undefined;
  /**
   * Renders a header label
   */
  header?: boolean | undefined;
  /**
   * Apply ellipsis when there's not enough space to render on the specified number of lines;
   */
  lines?: number | string | undefined;
}

export interface QItemLabelSlots {
  /**
   * The content of the label; Suggestion: text
   */
  default: () => VNode[];
}

export interface QItemLabel extends ComponentPublicInstance<QItemLabelProps> {}

export interface QItemSectionProps {
  /**
   * Render an avatar item side (does not needs 'side' prop to be set)
   */
  avatar?: boolean | undefined;
  /**
   * Render a thumbnail item side (does not needs 'side' prop to be set)
   */
  thumbnail?: boolean | undefined;
  /**
   * Renders as a side of the item
   */
  side?: boolean | undefined;
  /**
   * Align content to top (useful for multi-line items)
   */
  top?: boolean | undefined;
  /**
   * Do not wrap text (useful for item's main content)
   */
  noWrap?: boolean | undefined;
}

export interface QItemSectionSlots {
  /**
   * Section's actual content
   */
  default: () => VNode[];
}

export interface QItemSection
  extends ComponentPublicInstance<QItemSectionProps> {}

export interface QListProps {
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Applies a separator between contained items
   */
  separator?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Applies a material design-like padding on top and bottom
   */
  padding?: boolean | undefined;
  /**
   * HTML tag to use
   * Default value: div
   */
  tag?: string | undefined;
}

export interface QListSlots {
  /**
   * This is where the content goes; Suggestion: QItem, QExpansionItem, ...
   */
  default: () => VNode[];
}

export interface QList extends ComponentPublicInstance<QListProps> {}

export interface QKnobProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Any number to indicate the given value of the knob. Either use this property (along with a listener for 'update:modelValue' event) OR use the v-model directive
   */
  modelValue: number;
  /**
   * The minimum value that the model (the knob value) should start at
   */
  min?: number | undefined;
  /**
   * The maximum value that the model (the knob value) should go to
   */
  max?: number | undefined;
  /**
   * Inner minimum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be higher or equal to 'min' prop; Defaults to 'min' prop
   */
  innerMin?: number | undefined;
  /**
   * Inner maximum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be lower or equal to 'max' prop; Defaults to 'max' prop
   */
  innerMax?: number | undefined;
  /**
   * A number representing steps in the value of the model, while adjusting the knob
   * Default value: 1
   */
  step?: number | undefined;
  /**
   * Reverses the direction of progress
   */
  reverse?: boolean | undefined;
  /**
   * No animation when model changes
   */
  instantFeedback?: boolean | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for the center part of the component from the Quasar Color Palette
   */
  centerColor?: NamedColor | undefined;
  /**
   * Color name for the track of the component from the Quasar Color Palette
   */
  trackColor?: NamedColor | undefined;
  /**
   * Size of text in CSS units, including unit name. Suggestion: use 'em' units to sync with component size
   * Default value: 0.25em
   */
  fontSize?: string | undefined;
  /**
   * Thickness of progress arc as a ratio (0.0 < x < 1.0) of component size
   * Default value: 0.2
   */
  thickness?: number | undefined;
  /**
   * Angle to rotate progress arc by
   */
  angle?: number | undefined;
  /**
   * Enables the default slot and uses it (if available), otherwise it displays the 'value' prop as text; Make sure the text has enough space to be displayed inside the component
   */
  showValue?: boolean | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: number) => void;
  /**
   * Fires at the end of a knob's adjustment and offers the value of the model
   * @param value New model value
   */
  onChange?: (value: number) => void;
  /**
   * The value of the model while dragging is still in progress
   * @param value New model value
   */
  onDragValue?: (value: number) => void;
}

export interface QKnobSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QKnob extends ComponentPublicInstance<QKnobProps> {}

export interface QLayoutProps {
  /**
   * Defines how your layout components (header/footer/drawer) should be placed on screen; See docs examples
   * Default value: hhh lpr fff
   */
  view?: string | undefined;
  /**
   * Containerize the layout which means it changes the default behavior of expanding to the whole window; Useful (but not limited to) for when using on a QDialog
   */
  container?: boolean | undefined;
  /**
   * Emitted when layout size (height, width) changes
   * @param size New size
   */
  onResize?: (size: {
    /**
     * Layout height
     */
    height: number;
    /**
     * Layout width
     */
    width: number;
  }) => void;
  /**
   * Emitted when user scrolls within layout
   * @param details Scroll details
   */
  onScroll?: (details: {
    /**
     * Scroll offset from top (vertical)
     */
    position: number;
    /**
     * Direction of scroll
     */
    direction: "up" | "down";
    /**
     * Has scroll direction changed since event was last emitted?
     */
    directionChanged: boolean;
    /**
     * Vertical delta distance since event was last emitted
     */
    delta: number;
    /**
     * Scroll offset from top (vertical)
     */
    inflectionPoint: number;
  }) => void;
  /**
   * Emitted when the scroll size of layout changes
   * @param height New scroll height of layout
   */
  onScrollHeight?: (height: number) => void;
}

export interface QLayoutSlots {
  /**
   * Suggestion: QHeader, QFooter, QDrawer, QPageContainer
   */
  default: () => VNode[];
}

export interface QLayout extends ComponentPublicInstance<QLayoutProps> {}

export interface QLinearProgressProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Progress value (0.0 < x < 1.0)
   */
  value?: number | undefined;
  /**
   * Optional buffer value (0.0 < x < 1.0)
   */
  buffer?: number | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for component's track from the Quasar Color Palette
   */
  trackColor?: NamedColor | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Reverse direction of progress
   */
  reverse?: boolean | undefined;
  /**
   * Draw stripes; For determinate state only (for performance reasons)
   */
  stripe?: boolean | undefined;
  /**
   * Put component into indeterminate mode
   */
  indeterminate?: boolean | undefined;
  /**
   * Put component into query mode
   */
  query?: boolean | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
  /**
   * No transition when model changes
   */
  instantFeedback?: boolean | undefined;
  /**
   * Animation speed (in milliseconds, without unit)
   * Default value: 2100
   */
  animationSpeed?: string | number | undefined;
}

export interface QLinearProgressSlots {
  /**
   * Suggestion: QTooltip
   */
  default: () => VNode[];
}

export interface QLinearProgress
  extends ComponentPublicInstance<QLinearProgressProps> {}

export interface QMarkupTableProps {
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Applies a 'flat' design (no default shadow)
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Use a separator/border between rows, columns or all cells
   * Default value: horizontal
   */
  separator?: "horizontal" | "vertical" | "cell" | "none" | undefined;
  /**
   * Wrap text within table cells
   */
  wrapCells?: boolean | undefined;
}

export interface QMarkupTableSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QMarkupTable
  extends ComponentPublicInstance<QMarkupTableProps> {}

export interface QMenuProps {
  /**
   * One of Quasar's embedded transitions
   * Default value: fade
   */
  transitionShow?: string | undefined;
  /**
   * One of Quasar's embedded transitions
   * Default value: fade
   */
  transitionHide?: string | undefined;
  /**
   * Transition duration (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Configure a target element to trigger component toggle; 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements; By using a String (CSS selector) or a DOM element it attaches the events to the specified DOM element (if it exists)
   * Default value: true
   */
  target?: boolean | string | Element | undefined;
  /**
   * Skips attaching events to the target DOM element (that trigger the element to get shown)
   */
  noParentEvent?: boolean | undefined;
  /**
   * Allows the component to behave like a context menu, which opens with a right mouse click (or long tap on mobile)
   */
  contextMenu?: boolean | undefined;
  /**
   * Model of the component defining shown/hidden state; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue?: boolean;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Allows the menu to match at least the full width of its target
   */
  fit?: boolean | undefined;
  /**
   * Allows the menu to cover its target. When used, the 'self' and 'fit' props are no longer effective
   */
  cover?: boolean | undefined;
  /**
   * Two values setting the starting position or anchor point of the menu relative to its target
   */
  anchor?:
    | "top left"
    | "top middle"
    | "top right"
    | "top start"
    | "top end"
    | "center left"
    | "center middle"
    | "center right"
    | "center start"
    | "center end"
    | "bottom left"
    | "bottom middle"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | undefined;
  /**
   * Two values setting the menu's own position relative to its target
   */
  self?:
    | "top left"
    | "top middle"
    | "top right"
    | "top start"
    | "top end"
    | "center left"
    | "center middle"
    | "center right"
    | "center start"
    | "center end"
    | "bottom left"
    | "bottom middle"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | undefined;
  /**
   * An array of two numbers to offset the menu horizontally and vertically in pixels
   */
  offset?: readonly any[] | undefined;
  /**
   * CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one
   */
  scrollTarget?: Element | string | undefined;
  /**
   * Allows for the target position to be set by the mouse position, when the target of the menu is either clicked or touched
   */
  touchPosition?: boolean | undefined;
  /**
   * Allows the menu to not be dismissed by a click/tap outside of the menu or by hitting the ESC key
   */
  persistent?: boolean | undefined;
  /**
   * Changing route app won't dismiss the popup; No need to set it if 'persistent' prop is also set
   */
  noRouteDismiss?: boolean | undefined;
  /**
   * Allows any click/tap in the menu to close it; Useful instead of attaching events to each menu item that should close the menu on click/tap
   */
  autoClose?: boolean | undefined;
  /**
   * Separate from parent menu, marking it as a separate closing point for v-close-popup (without this, chained menus close all together)
   */
  separateClosePopup?: boolean | undefined;
  /**
   * Forces content to have squared borders
   */
  square?: boolean | undefined;
  /**
   * (Accessibility) When Menu gets hidden, do not refocus on the DOM element that previously had focus
   */
  noRefocus?: boolean | undefined;
  /**
   * (Accessibility) When Menu gets shown, do not switch focus on it
   */
  noFocus?: boolean | undefined;
  /**
   * The maximum height of the menu; Size in CSS units, including unit name
   */
  maxHeight?: string | undefined;
  /**
   * The maximum width of the menu; Size in CSS units, including unit name
   */
  maxWidth?: string | undefined;
  /**
   * Emitted when showing/hidden state changes; Is also used by v-model
   * @param value New state (showing/hidden)
   */
  "onUpdate:modelValue"?: (value: boolean) => void;
  /**
   * Emitted after component has triggered show()
   * @param evt JS event object
   */
  onShow?: (evt: Event) => void;
  /**
   * Emitted when component triggers show() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeShow?: (evt: Event) => void;
  /**
   * Emitted after component has triggered hide()
   * @param evt JS event object
   */
  onHide?: (evt: Event) => void;
  /**
   * Emitted when component triggers hide() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeHide?: (evt: Event) => void;
  /**
   * Emitted when ESC key is pressed; Does not get emitted if Menu is 'persistent'
   */
  onEscapeKey?: () => void;
}

export interface QMenuSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QMenu extends ComponentPublicInstance<QMenuProps> {
  /**
   * Triggers component to show
   * @param evt JS event object
   */
  show: (evt?: Event) => void;
  /**
   * Triggers component to hide
   * @param evt JS event object
   */
  hide: (evt?: Event) => void;
  /**
   * Triggers component to toggle between show/hide
   * @param evt JS event object
   */
  toggle: (evt?: Event) => void;
  /**
   * There are some custom scenarios for which Quasar cannot automatically reposition the menu without significant performance drawbacks so the optimal solution is for you to call this method when you need it
   */
  updatePosition: () => void;
  /**
   * Focus menu; if you have content with autofocus attribute, it will directly focus it
   */
  focus: () => void;
  /**
   * The DOM Element of the rendered content
   */
  readonly contentEl: Element;
}

export interface QNoSsrProps {
  /**
   * HTML tag to use
   * Default value: div
   */
  tag?: string | undefined;
  /**
   * Text to display on server-side render (unless using 'placeholder' slot)
   */
  placeholder?: string | undefined;
}

export interface QNoSsrSlots {
  /**
   * Default slot is used to render content on client-side
   */
  default: () => VNode[];
  /**
   * Slot used as placeholder on server-side render, which gets replaced by the default slot on client-side; overrides 'placeholder' prop
   */
  placeholder: () => VNode[];
}

export interface QNoSsr extends ComponentPublicInstance<QNoSsrProps> {}

export interface QOptionGroupProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue: any;
  /**
   * Array of objects with value, label, and disable (optional) props. The binary components will be created according to this array; Props from QToggle, QCheckbox or QRadio can also be added as key/value pairs to control the components singularly
   */
  options?: {
    /**
     * Label to display along the component
     */
    label: string;
    /**
     * Value of the option that will be used by the component model
     */
    value: any;
    /**
     * If true, the option will be disabled
     */
    disable?: boolean;
    /**
     * Any other props from QToggle, QCheckbox, or QRadio
     */
    [props: string]: any | undefined;
  }[];
  /**
   * Used to specify the name of the controls; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * The type of input component to be used
   * Default value: radio
   */
  type?: "radio" | "checkbox" | "toggle" | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Should the color (if specified any) be kept when input components are unticked?
   */
  keepColor?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Label (if any specified) should be displayed on the left side of the input components
   */
  leftLabel?: boolean | undefined;
  /**
   * Show input components as inline-block rather than each having their own row
   */
  inline?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: any) => void;
}

export interface QOptionGroupSlots {
  /**
   * Generic slot for all labels
   * @param scope The corresponding option entry from the 'options' prop
   */
  label: (scope: {
    /**
     * Label to display along the component
     */
    label: string;
    /**
     * Value of the option that will be used by the component model
     */
    value: any;
    /**
     * If true, the option will be disabled
     */
    disable?: boolean;
    /**
     * Any other props from QToggle, QCheckbox, or QRadio
     */
    [props: string]: any | undefined;
  }) => VNode[];
  /**
   * Slot to define the specific label for the option at '[name]' where name is a 0-based index; Overrides the generic 'label' slot if used
   * @param scope The corresponding option entry from the 'options' prop
   */
  [key: `label-${string}`]: (scope: {
    /**
     * Label to display along the component
     */
    label: string;
    /**
     * Value of the option that will be used by the component model
     */
    value: any;
    /**
     * If true, the option will be disabled
     */
    disable?: boolean;
    /**
     * Any other props from QToggle, QCheckbox, or QRadio
     */
    [props: string]: any | undefined;
  }) => VNode[];
}

export interface QOptionGroup
  extends ComponentPublicInstance<QOptionGroupProps> {}

export interface QPageProps {
  /**
   * Applies a default responsive page padding
   */
  padding?: boolean | undefined;
  /**
   * Override default CSS style applied to the component (sets minHeight); Function(offset: Number) => CSS props/value: Object; For best performance, reference it from your scope and do not define it inline
   * Default value: (see source code)
   * @param offset Header + Footer height (in pixels)
   * @param height Value in pixels of container height (if containerized) or window height otherwise
   * @returns Object with CSS properties to apply to Page DOM element
   */
  styleFn?: ((offset: number, height: number) => any) | undefined;
}

export interface QPageSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QPage extends ComponentPublicInstance<QPageProps> {}

export interface QPageContainerProps {}

export interface QPageContainerSlots {
  /**
   * Encapsulates a QPage (either directly or through <router-view>)
   */
  default: () => VNode[];
}

export interface QPageContainer
  extends ComponentPublicInstance<QPageContainerProps> {}

export interface QPageScrollerProps {
  /**
   * Page side/corner to stick to
   * Default value: bottom-right
   */
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | undefined;
  /**
   * An array of two numbers to offset the component horizontally and vertically in pixels
   * Default value: 18,18
   */
  offset?: readonly any[] | undefined;
  /**
   * By default the component shrinks to content's size; By using this prop you make the component fully expand horizontally or vertically, based on 'position' prop
   */
  expand?: boolean | undefined;
  /**
   * Scroll offset (in pixels) from which point the component is shown on page; Measured from the top of the page (or from the bottom if in 'reverse' mode)
   * Default value: 1000
   */
  scrollOffset?: number | undefined;
  /**
   * Work in reverse (shows when scrolling to the top of the page and scrolls to bottom when triggered)
   */
  reverse?: boolean | undefined;
  /**
   * Duration (in milliseconds) of the scrolling until it reaches its target
   * Default value: 300
   */
  duration?: number | undefined;
}

export interface QPageScrollerSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QPageScroller
  extends ComponentPublicInstance<QPageScrollerProps> {}

export interface QPageStickyProps {
  /**
   * Page side/corner to stick to
   * Default value: bottom-right
   */
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | undefined;
  /**
   * An array of two numbers to offset the component horizontally and vertically in pixels
   */
  offset?: readonly any[] | undefined;
  /**
   * By default the component shrinks to content's size; By using this prop you make the component fully expand horizontally or vertically, based on 'position' prop
   */
  expand?: boolean | undefined;
}

export interface QPageStickySlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QPageSticky
  extends ComponentPublicInstance<QPageStickyProps> {}

export interface QPaginationProps {
  /**
   * Current page (must be between min/max)
   */
  modelValue: number;
  /**
   * Minimum page (must be lower than 'max')
   * Default value: 1
   */
  min?: number | string | undefined;
  /**
   * Number of last page (must be higher than 'min')
   */
  max: number | string;
  /**
   * Notify the component that the background is a dark color (useful when you are using it along with the 'input' prop)
   */
  dark?: boolean | undefined;
  /**
   * Button size in CSS units, including unit name
   */
  size?: string | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Use an input instead of buttons
   */
  input?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  iconPrev?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  iconNext?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  iconFirst?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  iconLast?: string | undefined;
  /**
   * Generate link for page buttons; For best performance, reference it from your scope and do not define it inline
   * @param page Page number to navigate to
   * @returns Object or String that can be passed to a <router-link> as `to` parameter
   */
  toFn?: ((page: number) => any | string) | undefined;
  /**
   * Show boundary button links
   */
  boundaryLinks?: boolean | undefined;
  /**
   * Always show first and last page buttons (if not using 'input')
   */
  boundaryNumbers?: boolean | undefined;
  /**
   * Show direction buttons
   */
  directionLinks?: boolean | undefined;
  /**
   * Show ellipses (...) when pages are available
   */
  ellipses?: boolean | undefined;
  /**
   * Maximum number of page links to display at a time; 0 means Infinite
   */
  maxPages?: number | string | undefined;
  /**
   * Use 'flat' design for non-active buttons (it's the default option)
   */
  flat?: boolean | undefined;
  /**
   * Use 'outline' design for non-active buttons
   */
  outline?: boolean | undefined;
  /**
   * Remove shadow for non-active buttons
   */
  unelevated?: boolean | undefined;
  /**
   * Use 'push' design for non-active buttons
   */
  push?: boolean | undefined;
  /**
   * Color name from the Quasar Color Palette for the non-active buttons
   * Default value: primary
   */
  color?: NamedColor | undefined;
  /**
   * Text color name from the Quasar Color Palette for the ACTIVE buttons
   */
  textColor?: NamedColor | undefined;
  /**
   * The design of the ACTIVE button, similar to the flat/outline/push/unelevated props (but those are used for non-active buttons)
   */
  activeDesign?: "flat" | "outline" | "push" | "unelevated" | undefined;
  /**
   * Color name from the Quasar Color Palette for the ACTIVE button
   * Default value: primary
   */
  activeColor?: NamedColor | undefined;
  /**
   * Text color name from the Quasar Color Palette for the ACTIVE button
   */
  activeTextColor?: NamedColor | undefined;
  /**
   * Makes a circle shaped button for all buttons
   */
  round?: boolean | undefined;
  /**
   * Applies a more prominent border-radius for a squared shape button for all buttons
   */
  rounded?: boolean | undefined;
  /**
   * Applies a glossy effect for all buttons
   */
  glossy?: boolean | undefined;
  /**
   * Apply custom gutter; Size in CSS units, including unit name or standard size name (none|xs|sm|md|lg|xl)
   * Default value: 2px
   */
  gutter?: string | undefined;
  /**
   * Apply custom padding (vertical [horizontal]); Size in CSS units, including unit name or standard size name (none|xs|sm|md|lg|xl); Also removes the min width and height when set
   */
  padding?: string | undefined;
  /**
   * Style definitions to be attributed to the input (if using one)
   */
  inputStyle?: VueStyleProp | undefined;
  /**
   * Class definitions to be attributed to the input (if using one)
   */
  inputClass?: VueClassProp | undefined;
  /**
   * Configure buttons material ripple (disable it by setting it to 'false' or supply a config object); Does not applies to boundary and ellipsis buttons
   * Default value: true
   */
  ripple?: boolean | any | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: number) => void;
}

export interface QPaginationSlots {}

export interface QPagination extends ComponentPublicInstance<QPaginationProps> {
  /**
   * Go directly to the specified page
   * @param pageNumber Page number to go to
   */
  set: (pageNumber?: number) => void;
  /**
   * Increment/Decrement current page by offset
   * @param offset Offset page, can be negative or positive
   */
  setByOffset: (offset?: number) => void;
}

export interface QParallaxProps {
  /**
   * Path to image (unless a 'media' slot is used)
   */
  src?: string | undefined;
  /**
   * Height of component (in pixels)
   * Default value: 500
   */
  height?: number | undefined;
  /**
   * Speed of parallax effect (0.0 < x < 1.0)
   */
  speed?: number | undefined;
  /**
   * CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one
   */
  scrollTarget?: Element | string | undefined;
  /**
   * Emitted when scrolling occurs
   * @param percentage Number between 0.0 and 1.0 defining the scrolled percentage of the component
   */
  onScroll?: (percentage: number) => void;
}

export interface QParallaxSlots {
  /**
   * Default slot can be used for content that gets displayed on top of the component
   */
  default: () => VNode[];
  /**
   * Slot for describing <img> or <video> tags
   */
  media: () => VNode[];
  /**
   * Scoped slot for describing content that gets displayed on top of the component; If specified, it overrides the default slot
   * @param scope
   */
  content: (scope: {
    /**
     * Percentage (0.0 < x < 1.0) of scroll in regards to QParallax
     */
    percentScrolled: number;
  }) => VNode[];
}

export interface QParallax extends ComponentPublicInstance<QParallaxProps> {}

export interface QPopupEditProps {
  /**
   * Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue: any;
  /**
   * Optional title (unless 'title' slot is used)
   */
  title?: string | undefined;
  /**
   * Show Set and Cancel buttons
   */
  buttons?: boolean | undefined;
  /**
   * Override Set button label
   */
  labelSet?: string | undefined;
  /**
   * Override Cancel button label
   */
  labelCancel?: string | undefined;
  /**
   * Automatically save the model (if changed) when user clicks/taps outside of the popup; It does not apply to ESC key
   */
  autoSave?: boolean | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   * Default value: primary
   */
  color?: NamedColor | undefined;
  /**
   * Validates model then triggers 'save' and closes Popup; Returns a Boolean ('true' means valid, 'false' means abort); Syntax: validate(value); For best performance, reference it from your scope and do not define it inline
   * @param value Model to validate
   * @returns Is the model valid or not?
   */
  validate?: ((value: any) => boolean) | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Allows the menu to match at least the full width of its target
   */
  fit?: boolean | undefined;
  /**
   * Allows the menu to cover its target. When used, the 'self' and 'fit' props are no longer effective
   * Default value: true
   */
  cover?: boolean | undefined;
  /**
   * Two values setting the starting position or anchor point of the menu relative to its target
   */
  anchor?:
    | "top left"
    | "top middle"
    | "top right"
    | "top start"
    | "top end"
    | "center left"
    | "center middle"
    | "center right"
    | "center start"
    | "center end"
    | "bottom left"
    | "bottom middle"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | undefined;
  /**
   * Two values setting the menu's own position relative to its target
   */
  self?:
    | "top left"
    | "top middle"
    | "top right"
    | "top start"
    | "top end"
    | "center left"
    | "center middle"
    | "center right"
    | "center start"
    | "center end"
    | "bottom left"
    | "bottom middle"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | undefined;
  /**
   * An array of two numbers to offset the menu horizontally and vertically in pixels
   */
  offset?: readonly any[] | undefined;
  /**
   * Allows for the target position to be set by the mouse position, when the target of the menu is either clicked or touched
   */
  touchPosition?: boolean | undefined;
  /**
   * Avoid menu closing by hitting ESC key or by clicking/tapping outside of the Popup
   */
  persistent?: boolean | undefined;
  /**
   * Separate from parent menu, marking it as a separate closing point for v-close-popup (without this, chained menus close all together)
   */
  separateClosePopup?: boolean | undefined;
  /**
   * Forces menu to have squared borders
   */
  square?: boolean | undefined;
  /**
   * The maximum height of the menu; Size in CSS units, including unit name
   */
  maxHeight?: string | undefined;
  /**
   * The maximum width of the menu; Size in CSS units, including unit name
   */
  maxWidth?: string | undefined;
  /**
   * Emitted when Popup gets cancelled in order to reset model to its initial value; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: any) => void;
  /**
   * Emitted right before Popup gets shown
   */
  onBeforeShow?: () => void;
  /**
   * Emitted right after Popup gets shown
   */
  onShow?: () => void;
  /**
   * Emitted right before Popup gets dismissed
   */
  onBeforeHide?: () => void;
  /**
   * Emitted right after Popup gets dismissed
   */
  onHide?: () => void;
  /**
   * Emitted when value has been successfully validated and it should be saved
   * @param value Validated value to be saved
   * @param initialValue Initial value, before changes
   */
  onSave?: (value: any, initialValue: any) => void;
  /**
   * Emitted when user cancelled the change (hit ESC key or clicking outside of Popup or hit 'Cancel' button)
   * @param value Edited value
   * @param initialValue Initial value, before changes
   */
  onCancel?: (value: any, initialValue: any) => void;
}

export interface QPopupEditSlots {
  /**
   * Used for injecting the form component; Do NOT destructure it
   * @param scope
   */
  default: (scope: {
    /**
     * Initial value
     */
    initialValue: any;
    /**
     * Current value
     */
    value: any;
    /**
     * Function that checks if the value is valid
     * @param value Value to be checked
     * @returns Checked value is valid or not
     */
    validate: (value: any) => boolean;
    /**
     * Function that sets the value and closes the popup
     */
    set: () => void;
    /**
     * Function that cancels the editing and reverts the value to the initialValue
     */
    cancel: () => void;
    /**
     * There are some custom scenarios for which Quasar cannot automatically reposition the component without significant performance drawbacks so the optimal solution is for you to call this method when you need it
     */
    updatePosition: () => void;
  }) => VNode[];
}

export interface QPopupEdit extends ComponentPublicInstance<QPopupEditProps> {
  /**
   * Trigger a model update; Validates model (and emits 'save' event if it's the case) then closes Popup
   */
  set: () => void;
  /**
   * Triggers a model reset to its initial value ('cancel' event is emitted) then closes Popup
   */
  cancel: () => void;
  /**
   * Triggers component to show
   * @param evt JS event object
   */
  show: (evt?: Event) => void;
  /**
   * Triggers component to hide
   * @param evt JS event object
   */
  hide: (evt?: Event) => void;
  /**
   * There are some custom scenarios for which Quasar cannot automatically reposition the component without significant performance drawbacks so the optimal solution is for you to call this method when you need it
   */
  updatePosition: () => void;
}

export interface QPopupProxyProps {
  /**
   * Configure a target element to trigger component toggle; 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements; By using a String (CSS selector) or a DOM element it attaches the events to the specified DOM element (if it exists)
   * Default value: true
   */
  target?: boolean | string | Element | undefined;
  /**
   * Skips attaching events to the target DOM element (that trigger the element to get shown)
   */
  noParentEvent?: boolean | undefined;
  /**
   * Allows the component to behave like a context menu, which opens with a right mouse click (or long tap on mobile)
   */
  contextMenu?: boolean | undefined;
  /**
   * Defines the state of the component (shown/hidden); Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue?: boolean;
  /**
   * Breakpoint (in pixels) of window width/height (whichever is smaller) from where a Menu will get to be used instead of a Dialog
   * Default value: 450
   */
  breakpoint?: number | string | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: any) => void;
  /**
   * Emitted when component triggers show() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeShow?: (evt: Event) => void;
  /**
   * Emitted after component has triggered show()
   * @param evt JS event object
   */
  onShow?: (evt: Event) => void;
  /**
   * Emitted when component triggers hide() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeHide?: (evt: Event) => void;
  /**
   * Emitted after component has triggered hide()
   * @param evt JS event object
   */
  onHide?: (evt: Event) => void;
}

export interface QPopupProxySlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QPopupProxy extends ComponentPublicInstance<QPopupProxyProps> {
  /**
   * Triggers component to show
   * @param evt JS event object
   */
  show: (evt?: Event) => void;
  /**
   * Triggers component to hide
   * @param evt JS event object
   */
  hide: (evt?: Event) => void;
  /**
   * Triggers component to toggle between show/hide
   * @param evt JS event object
   */
  toggle: (evt?: Event) => void;
  /**
   * Access current underlying component (QMenu or QDialog)
   */
  readonly currentComponent: {
    /**
     * Component type
     */
    type?: "dialog" | "menu";
    /**
     * The actual component (QMenu or QDialog); Access it directly, without '.value'
     */
    ref?: QPopupProxyInnerComponent;
  };
}

export interface QPullToRefreshProps {
  /**
   * Color name for the icon from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for background of the icon container from the Quasar Color Palette
   */
  bgColor?: NamedColor | undefined;
  /**
   * Icon to display when refreshing the content
   */
  icon?: string | undefined;
  /**
   * Don't listen for mouse events
   */
  noMouse?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one
   */
  scrollTarget?: Element | string | undefined;
  /**
   * Called whenever a refresh is triggered; at this time, your function should load more data
   * @param done Call the done() function when your data has been refreshed
   */
  onRefresh?: (done: () => void) => void;
}

export interface QPullToRefreshSlots {
  /**
   * Content (area controlled by the component) goes here
   */
  default: () => VNode[];
}

export interface QPullToRefresh
  extends ComponentPublicInstance<QPullToRefreshProps> {
  /**
   * Triggers a refresh
   */
  trigger: () => void;
  /**
   * Updates the scroll target; Useful when the parent elements change so that the scrolling target also changes
   */
  updateScrollTarget: () => void;
}

export interface QRadioProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue: number | string | null | undefined;
  /**
   * The actual value of the option with which model value is changed
   */
  val: number | string | null | undefined;
  /**
   * Label to display along the radio control (or use the default slot instead of this prop)
   */
  label?: string | undefined;
  /**
   * Label (if any specified) should be displayed on the left side of the checkbox
   */
  leftLabel?: boolean | undefined;
  /**
   * The icon to be used when selected (instead of the default design)
   */
  checkedIcon?: string | undefined;
  /**
   * The icon to be used when un-selected (instead of the default design)
   */
  uncheckedIcon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Should the color (if specified any) be kept when checkbox is unticked?
   */
  keepColor?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   * @param evt JS event object
   */
  "onUpdate:modelValue"?: (value: any, evt: Event) => void;
}

export interface QRadioSlots {
  /**
   * Default slot can be used as label, unless 'label' prop is specified; Suggestion: string
   */
  default: () => VNode[];
}

export interface QRadio extends ComponentPublicInstance<QRadioProps> {
  /**
   * Sets the Radio's v-model to equal the val
   */
  set: () => void;
}

export interface QRangeProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Minimum value of the model; Set track's minimum value
   */
  min?: number | undefined;
  /**
   * Maximum value of the model; Set track's maximum value
   * Default value: 100
   */
  max?: number | undefined;
  /**
   * Inner minimum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be higher or equal to 'min' prop; Defaults to 'min' prop
   */
  innerMin?: number | undefined;
  /**
   * Inner maximum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be lower or equal to 'max' prop; Defaults to 'max' prop
   */
  innerMax?: number | undefined;
  /**
   * Specify step amount between valid values (> 0.0); When step equals to 0 it defines infinite granularity
   * Default value: 1
   */
  step?: number | undefined;
  /**
   * Snap on valid values, rather than sliding freely; Suggestion: use with 'step' prop
   */
  snap?: boolean | undefined;
  /**
   * Work in reverse (changes direction)
   */
  reverse?: boolean | undefined;
  /**
   * Display in vertical direction
   */
  vertical?: boolean | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for the track (can be 'transparent' too) from the Quasar Color Palette
   */
  trackColor?: NamedColor | undefined;
  /**
   * Apply a pattern image on the track
   */
  trackImg?: string | undefined;
  /**
   * Color name for the inner track (can be 'transparent' too) from the Quasar Color Palette
   */
  innerTrackColor?: NamedColor | undefined;
  /**
   * Apply a pattern image on the inner track
   */
  innerTrackImg?: string | undefined;
  /**
   * Color name for the selection bar (can be 'transparent' too) from the Quasar Color Palette
   */
  selectionColor?: NamedColor | undefined;
  /**
   * Apply a pattern image on the selection bar
   */
  selectionImg?: string | undefined;
  /**
   * Popup a label when user clicks/taps on the slider thumb and moves it
   */
  label?: boolean | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  labelColor?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  labelTextColor?: NamedColor | undefined;
  /**
   * Switch the position of the label (top <-> bottom or left <-> right)
   */
  switchLabelSide?: boolean | undefined;
  /**
   * Always display the label
   */
  labelAlways?: boolean | undefined;
  /**
   * Display markers on the track, one for each possible value for the model or using a custom step (when specifying a Number)
   */
  markers?: boolean | number | undefined;
  /**
   * Configure the marker labels (or show the default ones if 'true'); Array of definition Objects or Object with key-value where key is the model and the value is the marker label definition
   * @param value The marker value to transform
   * @returns Marker definition Object or directly a String for the label of the marker
   */
  markerLabels?: SliderMarkerLabels | undefined;
  /**
   * CSS class(es) to apply to the marker labels container
   */
  markerLabelsClass?: string | undefined;
  /**
   * Switch the position of the marker labels (top <-> bottom or left <-> right)
   */
  switchMarkerLabelsSide?: boolean | undefined;
  /**
   * Track size (including CSS unit)
   * Default value: 4px
   */
  trackSize?: string | undefined;
  /**
   * Thumb size (including CSS unit)
   * Default value: 20px
   */
  thumbSize?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  thumbColor?: NamedColor | undefined;
  /**
   * Set custom thumb svg path
   * Default value: M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0
   */
  thumbPath?: string | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Model of the component of type { min, max } (both values must be between global min/max); Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue:
    | {
        /**
         * Model value for left thumb
         */
        min?: number | null;
        /**
         * Model value for right thumb
         */
        max?: number | null;
      }
    | null
    | undefined;
  /**
   * User can drag range instead of just the two thumbs
   */
  dragRange?: boolean | undefined;
  /**
   * User can drag only the range instead and NOT the two thumbs
   */
  dragOnlyRange?: boolean | undefined;
  /**
   * Color name for left label background from the Quasar Color Palette
   */
  leftLabelColor?: NamedColor | undefined;
  /**
   * Color name for left label text from the Quasar Color Palette
   */
  leftLabelTextColor?: NamedColor | undefined;
  /**
   * Color name for right label background from the Quasar Color Palette
   */
  rightLabelColor?: NamedColor | undefined;
  /**
   * Color name for right label text from the Quasar Color Palette
   */
  rightLabelTextColor?: NamedColor | undefined;
  /**
   * Override default label for min value
   */
  leftLabelValue?: string | number | undefined;
  /**
   * Override default label for max value
   */
  rightLabelValue?: string | number | undefined;
  /**
   * Color name (from the Quasar Color Palette) for left thumb
   */
  leftThumbColor?: NamedColor | undefined;
  /**
   * Color name (from the Quasar Color Palette) for right thumb
   */
  rightThumbColor?: NamedColor | undefined;
  /**
   * Emitted on lazy model value change (after user slides then releases the thumb)
   * @param value New model value
   */
  onChange?: (value: any) => void;
  /**
   * Triggered when user starts panning on the component
   * @param phase Phase of panning
   */
  onPan?: (phase: "start" | "end") => void;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: any) => void;
}

export interface QRangeSlots {
  /**
   * What should the menu display after filtering options and none are left to be displayed; Suggestion: <div>
   * @param scope
   */
  "marker-label": (scope: {
    /**
     * Config for current marker label
     */
    marker: SliderMarkerLabelConfig;
    /**
     * Array of marker label configs
     */
    markerList: SliderMarkerLabelArrayConfig[];
    /**
     * Object with key-value where key is the model and the value is the marker label config
     */
    markerMap: SliderMarkerLabelObjectConfig;
    /**
     * Required CSS classes to be applied to the marker element
     */
    classes: string;
    /**
     * Get CSS style Object to apply to a marker element at respective model value; For perf reasons, use only if requested model value is not already part of markerMap
     * @param value The marker label equivalent model value
     * @returns CSS style Object to apply to a marker element at respective model value
     */
    getStyle: (value: number) => any;
  }) => VNode[];
  /**
   * What should the menu display after filtering options and none are left to be displayed; Suggestion: <div>
   * @param scope
   */
  "marker-label-group": (scope: {
    /**
     * Array of marker label configs
     */
    markerList: SliderMarkerLabelArrayConfig[];
    /**
     * Object with key-value where key is the model and the value is the marker label config
     */
    markerMap: SliderMarkerLabelObjectConfig;
    /**
     * Required CSS classes to be applied to the marker element
     */
    classes: string;
    /**
     * Get CSS style Object to apply to a marker element at respective model value; For perf reasons, use only if requested model value is not already part of markerMap
     * @param value The marker label equivalent model value
     * @returns CSS style Object to apply to a marker element at respective model value
     */
    getStyle: (value: number) => any;
  }) => VNode[];
}

export interface QRange extends ComponentPublicInstance<QRangeProps> {}

export interface QRatingProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue: number;
  /**
   * Number of icons to display
   * Default value: 5
   */
  max?: number | string | undefined;
  /**
   * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix; If an array is provided each rating value will use the corresponding icon in the array (0 based)
   */
  icon?: string | readonly any[] | undefined;
  /**
   * Icon name following Quasar convention to be used when selected (optional); make sure you have the icon library installed unless you are using 'img:' prefix; If an array is provided each rating value will use the corresponding icon in the array (0 based)
   */
  iconSelected?: string | readonly any[] | undefined;
  /**
   * Icon name following Quasar convention to be used when selected (optional); make sure you have the icon library installed unless you are using 'img:' prefix; If an array is provided each rating value will use the corresponding icon in the array (0 based)
   */
  iconHalf?: string | readonly any[] | undefined;
  /**
   * Label to be set on aria-label for Icon; If an array is provided each rating value will use the corresponding aria-label in the array (0 based); If string value is provided the rating value will be appended; If not provided the name of the icon will be used
   */
  iconAriaLabel?: string | readonly any[] | undefined;
  /**
   * Color name for component from the Quasar Color Palette; v1.5.0+: If an array is provided each rating value will use the corresponding color in the array (0 based)
   */
  color?: NamedColor | NamedColor[] | undefined;
  /**
   * Color name from the Quasar Palette for selected icons
   */
  colorSelected?: NamedColor | NamedColor[] | undefined;
  /**
   * Color name from the Quasar Palette for half selected icons
   */
  colorHalf?: NamedColor | NamedColor[] | undefined;
  /**
   * Does not lower opacity for unselected icons
   */
  noDimming?: boolean | undefined;
  /**
   * When used, disables default behavior of clicking/tapping on icon which represents current model value to reset model to 0
   */
  noReset?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: any) => void;
}

export interface QRatingSlots {
  /**
   * Slot to define the tooltip of icon at '[name]' where name is a 1-based index; Suggestion: QTooltip
   */
  [key: `tip-${string}`]: () => VNode[];
}

export interface QRating extends ComponentPublicInstance<QRatingProps> {}

export interface QResizeObserverProps {
  /**
   * Debounce amount (in milliseconds)
   * Default value: 100
   */
  debounce?: string | number | undefined;
  /**
   * Parent element has resized (width or height changed)
   * @param size New size
   */
  onResize?: (size: {
    /**
     * Layout height
     */
    height: number;
    /**
     * Layout width
     */
    width: number;
  }) => void;
}

export interface QResizeObserverSlots {}

export interface QResizeObserver
  extends ComponentPublicInstance<QResizeObserverProps> {
  /**
   * Emit a 'resize' event
   * @param immediately Skip over the debounce amount
   */
  trigger: (immediately?: boolean) => void;
}

export interface QResponsiveProps {
  /**
   * Aspect ratio for the content; If value is a String, then avoid using a computational statement (like '16/9') and instead specify the String value of the result directly (eg. '1.7777')
   */
  ratio?: string | number | undefined;
}

export interface QResponsiveSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QResponsive
  extends ComponentPublicInstance<QResponsiveProps> {}

export interface QScrollAreaProps {
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Object with CSS properties and values for custom styling the scrollbars (both vertical and horizontal)
   */
  barStyle?: VueStyleProp | undefined;
  /**
   * Object with CSS properties and values for custom styling the vertical scrollbar; Is applied on top of 'bar-style' prop
   */
  verticalBarStyle?: VueStyleProp | undefined;
  /**
   * Object with CSS properties and values for custom styling the horizontal scrollbar; Is applied on top of 'bar-style' prop
   */
  horizontalBarStyle?: VueStyleProp | undefined;
  /**
   * Object with CSS properties and values for custom styling the thumb of scrollbars (both vertical and horizontal)
   */
  thumbStyle?: VueStyleObjectProp | undefined;
  /**
   * Object with CSS properties and values for custom styling the thumb of the vertical scrollbar; Is applied on top of 'thumb-style' prop
   */
  verticalThumbStyle?: VueStyleObjectProp | undefined;
  /**
   * Object with CSS properties and values for custom styling the thumb of the horizontal scrollbar; Is applied on top of 'thumb-style' prop
   */
  horizontalThumbStyle?: VueStyleObjectProp | undefined;
  /**
   * Object with CSS properties and values for styling the container of QScrollArea
   */
  contentStyle?: VueStyleProp | undefined;
  /**
   * Object with CSS properties and values for styling the container of QScrollArea when scroll area becomes active (is mouse hovered)
   */
  contentActiveStyle?: VueStyleProp | undefined;
  /**
   * Manually control the visibility of the scrollbar; Overrides default mouse over/leave behavior
   */
  visible?: boolean | undefined;
  /**
   * When content changes, the scrollbar appears; this delay defines the amount of time (in milliseconds) before scrollbars disappear again (if component is not hovered)
   * Default value: 1000
   */
  delay?: number | string | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Emitted when scroll information changes (and listener is configured)
   * @param info An object containing scroll information
   */
  onScroll?: (info: {
    /**
     * Vue reference to the QScrollArea which triggered the event
     */
    ref: QScrollArea;
    /**
     * Vertical scroll position (in px)
     */
    verticalPosition: number;
    /**
     * Vertical scroll percentage (0.0 <= x <= 1.0)
     */
    verticalPercentage: number;
    /**
     * Vertical scroll size (in px)
     */
    verticalSize: number;
    /**
     * Height of the container (in px)
     */
    verticalContainerSize: number;
    /**
     * Horizontal scroll position (in px)
     */
    horizontalPosition: number;
    /**
     * Horizontal scroll percentage (0.0 <= x <= 1.0)
     */
    horizontalPercentage: number;
    /**
     * Horizontal scroll size (in px)
     */
    horizontalSize: number;
    /**
     * Width of the container (in px)
     */
    horizontalContainerSize: number;
  }) => void;
}

export interface QScrollAreaSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QScrollArea extends ComponentPublicInstance<QScrollAreaProps> {
  /**
   * Get the scrolling DOM element target
   * @returns DOM element upon which scrolling takes place
   */
  getScrollTarget: () => Element;
  /**
   * Get the current scroll information
   * @returns Scroll information
   */
  getScroll: () => {
    /**
     * Vertical scroll position (in px)
     */
    verticalPosition: number;
    /**
     * Vertical scroll percentage (0.0 <= x <= 1.0)
     */
    verticalPercentage: number;
    /**
     * Vertical scroll size (in px)
     */
    verticalSize: number;
    /**
     * Height of the container (in px)
     */
    verticalContainerSize: number;
    /**
     * Horizontal scroll position (in px)
     */
    horizontalPosition: number;
    /**
     * Horizontal scroll percentage (0.0 <= x <= 1.0)
     */
    horizontalPercentage: number;
    /**
     * Horizontal scroll size (in px)
     */
    horizontalSize: number;
    /**
     * Width of the container (in px)
     */
    horizontalContainerSize: number;
  };
  /**
   * Get current scroll position
   * @returns An object containing scroll position information
   */
  getScrollPosition: () => {
    /**
     * Scroll offset from top (vertical)
     */
    top: number;
    /**
     * Scroll offset from left (horizontal)
     */
    left: number;
  };
  /**
   * Get current scroll position in percentage (0.0 <= x <= 1.0)
   * @returns An object containing scroll position information in percentage
   */
  getScrollPercentage: () => {
    /**
     * Scroll percentage (0.0 <= x <= 1.0) offset from top (vertical)
     */
    top: number;
    /**
     * Scroll percentage (0.0 <= x <= 1.0) offset from left (horizontal)
     */
    left: number;
  };
  /**
   * Set scroll position to an offset; If a duration (in milliseconds) is specified then the scroll is animated
   * @param axis Scroll axis
   * @param offset Scroll position offset from top (in pixels)
   * @param duration Duration (in milliseconds) enabling animated scroll
   */
  setScrollPosition: (
    axis: "vertical" | "horizontal",
    offset: number,
    duration?: number
  ) => void;
  /**
   * Set scroll position to a percentage (0.0 <= x <= 1.0) of the total scrolling size; If a duration (in milliseconds) is specified then the scroll is animated
   * @param axis Scroll axis
   * @param offset Scroll percentage (0.0 <= x <= 1.0) of the total scrolling size
   * @param duration Duration (in milliseconds) enabling animated scroll
   */
  setScrollPercentage: (
    axis: "vertical" | "horizontal",
    offset: number,
    duration?: number
  ) => void;
}

export interface QScrollObserverProps {
  /**
   * Debounce amount (in milliseconds)
   */
  debounce?: string | number | undefined;
  /**
   * Axis on which to detect changes
   * Default value: vertical
   */
  axis?: "both" | "vertical" | "horizontal" | undefined;
  /**
   * CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one
   */
  scrollTarget?: Element | string | undefined;
  /**
   * Emitted when scroll position changes
   * @param details Scroll details
   */
  onScroll?: (details: {
    /**
     * Scroll offset (from top and left)
     */
    position: {
      /**
       * Scroll offset from top (vertical)
       */
      top: number;
      /**
       * Scroll offset from left (horizontal)
       */
      left: number;
    };
    /**
     * Direction of scroll
     */
    direction: "up" | "down" | "left" | "right";
    /**
     * Has scroll direction changed since event was last emitted?
     */
    directionChanged: boolean;
    /**
     * Delta of distance (in pixels) since event was last emitted
     */
    delta: {
      /**
       * Vertical delta distance since event was last emitted
       */
      top: number;
      /**
       * Horizontal delta distance since event was last emitted
       */
      left: number;
    };
    /**
     * Last scroll offset where scroll direction has changed
     */
    inflectionPoint: {
      /**
       * Scroll offset from top (vertical)
       */
      top: number;
      /**
       * Scroll offset from left (horizontal)
       */
      left: number;
    };
  }) => void;
}

export interface QScrollObserverSlots {}

export interface QScrollObserver
  extends ComponentPublicInstance<QScrollObserverProps> {
  /**
   * Emit a 'scroll' event
   * @param immediately Skip over the debounce amount
   */
  trigger: (immediately?: boolean) => void;
  /**
   * Get current scroll details under the form of an Object: { position, direction, directionChanged, inflectionPoint }
   */
  getPosition: () => void;
}

export interface QSelectProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms; If not specified, it takes the value of 'for' prop, if it exists
   */
  name?: string | undefined;
  /**
   * Make virtual list work in horizontal mode
   */
  virtualScrollHorizontal?: boolean | undefined;
  /**
   * Minimum number of items to render in the virtual list
   * Default value: 30
   */
  virtualScrollSliceSize?: number | string | undefined;
  /**
   * Ratio of number of items in visible zone to render before it
   * Default value: 1
   */
  virtualScrollSliceRatioBefore?: number | string | undefined;
  /**
   * Ratio of number of items in visible zone to render after it
   * Default value: 1
   */
  virtualScrollSliceRatioAfter?: number | string | undefined;
  /**
   * Default size in pixels (height if vertical, width if horizontal) of an item; This value is used for rendering the initial list; Try to use a value close to the minimum size of an item
   * Default value: 24
   */
  virtualScrollItemSize?: number | string | undefined;
  /**
   * Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the start of the list; A correct value will improve scroll precision
   * Default value: 0
   */
  virtualScrollStickySizeStart?: number | string | undefined;
  /**
   * Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the end of the list; A correct value will improve scroll precision
   * Default value: 0
   */
  virtualScrollStickySizeEnd?: number | string | undefined;
  /**
   * The number of columns in the table (you need this if you use table-layout: fixed)
   */
  tableColspan?: number | string | undefined;
  /**
   * Model of the component; Must be Array if using 'multiple' prop; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue: any;
  /**
   * Does field have validation errors?
   */
  error?: boolean | undefined;
  /**
   * Validation error message (gets displayed only if 'error' is set to 'true')
   */
  errorMessage?: string | undefined;
  /**
   * Hide error icon when there is an error
   */
  noErrorIcon?: boolean | undefined;
  /**
   * Array of Functions/Strings; If String, then it must be a name of one of the embedded validation rules
   */
  rules?: ValidationRule[] | undefined;
  /**
   * By default a change in the rules does not trigger a new validation until the model changes; If set to true then a change in the rules will trigger a validation; Has a performance penalty, so use it only when you really need it
   */
  reactiveRules?: boolean | undefined;
  /**
   * If set to boolean true then it checks validation status against the 'rules' only after field loses focus for first time; If set to 'ondemand' then it will trigger only when component's validate() method is manually called or when the wrapper QForm submits itself
   */
  lazyRules?: boolean | "ondemand" | undefined;
  /**
   * A text label that will “float” up above the input field, once the field gets focus
   */
  label?: string | undefined;
  /**
   * Label will be always shown above the field regardless of field content (if any)
   */
  stackLabel?: boolean | undefined;
  /**
   * Helper (hint) text which gets placed below your wrapped form component
   */
  hint?: string | undefined;
  /**
   * Hide the helper (hint) text when field doesn't have focus
   */
  hideHint?: boolean | undefined;
  /**
   * Prefix
   */
  prefix?: string | undefined;
  /**
   * Suffix
   */
  suffix?: string | undefined;
  /**
   * Color name for the label from the Quasar Color Palette; Overrides the 'color' prop; The difference from 'color' prop is that the label will always have this color, even when field is not focused
   */
  labelColor?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  bgColor?: NamedColor | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Signals the user a process is in progress by displaying a spinner; Spinner can be customized by using the 'loading' slot.
   */
  loading?: boolean | undefined;
  /**
   * Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null
   */
  clearable?: boolean | undefined;
  /**
   * Custom icon to use for the clear button when using along with 'clearable' prop
   */
  clearIcon?: string | undefined;
  /**
   * Use 'filled' design for the field
   */
  filled?: boolean | undefined;
  /**
   * Use 'outlined' design for the field
   */
  outlined?: boolean | undefined;
  /**
   * Use 'borderless' design for the field
   */
  borderless?: boolean | undefined;
  /**
   * Use 'standout' design for the field; Specifies classes to be applied when focused (overriding default ones)
   */
  standout?: boolean | string | undefined;
  /**
   * Enables label slot; You need to set it to force use of the 'label' slot if the 'label' prop is not set
   */
  labelSlot?: boolean | undefined;
  /**
   * Enables bottom slots ('error', 'hint', 'counter')
   */
  bottomSlots?: boolean | undefined;
  /**
   * Do not reserve space for hint/error/counter anymore when these are not used; As a result, it also disables the animation for those; It also allows the hint/error area to stretch vertically based on its content
   */
  hideBottomSpace?: boolean | undefined;
  /**
   * Show an automatic counter on bottom right
   */
  counter?: boolean | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
  /**
   * Remove border-radius so borders are squared; Overrides 'rounded' prop
   */
  square?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Match inner content alignment to that of QItem
   */
  itemAligned?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Focus field on initial component render
   */
  autofocus?: boolean | undefined;
  /**
   * Used to specify the 'id' of the control and also the 'for' attribute of the label that wraps it; If no 'name' prop is specified, then it is used for this attribute as well
   */
  for?: string | undefined;
  /**
   * Allow multiple selection; Model must be Array
   */
  multiple?: boolean | undefined;
  /**
   * Override default selection string, if not using 'selected' slot/scoped slot and if not using 'use-chips' prop
   */
  displayValue?: number | string | undefined;
  /**
   * Force render the selected option(s) as HTML; This can lead to XSS attacks so make sure that you sanitize the content; Does NOT apply when using 'selected' or 'selected-item' slots!
   */
  displayValueHtml?: boolean | undefined;
  /**
   * Available options that the user can select from. For best performance freeze the list of options.
   * Default value: []
   */
  options?: readonly any[] | undefined;
  /**
   * Property of option which holds the 'value'; If using a function then for best performance, reference it from your scope and do not define it inline
   * Default value: value
   * @param option The current option being processed
   * @returns Value of the current option
   */
  optionValue?: ((option: string | any) => any) | string | undefined;
  /**
   * Property of option which holds the 'label'; If using a function then for best performance, reference it from your scope and do not define it inline
   * Default value: label
   * @param option The current option being processed
   * @returns Label of the current option
   */
  optionLabel?: ((option: string | any) => string) | string | undefined;
  /**
   * Property of option which tells it's disabled; The value of the property must be a Boolean; If using a function then for best performance, reference it from your scope and do not define it inline
   * Default value: disable
   * @param option The current option being processed
   * @returns If true, the current option will be disabled
   */
  optionDisable?: ((option: string | any) => boolean) | string | undefined;
  /**
   * Hides selection; Use the underlying input tag to hold the label (instead of showing it to the right of the input) of the selected option; Only works for non 'multiple' Selects
   */
  hideSelected?: boolean | undefined;
  /**
   * Hides dropdown icon
   */
  hideDropdownIcon?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  dropdownIcon?: string | undefined;
  /**
   * Allow a maximum number of selections that the user can do
   */
  maxValues?: number | string | undefined;
  /**
   * Dense mode for options list; occupies less space
   */
  optionsDense?: boolean | undefined;
  /**
   * Options menu will be colored with a dark color
   */
  optionsDark?: boolean | undefined;
  /**
   * CSS class name for options that are active/selected; Set it to an empty string to stop applying the default (which is text-* where * is the 'color' prop value)
   */
  optionsSelectedClass?: string | undefined;
  /**
   * Force render the options as HTML; This can lead to XSS attacks so make sure that you sanitize the content; Does NOT apply when using 'option' slot!
   */
  optionsHtml?: boolean | undefined;
  /**
   * Expanded menu will cover the component (will not work along with 'use-input' prop for obvious reasons)
   */
  optionsCover?: boolean | undefined;
  /**
   * Allow the options list to be narrower than the field (only in menu mode)
   */
  menuShrink?: boolean | undefined;
  /**
   * Two values setting the starting position or anchor point of the options list relative to the field (only in menu mode)
   */
  menuAnchor?:
    | "top left"
    | "top middle"
    | "top right"
    | "top start"
    | "top end"
    | "center left"
    | "center middle"
    | "center right"
    | "center start"
    | "center end"
    | "bottom left"
    | "bottom middle"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | undefined;
  /**
   * Two values setting the options list's own position relative to its target (only in menu mode)
   */
  menuSelf?:
    | "top left"
    | "top middle"
    | "top right"
    | "top start"
    | "top end"
    | "center left"
    | "center middle"
    | "center right"
    | "center start"
    | "center end"
    | "bottom left"
    | "bottom middle"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | undefined;
  /**
   * An array of two numbers to offset the options list horizontally and vertically in pixels (only in menu mode)
   */
  menuOffset?: readonly any[] | undefined;
  /**
   * Class definitions to be attributed to the popup content
   */
  popupContentClass?: string | undefined;
  /**
   * Style definitions to be attributed to the popup content
   */
  popupContentStyle?: VueStyleProp | undefined;
  /**
   * Use an input tag where users can type
   */
  useInput?: boolean | undefined;
  /**
   * Use QChip to show what is currently selected
   */
  useChips?: boolean | undefined;
  /**
   * Fills the input with current value; Useful along with 'hide-selected'; Does NOT works along with 'multiple' selection
   */
  fillInput?: boolean | undefined;
  /**
   * Enables creation of new values and defines behavior when a new value is added: 'add' means it adds the value (even if possible duplicate), 'add-unique' adds only unique values, and 'toggle' adds or removes the value (based on if it exists or not already); When using this prop then listening for @new-value becomes optional (only to override the behavior defined by 'new-value-mode')
   */
  newValueMode?: "add" | "add-unique" | "toggle" | undefined;
  /**
   * Try to map labels of model from 'options' Array; has a small performance penalty; If you are using emit-value you will probably need to use map-options to display the label text in the select field rather than the value;  Refer to the 'Affecting model' section above
   */
  mapOptions?: boolean | undefined;
  /**
   * Update model with the value of the selected option instead of the whole option
   */
  emitValue?: boolean | undefined;
  /**
   * Debounce the input model update with an amount of milliseconds (also affects the 'filter' event, if used)
   * Default value: 500
   */
  inputDebounce?: number | string | undefined;
  /**
   * Class definitions to be attributed to the underlying input tag
   */
  inputClass?: VueClassProp | undefined;
  /**
   * Style definitions to be attributed to the underlying input tag
   */
  inputStyle?: VueStyleProp | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Autocomplete attribute for field
   */
  autocomplete?: string | undefined;
  /**
   * Transition when showing the menu/dialog; One of Quasar's embedded transitions
   * Default value: fade
   */
  transitionShow?: string | undefined;
  /**
   * Transition when hiding the menu/dialog; One of Quasar's embedded transitions
   * Default value: fade
   */
  transitionHide?: string | undefined;
  /**
   * Transition duration when hiding the menu/dialog (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Overrides the default dynamic mode of showing as menu on desktop and dialog on mobiles
   * Default value: default
   */
  behavior?: "default" | "menu" | "dialog" | undefined;
  /**
   * Emitted when the virtual scroll occurs
   * @param details Object of properties on the new scroll position
   */
  onVirtualScroll?: (details: {
    /**
     * Index of the list item that was scrolled into view (0 based)
     */
    index: number;
    /**
     * The index of the first list item that is rendered (0 based)
     */
    from: number;
    /**
     * The index of the last list item that is rendered (0 based)
     */
    to: number;
    /**
     * Direction of change
     */
    direction: "increase" | "decrease";
    /**
     * Vue reference to the QSelect
     */
    ref: QSelect;
  }) => void;
  /**
   * When using the 'clearable' property, this event is emitted when the clear icon is clicked
   * @param value The previous value before clearing it
   */
  onClear?: (value: any) => void;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: any) => void;
  /**
   * Emitted when the value in the text input changes
   * @param value New text value
   */
  onInputValue?: (value: string) => void;
  /**
   * Emitted when an option is removed from selection
   * @param details Removal details
   */
  onRemove?: (details: {
    /**
     * Model index at which removal took place
     */
    index: number;
    /**
     * The actual value that was removed
     */
    value: any;
  }) => void;
  /**
   * Emitted when an option is added to the selection
   * @param details Addition details
   */
  onAdd?: (details: {
    /**
     * Model index at which addition took place
     */
    index: number;
    /**
     * The actual value that was added
     */
    value: any;
  }) => void;
  /**
   * Enables creation of new values; Emitted when a new value has been created; You can override 'new-value-mode' property with it
   * @param inputValue What the user typed
   * @param doneFn Adds (optional) value to the model; Do not forget to call it after you validate the newly created value; Call it with no parameters if nothing should be added
   */
  onNewValue?: (
    inputValue: string,
    doneFn: (item?: any, mode?: "add" | "add-unique" | "toggle") => void
  ) => void;
  /**
   * Emitted when user wants to filter a value
   * @param inputValue What the user typed
   * @param doneFn Supply a function which makes the necessary updates
   * @param abortFn Call this function if something went wrong
   */
  onFilter?: (
    inputValue: string,
    doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
    abortFn: () => void
  ) => void;
  /**
   * Emitted when a filtering was aborted; Probably a new one was requested?
   */
  onFilterAbort?: () => void;
  /**
   * Emitted when the select options menu or dialog is shown.
   * @param evt JS event object
   */
  onPopupShow?: (evt: Event) => void;
  /**
   * Emitted when the select options menu or dialog is hidden.
   * @param evt JS event object
   */
  onPopupHide?: (evt: Event) => void;
}

export interface QSelectSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
  /**
   * Prepend inner field; Suggestions: QIcon, QBtn
   */
  prepend: () => VNode[];
  /**
   * Append to inner field; Suggestions: QIcon, QBtn
   */
  append: () => VNode[];
  /**
   * Prepend outer field; Suggestions: QIcon, QBtn
   */
  before: () => VNode[];
  /**
   * Append outer field; Suggestions: QIcon, QBtn
   */
  after: () => VNode[];
  /**
   * Slot for label; Used only if 'label-slot' prop is set or the 'label' prop is set; When it is used the text in the 'label' prop is ignored
   */
  label: () => VNode[];
  /**
   * Slot for errors; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  error: () => VNode[];
  /**
   * Slot for hint text; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  hint: () => VNode[];
  /**
   * Slot for counter text; Enabled only if 'bottom-slots' prop is used; Suggestion: <div>
   */
  counter: () => VNode[];
  /**
   * Override default spinner when component is in loading mode; Suggestion: spinners
   */
  loading: () => VNode[];
  /**
   * Override default selection slot; Suggestion: QChip
   */
  selected: () => VNode[];
  /**
   * Template slot for the elements that should be rendered before the list of options
   */
  "before-options": () => VNode[];
  /**
   * Template slot for the elements that should be rendered after the list of options
   */
  "after-options": () => VNode[];
  /**
   * What should the menu display after filtering options and none are left to be displayed; Suggestion: <div>
   * @param scope
   */
  "no-option": (scope: {
    /**
     * Input textfield value, if any (not QSelect model)
     */
    inputValue: string;
  }) => VNode[];
  /**
   * Override default selection slot; Suggestion: QChip
   * @param scope
   */
  "selected-item": (scope: {
    /**
     * Selection index
     */
    index: number;
    /**
     * Selected option -- its value is taken from model
     */
    opt: any;
    /**
     * Always true -- passed down as prop to QItem (when using QItem)
     */
    selected: boolean;
    /**
     * Remove selected option located at specific index
     * @param index Index at which to remove selection
     */
    removeAtIndex: (index: number) => void;
    /**
     * Add/remove option from model
     * @param opt Option to add to model
     */
    toggleOption: (opt: any) => void;
    /**
     * Tabindex HTML attribute value associated with respective option
     */
    tabindex: number;
  }) => VNode[];
  /**
   * Customize how options are rendered; Suggestion: QItem
   * @param scope
   */
  option: (scope: {
    /**
     * Option index
     */
    index: number;
    /**
     * Option -- its value is taken from 'options' prop
     */
    opt: any;
    /**
     * Is option selected?
     */
    selected: boolean;
    /**
     * Is option focused?
     */
    focused: boolean;
    /**
     * Add/remove option from model
     * @param opt Option to add to model
     */
    toggleOption: (opt: any) => void;
    /**
     * Sets option from menu as 'focused'
     * @param index Index of option from menu
     */
    setOptionIndex: (index: number) => void;
    /**
     * Computed properties passed down to QItem
     */
    itemProps: any;
  }) => VNode[];
}

export interface QSelect extends ComponentPublicInstance<QSelectProps> {
  /**
   * Scroll the virtual scroll list to the item with the specified index (0 based)
   * @param index The index of the list item (0 based)
   * @param edge The edge to align to if the item is not visible already (by default it aligns to end if scrolling towards the end and to start otherwise); If the '-force' version is used then it always aligns
   */
  scrollTo: (
    index: string | number,
    edge?:
      | "start"
      | "center"
      | "end"
      | "start-force"
      | "center-force"
      | "end-force"
  ) => void;
  /**
   * Resets the virtual scroll computations; Needed for custom edge-cases
   */
  reset: () => void;
  /**
   * Refreshes the virtual scroll list; Use it after appending items
   * @param index The index of the list item to scroll to after refresh (0 based); If it's not specified the scroll position is not changed; Use a negative value to keep scroll position
   */
  refresh: (index?: string | number) => void;
  /**
   * Reset validation status
   */
  resetValidation: () => void;
  /**
   * Trigger a validation
   * @param value Optional value to validate against
   * @returns True/false if no async rules, otherwise a Promise with the outcome (true -> validation was a success, false -> invalid models detected)
   */
  validate: (value?: any) => boolean | Promise<boolean>;
  /**
   * Focus component
   */
  focus: () => void;
  /**
   * Blur component (lose focus)
   */
  blur: () => void;
  /**
   * Focus and open popup
   */
  showPopup: () => void;
  /**
   * Hide popup
   */
  hidePopup: () => void;
  /**
   * Remove selected option located at specific index
   * @param index Index at which to remove selection
   */
  removeAtIndex: (index: number) => void;
  /**
   * Adds option to model
   * @param opt Option to add to model
   * @param unique Option must be unique
   */
  add: (opt: any, unique?: boolean) => void;
  /**
   * Add/remove option from model
   * @param opt Option to add to model
   * @param keepOpen Don't close the menu and do not clear the filter
   */
  toggleOption: (opt: any, keepOpen?: boolean) => void;
  /**
   * Gets current focused option index from menu; It's -1 if no option is focused
   * @returns Index of option from menu; It's -1 if no option is focused
   */
  getOptionIndex: () => number;
  /**
   * Sets option from menu as 'focused'; -1 to focus none
   * @param index Index of option from menu; -1 to focus none
   */
  setOptionIndex: (index: number) => void;
  /**
   * Move selected option from menu by index offset
   * @param offset Number of options to move up or down
   * @param skipInputValue Don't set input-value on navigation
   */
  moveOptionSelection: (offset?: number, skipInputValue?: boolean) => void;
  /**
   * Filter options
   * @param value String to filter with
   */
  filter: (value: string) => void;
  /**
   * Recomputes menu position
   */
  updateMenuPosition: () => void;
  /**
   * If 'use-input' is specified, this updates the value that it holds
   * @param value String to set the input value to
   * @param noFilter Set to true if you don't want the filter (if any) to be also triggered
   */
  updateInputValue: (value: string, noFilter?: boolean) => void;
  /**
   * Tells if an option is selected
   * @param opt Option entry
   * @returns Option is selected or not
   */
  isOptionSelected: (opt: any) => boolean;
  /**
   * Get the model value that would be emitted by QSelect when selecting a said option; Also takes into consideration if 'emit-value' is set
   * @param opt Option entry
   * @returns Emitting model value of said option
   */
  getEmittingOptionValue: (opt: any) => any;
  /**
   * Get the model value of an option; Takes into consideration 'option-value' (if used), but does not looks for 'emit-value', like getEmittingOptionValue() does
   * @param opt Option entry
   * @returns Model value of said option
   */
  getOptionValue: (opt: any) => any;
  /**
   * Get the label of an option; Takes into consideration the 'option-label' prop (if used)
   * @param opt Option entry
   * @returns Label of said option
   */
  getOptionLabel: (opt: any) => any;
  /**
   * Tells if an option is disabled; Takes into consideration 'option-disable' prop (if used)
   * @param opt Option entry
   * @returns Option is disabled or not
   */
  isOptionDisabled: (opt: any) => boolean;
  /**
   * Whether the component is in error state
   */
  readonly hasError: boolean;
}

export interface QSeparatorProps {
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * If set to true, the corresponding direction margins will be set to 8px; It can also be set to a size in CSS units, including unit name, or one of the xs|sm|md|lg|xl predefined sizes
   * Default value: md
   */
  spaced?: boolean | string | undefined;
  /**
   * If set to Boolean true, the left and right margins will be set to 16px. If set to 'item' then it will match a QItem's design. If set to 'item-thumbnail' then it will match the design of a QItem with a thumbnail on the left side
   */
  inset?: boolean | "item" | "item-thumbnail" | undefined;
  /**
   * If set to true, the separator will be vertical.
   */
  vertical?: boolean | undefined;
  /**
   * Size in CSS units, including unit name
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSeparatorSlots {}

export interface QSeparator extends ComponentPublicInstance<QSeparatorProps> {}

export interface QSkeletonProps {
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Type of skeleton placeholder
   * Default value: rect
   */
  type?:
    | "text"
    | "rect"
    | "circle"
    | "QBtn"
    | "QBadge"
    | "QChip"
    | "QToolbar"
    | "QCheckbox"
    | "QRadio"
    | "QToggle"
    | "QSlider"
    | "QRange"
    | "QInput"
    | "QAvatar"
    | undefined;
  /**
   * The animation effect of the skeleton placeholder
   * Default value: wave
   */
  animation?:
    | "wave"
    | "pulse"
    | "pulse-x"
    | "pulse-y"
    | "fade"
    | "blink"
    | "none"
    | undefined;
  /**
   * Animation speed (in milliseconds, without unit)
   * Default value: 300
   */
  animationSpeed?: string | number | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Size in CSS units, including unit name; Overrides 'height' and 'width' props and applies the value to both height and width
   */
  size?: string | undefined;
  /**
   * Width in CSS units, including unit name; Apply custom width; Use this prop or through CSS; Overridden by 'size' prop if used
   */
  width?: string | undefined;
  /**
   * Height in CSS units, including unit name; Apply custom height; Use this prop or through CSS; Overridden by 'size' prop if used
   */
  height?: string | undefined;
  /**
   * HTML tag to use
   * Default value: div
   */
  tag?: string | undefined;
}

export interface QSkeletonSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QSkeleton extends ComponentPublicInstance<QSkeletonProps> {}

export interface QSlideItemProps {
  /**
   * Color name for left-side background from the Quasar Color Palette
   */
  leftColor?: NamedColor | undefined;
  /**
   * Color name for right-side background from the Quasar Color Palette
   */
  rightColor?: NamedColor | undefined;
  /**
   * Color name for top-side background from the Quasar Color Palette
   */
  topColor?: NamedColor | undefined;
  /**
   * Color name for bottom-side background from the Quasar Color Palette
   */
  bottomColor?: NamedColor | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Emitted when user finished sliding the item to the left
   * @param details Details
   */
  onLeft?: (details: {
    /**
     * When called, it resets the component to its initial non-slided state
     */
    reset: () => void;
  }) => void;
  /**
   * Emitted when user finished sliding the item to the right
   * @param details Details
   */
  onRight?: (details: {
    /**
     * When called, it resets the component to its initial non-slided state
     */
    reset: () => void;
  }) => void;
  /**
   * Emitted when user finished sliding the item up
   * @param details Details
   */
  onTop?: (details: {
    /**
     * When called, it resets the component to its initial non-slided state
     */
    reset: () => void;
  }) => void;
  /**
   * Emitted when user finished sliding the item down
   * @param details Details
   */
  onBottom?: (details: {
    /**
     * When called, it resets the component to its initial non-slided state
     */
    reset: () => void;
  }) => void;
  /**
   * Emitted while user is sliding the item to one of the available sides
   * @param details Details
   */
  onSlide?: (details: {
    /**
     * Side to which sliding is taking effect
     */
    side: "left" | "right" | "top" | "bottom";
    /**
     * Ratio of how much of the required slide was performed (0 <= x <= 1)
     */
    ratio: number;
    /**
     * Ratio has been reset
     */
    isReset: boolean;
  }) => void;
  /**
   * Emitted when user finished sliding the item to either sides
   * @param details Details
   */
  onAction?: (details: {
    /**
     * Side to which sliding has taken effect
     */
    side: "left" | "right" | "top" | "bottom";
    /**
     * When called, it resets the component to its initial non-slided state
     */
    reset: () => void;
  }) => void;
}

export interface QSlideItemSlots {
  /**
   * This is where item's sections go; Suggestion: QItemSection
   */
  default: () => VNode[];
  /**
   * Left side content when sliding
   */
  left: () => VNode[];
  /**
   * Right side content when sliding
   */
  right: () => VNode[];
  /**
   * Top side content when sliding
   */
  top: () => VNode[];
  /**
   * Bottom side content when sliding
   */
  bottom: () => VNode[];
}

export interface QSlideItem extends ComponentPublicInstance<QSlideItemProps> {
  /**
   * Reset to initial state (not swiped to any side)
   */
  reset: () => void;
}

export interface QSlideTransitionProps {
  /**
   * If set to true, the transition will be applied on the initial render.
   */
  appear?: boolean | undefined;
  /**
   * Duration (in milliseconds) enabling animated scroll.
   * Default value: 300
   */
  duration?: number | undefined;
  /**
   * Emitted when component show animation is finished
   */
  onShow?: () => void;
  /**
   * Emitted when component hide animation is finished
   */
  onHide?: () => void;
}

export interface QSlideTransitionSlots {
  /**
   * This is where content goes
   */
  default: () => VNode[];
}

export interface QSlideTransition
  extends ComponentPublicInstance<QSlideTransitionProps> {}

export interface QSliderProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Minimum value of the model; Set track's minimum value
   */
  min?: number | undefined;
  /**
   * Maximum value of the model; Set track's maximum value
   * Default value: 100
   */
  max?: number | undefined;
  /**
   * Inner minimum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be higher or equal to 'min' prop; Defaults to 'min' prop
   */
  innerMin?: number | undefined;
  /**
   * Inner maximum value of the model; Use in case you need the model value to be inside of the track's min-max values; Needs to be lower or equal to 'max' prop; Defaults to 'max' prop
   */
  innerMax?: number | undefined;
  /**
   * Specify step amount between valid values (> 0.0); When step equals to 0 it defines infinite granularity
   * Default value: 1
   */
  step?: number | undefined;
  /**
   * Snap on valid values, rather than sliding freely; Suggestion: use with 'step' prop
   */
  snap?: boolean | undefined;
  /**
   * Work in reverse (changes direction)
   */
  reverse?: boolean | undefined;
  /**
   * Display in vertical direction
   */
  vertical?: boolean | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for the track (can be 'transparent' too) from the Quasar Color Palette
   */
  trackColor?: NamedColor | undefined;
  /**
   * Apply a pattern image on the track
   */
  trackImg?: string | undefined;
  /**
   * Color name for the inner track (can be 'transparent' too) from the Quasar Color Palette
   */
  innerTrackColor?: NamedColor | undefined;
  /**
   * Apply a pattern image on the inner track
   */
  innerTrackImg?: string | undefined;
  /**
   * Color name for the selection bar (can be 'transparent' too) from the Quasar Color Palette
   */
  selectionColor?: NamedColor | undefined;
  /**
   * Apply a pattern image on the selection bar
   */
  selectionImg?: string | undefined;
  /**
   * Popup a label when user clicks/taps on the slider thumb and moves it
   */
  label?: boolean | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  labelColor?: NamedColor | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  labelTextColor?: NamedColor | undefined;
  /**
   * Switch the position of the label (top <-> bottom or left <-> right)
   */
  switchLabelSide?: boolean | undefined;
  /**
   * Always display the label
   */
  labelAlways?: boolean | undefined;
  /**
   * Display markers on the track, one for each possible value for the model or using a custom step (when specifying a Number)
   */
  markers?: boolean | number | undefined;
  /**
   * Configure the marker labels (or show the default ones if 'true'); Array of definition Objects or Object with key-value where key is the model and the value is the marker label definition
   * @param value The marker value to transform
   * @returns Marker definition Object or directly a String for the label of the marker
   */
  markerLabels?: SliderMarkerLabels | undefined;
  /**
   * CSS class(es) to apply to the marker labels container
   */
  markerLabelsClass?: string | undefined;
  /**
   * Switch the position of the marker labels (top <-> bottom or left <-> right)
   */
  switchMarkerLabelsSide?: boolean | undefined;
  /**
   * Track size (including CSS unit)
   * Default value: 4px
   */
  trackSize?: string | undefined;
  /**
   * Thumb size (including CSS unit)
   * Default value: 20px
   */
  thumbSize?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  thumbColor?: NamedColor | undefined;
  /**
   * Set custom thumb svg path
   * Default value: M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0
   */
  thumbPath?: string | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Model of the component (must be between min/max); Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue: number | null | undefined;
  /**
   * Override default label value
   */
  labelValue?: string | number | undefined;
  /**
   * Emitted on lazy model value change (after user slides then releases the thumb)
   * @param value New model value
   */
  onChange?: (value: any) => void;
  /**
   * Triggered when user starts panning on the component
   * @param phase Phase of panning
   */
  onPan?: (phase: "start" | "end") => void;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: number | null) => void;
}

export interface QSliderSlots {
  /**
   * What should the menu display after filtering options and none are left to be displayed; Suggestion: <div>
   * @param scope
   */
  "marker-label": (scope: {
    /**
     * Config for current marker label
     */
    marker: SliderMarkerLabelConfig;
    /**
     * Array of marker label configs
     */
    markerList: SliderMarkerLabelArrayConfig[];
    /**
     * Object with key-value where key is the model and the value is the marker label config
     */
    markerMap: SliderMarkerLabelObjectConfig;
    /**
     * Required CSS classes to be applied to the marker element
     */
    classes: string;
    /**
     * Get CSS style Object to apply to a marker element at respective model value; For perf reasons, use only if requested model value is not already part of markerMap
     * @param value The marker label equivalent model value
     * @returns CSS style Object to apply to a marker element at respective model value
     */
    getStyle: (value: number) => any;
  }) => VNode[];
  /**
   * What should the menu display after filtering options and none are left to be displayed; Suggestion: <div>
   * @param scope
   */
  "marker-label-group": (scope: {
    /**
     * Array of marker label configs
     */
    markerList: SliderMarkerLabelArrayConfig[];
    /**
     * Object with key-value where key is the model and the value is the marker label config
     */
    markerMap: SliderMarkerLabelObjectConfig;
    /**
     * Required CSS classes to be applied to the marker element
     */
    classes: string;
    /**
     * Get CSS style Object to apply to a marker element at respective model value; For perf reasons, use only if requested model value is not already part of markerMap
     * @param value The marker label equivalent model value
     * @returns CSS style Object to apply to a marker element at respective model value
     */
    getStyle: (value: number) => any;
  }) => VNode[];
}

export interface QSlider extends ComponentPublicInstance<QSliderProps> {}

export interface QSpaceProps {}

export interface QSpaceSlots {}

export interface QSpace extends ComponentPublicInstance<QSpaceProps> {}

export interface QSpinnerProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Override value to use for stroke-width
   * Default value: 5
   */
  thickness?: number | undefined;
}

export interface QSpinnerSlots {}

export interface QSpinner extends ComponentPublicInstance<QSpinnerProps> {}

export interface QSpinnerAudioProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerAudioSlots {}

export interface QSpinnerAudio
  extends ComponentPublicInstance<QSpinnerAudioProps> {}

export interface QSpinnerBallProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerBallSlots {}

export interface QSpinnerBall
  extends ComponentPublicInstance<QSpinnerBallProps> {}

export interface QSpinnerBarsProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerBarsSlots {}

export interface QSpinnerBars
  extends ComponentPublicInstance<QSpinnerBarsProps> {}

export interface QSpinnerBoxProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerBoxSlots {}

export interface QSpinnerBox
  extends ComponentPublicInstance<QSpinnerBoxProps> {}

export interface QSpinnerClockProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerClockSlots {}

export interface QSpinnerClock
  extends ComponentPublicInstance<QSpinnerClockProps> {}

export interface QSpinnerCommentProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerCommentSlots {}

export interface QSpinnerComment
  extends ComponentPublicInstance<QSpinnerCommentProps> {}

export interface QSpinnerCubeProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerCubeSlots {}

export interface QSpinnerCube
  extends ComponentPublicInstance<QSpinnerCubeProps> {}

export interface QSpinnerDotsProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerDotsSlots {}

export interface QSpinnerDots
  extends ComponentPublicInstance<QSpinnerDotsProps> {}

export interface QSpinnerFacebookProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerFacebookSlots {}

export interface QSpinnerFacebook
  extends ComponentPublicInstance<QSpinnerFacebookProps> {}

export interface QSpinnerGearsProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerGearsSlots {}

export interface QSpinnerGears
  extends ComponentPublicInstance<QSpinnerGearsProps> {}

export interface QSpinnerGridProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerGridSlots {}

export interface QSpinnerGrid
  extends ComponentPublicInstance<QSpinnerGridProps> {}

export interface QSpinnerHeartsProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerHeartsSlots {}

export interface QSpinnerHearts
  extends ComponentPublicInstance<QSpinnerHeartsProps> {}

export interface QSpinnerHourglassProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerHourglassSlots {}

export interface QSpinnerHourglass
  extends ComponentPublicInstance<QSpinnerHourglassProps> {}

export interface QSpinnerInfinityProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerInfinitySlots {}

export interface QSpinnerInfinity
  extends ComponentPublicInstance<QSpinnerInfinityProps> {}

export interface QSpinnerIosProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerIosSlots {}

export interface QSpinnerIos
  extends ComponentPublicInstance<QSpinnerIosProps> {}

export interface QSpinnerOrbitProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerOrbitSlots {}

export interface QSpinnerOrbit
  extends ComponentPublicInstance<QSpinnerOrbitProps> {}

export interface QSpinnerOvalProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerOvalSlots {}

export interface QSpinnerOval
  extends ComponentPublicInstance<QSpinnerOvalProps> {}

export interface QSpinnerPieProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerPieSlots {}

export interface QSpinnerPie
  extends ComponentPublicInstance<QSpinnerPieProps> {}

export interface QSpinnerPuffProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerPuffSlots {}

export interface QSpinnerPuff
  extends ComponentPublicInstance<QSpinnerPuffProps> {}

export interface QSpinnerRadioProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerRadioSlots {}

export interface QSpinnerRadio
  extends ComponentPublicInstance<QSpinnerRadioProps> {}

export interface QSpinnerRingsProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerRingsSlots {}

export interface QSpinnerRings
  extends ComponentPublicInstance<QSpinnerRingsProps> {}

export interface QSpinnerTailProps {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
}

export interface QSpinnerTailSlots {}

export interface QSpinnerTail
  extends ComponentPublicInstance<QSpinnerTailProps> {}

export interface QSplitterProps {
  /**
   * Model of the component defining the size of first panel (or second if using reverse) in the unit specified (for '%' it's the split ratio percent - 0.0 < x < 100.0; for 'px' it's the size in px); Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue: number;
  /**
   * Apply the model size to the second panel (by default it applies to the first)
   */
  reverse?: boolean | undefined;
  /**
   * CSS unit for the model
   * Default value: %
   */
  unit?: "%" | "px" | undefined;
  /**
   * Emit model while user is panning on the separator
   */
  emitImmediately?: boolean | undefined;
  /**
   * Allows the splitter to split its two panels horizontally, instead of vertically
   */
  horizontal?: boolean | undefined;
  /**
   * An array of two values representing the minimum and maximum split size of the two panels; When 'px' unit is set then you can use Infinity as the second value to make it unbound on the other side
   * Default value: For '%' unit: [10, 90]; For 'px' unit: [50, Infinity]
   */
  limits?: readonly any[] | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Class definitions to be attributed to the 'before' panel
   */
  beforeClass?: VueClassProp | undefined;
  /**
   * Class definitions to be attributed to the 'after' panel
   */
  afterClass?: VueClassProp | undefined;
  /**
   * Class definitions to be attributed to the splitter separator
   */
  separatorClass?: VueClassProp | undefined;
  /**
   * Style definitions to be attributed to the splitter separator
   */
  separatorStyle?: VueStyleProp | undefined;
  /**
   * Applies a default lighter color on the separator; To be used when background is darker; Avoid using when you are overriding through separator-class or separator-style props
   */
  dark?: boolean | undefined;
  /**
   * Emitted when component's model value changes; Is also used by v-model
   * @param value New model value (0.0 < x < 100.0) defining the ratio between panels
   */
  "onUpdate:modelValue"?: (value: number) => void;
}

export interface QSplitterSlots {
  /**
   * Default slot in the devland unslotted content of the component; Suggestion: QTooltip, QMenu
   */
  default: () => VNode[];
  /**
   * Content of the panel on left/top
   */
  before: () => VNode[];
  /**
   * Content of the panel on right/bottom
   */
  after: () => VNode[];
  /**
   * Content to be placed inside the separator; By default it is centered
   */
  separator: () => VNode[];
}

export interface QSplitter extends ComponentPublicInstance<QSplitterProps> {}

export interface QStepProps {
  /**
   * Panel name
   */
  name: any;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Step title
   */
  title: string;
  /**
   * Step’s additional information that appears beneath the title
   */
  caption?: string | undefined;
  /**
   * Step's prefix (max 2 characters) which replaces the icon if step does not has error, is being edited or is marked as done
   */
  prefix?: string | number | undefined;
  /**
   * Icon name following Quasar convention; If 'none' (String) is used as value, then it will defer to prefix or the regular icon for this state; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  doneIcon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  doneColor?: NamedColor | undefined;
  /**
   * Icon name following Quasar convention; If 'none' (String) is used as value, then it will defer to prefix or the regular icon for this state; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  activeIcon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  activeColor?: NamedColor | undefined;
  /**
   * Icon name following Quasar convention; If 'none' (String) is used as value, then it will defer to prefix or the regular icon for this state; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  errorIcon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  errorColor?: NamedColor | undefined;
  /**
   * Allow navigation through the header
   * Default value: true
   */
  headerNav?: boolean | undefined;
  /**
   * Mark the step as 'done'
   */
  done?: boolean | undefined;
  /**
   * Mark the step as having an error
   */
  error?: boolean | undefined;
}

export interface QStepSlots {
  /**
   * The content of the step; Can also contain a QStepperNavigation if you want to handle step navigation and don't have a global navigation in place
   */
  default: () => VNode[];
}

export interface QStep extends ComponentPublicInstance<QStepProps> {}

export interface QStepperProps {
  /**
   * Model of the component defining the current panel's name; If a Number is used, it does not define the panel's index, but rather the panel's name which can also be an Integer; Either use this property (along with a listener for 'update:model-value' event) OR use the v-model directive.
   */
  modelValue?: any;
  /**
   * Equivalent to using Vue's native <keep-alive> component on the content
   */
  keepAlive?: boolean | undefined;
  /**
   * Equivalent to using Vue's native include prop for <keep-alive>; Values must be valid Vue component names
   */
  keepAliveInclude?: string | readonly any[] | RegExp | undefined;
  /**
   * Equivalent to using Vue's native exclude prop for <keep-alive>; Values must be valid Vue component names
   */
  keepAliveExclude?: string | readonly any[] | RegExp | undefined;
  /**
   * Equivalent to using Vue's native max prop for <keep-alive>
   */
  keepAliveMax?: number | undefined;
  /**
   * Enable transitions between panel (also see 'transition-prev' and 'transition-next' props)
   */
  animated?: boolean | undefined;
  /**
   * Makes component appear as infinite (when reaching last panel, next one will become the first one)
   */
  infinite?: boolean | undefined;
  /**
   * Enable swipe events (may interfere with content's touch/mouse events)
   */
  swipeable?: boolean | undefined;
  /**
   * Put Stepper in vertical mode (instead of horizontal by default)
   */
  vertical?: boolean | undefined;
  /**
   * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
   * Default value: slide-right/slide-down
   */
  transitionPrev?: string | undefined;
  /**
   * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
   * Default value: slide-left/slide-up
   */
  transitionNext?: string | undefined;
  /**
   * Transition duration (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Applies a 'flat' design (no default shadow)
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Use alternative labels - stacks the icon on top of the label (applies only to horizontal stepper)
   */
  alternativeLabels?: boolean | undefined;
  /**
   * Allow navigation through the header
   */
  headerNav?: boolean | undefined;
  /**
   * Hide header labels on narrow windows
   */
  contracted?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  inactiveIcon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  inactiveColor?: NamedColor | undefined;
  /**
   * Icon name following Quasar convention; If 'none' (String) is used as value, then it will defer to prefix or the regular icon for this state; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  doneIcon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  doneColor?: NamedColor | undefined;
  /**
   * Icon name following Quasar convention; If 'none' (String) is used as value, then it will defer to prefix or the regular icon for this state; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  activeIcon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  activeColor?: NamedColor | undefined;
  /**
   * Icon name following Quasar convention; If 'none' (String) is used as value, then it will defer to prefix or the regular icon for this state; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  errorIcon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  errorColor?: NamedColor | undefined;
  /**
   * Class definitions to be attributed to the header
   */
  headerClass?: string | undefined;
  /**
   * Emitted when the component changes the model; This event _isn't_ fired if the model is changed externally; Is also used by v-model
   * @param value New current panel name
   */
  "onUpdate:modelValue"?: (value: string | number) => void;
  /**
   * Emitted before transitioning to a new panel
   * @param newVal Panel name towards transition is going
   * @param oldVal Panel name from which transition is happening
   */
  onBeforeTransition?: (
    newVal: string | number,
    oldVal: string | number
  ) => void;
  /**
   * Emitted after component transitioned to a new panel
   * @param newVal Panel name towards transition has occurred
   * @param oldVal Panel name from which transition has happened
   */
  onTransition?: (newVal: string | number, oldVal: string | number) => void;
}

export interface QStepperSlots {
  /**
   * Suggestion: QStep
   */
  default: () => VNode[];
  /**
   * Slot specific for the global navigation; Suggestion: QStepperNavigation
   */
  navigation: () => VNode[];
  /**
   * Slot specific for putting a message on top of each step (if horizontal stepper) or above steps (if vertical); Suggestion: QBanner, div.q-pa-lg
   */
  message: () => VNode[];
}

export interface QStepper extends ComponentPublicInstance<QStepperProps> {
  /**
   * Go to next panel
   */
  next: () => void;
  /**
   * Go to previous panel
   */
  previous: () => void;
  /**
   * Go to specific panel
   * @param panelName Panel's name, which may be a String or Number; Number does not refers to panel index, but to its name, which may be an Integer
   */
  goTo: (panelName: string | number) => void;
}

export interface QStepperNavigationProps {}

export interface QStepperNavigationSlots {
  /**
   * The content of the custom navigation, child of a QStep or of a QStepper (globally, through 'navigation' slot)
   */
  default: () => VNode[];
}

export interface QStepperNavigation
  extends ComponentPublicInstance<QStepperNavigationProps> {}

export interface QTabPanelProps {
  /**
   * Panel name
   */
  name: any;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
}

export interface QTabPanelSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QTabPanel extends ComponentPublicInstance<QTabPanelProps> {}

export interface QTabPanelsProps {
  /**
   * Model of the component defining the current panel's name; If a Number is used, it does not define the panel's index, but rather the panel's name which can also be an Integer; Either use this property (along with a listener for 'update:model-value' event) OR use the v-model directive.
   */
  modelValue?: any;
  /**
   * Equivalent to using Vue's native <keep-alive> component on the content
   */
  keepAlive?: boolean | undefined;
  /**
   * Equivalent to using Vue's native include prop for <keep-alive>; Values must be valid Vue component names
   */
  keepAliveInclude?: string | readonly any[] | RegExp | undefined;
  /**
   * Equivalent to using Vue's native exclude prop for <keep-alive>; Values must be valid Vue component names
   */
  keepAliveExclude?: string | readonly any[] | RegExp | undefined;
  /**
   * Equivalent to using Vue's native max prop for <keep-alive>
   */
  keepAliveMax?: number | undefined;
  /**
   * Enable transitions between panel (also see 'transition-prev' and 'transition-next' props)
   */
  animated?: boolean | undefined;
  /**
   * Makes component appear as infinite (when reaching last panel, next one will become the first one)
   */
  infinite?: boolean | undefined;
  /**
   * Enable swipe events (may interfere with content's touch/mouse events)
   */
  swipeable?: boolean | undefined;
  /**
   * Default transitions and swipe actions will be on the vertical axis
   */
  vertical?: boolean | undefined;
  /**
   * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
   * Default value: slide-right/slide-down
   */
  transitionPrev?: string | undefined;
  /**
   * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
   * Default value: slide-left/slide-up
   */
  transitionNext?: string | undefined;
  /**
   * Transition duration (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Emitted when the component changes the model; This event _isn't_ fired if the model is changed externally; Is also used by v-model
   * @param value New current panel name
   */
  "onUpdate:modelValue"?: (value: string | number) => void;
  /**
   * Emitted before transitioning to a new panel
   * @param newVal Panel name towards transition is going
   * @param oldVal Panel name from which transition is happening
   */
  onBeforeTransition?: (
    newVal: string | number,
    oldVal: string | number
  ) => void;
  /**
   * Emitted after component transitioned to a new panel
   * @param newVal Panel name towards transition has occurred
   * @param oldVal Panel name from which transition has happened
   */
  onTransition?: (newVal: string | number, oldVal: string | number) => void;
}

export interface QTabPanelsSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QTabPanels extends ComponentPublicInstance<QTabPanelsProps> {
  /**
   * Go to next panel
   */
  next: () => void;
  /**
   * Go to previous panel
   */
  previous: () => void;
  /**
   * Go to specific panel
   * @param panelName Panel's name, which may be a String or Number; Number does not refers to panel index, but to its name, which may be an Integer
   */
  goTo: (panelName: string | number) => void;
}

export interface QTableProps {
  /**
   * Fullscreen mode
   */
  fullscreen?: boolean | undefined;
  /**
   * Changing route app won't exit fullscreen
   */
  noRouteFullscreenExit?: boolean | undefined;
  /**
   * Rows of data to display
   */
  rows?: readonly any[] | undefined;
  /**
   * Property of each row that defines the unique key of each row (the result must be a primitive, not Object, Array, etc); The value of property must be string or a function taking a row and returning the desired (nested) key in the row; If supplying a function then for best performance, reference it from your scope and do not define it inline
   * Default value: id
   * @param row The current row being processed
   * @returns Current row's key
   */
  rowKey?: string | ((row: any) => any) | undefined;
  /**
   * Display data using QVirtualScroll (for non-grid mode only)
   */
  virtualScroll?: boolean | undefined;
  /**
   * CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one
   */
  virtualScrollTarget?: Element | string | undefined;
  /**
   * Minimum number of rows to render in the virtual list
   * Default value: 30
   */
  virtualScrollSliceSize?: number | string | undefined;
  /**
   * Ratio of number of rows in visible zone to render before it
   * Default value: 1
   */
  virtualScrollSliceRatioBefore?: number | string | undefined;
  /**
   * Ratio of number of rows in visible zone to render after it
   * Default value: 1
   */
  virtualScrollSliceRatioAfter?: number | string | undefined;
  /**
   * Default size in pixels of a row; This value is used for rendering the initial table; Try to use a value close to the minimum size of a row
   * Default value: 48 (24 if dense)
   */
  virtualScrollItemSize?: number | string | undefined;
  /**
   * Size in pixels of the sticky header (if using one); A correct value will improve scroll precision; Will be also used for non-virtual-scroll tables for fixing top alignment when using scrollTo method
   * Default value: 0
   */
  virtualScrollStickySizeStart?: number | string | undefined;
  /**
   * Size in pixels of the sticky footer part (if using one); A correct value will improve scroll precision
   * Default value: 0
   */
  virtualScrollStickySizeEnd?: number | string | undefined;
  /**
   * The number of columns in the table (you need this if you use table-layout: fixed)
   */
  tableColspan?: number | string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   * Default value: grey-8
   */
  color?: NamedColor | undefined;
  /**
   * Icon name following Quasar convention for stepping to first page; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconFirstPage?: string | undefined;
  /**
   * Icon name following Quasar convention for stepping to previous page; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconPrevPage?: string | undefined;
  /**
   * Icon name following Quasar convention for stepping to next page; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconNextPage?: string | undefined;
  /**
   * Icon name following Quasar convention for stepping to last page; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconLastPage?: string | undefined;
  /**
   * Display data as a grid instead of the default table
   */
  grid?: boolean | undefined;
  /**
   * Display header for grid-mode also
   */
  gridHeader?: boolean | undefined;
  /**
   * Dense mode; Connect with $q.screen for responsive behavior
   */
  dense?: boolean | undefined;
  /**
   * The column definitions (Array of Objects)
   */
  columns?:
    | {
        /**
         * Unique id, identifies column, (used by pagination.sortBy, 'body-cell-[name]' slot, ...)
         */
        name: string;
        /**
         * Label for header
         */
        label: string;
        /**
         * Row Object property to determine value for this column or function which maps to the required property
         * @param row The current row being processed
         * @returns Value for this column
         */
        field: string | ((row: any) => any);
        /**
         * If we use visible-columns, this col will always be visible
         */
        required?: boolean;
        /**
         * Horizontal alignment of cells in this column
         * Default value: right
         */
        align?: "left" | "right" | "center";
        /**
         * Tell QTable you want this column sortable
         */
        sortable?: boolean;
        /**
         * Compare function if you have some custom data or want a specific way to compare two rows; rows with null/undefined values will get sorted without triggering this method (use 'rawSort' instead if you want to handle those values too)
         * @param a Value of the first comparison term
         * @param b Value of the second comparison term
         * @param rowA Full Row object in which is contained the first term
         * @param rowB Full Row object in which is contained the second term
         * @returns Comparison result of term 'a' with term 'b'. Less than 0 when 'a' should come first; greater than 0 if 'b' should come first; equal to 0 if their position must not be changed with respect to each other
         */
        sort?: (a: any, b: any, rowA: any, rowB: any) => number;
        /**
         * Compare function if you have some custom data or want a specific way to compare two rows; includes rows with null/undefined values (use 'sort' instead if you don't want that)
         * @param a Value of the first comparison term
         * @param b Value of the second comparison term
         * @param rowA Full Row object in which is contained the first term
         * @param rowB Full Row object in which is contained the second term
         * @returns Comparison result of term 'a' with term 'b'. Less than 0 when 'a' should come first; greater than 0 if 'b' should come first; equal to 0 if their position must not be changed with respect to each other
         */
        rawSort?: (a: any, b: any, rowA: any, rowB: any) => number;
        /**
         * Set column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending); Overrides the 'column-sort-order' prop
         * Default value: ad
         */
        sortOrder?: "ad" | "da";
        /**
         * Function you can apply to format your data
         * @param val Value of the cell
         * @param row Full Row object in which the cell is contained
         * @returns The resulting formatted value
         */
        format?: (val: any, row: any) => any;
        /**
         * Style to apply on normal cells of the column
         * @param row The current row being processed
         */
        style?: string | ((row: any) => string);
        /**
         * Classes to add on normal cells of the column
         * @param row The current row being processed
         */
        classes?: string | ((row: any) => string);
        /**
         * Style to apply on header cells of the column
         */
        headerStyle?: string;
        /**
         * Classes to add on header cells of the column
         */
        headerClasses?: string;
      }[]
    | undefined;
  /**
   * Array of Strings defining column names ('name' property of each column from 'columns' prop definitions); Columns marked as 'required' are not affected by this property
   */
  visibleColumns?: readonly any[] | undefined;
  /**
   * Put Table into 'loading' state; Notify the user something is happening behind the scenes
   */
  loading?: boolean | undefined;
  /**
   * Table title
   */
  title?: string | undefined;
  /**
   * Hide table header layer
   */
  hideHeader?: boolean | undefined;
  /**
   * Hide table bottom layer regardless of what it has to display
   */
  hideBottom?: boolean | undefined;
  /**
   * Hide the selected rows banner (if any)
   */
  hideSelectedBanner?: boolean | undefined;
  /**
   * Hide the default no data bottom layer
   */
  hideNoData?: boolean | undefined;
  /**
   * Hide the pagination controls at the bottom
   */
  hidePagination?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Applies a 'flat' design (no default shadow)
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Use a separator/border between rows, columns or all cells
   * Default value: horizontal
   */
  separator?: "horizontal" | "vertical" | "cell" | "none" | undefined;
  /**
   * Wrap text within table cells
   */
  wrapCells?: boolean | undefined;
  /**
   * Skip the third state (unsorted) when user toggles column sort direction
   */
  binaryStateSort?: boolean | undefined;
  /**
   * Set column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending); It gets applied to all columns unless a column has its own sortOrder specified in the 'columns' definition prop
   * Default value: ad
   */
  columnSortOrder?: "ad" | "da" | undefined;
  /**
   * Override default text to display when no data is available
   */
  noDataLabel?: string | undefined;
  /**
   * Override default text to display when user filters the table and no matched results are found
   */
  noResultsLabel?: string | undefined;
  /**
   * Override default text to display when table is in loading state (see 'loading' prop)
   */
  loadingLabel?: string | undefined;
  /**
   * Text to display when user selected at least one row; For best performance, reference it from your scope and do not define it inline
   * @param numberOfRows Number of rows available
   * @returns Label to display
   */
  selectedRowsLabel?: ((numberOfRows: number) => string) | undefined;
  /**
   * Text to override default rows per page label at bottom of table
   */
  rowsPerPageLabel?: string | undefined;
  /**
   * Text to override default pagination label at bottom of table (unless 'pagination' scoped slot is used); For best performance, reference it from your scope and do not define it inline
   * @param firstRowIndex Index of first displayed row
   * @param endRowIndex Index of last displayed row
   * @param totalRowsNumber Number of total rows available in data
   * @returns Label to display
   */
  paginationLabel?:
    | ((
        firstRowIndex: number,
        endRowIndex: number,
        totalRowsNumber: number
      ) => string)
    | undefined;
  /**
   * CSS style to apply to native HTML <table> element's wrapper (which is a DIV)
   */
  tableStyle?: VueStyleProp | undefined;
  /**
   * CSS classes to apply to native HTML <table> element's wrapper (which is a DIV)
   */
  tableClass?: VueClassProp | undefined;
  /**
   * CSS style to apply to header of native HTML <table> (which is a TR)
   */
  tableHeaderStyle?: VueStyleProp | undefined;
  /**
   * CSS classes to apply to header of native HTML <table> (which is a TR)
   */
  tableHeaderClass?: VueClassProp | undefined;
  /**
   * CSS style to apply to the cards container (when in grid mode)
   */
  cardContainerStyle?: VueStyleProp | undefined;
  /**
   * CSS classes to apply to the cards container (when in grid mode)
   */
  cardContainerClass?: VueClassProp | undefined;
  /**
   * CSS style to apply to the card (when in grid mode) or container card (when not in grid mode)
   */
  cardStyle?: VueStyleProp | undefined;
  /**
   * CSS classes to apply to the card (when in grid mode) or container card (when not in grid mode)
   */
  cardClass?: VueClassProp | undefined;
  /**
   * CSS classes to apply to the title (if using 'title' prop)
   */
  titleClass?: VueClassProp | undefined;
  /**
   * String/Object to filter table with; When using an Object it requires 'filter-method' to also be specified since it will be a custom filtering
   */
  filter?: string | any | undefined;
  /**
   * The actual filtering mechanism; For best performance, reference it from your scope and do not define it inline
   * Default value: (see source code)
   * @param rows Array of rows
   * @param terms Terms to filter with (is essentially the 'filter' prop value)
   * @param cols Column definitions
   * @param getCellValue Optional function to get a cell value
   * @returns Filtered rows
   */
  filterMethod?:
    | ((
        rows: readonly any[],
        terms: string | any,
        cols: readonly any[],
        getCellValue: (col: any, row: any) => any
      ) => readonly any[])
    | undefined;
  /**
   * Pagination object; You can also use the 'v-model:pagination' for synching; When not synching it simply initializes the pagination on first render
   */
  pagination?:
    | {
        /**
         * Column name (from column definition)
         */
        sortBy?: string | null;
        /**
         * Is sorting in descending order?
         */
        descending?: boolean;
        /**
         * Page number (1-based)
         */
        page?: number;
        /**
         * How many rows per page? 0 means Infinite
         */
        rowsPerPage?: number;
        /**
         * For server-side fetching only. How many total database rows are there to be added to the table. If set, causes the QTable to emit @request when data is required.
         */
        rowsNumber?: number;
      }
    | undefined;
  /**
   * Options for user to pick (Numbers); Number 0 means 'Show all rows in one page'
   * Default value: [ 3, 5, 7, 10, 15, 20, 25, 50, 0 ]
   */
  rowsPerPageOptions?: readonly any[] | undefined;
  /**
   * Selection type
   * Default value: none
   */
  selection?: "single" | "multiple" | "none" | undefined;
  /**
   * Keeps the user selection array
   * Default value: []
   */
  selected?: any[] | undefined;
  /**
   * Keeps the array with expanded rows keys
   * Default value: []
   */
  expanded?: any[] | undefined;
  /**
   * The actual sort mechanism. Function (rows, sortBy, descending) => sorted rows; For best performance, reference it from your scope and do not define it inline
   * Default value: (see source code)
   * @param rows Array with rows
   * @param sortBy Column name (from column definition)
   * @param descending Is sorting in descending order?
   * @returns Sorted rows
   */
  sortMethod?:
    | ((
        rows: readonly any[],
        sortBy: string,
        descending: boolean
      ) => readonly any[])
    | undefined;
  /**
   * Emitted when fullscreen state changes
   * @param value Fullscreen state (showing/hidden)
   */
  onFullscreen?: (value: boolean) => void;
  /**
   * Emitted when user clicks/taps on a row; Is not emitted when using body/row/item scoped slots
   * @param evt JS event object
   * @param row The row upon which user has clicked/tapped
   * @param index Index of the row in the current page
   */
  onRowClick?: (evt: Event, row: any, index: number) => void;
  /**
   * Emitted when user quickly double clicks/taps on a row; Is not emitted when using body/row/item scoped slots; Please check JS dblclick event support before using
   * @param evt JS event object
   * @param row The row upon which user has double clicked/tapped
   * @param index Index of the row in the current page
   */
  onRowDblclick?: (evt: Event, row: any, index: number) => void;
  /**
   * Emitted when user right clicks/long taps on a row; Is not emitted when using body/row/item scoped slots
   * @param evt JS event object
   * @param row The row upon which user has right clicked/long tapped
   * @param index Index of the row in the current page
   */
  onRowContextmenu?: (evt: Event, row: any, index: number) => void;
  /**
   * Emitted when a server request is triggered
   * @param requestProp Props of the request
   */
  onRequest?: (requestProp: {
    /**
     * Pagination object
     */
    pagination: {
      /**
       * Column name (from column definition)
       */
      sortBy: string;
      /**
       * Is sorting in descending order?
       */
      descending: boolean;
      /**
       * Page number (1-based)
       */
      page: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage: number;
    };
    /**
     * String/Object to filter table with (the 'filter' prop)
     */
    filter?: string | any;
    /**
     * Function to get a cell value
     * @param col Column name from column definitions
     * @param row The row object
     * @returns Parsed/Processed cell value
     */
    getCellValue: (col: any, row: any) => any;
  }) => void;
  /**
   * Emitted when user selects/unselects row(s)
   * @param details Selection details
   */
  onSelection?: (details: {
    /**
     * Array of row objects that were selected/unselected
     */
    rows: readonly any[];
    /**
     * Array of the keys of rows that were selected/unselected
     */
    keys: readonly any[];
    /**
     * Were the rows added to selection (true) or removed from selection (false)
     */
    added: boolean;
    /**
     * JS event object
     */
    evt: Event;
  }) => void;
  /**
   * Used by Vue on 'v-model:pagination' for updating its value
   * @param newPagination The updated pagination object
   */
  "onUpdate:pagination"?: (newPagination: {
    /**
     * Column name (from column definition)
     */
    sortBy: string | null;
    /**
     * Is sorting in descending order?
     */
    descending: boolean;
    /**
     * Page number (1-based)
     */
    page: number;
    /**
     * How many rows per page? 0 means Infinite
     */
    rowsPerPage: number;
    /**
     * For server-side fetching only. How many total database rows are there to be added to the table.
     */
    rowsNumber?: number;
  }) => void;
  /**
   * Used by Vue on 'v-model:selected' prop for updating its value
   * @param newSelected The updated selected array
   */
  "onUpdate:selected"?: (newSelected: readonly any[]) => void;
  /**
   * Used by Vue on 'v-model:expanded' prop for updating its value
   * @param newExpanded The updated expanded array
   */
  "onUpdate:expanded"?: (newExpanded: readonly any[]) => void;
  /**
   * Emitted when the virtual scroll occurs, if using virtual scroll
   * @param details Object of properties on the new scroll position
   */
  onVirtualScroll?: (details: {
    /**
     * Index of the list item that was scrolled into view (0 based)
     */
    index: number;
    /**
     * The index of the first list item that is rendered (0 based)
     */
    from: number;
    /**
     * The index of the last list item that is rendered (0 based)
     */
    to: number;
    /**
     * Direction of change
     */
    direction: "increase" | "decrease";
    /**
     * Vue reference to the underlying QVirtualScroll instance
     */
    ref: Component;
  }) => void;
}

export interface QTableSlots {
  /**
   * Override default effect when table is in loading state; Suggestion: QInnerLoading
   */
  loading: () => VNode[];
  /**
   * Slot to use for defining an item when in 'grid' mode; Suggestion: QCard
   * @param scope
   */
  item: (scope: {
    /**
     * Row/Item's key
     */
    key: any;
    /**
     * Row/Item object
     */
    row: any;
    /**
     * Row/Item's index (0 based) in the filtered and sorted table
     */
    rowIndex: number;
    /**
     * Row/Item's index (0 based) in the current page of the filtered and sorted table
     */
    pageIndex: number;
    /**
     * Column definitions
     */
    cols: any;
    /**
     * Column mapping (key is column name, value is column object)
     */
    colsMap: any;
    /**
     * Trigger a table sort
     * @param col Column name or column definition object
     */
    sort: (col: string | any) => void;
    /**
     * (Only if using selection) Is row/item selected? Can directly be assigned new Boolean value which changes selection state
     */
    selected: boolean;
    /**
     * Is row/item expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expand: boolean;
    /**
     * Color name for component from the Quasar Color Palette
     */
    color: NamedColor;
    /**
     * Notify the component that the background is a dark color
     */
    dark: boolean;
    /**
     * Dense mode; occupies less space
     */
    dense: boolean;
  }) => VNode[];
  /**
   * Slot to define how a body row looks like; Suggestion: QTr + Td
   * @param scope
   */
  body: (scope: {
    /**
     * Row's key
     */
    key: any;
    /**
     * Row object
     */
    row: any;
    /**
     * Row's index (0 based) in the filtered and sorted table
     */
    rowIndex: number;
    /**
     * Row's index (0 based) in the current page of the filtered and sorted table
     */
    pageIndex: number;
    /**
     * Column definitions
     */
    cols: any;
    /**
     * Column mapping (key is column name, value is column object)
     */
    colsMap: any;
    /**
     * Trigger a table sort
     * @param col Column name or column definition object
     */
    sort: (col: string | any) => void;
    /**
     * (Only if using selection) Is row selected? Can directly be assigned new Boolean value which changes selection state
     */
    selected: boolean;
    /**
     * Is row expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expand: boolean;
    /**
     * Color name for component from the Quasar Color Palette
     */
    color: NamedColor;
    /**
     * Notify the component that the background is a dark color
     */
    dark: boolean;
    /**
     * Dense mode; occupies less space
     */
    dense: boolean;
    /**
     * Internal prop passed down to QTr (if used)
     */
    __trClass: string;
  }) => VNode[];
  /**
   * Slot to define how all body cells look like; Suggestion: QTd
   * @param scope
   */
  "body-cell": (scope: {
    /**
     * Column definition for column associated with table cell
     */
    col: any;
    /**
     * Parsed/Formatted value of table cell
     */
    value: any;
    /**
     * Row's key
     */
    key: any;
    /**
     * Row object
     */
    row: any;
    /**
     * Row's index (0 based) in the filtered and sorted table
     */
    rowIndex: number;
    /**
     * Row's index (0 based) in the current page of the filtered and sorted table
     */
    pageIndex: number;
    /**
     * Column definitions
     */
    cols: any;
    /**
     * Column mapping (key is column name, value is column object)
     */
    colsMap: any;
    /**
     * Trigger a table sort
     * @param col Column name or column definition object
     */
    sort: (col: string | any) => void;
    /**
     * (Only if using selection) Is row selected? Can directly be assigned new Boolean value which changes selection state
     */
    selected: boolean;
    /**
     * Is row expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expand: boolean;
    /**
     * Color name for component from the Quasar Color Palette
     */
    color: NamedColor;
    /**
     * Notify the component that the background is a dark color
     */
    dark: boolean;
    /**
     * Dense mode; occupies less space
     */
    dense: boolean;
  }) => VNode[];
  /**
   * Slot to define how a specific column cell looks like; replace '[name]' with column name (from columns definition object)
   * @param scope
   */
  [key: `body-cell-${string}`]: (scope: {
    /**
     * Column definition for column associated with table cell
     */
    col: any;
    /**
     * Parsed/Formatted value of table cell
     */
    value: any;
    /**
     * Row's key
     */
    key: any;
    /**
     * Row object
     */
    row: any;
    /**
     * Row's index (0 based) in the filtered and sorted table
     */
    rowIndex: number;
    /**
     * Row's index (0 based) in the current page of the filtered and sorted table
     */
    pageIndex: number;
    /**
     * Column definitions
     */
    cols: any;
    /**
     * Column mapping (key is column name, value is column object)
     */
    colsMap: any;
    /**
     * Trigger a table sort
     * @param col Column name or column definition object
     */
    sort: (col: string | any) => void;
    /**
     * (Only if using selection) Is row selected? Can directly be assigned new Boolean value which changes selection state
     */
    selected: boolean;
    /**
     * Is row expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expand: boolean;
    /**
     * Color name for component from the Quasar Color Palette
     */
    color: NamedColor;
    /**
     * Notify the component that the background is a dark color
     */
    dark: boolean;
    /**
     * Dense mode; occupies less space
     */
    dense: boolean;
  }) => VNode[];
  /**
   * Slot to define how header looks like; Suggestion: QTr + QTh
   * @param scope
   */
  header: (scope: {
    /**
     * Column definitions
     */
    cols: any;
    /**
     * Column mapping (key is column name, value is column object)
     */
    colsMap: any;
    /**
     * Trigger a table sort
     * @param col Column name or column definition object
     */
    sort: (col: string | any) => void;
    /**
     * (Only if using selection) Is row selected? Can directly be assigned new Boolean value which changes selection state
     */
    selected: boolean;
    /**
     * Is row expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expand: boolean;
    /**
     * Color name for component from the Quasar Color Palette
     */
    color: NamedColor;
    /**
     * Notify the component that the background is a dark color
     */
    dark: boolean;
    /**
     * Dense mode; occupies less space
     */
    dense: boolean;
    /**
     * Internal prop passed down to QTr (if used)
     */
    __trClass: string;
    /**
     * Internal prop passed down to QTh (if used); Always 'true'
     */
    header: boolean;
  }) => VNode[];
  /**
   * Slot to define how each header cell looks like; Suggestion: QTh
   * @param scope
   */
  "header-cell": (scope: {
    /**
     * Column definition associated to header cell
     */
    col: any;
    /**
     * Column definitions
     */
    cols: any;
    /**
     * Column mapping (key is column name, value is column object)
     */
    colsMap: any;
    /**
     * Trigger a table sort
     * @param col Column name or column definition object
     */
    sort: (col: string | any) => void;
    /**
     * (Only if using selection) Is row selected? Can directly be assigned new Boolean value which changes selection state
     */
    selected: boolean;
    /**
     * Is row expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expand: boolean;
    /**
     * Color name for component from the Quasar Color Palette
     */
    color: NamedColor;
    /**
     * Notify the component that the background is a dark color
     */
    dark: boolean;
    /**
     * Dense mode; occupies less space
     */
    dense: boolean;
  }) => VNode[];
  /**
   * Slot to define how a specific header cell looks like; replace '[name]' with column name (from columns definition object)
   * @param scope
   */
  [key: `header-cell-${string}`]: (scope: {
    /**
     * Column definition associated to header cell
     */
    col: any;
    /**
     * Column definitions
     */
    cols: any;
    /**
     * Column mapping (key is column name, value is column object)
     */
    colsMap: any;
    /**
     * Trigger a table sort
     * @param col Column name or column definition object
     */
    sort: (col: string | any) => void;
    /**
     * (Only if using selection) Is row selected? Can directly be assigned new Boolean value which changes selection state
     */
    selected: boolean;
    /**
     * Is row expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expand: boolean;
    /**
     * Color name for component from the Quasar Color Palette
     */
    color: NamedColor;
    /**
     * Notify the component that the background is a dark color
     */
    dark: boolean;
    /**
     * Dense mode; occupies less space
     */
    dense: boolean;
  }) => VNode[];
  /**
   * Slot to define how body selection column looks like; Suggestion: QCheckbox
   * @param scope
   */
  "body-selection": (scope: {
    /**
     * Row's key
     */
    key: any;
    /**
     * Row object
     */
    row: any;
    /**
     * Row's index (0 based) in the filtered and sorted table
     */
    rowIndex: number;
    /**
     * Row's index (0 based) in the current page of the filtered and sorted table
     */
    pageIndex: number;
    /**
     * Column definitions
     */
    cols: any;
    /**
     * Column mapping (key is column name, value is column object)
     */
    colsMap: any;
    /**
     * Trigger a table sort
     * @param col Column name or column definition object
     */
    sort: (col: string | any) => void;
    /**
     * (Only if using selection) Is row selected? Can directly be assigned new Boolean value which changes selection state
     */
    selected: boolean;
    /**
     * Is row expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expand: boolean;
    /**
     * Color name for component from the Quasar Color Palette
     */
    color: NamedColor;
    /**
     * Notify the component that the background is a dark color
     */
    dark: boolean;
    /**
     * Dense mode; occupies less space
     */
    dense: boolean;
  }) => VNode[];
  /**
   * Slot to define how header selection column looks like (available only for multiple selection mode); Suggestion: QCheckbox
   * @param scope
   */
  "header-selection": (scope: {
    /**
     * Column definitions
     */
    cols: any;
    /**
     * Column mapping (key is column name, value is column object)
     */
    colsMap: any;
    /**
     * Trigger a table sort
     * @param col Column name or column definition object
     */
    sort: (col: string | any) => void;
    /**
     * (Only if using selection) Is row selected? Can directly be assigned new Boolean value which changes selection state
     */
    selected: boolean;
    /**
     * Is row expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expand: boolean;
    /**
     * Color name for component from the Quasar Color Palette
     */
    color: NamedColor;
    /**
     * Notify the component that the background is a dark color
     */
    dark: boolean;
    /**
     * Dense mode; occupies less space
     */
    dense: boolean;
  }) => VNode[];
  /**
   * Slot to define how top extra row looks like
   * @param scope
   */
  "top-row": (scope: {
    /**
     * Column definitions
     */
    cols: any;
  }) => VNode[];
  /**
   * Slot to define how bottom extra row looks like
   * @param scope
   */
  "bottom-row": (scope: {
    /**
     * Column definitions
     */
    cols: any;
  }) => VNode[];
  /**
   * Slot to define how table top looks like
   * @param scope
   */
  top: (scope: {
    /**
     * Pagination object
     */
    pagination: {
      /**
       * Column name (from column definition)
       */
      sortBy: string | null;
      /**
       * Is sorting in descending order?
       */
      descending: boolean;
      /**
       * Page number (1-based)
       */
      page: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage: number;
    };
    /**
     * Number of pages available
     */
    pagesNumber: number;
    /**
     * Are we on first page?
     */
    isFirstPage: boolean;
    /**
     * Are we on last page?
     */
    isLastPage: boolean;
    /**
     * Navigates to first page
     */
    firstPage: () => void;
    /**
     * Navigates to previous page, if available
     */
    prevPage: () => void;
    /**
     * Navigates to next page, if available
     */
    nextPage: () => void;
    /**
     * Navigates to last page
     */
    lastPage: () => void;
    /**
     * Is table in fullscreen mode?
     */
    inFullscreen: boolean;
    /**
     * Toggles fullscreen mode
     */
    toggleFullscreen: () => void;
  }) => VNode[];
  /**
   * Slot to define how table bottom looks like
   * @param scope
   */
  bottom: (scope: {
    /**
     * Pagination object
     */
    pagination: {
      /**
       * Column name (from column definition)
       */
      sortBy: string | null;
      /**
       * Is sorting in descending order?
       */
      descending: boolean;
      /**
       * Page number (1-based)
       */
      page: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage: number;
    };
    /**
     * Number of pages available
     */
    pagesNumber: number;
    /**
     * Are we on first page?
     */
    isFirstPage: boolean;
    /**
     * Are we on last page?
     */
    isLastPage: boolean;
    /**
     * Navigates to first page
     */
    firstPage: () => void;
    /**
     * Navigates to previous page, if available
     */
    prevPage: () => void;
    /**
     * Navigates to next page, if available
     */
    nextPage: () => void;
    /**
     * Navigates to last page
     */
    lastPage: () => void;
    /**
     * Is table in fullscreen mode?
     */
    inFullscreen: boolean;
    /**
     * Toggles fullscreen mode
     */
    toggleFullscreen: () => void;
  }) => VNode[];
  /**
   * Slot to override default pagination label and buttons
   * @param scope
   */
  pagination: (scope: {
    /**
     * Pagination object
     */
    pagination: {
      /**
       * Column name (from column definition)
       */
      sortBy: string | null;
      /**
       * Is sorting in descending order?
       */
      descending: boolean;
      /**
       * Page number (1-based)
       */
      page: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage: number;
    };
    /**
     * Number of pages available
     */
    pagesNumber: number;
    /**
     * Are we on first page?
     */
    isFirstPage: boolean;
    /**
     * Are we on last page?
     */
    isLastPage: boolean;
    /**
     * Navigates to first page
     */
    firstPage: () => void;
    /**
     * Navigates to previous page, if available
     */
    prevPage: () => void;
    /**
     * Navigates to next page, if available
     */
    nextPage: () => void;
    /**
     * Navigates to last page
     */
    lastPage: () => void;
    /**
     * Is table in fullscreen mode?
     */
    inFullscreen: boolean;
    /**
     * Toggles fullscreen mode
     */
    toggleFullscreen: () => void;
  }) => VNode[];
  /**
   * Slot to define how left part of the table top looks like
   * @param scope
   */
  "top-left": (scope: {
    /**
     * Pagination object
     */
    pagination: {
      /**
       * Column name (from column definition)
       */
      sortBy: string | null;
      /**
       * Is sorting in descending order?
       */
      descending: boolean;
      /**
       * Page number (1-based)
       */
      page: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage: number;
    };
    /**
     * Number of pages available
     */
    pagesNumber: number;
    /**
     * Are we on first page?
     */
    isFirstPage: boolean;
    /**
     * Are we on last page?
     */
    isLastPage: boolean;
    /**
     * Navigates to first page
     */
    firstPage: () => void;
    /**
     * Navigates to previous page, if available
     */
    prevPage: () => void;
    /**
     * Navigates to next page, if available
     */
    nextPage: () => void;
    /**
     * Navigates to last page
     */
    lastPage: () => void;
    /**
     * Is table in fullscreen mode?
     */
    inFullscreen: boolean;
    /**
     * Toggles fullscreen mode
     */
    toggleFullscreen: () => void;
  }) => VNode[];
  /**
   * Slot to define how right part of the table top looks like
   * @param scope
   */
  "top-right": (scope: {
    /**
     * Pagination object
     */
    pagination: {
      /**
       * Column name (from column definition)
       */
      sortBy: string | null;
      /**
       * Is sorting in descending order?
       */
      descending: boolean;
      /**
       * Page number (1-based)
       */
      page: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage: number;
    };
    /**
     * Number of pages available
     */
    pagesNumber: number;
    /**
     * Are we on first page?
     */
    isFirstPage: boolean;
    /**
     * Are we on last page?
     */
    isLastPage: boolean;
    /**
     * Navigates to first page
     */
    firstPage: () => void;
    /**
     * Navigates to previous page, if available
     */
    prevPage: () => void;
    /**
     * Navigates to next page, if available
     */
    nextPage: () => void;
    /**
     * Navigates to last page
     */
    lastPage: () => void;
    /**
     * Is table in fullscreen mode?
     */
    inFullscreen: boolean;
    /**
     * Toggles fullscreen mode
     */
    toggleFullscreen: () => void;
  }) => VNode[];
  /**
   * Slot to define how top table section looks like when user has selected at least one row
   * @param scope
   */
  "top-selection": (scope: {
    /**
     * Pagination object
     */
    pagination: {
      /**
       * Column name (from column definition)
       */
      sortBy: string | null;
      /**
       * Is sorting in descending order?
       */
      descending: boolean;
      /**
       * Page number (1-based)
       */
      page: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage: number;
    };
    /**
     * Number of pages available
     */
    pagesNumber: number;
    /**
     * Are we on first page?
     */
    isFirstPage: boolean;
    /**
     * Are we on last page?
     */
    isLastPage: boolean;
    /**
     * Navigates to first page
     */
    firstPage: () => void;
    /**
     * Navigates to previous page, if available
     */
    prevPage: () => void;
    /**
     * Navigates to next page, if available
     */
    nextPage: () => void;
    /**
     * Navigates to last page
     */
    lastPage: () => void;
    /**
     * Is table in fullscreen mode?
     */
    inFullscreen: boolean;
    /**
     * Toggles fullscreen mode
     */
    toggleFullscreen: () => void;
  }) => VNode[];
  /**
   * Slot to define how the bottom will look like when is nothing to display
   * @param scope
   */
  "no-data": (scope: {
    /**
     * The suggested message
     */
    message: string;
    /**
     * The suggested icon name (following Quasar convention)
     */
    icon: string;
  }) => VNode[];
}

export interface QTable extends ComponentPublicInstance<QTableProps> {
  /**
   * Toggles fullscreen mode
   */
  toggleFullscreen: () => void;
  /**
   * Enter the fullscreen view
   */
  setFullscreen: () => void;
  /**
   * Leave the fullscreen view
   */
  exitFullscreen: () => void;
  /**
   * Trigger a server request (emits 'request' event)
   * @param props Request details
   */
  requestServerInteraction: (props?: {
    /**
     * Optional pagination object
     */
    pagination?: {
      /**
       * Column name (from column definition)
       */
      sortBy?: string;
      /**
       * Is sorting in descending order?
       */
      descending?: boolean;
      /**
       * Page number (1-based)
       */
      page?: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage?: number;
      /**
       * For server-side fetching only. How many total database rows are there to be added to the table.
       */
      rowsNumber?: number;
    };
    /**
     * Filtering method (the 'filter-method' prop)
     * @param rows Array of rows
     * @param terms Terms to filter with (is essentially the 'filter' prop value)
     * @param cols Optional column definitions
     * @param getCellValue Optional function to get a cell value
     * @returns Filtered rows
     */
    filter?: (
      rows: readonly any[],
      terms: string | any,
      cols?: readonly any[],
      getCellValue?: (col?: any, row?: any) => any
    ) => readonly any[];
  }) => void;
  /**
   * Unless using an external pagination Object (through 'v-model:pagination' prop), you can use this method and force the internal pagination to change
   * @param pagination Pagination object
   * @param forceServerRequest Also force a server request
   */
  setPagination: (
    pagination: {
      /**
       * Column name (from column definition)
       */
      sortBy?: string | null;
      /**
       * Is sorting in descending order?
       */
      descending?: boolean;
      /**
       * Page number (1-based)
       */
      page?: number;
      /**
       * How many rows per page? 0 means Infinite
       */
      rowsPerPage?: number;
    },
    forceServerRequest?: boolean
  ) => void;
  /**
   * Navigates to first page
   */
  firstPage: () => void;
  /**
   * Navigates to previous page, if available
   */
  prevPage: () => void;
  /**
   * Navigates to next page, if available
   */
  nextPage: () => void;
  /**
   * Navigates to last page
   */
  lastPage: () => void;
  /**
   * Determine if a row has been selected by user
   * @param key Row key value
   * @returns Is row selected or not?
   */
  isRowSelected: (key: any) => boolean;
  /**
   * Clears user selection (emits 'update:selected' with empty array)
   */
  clearSelection: () => void;
  /**
   * Determine if a row is expanded or not
   * @param key Row key value
   * @returns Is row expanded or not?
   */
  isRowExpanded: (key: any) => boolean;
  /**
   * Sets the expanded rows keys array; Especially useful if not using an external 'expanded' state otherwise just emits 'update:expanded' with the value
   * @param expanded Array containing keys of the expanded rows
   */
  setExpanded: (expanded: readonly any[]) => void;
  /**
   * Trigger a table sort
   * @param col Column name or column definition object
   */
  sort: (col: string | any) => void;
  /**
   * Resets the virtual scroll (if using it) computations; Needed for custom edge-cases
   */
  resetVirtualScroll: () => void;
  /**
   * Scroll the table to the row with the specified index in page (0 based)
   * @param index The index of the row in page (0 based)
   * @param edge Only for virtual scroll - the edge to align to if the row is not visible already; If the '-force' version is used then it always aligns
   */
  scrollTo: (
    index: string | number,
    edge?:
      | "start"
      | "center"
      | "end"
      | "start-force"
      | "center-force"
      | "end-force"
  ) => void;
  /**
   * The filtered and sorted rows (same as the rows prop if using server-side fetching)
   */
  readonly filteredSortedRows: readonly any[];
  /**
   * Paginated, filtered, and sorted rows (same as the rows prop if using server-side fetching)
   */
  readonly computedRows: readonly any[];
  /**
   * The number of computed rows
   */
  readonly computedRowsNumber: number;
}

export interface QTdProps {
  /**
   * QTable's column scoped slot property
   */
  props?: any | undefined;
  /**
   * Tries to shrink column width size; Useful for columns with a checkbox/radio/toggle
   */
  autoWidth?: boolean | undefined;
  /**
   * Disable hover effect
   */
  noHover?: boolean | undefined;
}

export interface QTdSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QTd extends ComponentPublicInstance<QTdProps> {}

export interface QThProps {
  /**
   * QTable's header column scoped slot property
   */
  props?: any | undefined;
  /**
   * Tries to shrink header column width size; Useful for columns with a checkbox/radio/toggle
   */
  autoWidth?: boolean | undefined;
}

export interface QThSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QTh extends ComponentPublicInstance<QThProps> {}

export interface QTrProps {
  /**
   * QTable's row scoped slot property
   */
  props?: any | undefined;
  /**
   * Disable hover effect
   */
  noHover?: boolean | undefined;
}

export interface QTrSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QTr extends ComponentPublicInstance<QTrProps> {}

export interface QRouteTabProps {
  /**
   * Equivalent to Vue Router <router-link> 'to' property; Superseded by 'href' prop if used
   */
  to?: string | any | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'exact' property; Superseded by 'href' prop if used
   */
  exact?: boolean | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'replace' property; Superseded by 'href' prop if used
   */
  replace?: boolean | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used
   */
  activeClass?: string | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used
   */
  exactActiveClass?: string | undefined;
  /**
   * Native <a> link href attribute; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props
   */
  href?: string | undefined;
  /**
   * Native <a> link target attribute; Use it only along with 'href' prop; Has priority over the 'to'/'exact'/'replace'/'active-class'/'exact-active-class' props
   */
  target?: string | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * A number or string to label the tab
   */
  label?: number | string | undefined;
  /**
   * Adds an alert symbol to the tab, notifying the user there are some updates; If its value is not a Boolean, then you can specify a color
   */
  alert?: boolean | string | undefined;
  /**
   * Adds a floating icon to the tab, notifying the user there are some updates; It's displayed only if 'alert' is set; Can use the color specified by 'alert' prop
   */
  alertIcon?: string | undefined;
  /**
   * Panel name
   * Default value: A random UID
   */
  name?: number | string | undefined;
  /**
   * Turns off capitalizing all letters within the tab (which is the default)
   */
  noCaps?: boolean | undefined;
  /**
   * Class definitions to be attributed to the content wrapper
   */
  contentClass?: string | undefined;
  /**
   * Configure material ripple (disable it by setting it to 'false' or supply a config object)
   * Default value: true
   */
  ripple?: boolean | any | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Emitted when the component is clicked
   * @param evt JS event object; If you want to cancel navigation then call evt.preventDefault() synchronously in your event handler
   * @param go When you need to control the time at which the component should trigger the route navigation then call evt.preventDefault() synchronously and then call this function at your convenience; Useful if you have async work to be done before the actual route navigation or if you want to redirect somewhere else
   */
  onClick?: (
    evt: Event,
    go?: (opts?: {
      /**
       * Equivalent to Vue Router <router-link> 'to' property; Specify it explicitly otherwise it will be set with same value as component's 'to' prop
       */
      to?: string | any;
      /**
       * Equivalent to Vue Router <router-link> 'replace' property; Specify it explicitly otherwise it will be set with same value as component's 'replace' prop
       */
      replace?: boolean;
      /**
       * Return the router error, if any; Otherwise the returned Promise will always fulfill
       */
      returnRouterError?: boolean;
    }) => Promise<any>
  ) => void;
}

export interface QRouteTabSlots {
  /**
   * Suggestion: QMenu, QTooltip
   */
  default: () => VNode[];
}

export interface QRouteTab extends ComponentPublicInstance<QRouteTabProps> {}

export interface QTabProps {
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * A number or string to label the tab
   */
  label?: number | string | undefined;
  /**
   * Adds an alert symbol to the tab, notifying the user there are some updates; If its value is not a Boolean, then you can specify a color
   */
  alert?: boolean | string | undefined;
  /**
   * Adds a floating icon to the tab, notifying the user there are some updates; It's displayed only if 'alert' is set; Can use the color specified by 'alert' prop
   */
  alertIcon?: string | undefined;
  /**
   * Panel name
   * Default value: A random UID
   */
  name?: number | string | undefined;
  /**
   * Turns off capitalizing all letters within the tab (which is the default)
   */
  noCaps?: boolean | undefined;
  /**
   * Class definitions to be attributed to the content wrapper
   */
  contentClass?: string | undefined;
  /**
   * Configure material ripple (disable it by setting it to 'false' or supply a config object)
   * Default value: true
   */
  ripple?: boolean | any | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
}

export interface QTabSlots {
  /**
   * Suggestion: QMenu, QTooltip
   */
  default: () => VNode[];
}

export interface QTab extends ComponentPublicInstance<QTabProps> {}

export interface QTabsProps {
  /**
   * Model of the component defining current panel name; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue?: number | string | null | undefined;
  /**
   * Use vertical design (tabs one on top of each other rather than one next to the other horizontally)
   */
  vertical?: boolean | undefined;
  /**
   * Reserve space for arrows to place them on each side of the tabs (the arrows fade when inactive)
   */
  outsideArrows?: boolean | undefined;
  /**
   * Force display of arrows (if needed) on mobile
   */
  mobileArrows?: boolean | undefined;
  /**
   * Horizontal alignment the tabs within the tabs container
   * Default value: center
   */
  align?: "left" | "center" | "right" | "justify" | undefined;
  /**
   * Breakpoint (in pixels) of tabs container width at which the tabs automatically turn to a justify alignment
   * Default value: 600
   */
  breakpoint?: number | string | undefined;
  /**
   * The color to be attributed to the text of the active tab
   */
  activeColor?: NamedColor | undefined;
  /**
   * The color to be attributed to the background of the active tab
   */
  activeBgColor?: NamedColor | undefined;
  /**
   * The color to be attributed to the indicator (the underline) of the active tab
   */
  indicatorColor?: NamedColor | undefined;
  /**
   * Class definitions to be attributed to the content wrapper
   */
  contentClass?: string | undefined;
  /**
   * The class to be set on the active tab
   */
  activeClass?: string | undefined;
  /**
   * The name of an icon to replace the default arrow used to scroll through the tabs to the left, when the tabs extend past the width of the tabs container
   */
  leftIcon?: string | undefined;
  /**
   * The name of an icon to replace the default arrow used to scroll through the tabs to the right, when the tabs extend past the width of the tabs container
   */
  rightIcon?: string | undefined;
  /**
   * When used on flexbox parent, tabs will stretch to parent's height
   */
  stretch?: boolean | undefined;
  /**
   * By default, QTabs is set to grow to the available space; However, you can reverse that with this prop; Useful (and required) when placing the component in a QToolbar
   */
  shrink?: boolean | undefined;
  /**
   * Switches the indicator position (on left of tab for vertical mode or above the tab for default horizontal mode)
   */
  switchIndicator?: boolean | undefined;
  /**
   * Allows the indicator to be the same width as the tab's content (text or icon), instead of the whole width of the tab
   */
  narrowIndicator?: boolean | undefined;
  /**
   * Allows the text to be inline with the icon, should one be used
   */
  inlineLabel?: boolean | undefined;
  /**
   * Turns off capitalizing all letters within the tab (which is the default)
   */
  noCaps?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   */
  "onUpdate:modelValue"?: (value: any) => void;
}

export interface QTabsSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QTabs extends ComponentPublicInstance<QTabsProps> {}

export interface QTimeProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Display the component in landscape mode
   */
  landscape?: boolean | undefined;
  /**
   * Mask (formatting string) used for parsing and formatting value
   * Default value: HH:mm
   */
  mask?: string | undefined;
  /**
   * Locale formatting options
   */
  locale?:
    | {
        /**
         * List of full day names (DDDD), starting with Sunday
         */
        days?: readonly any[];
        /**
         * List of short day names (DDD), starting with Sunday
         */
        daysShort?: readonly any[];
        /**
         * List of full month names (MMMM), starting with January
         */
        months?: readonly any[];
        /**
         * List of short month names (MMM), starting with January
         */
        monthsShort?: readonly any[];
      }
    | undefined;
  /**
   * Specify calendar type
   * Default value: gregorian
   */
  calendar?: "gregorian" | "persian" | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a 'flat' design (no default shadow)
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Time of the component; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue: string | null | undefined;
  /**
   * Forces 24 hour time display instead of AM/PM system
   * Default value: (based on Quasar lang language being used)
   */
  format24h?: boolean | undefined;
  /**
   * The default date to use (in YYYY/MM/DD format) when model is unfilled (undefined or null)
   * Default value: current day
   */
  defaultDate?: string | undefined;
  /**
   * Optionally configure what time is the user allowed to set; Overridden by 'hour-options', 'minute-options' and 'second-options' if those are set; For best performance, reference it from your scope and do not define it inline
   * @param hr Hour
   * @param min Minutes
   * @param sec Seconds
   */
  options?:
    | ((hr: number, min: number | null, sec: number | null) => void)
    | undefined;
  /**
   * Optionally configure what hours is the user allowed to set; Overrides 'options' prop if that is also set
   */
  hourOptions?: readonly any[] | undefined;
  /**
   * Optionally configure what minutes is the user allowed to set; Overrides 'options' prop if that is also set
   */
  minuteOptions?: readonly any[] | undefined;
  /**
   * Optionally configure what seconds is the user allowed to set; Overrides 'options' prop if that is also set
   */
  secondOptions?: readonly any[] | undefined;
  /**
   * Allow the time to be set with seconds
   */
  withSeconds?: boolean | undefined;
  /**
   * Display a button that selects the current time
   */
  nowBtn?: boolean | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   * @param details Object of properties on the new model
   */
  "onUpdate:modelValue"?: (
    value: string | null,
    details: {
      /**
       * The year
       */
      year: number;
      /**
       * The month
       */
      month: number;
      /**
       * The day of the month
       */
      day: number;
      /**
       * The hour
       */
      hour: number;
      /**
       * The minute
       */
      minute: number;
      /**
       * The second
       */
      second: number;
      /**
       * The millisecond
       */
      millisecond: number;
      /**
       * Did the model change?
       */
      changed: boolean;
    }
  ) => void;
}

export interface QTimeSlots {
  /**
   * This is where additional buttons can go
   */
  default: () => VNode[];
}

export interface QTime extends ComponentPublicInstance<QTimeProps> {
  /**
   * Change model to current moment
   */
  setNow: () => void;
}

export interface QTimelineProps {
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Side to place the timeline entries in dense and comfortable layout; For loose layout it gets overridden by QTimelineEntry side prop
   * Default value: right
   */
  side?: "left" | "right" | undefined;
  /**
   * Layout of the timeline. Dense keeps content and labels on one side. Comfortable keeps content on one side and labels on the opposite side. Loose puts content on both sides.
   * Default value: dense
   */
  layout?: "dense" | "comfortable" | "loose" | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
}

export interface QTimelineSlots {
  /**
   * Used for content of component
   */
  default: () => VNode[];
}

export interface QTimeline extends ComponentPublicInstance<QTimelineProps> {}

export interface QTimelineEntryProps {
  /**
   * Defines a heading timeline item
   */
  heading?: boolean | undefined;
  /**
   * Tag to use, if of type 'heading' only
   * Default value: h3
   */
  tag?: string | undefined;
  /**
   * Side to place the timeline entry; Works only if QTimeline layout is loose.
   * Default value: right
   */
  side?: "left" | "right" | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * URL to the avatar image; Icon takes precedence if used, so it replaces avatar
   */
  avatar?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Title of timeline entry; Is overridden if using 'title' slot
   */
  title?: string | undefined;
  /**
   * Subtitle of timeline entry; Is overridden if using 'subtitle' slot
   */
  subtitle?: string | undefined;
  /**
   * Body content of timeline entry; Use this prop or the default slot
   */
  body?: string | undefined;
}

export interface QTimelineEntrySlots {
  /**
   * Timeline entry content (body)
   */
  default: () => VNode[];
  /**
   * Optional slot for title; When used, it overrides 'title' prop
   */
  title: () => VNode[];
  /**
   * Optional slot for subtitle; When used, it overrides 'subtitle' prop
   */
  subtitle: () => VNode[];
}

export interface QTimelineEntry
  extends ComponentPublicInstance<QTimelineEntryProps> {}

export interface QToggleProps {
  /**
   * Used to specify the name of the control; Useful if dealing with forms submitted directly to a URL
   */
  name?: string | undefined;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Model of the component; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue: any | any[];
  /**
   * Works when model ('value') is Array. It tells the component which value should add/remove when ticked/unticked
   */
  val?: any | undefined;
  /**
   * What model value should be considered as checked/ticked/on?
   * Default value: true
   */
  trueValue?: any | undefined;
  /**
   * What model value should be considered as unchecked/unticked/off?
   */
  falseValue?: any | undefined;
  /**
   * What model value should be considered as 'indeterminate'?
   */
  indeterminateValue?: any | undefined;
  /**
   * Determines toggle order of the two states ('t' stands for state of true, 'f' for state of false); If 'toggle-indeterminate' is true, then the order is: indet -> first state -> second state -> indet (and repeat), otherwise: indet -> first state -> second state -> first state -> second state -> ...
   * Default value: tf
   */
  toggleOrder?: "tf" | "ft" | undefined;
  /**
   * When user clicks/taps on the component, should we toggle through the indeterminate state too?
   */
  toggleIndeterminate?: boolean | undefined;
  /**
   * Label to display along the component (or use the default slot instead of this prop)
   */
  label?: string | undefined;
  /**
   * Label (if any specified) should be displayed on the left side of the component
   */
  leftLabel?: boolean | undefined;
  /**
   * The icon to be used when the toggle is on
   */
  checkedIcon?: string | undefined;
  /**
   * The icon to be used when the toggle is off
   */
  uncheckedIcon?: string | undefined;
  /**
   * The icon to be used when the model is indeterminate
   */
  indeterminateIcon?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Should the color (if specified any) be kept when the component is unticked/ off?
   */
  keepColor?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Override default icon color (for truthy state only); Color name for component from the Quasar Color Palette
   */
  iconColor?: NamedColor | undefined;
  /**
   * Emitted when the component needs to change the model; Is also used by v-model
   * @param value New model value
   * @param evt JS event object
   */
  "onUpdate:modelValue"?: (value: any, evt: Event) => void;
}

export interface QToggleSlots {
  /**
   * Default slot can be used as label, unless 'label' prop is specified; Suggestion: string
   */
  default: () => VNode[];
}

export interface QToggle extends ComponentPublicInstance<QToggleProps> {
  /**
   * Toggle the state (of the model)
   */
  toggle: () => void;
}

export interface QToolbarProps {
  /**
   * Apply an inset to content (useful for subsequent toolbars)
   */
  inset?: boolean | undefined;
}

export interface QToolbarSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QToolbar extends ComponentPublicInstance<QToolbarProps> {}

export interface QToolbarTitleProps {
  /**
   * By default, QToolbarTitle is set to grow to the available space. However, you can reverse that with this prop
   */
  shrink?: boolean | undefined;
}

export interface QToolbarTitleSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QToolbarTitle
  extends ComponentPublicInstance<QToolbarTitleProps> {}

export interface QTooltipProps {
  /**
   * One of Quasar's embedded transitions
   * Default value: jump-down
   */
  transitionShow?: string | undefined;
  /**
   * One of Quasar's embedded transitions
   * Default value: jump-up
   */
  transitionHide?: string | undefined;
  /**
   * Transition duration (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Model of the component defining shown/hidden state; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue?: boolean;
  /**
   * The maximum height of the Tooltip; Size in CSS units, including unit name
   */
  maxHeight?: string | undefined;
  /**
   * The maximum width of the Tooltip; Size in CSS units, including unit name
   */
  maxWidth?: string | undefined;
  /**
   * Two values setting the starting position or anchor point of the Tooltip relative to its target
   * Default value: bottom middle
   */
  anchor?:
    | "top left"
    | "top middle"
    | "top right"
    | "top start"
    | "top end"
    | "center left"
    | "center middle"
    | "center right"
    | "center start"
    | "center end"
    | "bottom left"
    | "bottom middle"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | undefined;
  /**
   * Two values setting the Tooltip's own position relative to its target
   * Default value: top middle
   */
  self?:
    | "top left"
    | "top middle"
    | "top right"
    | "top start"
    | "top end"
    | "center left"
    | "center middle"
    | "center right"
    | "center start"
    | "center end"
    | "bottom left"
    | "bottom middle"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | undefined;
  /**
   * An array of two numbers to offset the Tooltip horizontally and vertically in pixels
   * Default value: [14, 14]
   */
  offset?: readonly any[] | undefined;
  /**
   * CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one
   */
  scrollTarget?: Element | string | undefined;
  /**
   * Configure a target element to trigger Tooltip toggle; 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements; By using a String (CSS selector) it attaches the events to the specified DOM element (if it exists)
   * Default value: true
   */
  target?: boolean | string | undefined;
  /**
   * Skips attaching events to the target DOM element (that trigger the element to get shown)
   */
  noParentEvent?: boolean | undefined;
  /**
   * Configure Tooltip to appear with delay
   */
  delay?: number | undefined;
  /**
   * Configure Tooltip to disappear with delay
   */
  hideDelay?: number | undefined;
  /**
   * Emitted when showing/hidden state changes; Is also used by v-model
   * @param value New state (showing/hidden)
   */
  "onUpdate:modelValue"?: (value: boolean) => void;
  /**
   * Emitted after component has triggered show()
   * @param evt JS event object
   */
  onShow?: (evt: Event) => void;
  /**
   * Emitted when component triggers show() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeShow?: (evt: Event) => void;
  /**
   * Emitted after component has triggered hide()
   * @param evt JS event object
   */
  onHide?: (evt: Event) => void;
  /**
   * Emitted when component triggers hide() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeHide?: (evt: Event) => void;
}

export interface QTooltipSlots {
  /**
   * Default slot in the devland unslotted content of the component
   */
  default: () => VNode[];
}

export interface QTooltip extends ComponentPublicInstance<QTooltipProps> {
  /**
   * Triggers component to show
   * @param evt JS event object
   */
  show: (evt?: Event) => void;
  /**
   * Triggers component to hide
   * @param evt JS event object
   */
  hide: (evt?: Event) => void;
  /**
   * Triggers component to toggle between show/hide
   * @param evt JS event object
   */
  toggle: (evt?: Event) => void;
  /**
   * There are some custom scenarios for which Quasar cannot automatically reposition the tooltip without significant performance drawbacks so the optimal solution is for you to call this method when you need it
   */
  updatePosition: () => void;
  /**
   * The DOM Element of the rendered content
   */
  readonly contentEl: Element;
}

export interface QTreeProps {
  /**
   * The array of nodes that designates the tree structure
   */
  nodes: QTreeNode[];
  /**
   * The property name of each node object that holds a unique node id
   */
  nodeKey: string;
  /**
   * The property name of each node object that holds the label of the node
   * Default value: label
   */
  labelKey?: string | undefined;
  /**
   * The property name of each node object that holds the list of children of the node
   * Default value: children
   */
  childrenKey?: string | undefined;
  /**
   * Do not display the connector lines between nodes
   */
  noConnectors?: boolean | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Color name for controls (like checkboxes) from the Quasar Color Palette
   */
  controlColor?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Color name for selected nodes (from the Quasar Color Palette)
   */
  selectedColor?: NamedColor | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * The type of strategy to use for the selection of the nodes
   * Default value: none
   */
  tickStrategy?: "none" | "strict" | "leaf" | "leaf-filtered" | undefined;
  /**
   * Keys of nodes that are ticked
   */
  ticked?: any[] | undefined;
  /**
   * Keys of nodes that are expanded
   */
  expanded?: any[] | undefined;
  /**
   * Key of node currently selected
   */
  selected?: any | undefined;
  /**
   * Do not allow un-selection when clicking currently selected node
   */
  noSelectionUnset?: boolean | undefined;
  /**
   * Allow the tree to have all its branches expanded, when first rendered
   */
  defaultExpandAll?: boolean | undefined;
  /**
   * Allows the tree to be set in accordion mode
   */
  accordion?: boolean | undefined;
  /**
   * Turn off transition effects when expanding/collapsing nodes; Also enhances perf by a lot as a side-effect; Recommended for big trees
   */
  noTransition?: boolean | undefined;
  /**
   * The text value to be used for filtering nodes
   */
  filter?: string | undefined;
  /**
   * The function to use to filter the tree nodes; For best performance, reference it from your scope and do not define it inline
   * Default value: (see source code)
   * @param node Node currently being filtered
   * @param filter Filter text to match against
   * @returns Matches or not
   */
  filterMethod?: ((node: any, filter: string) => boolean) | undefined;
  /**
   * Toggle animation duration (in milliseconds)
   * Default value: 300
   */
  duration?: number | undefined;
  /**
   * Override default such label for when no nodes are available
   */
  noNodesLabel?: string | undefined;
  /**
   * Override default such label for when no nodes are available due to filtering
   */
  noResultsLabel?: string | undefined;
  /**
   * Triggered when nodes are expanded or collapsed; Used by Vue on 'v-model:update' to update its value
   * @param expanded The expanded node keys
   */
  "onUpdate:expanded"?: (expanded: readonly any[]) => void;
  /**
   * Emitted when the lazy loading of nodes is finished
   * @param details Lazy loading details
   */
  onLazyLoad?: (details: {
    /**
     * The node to which the new nodes (the children) will be appended
     */
    node: any;
    /**
     * The key of the node getting the newly loaded child nodes
     */
    key: string;
    /**
     * The callback to be carried out when the loading is successful
     * @param children Array of nodes
     */
    done: (children?: readonly any[]) => void;
    /**
     * The callback to be carried out should the loading fails
     */
    fail: () => void;
  }) => void;
  /**
   * Emitted when nodes are ticked/unticked via the checkbox; Used by Vue on 'v-model:ticked' to update its value
   * @param target The ticked node keys
   */
  "onUpdate:ticked"?: (target: readonly any[]) => void;
  /**
   * Emitted when selected node changes; Used by Vue on 'v-model:selected' to update its value
   * @param target The selected node key
   */
  "onUpdate:selected"?: (target: any) => void;
  /**
   * Emitted when component show animation is finished
   */
  onAfterShow?: () => void;
  /**
   * Emitted when component hide animation is finished
   */
  onAfterHide?: () => void;
}

export interface QTreeSlots {
  /**
   * Slot to use for defining the header of a node
   * @param scope
   */
  "default-header": (scope: {
    /**
     * Is node expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expanded: boolean;
    /**
     * Is node ticked? Can directly be assigned new Boolean value which changes ticked state
     */
    ticked: boolean;
    /**
     * QTree instance
     */
    tree: QTree;
    /**
     * Node object
     */
    node: any;
    /**
     * Node's key
     */
    key: any;
    /**
     * QTree instance 'color' supplied prop value
     */
    color: string;
    /**
     * QTree instance 'dark' supplied prop value
     */
    dark: boolean;
  }) => VNode[];
  /**
   * Header template slot for describing node header; Used by nodes which have their 'header' prop set to '[name]', where '[name]' can be any string
   * @param scope
   */
  [key: `header-${string}`]: (scope: {
    /**
     * Is node expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expanded: boolean;
    /**
     * Is node ticked? Can directly be assigned new Boolean value which changes ticked state
     */
    ticked: boolean;
    /**
     * QTree instance
     */
    tree: QTree;
    /**
     * Node object
     */
    node: any;
    /**
     * Node's key
     */
    key: any;
    /**
     * QTree instance 'color' supplied prop value
     */
    color: string;
    /**
     * QTree instance 'dark' supplied prop value
     */
    dark: boolean;
  }) => VNode[];
  /**
   * Slot to use for defining the body of a node
   * @param scope
   */
  "default-body": (scope: {
    /**
     * Is node expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expanded: boolean;
    /**
     * Is node ticked? Can directly be assigned new Boolean value which changes ticked state
     */
    ticked: boolean;
    /**
     * QTree instance
     */
    tree: QTree;
    /**
     * Node object
     */
    node: any;
    /**
     * Node's key
     */
    key: any;
    /**
     * QTree instance 'color' supplied prop value
     */
    color: string;
    /**
     * QTree instance 'dark' supplied prop value
     */
    dark: boolean;
  }) => VNode[];
  /**
   * Body template slot for describing node body; Used by nodes which have their 'body' prop set to '[name]', where '[name]' can be any string
   * @param scope
   */
  [key: `body-${string}`]: (scope: {
    /**
     * Is node expanded? Can directly be assigned new Boolean value which changes expanded state
     */
    expanded: boolean;
    /**
     * Is node ticked? Can directly be assigned new Boolean value which changes ticked state
     */
    ticked: boolean;
    /**
     * QTree instance
     */
    tree: QTree;
    /**
     * Node object
     */
    node: any;
    /**
     * Node's key
     */
    key: any;
    /**
     * QTree instance 'color' supplied prop value
     */
    color: string;
    /**
     * QTree instance 'dark' supplied prop value
     */
    dark: boolean;
  }) => VNode[];
}

export interface QTree extends ComponentPublicInstance<QTreeProps> {
  /**
   * Get the node with the given key
   * @param key The key of a node
   * @returns Requested node
   */
  getNodeByKey: (key: any) => any;
  /**
   * Get array of nodes that are ticked
   * @returns Ticked node objects
   */
  getTickedNodes: () => readonly any[];
  /**
   * Get array of nodes that are expanded
   * @returns Expanded node objects
   */
  getExpandedNodes: () => readonly any[];
  /**
   * Determine if a node is expanded
   * @param key The key of a node
   * @returns Is specified node expanded?
   */
  isExpanded: (key: any) => boolean;
  /**
   * Use to expand all branches of the tree
   */
  expandAll: () => void;
  /**
   * Use to collapse all branches of the tree
   */
  collapseAll: () => void;
  /**
   * Expands the tree at the point of the node with the key given
   * @param key The key of a node
   * @param state Set to 'true' to expand the branch of the tree, otherwise 'false' collapses it
   */
  setExpanded: (key: any, state: boolean) => void;
  /**
   * Method to check if a node's checkbox is selected or not
   * @param key The key of a node
   * @returns Is specified node ticked?
   */
  isTicked: (key: any) => boolean;
  /**
   * Method to set a node's checkbox programmatically
   * @param keys The keys of nodes to tick/untick
   * @param state Set to 'true' to tick the checkbox of nodes, otherwise 'false' unticks them
   */
  setTicked: (keys: readonly any[], state: boolean) => void;
}

export interface QUploaderProps {
  /**
   * Function which should return an Object or a Promise resolving with an Object; For best performance, reference it from your scope and do not define it inline
   * @param files Uploaded files
   * @returns Optional configuration for the upload process; You can override QUploader props in this Object (url, method, headers, formFields, fieldName, withCredentials, sendRaw); Props of these Object can also be Functions with the form of (file[s]) => value
   */
  factory?: QUploaderFactoryFn | undefined;
  /**
   * URL or path to the server which handles the upload. Takes String or factory function, which returns String. Function is called right before upload; If using a function then for best performance, reference it from your scope and do not define it inline
   * @param files Uploaded files
   * @returns URL or path to the server which handles the upload
   */
  url?: string | ((files: readonly any[]) => string) | undefined;
  /**
   * HTTP method to use for upload; Takes String or factory function which returns a String; Function is called right before upload; If using a function then for best performance, reference it from your scope and do not define it inline
   * Default value: POST
   * @param files Uploaded files
   * @returns HTTP method to use for upload
   */
  method?: "POST" | "PUT" | ((files: readonly any[]) => string) | undefined;
  /**
   * Field name for each file upload; This goes into the following header: 'Content-Disposition: form-data; name="__HERE__"; filename="somefile.png"; If using a function then for best performance, reference it from your scope and do not define it inline
   * Default value: (file) => file.name
   * @param files The current file being processed
   * @returns Field name for the current file upload
   */
  fieldName?: string | ((files: File) => string) | undefined;
  /**
   * Array or a factory function which returns an array; Array consists of objects with header definitions; Function is called right before upload; If using a function then for best performance, reference it from your scope and do not define it inline
   * @param files Uploaded files
   * @returns An array consisting of objects with header definitions
   */
  headers?:
    | {
        /**
         * Header name
         */
        name: string;
        /**
         * Header value
         */
        value: string;
      }[]
    | ((files: readonly any[]) => string)
    | undefined;
  /**
   * Array or a factory function which returns an array; Array consists of objects with additional fields definitions (used by Form to be uploaded); Function is called right before upload; If using a function then for best performance, reference it from your scope and do not define it inline
   * @param files Uploaded files
   * @returns An array consists of objects with additional fields definitions (used by Form to be uploaded)
   */
  formFields?:
    | {
        /**
         * Field name
         */
        name: string;
        /**
         * Field value
         */
        value: string;
      }[]
    | ((files: readonly any[]) => string)
    | undefined;
  /**
   * Sets withCredentials to true on the XHR that manages the upload; Takes boolean or factory function for Boolean; Function is called right before upload; If using a function then for best performance, reference it from your scope and do not define it inline
   * @param files Uploaded files
   * @returns If true, withCredentials will be set to true on the XHR that manages the upload
   */
  withCredentials?: boolean | ((files: readonly any[]) => boolean) | undefined;
  /**
   * Send raw files without wrapping into a Form(); Takes boolean or factory function for Boolean; Function is called right before upload; If using a function then for best performance, reference it from your scope and do not define it inline
   * @param files Uploaded files
   * @returns If true, raw files will get sent without wrapping into a Form()
   */
  sendRaw?: boolean | ((files: readonly any[]) => boolean) | undefined;
  /**
   * Upload files in batch (in one XHR request); Takes boolean or factory function for Boolean; Function is called right before upload; If using a function then for best performance, reference it from your scope and do not define it inline
   * @param files Uploaded files
   * @returns If true, files will be uploaded in a batch (in one XHR request)
   */
  batch?: boolean | ((files: readonly any[]) => boolean) | undefined;
  /**
   * Allow multiple file uploads
   */
  multiple?: boolean | undefined;
  /**
   * Comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element
   */
  accept?: string | undefined;
  /**
   * Optionally, specify that a new file should be captured, and which device should be used to capture that new media of a type defined by the 'accept' prop. Maps to 'capture' attribute of native input type=file element
   */
  capture?: "user" | "environment" | undefined;
  /**
   * Maximum size of individual file in bytes
   */
  maxFileSize?: number | string | undefined;
  /**
   * Maximum size of all files combined in bytes
   */
  maxTotalSize?: number | string | undefined;
  /**
   * Maximum number of files to contain
   */
  maxFiles?: number | string | undefined;
  /**
   * Custom filter for added files; Only files that pass this filter will be added to the queue and uploaded; For best performance, reference it from your scope and do not define it inline
   * @param files Candidate files to be added to queue
   * @returns Filtered files to be added to queue
   */
  filter?: ((files: FileList | readonly any[]) => readonly any[]) | undefined;
  /**
   * Label for the uploader
   */
  label?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a 'flat' design (no default shadow)
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Don't display thumbnails for image files
   */
  noThumbnails?: boolean | undefined;
  /**
   * Upload files immediately when added
   */
  autoUpload?: boolean | undefined;
  /**
   * Don't show the upload button
   */
  hideUploadBtn?: boolean | undefined;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Emitted when file or batch of files is uploaded
   * @param info Object containing information about the event
   */
  onUploaded?: (info: {
    /**
     * Uploaded files
     */
    files: readonly any[];
    /**
     * XMLHttpRequest that has been used to upload this batch of files
     */
    xhr: any;
  }) => void;
  /**
   * Emitted when file or batch of files has encountered error while uploading
   * @param info Object containing information about the event
   */
  onFailed?: (info: {
    /**
     * Files which encountered error
     */
    files: readonly any[];
    /**
     * XMLHttpRequest that has been used to upload this batch of files
     */
    xhr: any;
  }) => void;
  /**
   * Emitted when file or batch of files started uploading
   * @param info Object containing information about the event
   */
  onUploading?: (info: {
    /**
     * Files which are now uploading
     */
    files: readonly any[];
    /**
     * XMLHttpRequest used for uploading
     */
    xhr: any;
  }) => void;
  /**
   * Emitted when factory function is supplied with a Promise which is rejected
   * @param err Error object which is the Promise rejection reason
   * @param files Files which were to get uploaded
   */
  onFactoryFailed?: (err: Error, files: readonly any[]) => void;
  /**
   * Emitted after files are picked and some do not pass the validation props (accept, max-file-size, max-total-size, filter, etc)
   * @param rejectedEntries Array of { failedPropValidation: string, file: File } Objects for files that do not pass the validation
   */
  onRejected?: (rejectedEntries: QRejectedEntry[]) => void;
  /**
   * Emitted when files are added into the list
   * @param files Array of files that were added
   */
  onAdded?: (files: readonly any[]) => void;
  /**
   * Emitted when files are removed from the list
   * @param files Array of files that were removed
   */
  onRemoved?: (files: readonly any[]) => void;
  /**
   * Started working
   */
  onStart?: () => void;
  /**
   * Finished working (regardless of success or fail)
   */
  onFinish?: () => void;
}

export interface QUploaderSlots {
  /**
   * Slot for custom header; Scope is the QUploader instance itself
   * @param scope QUploader instance
   */
  header: (scope: QUploader) => VNode[];
  /**
   * Slot for custom list; Scope is the QUploader instance itself
   * @param scope QUploader instance
   */
  list: (scope: QUploader) => VNode[];
}

export interface QUploader extends ComponentPublicInstance<QUploaderProps> {
  /**
   * Trigger the file picker dialog; The event must come from a user interaction event handler
   * @param evt JS event object of the original user interaction handler
   */
  pickFiles: (evt: Event) => void;
  /**
   * Manually add files to the queue
   * @param files Must be an array of instances of JS File type
   */
  addFiles: (files: readonly any[]) => void;
  /**
   * Start uploading (same as clicking the upload button)
   */
  upload: () => void;
  /**
   * Abort upload of all files (same as clicking the abort button)
   */
  abort: () => void;
  /**
   * Resets uploader to default; Empties queue, aborts current uploads
   */
  reset: () => void;
  /**
   * Removes already uploaded files from the list
   */
  removeUploadedFiles: () => void;
  /**
   * Remove files that are waiting for upload to start (same as clicking the left clear button)
   */
  removeQueuedFiles: () => void;
  /**
   * Remove specified file from the queue
   * @param file The file to remove
   */
  removeFile: (file: File) => void;
  /**
   * Update the status of a file
   * @param file The file to update
   * @param status Status of file
   * @param uploadedSize The number of uploaded bytes of the file; Is required explicitly only when status is NOT 'uploaded'
   */
  updateFileStatus: (
    file: File,
    status: "idle" | "failed" | "uploading" | "uploaded",
    uploadedSize: number
  ) => void;
  /**
   * Is the component alive (activated but not unmounted); Useful to determine if you still need to compute anything going further
   * @returns If true, the current component is still activated and mounted
   */
  isAlive: () => boolean;
  /**
   * List of all files
   */
  readonly files: readonly any[];
  /**
   * List of files that are waiting to be uploaded
   */
  readonly queuedFiles: readonly any[];
  /**
   * List of files that have been uploaded
   */
  readonly uploadedFiles: readonly any[];
  /**
   * Size of all uploaded files in bytes
   */
  readonly uploadedSize: number;
  /**
   * Label for the size total of all files
   */
  readonly uploadSizeLabel: string;
  /**
   * Label for the upload progress (in %)
   */
  readonly uploadProgressLabel: string;
  /**
   * Whether new files can be added to the list
   */
  readonly canAddFiles: boolean;
  /**
   * Whether the files can be uploaded
   */
  readonly canUpload: boolean;
  /**
   * The component state is set as busy; User should not be able to interact with the component
   */
  readonly isBusy: boolean;
  /**
   * The component is uploading files
   */
  readonly isUploading: boolean;
}

export interface QUploaderAddTriggerProps {}

export interface QUploaderAddTriggerSlots {}

export interface QUploaderAddTrigger
  extends ComponentPublicInstance<QUploaderAddTriggerProps> {}

export interface QVideoProps {
  /**
   * Aspect ratio for the content; If value is a String, then avoid using a computational statement (like '16/9') and instead specify the String value of the result directly (eg. '1.7777')
   */
  ratio?: string | number | undefined;
  /**
   * The source url to display in an iframe
   */
  src: string;
  /**
   * (Accessibility) Set the native 'title' attribute value of the inner iframe being used
   */
  title?: string | undefined;
  /**
   * Provides a hint of the relative priority to use when fetching the iframe document
   * Default value: auto
   */
  fetchpriority?: "high" | "low" | "auto" | undefined;
  /**
   * Indicates how the browser should load the iframe
   * Default value: eager
   */
  loading?: "eager" | "lazy" | undefined;
  /**
   * Indicates which referrer to send when fetching the frame's resource
   * Default value: strict-origin-when-cross-origin
   */
  referrerpolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url"
    | undefined;
}

export interface QVideoSlots {}

export interface QVideo extends ComponentPublicInstance<QVideoProps> {}

export interface QVirtualScrollProps {
  /**
   * Make virtual list work in horizontal mode
   */
  virtualScrollHorizontal?: boolean | undefined;
  /**
   * Minimum number of items to render in the virtual list
   * Default value: 30
   */
  virtualScrollSliceSize?: number | string | undefined;
  /**
   * Ratio of number of items in visible zone to render before it
   * Default value: 1
   */
  virtualScrollSliceRatioBefore?: number | string | undefined;
  /**
   * Ratio of number of items in visible zone to render after it
   * Default value: 1
   */
  virtualScrollSliceRatioAfter?: number | string | undefined;
  /**
   * Default size in pixels (height if vertical, width if horizontal) of an item; This value is used for rendering the initial list; Try to use a value close to the minimum size of an item
   * Default value: 24
   */
  virtualScrollItemSize?: number | string | undefined;
  /**
   * Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the start of the list; A correct value will improve scroll precision
   * Default value: 0
   */
  virtualScrollStickySizeStart?: number | string | undefined;
  /**
   * Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the end of the list; A correct value will improve scroll precision
   * Default value: 0
   */
  virtualScrollStickySizeEnd?: number | string | undefined;
  /**
   * The number of columns in the table (you need this if you use table-layout: fixed)
   */
  tableColspan?: number | string | undefined;
  /**
   * The type of content: list (default) or table
   * Default value: list
   */
  type?: "list" | "table" | undefined;
  /**
   * Available list items that will be passed to the scoped slot; For best performance freeze the list of items; Required if 'itemsFn' is not supplied
   * Default value: []
   */
  items?: readonly any[] | undefined;
  /**
   * Number of available items in the list; Required and used only if 'itemsFn' is provided
   * Default value: void 0
   */
  itemsSize?: number | undefined;
  /**
   * Function to return the scope for the items to be displayed; Should return an array for items starting from 'from' index for size length; For best performance, reference it from your scope and do not define it inline
   * @param from Index of the first item (0 based)
   * @param size Number of items to return
   * @returns List of scope for items to be displayed
   */
  itemsFn?: ((from: number, size: number) => readonly any[]) | undefined;
  /**
   * CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one
   */
  scrollTarget?: Element | string | undefined;
  /**
   * Emitted when the virtual scroll occurs
   * @param details Object of properties on the new scroll position
   */
  onVirtualScroll?: (details: {
    /**
     * Index of the list item that was scrolled into view (0 based)
     */
    index: number;
    /**
     * The index of the first list item that is rendered (0 based)
     */
    from: number;
    /**
     * The index of the last list item that is rendered (0 based)
     */
    to: number;
    /**
     * Direction of change
     */
    direction: "increase" | "decrease";
    /**
     * Vue reference to the QVirtualScroll
     */
    ref: QVirtualScroll;
  }) => void;
}

export interface QVirtualScrollSlots {
  /**
   * Template slot for the elements that should be rendered before the list; Suggestion: thead before a table
   */
  before: () => VNode[];
  /**
   * Template slot for the elements that should be rendered after the list; Suggestion: tfoot after a table
   */
  after: () => VNode[];
  /**
   * Template slot for defining the list item; Suggestion: QItem
   * @param scope
   */
  default: (scope: {
    /**
     * Item index in the items list
     */
    index: number;
    /**
     * Item data -- its value is taken from 'items' prop
     */
    item: any;
  }) => VNode[];
}

export interface QVirtualScroll
  extends ComponentPublicInstance<QVirtualScrollProps> {
  /**
   * Scroll the virtual scroll list to the item with the specified index (0 based)
   * @param index The index of the list item (0 based)
   * @param edge The edge to align to if the item is not visible already (by default it aligns to end if scrolling towards the end and to start otherwise); If the '-force' version is used then it always aligns
   */
  scrollTo: (
    index: string | number,
    edge?:
      | "start"
      | "center"
      | "end"
      | "start-force"
      | "center-force"
      | "end-force"
  ) => void;
  /**
   * Resets the virtual scroll computations; Needed for custom edge-cases
   */
  reset: () => void;
  /**
   * Refreshes the virtual scroll list; Use it after appending items
   * @param index The index of the list item to scroll to after refresh (0 based); If it's not specified the scroll position is not changed; Use a negative value to keep scroll position
   */
  refresh: (index?: string | number) => void;
}

import { VueClassProp } from "./api";
import { VueStyleProp } from "./api";
export interface DialogChainObject {
  /**
   * Receives a Function param to tell what to do when OK is pressed / option is selected
   * @param callbackFn Tell what to do
   * @returns Chained Object
   */
  onOk: (callbackFn: (payload?: any) => void) => DialogChainObject;
  /**
   * Receives a Function as param to tell what to do when Cancel is pressed / dialog is dismissed
   * @param callbackFn Tell what to do
   * @returns Chained Object
   */
  onCancel: (callbackFn: () => void) => DialogChainObject;
  /**
   * Receives a Function param to tell what to do when the dialog is closed
   * @param callbackFn Tell what to do
   * @returns Chained Object
   */
  onDismiss: (callbackFn: () => void) => DialogChainObject;
  /**
   * Hides the dialog when called
   * @returns Chained Object
   */
  hide: () => DialogChainObject;
  /**
   * Updates the initial properties (given as create() param) except for 'component'
   * @param opts Props (except 'component') which will overwrite the initial create() params; If create() was invoked with a custom dialog component then this param should contain the new componentProps
   * @returns Chained Object
   */
  update: (opts: any) => DialogChainObject;
}

import { CookiesGetMethodType } from "./api";
import { QDialogInputPrompt } from "./api";
import { QDialogSelectionPrompt } from "./api";
import { NamedColor } from "./api";
export interface QDialogOptions {
  /**
   * CSS Class name to apply to the Dialog's QCard
   */
  class?: VueClassProp;
  /**
   * CSS style to apply to the Dialog's QCard
   */
  style?: VueStyleProp;
  /**
   * A text for the heading title of the dialog
   */
  title?: string;
  /**
   * A text with more information about what needs to be input, selected or confirmed.
   */
  message?: string;
  /**
   * Render title and message as HTML; This can lead to XSS attacks, so make sure that you sanitize the message first
   */
  html?: boolean;
  /**
   * Position of the Dialog on screen. Standard is centered.
   * Default value: standard
   */
  position?: "top" | "right" | "bottom" | "left" | "standard";
  /**
   * An object definition of the input field for the prompting question.
   */
  prompt?: QDialogInputPrompt;
  /**
   * An object definition for creating the selection form content
   */
  options?: QDialogSelectionPrompt;
  /**
   * Display a Quasar spinner (if value is true, then the defaults are used); Useful for conveying the idea that something is happening behind the covers; Tip: use along with persistent, ok: false and update() method
   */
  progress?:
    | boolean
    | {
        /**
         * One of the QSpinners
         */
        spinner?: Component;
        /**
         * Color name for component from the Quasar Color Palette
         */
        color?: NamedColor;
      };
  /**
   * Props for an 'OK' button
   */
  ok?:
    | string
    | {
        /**
         * See QBtn for available props
         */
        [props: string]: any | undefined;
      }
    | boolean;
  /**
   * Props for a 'CANCEL' button
   */
  cancel?:
    | string
    | {
        /**
         * See QBtn for available props
         */
        [props: string]: any | undefined;
      }
    | boolean;
  /**
   * What button to focus, unless you also have 'prompt' or 'options'
   * Default value: ok
   */
  focus?: "ok" | "cancel" | "none";
  /**
   * Makes buttons be stacked instead of vertically aligned
   */
  stackButtons?: boolean;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor;
  /**
   * Apply dark mode
   */
  dark?: boolean;
  /**
   * User cannot dismiss Dialog if clicking outside of it or hitting ESC key; Also, an app route change won't dismiss it
   */
  persistent?: boolean;
  /**
   * User cannot dismiss Dialog by hitting ESC key; No need to set it if 'persistent' prop is also set
   */
  noEscDismiss?: boolean;
  /**
   * User cannot dismiss Dialog by clicking outside of it; No need to set it if 'persistent' prop is also set
   */
  noBackdropDismiss?: boolean;
  /**
   * Changing route app won't dismiss Dialog; No need to set it if 'persistent' prop is also set
   */
  noRouteDismiss?: boolean;
  /**
   * Put Dialog into seamless mode; Does not use a backdrop so user is able to interact with the rest of the page too
   */
  seamless?: boolean;
  /**
   * Put Dialog into maximized mode
   */
  maximized?: boolean;
  /**
   * Dialog will try to render with same width as the window
   */
  fullWidth?: boolean;
  /**
   * Dialog will try to render with same height as the window
   */
  fullHeight?: boolean;
  /**
   * One of Quasar's embedded transitions
   * Default value: scale
   */
  transitionShow?: string;
  /**
   * One of Quasar's embedded transitions
   * Default value: scale
   */
  transitionHide?: string;
  /**
   * Use custom dialog component; use along with 'componentProps' prop where possible
   */
  component?: Component | string;
  /**
   * User defined props which will be forwarded to underlying custom component if 'component' prop is used
   */
  componentProps?: any;
}

export interface QLoadingShowOptions {
  /**
   * Wait a number of millisecond before showing; Not worth showing for 100ms for example then hiding it, so wait until you're sure it's a process that will take some considerable amount of time
   */
  delay?: number;
  /**
   * Message to display
   */
  message?: string;
  /**
   * Loading group name
   */
  group?: string;
  /**
   * Render the message as HTML; This can lead to XSS attacks so make sure that you sanitize the message first
   */
  html?: boolean;
  /**
   * Content wrapped element custom classes
   */
  boxClass?: string;
  /**
   * Spinner size (in pixels)
   */
  spinnerSize?: number;
  /**
   * Color name for spinner from the Quasar Color Palette
   */
  spinnerColor?: NamedColor;
  /**
   * Color name for text from the Quasar Color Palette
   */
  messageColor?: NamedColor;
  /**
   * Color name for background from the Quasar Color Palette
   */
  backgroundColor?: NamedColor;
  /**
   * One of the QSpinners
   */
  spinner?: Component;
  /**
   * Add a CSS class to easily customize the component
   */
  customClass?: string;
  /**
   * Ignore the default configuration (set by setDefaults()) for this instance only
   */
  ignoreDefaults?: boolean;
}

import { QLoadingUpdateOptions } from "./api";
import { QLoadingBarOptions } from "./api";
import { WebStorageGetItemMethodType } from "./api";
import { WebStorageGetIndexMethodType } from "./api";
import { WebStorageGetKeyMethodType } from "./api";
import { WebStorageGetAllKeysMethodType } from "./api";
import { QNotifyAction } from "./api";
export interface QNotifyCreateOptions {
  /**
   * Optional type (that has been previously registered) or one of the out of the box ones ('positive', 'negative', 'warning', 'info', 'ongoing')
   */
  type?: string;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor;
  /**
   * The content of your message
   */
  message?: string;
  /**
   * The content of your optional caption
   */
  caption?: string;
  /**
   * Render the message as HTML; This can lead to XSS attacks, so make sure that you sanitize the message first
   */
  html?: boolean;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string;
  /**
   * Color name for component from the Quasar Color Palette
   */
  iconColor?: NamedColor;
  /**
   * Size in CSS units, including unit name
   */
  iconSize?: string;
  /**
   * URL to an avatar/image; Suggestion: use public folder
   */
  avatar?: string;
  /**
   * Useful for notifications that are updated; Displays a Quasar spinner instead of an avatar or icon; If value is Boolean 'true' then the default QSpinner is shown
   */
  spinner?: boolean | Component;
  /**
   * Color name for component from the Quasar Color Palette
   */
  spinnerColor?: NamedColor;
  /**
   * Size in CSS units, including unit name
   */
  spinnerSize?: string;
  /**
   * Window side/corner to stick to
   * Default value: bottom
   */
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "center";
  /**
   * Override the auto generated group with custom one; Grouped notifications cannot be updated; String or number value inform this is part of a specific group, regardless of its options; When a new notification is triggered with same group name, it replaces the old one and shows a badge with how many times the notification was triggered
   * Default value: (message + caption + multiline + actions labels + position)
   */
  group?: boolean | string | number;
  /**
   * Color name for the badge from the Quasar Color Palette
   */
  badgeColor?: NamedColor;
  /**
   * Color name for the badge text from the Quasar Color Palette
   */
  badgeTextColor?: NamedColor;
  /**
   * Notification corner to stick badge to; If notification is on the left side then default is top-right otherwise it is top-left
   * Default value: (top-left/top-right)
   */
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   * Style definitions to be attributed to the badge
   */
  badgeStyle?: VueStyleProp;
  /**
   * Class definitions to be attributed to the badge
   */
  badgeClass?: VueClassProp;
  /**
   * Show progress bar to detail when notification will disappear automatically (unless timeout is 0)
   */
  progress?: boolean;
  /**
   * Class definitions to be attributed to the progress bar
   */
  progressClass?: VueClassProp;
  /**
   * Add CSS class(es) to the notification for easier customization
   */
  classes?: string;
  /**
   * Key-value for attributes to be set on the notification
   */
  attrs?: any;
  /**
   * Amount of time to display (in milliseconds)
   * Default value: 5000
   */
  timeout?: number;
  /**
   * Notification actions (buttons); Unless 'noDismiss' is true, clicking/tapping on the button will close the notification; Also check 'closeBtn' convenience prop
   */
  actions?: QNotifyAction[];
  /**
   * Function to call when notification gets dismissed
   */
  onDismiss?: () => void;
  /**
   * Convenient way to add a dismiss button with a specific label, without using the 'actions' prop; If set to true, it uses a label according to the current Quasar language
   */
  closeBtn?: boolean | string;
  /**
   * Put notification into multi-line mode; If this prop isn't used and more than one 'action' is specified then notification goes into multi-line mode by default
   */
  multiLine?: boolean;
  /**
   * Ignore the default configuration (set by setDefaults()) for this instance only
   */
  ignoreDefaults?: boolean;
}

import { QNotifyUpdateOptions } from "./api";
import { QNotifyOptions } from "./api";
export interface QEditorCommand {
  /**
   * Label of the button
   */
  label?: string;
  /**
   * Text to be displayed as a tooltip on hover
   */
  tip?: string;
  /**
   * HTML formatted text to be displayed within a tooltip on hover
   */
  htmlTip?: string;
  /**
   * Icon of the button
   */
  icon?: string;
  /**
   * Keycode of a key to be used together with the <ctrl> key for use as a shortcut to trigger this element
   */
  key?: number;
  /**
   * Either this or "cmd" is required. Function for when button gets clicked/tapped.
   */
  handler?: () => void;
  /**
   * Either this or "handler" is required. This must be a valid execCommand method according to the designMode API.
   */
  cmd?: string;
  /**
   * Only set a param if using a "cmd". This is commonly text or HTML to inject, but is highly dependent upon the specific cmd being called.
   */
  param?: string;
  /**
   * Is button disabled?
   * @returns If true, the button will be disabled
   */
  disable?: boolean | (() => boolean);
  /**
   * Pass the value "no-state" if the button should not have an "active" state
   */
  type?: "no-state";
  /**
   * Lock the button label, so it doesn't change based on the child option selected.
   */
  fixedLabel?: boolean;
  /**
   * Lock the button icon, so it doesn't change based on the child option selected.
   */
  fixedIcon?: boolean;
  /**
   * Highlight the toolbar button, when a child option has been selected.
   */
  highlight?: boolean;
}

import { VueStyleObjectProp } from "./api";
import { QEditorCaret } from "./api";
import { ValidationRule } from "./api";
import { QRejectedEntry } from "./api";
import { QFileNativeElement } from "./api";
import { QFormChildComponent } from "./api";
import { QInputNativeElement } from "./api";
import { QPopupProxyInnerComponent } from "./api";
import { SliderMarkerLabels } from "./api";
import { SliderMarkerLabelConfig } from "./api";
import { SliderMarkerLabelArrayConfig } from "./api";
import { SliderMarkerLabelObjectConfig } from "./api";
import { QTreeNode } from "./api";
import { QUploaderFactoryFn } from "./api";
import { QVueGlobals, QSingletonGlobals } from "./globals";
declare module "./globals" {
  export interface QVueGlobals {
    addressbarColor: AddressbarColor;
    fullscreen: AppFullscreen;
    /**
     * Does the app have user focus? Or the app runs in the background / another tab has the user's attention
     */
    appVisible: boolean;
    /**
     * Creates an ad-hoc Bottom Sheet; Same as calling $q.bottomSheet(...)
     * @param opts Bottom Sheet options
     * @returns Chainable Object
     */
    bottomSheet: (opts: {
      /**
       * CSS Class name to apply to the Dialog's QCard
       */
      class?: VueClassProp;
      /**
       * CSS style to apply to the Dialog's QCard
       */
      style?: VueStyleProp;
      /**
       * Title
       */
      title?: string;
      /**
       * Message
       */
      message?: string;
      /**
       * Array of Objects, each Object defining an action
       */
      actions?: {
        /**
         * CSS classes for this action
         */
        classes?: VueClassProp;
        /**
         * Style definitions to be attributed to this action element
         */
        style?: VueStyleProp;
        /**
         * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
         */
        icon?: string;
        /**
         * Path to an image for this action
         */
        img?: string;
        /**
         * Path to an avatar image for this action
         */
        avatar?: string;
        /**
         * Action label
         */
        label?: string | number;
        /**
         * Any other custom props
         */
        [key: string]: any | undefined;
      }[];
      /**
       * Display actions as a grid instead of as a list
       */
      grid?: boolean;
      /**
       * Apply dark mode
       */
      dark?: boolean;
      /**
       * Put Bottom Sheet into seamless mode; Does not use a backdrop so user is able to interact with the rest of the page too
       */
      seamless?: boolean;
      /**
       * User cannot dismiss Bottom Sheet if clicking outside of it or hitting ESC key
       */
      persistent?: boolean;
    }) => DialogChainObject;
    cookies: Cookies;
    dark: Dark;
    /**
     * Creates an ad-hoc Dialog; Same as calling $q.dialog(...)
     * @param opts Dialog options
     * @returns Chainable Object
     */
    dialog: (opts: QDialogOptions) => DialogChainObject;
    loading: Loading;
    loadingBar: LoadingBar;
    localStorage: LocalStorage;
    /**
     * Creates a notification; Same as calling $q.notify(...)
     * @param opts Notification options
     * @returns Calling this function with no parameters hides the notification; When called with one Object parameter (the original notification must NOT be grouped), it updates the notification (specified properties are shallow merged with previous ones; note that group and position cannot be changed while updating and so they are ignored)
     */
    notify: (
      opts: QNotifyCreateOptions | string
    ) => (props?: QNotifyUpdateOptions) => void;
    platform: Platform;
    screen: Screen;
    sessionStorage: SessionStorage;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $q: QVueGlobals;

    // Directives

    /**
     * If value is 0 or 'false' then directive is disabled; if value is < 0 then it closes all popups in the chain; if value is 1 or 'true' or undefined then it closes only the parent popup; if value is > 1 it closes the specified number of parent popups in the chain (note that chained QMenus are considered 1 popup only & QPopupProxy separates chained menus)
     *
     * @see https://v2.quasar.dev/vue-directives/close-popup
     */
    vClosePopup: ClosePopup;

    /**
     * Function to call when scrolling occurs (identical to description of 'handler' prop of the Object form); If using the Object form, it is HIGHLY recommended to reference it from your vue component scope, otherwise the directive update cycle will continuously recreate the observer which hits performance hard
     *
     * Modifiers:
     *  - once:
     *    - type: boolean
     *    - description: Call handler only once, when the conditions are first met
     *    - examples:
     *      - v-intersection.once
     *
     * @see https://v2.quasar.dev/vue-directives/intersection
     */
    vIntersection: Intersection;

    /**
     * Configuration object or trigger value
     *
     * Directive argument:
     *  - type: string
     *  - description: x:x2:y:z, where x is the morph element name, x2 is the morph group, y is the animation duration (in milliseconds) and z is the amount of time to wait (in milliseconds) or the 'transitionend' string
     *  - examples:
     *    - v-morph:name="options"
     *    - v-morph:name:groupName="options"
     *    - v-morph:name:groupName:400="options"
     *    - v-morph:name:groupName:400:100="options"
     *    - v-morph:name:groupName:400:transitionend="options"
     *
     * Modifiers:
     *  - resize:
     *    - type: boolean
     *    - description: Use resize instead of scale transform for morph (forceResize option of the morph function)
     *  - useCSS:
     *    - type: boolean
     *    - description: Use CSS animations for morph (forceCssAnimation option of the morph function)
     *  - hideFromClone:
     *    - type: boolean
     *    - description: Hide the spacer for the initial element (hideFromClone option of the morph function)
     *  - keepToClone:
     *    - type: boolean
     *    - description: Keep the final element visible while morphing (keepToClone option of the morph function)
     *  - tween:
     *    - type: boolean
     *    - description: Use opacity tween morphing between initial and final elements (tween option of the morph function)
     *
     * @see https://v2.quasar.dev/vue-directives/morph
     */
    vMorph: Morph;

    /**
     * Function to call when mutation occurs; It is HIGHLY recommended to reference it from your vue component scope, otherwise the directive update cycle will continuously recreate the observer which hits performance hard
     *
     * Modifiers:
     *  - once:
     *    - type: boolean
     *    - description: Call handler only once, when the first mutation was triggered, then stop monitoring
     *    - examples:
     *      - v-mutation.once
     *  - childList:
     *    - type: boolean
     *    - description: Monitor the target node (and, if 'subtree' is also set, its descendants) for the addition of new child nodes or removal of existing child nodes
     *    - examples:
     *      - v-mutation.childList
     *  - subtree:
     *    - type: boolean
     *    - description: Extend monitoring to the entire subtree of nodes rooted at target
     *    - examples:
     *      - v-mutation.subtree
     *  - attributes:
     *    - type: boolean
     *    - description: Watch for changes to the value of attributes on the node or nodes being monitored
     *    - examples:
     *      - v-mutation.attributes
     *  - characterData:
     *    - type: boolean
     *    - description: Monitor the specified target node or subtree for changes to the character data contained within the node or nodes
     *    - examples:
     *      - v-mutation.characterData
     *  - attributeOldValue:
     *    - type: boolean
     *    - description: Record the previous value of any attribute that changes when monitoring the node or nodes for attribute changes
     *    - examples:
     *      - v-mutation.attributeOldValue
     *  - characterDataOldValue:
     *    - type: boolean
     *    - description: Record the previous value of a node's text whenever the text changes on nodes being monitored
     *    - examples:
     *      - v-mutation.characterDataOldValue
     *
     * @see https://v2.quasar.dev/vue-directives/mutation
     */
    vMutation: Mutation;

    /**
     * Boolean (if just wanting to enable/disable) or Object for configuring more options
     *
     * Directive argument:
     *  - type: string
     *  - description: Color name from Quasar Color Palette; Overrides default dynamic color
     *  - examples:
     *    - v-ripple:orange-5
     *
     * Modifiers:
     *  - early:
     *    - type: boolean
     *    - description: Trigger early/immediately on user interaction
     *  - stop:
     *    - type: boolean
     *    - description: Stop click/touch event propagation
     *    - examples:
     *      - v-ripple.stop
     *  - center:
     *    - type: boolean
     *    - description: Ripple starts from the absolute center
     *    - examples:
     *      - v-ripple.center
     *
     * @see https://v2.quasar.dev/vue-directives/material-ripple
     */
    vRipple: Ripple;

    /**
     * Function to call when scrolling occurs (use undefined to disable)
     *
     * @see https://v2.quasar.dev/vue-directives/scroll
     */
    vScroll: Scroll;

    /**
     * Function to call when scrolling and element comes into the viewport (use undefined to disable)
     *
     * @see https://v2.quasar.dev/vue-directives/scroll-fire
     */
    vScrollFire: ScrollFire;

    /**
     * Function to call after user has hold touch/click for the specified amount of time (use undefined to disable)
     *
     * Directive argument:
     *  - type: string
     *  - default: 600:5:7
     *  - description: x:y:z, where x is the amount of time to wait (in milliseconds), y is the touch event sensitivity (in pixels) and z is the mouse event sensitivity (in pixels)
     *  - examples:
     *    - v-touch-hold:400="fnToCall"
     *    - v-touch-hold:400:15="fnToCall"
     *    - v-touch-hold:400:10:10="fnToCall"
     *
     * Modifiers:
     *  - capture:
     *    - type: boolean
     *    - description: Use capture for touchstart event
     *  - mouse:
     *    - type: boolean
     *    - description: Listen for mouse events too
     *  - mouseCapture:
     *    - type: boolean
     *    - description: Use capture for mousedown event
     *
     * @see https://v2.quasar.dev/vue-directives/touch-hold
     */
    vTouchHold: TouchHold;

    /**
     * Handler for panning (use undefined to disable)
     *
     * Modifiers:
     *  - stop:
     *    - type: boolean
     *    - description: Stop event propagation for touch events
     *  - prevent:
     *    - type: boolean
     *    - description: Calls event.preventDefault() for touch events
     *  - capture:
     *    - type: boolean
     *    - description: Use capture for touchstart event
     *  - mouse:
     *    - type: boolean
     *    - description: Listen for mouse events too
     *  - mouseCapture:
     *    - type: boolean
     *    - description: Use capture for mousedown event
     *  - mouseAllDir:
     *    - type: boolean
     *    - description: Ignore initial mouse move direction (do not abort if the first mouse move is in an unaccepted direction)
     *  - preserveCursor:
     *    - type: boolean
     *    - description: Prevent the mouse cursor from automatically displaying as grabbing when panning
     *  - horizontal:
     *    - type: boolean
     *    - description: Catch horizontal (left/right) movement
     *  - vertical:
     *    - type: boolean
     *    - description: Catch vertical (up/down) movement
     *  - up:
     *    - type: boolean
     *    - description: Catch panning to up
     *  - right:
     *    - type: boolean
     *    - description: Catch panning to right
     *  - down:
     *    - type: boolean
     *    - description: Catch panning to down
     *  - left:
     *    - type: boolean
     *    - description: Catch panning to left
     *
     * @see https://v2.quasar.dev/vue-directives/touch-pan
     */
    vTouchPan: TouchPan;

    /**
     * Handler for touch-repeat (use undefined to disable)
     *
     * Directive argument:
     *  - type: string
     *  - default: 0:600:300
     *  - description: String of numbers (at least one number) separated by ':' which defines the amount of time to wait for 1st handler call, 2nd, 3rd and so on; All subsequent calls will use last value as time to wait until triggering
     *  - examples:
     *    - v-touch-repeat:0:400="fnToCall"
     *
     * Modifiers:
     *  - capture:
     *    - type: boolean
     *    - description: Use capture for touchstart event
     *  - mouse:
     *    - type: boolean
     *    - description: Listen for mouse events too
     *  - mouseCapture:
     *    - type: boolean
     *    - description: Use capture for mousedown event
     *  - keyCapture:
     *    - type: boolean
     *    - description: Use capture for keydown event
     *  - esc:
     *    - type: boolean
     *    - description: Catch ESC key
     *  - tab:
     *    - type: boolean
     *    - description: Catch TAB key
     *  - enter:
     *    - type: boolean
     *    - description: Catch ENTER key
     *  - space:
     *    - type: boolean
     *    - description: Catch SPACE key
     *  - up:
     *    - type: boolean
     *    - description: Catch UP arrow key
     *  - left:
     *    - type: boolean
     *    - description: Catch LEFT arrow key
     *  - right:
     *    - type: boolean
     *    - description: Catch RIGHT arrow key
     *  - down:
     *    - type: boolean
     *    - description: Catch DOWN key
     *  - delete:
     *    - type: boolean
     *    - description: Catch DELETE key
     *  - [keycode]:
     *    - type: number
     *    - description: Key code to catch
     *    - examples:
     *      - v-touch-repeat.68="fnToCall"
     *
     * @see https://v2.quasar.dev/vue-directives/touch-repeat
     */
    vTouchRepeat: TouchRepeat;

    /**
     * Handler for swipe (use undefined to disable)
     *
     * Directive argument:
     *  - type: string
     *  - default: 6e-2:6:50
     *  - description: x:y:z, where x is minimum velocity (dist/time; please use float without a dot, example: 6e-2 which is equivalent to 6 * 10^-2 = 0.06), y is minimum distance on first move on mobile, z is minimum distance on desktop until deciding if it's a swipe indeed
     *  - examples:
     *    - v-touch-swipe:7e-2:10:100="fnToCall"
     *
     * Modifiers:
     *  - capture:
     *    - type: boolean
     *    - description: Use capture for touchstart event
     *  - mouse:
     *    - type: boolean
     *    - description: Listen for mouse events too
     *  - mouseCapture:
     *    - type: boolean
     *    - description: Use capture for mousedown event
     *  - horizontal:
     *    - type: boolean
     *    - description: Catch horizontal (left/right) movement
     *  - vertical:
     *    - type: boolean
     *    - description: Catch vertical (up/down) movement
     *  - up:
     *    - type: boolean
     *    - description: Catch swipe to up
     *  - right:
     *    - type: boolean
     *    - description: Catch swipe to right
     *  - down:
     *    - type: boolean
     *    - description: Catch swipe to down
     *  - left:
     *    - type: boolean
     *    - description: Catch swipe to left
     *
     * @see https://v2.quasar.dev/vue-directives/touch-swipe
     */
    vTouchSwipe: TouchSwipe;
  }
}

declare module "@vue/runtime-core" {
  interface GlobalComponents {
    QAjaxBar: GlobalComponentConstructor<QAjaxBarProps, QAjaxBarSlots>;
    QAvatar: GlobalComponentConstructor<QAvatarProps, QAvatarSlots>;
    QBadge: GlobalComponentConstructor<QBadgeProps, QBadgeSlots>;
    QBanner: GlobalComponentConstructor<QBannerProps, QBannerSlots>;
    QBar: GlobalComponentConstructor<QBarProps, QBarSlots>;
    QBreadcrumbs: GlobalComponentConstructor<
      QBreadcrumbsProps,
      QBreadcrumbsSlots
    >;
    QBreadcrumbsEl: GlobalComponentConstructor<
      QBreadcrumbsElProps,
      QBreadcrumbsElSlots
    >;
    QBtn: GlobalComponentConstructor<QBtnProps, QBtnSlots>;
    QBtnDropdown: GlobalComponentConstructor<
      QBtnDropdownProps,
      QBtnDropdownSlots
    >;
    QBtnGroup: GlobalComponentConstructor<QBtnGroupProps, QBtnGroupSlots>;
    QBtnToggle: GlobalComponentConstructor<QBtnToggleProps, QBtnToggleSlots>;
    QCard: GlobalComponentConstructor<QCardProps, QCardSlots>;
    QCardActions: GlobalComponentConstructor<
      QCardActionsProps,
      QCardActionsSlots
    >;
    QCardSection: GlobalComponentConstructor<
      QCardSectionProps,
      QCardSectionSlots
    >;
    QCarousel: GlobalComponentConstructor<QCarouselProps, QCarouselSlots>;
    QCarouselControl: GlobalComponentConstructor<
      QCarouselControlProps,
      QCarouselControlSlots
    >;
    QCarouselSlide: GlobalComponentConstructor<
      QCarouselSlideProps,
      QCarouselSlideSlots
    >;
    QChatMessage: GlobalComponentConstructor<
      QChatMessageProps,
      QChatMessageSlots
    >;
    QCheckbox: GlobalComponentConstructor<QCheckboxProps, QCheckboxSlots>;
    QChip: GlobalComponentConstructor<QChipProps, QChipSlots>;
    QCircularProgress: GlobalComponentConstructor<
      QCircularProgressProps,
      QCircularProgressSlots
    >;
    QColor: GlobalComponentConstructor<QColorProps, QColorSlots>;
    QDate: GlobalComponentConstructor<QDateProps, QDateSlots>;
    QDialog: GlobalComponentConstructor<QDialogProps, QDialogSlots>;
    QDrawer: GlobalComponentConstructor<QDrawerProps, QDrawerSlots>;
    QEditor: GlobalComponentConstructor<QEditorProps, QEditorSlots>;
    QExpansionItem: GlobalComponentConstructor<
      QExpansionItemProps,
      QExpansionItemSlots
    >;
    QFab: GlobalComponentConstructor<QFabProps, QFabSlots>;
    QFabAction: GlobalComponentConstructor<QFabActionProps, QFabActionSlots>;
    QField: GlobalComponentConstructor<QFieldProps, QFieldSlots>;
    QFile: GlobalComponentConstructor<QFileProps, QFileSlots>;
    QFooter: GlobalComponentConstructor<QFooterProps, QFooterSlots>;
    QForm: GlobalComponentConstructor<QFormProps, QFormSlots>;
    QFormChildMixin: GlobalComponentConstructor<
      QFormChildMixinProps,
      QFormChildMixinSlots
    >;
    QHeader: GlobalComponentConstructor<QHeaderProps, QHeaderSlots>;
    QIcon: GlobalComponentConstructor<QIconProps, QIconSlots>;
    QImg: GlobalComponentConstructor<QImgProps, QImgSlots>;
    QInfiniteScroll: GlobalComponentConstructor<
      QInfiniteScrollProps,
      QInfiniteScrollSlots
    >;
    QInnerLoading: GlobalComponentConstructor<
      QInnerLoadingProps,
      QInnerLoadingSlots
    >;
    QInput: GlobalComponentConstructor<QInputProps, QInputSlots>;
    QIntersection: GlobalComponentConstructor<
      QIntersectionProps,
      QIntersectionSlots
    >;
    QItem: GlobalComponentConstructor<QItemProps, QItemSlots>;
    QItemLabel: GlobalComponentConstructor<QItemLabelProps, QItemLabelSlots>;
    QItemSection: GlobalComponentConstructor<
      QItemSectionProps,
      QItemSectionSlots
    >;
    QList: GlobalComponentConstructor<QListProps, QListSlots>;
    QKnob: GlobalComponentConstructor<QKnobProps, QKnobSlots>;
    QLayout: GlobalComponentConstructor<QLayoutProps, QLayoutSlots>;
    QLinearProgress: GlobalComponentConstructor<
      QLinearProgressProps,
      QLinearProgressSlots
    >;
    QMarkupTable: GlobalComponentConstructor<
      QMarkupTableProps,
      QMarkupTableSlots
    >;
    QMenu: GlobalComponentConstructor<QMenuProps, QMenuSlots>;
    QNoSsr: GlobalComponentConstructor<QNoSsrProps, QNoSsrSlots>;
    QOptionGroup: GlobalComponentConstructor<
      QOptionGroupProps,
      QOptionGroupSlots
    >;
    QPage: GlobalComponentConstructor<QPageProps, QPageSlots>;
    QPageContainer: GlobalComponentConstructor<
      QPageContainerProps,
      QPageContainerSlots
    >;
    QPageScroller: GlobalComponentConstructor<
      QPageScrollerProps,
      QPageScrollerSlots
    >;
    QPageSticky: GlobalComponentConstructor<QPageStickyProps, QPageStickySlots>;
    QPagination: GlobalComponentConstructor<QPaginationProps, QPaginationSlots>;
    QParallax: GlobalComponentConstructor<QParallaxProps, QParallaxSlots>;
    QPopupEdit: GlobalComponentConstructor<QPopupEditProps, QPopupEditSlots>;
    QPopupProxy: GlobalComponentConstructor<QPopupProxyProps, QPopupProxySlots>;
    QPullToRefresh: GlobalComponentConstructor<
      QPullToRefreshProps,
      QPullToRefreshSlots
    >;
    QRadio: GlobalComponentConstructor<QRadioProps, QRadioSlots>;
    QRange: GlobalComponentConstructor<QRangeProps, QRangeSlots>;
    QRating: GlobalComponentConstructor<QRatingProps, QRatingSlots>;
    QResizeObserver: GlobalComponentConstructor<
      QResizeObserverProps,
      QResizeObserverSlots
    >;
    QResponsive: GlobalComponentConstructor<QResponsiveProps, QResponsiveSlots>;
    QScrollArea: GlobalComponentConstructor<QScrollAreaProps, QScrollAreaSlots>;
    QScrollObserver: GlobalComponentConstructor<
      QScrollObserverProps,
      QScrollObserverSlots
    >;
    QSelect: GlobalComponentConstructor<QSelectProps, QSelectSlots>;
    QSeparator: GlobalComponentConstructor<QSeparatorProps, QSeparatorSlots>;
    QSkeleton: GlobalComponentConstructor<QSkeletonProps, QSkeletonSlots>;
    QSlideItem: GlobalComponentConstructor<QSlideItemProps, QSlideItemSlots>;
    QSlideTransition: GlobalComponentConstructor<
      QSlideTransitionProps,
      QSlideTransitionSlots
    >;
    QSlider: GlobalComponentConstructor<QSliderProps, QSliderSlots>;
    QSpace: GlobalComponentConstructor<QSpaceProps, QSpaceSlots>;
    QSpinner: GlobalComponentConstructor<QSpinnerProps, QSpinnerSlots>;
    QSpinnerAudio: GlobalComponentConstructor<
      QSpinnerAudioProps,
      QSpinnerAudioSlots
    >;
    QSpinnerBall: GlobalComponentConstructor<
      QSpinnerBallProps,
      QSpinnerBallSlots
    >;
    QSpinnerBars: GlobalComponentConstructor<
      QSpinnerBarsProps,
      QSpinnerBarsSlots
    >;
    QSpinnerBox: GlobalComponentConstructor<QSpinnerBoxProps, QSpinnerBoxSlots>;
    QSpinnerClock: GlobalComponentConstructor<
      QSpinnerClockProps,
      QSpinnerClockSlots
    >;
    QSpinnerComment: GlobalComponentConstructor<
      QSpinnerCommentProps,
      QSpinnerCommentSlots
    >;
    QSpinnerCube: GlobalComponentConstructor<
      QSpinnerCubeProps,
      QSpinnerCubeSlots
    >;
    QSpinnerDots: GlobalComponentConstructor<
      QSpinnerDotsProps,
      QSpinnerDotsSlots
    >;
    QSpinnerFacebook: GlobalComponentConstructor<
      QSpinnerFacebookProps,
      QSpinnerFacebookSlots
    >;
    QSpinnerGears: GlobalComponentConstructor<
      QSpinnerGearsProps,
      QSpinnerGearsSlots
    >;
    QSpinnerGrid: GlobalComponentConstructor<
      QSpinnerGridProps,
      QSpinnerGridSlots
    >;
    QSpinnerHearts: GlobalComponentConstructor<
      QSpinnerHeartsProps,
      QSpinnerHeartsSlots
    >;
    QSpinnerHourglass: GlobalComponentConstructor<
      QSpinnerHourglassProps,
      QSpinnerHourglassSlots
    >;
    QSpinnerInfinity: GlobalComponentConstructor<
      QSpinnerInfinityProps,
      QSpinnerInfinitySlots
    >;
    QSpinnerIos: GlobalComponentConstructor<QSpinnerIosProps, QSpinnerIosSlots>;
    QSpinnerOrbit: GlobalComponentConstructor<
      QSpinnerOrbitProps,
      QSpinnerOrbitSlots
    >;
    QSpinnerOval: GlobalComponentConstructor<
      QSpinnerOvalProps,
      QSpinnerOvalSlots
    >;
    QSpinnerPie: GlobalComponentConstructor<QSpinnerPieProps, QSpinnerPieSlots>;
    QSpinnerPuff: GlobalComponentConstructor<
      QSpinnerPuffProps,
      QSpinnerPuffSlots
    >;
    QSpinnerRadio: GlobalComponentConstructor<
      QSpinnerRadioProps,
      QSpinnerRadioSlots
    >;
    QSpinnerRings: GlobalComponentConstructor<
      QSpinnerRingsProps,
      QSpinnerRingsSlots
    >;
    QSpinnerTail: GlobalComponentConstructor<
      QSpinnerTailProps,
      QSpinnerTailSlots
    >;
    QSplitter: GlobalComponentConstructor<QSplitterProps, QSplitterSlots>;
    QStep: GlobalComponentConstructor<QStepProps, QStepSlots>;
    QStepper: GlobalComponentConstructor<QStepperProps, QStepperSlots>;
    QStepperNavigation: GlobalComponentConstructor<
      QStepperNavigationProps,
      QStepperNavigationSlots
    >;
    QTabPanel: GlobalComponentConstructor<QTabPanelProps, QTabPanelSlots>;
    QTabPanels: GlobalComponentConstructor<QTabPanelsProps, QTabPanelsSlots>;
    QTable: GlobalComponentConstructor<QTableProps, QTableSlots>;
    QTd: GlobalComponentConstructor<QTdProps, QTdSlots>;
    QTh: GlobalComponentConstructor<QThProps, QThSlots>;
    QTr: GlobalComponentConstructor<QTrProps, QTrSlots>;
    QRouteTab: GlobalComponentConstructor<QRouteTabProps, QRouteTabSlots>;
    QTab: GlobalComponentConstructor<QTabProps, QTabSlots>;
    QTabs: GlobalComponentConstructor<QTabsProps, QTabsSlots>;
    QTime: GlobalComponentConstructor<QTimeProps, QTimeSlots>;
    QTimeline: GlobalComponentConstructor<QTimelineProps, QTimelineSlots>;
    QTimelineEntry: GlobalComponentConstructor<
      QTimelineEntryProps,
      QTimelineEntrySlots
    >;
    QToggle: GlobalComponentConstructor<QToggleProps, QToggleSlots>;
    QToolbar: GlobalComponentConstructor<QToolbarProps, QToolbarSlots>;
    QToolbarTitle: GlobalComponentConstructor<
      QToolbarTitleProps,
      QToolbarTitleSlots
    >;
    QTooltip: GlobalComponentConstructor<QTooltipProps, QTooltipSlots>;
    QTree: GlobalComponentConstructor<QTreeProps, QTreeSlots>;
    QUploader: GlobalComponentConstructor<QUploaderProps, QUploaderSlots>;
    QUploaderAddTrigger: GlobalComponentConstructor<
      QUploaderAddTriggerProps,
      QUploaderAddTriggerSlots
    >;
    QVideo: GlobalComponentConstructor<QVideoProps, QVideoSlots>;
    QVirtualScroll: GlobalComponentConstructor<
      QVirtualScrollProps,
      QVirtualScrollSlots
    >;
  }
}

declare module "./config.d.ts" {
  interface QuasarUIConfiguration {
    brand?: {
      /**
       * Main color of your app
       */
      primary?: string;
      /**
       * Secondary color of your app
       */
      secondary?: string;
      /**
       * Accent color of your app
       */
      accent?: string;
      /**
       * Dark color of your app
       */
      dark?: string;
      /**
       * Positive color of your app
       */
      positive?: string;
      /**
       * Negative color of your app
       */
      negative?: string;
      /**
       * Info color of your app
       */
      info?: string;
      /**
       * Warning color of your app
       */
      warning?: string;
      /**
       * Custom colors of your app, if any
       */
      [customColors: string]: string | undefined;
    };
    lang?: {
      /**
       * Whether to disable `dir` and `lang` HTML attributes getting added to the `<html>` tag. `dir` attribute is crucial when using RTL support. Disable this only if you need to handle these yourself for some reason.
       */
      noHtmlAttrs?: boolean;
    };
    /**
     * "'auto'" uses the OS/browser preference. "true" forces dark mode. "false" forces light mode.
     */
    dark?: boolean | "auto";
    loading?: {
      /**
       * Wait a number of millisecond before showing; Not worth showing for 100ms for example then hiding it, so wait until you're sure it's a process that will take some considerable amount of time
       */
      delay?: number;
      /**
       * Message to display
       */
      message?: string;
      /**
       * Default Loading group name
       * Default value: __default_quasar_group__
       */
      group?: string;
      /**
       * Force render the message as HTML; This can lead to XSS attacks so make sure that you sanitize the content
       */
      html?: boolean;
      /**
       * Content wrapped element custom classes
       */
      boxClass?: string;
      /**
       * Spinner size (in pixels)
       */
      spinnerSize?: number;
      /**
       * Color name for spinner from the Quasar Color Palette
       */
      spinnerColor?: NamedColor;
      /**
       * Color name for text from the Quasar Color Palette
       */
      messageColor?: NamedColor;
      /**
       * Color name for background from the Quasar Color Palette
       */
      backgroundColor?: NamedColor;
      /**
       * One of the QSpinners
       */
      spinner?: Component;
      /**
       * Add a CSS class to the container element to easily customize the component
       */
      customClass?: string;
    };
    /**
     * QAjaxBar component props, EXCEPT for 'hijack-filter' in quasar.config file (if using Quasar CLI)
     */
    loadingBar?: QLoadingBarOptions;
    notify?: {
      /**
       * Optional type (that has been previously registered) or one of the out of the box ones ('positive', 'negative', 'warning', 'info', 'ongoing')
       */
      type?: string;
      /**
       * Color name for component from the Quasar Color Palette
       */
      color?: NamedColor;
      /**
       * Overrides text color (if needed); Color name from the Quasar Color Palette
       */
      textColor?: NamedColor;
      /**
       * The content of your message
       */
      message?: string;
      /**
       * The content of your optional caption
       */
      caption?: string;
      /**
       * Render the message as HTML; This can lead to XSS attacks, so make sure that you sanitize the message first
       */
      html?: boolean;
      /**
       * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
       */
      icon?: string;
      /**
       * Color name for component from the Quasar Color Palette
       */
      iconColor?: NamedColor;
      /**
       * Size in CSS units, including unit name
       */
      iconSize?: string;
      /**
       * URL to an avatar/image; Suggestion: use public folder
       */
      avatar?: string;
      /**
       * Useful for notifications that are updated; Displays a Quasar spinner instead of an avatar or icon; If value is Boolean 'true' then the default QSpinner is shown
       */
      spinner?: boolean | Component;
      /**
       * Color name for component from the Quasar Color Palette
       */
      spinnerColor?: NamedColor;
      /**
       * Size in CSS units, including unit name
       */
      spinnerSize?: string;
      /**
       * Window side/corner to stick to
       * Default value: bottom
       */
      position?:
        | "top-left"
        | "top-right"
        | "bottom-left"
        | "bottom-right"
        | "top"
        | "bottom"
        | "left"
        | "right"
        | "center";
      /**
       * Override the auto generated group with custom one; Grouped notifications cannot be updated; String or number value inform this is part of a specific group, regardless of its options; When a new notification is triggered with same group name, it replaces the old one and shows a badge with how many times the notification was triggered
       * Default value: (message + caption + multiline + actions labels + position)
       */
      group?: boolean | string | number;
      /**
       * Color name for the badge from the Quasar Color Palette
       */
      badgeColor?: NamedColor;
      /**
       * Color name for the badge text from the Quasar Color Palette
       */
      badgeTextColor?: NamedColor;
      /**
       * Notification corner to stick badge to; If notification is on the left side then default is top-right otherwise it is top-left
       * Default value: (top-left/top-right)
       */
      badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
      /**
       * Style definitions to be attributed to the badge
       */
      badgeStyle?: VueStyleProp;
      /**
       * Class definitions to be attributed to the badge
       */
      badgeClass?: VueClassProp;
      /**
       * Show progress bar to detail when notification will disappear automatically (unless timeout is 0)
       */
      progress?: boolean;
      /**
       * Class definitions to be attributed to the progress bar
       */
      progressClass?: VueClassProp;
      /**
       * Add CSS class(es) to the notification for easier customization
       */
      classes?: string;
      /**
       * Key-value for attributes to be set on the notification
       */
      attrs?: any;
      /**
       * Amount of time to display (in milliseconds)
       * Default value: 5000
       */
      timeout?: number;
      /**
       * Notification actions (buttons); Unless 'noDismiss' is true, clicking/tapping on the button will close the notification; Also check 'closeBtn' convenience prop
       */
      actions?: QNotifyAction[];
      /**
       * Function to call when notification gets dismissed
       */
      onDismiss?: () => void;
      /**
       * Convenient way to add a dismiss button with a specific label, without using the 'actions' prop; If set to true, it uses a label according to the current Quasar language
       */
      closeBtn?: boolean | string;
      /**
       * Put notification into multi-line mode; If this prop isn't used and more than one 'action' is specified then notification goes into multi-line mode by default
       */
      multiLine?: boolean;
    };
    screen?: {
      /**
       * Whether to apply CSS classes for the current window breakpoint to the body element
       */
      bodyClasses?: boolean;
    };
    ripple?:
      | boolean
      | {
          /**
           * Trigger early/immediately on user interaction
           */
          early?: boolean;
          /**
           * Stop click/touch event propagation
           */
          stop?: boolean;
          /**
           * Ripple starts from the absolute center
           */
          center?: boolean;
          /**
           * Color name from Quasar Color Palette; Overrides default dynamic color
           */
          color?: string;
          /**
           * List of keyCode that should trigger the ripple
           */
          keyCodes?: readonly any[] | number;
        };
  }
}

import "./lang";
declare module "./lang" {
  export interface QuasarLanguageCodesHolder {
    "ar-TN": true;
    ar: true;
    "az-Latn": true;
    bg: true;
    bn: true;
    ca: true;
    cs: true;
    da: true;
    "de-CH": true;
    "de-DE": true;
    de: true;
    el: true;
    "en-GB": true;
    "en-US": true;
    eo: true;
    es: true;
    et: true;
    eu: true;
    "fa-IR": true;
    fa: true;
    fi: true;
    fr: true;
    gn: true;
    he: true;
    hi: true;
    hr: true;
    hu: true;
    id: true;
    is: true;
    it: true;
    ja: true;
    kk: true;
    km: true;
    "ko-KR": true;
    "kur-CKB": true;
    lt: true;
    lu: true;
    lv: true;
    mk: true;
    ml: true;
    mm: true;
    ms: true;
    my: true;
    "nb-NO": true;
    nl: true;
    pl: true;
    "pt-BR": true;
    pt: true;
    ro: true;
    ru: true;
    sk: true;
    sl: true;
    sm: true;
    "sr-CYR": true;
    sr: true;
    sv: true;
    ta: true;
    th: true;
    tr: true;
    ug: true;
    uk: true;
    "uz-Cyrl": true;
    "uz-Latn": true;
    vi: true;
    "zh-CN": true;
    "zh-TW": true;
  }
}
export as namespace quasar;
export * from "./ts-helpers";
export * from "./utils";
export * from "./composables";
export * from "./feature-flag";
export * from "./globals";
export * from "./extras";
export * from "./lang";
export * from "./api";
export * from "./plugin";
export * from "./config";

export const AddressbarColor: AddressbarColor;
export const AppFullscreen: AppFullscreen;
export const AppVisibility: AppVisibility;
export const BottomSheet: BottomSheet;
export const Cookies: Cookies;
export const Dark: Dark;
export const Dialog: Dialog;
export const Loading: Loading;
export const LoadingBar: LoadingBar;
export const LocalStorage: LocalStorage;
export const Meta: Meta;
export const Notify: Notify;
export const Platform: Platform;
export const Screen: Screen;
export const SessionStorage: SessionStorage;
export const ClosePopup: ClosePopup;
export const Intersection: Intersection;
export const Morph: Morph;
export const Mutation: Mutation;
export const Ripple: Ripple;
export const Scroll: Scroll;
export const ScrollFire: ScrollFire;
export const TouchHold: TouchHold;
export const TouchPan: TouchPan;
export const TouchRepeat: TouchRepeat;
export const TouchSwipe: TouchSwipe;
export const QAjaxBar: ComponentConstructor<QAjaxBar>;
export const QAvatar: ComponentConstructor<QAvatar>;
export const QBadge: ComponentConstructor<QBadge>;
export const QBanner: ComponentConstructor<QBanner>;
export const QBar: ComponentConstructor<QBar>;
export const QBreadcrumbs: ComponentConstructor<QBreadcrumbs>;
export const QBreadcrumbsEl: ComponentConstructor<QBreadcrumbsEl>;
export const QBtn: ComponentConstructor<QBtn>;
export const QBtnDropdown: ComponentConstructor<QBtnDropdown>;
export const QBtnGroup: ComponentConstructor<QBtnGroup>;
export const QBtnToggle: ComponentConstructor<QBtnToggle>;
export const QCard: ComponentConstructor<QCard>;
export const QCardActions: ComponentConstructor<QCardActions>;
export const QCardSection: ComponentConstructor<QCardSection>;
export const QCarousel: ComponentConstructor<QCarousel>;
export const QCarouselControl: ComponentConstructor<QCarouselControl>;
export const QCarouselSlide: ComponentConstructor<QCarouselSlide>;
export const QChatMessage: ComponentConstructor<QChatMessage>;
export const QCheckbox: ComponentConstructor<QCheckbox>;
export const QChip: ComponentConstructor<QChip>;
export const QCircularProgress: ComponentConstructor<QCircularProgress>;
export const QColor: ComponentConstructor<QColor>;
export const QDate: ComponentConstructor<QDate>;
export const QDialog: ComponentConstructor<QDialog>;
export const QDrawer: ComponentConstructor<QDrawer>;
export const QEditor: ComponentConstructor<QEditor>;
export const QExpansionItem: ComponentConstructor<QExpansionItem>;
export const QFab: ComponentConstructor<QFab>;
export const QFabAction: ComponentConstructor<QFabAction>;
export const QField: ComponentConstructor<QField>;
export const QFile: ComponentConstructor<QFile>;
export const QFooter: ComponentConstructor<QFooter>;
export const QForm: ComponentConstructor<QForm>;
export const QFormChildMixin: ComponentConstructor<QFormChildMixin>;
export const QHeader: ComponentConstructor<QHeader>;
export const QIcon: ComponentConstructor<QIcon>;
export const QImg: ComponentConstructor<QImg>;
export const QInfiniteScroll: ComponentConstructor<QInfiniteScroll>;
export const QInnerLoading: ComponentConstructor<QInnerLoading>;
export const QInput: ComponentConstructor<QInput>;
export const QIntersection: ComponentConstructor<QIntersection>;
export const QItem: ComponentConstructor<QItem>;
export const QItemLabel: ComponentConstructor<QItemLabel>;
export const QItemSection: ComponentConstructor<QItemSection>;
export const QList: ComponentConstructor<QList>;
export const QKnob: ComponentConstructor<QKnob>;
export const QLayout: ComponentConstructor<QLayout>;
export const QLinearProgress: ComponentConstructor<QLinearProgress>;
export const QMarkupTable: ComponentConstructor<QMarkupTable>;
export const QMenu: ComponentConstructor<QMenu>;
export const QNoSsr: ComponentConstructor<QNoSsr>;
export const QOptionGroup: ComponentConstructor<QOptionGroup>;
export const QPage: ComponentConstructor<QPage>;
export const QPageContainer: ComponentConstructor<QPageContainer>;
export const QPageScroller: ComponentConstructor<QPageScroller>;
export const QPageSticky: ComponentConstructor<QPageSticky>;
export const QPagination: ComponentConstructor<QPagination>;
export const QParallax: ComponentConstructor<QParallax>;
export const QPopupEdit: ComponentConstructor<QPopupEdit>;
export const QPopupProxy: ComponentConstructor<QPopupProxy>;
export const QPullToRefresh: ComponentConstructor<QPullToRefresh>;
export const QRadio: ComponentConstructor<QRadio>;
export const QRange: ComponentConstructor<QRange>;
export const QRating: ComponentConstructor<QRating>;
export const QResizeObserver: ComponentConstructor<QResizeObserver>;
export const QResponsive: ComponentConstructor<QResponsive>;
export const QScrollArea: ComponentConstructor<QScrollArea>;
export const QScrollObserver: ComponentConstructor<QScrollObserver>;
export const QSelect: ComponentConstructor<QSelect>;
export const QSeparator: ComponentConstructor<QSeparator>;
export const QSkeleton: ComponentConstructor<QSkeleton>;
export const QSlideItem: ComponentConstructor<QSlideItem>;
export const QSlideTransition: ComponentConstructor<QSlideTransition>;
export const QSlider: ComponentConstructor<QSlider>;
export const QSpace: ComponentConstructor<QSpace>;
export const QSpinner: ComponentConstructor<QSpinner>;
export const QSpinnerAudio: ComponentConstructor<QSpinnerAudio>;
export const QSpinnerBall: ComponentConstructor<QSpinnerBall>;
export const QSpinnerBars: ComponentConstructor<QSpinnerBars>;
export const QSpinnerBox: ComponentConstructor<QSpinnerBox>;
export const QSpinnerClock: ComponentConstructor<QSpinnerClock>;
export const QSpinnerComment: ComponentConstructor<QSpinnerComment>;
export const QSpinnerCube: ComponentConstructor<QSpinnerCube>;
export const QSpinnerDots: ComponentConstructor<QSpinnerDots>;
export const QSpinnerFacebook: ComponentConstructor<QSpinnerFacebook>;
export const QSpinnerGears: ComponentConstructor<QSpinnerGears>;
export const QSpinnerGrid: ComponentConstructor<QSpinnerGrid>;
export const QSpinnerHearts: ComponentConstructor<QSpinnerHearts>;
export const QSpinnerHourglass: ComponentConstructor<QSpinnerHourglass>;
export const QSpinnerInfinity: ComponentConstructor<QSpinnerInfinity>;
export const QSpinnerIos: ComponentConstructor<QSpinnerIos>;
export const QSpinnerOrbit: ComponentConstructor<QSpinnerOrbit>;
export const QSpinnerOval: ComponentConstructor<QSpinnerOval>;
export const QSpinnerPie: ComponentConstructor<QSpinnerPie>;
export const QSpinnerPuff: ComponentConstructor<QSpinnerPuff>;
export const QSpinnerRadio: ComponentConstructor<QSpinnerRadio>;
export const QSpinnerRings: ComponentConstructor<QSpinnerRings>;
export const QSpinnerTail: ComponentConstructor<QSpinnerTail>;
export const QSplitter: ComponentConstructor<QSplitter>;
export const QStep: ComponentConstructor<QStep>;
export const QStepper: ComponentConstructor<QStepper>;
export const QStepperNavigation: ComponentConstructor<QStepperNavigation>;
export const QTabPanel: ComponentConstructor<QTabPanel>;
export const QTabPanels: ComponentConstructor<QTabPanels>;
export const QTable: ComponentConstructor<QTable>;
export const QTd: ComponentConstructor<QTd>;
export const QTh: ComponentConstructor<QTh>;
export const QTr: ComponentConstructor<QTr>;
export const QRouteTab: ComponentConstructor<QRouteTab>;
export const QTab: ComponentConstructor<QTab>;
export const QTabs: ComponentConstructor<QTabs>;
export const QTime: ComponentConstructor<QTime>;
export const QTimeline: ComponentConstructor<QTimeline>;
export const QTimelineEntry: ComponentConstructor<QTimelineEntry>;
export const QToggle: ComponentConstructor<QToggle>;
export const QToolbar: ComponentConstructor<QToolbar>;
export const QToolbarTitle: ComponentConstructor<QToolbarTitle>;
export const QTooltip: ComponentConstructor<QTooltip>;
export const QTree: ComponentConstructor<QTree>;
export const QUploader: ComponentConstructor<QUploader>;
export const QUploaderAddTrigger: ComponentConstructor<QUploaderAddTrigger>;
export const QVideo: ComponentConstructor<QVideo>;
export const QVirtualScroll: ComponentConstructor<QVirtualScroll>;

declare module "./plugin" {
  interface QuasarComponents {
    QAjaxBar?: ComponentConstructor<QAjaxBar>;
    QAvatar?: ComponentConstructor<QAvatar>;
    QBadge?: ComponentConstructor<QBadge>;
    QBanner?: ComponentConstructor<QBanner>;
    QBar?: ComponentConstructor<QBar>;
    QBreadcrumbs?: ComponentConstructor<QBreadcrumbs>;
    QBreadcrumbsEl?: ComponentConstructor<QBreadcrumbsEl>;
    QBtn?: ComponentConstructor<QBtn>;
    QBtnDropdown?: ComponentConstructor<QBtnDropdown>;
    QBtnGroup?: ComponentConstructor<QBtnGroup>;
    QBtnToggle?: ComponentConstructor<QBtnToggle>;
    QCard?: ComponentConstructor<QCard>;
    QCardActions?: ComponentConstructor<QCardActions>;
    QCardSection?: ComponentConstructor<QCardSection>;
    QCarousel?: ComponentConstructor<QCarousel>;
    QCarouselControl?: ComponentConstructor<QCarouselControl>;
    QCarouselSlide?: ComponentConstructor<QCarouselSlide>;
    QChatMessage?: ComponentConstructor<QChatMessage>;
    QCheckbox?: ComponentConstructor<QCheckbox>;
    QChip?: ComponentConstructor<QChip>;
    QCircularProgress?: ComponentConstructor<QCircularProgress>;
    QColor?: ComponentConstructor<QColor>;
    QDate?: ComponentConstructor<QDate>;
    QDialog?: ComponentConstructor<QDialog>;
    QDrawer?: ComponentConstructor<QDrawer>;
    QEditor?: ComponentConstructor<QEditor>;
    QExpansionItem?: ComponentConstructor<QExpansionItem>;
    QFab?: ComponentConstructor<QFab>;
    QFabAction?: ComponentConstructor<QFabAction>;
    QField?: ComponentConstructor<QField>;
    QFile?: ComponentConstructor<QFile>;
    QFooter?: ComponentConstructor<QFooter>;
    QForm?: ComponentConstructor<QForm>;
    QFormChildMixin?: ComponentConstructor<QFormChildMixin>;
    QHeader?: ComponentConstructor<QHeader>;
    QIcon?: ComponentConstructor<QIcon>;
    QImg?: ComponentConstructor<QImg>;
    QInfiniteScroll?: ComponentConstructor<QInfiniteScroll>;
    QInnerLoading?: ComponentConstructor<QInnerLoading>;
    QInput?: ComponentConstructor<QInput>;
    QIntersection?: ComponentConstructor<QIntersection>;
    QItem?: ComponentConstructor<QItem>;
    QItemLabel?: ComponentConstructor<QItemLabel>;
    QItemSection?: ComponentConstructor<QItemSection>;
    QList?: ComponentConstructor<QList>;
    QKnob?: ComponentConstructor<QKnob>;
    QLayout?: ComponentConstructor<QLayout>;
    QLinearProgress?: ComponentConstructor<QLinearProgress>;
    QMarkupTable?: ComponentConstructor<QMarkupTable>;
    QMenu?: ComponentConstructor<QMenu>;
    QNoSsr?: ComponentConstructor<QNoSsr>;
    QOptionGroup?: ComponentConstructor<QOptionGroup>;
    QPage?: ComponentConstructor<QPage>;
    QPageContainer?: ComponentConstructor<QPageContainer>;
    QPageScroller?: ComponentConstructor<QPageScroller>;
    QPageSticky?: ComponentConstructor<QPageSticky>;
    QPagination?: ComponentConstructor<QPagination>;
    QParallax?: ComponentConstructor<QParallax>;
    QPopupEdit?: ComponentConstructor<QPopupEdit>;
    QPopupProxy?: ComponentConstructor<QPopupProxy>;
    QPullToRefresh?: ComponentConstructor<QPullToRefresh>;
    QRadio?: ComponentConstructor<QRadio>;
    QRange?: ComponentConstructor<QRange>;
    QRating?: ComponentConstructor<QRating>;
    QResizeObserver?: ComponentConstructor<QResizeObserver>;
    QResponsive?: ComponentConstructor<QResponsive>;
    QScrollArea?: ComponentConstructor<QScrollArea>;
    QScrollObserver?: ComponentConstructor<QScrollObserver>;
    QSelect?: ComponentConstructor<QSelect>;
    QSeparator?: ComponentConstructor<QSeparator>;
    QSkeleton?: ComponentConstructor<QSkeleton>;
    QSlideItem?: ComponentConstructor<QSlideItem>;
    QSlideTransition?: ComponentConstructor<QSlideTransition>;
    QSlider?: ComponentConstructor<QSlider>;
    QSpace?: ComponentConstructor<QSpace>;
    QSpinner?: ComponentConstructor<QSpinner>;
    QSpinnerAudio?: ComponentConstructor<QSpinnerAudio>;
    QSpinnerBall?: ComponentConstructor<QSpinnerBall>;
    QSpinnerBars?: ComponentConstructor<QSpinnerBars>;
    QSpinnerBox?: ComponentConstructor<QSpinnerBox>;
    QSpinnerClock?: ComponentConstructor<QSpinnerClock>;
    QSpinnerComment?: ComponentConstructor<QSpinnerComment>;
    QSpinnerCube?: ComponentConstructor<QSpinnerCube>;
    QSpinnerDots?: ComponentConstructor<QSpinnerDots>;
    QSpinnerFacebook?: ComponentConstructor<QSpinnerFacebook>;
    QSpinnerGears?: ComponentConstructor<QSpinnerGears>;
    QSpinnerGrid?: ComponentConstructor<QSpinnerGrid>;
    QSpinnerHearts?: ComponentConstructor<QSpinnerHearts>;
    QSpinnerHourglass?: ComponentConstructor<QSpinnerHourglass>;
    QSpinnerInfinity?: ComponentConstructor<QSpinnerInfinity>;
    QSpinnerIos?: ComponentConstructor<QSpinnerIos>;
    QSpinnerOrbit?: ComponentConstructor<QSpinnerOrbit>;
    QSpinnerOval?: ComponentConstructor<QSpinnerOval>;
    QSpinnerPie?: ComponentConstructor<QSpinnerPie>;
    QSpinnerPuff?: ComponentConstructor<QSpinnerPuff>;
    QSpinnerRadio?: ComponentConstructor<QSpinnerRadio>;
    QSpinnerRings?: ComponentConstructor<QSpinnerRings>;
    QSpinnerTail?: ComponentConstructor<QSpinnerTail>;
    QSplitter?: ComponentConstructor<QSplitter>;
    QStep?: ComponentConstructor<QStep>;
    QStepper?: ComponentConstructor<QStepper>;
    QStepperNavigation?: ComponentConstructor<QStepperNavigation>;
    QTabPanel?: ComponentConstructor<QTabPanel>;
    QTabPanels?: ComponentConstructor<QTabPanels>;
    QTable?: ComponentConstructor<QTable>;
    QTd?: ComponentConstructor<QTd>;
    QTh?: ComponentConstructor<QTh>;
    QTr?: ComponentConstructor<QTr>;
    QRouteTab?: ComponentConstructor<QRouteTab>;
    QTab?: ComponentConstructor<QTab>;
    QTabs?: ComponentConstructor<QTabs>;
    QTime?: ComponentConstructor<QTime>;
    QTimeline?: ComponentConstructor<QTimeline>;
    QTimelineEntry?: ComponentConstructor<QTimelineEntry>;
    QToggle?: ComponentConstructor<QToggle>;
    QToolbar?: ComponentConstructor<QToolbar>;
    QToolbarTitle?: ComponentConstructor<QToolbarTitle>;
    QTooltip?: ComponentConstructor<QTooltip>;
    QTree?: ComponentConstructor<QTree>;
    QUploader?: ComponentConstructor<QUploader>;
    QUploaderAddTrigger?: ComponentConstructor<QUploaderAddTrigger>;
    QVideo?: ComponentConstructor<QVideo>;
    QVirtualScroll?: ComponentConstructor<QVirtualScroll>;
  }

  interface QuasarDirectives {
    /**
     * If value is 0 or 'false' then directive is disabled; if value is < 0 then it closes all popups in the chain; if value is 1 or 'true' or undefined then it closes only the parent popup; if value is > 1 it closes the specified number of parent popups in the chain (note that chained QMenus are considered 1 popup only & QPopupProxy separates chained menus)
     *
     * @see https://v2.quasar.dev/vue-directives/close-popup
     */
    vClosePopup: ClosePopup;

    /**
     * Function to call when scrolling occurs (identical to description of 'handler' prop of the Object form); If using the Object form, it is HIGHLY recommended to reference it from your vue component scope, otherwise the directive update cycle will continuously recreate the observer which hits performance hard
     *
     * Modifiers:
     *  - once:
     *    - type: boolean
     *    - description: Call handler only once, when the conditions are first met
     *    - examples:
     *      - v-intersection.once
     *
     * @see https://v2.quasar.dev/vue-directives/intersection
     */
    vIntersection: Intersection;

    /**
     * Configuration object or trigger value
     *
     * Directive argument:
     *  - type: string
     *  - description: x:x2:y:z, where x is the morph element name, x2 is the morph group, y is the animation duration (in milliseconds) and z is the amount of time to wait (in milliseconds) or the 'transitionend' string
     *  - examples:
     *    - v-morph:name="options"
     *    - v-morph:name:groupName="options"
     *    - v-morph:name:groupName:400="options"
     *    - v-morph:name:groupName:400:100="options"
     *    - v-morph:name:groupName:400:transitionend="options"
     *
     * Modifiers:
     *  - resize:
     *    - type: boolean
     *    - description: Use resize instead of scale transform for morph (forceResize option of the morph function)
     *  - useCSS:
     *    - type: boolean
     *    - description: Use CSS animations for morph (forceCssAnimation option of the morph function)
     *  - hideFromClone:
     *    - type: boolean
     *    - description: Hide the spacer for the initial element (hideFromClone option of the morph function)
     *  - keepToClone:
     *    - type: boolean
     *    - description: Keep the final element visible while morphing (keepToClone option of the morph function)
     *  - tween:
     *    - type: boolean
     *    - description: Use opacity tween morphing between initial and final elements (tween option of the morph function)
     *
     * @see https://v2.quasar.dev/vue-directives/morph
     */
    vMorph: Morph;

    /**
     * Function to call when mutation occurs; It is HIGHLY recommended to reference it from your vue component scope, otherwise the directive update cycle will continuously recreate the observer which hits performance hard
     *
     * Modifiers:
     *  - once:
     *    - type: boolean
     *    - description: Call handler only once, when the first mutation was triggered, then stop monitoring
     *    - examples:
     *      - v-mutation.once
     *  - childList:
     *    - type: boolean
     *    - description: Monitor the target node (and, if 'subtree' is also set, its descendants) for the addition of new child nodes or removal of existing child nodes
     *    - examples:
     *      - v-mutation.childList
     *  - subtree:
     *    - type: boolean
     *    - description: Extend monitoring to the entire subtree of nodes rooted at target
     *    - examples:
     *      - v-mutation.subtree
     *  - attributes:
     *    - type: boolean
     *    - description: Watch for changes to the value of attributes on the node or nodes being monitored
     *    - examples:
     *      - v-mutation.attributes
     *  - characterData:
     *    - type: boolean
     *    - description: Monitor the specified target node or subtree for changes to the character data contained within the node or nodes
     *    - examples:
     *      - v-mutation.characterData
     *  - attributeOldValue:
     *    - type: boolean
     *    - description: Record the previous value of any attribute that changes when monitoring the node or nodes for attribute changes
     *    - examples:
     *      - v-mutation.attributeOldValue
     *  - characterDataOldValue:
     *    - type: boolean
     *    - description: Record the previous value of a node's text whenever the text changes on nodes being monitored
     *    - examples:
     *      - v-mutation.characterDataOldValue
     *
     * @see https://v2.quasar.dev/vue-directives/mutation
     */
    vMutation: Mutation;

    /**
     * Boolean (if just wanting to enable/disable) or Object for configuring more options
     *
     * Directive argument:
     *  - type: string
     *  - description: Color name from Quasar Color Palette; Overrides default dynamic color
     *  - examples:
     *    - v-ripple:orange-5
     *
     * Modifiers:
     *  - early:
     *    - type: boolean
     *    - description: Trigger early/immediately on user interaction
     *  - stop:
     *    - type: boolean
     *    - description: Stop click/touch event propagation
     *    - examples:
     *      - v-ripple.stop
     *  - center:
     *    - type: boolean
     *    - description: Ripple starts from the absolute center
     *    - examples:
     *      - v-ripple.center
     *
     * @see https://v2.quasar.dev/vue-directives/material-ripple
     */
    vRipple: Ripple;

    /**
     * Function to call when scrolling occurs (use undefined to disable)
     *
     * @see https://v2.quasar.dev/vue-directives/scroll
     */
    vScroll: Scroll;

    /**
     * Function to call when scrolling and element comes into the viewport (use undefined to disable)
     *
     * @see https://v2.quasar.dev/vue-directives/scroll-fire
     */
    vScrollFire: ScrollFire;

    /**
     * Function to call after user has hold touch/click for the specified amount of time (use undefined to disable)
     *
     * Directive argument:
     *  - type: string
     *  - default: 600:5:7
     *  - description: x:y:z, where x is the amount of time to wait (in milliseconds), y is the touch event sensitivity (in pixels) and z is the mouse event sensitivity (in pixels)
     *  - examples:
     *    - v-touch-hold:400="fnToCall"
     *    - v-touch-hold:400:15="fnToCall"
     *    - v-touch-hold:400:10:10="fnToCall"
     *
     * Modifiers:
     *  - capture:
     *    - type: boolean
     *    - description: Use capture for touchstart event
     *  - mouse:
     *    - type: boolean
     *    - description: Listen for mouse events too
     *  - mouseCapture:
     *    - type: boolean
     *    - description: Use capture for mousedown event
     *
     * @see https://v2.quasar.dev/vue-directives/touch-hold
     */
    vTouchHold: TouchHold;

    /**
     * Handler for panning (use undefined to disable)
     *
     * Modifiers:
     *  - stop:
     *    - type: boolean
     *    - description: Stop event propagation for touch events
     *  - prevent:
     *    - type: boolean
     *    - description: Calls event.preventDefault() for touch events
     *  - capture:
     *    - type: boolean
     *    - description: Use capture for touchstart event
     *  - mouse:
     *    - type: boolean
     *    - description: Listen for mouse events too
     *  - mouseCapture:
     *    - type: boolean
     *    - description: Use capture for mousedown event
     *  - mouseAllDir:
     *    - type: boolean
     *    - description: Ignore initial mouse move direction (do not abort if the first mouse move is in an unaccepted direction)
     *  - preserveCursor:
     *    - type: boolean
     *    - description: Prevent the mouse cursor from automatically displaying as grabbing when panning
     *  - horizontal:
     *    - type: boolean
     *    - description: Catch horizontal (left/right) movement
     *  - vertical:
     *    - type: boolean
     *    - description: Catch vertical (up/down) movement
     *  - up:
     *    - type: boolean
     *    - description: Catch panning to up
     *  - right:
     *    - type: boolean
     *    - description: Catch panning to right
     *  - down:
     *    - type: boolean
     *    - description: Catch panning to down
     *  - left:
     *    - type: boolean
     *    - description: Catch panning to left
     *
     * @see https://v2.quasar.dev/vue-directives/touch-pan
     */
    vTouchPan: TouchPan;

    /**
     * Handler for touch-repeat (use undefined to disable)
     *
     * Directive argument:
     *  - type: string
     *  - default: 0:600:300
     *  - description: String of numbers (at least one number) separated by ':' which defines the amount of time to wait for 1st handler call, 2nd, 3rd and so on; All subsequent calls will use last value as time to wait until triggering
     *  - examples:
     *    - v-touch-repeat:0:400="fnToCall"
     *
     * Modifiers:
     *  - capture:
     *    - type: boolean
     *    - description: Use capture for touchstart event
     *  - mouse:
     *    - type: boolean
     *    - description: Listen for mouse events too
     *  - mouseCapture:
     *    - type: boolean
     *    - description: Use capture for mousedown event
     *  - keyCapture:
     *    - type: boolean
     *    - description: Use capture for keydown event
     *  - esc:
     *    - type: boolean
     *    - description: Catch ESC key
     *  - tab:
     *    - type: boolean
     *    - description: Catch TAB key
     *  - enter:
     *    - type: boolean
     *    - description: Catch ENTER key
     *  - space:
     *    - type: boolean
     *    - description: Catch SPACE key
     *  - up:
     *    - type: boolean
     *    - description: Catch UP arrow key
     *  - left:
     *    - type: boolean
     *    - description: Catch LEFT arrow key
     *  - right:
     *    - type: boolean
     *    - description: Catch RIGHT arrow key
     *  - down:
     *    - type: boolean
     *    - description: Catch DOWN key
     *  - delete:
     *    - type: boolean
     *    - description: Catch DELETE key
     *  - [keycode]:
     *    - type: number
     *    - description: Key code to catch
     *    - examples:
     *      - v-touch-repeat.68="fnToCall"
     *
     * @see https://v2.quasar.dev/vue-directives/touch-repeat
     */
    vTouchRepeat: TouchRepeat;

    /**
     * Handler for swipe (use undefined to disable)
     *
     * Directive argument:
     *  - type: string
     *  - default: 6e-2:6:50
     *  - description: x:y:z, where x is minimum velocity (dist/time; please use float without a dot, example: 6e-2 which is equivalent to 6 * 10^-2 = 0.06), y is minimum distance on first move on mobile, z is minimum distance on desktop until deciding if it's a swipe indeed
     *  - examples:
     *    - v-touch-swipe:7e-2:10:100="fnToCall"
     *
     * Modifiers:
     *  - capture:
     *    - type: boolean
     *    - description: Use capture for touchstart event
     *  - mouse:
     *    - type: boolean
     *    - description: Listen for mouse events too
     *  - mouseCapture:
     *    - type: boolean
     *    - description: Use capture for mousedown event
     *  - horizontal:
     *    - type: boolean
     *    - description: Catch horizontal (left/right) movement
     *  - vertical:
     *    - type: boolean
     *    - description: Catch vertical (up/down) movement
     *  - up:
     *    - type: boolean
     *    - description: Catch swipe to up
     *  - right:
     *    - type: boolean
     *    - description: Catch swipe to right
     *  - down:
     *    - type: boolean
     *    - description: Catch swipe to down
     *  - left:
     *    - type: boolean
     *    - description: Catch swipe to left
     *
     * @see https://v2.quasar.dev/vue-directives/touch-swipe
     */
    vTouchSwipe: TouchSwipe;
  }

  interface QuasarPlugins {
    AddressbarColor?: AddressbarColor;
    AppFullscreen?: AppFullscreen;
    AppVisibility?: AppVisibility;
    BottomSheet?: BottomSheet;
    Cookies?: Cookies;
    Dark?: Dark;
    Dialog?: Dialog;
    Loading?: Loading;
    LoadingBar?: LoadingBar;
    LocalStorage?: LocalStorage;
    Meta?: Meta;
    Notify?: Notify;
    Platform?: Platform;
    Screen?: Screen;
    SessionStorage?: SessionStorage;
  }
}

import { QuasarPluginOptions } from "./plugin";
export const Quasar: {
  install: (app: App, options: Partial<QuasarPluginOptions>) => any;
} & QSingletonGlobals;
export default Quasar;

import "./shim-icon-set";
import "./shim-lang";
