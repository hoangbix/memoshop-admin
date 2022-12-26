import mock from './mock'

import './cards'
import './table'
import './apps/chat'
import './apps/invoice'
import './autocomplete'
import './apps/userList'
import './pages/pricing'
import './app-bar-search'
import './pages/knowledge-base'
import './server-side-menu/vertical'

mock.onAny().passThrough()
