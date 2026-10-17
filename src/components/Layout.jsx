import { Outlet } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ToastStack from './ToastStack.jsx'
import QuickViewModal from './QuickViewModal.jsx'
import SearchOverlay from './SearchOverlay.jsx'

/** Persistent chrome shared by every route. */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <SearchOverlay />
      <QuickViewModal />
      <ToastStack />
    </div>
  )
}
