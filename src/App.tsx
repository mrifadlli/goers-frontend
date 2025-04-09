import {Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import RestaurantDetail from './pages/RestaurantDetail'

export default function App() {
  return (
    <Routes>
      <Route path={'/'} index element={<Home />} />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
    </Routes>
  )
}
