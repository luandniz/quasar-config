export type QuasarGeneralAnimations =
  | "bounce"
  | "flash"
  | "flip"
  | "headShake"
  | "heartBeat"
  | "hinge"
  | "jello"
  | "pulse"
  | "rubberBand"
  | "shake"
  | "shakeX"
  | "shakeY"
  | "swing"
  | "tada"
  | "wobble";

export type QuasarInAnimations =
  | "backInDown"
  | "backInLeft"
  | "backInRight"
  | "backInUp"
  | "bounceIn"
  | "bounceInDown"
  | "bounceInLeft"
  | "bounceInRight"
  | "bounceInUp"
  | "fadeIn"
  | "fadeInBottomLeft"
  | "fadeInBottomRight"
  | "fadeInDown"
  | "fadeInDownBig"
  | "fadeInLeft"
  | "fadeInLeftBig"
  | "fadeInRight"
  | "fadeInRightBig"
  | "fadeInUp"
  | "fadeInUpBig"
  | "flipInX"
  | "flipInY"
  | "jackInTheBox"
  | "lightSpeedInLeft"
  | "lightSpeedInRight"
  | "rollIn"
  | "rotateIn"
  | "rotateInDownLeft"
  | "rotateInDownRight"
  | "rotateInUpLeft"
  | "rotateInUpRight"
  | "slideInDown"
  | "slideInLeft"
  | "slideInRight"
  | "slideInUp"
  | "zoomIn"
  | "zoomInDown"
  | "zoomInLeft"
  | "zoomInRight"
  | "zoomInUp";

export type QuasarOutAnimations =
  | "backOutDown"
  | "backOutLeft"
  | "backOutRight"
  | "backOutUp"
  | "bounceOut"
  | "bounceOutDown"
  | "bounceOutLeft"
  | "bounceOutRight"
  | "bounceOutUp"
  | "fadeOut"
  | "fadeOutBottomLeft"
  | "fadeOutBottomRight"
  | "fadeOutDown"
  | "fadeOutDownBig"
  | "fadeOutLeft"
  | "fadeOutLeftBig"
  | "fadeOutRight"
  | "fadeOutRightBig"
  | "fadeOutTopLeft"
  | "fadeOutTopRight"
  | "fadeOutUp"
  | "fadeOutUpBig"
  | "flipOutX"
  | "flipOutY"
  | "lightSpeedOutLeft"
  | "lightSpeedOutRight"
  | "rollOut"
  | "rotateOut"
  | "rotateOutDownLeft"
  | "rotateOutDownRight"
  | "rotateOutUpLeft"
  | "rotateOutUpRight"
  | "slideOutDown"
  | "slideOutLeft"
  | "slideOutRight"
  | "slideOutUp"
  | "zoomOut"
  | "zoomOutDown"
  | "zoomOutLeft"
  | "zoomOutRight"
  | "zoomOutUp";

export type QuasarAnimations =
  | QuasarGeneralAnimations
  | QuasarInAnimations
  | QuasarOutAnimations;