Imba:HTML_TAGS.push 'dialog'
Imba:HTML_TAGS.push 'center'

Imba:HTML_ATTRS:hr = 'open'
Imba:HTML_ATTRS:nav = 'open'
Imba:HTML_ATTRS:menu = 'open'
Imba:HTML_ATTRS:aside = 'open'
Imba:HTML_ATTRS:dialog = 'open'
Imba:HTML_ATTRS:details = 'open'
Imba:HTML_ATTRS:fieldset = 'close'

import './index.styl'

import 'imba-router'

Imba.root.router.root = URL.new( document:baseURI ):pathname
	.replace /\/*$/, ''

import Application from './application'

Imba.mount <Application route="{ Imba.root.router.root }/*:collection*/*:element*/*">
