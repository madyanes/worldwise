import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

import CityList from './components/CityList'
import './index.css'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import SpinnerFullPage from './components/SpinnerFullPage'

const Homepage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Login = lazy(() => import('./pages/Login'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const AppLayout = lazy(() => import('./pages/AppLayout'))

// Build time before lazy loading
// dist/index.html                   0.49 kB │ gzip:   0.31 kB
// dist/assets/index-DHkBzkyT.css   29.95 kB │ gzip:   5.05 kB
// dist/assets/index-DieD9sOR.js   508.81 kB │ gzip: 148.65 kB

// Build time after lazy loading
// dist/index.html                           0.49 kB │ gzip:   0.31 kB
// dist/assets/Logo-CtfPMVPO.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-fP6ipu4U.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-CX3p79nw.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-DKp2I-AC.css         0.50 kB │ gzip:   0.30 kB
// dist/assets/PageNav-C2lIXkPA.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-DrgGRTvh.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-B8unvdWK.css           26.29 kB │ gzip:   4.38 kB
// dist/assets/Product.module-DpVUF5Lu.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-DBK_mqSq.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-DcCYNgei.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-jvc4BiIQ.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-Djf2Yh-8.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-D87yCve-.js          0.67 kB │ gzip:   0.42 kB
// dist/assets/Product-BZCGdPhL.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-BX44fmBJ.js             1.00 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-DKqd2nqO.js       156.95 kB │ gzip:  46.19 kB
// dist/assets/index-B8dcX07v.js           350.10 kB │ gzip: 102.05 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />
              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
