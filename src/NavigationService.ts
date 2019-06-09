/**
 * @todo Navigating without the navigation prop
 * 
 * @param {https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html}
 */

import { NavigationActions, StackActions, NavigationReplaceActionPayload, NavigationPopActionPayload, NavigationNavigateActionPayload, NavigationResetActionPayload } from 'react-navigation';

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(options: NavigationNavigateActionPayload) {
  _navigator.dispatch(
    NavigationActions.navigate(options)
  );
}

function goBack() {
  _navigator.dispatch(
    NavigationActions.back()
  )
}

function replace(param: NavigationReplaceActionPayload) {
  _navigator.dispatch(
    StackActions.replace(param)
  )
}

function pop(options: NavigationPopActionPayload) {
  _navigator.dispatch(
    StackActions.pop(options)
  )
}

function popToTop(options: NavigationPopActionPayload) {
  _navigator.dispatch(
    StackActions.popToTop(options)
  )
}

function reset(options: NavigationResetActionPayload) {
  _navigator.dispatch(
    StackActions.reset(options)
  )
}

function getTopNavigator() {
  return _navigator;
}

function getCurrentRoute() {
  return _navigator.state.nav;
}

// add other navigation functions that you need and export them

export default {
  goBack,
  navigate,
  replace,
  pop,
  popToTop,
  getTopNavigator,
  getCurrentRoute,
  setTopLevelNavigator,
  reset,
};