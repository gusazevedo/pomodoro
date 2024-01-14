import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/home'
import { History } from './pages/history/history'
import { DefaultLayout } from './layouts/default-laytout'

export function Rounter() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
