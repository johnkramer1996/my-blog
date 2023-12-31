import { Provider as ModalProvider } from '@ebay/nice-modal-react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { appStore, persistedStore } from './app.store'
import { appRouter } from './appRouter'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = document.getElementById('root') as HTMLElement

const initApp = async () => {
  return Promise.resolve()
}

initApp().then(() =>
  createRoot(root).render(
    <ReduxProvider store={appStore}>
      <ModalProvider>
        <PersistGate loading={null} persistor={persistedStore}>
          <RouterProvider router={appRouter()} />
          <ToastContainer />
        </PersistGate>
      </ModalProvider>
    </ReduxProvider>
  )
)
