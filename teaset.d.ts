import * as React from 'react';
import { TouchableOpacityProps, View } from 'react-native';

declare namespace Theme {
  function set (param: any): void;
}

export interface ButtonProps extends TouchableOpacityProps {
  type?: 'default' | 'primary' | 'secondary' | 'danger' | 'link';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  title?: string | number | React.ReactNode | JSX.Element;
  titleStyle?: any;
}
/**
 * @param {Button}
 */
declare class Button extends React.Component<ButtonProps, {}> { }

/**
 * @param {Overlay}
 */
export interface OverlayPullViewProps extends OverlayViewProps {
  side?: any;
  containerStyle?: any;
  rootTransform?: any;
}

export class OverlayPullView extends React.Component<OverlayPullViewProps, {}> { }

export interface OverlayViewProps {
  style?: any;
  modal?: any;
  animated?: any;
  overlayOpacity?: any;
  overlayPointerEvents?: any;
  autoKeyboardInsets?: any;
  onAppearCompleted?: any;
  onDisappearCompleted?: any;
  onCloseRequest?: any;
}

export class OverlayView extends React.Component<OverlayViewProps, {}> { }

declare class Overlay extends View { 
  static View: OverlayView;
  static PullView: OverlayPullView;
}

/**
 * @param {Action}
 */
export class ActionSheetView extends OverlayPullView { 
  items: any;
  cancelItem: any;
}

declare class ActionSheet extends Overlay {
  static ActionSheetView: ActionSheetView;
  
  static show: (
    items: any,
    cancelItem: any,
    options?: any,
  ) => void;
}

export interface SelectProps extends TouchableOpacityProps {
  size?: string;
  value: any;
  valueStyle?: any;
  items: any[];
  getItemValue?: any;
  getItemText?: any;
  pickerType?: string;
  pickerTitle?: string;
  editable?: boolean;
  icon?: string;
  iconTintColor?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  onSelected?: (params?: any, options?: any) => void;
}

declare class Select extends React.Component<SelectProps, {}> {

}

export type ToastDuration = 'short' | 'long';

export interface ToastFunctionInterface {
  text: string;
  duration?: ToastDuration;
  position?: ToastPosition;
}

export type ToastPosition = 'center';


export class ToastView extends View {

}

export class Toast extends Overlay {
  static message: (text: string, duration?: ToastDuration, position?: ToastPosition) => void;
  static success: (text: string, duration?: ToastDuration, position?: ToastPosition) => void;
  static fail: (text: string, duration?: ToastDuration, position?: ToastPosition) => void;
  static smile: (text: string, duration?: ToastDuration, position?: ToastPosition) => void;
  static sad: (text: string, duration?: ToastDuration, position?: ToastPosition) => void;
  static info: (text: string, duration?: ToastDuration, position?: ToastPosition) => void;
  static stop: (text: string, duration?: ToastDuration, position?: ToastPosition) => void;

  static ToastView: ToastView;
  static defaultDuration: ToastDuration;
  static defaultPosition: ToastPosition;
  static messageDefaultDuration: ToastDuration;
  static messageDefaultPosition: ToastPosition;
}

export class TopView extends React.Component { }

export { 
  Button,
  Overlay,
  ActionSheet,
  Theme,
  Select,
};