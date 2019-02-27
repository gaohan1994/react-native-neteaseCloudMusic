import * as React from 'react';
import { TouchableOpacityProps } from 'react-native';

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

declare class Overlay { 
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

export { 
  Button,
  Overlay,
  ActionSheet,
  Theme,
  Select,
};