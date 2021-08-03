import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { IGlobalStyleProps } from './types'

const RobotoFontUrl = require('../../../assets/Roboto-Regular.ttf')
const MaterialCommunityIconsUrl = require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')
const MaterialIconsUrl = require('react-native-vector-icons/Fonts/MaterialIcons.ttf')
const FontAwesomeUrl = require('react-native-vector-icons/Fonts/FontAwesome.ttf')

function primaryColor({ theme } : IGlobalStyleProps) {
  return theme.colors.primary
}

function backgroundColor({ theme } : IGlobalStyleProps) {
  return theme.colors.background
}

/**
 * Global styles for web version
 * - Load font
 * - Disable dragging and selection
 */
const GlobalStyle = createGlobalStyle`
  @font-face {
    src: url(${RobotoFontUrl});
    font-family: Roboto;
  }

  @font-face {
    src: url(${MaterialCommunityIconsUrl});
    font-family: MaterialCommunityIcons;
  }

  @font-face {
    src: url(${MaterialIconsUrl});
    font-family: MaterialIcons;
  }

  @font-face {
    src: url(${FontAwesomeUrl});
    font-family: FontAwesome;
  }

  button {
    border: 0px;
  }

  html, body {
    height: 100%;
  }
  /* These styles disable body scrolling if you are using <ScrollView> */
  body {
    overflow: hidden;
  }
  /* These styles make the root element full-height */
  #root {
    display:flex;
    height:100%;
  }

  a, a:hover, a:active {
    text-decoration: none;
  }

  * {
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }

  svg *, .react-pdf__Page__textContent * {
    user-select: text;
  }

  img, a {
    user-select: none;
    -webkit-user-select: none;
    /* Safari 3.1+ */ -moz-user-select: none;
    /* Firefox 2+ */ -ms-user-select: none;
    /* IE 10+ */ user-select: none;
    /* Standard syntax */ user-drag: none;
    -webkit-user-drag: none;
  }

  input, textarea {
    user-select: text;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: ${primaryColor} ${backgroundColor};
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none !important;
    width: 8px !important;
    height: 8px !important
  }

  ::-webkit-scrollbar-track {
    border-radius: 0 !important;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer !important;
    border-radius: 5px !important;
    -webkit-transition: color .2s ease!important;
    transition: color .2s ease!important
  }

  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-thumb:window-inactive {
    background: ${primaryColor} !important
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${primaryColor} !important
  }

  textarea:focus, input:focus{
    outline: none;
  }
`

export default GlobalStyle