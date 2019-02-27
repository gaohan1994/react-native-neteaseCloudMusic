import * as React from 'react';

export interface ToastPosition { 
  TOP: number;
  BOTTOM: number;
  CENTER: number;
}

export interface ToastDurations {
  LONG: number;
  SHORT: number;
}

export interface ShowOptions {
  position?: number;
  duration?: number;
}

export interface ToastProps { }

declare class Toast extends React.Component <ToastProps, {}> { 

  static positions: ToastPosition;

  static durations: ToastDurations;

  static show: (
    message: string,
    options?: ShowOptions,
  ) => void;

  static hide: (toast: Toast) => void;
}

export default Toast;